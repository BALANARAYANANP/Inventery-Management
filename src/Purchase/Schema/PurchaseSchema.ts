import {float64, z} from 'zod'


export const PurchaseSchema = z.object({
    params : z.object({
        id: z.string().transform(Number).optional()
    }),

    body: z.object({
        customerId: z.number().optional(),
        Status: z.string().optional()
    })
})