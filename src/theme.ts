/**
 * @author My (Chiffon) Nguyen
 * @copyright Apache 2.0
 * @fileoverview Theme definition, including icons and colors
 * @note Add or remove iconClass by either 1) add package iconify-json/<icon-set>
 * or 2) add icon SVGs to src/assets/icons/
 */

/**
 * @constant {Object} profileLinkDefinitions
 * @description Single source of truth for all profile link definitions
 * Covers social media, academic platforms, contact methods, documents, and other links
 * @see https://icones.js.org/collection/academicons - Academic icons
 * @see https://icones.js.org/collection/mingcute - Social media icons
 * @note If you want to support username extraction, see src/utils/process-links.ts
 */
export const profileLinkDefinitions = {
  // Academic platforms (use default labels)
  arxiv: { label: 'arXiv', iconClass: 'i-academicons-arxiv', toExtractUsername: false },
  bioxiv: {
    label: 'bioRxiv',
    iconClass: 'i-academicons-biorxiv',
    toExtractUsername: false
  },
  googleScholar: {
    label: 'Google Scholar',
    iconClass: 'i-academicons-google-scholar',
    toExtractUsername: false
  },
  inspireHEP: {
    label: 'InspireHEP',
    iconClass: 'i-academicons-inspirehep',
    toExtractUsername: false
  },
  orcid: { label: 'ORCID', iconClass: 'i-academicons-orcid', toExtractUsername: false },
  philpapers: {
    label: 'PhilPapers',
    iconClass: 'i-academicons-philpapers',
    toExtractUsername: false
  },
  semanticScholar: {
    label: 'Semantic Scholar',
    iconClass: 'i-academicons-semantic-scholar',
    toExtractUsername: false
  },
  stackOverflow: {
    label: 'Stack Overflow',
    iconClass: 'i-academicons-stackoverflow',
    toExtractUsername: true
  },

  // Social media platforms (most support username extraction)
  behance: {
    label: 'Behance',
    iconClass: 'i-mingcute:behance-line',
    toExtractUsername: true
  },
  bluesky: {
    label: 'Bluesky',
    iconClass: 'i-mingcute:bluesky-social-line',
    toExtractUsername: true
  },
  bilibili: {
    label: 'Bilibili',
    iconClass: 'i-mingcute:bilibili-line',
    toExtractUsername: false
  },
  discord: {
    label: 'Discord',
    iconClass: 'i-mingcute:discord-line',
    toExtractUsername: true
  },
  facebook: {
    label: 'Facebook',
    iconClass: 'i-mingcute:facebook-line',
    toExtractUsername: true
  },
  instagram: {
    label: 'Instagram',
    iconClass: 'i-mingcute:instagram-line',
    toExtractUsername: true
  },
  kakao: {
    label: 'KakaoTalk',
    iconClass: 'i-mingcute:kakaotalk-line',
    toExtractUsername: false
  },
  linkedin: {
    label: 'LinkedIn',
    iconClass: 'i-mingcute:linkedin-line',
    toExtractUsername: true
  },
  mastodon: {
    label: 'Mastodon',
    iconClass: 'i-mingcute:mastodon-line',
    toExtractUsername: true
  },
  medium: {
    label: 'Medium',
    iconClass: 'i-mingcute:medium-line',
    toExtractUsername: true
  },
  reddit: {
    label: 'Reddit',
    iconClass: 'i-mingcute:reddit-line',
    toExtractUsername: true
  },
  snapchat: {
    label: 'Snapchat',
    iconClass: 'i-mingcute:snapchat-line',
    toExtractUsername: true
  },
  threads: {
    label: 'Threads',
    iconClass: 'i-mingcute:threads-line',
    toExtractUsername: true
  },
  tiktok: {
    label: 'TikTok',
    iconClass: 'i-mingcute:tiktok-line',
    toExtractUsername: true
  },
  twitter: {
    label: 'Twitter/X',
    iconClass: 'i-mingcute:twitter-line',
    toExtractUsername: true
  },
  viber: {
    label: 'Viber',
    iconClass: 'i-mingcute:viber-messenger-line',
    toExtractUsername: false
  },
  wechat: {
    label: 'WeChat',
    iconClass: 'i-mingcute:wechat-line',
    toExtractUsername: false
  },
  weibo: { label: 'Weibo', iconClass: 'i-mingcute:weibo-line', toExtractUsername: false },
  whatsapp: {
    label: 'WhatsApp',
    iconClass: 'i-mingcute:whatsapp-line',
    toExtractUsername: false
  },
  x: {
    label: 'X/Twitter',
    iconClass: 'i-mingcute:social-x-line',
    toExtractUsername: true
  },
  youtube: {
    label: 'YouTube',
    iconClass: 'i-mingcute:youtube-line',
    toExtractUsername: true
  },
  zhihu: { label: 'Zhihu', iconClass: 'i-mingcute:zhihu-line', toExtractUsername: false },
  messenger: {
    label: 'Messenger',
    iconClass: 'i-mingcute:messenger-line',
    toExtractUsername: false
  },
  telegram: {
    label: 'Telegram',
    iconClass: 'i-mingcute:telegram-line',
    toExtractUsername: false
  },

  // Professional communication
  mail: { label: 'Email', iconClass: 'i-mingcute:mail-line', toExtractUsername: true },
  email: { label: 'Email', iconClass: 'i-mingcute:mail-line', toExtractUsername: true },
  github: {
    label: 'GitHub',
    iconClass: 'i-mingcute:github-line',
    toExtractUsername: true
  },
  gitlab: {
    label: 'GitLab',
    iconClass: 'i-mingcute:gitlab-line',
    toExtractUsername: true
  },
  notion: {
    label: 'Notion',
    iconClass: 'i-mingcute:notion-line',
    toExtractUsername: false
  },
  slack: { label: 'Slack', iconClass: 'i-mingcute:slack-line', toExtractUsername: false },

  // Content & Media
  newsletter: {
    label: 'Newsletter',
    iconClass: 'i-mingcute:rss-line',
    toExtractUsername: false
  },
  podcast: {
    label: 'Podcast',
    iconClass: 'i-mingcute:mic-line',
    toExtractUsername: false
  },
  rss: { label: 'RSS', iconClass: 'i-mingcute:rss-2-fill', toExtractUsername: false },

  // Documents & Info
  cv: { label: 'CV', iconClass: 'i-academicons-cv', toExtractUsername: false },
  resume: {
    label: 'Resume',
    iconClass: 'i-mingcute:file-info-line',
    toExtractUsername: false
  },
  web: { label: 'Website', iconClass: 'i-mingcute:link-line', toExtractUsername: true }
} as const

