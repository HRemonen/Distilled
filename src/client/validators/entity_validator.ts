import { z } from 'zod'

export const EntityZod = z.object({
  id: z.string().uuid(),
})

export type Entity = z.infer<typeof EntityZod>

export const ReviewZod = z.object({
  rating: z.number().int().min(0).max(5),
  comment: z.string().optional(),
})

export type Review = z.infer<typeof ReviewZod>
