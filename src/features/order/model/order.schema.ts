import { z } from "zod";

export const orderItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  quantity: z.number().int().positive(),
  unitPrice: z.number().nonnegative().optional(),
});

export const orderDraftSchema = z.object({
  customerName: z.string().min(1).optional(),
  notes: z.string().min(1).optional(),
  items: z.array(orderItemSchema).min(1),
});

export const optionStatusSchema = z.enum([
  "available",
  "selected",
  "soldOut",
  "recommended",
]);

export const orderSizeSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  pieceCount: z.number().int().positive(),
  price: z.number().nonnegative(),
  status: optionStatusSchema,
  note: z.string().optional(),
});

export const deliveryDateSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  fullLabel: z.string().min(1),
  status: optionStatusSchema,
  note: z.string().optional(),
});

export const deliverySlotSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  fullLabel: z.string().min(1),
  status: optionStatusSchema,
  note: z.string().optional(),
});

export const orderLineItemSchema = z.object({
  sizeId: z.string().min(1),
  quantity: z.number().int().positive(),
});

export const orderPaymentMethodSchema = z.enum(["cash", "transfer"]);

export const orderStateSchema = z.object({
  items: z.array(orderLineItemSchema).min(1),
  deliveryDate: z.string().min(1).nullable(),
  deliverySlot: z.string().min(1).nullable(),
  address: z.string(),
  paymentMethod: orderPaymentMethodSchema.nullable(),
});
