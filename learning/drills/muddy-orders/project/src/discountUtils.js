// Loyalty discount: a flat amount off orders above a threshold.
const LOYALTY_DISCOUNT_CENTS = { gold: 1000, silver: 500 };
const DISCOUNT_THRESHOLD_CENTS = 5000;

export function isEligibleForDiscount(customerRow, amountCents) {
  return (
    customerRow.loyalty_tier in LOYALTY_DISCOUNT_CENTS &&
    amountCents >= DISCOUNT_THRESHOLD_CENTS
  );
}

export function applyDiscount(amountCents, customerRow) {
  const off = LOYALTY_DISCOUNT_CENTS[customerRow.loyalty_tier] ?? 0;
  return Math.max(0, amountCents - off);
}
