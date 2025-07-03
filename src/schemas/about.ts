import type { ImageFunction } from 'astro:content'
import { z } from 'astro:schema'

import { audioSchema } from './utils'

// Doc: https://zod.dev/json-schema#object-schemas
export const aboutSchema = ({ image }: { image: ImageFunction }) =>
  z.object({
    name: z.string(), // Full name, and prefix (e.g. Dr., Prof., etc.)
    tagline: z.string(), // One-line introduction
    location: z.string(),
    phone: z
      .string()
      .regex(/^ [+] ? [\d\s().-]{ 7, 22}$ /, {
        message: 'Invalid phone number format. Examples: +1 (628) 900-6301, +44 20 7946 0958'
      })
      .refine(
        (val) => {
          // Remove all non-digit characters except leading +
          const digitsOnly = val.replace(/[^\d+]/g, '').replace(/(?<!^)\+/g, '')
          // Must have 7-15 digits (international standard)
          return digitsOnly.length >= 7 && digitsOnly.length <= 16
        },
        { message: 'Phone number must contain 7-15 digits' }
      )
      .optional(),
    avatar: image(),
    pronouns: z.string().optional(),
    pronunciation: z.string().optional(),
    pronunciationFile: audioSchema.optional()
  })

export default aboutSchema
