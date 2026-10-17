import { test, mock } from "node:test";
import assert from "node:assert/strict";
import { createOrderService } from "../src/orderService.js";

function fakes() {
  return {
    db: { orders: new Map(), nextOrderId: 1 },
    productRepo: { getProduct: mock.fn(() => ({ sku: "mug", unit_price_cents: 1800, tax_class: "standard" })) },
    customerRepo: { getCustomer: mock.fn(() => ({ id: "c2", region: "PT", loyalty_tier: "none" })) },
    inventoryRepo: { getStock: mock.fn(() => 10), decrementStock: mock.fn(), incrementStock: mock.fn() },
    priceUtils: { lineTotal: mock.fn(() => 1800), subtotal: mock.fn(() => 1800) },
    discountUtils: { isEligibleForDiscount: mock.fn(() => false), applyDiscount: mock.fn() },
    taxUtils: { taxFor: mock.fn(() => 414) },
    mapper: { toOrderRow: mock.fn((i) => ({ customer_id: i.customerId, items: i.items })), toOrderDto: mock.fn((r) => r) },
    validateOrder: mock.fn(() => []),
  };
}

test("placeOrder validates, prices, taxes, decrements stock and maps", () => {
  const deps = fakes();
  const service = createOrderService(deps);
  service.placeOrder({ customerId: "c2", items: [{ sku: "mug", qty: 1 }] });

  assert.equal(deps.validateOrder.mock.callCount(), 1);
  assert.equal(deps.mapper.toOrderRow.mock.callCount(), 1);
  assert.equal(deps.priceUtils.lineTotal.mock.callCount(), 1);
  assert.equal(deps.priceUtils.subtotal.mock.callCount(), 1);
  assert.equal(deps.discountUtils.isEligibleForDiscount.mock.callCount(), 1);
  assert.equal(deps.discountUtils.applyDiscount.mock.callCount(), 0);
  assert.equal(deps.taxUtils.taxFor.mock.callCount(), 1);
  assert.deepEqual(deps.inventoryRepo.decrementStock.mock.calls[0].arguments, ["mug", 1]);
  assert.equal(deps.mapper.toOrderDto.mock.callCount(), 1);
});

test("placeOrder applies the discount when eligible", () => {
  const deps = fakes();
  deps.discountUtils.isEligibleForDiscount = mock.fn(() => true);
  deps.discountUtils.applyDiscount = mock.fn(() => 800);
  const service = createOrderService(deps);
  service.placeOrder({ customerId: "c1", items: [{ sku: "mug", qty: 1 }] });
  assert.equal(deps.discountUtils.applyDiscount.mock.callCount(), 1);
});

test("refundItem restocks and calls taxFor", () => {
  const deps = fakes();
  deps.db.orders.set(1, { id: 1, customer_id: "c2", items: [{ sku: "mug", qty: 2, line_total_cents: 3600 }], refunded_cents: 0 });
  const service = createOrderService(deps);
  service.refundItem(1, "mug");
  assert.deepEqual(deps.inventoryRepo.incrementStock.mock.calls[0].arguments, ["mug", 2]);
  assert.equal(deps.taxUtils.taxFor.mock.callCount(), 1);
});
