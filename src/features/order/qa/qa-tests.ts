import { computeOrderTotals, canAddSize } from "../lib/order-totals";
import {
  buildOrderMessage,
  buildWhatsAppHref,
} from "../lib/build-order-message";
import { flavorSalePrices } from "@/config/pricing";
import { orderSizes, orderWhatsAppNumber } from "@/config/order.config";
import { orderContent } from "@/content/order.content";
import { DAILY_PIECE_LIMIT } from "@/config/capacity";
import type {
  OrderLineItem,
  OrderState,
  DeliveryDate,
  DeliverySlot,
  OrderSize,
} from "../model/order.types";

const sizes: OrderSize[] = orderSizes;

function print(obj: unknown) {
  console.log(JSON.stringify(obj, null, 2));
}

console.log("=== QA: Programmatic checks ===\n");

// New Test 0: initial state
console.log("Test 0: initial empty order totals and items should be empty");
const emptyTotals = computeOrderTotals([], sizes);
print(emptyTotals);
console.log("Expect totalPieces=0 and totalPrice=0");

// Test 1: Custom mixed 32 pieces, 4 flavors
const mixFlavors = [
  "newyork-philly",
  "salmon-cocido",
  "tuna",
  "pollo-y-verdeo",
];
const mixCounts = [8, 8, 8, 8];
const customItem1: OrderLineItem = {
  sizeId: sizes.find((s) => s.pieceCount === 32)!.id,
  quantity: 1,
  customFlavors: mixFlavors.map((f, i) => ({
    flavorId: f,
    quantity: mixCounts[i],
  })),
};
const totals1 = computeOrderTotals([customItem1], sizes);
console.log("Test 1: mixed 32 pieces totals:");
print(totals1);
console.log("Expected subtotal from pricing:");
const expected1 = mixFlavors.reduce(
  (sum, f, i) => sum + (flavorSalePrices[f] ?? 0) * mixCounts[i],
  0,
);
console.log(expected1);

// Build a minimal order state for message
const orderState1: OrderState = {
  items: [customItem1],
  deliveryDate: "2026-09-06",
  deliverySlot: "slot-1",
  address: "Calle Falsa 123",
  betweenStreets: "Mitre y Belgrano",
  floor: "2",
  reference: "Puerta roja",
  customerName: "Ariel",
  phone: "1133334444",
  paymentMethod: "cash",
};
const dates: DeliveryDate[] = [
  {
    id: "2026-09-06",
    label: "06 Sep",
    fullLabel: "06 de Septiembre",
    status: "available",
  },
];
const slots: DeliverySlot[] = [
  {
    id: "slot-1",
    label: "12-14",
    fullLabel: "12:00 - 14:00",
    status: "available",
  },
];

const msg1 = buildOrderMessage({
  order: orderState1,
  sizes,
  dates,
  slots,
  content: orderContent,
});
console.log("Message sample (Test 1):\n", msg1);

// Test 2: Single flavor 16 pieces
const singleItem: OrderLineItem = {
  sizeId: sizes.find((s) => s.pieceCount === 16)!.id,
  quantity: 1,
  customFlavors: [{ flavorId: "tuna", quantity: 16 }],
};
const totals2 = computeOrderTotals([singleItem], sizes);
console.log("\nTest 2: single flavor 16 pieces totals:");
print(totals2);
const orderState2: OrderState = { ...orderState1, items: [singleItem] };
console.log(
  "Message sample (Test 2):\n",
  buildOrderMessage({
    order: orderState2,
    sizes,
    dates,
    slots,
    content: orderContent,
  }),
);

// Test 3: distribute evenly logic (replicate)
function distributeEvenly(pieces: number, n: number) {
  const base = Math.floor(pieces / n);
  const rem = pieces - base * n;
  const counts = Array(n)
    .fill(base)
    .map((v, i) => v + (i < rem ? 1 : 0));
  return counts;
}
console.log("\nTest 3: distribute evenly 16 pieces / 3 flavors:");
console.log(distributeEvenly(16, 3));

// Test 4: fixed combo 32
const fixed32 = {
  sizeId: sizes.find((s) => s.pieceCount === 32)!.id,
  quantity: 1,
};
const totals4 = computeOrderTotals([fixed32 as OrderLineItem], sizes);
console.log("\nTest 4: fixed combo 32 totals:");
print(totals4);
console.log(
  "Message sample (Test 4):\n",
  buildOrderMessage({
    order: { ...orderState1, items: [fixed32 as OrderLineItem] },
    sizes,
    dates,
    slots,
    content: orderContent,
  }),
);

// Test 5: DAILY_PIECE_LIMIT check
console.log("\nTest 5: DAILY_PIECE_LIMIT:", DAILY_PIECE_LIMIT);
console.log(
  "canAddSize when order has near limit (simulate):",
  canAddSize(
    { totalPieces: DAILY_PIECE_LIMIT - 10, totalPrice: 0 },
    sizes.find((s) => s.pieceCount === 16)!,
    DAILY_PIECE_LIMIT,
  ),
);
console.log(
  "canAddSize blocked when would exceed:",
  canAddSize(
    { totalPieces: DAILY_PIECE_LIMIT - 5, totalPrice: 0 },
    sizes.find((s) => s.pieceCount === 16)!,
    DAILY_PIECE_LIMIT,
  ),
);

// Test 6: WhatsAppFab link
const href = buildWhatsAppHref(
  orderWhatsAppNumber,
  "Hola! Tengo una consulta sobre pedidos.",
);
console.log("\nTest 6: WhatsApp href:", href);

console.log("\n=== QA script finished ===");
