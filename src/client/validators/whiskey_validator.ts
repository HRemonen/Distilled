import { z } from 'zod'

export const WhiskeyZod = z.object({
  id: z.string().uuid(),
  name: z.string().nonempty(),
  distillery_id: z.string().uuid(),
  type: z.string().nonempty(),
  age: z.number().int().min(0),
  description: z.string().optional(),
})

export type Whiskey = z.infer<typeof WhiskeyZod>
