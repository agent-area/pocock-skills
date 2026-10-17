export function createInventoryRepo(db) {
  return {
    getStock(sku) {
      return db.stock.get(sku) ?? 0;
    },
    decrementStock(sku, qty) {
      db.stock.set(sku, (db.stock.get(sku) ?? 0) - qty);
    },
    incrementStock(sku, qty) {
      db.stock.set(sku, (db.stock.get(sku) ?? 0) + qty);
    },
  };
}
