import { z } from 'astro:content'

import { dateSchema, removeDupsAndLowerCase } from './utils'

export const projectsSchema = z
  .object({
    title: z.string(),
    isHighlighted: z.boolean().default(false),
    fromDate: dateSchema.optional(),
    toDate: dateSchema.optional(),
    repo: z.string().url().optional(),
    doc: z.string().url().optional(),
    url: z.string().url().optional(),
    release: z.string().url().optional(),
    context: z.enum(['school', 'personal', 'work']).optional(),
    tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase).optional()
  })
  .refine(
    // Validate that toDate is after fromDate
    (data) => {
      if (!data.fromDate || !data.toDate) return true
      return data.toDate >= data.fromDate
    },
    {
      message: 'End date must be after or equal to start date'
    }
  )
