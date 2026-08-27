import type { OrderDraft, OrderTotal } from "../model/order.types";

export function formatOrderMessage(order: OrderDraft, total: OrderTotal) {
  const lines = [
    "Hola, quiero consultar por este pedido:",
    ...order.items.map((item) => `- ${item.quantity} x ${item.name}`),
  ];

  if (total.subtotal !== null) {
    lines.push(`Total estimado: ${total.currency} ${total.subtotal}`);
  }

  if (order.customerName) {
    lines.push(`Nombre: ${order.customerName}`);
  }

  if (order.notes) {
    lines.push(`Notas: ${order.notes}`);
  }

  return lines.join("\n");
}
