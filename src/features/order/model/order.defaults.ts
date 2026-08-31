import type { OrderDraft, OrderState } from "./order.types";

export const emptyOrderDraft = {
  items: [],
} satisfies OrderDraft;

export const emptyOrderState = {
  items: [],
  deliveryDate: null,
  deliverySlot: null,
  address: "",
  betweenStreets: "",
  floor: "",
  reference: "",
  customerName: "",
  phone: "",
} satisfies OrderState;
