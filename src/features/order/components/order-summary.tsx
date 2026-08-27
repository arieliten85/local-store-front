import type { OrderDraft, OrderTotal } from "../model/order.types";

type OrderSummaryProps = {
  order: OrderDraft;
  total: OrderTotal;
};

export function OrderSummary({ order, total }: OrderSummaryProps) {
  if (order.items.length === 0) {
    return null;
  }

  return (
    <aside className="rounded-card border-border bg-card border p-6">
      <h2 className="font-heading text-2xl font-semibold">
        Resumen del pedido
      </h2>
      <ul className="text-muted-foreground mt-4 space-y-2 text-sm">
        {order.items.map((item) => (
          <li key={item.id}>
            {item.quantity} x {item.name}
          </li>
        ))}
      </ul>
      <p className="text-accent mt-5 text-sm font-semibold">
        {total.subtotal === null
          ? "Total pendiente de precios confirmados"
          : `${total.currency} ${total.subtotal}`}
      </p>
    </aside>
  );
}
