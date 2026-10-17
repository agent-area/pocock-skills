// In-memory stand-in for the shop database. Rows keep the database's
// snake_case column names.
export function createDb() {
  return {
    products: new Map([
      ["mug", { sku: "mug", name: "Enamel mug", unit_price_cents: 1800, tax_class: "standard" }],
      ["beans", { sku: "beans", name: "Coffee beans 1kg", unit_price_cents: 2400, tax_class: "food" }],
      ["grinder", { sku: "grinder", name: "Hand grinder", unit_price_cents: 6500, tax_class: "standard" }],
      ["book", { sku: "book", name: "Brewing handbook", unit_price_cents: 2200, tax_class: "books" }],
    ]),
    stock: new Map([
      ["mug", 40],
      ["beans", 100],
      ["grinder", 5],
      ["book", 12],
    ]),
    customers: new Map([
      ["c1", { id: "c1", name: "Ana", region: "PT", loyalty_tier: "gold" }],
      ["c2", { id: "c2", name: "Ben", region: "PT", loyalty_tier: "none" }],
      ["c3", { id: "c3", name: "Cy", region: "ES", loyalty_tier: "silver" }],
    ]),
    orders: new Map(),
    nextOrderId: 1,
  };
}
