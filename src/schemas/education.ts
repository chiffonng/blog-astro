import { z } from 'astro:content'

import { dateSchema } from './utils'

export const educationSchema = z.object({
  institute: z.string(),
  location: z.string().optional(),
  website: z.string().url().optional(),
  fromDate: dateSchema.or(z.string()).optional(),
  toDate: dateSchema.or(z.string()).optional()
})

export default educationSchema
