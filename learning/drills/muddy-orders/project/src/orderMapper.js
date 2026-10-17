export function toOrderRow(input) {
  return {
    customer_id: input.customerId,
    items: input.items.map((i) => ({ sku: i.sku, qty: i.qty })),
  };
}

export function toOrderDto(row) {
  return {
    id: row.id,
    customerId: row.customer_id,
    items: row.items,
    subtotalCents: row.subtotal_cents,
    discountCents: row.discount_cents,
    taxCents: row.tax_cents,
    totalCents: row.total_cents,
    status: row.status,
  };
}
