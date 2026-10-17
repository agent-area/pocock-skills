import { test } from "node:test";
import assert from "node:assert/strict";
import { applyDiscount, isEligibleForDiscount } from "../src/discountUtils.js";

test("gold customers get 10 euros off", () => {
  assert.equal(applyDiscount(6000, { loyalty_tier: "gold" }), 5000);
});

test("discount only applies above the threshold", () => {
  assert.equal(isEligibleForDiscount({ loyalty_tier: "gold" }, 4999), false);
  assert.equal(isEligibleForDiscount({ loyalty_tier: "gold" }, 5000), true);
});

test("customers without a tier are never eligible", () => {
  assert.equal(isEligibleForDiscount({ loyalty_tier: "none" }, 100000), false);
});
