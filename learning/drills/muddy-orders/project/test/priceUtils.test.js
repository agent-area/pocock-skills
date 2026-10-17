import { test } from "node:test";
import assert from "node:assert/strict";
import { lineTotal, subtotal } from "../src/priceUtils.js";

test("lineTotal multiplies unit price by quantity", () => {
  assert.equal(lineTotal({ unit_price_cents: 250 }, 3), 750);
});

test("subtotal adds line totals", () => {
  assert.equal(subtotal([100, 200, 300]), 600);
});
