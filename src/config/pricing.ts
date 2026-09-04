/**
 * Sale price per sushi piece, keyed by flavor `id` (matches the `id` on the
 * catalog items in `src/content/catalog.content.ts`).
 *
 * These are the SALE prices (cost rounded up to a clean number), NOT the
 * production cost. Keep them up to date with the business owner.
 */
export const flavorSalePrices: Record<string, number> = {
  "newyork-philly": 2000,
  "salmon-cocido": 2200,
  tuna: 2200,
  "pollo-y-verdeo": 1500,
  zanahoria: 1000,
  pepino: 1000,
  remolacha: 1100,
  huevo: 1000,
};
