import type {
  DeliveryDate,
  DeliverySlot,
  OrderSize,
  OrderState,
} from "../model/order.types";
import type { OrderContent } from "@/content/content.types";
import { formatPrice } from "./format-order-summary";

type BuildOrderMessageParams = {
  order: OrderState;
  sizes: OrderSize[];
  dates: DeliveryDate[];
  slots: DeliverySlot[];
  content: OrderContent;
};

export function buildOrderMessage({
  order,
  sizes,
  dates,
  slots,
  content,
}: BuildOrderMessageParams): string {
  const size = sizes.find((item) => item.id === order.size);
  const date = dates.find((item) => item.id === order.deliveryDate);
  const slot = slots.find((item) => item.id === order.deliverySlot);

  if (!size || !date || !slot) {
    return "";
  }

  const lines = [
    content.message.greeting,
    `${content.message.sizeLabel}: ${size.label}`,
    `${content.message.scheduleLabel}: ${date.fullLabel}, ${slot.fullLabel}`,
    `${content.message.addressLabel}: ${order.address}`,
    `${content.message.totalLabel}: ${formatPrice(size.price)}`,
  ];

  return lines.join("\n");
}

export function buildWhatsAppHref(
  phoneNumber: string,
  message: string,
): string {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
