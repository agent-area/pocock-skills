const RATES = {
  PT: { standard: 0.23, food: 0.06, books: 0.06 },
  ES: { standard: 0.21, food: 0.1, books: 0.04 },
};

export function taxRate(region, taxClass) {
  const regionRates = RATES[region];
  if (!regionRates) throw new Error(`no tax rates for region ${region}`);
  return regionRates[taxClass] ?? regionRates.standard;
}

export function taxFor(amountCents, region, taxClass) {
  return Math.round(amountCents * taxRate(region, taxClass));
}
