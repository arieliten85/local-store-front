import type {
  DeliveryDate,
  DeliverySlot,
  OrderSize,
  OrderState,
} from "../model/order.types";
import type { OrderContent } from "@/content/content.types";
import { formatPrice } from "./format-order-summary";
import { computeOrderTotals } from "./order-totals";

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
  const date = dates.find((item) => item.id === order.deliveryDate);
  const slot = slots.find((item) => item.id === order.deliverySlot);

  if (order.items.length === 0 || !date || !slot) {
    return "";
  }

  const totals = computeOrderTotals(order.items, sizes);
  const lines = [
    content.message.greeting,
    "",
    `*${content.message.orderSection}*`,
  ];

  for (const item of order.items) {
    const size = sizes.find((candidate) => candidate.id === item.sizeId);
    if (!size) continue;
    lines.push(
      `${content.message.sizeLabel}: ${item.quantity} × ${size.label} · ${formatPrice(
        size.price * item.quantity,
      )}`,
    );
  }

  lines.push(
    `${content.message.totalLabel}: ${totals.totalPieces} ${content.message.piecesLabel} · ${formatPrice(
      totals.totalPrice,
    )}`,
    `${content.message.dayLabel}: ${date.fullLabel}`,
    `${content.message.slotLabel}: ${slot.fullLabel}`,
    "",
    `*${content.message.deliverySection}*`,
    `${content.message.addressLabel}: ${order.address}`,
  );

  if (order.betweenStreets.trim().length > 0) {
    lines.push(
      `${content.message.betweenStreetsLabel}: ${order.betweenStreets}`,
    );
  }

  if (order.floor.trim().length > 0) {
    lines.push(`${content.message.floorLabel}: ${order.floor}`);
  }

  if (order.reference.trim().length > 0) {
    lines.push(`${content.message.referenceLabel}: ${order.reference}`);
  }

  lines.push("");

  lines.push(`*${content.message.customerSection}*`);
  lines.push(`${content.message.nameLabel}: ${order.customerName}`);

  if (order.phone.trim().length > 0) {
    lines.push(`${content.message.phoneLabel}: ${order.phone}`);
  }

  const paymentMethodLabel =
    order.paymentMethod === "transfer"
      ? content.dialog.paymentMethodTransferLabel
      : content.dialog.paymentMethodCashLabel;
  lines.push(`${content.message.paymentLabel}: ${paymentMethodLabel}`);

  lines.push("");
  lines.push(content.message.closing);

  return lines.join("\n");
}

export function buildWhatsAppHref(
  phoneNumber: string,
  message: string,
): string {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
