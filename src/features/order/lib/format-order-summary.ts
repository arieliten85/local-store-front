import type {
  DeliveryDate,
  DeliverySlot,
  OrderDelivery,
  OrderSize,
  OrderState,
} from "../model/order.types";
import type { OrderContent } from "@/content/content.types";
import { computeOrderTotals } from "./order-totals";

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

export type OrderSummaryLine = {
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
  productLines: OrderSummaryLine[];
  productSubtotal: string | null;
  rows: OrderSummaryRow[];
  total: string | null;
} {
  const dialog = content.dialog;
  const productLines: OrderSummaryLine[] = [];

  const totals = computeOrderTotals(order.items, sizes);

  for (const item of order.items) {
    const size = sizes.find((candidate) => candidate.id === item.sizeId);
    if (!size) continue;
    const lineTotal = size.price * item.quantity;
    const unitLabel =
      item.quantity === 1
        ? dialog.productLineLabelSingular
        : dialog.productLineLabelPlural;
    productLines.push({
      id: `size-${item.sizeId}`,
      label: `${item.quantity} ${unitLabel} ${size.label}`,
      value: formatPrice(lineTotal),
    });
  }

  const productSubtotal =
    totals.totalPrice > 0 ? formatPrice(totals.totalPrice) : null;

  const rows: OrderSummaryRow[] = [];

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

  if (order.betweenStreets.trim().length > 0) {
    rows.push({
      id: "betweenStreets",
      label: dialog.betweenStreetsLabel,
      value: order.betweenStreets,
    });
  }

  if (order.floor.trim().length > 0) {
    rows.push({
      id: "floor",
      label: dialog.floorLabel,
      value: order.floor,
    });
  }

  if (order.reference.trim().length > 0) {
    rows.push({
      id: "reference",
      label: dialog.referenceLabel,
      value: order.reference,
    });
  }

  if (order.customerName.trim().length > 0) {
    rows.push({
      id: "customerName",
      label: dialog.customerNameLabel,
      value: order.customerName,
    });
  }

  if (order.phone.trim().length > 0) {
    rows.push({
      id: "phone",
      label: dialog.phoneLabel,
      value: order.phone,
    });
  }

  if (order.paymentMethod) {
    rows.push({
      id: "paymentMethod",
      label: dialog.paymentMethodLabel,
      value:
        order.paymentMethod === "cash"
          ? dialog.paymentMethodCashLabel
          : dialog.paymentMethodTransferLabel,
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

  const total = totals.totalPrice > 0 ? formatPrice(totals.totalPrice) : null;

  return { productLines, productSubtotal, rows, total };
}
