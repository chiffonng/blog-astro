/**
 * @fileoverview Zod validation schemas for profile links system
 * @uses https://zod.dev/
 */

import * as fs from 'fs'
import * as path from 'path'

import { profileLinkDefinitions } from '@/constants/icons'
import { z } from 'astro/zod'

import {
  type ProcessedProfileLink,
  type ProfileLinkConfig,
  type ProfileLinkType
} from '@/types/links'

// Validation schemas for different link types
const emailSchema = z.string().email({ message: 'Must be a valid email address' })
const urlSchema = z.string().url({ message: 'Must be a valid URL' })
const cvSchema = z.string().refine(
  (val) => {
    const fullPath = path.join(process.cwd(), 'public', val)
    return fs.existsSync(fullPath)
  },
  { message: 'CV file must exist in public/ directory' }
)

// Get appropriate validation schema for each profile link type
const getValidationSchema = (type: ProfileLinkType): z.ZodTypeAny => {
  switch (type) {
    case 'mail':
      return emailSchema
    case 'cv':
      return cvSchema
    case 'rss':
      return z.string()
    default:
      return urlSchema
  }
}

const profileLinkTypes = Object.keys(profileLinkDefinitions) as ProfileLinkType[]

/**
 * @constant {z.ZodType} ProfileLinkConfigSchema
 * @description Validates profile link configuration with appropriate schemas
 */
const ProfileLinkConfigSchema = z
  .object(
    Object.fromEntries(profileLinkTypes.map((type) => [type, getValidationSchema(type).optional()]))
  )
  .partial() as z.ZodType<ProfileLinkConfig>

/**
 * @description Validates and processes profile links into renderable format
 * @param {unknown} profileLinks - Raw profile links object to validate and process
 * @returns {ProcessedProfileLink[]} Array of processed links with metadata: url. type, label, iconClass
 * @throws {z.ZodError} If validation fails
 */
export function processProfileLinks(profileLinks: unknown): ProcessedProfileLink[] {
  // Validate the profile links object
  const validatedLinks = ProfileLinkConfigSchema.parse(profileLinks)

  // Transform to processed profile links, preserving exact insertion order
  // Use Object.keys() on the original input to maintain insertion order
  const inputKeys = Object.keys(profileLinks as Record<string, unknown>)

  return inputKeys
    .filter((type) => {
      const url = validatedLinks[type as ProfileLinkType]
      return url !== undefined && url !== null && url !== ''
    })
    .map((type) => {
      const profileType = type as ProfileLinkType
      const url = validatedLinks[profileType]!
      const definition = profileLinkDefinitions[profileType]

      // Transform URL based on link type
      const transformedUrl = profileType === 'mail' ? `mailto:${url}` : url

      return {
        type: profileType,
        url: transformedUrl,
        label: definition.label,
        iconClass: definition.iconClass
      } satisfies ProcessedProfileLink
    })
}
