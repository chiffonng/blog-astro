/**
 * @fileoverview Zod schemas and TS types for profile config, including profile links
 */

import { z } from 'astro/zod'

import { profileLinkDefinitions } from '../theme'
import { audioPathSchema } from './common'

/**
 * @description Profile link type inferred from theme definitions
 */
export type ProfileLinkType = keyof typeof profileLinkDefinitions
export const profileLinkKeys = Object.keys(profileLinkDefinitions) as Array<ProfileLinkType>

/**
 * @description Get appropriate validation schema for each profile link type
 */
const getLinkSchema = (type: ProfileLinkType): z.ZodString => {
  switch (type) {
    case 'mail':
    case 'email':
      return z
        .string()
        .min(1, 'Email cannot be empty')
        .email({ message: 'Must be a valid email address' })
    case 'cv':
    case 'resume':
      return z.string().min(1, 'Path/URL cannot be empty')
    case 'rss':
      return z.string().min(1, 'RSS path cannot be empty')
    default:
      return z.string().min(1, 'URL cannot be empty').url({ message: 'Must be a valid URL' })
  }
}

/**
 * @description Helper to create profile link schema for a specific type
 */
const createProfileLinkSchema = <T extends ProfileLinkType>(type: T) => {
  return z
    .union([
      getLinkSchema(type),
      z.object({
        url: getLinkSchema(type),
        label: z.union([z.string().min(1), z.literal('platform')]).optional()
      })
    ])
    .optional()
}

/**
 * @description Mapped type for profile links configuration with full intellisense
 * Each key from ProfileLinkType can be either:
 * - A direct URL/email/path string
 * - An object with { url: string, label?: string | "platform" }
 */
export type ProfileLinkConfig = {
  [K in ProfileLinkType]?:
    | string
    | {
        url: string
        label?: string | 'platform'
      }
}

/**
 * @description Schema for profile links configuration object
 */
export const ProfileLinkConfigSchema = z
  .object(
    Object.fromEntries(profileLinkKeys.map((key) => [key, createProfileLinkSchema(key)])) as Record<
      ProfileLinkType,
      ReturnType<typeof createProfileLinkSchema>
    >
  )
  .partial()

/**
 * @description Schema for processed profile link with metadata
 */
export type ProcessedProfileLink = {
  type: ProfileLinkType
  url: string
  label: string
  iconClass: string
}

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
   * @docs Profile links configuration, validated by Zod schema.
   * The order of profile links entered will be preserved.
   *
   * See {@link ProfileLinkType} for supported profile links.
   *
   * Object "links" accept two formats: key-value and key-object. See {@link ProfileLinkConfig}.
   *
   * @example
   * ```typescript
   * links: {
   *  github: "https://github.com/username",
   *  mail: "example@gmail.com",
   *  resume: 'Valid URL or local path to your resume'
   *  bluesky: {
   *    url: 'yourusername.bsky.social'
   *    label: 'text to override how it appears in profile link bar'
   *  }
   * }
   * ```
   * @note If you don't want to override, use key-value format instead of key-object format
   */
  links: ProfileLinkConfigSchema.describe('Profile links configuration test')
})

// FIXME: This results in long popup for intellisense
export type ProfileConfig = z.infer<typeof ProfileConfigSchema>
