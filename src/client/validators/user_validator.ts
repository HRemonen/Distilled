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

export const RegisterZod = z
  .object({
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters long')
      .nonempty(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .nonempty(),
    passwordConfirm: z.string().nonempty(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwords must match',
    path: ['passwordConfirm'],
  })

export type RegisterUser = z.infer<typeof RegisterZod>
