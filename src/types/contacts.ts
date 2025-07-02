/**
 * @fileoverview TypeScript types for profile links system
 */

import { profileLinkDefinitions } from '@/utils/const'

/**
 * @description All available profile link types
 */
export type ProfileLinkType = keyof typeof profileLinkDefinitions

/**
 * @description Configuration object for profile links with TypeScript intellisense
 */
export type ProfileLinkConfig = {
  [K in ProfileLinkType]?: string
}

/**
 * @description Processed profile link with metadata ready for rendering
 */
export type ProcessedProfileLink = {
  type: ProfileLinkType
  url: string
  label: string
  iconClass: string
}

/**
 * @constant {string[]} profileIconClasses  
 * @description Array of all icon classes for UnoCSS safelist
 */
export const profileIconClasses = Object.values(profileLinkDefinitions).map(({ iconClass }) => iconClass)

export default profileLinkDefinitions