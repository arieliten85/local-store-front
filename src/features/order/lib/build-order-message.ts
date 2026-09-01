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
  const { message } = content;

  // Saludo condicional: con nombre o genérico
  const hasName = order.customerName.trim().length > 0;
  const greeting = hasName
    ? `${message.defaultGreeting.replace(" 👋", "")}, ${order.customerName} 👋`
    : message.defaultGreeting;

  const lines: string[] = [greeting, ""];

  // 📋 Pedido
  lines.push(`${message.orderSectionIcon} *${message.orderSection}*`);
  for (const item of order.items) {
    const size = sizes.find((candidate) => candidate.id === item.sizeId);
    if (!size) continue;
    lines.push(
      `${message.sizeLabel}: ${item.quantity} × ${size.label} · ${formatPrice(
        size.price * item.quantity,
      )}`,
    );
  }
  lines.push(
    `${message.totalLabel}: ${totals.totalPieces} ${message.piecesLabel} · ${formatPrice(
      totals.totalPrice,
    )}`,
    `${message.dayLabel}: ${date.fullLabel}`,
    `${message.slotLabel}: ${slot.fullLabel}`,
  );

  // 📍 Entrega
  lines.push(
    "",
    `${message.deliverySectionIcon} *${message.deliverySection}*`,
    `${message.addressLabel}: ${order.address}`,
  );
  if (order.betweenStreets.trim().length > 0) {
    lines.push(`${message.betweenStreetsLabel}: ${order.betweenStreets}`);
  }
  if (order.floor.trim().length > 0) {
    lines.push(`${message.floorLabel}: ${order.floor}`);
  }
  if (order.reference.trim().length > 0) {
    lines.push(`${message.referenceLabel}: ${order.reference}`);
  }

  // 💲 Pago
  const paymentMethodLabel =
    order.paymentMethod === "transfer"
      ? content.dialog.paymentMethodTransferLabel
      : content.dialog.paymentMethodCashLabel;
  lines.push(
    "",
    `${message.paymentSectionIcon} *${message.paymentSection}*`,
    paymentMethodLabel,
  );

  // 👤 Datos de contacto
  lines.push("", `${message.contactSectionIcon} *${message.contactSection}*`);
  if (order.phone.trim().length > 0) {
    lines.push(`${message.phoneLabel}: ${order.phone}`);
  }

  // Cierre
  lines.push("", message.closing);

  return lines.join("\n");
}

export function buildWhatsAppHref(
  phoneNumber: string,
  message: string,
): string {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
