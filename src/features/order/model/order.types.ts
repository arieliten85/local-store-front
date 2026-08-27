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

export type OrderState = {
  size: OrderSize["id"] | null;
  deliveryDate: DeliveryDate["id"] | null;
  deliverySlot: DeliverySlot["id"] | null;
  address: string;
};
