import { z } from 'zod'

export const EntityZod = z.object({
  id: z.string().uuid(),
})

export type Entity = z.infer<typeof EntityZod>
