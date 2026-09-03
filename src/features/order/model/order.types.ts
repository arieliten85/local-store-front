export type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  unitPrice?: number;
};

export type OrderDraft = {
  customerName?: string;
  notes?: string;
  items: OrderItem[];
};

export type OrderTotal = {
  subtotal: number | null;
  currency: string;
};

export type OptionStatus = "available" | "selected" | "soldOut" | "recommended";

export type StaticOptionStatus = Exclude<OptionStatus, "selected">;

export type OrderSize = {
  id: string;
  label: string;
  pieceCount: number;
  price: number;
  status: StaticOptionStatus;
  note?: string;
};

export type OrderLineItem = {
  sizeId: OrderSize["id"];
  quantity: number;
};

export type DeliveryDate = {
  id: string;
  label: string;
  fullLabel: string;
  status: StaticOptionStatus;
  note?: string;
};

export type DeliverySlot = {
  id: string;
  label: string;
  fullLabel: string;
  status: StaticOptionStatus;
  note?: string;
};

export type OrderDelivery = {
  price: number;
  currency: string;
  coverageKm: number;
};

export type ProductFlavorQuantity = {
  "size-16": number;
  "size-32": number;
  "size-48": number;
};

export type ProductFlavorComposition = {
  flavor: string;
  quantities: ProductFlavorQuantity;
};

export type ProductComposition = ProductFlavorComposition[];

export type OrderPaymentMethod = "cash" | "transfer";

export type OrderState = {
  items: OrderLineItem[];
  deliveryDate: DeliveryDate["id"] | null;
  deliverySlot: DeliverySlot["id"] | null;
  address: string;
  betweenStreets: string;
  floor: string;
  reference: string;
  customerName: string;
  phone: string;
  paymentMethod: OrderPaymentMethod | null;
};
