import { z } from 'zod'

import countryCodes from '../assets/countryCodes.json'

const coordinatesSchema = z
  .array(z.number().min(-90).max(90))
  .length(2)
  .refine((coords) => !Number.isNaN(coords[0]) && !Number.isNaN(coords[1]), {
    message:
      'Invalid coordinates. Please enter valid latitude and longitude values.',
  })

const validCountryCode = (value: string) => {
  const country = countryCodes.find(
    (country) => country['alpha-2'] === value || country['alpha-3'] === value
  )

  return !!country
}

const currentYear = new Date().getFullYear()

export const DistilleryZod = z.object({
  id: z.string().uuid(),
  name: z.string().nonempty(),
  location: coordinatesSchema,
  country: z.string().min(2).max(5),
  year_established: z.number().int().min(0).max(currentYear),
  website: z.string().url().optional(),
})

export type Distillery = z.infer<typeof DistilleryZod>

export const NewDistilleryZod = z.object({
  name: z.string().nonempty(),
  location: coordinatesSchema,
  country: z.string().refine(validCountryCode, {
    message: 'Invalid country selection',
  }),
  year_established: z.number().int().min(0).max(currentYear),
  website: z.string().url().or(z.literal('')),
})

export type NewDistillery = z.infer<typeof NewDistilleryZod>

export const EditDistilleryZod = z.object({
  name: z.string().nonempty(),
  location: coordinatesSchema,
  country: z.string().refine(validCountryCode, {
    message: 'Invalid country selection',
  }),
  year_established: z.number().int().min(0).max(currentYear),
  website: z.string().url().or(z.literal('')),
})

export type EditDistillery = z.infer<typeof EditDistilleryZod>
