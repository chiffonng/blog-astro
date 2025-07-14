import { z } from 'astro/zod'

import { audioPathSchema, ProfileLinkConfigSchema } from '@/types'

// Doc: https://zod.dev/json-schema#object-schemas
export const aboutSchema = z.object({
  name: z.string(), // Full name, and prefix (e.g. Dr., Prof., etc.)
  tagline: z.string().max(80), // One-line introduction
  location: z.string(),
  phone: z
    .string()
    .regex(/^[+]?[\d\s().-]{7,22}$/, {
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
  pronouns: z.string().max(20).optional(),
  pronunciation: z.string().optional(),
  pronunciationAudioPath: audioPathSchema.optional()
})

/**
 * @description Schema for profile configuration
 */
export const ProfileConfigSchema = () =>
  z.object({
    /** Profile links configuration */
    links: ProfileLinkConfigSchema().describe('Profile links configuration')
  })

export type AboutType = z.infer<typeof aboutSchema>
export type ProfileConfig = z.infer<ReturnType<typeof ProfileConfigSchema>>
