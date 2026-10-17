# Drill: muddy-orders

**Skills:** `/improve-codebase-architecture`, `/codebase-design`, `/grilling`, then `/tdd` for the refactor and `/code-review` to close
**Curriculum:** Module 6 (Design health), with Module 3 (Building) as the follow-through
**Language:** JavaScript (Node 20+, ESM, no dependencies)

## Scenario

`muddy-orders` is the order intake for a small coffee-gear shop. Every module is small, every function is tested, and the suite is green. Support has started forwarding complaints that refunds "never match what people paid", but nobody has filed a proper bug yet.

You're not here to fix a bug. You're here to look at the shape of the code and decide what to deepen.

## Set up

```bash
learning/bin/start-drill muddy-orders
cd ~/pocock-dojo-drills/muddy-orders
npm test
```

## Run it

1. **Learn the words first.** Before the survey, read `/codebase-design`'s `SKILL.md` and `DEEPENING.md` yourself (paths are in the workspace `RESOURCES.md`). You should be able to say what **depth**, **seam**, **leverage**, **locality** and the **deletion test** mean without looking.
2. **Survey.** Run `/improve-codebase-architecture`. The drill repo has a one-commit history, so give it a direction: "the order pricing and refund path". Read the HTML report it opens.
3. **Before you pick**, write down (on paper, not to the agent) which candidate you'd choose and why, using the vocabulary. Then compare with its **Top recommendation**.
4. **Grill.** Pick one candidate. Let it grill you. Practise answering in terms of the interface: what goes in, what comes out, what is hidden behind it.
5. **Design it twice** (optional, recommended): ask for the design-it-twice pattern on the deepened module and compare the interfaces.
6. **Refactor with `/tdd`.** Agree the seams first. Watch what happens to the existing tests in `test/orderService.test.js`, and decide what to do with them.
7. **Review.** `/code-review` against the `drill-start` tag.

## Done when

- You can explain, in two sentences of `/codebase-design` vocabulary, why your chosen candidate was worth it.
- Checkout and refund now go through one module you could describe to a teammate in one line.
- The tests that survive would still pass if you rewrote that module's internals.
- You noticed what the refactor did to the "refunds don't match" complaint.

## Debrief

Back in the learning workspace: `/teach debrief muddy-orders`. Bring the HTML report path, your on-paper pick, and the final diff. The teacher grades against `ANSWERS.md` in this folder.
