import { z } from "zod";

export const PurchaseItemSchema = z.object({
  params: z.object({
    id: z.string().transform(Number).optional()
  }),
  body: z.object({
    purchaseId: z.number(),
    productId: z.number(),
    quantity: z.number()
  })
});