export const sponsorIconDefinitions = {
  patreon: { label: 'Patreon', iconClass: 'i-mycons-patreon' },
  github: { label: 'GitHub', iconClass: 'i-mingcute:github-line' },
  paypal: { label: 'PayPal', iconClass: 'i-mingcute:paypal-line' },
  koFi: { label: 'Ko-Fi', iconClass: 'i-mycons-kofi' },
  buyMeACoffee: { label: 'Buy Me a Coffee', iconClass: 'i-mycons-buymeacoffee' }
} as const

export const shareIconDefinitions = {
  copyLink: { label: 'Copy Link', iconClass: 'i-mingcute:link-line' },
  x: { label: 'X (Twitter)', iconClass: 'i-mingcute:social-x-line' },
  bluesky: { label: 'Bluesky', iconClass: 'i-mingcute:bluesky-social-line' },
  linkedin: { label: 'LinkedIn', iconClass: 'i-mingcute:linkedin-line' },
  facebook: { label: 'Facebook', iconClass: 'i-mingcute:facebook-line' },
  weibo: { label: 'Weibo', iconClass: 'i-mingcute:weibo-line' },
  email: { label: 'Email', iconClass: 'i-mingcute:mail-line' }
} as const

/**
 * @description Generate dynamic icon classes for UnoCSS safelist
 * @param profileLinks - The profile links configuration object
 * @returns Array of icon classes that are actually used
 */
export function getProfileIconClasses(profileLinks: Record<string, unknown>): string[] {
  return [
    ...Object.keys(profileLinks)
      .map((key) => profileLinkDefinitions[key as keyof typeof profileLinkDefinitions]?.iconClass)
      .filter(Boolean),
    profileLinkDefinitions.rss.iconClass // Always include RSS
  ] as string[]
}

/**
 * @description Generate share icon classes for UnoCSS safelist based on enabled platforms
 * @param enabledPlatforms - Array of enabled share platforms
 * @returns Array of share icon classes
 */
export function getShareIconClasses(enabledPlatforms: string[] = []): string[] {
  // Always include copy link and email
  const defaultPlatforms = ['copyLink', 'email']
  const allPlatforms = [...new Set([...defaultPlatforms, ...enabledPlatforms])]

  return allPlatforms
    .map(
      (platform) => shareIconDefinitions[platform as keyof typeof shareIconDefinitions]?.iconClass
    )
    .filter(Boolean)
}
