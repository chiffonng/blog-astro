/**
 * @fileoverview Zod schemas and TS types for profile links system
 */

import { z } from 'astro/zod'

import { profileLinkDefinitions } from '@/theme'

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
 *
 * @example
 * ```typescript
 * const links: ProfileLinkConfig = {
 *   github: "https://github.com/username",
 *   mail: "example@gmail.com",
 *   cv: "/path/to/cv.pdf",
 *   googleScholar: {
 *     url: "https://scholar.google.com/...",
 *     label: "platform"
 *   }
 * }
 * ```
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
