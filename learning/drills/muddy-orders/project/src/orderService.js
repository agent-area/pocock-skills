import * as defaultPrice from "./priceUtils.js";
import * as defaultDiscount from "./discountUtils.js";
import * as defaultTax from "./taxUtils.js";
import * as defaultMapper from "./orderMapper.js";
import { validateOrder as defaultValidate } from "./orderValidator.js";

export function createOrderService({
  db,
  productRepo,
  customerRepo,
  inventoryRepo,
  priceUtils = defaultPrice,
  discountUtils = defaultDiscount,
  taxUtils = defaultTax,
  mapper = defaultMapper,
  validateOrder = defaultValidate,
}) {
  function placeOrder(input) {
    const errors = validateOrder(input);
    if (errors.length) throw new Error(errors.join("; "));

    const customer = customerRepo.getCustomer(input.customerId);
    if (!customer) throw new Error(`unknown customer ${input.customerId}`);

    const row = mapper.toOrderRow(input);

    const lines = row.items.map((item) => {
      const product = productRepo.getProduct(item.sku);
      if (!product) throw new Error(`unknown product ${item.sku}`);
      if (inventoryRepo.getStock(item.sku) < item.qty) {
        throw new Error(`not enough stock for ${item.sku}`);
      }
      return { item, product, total: priceUtils.lineTotal(product, item.qty) };
    });

    const sub = priceUtils.subtotal(lines.map((l) => l.total));
    let discount = 0;
    if (discountUtils.isEligibleForDiscount(customer, sub)) {
      discount = sub - discountUtils.applyDiscount(sub, customer);
    }

    // Spread the discount across lines by value so each line's tax is
    // charged on what the customer actually pays for it.
    let tax = 0;
    for (const line of lines) {
      const share = sub === 0 ? 0 : Math.round((discount * line.total) / sub);
      line.discount = share;
      tax += taxUtils.taxFor(line.total - share, customer.region, line.product.tax_class);
    }

    for (const line of lines) {
      inventoryRepo.decrementStock(line.item.sku, line.item.qty);
    }

    const saved = {
      ...row,
      id: db.nextOrderId++,
      items: lines.map((l) => ({ sku: l.item.sku, qty: l.item.qty, line_total_cents: l.total })),
      subtotal_cents: sub,
      discount_cents: discount,
      tax_cents: tax,
      total_cents: sub - discount + tax,
      refunded_cents: 0,
      status: "placed",
    };
    db.orders.set(saved.id, saved);
    return mapper.toOrderDto(saved);
  }

  function refundItem(orderId, sku) {
    const order = db.orders.get(orderId);
    if (!order) throw new Error(`unknown order ${orderId}`);
    const line = order.items.find((i) => i.sku === sku);
    if (!line) throw new Error(`order ${orderId} has no ${sku}`);
    const customer = customerRepo.getCustomer(order.customer_id);
    const product = productRepo.getProduct(sku);

    let amount = line.line_total_cents + taxUtils.taxFor(line.line_total_cents, customer.region, product.tax_class);
    if (discountUtils.isEligibleForDiscount(customer, amount)) {
      amount = discountUtils.applyDiscount(amount, customer);
    }

    inventoryRepo.incrementStock(sku, line.qty);
    order.refunded_cents += amount;
    order.items = order.items.filter((i) => i.sku !== sku);
    order.status = order.items.length ? "partially_refunded" : "refunded";
    return { orderId, sku, refundedCents: amount };
  }

  function getOrder(orderId) {
    const order = db.orders.get(orderId);
    return order ? mapper.toOrderDto(order) : null;
  }

  return { placeOrder, refundItem, getOrder };
}
