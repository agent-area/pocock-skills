export function lineTotal(productRow, qty) {
  return productRow.unit_price_cents * qty;
}

export function subtotal(lineTotals) {
  return lineTotals.reduce((sum, n) => sum + n, 0);
}
