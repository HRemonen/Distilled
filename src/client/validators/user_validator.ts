import { z } from 'zod'

export const UserZod = z.object({
  id: z.string().uuid(),
  username: z.string().nonempty(),
  password: z.string().nonempty(),
  role: z.union([z.literal('user'), z.literal('admin')]).default('user'),
})

export type User = z.infer<typeof UserZod>

export const LoginZod = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
})

export type LoginUser = z.infer<typeof LoginZod>
