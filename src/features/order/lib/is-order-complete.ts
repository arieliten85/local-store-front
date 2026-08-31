import type { OrderState } from "../model/order.types";

export function isOrderComplete(order: OrderState): boolean {
  return (
    order.items.length > 0 &&
    order.deliveryDate !== null &&
    order.deliverySlot !== null &&
    order.address.trim().length > 0 &&
    order.customerName.trim().length > 0
  );
}
