import type { OrderDraft } from "./order.types";

export const emptyOrderDraft = {
  items: [],
} satisfies OrderDraft;
