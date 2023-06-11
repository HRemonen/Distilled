import { z } from 'zod'

export const RatingZod = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string().uuid(),
  entity_id: z.string().uuid(),
  rating: z.number().int().min(0).max(5),
})

export type Rating = z.infer<typeof RatingZod>
