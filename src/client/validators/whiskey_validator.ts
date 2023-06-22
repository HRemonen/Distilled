import { z } from 'zod'

import whiskeyTypes from '../assets/whiskeyTypes.json'

const validWhiskeyType = (value: string) => {
  const whiskeyType = whiskeyTypes.find((type) => type.name === value)

  return !!whiskeyType
}

export const WhiskeyZod = z.object({
  id: z.string().uuid(),
  name: z.string().nonempty(),
  distillery_id: z.string().uuid(),
  type: z.string().nonempty(),
  age: z.number().int().min(0),
  description: z.string(),
})

export type Whiskey = z.infer<typeof WhiskeyZod>

export const NewWhiskeyZod = z.object({
  name: z.string().nonempty(),
  distillery_id: z.string().uuid(),
  type: z.string().refine(validWhiskeyType, {
    message: 'Invalid whiskey type selection',
  }),
  age: z.number().int().min(0),
  description: z.string().optional(),
})

export type NewWhiskey = z.infer<typeof NewWhiskeyZod>
