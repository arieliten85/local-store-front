import type { OrderDraft, OrderTotal } from "../model/order.types";

export function calculateOrderTotal(
  order: OrderDraft,
  currency: string,
): OrderTotal {
  const hasAllPrices = order.items.every(
    (item) => typeof item.unitPrice === "number",
  );

  if (!hasAllPrices) {
    return { subtotal: null, currency };
  }

  return {
    subtotal: order.items.reduce(
      (total, item) => total + item.quantity * (item.unitPrice ?? 0),
      0,
    ),
    currency,
  };
}
