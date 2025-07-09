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
  arxiv: { label: 'arXiv', iconClass: 'i-academicons-arxiv', supportsUsernameExtraction: false },
  bioxiv: {
    label: 'bioRxiv',
    iconClass: 'i-academicons-biorxiv',
    supportsUsernameExtraction: false
  },
  googleScholar: {
    label: 'Google Scholar',
    iconClass: 'i-academicons-google-scholar',
    supportsUsernameExtraction: false
  },
  inspireHEP: {
    label: 'InspireHEP',
    iconClass: 'i-academicons-inspirehep',
    supportsUsernameExtraction: false
  },
  orcid: { label: 'ORCID', iconClass: 'i-academicons-orcid', supportsUsernameExtraction: false },
  philpapers: {
    label: 'PhilPapers',
    iconClass: 'i-academicons-philpapers',
    supportsUsernameExtraction: false
  },
  semanticScholar: {
    label: 'Semantic Scholar',
    iconClass: 'i-academicons-semantic-scholar',
    supportsUsernameExtraction: false
  },
  stackOverflow: {
    label: 'Stack Overflow',
    iconClass: 'i-academicons-stackoverflow',
    supportsUsernameExtraction: true
  },

  // Social media platforms (most support username extraction)
  behance: {
    label: 'Behance',
    iconClass: 'i-mingcute:behance-line',
    supportsUsernameExtraction: true
  },
  bluesky: {
    label: 'Bluesky',
    iconClass: 'i-mingcute:bluesky-social-line',
    supportsUsernameExtraction: true
  },
  bilibili: {
    label: 'Bilibili',
    iconClass: 'i-mingcute:bilibili-line',
    supportsUsernameExtraction: false
  },
  discord: {
    label: 'Discord',
    iconClass: 'i-mingcute:discord-line',
    supportsUsernameExtraction: true
  },
  facebook: {
    label: 'Facebook',
    iconClass: 'i-mingcute:facebook-line',
    supportsUsernameExtraction: true
  },
  instagram: {
    label: 'Instagram',
    iconClass: 'i-mingcute:instagram-line',
    supportsUsernameExtraction: true
  },
  kakao: {
    label: 'KakaoTalk',
    iconClass: 'i-mingcute:kakaotalk-line',
    supportsUsernameExtraction: false
  },
  linkedin: {
    label: 'LinkedIn',
    iconClass: 'i-mingcute:linkedin-line',
    supportsUsernameExtraction: true
  },
  mastodon: {
    label: 'Mastodon',
    iconClass: 'i-mingcute:mastodon-line',
    supportsUsernameExtraction: true
  },
  medium: {
    label: 'Medium',
    iconClass: 'i-mingcute:medium-line',
    supportsUsernameExtraction: true
  },
  reddit: {
    label: 'Reddit',
    iconClass: 'i-mingcute:reddit-line',
    supportsUsernameExtraction: true
  },
  snapchat: {
    label: 'Snapchat',
    iconClass: 'i-mingcute:snapchat-line',
    supportsUsernameExtraction: true
  },
  threads: {
    label: 'Threads',
    iconClass: 'i-mingcute:threads-line',
    supportsUsernameExtraction: true
  },
  tiktok: {
    label: 'TikTok',
    iconClass: 'i-mingcute:tiktok-line',
    supportsUsernameExtraction: true
  },
  twitter: {
    label: 'Twitter/X',
    iconClass: 'i-mingcute:twitter-line',
    supportsUsernameExtraction: true
  },
  viber: {
    label: 'Viber',
    iconClass: 'i-mingcute:viber-messenger-line',
    supportsUsernameExtraction: false
  },
  wechat: {
    label: 'WeChat',
    iconClass: 'i-mingcute:wechat-line',
    supportsUsernameExtraction: false
  },
  weibo: { label: 'Weibo', iconClass: 'i-mingcute:weibo-line', supportsUsernameExtraction: false },
  whatsapp: {
    label: 'WhatsApp',
    iconClass: 'i-mingcute:whatsapp-line',
    supportsUsernameExtraction: false
  },
  x: {
    label: 'X/Twitter',
    iconClass: 'i-mingcute:social-x-line',
    supportsUsernameExtraction: true
  },
  youtube: {
    label: 'YouTube',
    iconClass: 'i-mingcute:youtube-line',
    supportsUsernameExtraction: true
  },
  zhihu: { label: 'Zhihu', iconClass: 'i-mingcute:zhihu-line', supportsUsernameExtraction: false },
  messenger: {
    label: 'Messenger',
    iconClass: 'i-mingcute:messenger-line',
    supportsUsernameExtraction: false
  },
  telegram: {
    label: 'Telegram',
    iconClass: 'i-mingcute:telegram-line',
    supportsUsernameExtraction: false
  },

  // Professional communication
  github: {
    label: 'GitHub',
    iconClass: 'i-mingcute:github-line',
    supportsUsernameExtraction: true
  },
  gitlab: {
    label: 'GitLab',
    iconClass: 'i-mingcute:gitlab-line',
    supportsUsernameExtraction: true
  },
  notion: {
    label: 'Notion',
    iconClass: 'i-mingcute:notion-line',
    supportsUsernameExtraction: false
  },
  mail: { label: 'Email', iconClass: 'i-mingcute:mail-line', supportsUsernameExtraction: true },
  slack: { label: 'Slack', iconClass: 'i-mingcute:slack-line', supportsUsernameExtraction: false },

  // Content & Media
  newsletter: {
    label: 'Newsletter',
    iconClass: 'i-mingcute:rss-line',
    supportsUsernameExtraction: false
  },
  podcast: {
    label: 'Podcast',
    iconClass: 'i-mingcute:mic-line',
    supportsUsernameExtraction: false
  },
  rss: { label: 'RSS', iconClass: 'i-mingcute:rss-2-fill', supportsUsernameExtraction: false },

  // Documents & Info
  cv: { label: 'CV', iconClass: 'i-academicons-cv', supportsUsernameExtraction: false },
  resume: {
    label: 'Resume',
    iconClass: 'i-mingcute:file-info-line',
    supportsUsernameExtraction: false
  },
  web: { label: 'Website', iconClass: 'i-mingcute:link-line', supportsUsernameExtraction: true }
} as const

export const sponsorIconDefinitions = {
  patreon: { label: 'Patreon', iconClass: 'i-mycons-patreon' },
  github: { label: 'GitHub', iconClass: 'i-mingcute:github-line' },
  paypal: { label: 'PayPal', iconClass: 'i-mingcute:paypal-line' },
  koFi: { label: 'Ko-Fi', iconClass: 'i-mycons-kofi' },
  buyMeACoffee: { label: 'Buy Me a Coffee', iconClass: 'i-mycons-buymeacoffee' }
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
