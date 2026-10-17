export function validateOrder(input) {
  const errors = [];
  if (!input.customerId) errors.push("customerId is required");
  if (!Array.isArray(input.items) || input.items.length === 0) {
    errors.push("an order needs at least one item");
  } else {
    for (const item of input.items) {
      if (!item.sku) errors.push("every item needs a sku");
      if (!Number.isInteger(item.qty) || item.qty <= 0) {
        errors.push(`bad quantity for ${item.sku}`);
      }
    }
  }
  return errors;
}
