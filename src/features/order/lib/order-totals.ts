import { DAILY_PIECE_LIMIT } from "@/config/capacity";
import { flavorSalePrices } from "@/config/pricing";
import type { OrderLineItem, OrderSize } from "../model/order.types";

export type OrderTotals = {
  totalPieces: number;
  totalPrice: number;
};

/**
 * Central calculation of an order's piece and price totals across every
 * selected line. Kept pure so the form, the summary and the WhatsApp
 * message all agree on the same numbers.
 *
 * A personalized line (one that carries `customFlavors`) derives its pieces
 * and price by summing its flavor lines against `flavorSalePrices`. Fixed
 * lines keep using `size.pieceCount` / `size.price`.
 */
export function computeOrderTotals(
  items: OrderLineItem[],
  sizes: OrderSize[],
): OrderTotals {
  let totalPieces = 0;
  let totalPrice = 0;

  for (const item of items) {
    if (item.customFlavors && item.customFlavors.length > 0) {
      let itemPieces = 0;
      let itemPrice = 0;
      for (const flavor of item.customFlavors) {
        const pieces = flavor.quantity || 0;
        const unitPriceRaw = flavorSalePrices[flavor.flavorId];
        if (unitPriceRaw === undefined) {
          console.warn(
            `[order-totals] missing price for flavorId="${flavor.flavorId}"`,
          );
        }
        const unitPrice = unitPriceRaw ?? 0;
        itemPieces += pieces;
        itemPrice += unitPrice * pieces;
      }
      totalPieces += itemPieces * (item.quantity || 1);
      totalPrice += itemPrice * (item.quantity || 1);
      continue;
    }
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
