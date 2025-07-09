import { ProfileLinkConfigSchema, type ProcessedProfileLink, type ProfileLinkType } from '@/types'
import { profileLinkDefinitions } from '@/theme'

/**
 * @description Extract username from URL for different platforms
 * @param {ProfileLinkType} type - The type of profile link
 * @param {string} url - The URL to extract username from
 * @returns {string} The extracted username or the original URL if extraction fails
 * @note Any profile link type that is not defined here will use default label
 */
function extractUsername(type: ProfileLinkType, url: string): string {
  try {
    // Handle email separately - show obfuscated display instead of full email
    if (type === 'mail') {
      const cleanEmail = url.replace('mailto:', '')
      const [username, domain] = cleanEmail.split('@')
      return `${username}@${domain.split('.')[0]}...`
    }

    // For URLs, try to extract username from path
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`)
    const pathSegments = urlObj.pathname.split('/').filter(Boolean)

    switch (type) {
      case 'github':
      case 'gitlab':
        return pathSegments[0] || url

      case 'twitter':
      case 'x':
        return pathSegments[0]?.replace('@', '') || url

      case 'linkedin':
        // LinkedIn URLs can be /in/username or /pub/username
        return pathSegments[1] || pathSegments[0] || url

      case 'reddit':
        // Reddit URLs are /user/username or /u/username
        return pathSegments[1] || url

      case 'youtube':
        // YouTube can be /c/channel, /@username, or /channel/id
        if (pathSegments[0] === 'c' || pathSegments[0] === 'channel') {
          return pathSegments[1] || url
        }
        return pathSegments[0]?.replace('@', '') || url

      case 'instagram':
      case 'tiktok':
      case 'facebook':
      case 'medium':
      case 'behance':
      case 'discord':
      case 'snapchat':
      case 'threads':
      case 'mastodon':
      case 'bluesky':
        return pathSegments[0]?.replace('@', '') || url

      case 'stackOverflow':
        // Stack Overflow URLs are like stackoverflow.com/users/123456/username
        return pathSegments[2] || pathSegments[1] || url

      case 'web':
        return url

      default:
        // Generic fallback: try to get the first path segment
        return pathSegments[0] || urlObj.hostname.split('.')[0] || url
    }
  } catch {
    // If URL parsing fails, return the original URL
    return url
  }
}

/**
 * @description Validates and processes profile configuration into renderable format
 * @param {unknown} rawProfileLinkConfig - Raw profile configuration object to validate and process
 * @returns {ProcessedProfileLink[]} Array of processed links with metadata: url, type, label, iconClass
 * @throws {z.ZodError} If validation fails
 */
export function processProfileLinks(rawProfileLinkConfig: unknown): ProcessedProfileLink[] {
  // Extract keys from original input to preserve insertion order
  const inputKeys = Object.keys(rawProfileLinkConfig || {})

  // Validate the profile configuration object
  const schema = ProfileLinkConfigSchema()
  const validatedLinks = schema.parse(rawProfileLinkConfig)

  return inputKeys
    .filter((type) => {
      const linkConfig = validatedLinks[type as ProfileLinkType]
      return linkConfig !== undefined && linkConfig !== null && linkConfig !== ''
    })
    .map((type) => {
      const profileLinkType = type as ProfileLinkType
      const linkConfig = validatedLinks[profileLinkType]!
      const definition = profileLinkDefinitions[profileLinkType]

      // Extract URL
      const url = typeof linkConfig === 'string' ? linkConfig : linkConfig.url
      const transformedUrl = profileLinkType === 'mail' ? `mailto:${url}` : url

      // Extract user-provided label from linkConfig object
      const labelStr = typeof linkConfig === 'string' ? undefined : linkConfig.label

      const label = (() => {
        if (labelStr === 'platform') {
          return definition.label
        } else if (labelStr) {
          return labelStr
        } else {
          // Only try username extraction for supported types
          if (definition.supportsUsernameExtraction) {
            return extractUsername(profileLinkType, url)
          } else {
            return definition.label
          }
        }
      })()

      return {
        type: profileLinkType,
        url: transformedUrl,
        label,
        iconClass: definition.iconClass
      } satisfies ProcessedProfileLink
    })
}
