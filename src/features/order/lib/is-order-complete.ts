import type { OrderState } from "../model/order.types";

export function isOrderComplete(order: OrderState): boolean {
  return (
    order.size !== null &&
    order.deliveryDate !== null &&
    order.deliverySlot !== null &&
    order.address.trim().length > 0
  );
}
