/**
 * @fileoverview Zod schemas and TS types for profile links system
 */

import * as fs from 'fs'
import * as path from 'path'

import { profileLinkDefinitions } from '@/theme'
import { z } from 'astro/zod'

/**
 * @description Profile link type inferred from theme definitions
 */
export type ProfileLinkType = keyof typeof profileLinkDefinitions
export const profileLinkKeys = Object.keys(profileLinkDefinitions) as Array<ProfileLinkType>

/**
 * @description Validation schemas for different link types
 */
const emailSchema = z.string().email({ message: 'Must be a valid email address' })
const urlSchema = z.string().url({ message: 'Must be a valid URL' })
const pdfSchema = z.string().refine(
  (val) => {
    const fullPath = path.join(process.cwd(), 'public', val)
    return fs.existsSync(fullPath)
  },
  { message: 'PDF file must exist in public/ directory' }
)

/**
 * @description Get appropriate validation schema for each profile link type
 */
const getLinkSchema = (type: ProfileLinkType): z.ZodTypeAny => {
  switch (type) {
    case 'mail':
      return emailSchema
    case 'cv':
    case 'resume':
      return pdfSchema
    case 'rss':
      return z.string()
    default:
      return urlSchema
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
        label: z.union([z.string(), z.literal('platform')]).optional()
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
 * Provides full intellisense for all profile link types
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
export const ProfileLinkConfigSchema = (): z.ZodType<ProfileLinkConfig> => {
  // Create the runtime schema using the mapped approach
  const schemaShape = Object.fromEntries(
    profileLinkKeys.map((key) => [key, createProfileLinkSchema(key)])
  ) as Record<ProfileLinkType, ReturnType<typeof createProfileLinkSchema>>

  return z.object(schemaShape) as z.ZodType<ProfileLinkConfig>
}

/**
 * @description Schema for processed profile link with metadata
 */
export type ProcessedProfileLink = {
  type: ProfileLinkType
  url: string
  label: string
  iconClass: string
}
