import {float64, z} from 'zod'


export const ProductSchema = z.object({
    params : z.object({
        id: z.string().transform(Number).optional()
    }),

    body: z.object({
        name: z.string(),
        description: z.string(),
        category: z.string(),
        price: z.number(),
        stockQuantity: z.number()
    })
})