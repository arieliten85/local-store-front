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
