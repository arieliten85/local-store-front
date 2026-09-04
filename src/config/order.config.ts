import type {
  OrderDelivery,
  OrderSize,
} from "@/features/order/model/order.types";

export const orderSizes = [
  {
    id: "size-16",
    label: "16 piezas",
    pieceCount: 16,
    price: 24000,
    status: "available",
  },
  {
    id: "size-32",
    label: "32 piezas",
    pieceCount: 32,
    price: 46000,
    status: "available",
  },
  {
    id: "size-48",
    label: "48 piezas",
    pieceCount: 48,
    price: 64000,
    status: "recommended",
  },
] satisfies OrderSize[];

export const orderDelivery = {
  price: 0,
  currency: "ARS",
  coverageKm: 3,
} satisfies OrderDelivery;

export const orderWhatsAppNumber = "5491160997133";
