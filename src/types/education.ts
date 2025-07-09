import { z } from 'astro/zod'

import { dateSchema } from './date'

export const educationSchema = z.object({
  institute: z.string(),
  location: z.string().optional(),
  website: z.string().url().optional(),
  fromDate: dateSchema.or(z.string()).optional(),
  toDate: dateSchema.or(z.string()).optional()
})

export type EducationType = z.infer<typeof educationSchema>
