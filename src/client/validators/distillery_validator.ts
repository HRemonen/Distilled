import { z } from 'zod'

const coordinatesSchema = z.tuple([z.number(), z.number()])
const currentYear = new Date().getFullYear()

export const DistilleryZod = z.object({
  id: z.string().uuid(),
  name: z.string().nonempty(),
  location: coordinatesSchema,
  country: z.string().min(2).max(5),
  year_established: z.number().int().min(0).max(currentYear).optional(),
  website: z.string().url().optional(),
})

export type Distillery = z.infer<typeof DistilleryZod>
