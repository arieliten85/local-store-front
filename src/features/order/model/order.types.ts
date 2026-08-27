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
