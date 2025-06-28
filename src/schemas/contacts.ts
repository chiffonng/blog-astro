/**
 * @fileoverview Zod schema for contact/social links
 * and their corresponding icon classes in UnoCSS Preset Icons
 * @uses https://zod.dev/
 * @uses https://unocss.dev/presets/icons
 */

import { z } from 'astro/zod';

/**
 * @constant {Array} contactDefinitions
 * @description A list of contact definition objects
 * @property {string} type - The type of contact
 * @property {string} label - The label of the contact
 * @property {string} icon - The CSS class of the icon for UnoCSS Preset Icons
 * @see https://icones.js.org/collection/academicons
 * @see https://icones.js.org/collection/mingcute
 */
export const contactDefinitions: { type: string; label: string; iconClass: string }[] = [
  { type: 'arxiv', label: 'arXiv', iconClass: 'i-academicons-arxiv' },
  { type: 'behance', label: 'Behance', iconClass: 'i-mingcute-behance-line' },
  { type: 'bioxiv', label: 'bioRxiv', iconClass: 'i-academicons-biorxiv' },
  { type: 'bluesky', label: 'Bluesky', iconClass: 'i-mingcute-bluesky-social-line' },
  { type: 'discord', label: 'Discord', iconClass: 'i-mingcute-discord-line' },
  { type: 'facebook', label: 'Facebook', iconClass: 'i-mingcute-facebook-line' },
  { type: 'instagram', label: 'Instagram', iconClass: 'i-mingcute-instagram-line' },
  { type: 'mail', label: 'Email', iconClass: 'i-mingcute-mail-line' },
  { type: 'github', label: 'GitHub', iconClass: 'i-mingcute-github-line' },
  { type: 'gitlab', label: 'GitLab', iconClass: 'i-mingcute-gitlab-line' },
  { type: 'googleScholar', label: 'Google Scholar', iconClass: 'i-academicons-google-scholar' },
  { type: 'inspireHEP', label: 'InspireHEP', iconClass: 'i-academicons-inspirehep' },
  { type: 'instagram', label: 'Instagram', iconClass: 'i-mingcute-instagram-line' },
  { type: 'kakao', label: 'KakaoTalk', iconClass: 'i-mingcute-kakaotalk-line' },
  { type: 'linkedin', label: 'LinkedIn', iconClass: 'i-mingcute-linkedin-line' },
  { type: 'location', label: 'Location', iconClass: 'i-mingcute-map-pin-line' },
  { type: 'mastodon', label: 'Mastodon', iconClass: 'i-mingcute-mastodon-line' },
  { type: 'medium', label: 'Medium', iconClass: 'i-mingcute-medium-line' },
  { type: 'messenger', label: 'Messenger', iconClass: 'i-mingcute-messenger-line' },
  { type: 'newsletter', label: 'Newsletter', iconClass: 'i-mingcute-rss-line' },
  { type: 'notion', label: 'Notion', iconClass: 'i-mingcute-notion-line' },
  { type: 'orcid', label: 'ORCID', iconClass: 'i-academicons-orcid' },
  { type: 'philpapers', label: 'PhilPapers', iconClass: 'i-academicons-philpapers' },
  { type: 'phone', label: 'Phone', iconClass: 'i-mingcute-phone-line' },
  { type: 'podcast', label: 'Podcast', iconClass: 'i-mingcute-mic-line' },
  { type: 'reddit', label: 'Reddit', iconClass: 'i-mingcute-reddit-line' },
  { type: 'rss', label: 'RSS', iconClass: 'i-mingcute-rss-2-fill' },
  {
    type: 'semanticScholar',
    label: 'Semantic Scholar',
    iconClass: 'i-academicons-semantic-scholar'
  },
  { type: 'snapchat', label: 'Snapchat', iconClass: 'i-mingcute-snapchat-line' },
  { type: 'stackOverflow', label: 'Stack Overflow', iconClass: 'i-academicons-stackoverflow' },
  { type: 'telegram', label: 'Telegram', iconClass: 'i-mingcute-telegram-line' },
  { type: 'threads', label: 'Threads', iconClass: 'i-mingcute-threads-line' },
  { type: 'tiktok', label: 'TikTok', iconClass: 'i-mingcute-tiktok-line' },
  { type: 'twitter', label: 'Twitter/X', iconClass: 'i-mingcute-twitter-line' },
  { type: 'viber', label: 'Viber', iconClass: 'i-mingcute-viber-messenger-line' },
  { type: 'wechat', label: 'WeChat', iconClass: 'i-mingcute-wechat-line' },
  { type: 'web', label: 'Web', iconClass: 'i-mingcute-link-line' },
  { type: 'weibo', label: 'Weibo', iconClass: 'i-mingcute-weibo-line' },
  { type: 'whatsapp', label: 'WhatsApp', iconClass: 'i-mingcute-whatsapp-line' },
  { type: 'x', label: 'X/Twitter', iconClass: 'i-mingcute-social-x-line' },
  { type: 'youtube', label: 'YouTube', iconClass: 'i-mingcute-youtube-line' }
] as const

