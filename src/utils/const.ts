/**
 * @fileoverview Constants for icon class definitions and labels
 */

export const themeIcons = {
  light: 'i-mingcute:sun-line',
  dark: 'i-mingcute:moon-line',
  system: 'i-mingcute:computer-line',
  search: 'i-mingcute:search-line',
  file: 'i-mingcute:file-line',
  link: 'i-mingcute:link-line',
  language: 'i-mingcute:earth-line',
  date: 'i-mingcute:calendar-2-line',
  menu: 'i-mingcute:menu-line',
  tocToggle: 'i-mingcute:list-check-line',
}

export const aboutIcons = {
  avatar: 'i-mingcute:user-line',
  location: 'i-mingcute:map-pin-line',
  phone: 'i-mingcute:phone-line',
  pronouns: 'i-mingcute:speaker-line',
}

export const blogIcons = {
  date: themeIcons.date,
  language: themeIcons.language,
  permalink: themeIcons.link,
  arrow: 'i-mingcute:arrow-right-line',
  arrowHover: 'i-mingcute:book-line',
  updatedDate: 'i-mingcute:clock-line',
  minutesRead: 'i-mingcute:time-duration-line',
  tag: 'i-mingcute:hashtag-line',
  tags: 'i-mingcute:tag-2-line',
  comment: 'i-mingcute:chat-line',
}

export const projectIcons = {
  repo: 'i-mingcute:github-line',
  url: themeIcons.link,
  doc: 'i-mingcute:document-line',
  release: 'i-mingcute:package-line',
}

/**
 * @constant {Object} profileLinkDefinitions
 * @description Single source of truth for all profile link definitions
 * Covers social media, academic platforms, contact methods, documents, and other links
 * @see https://icones.js.org/collection/academicons - Academic icons
 * @see https://icones.js.org/collection/mingcute - Social media icons
 */
export const profileLinkDefinitions = {
  // Academic platforms
  arxiv: { label: 'arXiv', iconClass: 'i-academicons-arxiv' },
  bioxiv: { label: 'bioRxiv', iconClass: 'i-academicons-biorxiv' },
  googleScholar: { label: 'Google Scholar', iconClass: 'i-academicons-google-scholar' },
  inspireHEP: { label: 'InspireHEP', iconClass: 'i-academicons-inspirehep' },
  orcid: { label: 'ORCID', iconClass: 'i-academicons-orcid' },
  philpapers: { label: 'PhilPapers', iconClass: 'i-academicons-philpapers' },
  semanticScholar: { label: 'Semantic Scholar', iconClass: 'i-academicons-semantic-scholar' },
  stackOverflow: { label: 'Stack Overflow', iconClass: 'i-academicons-stackoverflow' },
  
  // Social media platforms
  behance: { label: 'Behance', iconClass: 'i-mingcute:behance-line' },
  bluesky: { label: 'Bluesky', iconClass: 'i-mingcute:bluesky-social-line' },
  bilibili: { label: 'Bilibili', iconClass: 'i-mingcute:bilibili-line' },
  discord: { label: 'Discord', iconClass: 'i-mingcute:discord-line' },
  facebook: { label: 'Facebook', iconClass: 'i-mingcute:facebook-line' },
  instagram: { label: 'Instagram', iconClass: 'i-mingcute:instagram-line' },
  kakao: { label: 'KakaoTalk', iconClass: 'i-mingcute:kakaotalk-line' },
  linkedin: { label: 'LinkedIn', iconClass: 'i-mingcute:linkedin-line' },
  mastodon: { label: 'Mastodon', iconClass: 'i-mingcute:mastodon-line' },
  medium: { label: 'Medium', iconClass: 'i-mingcute:medium-line' },
  reddit: { label: 'Reddit', iconClass: 'i-mingcute:reddit-line' },
  snapchat: { label: 'Snapchat', iconClass: 'i-mingcute:snapchat-line' },
  threads: { label: 'Threads', iconClass: 'i-mingcute:threads-line' },
  tiktok: { label: 'TikTok', iconClass: 'i-mingcute:tiktok-line' },
  twitter: { label: 'Twitter/X', iconClass: 'i-mingcute:twitter-line' },
  viber: { label: 'Viber', iconClass: 'i-mingcute:viber-messenger-line' },
  wechat: { label: 'WeChat', iconClass: 'i-mingcute:wechat-line' },
  weibo: { label: 'Weibo', iconClass: 'i-mingcute:weibo-line' },
  whatsapp: { label: 'WhatsApp', iconClass: 'i-mingcute:whatsapp-line' },
  x: { label: 'X/Twitter', iconClass: 'i-mingcute:social-x-line' },
  youtube: { label: 'YouTube', iconClass: 'i-mingcute:youtube-line' },
  zhihu: { label: 'Zhihu', iconClass: 'i-mingcute:zhihu-line' },
  
  // Professional platforms
  github: { label: 'GitHub', iconClass: 'i-mingcute:github-line' },
  gitlab: { label: 'GitLab', iconClass: 'i-mingcute:gitlab-line' },
  notion: { label: 'Notion', iconClass: 'i-mingcute:notion-line' },
  
  // Communication
  mail: { label: 'Email', iconClass: 'i-mingcute:mail-line' },
  messenger: { label: 'Messenger', iconClass: 'i-mingcute:messenger-line' },
  telegram: { label: 'Telegram', iconClass: 'i-mingcute:telegram-line' },
  
  // Content & Media
  newsletter: { label: 'Newsletter', iconClass: 'i-mingcute:rss-line' },
  podcast: { label: 'Podcast', iconClass: 'i-mingcute:mic-line' },
  rss: { label: 'RSS', iconClass: 'i-mingcute:rss-2-fill' },
  
  // Documents & Info
  cv: { label: 'CV', iconClass: 'i-mingcute:file-info-line' },
  web: { label: 'Website', iconClass: themeIcons.link }
} as const

/**
 * @constant {string[]} profileIconClasses  
 * @description Array of all icon classes for UnoCSS safelist
 */
export const profileIconClasses = Object.values(profileLinkDefinitions).map(({ iconClass }) => iconClass) as string[]