import type {
  DeliveryDate,
  DeliverySlot,
  OrderDelivery,
  OrderSize,
  OrderState,
} from "../model/order.types";
import type { OrderContent } from "@/content/content.types";

export function formatPrice(amount: number): string {
  const integer = Math.round(amount).toString();
  const grouped = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `$${grouped}`;
}

export type OrderSummaryRow = {
  id: string;
  label: string;
  value: string;
};

type FormatOrderSummaryParams = {
  order: OrderState;
  sizes: OrderSize[];
  dates: DeliveryDate[];
  slots: DeliverySlot[];
  delivery: OrderDelivery;
  content: OrderContent;
};

export function formatOrderSummary({
  order,
  sizes,
  dates,
  slots,
  delivery,
  content,
}: FormatOrderSummaryParams): {
  rows: OrderSummaryRow[];
  total: string | null;
} {
  const dialog = content.dialog;
  const rows: OrderSummaryRow[] = [];

  const size = sizes.find((item) => item.id === order.size);
  if (size) {
    rows.push({
      id: "size",
      label: dialog.sizeLabel,
      value: `${content.productName} · ${size.label}`,
    });
  }

  const date = dates.find((item) => item.id === order.deliveryDate);
  if (date) {
    rows.push({ id: "date", label: dialog.dateLabel, value: date.fullLabel });
  }

  const slot = slots.find((item) => item.id === order.deliverySlot);
  if (slot) {
    rows.push({ id: "slot", label: dialog.slotLabel, value: slot.fullLabel });
  }

  if (order.address.trim().length > 0) {
    rows.push({
      id: "address",
      label: dialog.addressLabel,
      value: order.address,
    });
  }

  rows.push({
    id: "delivery",
    label: dialog.deliveryLabel,
    value:
      delivery.price === 0
        ? dialog.freeDeliveryValue
        : formatPrice(delivery.price),
  });

  rows.push({
    id: "coverage",
    label: dialog.coverageLabel,
    value: dialog.coverageValue,
  });

  const total = size ? formatPrice(size.price) : null;

  return { rows, total };
}
