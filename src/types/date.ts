import { z } from 'astro/zod'

/**
 * Custom date validation that accepts both YYYY-MM and YYYY-MM-DD formats
 */
export const dateSchema = z
  .union([
    // Accept ISO date strings (YYYY-MM-DD)
    z.coerce.date(),
    // Accept YYYY-MM format
    z
      .string()
      .regex(/^\d{4}-(?:0[1-9]|1[0-2])$/, 'Invalid month format')
      .transform((val) => new Date(`${val}-01`))
  ])
  .refine((date) => !Number.isNaN(date.getTime()), {
    message: 'Invalid date format. Must be YYYY-MM-DD or YYYY-MM'
  })
