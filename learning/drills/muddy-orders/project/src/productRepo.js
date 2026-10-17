export function createProductRepo(db) {
  return {
    getProduct(sku) {
      return db.products.get(sku) ?? null;
    },
  };
}
