import type {
  OrderDelivery,
  OrderSize,
} from "@/features/order/model/order.types";

export const orderSizes = [
  {
    id: "size-16",
    label: "16 piezas",
    pieceCount: 16,
    price: 16000,
    status: "available",
  },
  {
    id: "size-24",
    label: "24 piezas",
    pieceCount: 24,
    price: 23000,
    status: "available",
  },
  {
    id: "size-48",
    label: "48 piezas",
    pieceCount: 48,
    price: 42000,
    status: "recommended",
  },
] satisfies OrderSize[];

export const orderDelivery = {
  price: 0,
  currency: "ARS",
  coverageKm: 3,
} satisfies OrderDelivery;

export const orderWhatsAppNumber = "5491130000000";
