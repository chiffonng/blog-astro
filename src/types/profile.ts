import { z } from 'astro/zod'

import { audioPathSchema, ProfileLinkConfigSchema } from '@/types'

/**
 * @description Schema for profile configuration including personal info
 */
export const ProfileConfigSchema = z.object({
  /** Full name, including prefix like Dr. and Prof. */
  name: z.string().describe('Full name, including prefix like Dr. and Prof.'),

  /** One line introduction, max 80 characters */
  tagline: z.string().max(80).describe('One-line introduction'),

  /** Your current location, optional */
  location: z.string().optional(),

  /** Your phone number, optional. Accept international format with + and () */
  phone: z
    .string()
    .regex(/^[+]?[\d\s().-]{7,22}$/, {
      message:
        'Invalid phone number format. Examples: +1 (628) 900-6301, +44 20 7946 0958. Brackets () and plus + are optional'
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

  /** Your preferred pronouns, optional */
  pronouns: z.string().max(20).optional(),

  /** Optional short text to guide viewers how to pronounce your name */
  pronunciation: z
    .string()
    .optional()
    .describe('Optional short text to guide viewers how to pronounce your name'),

  /** Optional path to an audio of how to pronounce your name */
  pronunciationAudioPath: audioPathSchema
    .optional()
    .describe('Optional path to an audio of how to pronounce your name'),

  /**
   * @docs Profile links configuration, validated by Zod schema
   * @link See 'src/types/profile-links.ts' for supported profile links
   * @example
   * Object "links" accept two formats: key-value and key-object
   * links: {
   *  resume: 'Valid URL or local path to your resume'
   *  bluesky: {
   *    url: 'yourusername.bsky.social'
   *    label: 'text to override how it appears in profile link bar'
   *  }
   * }
   * @note If you don't want to override, use key-value format instead of key-object format
   */
  links: ProfileLinkConfigSchema.describe('Profile links configuration test')
})

// This results in long popup for intellisense
export type ProfileConfig = z.infer<typeof ProfileConfigSchema>
