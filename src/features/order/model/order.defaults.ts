import type { OrderDraft, OrderState } from "./order.types";

export const emptyOrderDraft = {
  items: [],
} satisfies OrderDraft;

export const emptyOrderState = {
  size: null,
  deliveryDate: null,
  deliverySlot: null,
  address: "",
} satisfies OrderState;