/**
 * @type {ContactType}
 * @description The type of contact
 */
export type ContactType = (typeof contactDefinitions)[number]['type']

/**
 * @constant {string[]} contactTypes
 * @description Array of contact types, to be used in uno.config.ts
 */
export const contactTypes = contactDefinitions.map((d) => d.type) as ContactType[]

/**
 * @constant {string[]} contactIconClasses
 * @description Array of contact icons, to be used in uno.config.ts
 */
export const contactIconClasses: string[] = contactDefinitions.map(({ iconClass }) => iconClass)

// Custom validators for special types
const MAIL_SCHEMA = z
  .string()
  .refine((val) => val.startsWith('mailto:') || z.string().email().safeParse(val).success, {
    message: 'Must be a valid email or mailto: link'
  })
const PHONE_SCHEMA = z.string().regex(/^[+]?[1-9][\d]{0,15}$/, 'Invalid phone number format')
const LOCATION_SCHEMA = z.string().min(1, 'Location cannot be empty')
const URL_SCHEMA = z.string().url({ message: 'Must be a valid URL' })

// Build the schema record
const contactSchemaRecord: Record<ContactType, z.ZodTypeAny> = Object.fromEntries(
  contactTypes.map((type) => {
    if (type === 'mail') return [type, MAIL_SCHEMA.optional()]
    if (type === 'phone') return [type, PHONE_SCHEMA.optional()]
    if (type === 'location') return [type, LOCATION_SCHEMA.optional()]
    if (type === 'rss') return [type, z.string().optional()]
    return [type, URL_SCHEMA.optional()]
  })
) as Record<ContactType, z.ZodTypeAny>

/**
 * @constant {z.Schema} ContactConfigSchema
 * @description Used in site.config.ts as type for a map
 * @property {string} [K in ContactType] - The type of contact
 */
export const ContactConfigSchema = z.object(contactSchemaRecord).partial()
export type ContactConfig = z.infer<typeof ContactConfigSchema>

/**
 * @description Validates contact configuration from site.config.ts
 * @param {Partial<ContactConfig>} contacts - The contacts object to validate
 * @returns {Partial<ContactConfig>} The validated contacts object
 */
export function validateContacts(contacts: unknown): ContactConfig {
  return ContactConfigSchema.parse(contacts)
}

/**
 * @description Maps validated contacts to renderable contact objects
 */
export function getSocialIcons(validatedContacts: ContactConfig) {
  return Object.entries(validatedContacts)
    .filter(([, url]) => url !== undefined)
    .map(([type, url]) => {
      const definition = contactDefinitions.find((def) => def.type === type)
      if (!definition) {
        throw new Error(`Unknown contact type: ${type}`)
      }
      return {
        type: type as ContactType,
        url: url!,
        label: definition.label,
        iconClass: definition.iconClass
      }
    })
}
