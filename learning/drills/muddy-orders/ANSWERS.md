# muddy-orders: answer key

For the teacher. The learner should not read this before attempting the drill.

## The planted shape

- **Shallow pricing modules.** `priceUtils.js`, `discountUtils.js`, `taxUtils.js` are each a few lines. The *rules about how they combine* (discount before tax, discount spread across lines by value, eligibility judged on the order subtotal) live in `orderService.placeOrder`, not behind any interface. Deletion test: deleting `priceUtils.js` moves `unit_price_cents * qty` into the caller and concentrates nothing. These modules fail it; a pricing module that owned the combination would pass it.
- **No locality, so a real bug.** `refundItem` recombines the same helpers in a different order: tax on the undiscounted line, then the flat loyalty discount applied again to the tax-inclusive refund, with eligibility re-judged on the single line. Gold customer, grinder (6500) plus book (2200) in PT: charged 9140, refunds total 6995 + 2332 = 9327. Each helper is "tested", the bug is in how they're called. This is the exact friction the survey prompt names: "pure functions extracted for testability, but the real bugs hide in how they're called".
- **Implementation-coupled tests.** `test/orderService.test.js` mocks every collaborator and asserts call counts. It would pass with the wrong math and break on any refactor that keeps behaviour. Under `/tdd` these are the anti-pattern; good learners delete or replace them with tests through the new interface rather than "keep them green".
- **Leaking database shape.** `unit_price_cents`, `tax_class`, `loyalty_tier`, `customer_id` travel from the repos all the way through the service and into the helpers.
- **Middle man.** `orderMapper.js` mostly renames fields; `orderController.js` duplicates validation that `orderValidator.js` already does (slightly differently: `qty < 1` vs `Number.isInteger`, so `1.5` passes the controller and fails later with a 422 instead of a 400).
- **Hypothetical seams.** The service takes `priceUtils`, `discountUtils`, `taxUtils`, `mapper`, `validateOrder` as injectable dependencies, each with exactly one real implementation. "One adapter = hypothetical seam." The only real seam with two adapters is the storage behind the repos (in-memory now, a real DB later).

## Expected top recommendation

A deep **pricing** module (name it from the domain, e.g. `Pricing` or "the price breakdown"): `priceOrder(lines, customer) -> breakdown` returning per-line allocations (line total, discount share, tax). Checkout stores the breakdown; refund reads the stored allocation for the refunded line instead of recomputing. That fixes the refund bug by construction and gives one test surface for every pricing rule. `Strong`.

Reasonable second candidates: collapse the injected helper seams (Worth exploring); a single order-intake interface that owns validation so the controller stops re-validating (Worth exploring); an inventory reservation module (Speculative at this size).

## Grilling questions a strong session surfaces

- Is a refund priced from the stored order, or recomputed from today's prices and tax rates? (Stored. Prices and rates change.)
- Does a partial refund give back the line's share of the discount, or does the customer lose the discount if the remaining order drops below the threshold? (A business decision: the learner should notice it's theirs to make, and that `/domain-modeling` might want an ADR for it.)
- Where does rounding of per-line discount shares get reconciled so shares sum to the discount? (Same conservation problem as the split-the-bill drill. Credit learners who connect them.)

## Common learner mistakes to probe

- Picking the candidate before reading the vocabulary, then rationalising.
- Describing the fix as "create a PricingService" (vocabulary drift: the skill says module, interface, seam, not service).
- Keeping the mock-heavy tests green by updating the mocks.
- Not noticing the refund bug disappears; or fixing it in `refundItem` directly and calling the drill done, which treats the symptom and leaves the shallow shape.
