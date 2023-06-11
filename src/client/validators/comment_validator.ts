import { z } from 'zod'

export const CommentZod = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string().uuid(),
  entity_id: z.string().uuid(),
  comment: z.string().nonempty(),
})

export type Comment = z.infer<typeof CommentZod>
