import type {
  DeliveryDate,
  DeliverySlot,
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

export const deliveryDates = [
  {
    id: "date-2026-08-28",
    label: "Viernes 28 Ago",
    fullLabel: "Viernes 28 de agosto",
    status: "available",
    note: "Quedan 4 cupos",
  },
  {
    id: "date-2026-08-29",
    label: "Sábado 29 Ago",
    fullLabel: "Sábado 29 de agosto",
    status: "available",
  },
] satisfies DeliveryDate[];

export const deliverySlots = [
  {
    id: "slot-18-19",
    label: "18-19h",
    fullLabel: "18:00 — 19:00",
    status: "available",
    note: "Pocos cupos",
  },
  {
    id: "slot-19-20",
    label: "19-20h",
    fullLabel: "19:00 — 20:00",
    status: "available",
  },
  {
    id: "slot-20-21",
    label: "20-21h",
    fullLabel: "20:00 — 21:00",
    status: "soldOut",
  },
] satisfies DeliverySlot[];

export const orderDelivery = {
  price: 0,
  currency: "ARS",
  coverageKm: 3,
} satisfies OrderDelivery;

export const orderWhatsAppNumber = "5491130000000";
