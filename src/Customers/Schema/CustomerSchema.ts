import {email, z} from 'zod'





export const CustomerUpdationSchema = z.object({
    params: z.object({
      id: z.string().transform(Number).optional()
    }),
    body: z.object({
      name: z.string(),
      email: z.string().email(),
      HashingPassword: z.string(),
      phone: z.string().min(10).max(10),
      address: z.string()
    })
  });
  