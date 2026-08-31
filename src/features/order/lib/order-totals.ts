import { DAILY_PIECE_LIMIT } from "@/config/capacity";
import type { OrderLineItem, OrderSize } from "../model/order.types";

export type OrderTotals = {
  totalPieces: number;
  totalPrice: number;
};

/**
 * Central calculation of an order's piece and price totals across every
 * selected size line. Kept pure so the form, the summary and the WhatsApp
 * message all agree on the same numbers.
 */
export function computeOrderTotals(
  items: OrderLineItem[],
  sizes: OrderSize[],
): OrderTotals {
  let totalPieces = 0;
  let totalPrice = 0;

  for (const item of items) {
    const size = sizes.find((candidate) => candidate.id === item.sizeId);
    if (!size) continue;
    totalPieces += size.pieceCount * item.quantity;
    totalPrice += size.price * item.quantity;
  }

  return { totalPieces, totalPrice };
}

/**
 * Whether a size can be added once more without exceeding the per-order piece
 * limit. The quantity increments by one table, so a size is blocked when its
 * single-table piece count would push the order past the limit.
 */
export function canAddSize(
  totals: OrderTotals,
  size: OrderSize,
  limit: number = DAILY_PIECE_LIMIT,
): boolean {
  return totals.totalPieces + size.pieceCount <= limit;
}
