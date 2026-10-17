export function createCustomerRepo(db) {
  return {
    getCustomer(id) {
      return db.customers.get(id) ?? null;
    },
  };
}
