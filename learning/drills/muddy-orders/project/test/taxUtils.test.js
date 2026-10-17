import { test } from "node:test";
import assert from "node:assert/strict";
import { taxFor } from "../src/taxUtils.js";

test("standard rate in Portugal", () => {
  assert.equal(taxFor(1000, "PT", "standard"), 230);
});

test("unknown tax class falls back to standard", () => {
  assert.equal(taxFor(1000, "ES", "spaceships"), 210);
});
