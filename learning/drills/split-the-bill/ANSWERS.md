# split-the-bill: answer key

For the teacher. The learner should not read this before attempting the drill.

## The bug

`tripsplit/split.py`, weighted path: `round(total_cents * shares[p] / total_shares)` per person. Rounding each share independently means the parts don't always sum to the whole. Python's `round` uses banker's rounding (half to even), which makes the pattern harder to eyeball. The even-split fast path is correct (divmod plus handing out the remainder), which is why the existing tests and the Lisbon example pass.

Minimal repro: `split_amount(1, {"a": 1, "b": 1, "c": 2})` returns all zeros (a cent vanishes). `split_amount(3, {"a": 1, "b": 1, "c": 2})` returns 1 + 1 + 2 = 4 (a cent appears). The Porto case is `split_amount(10001, {"ana": 1, "ben": 1, "cy": 2})`, which sums to 10000. Searching is the point; any input where `sum(parts) != total` counts.

Why "most trips are fine": per-expense errors of +1 and -1 can cancel across a trip. The symptom only appears when they don't.

## What a strong run looks like

- **Phase 1:** a property / fuzz loop (option 7 in the skill): random totals and random unequal weights, assert `sum(split_amount(...).values()) == total`. Or a property at the settle-up seam: random trips, assert `sum(balances(trip).values()) == 0`. Either is red within milliseconds. Seeded RNG for determinism.
- **Red herring handled:** the currency formatting change (`money.py`) is ruled out by the loop, not by reading. The formatter works on integer cents and can't create a cent.
- **Hypotheses (good list):** independent per-share rounding loses or gains cents (correct); float division error in `total * share / total_shares`; `settle_up` greedy matching drops a remainder; formatting change; JSON parsing of amounts as floats. Each with a prediction, e.g. "if it's rounding, `sum(parts) - total` is never more than (people - 1) in magnitude, and integer largest-remainder allocation makes it zero".
- **Fix:** integer allocation, e.g. largest remainder (Hamilton): floor each share with `divmod(total * share, total_shares)`, then give the leftover cents to the largest remainders with a deterministic tie-break. Floats out of the money path entirely.
- **Seam discussion:** a unit test on `split_amount` catches this exact bug. The stronger seam is the invariant the user cares about: "balances sum to zero" over `balances(trip)`. Good learners name both and choose deliberately. A learner who only tests the one minimal input has a weak regression test.

## Retro findings worth seeing

- **Automated check:** a property test for the conservation invariant (parts sum to whole, balances sum to zero) should live in the suite permanently. This is a mechanical check, so it belongs in tests, not in a coding standard.
- **Coding standard (judgement):** "money is integer cents; never divide money with `/`". Could be partly mechanical (a lint rule or grep in CI banning `/` and `round(` in the money modules).
- **Guardrail:** the repo has no CI or pre-commit running `python -m unittest`. The retro skill counts a missing guardrail as a finding.

## Common learner mistakes to probe

- Letting the agent read code and guess before a loop existed.
- Accepting a loop that asserts "no exception" instead of the exact symptom.
- Fixing `split_amount` but writing the regression test only for the Porto numbers.
- Skipping `/retro`, or running it after clearing context.
