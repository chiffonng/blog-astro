import type { ProfileConfig } from './types/profile'
import type {
  BlogUserConfig,
  Config,
  FooterUserConfig,
  HeaderUserConfig,
  IntegrationUserConfig,
  ThemeUserConfig,
  UserConfig
} from './types/site-config'
import { ConfigSchema } from './types/site-config'

/**
 * @description Theme configuration for the site
 */
export const theme: ThemeUserConfig = {
  title: 'My Chiffon N.',
  favicon: '/favicon/favicon.ico',
  locale: {
    lang: 'en-US',
    attrs: 'en_US',
    dateLocale: 'en-US',
    dateOptions: {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }
  },
  titleDelimiter: '•',
  prerender: true,
  highlightColor: '#659EB9',
  head: [],
  content: {
    externalLinkArrow: true,
    externalLinksContent: ' ↗'
  },
  npmCDN: 'https://cdn.jsdelivr.net/npm'
}

/**
 * @description Header configuration
 */
export const header: HeaderUserConfig = {
  menu: [
    { title: 'Projects', link: '/projects' },
    { title: 'Teaching', link: '/teaching' },
    { title: 'Blog', link: '/blog' },
    {
      title: 'More',
      submenu: [
        { title: 'Uses', link: '/uses' },
        { title: 'Now', link: '/now' }
      ]
    }
  ]
}

/**
 * @description Footer configuration
 */
export const footer: FooterUserConfig = {
  credits: true,
  sourceCode: 'https://github.com/chiffonng/blog-astro',
  sourceContent: 'https://github.com/chiffonng/blog-content',
  footerLinks: []
}

/**
 * @description Profile configuration for the site
 */
export const profile: ProfileConfig = {
  name: 'My (Chiffon) Nguyen',
  tagline: 'Researcher, Developer, Teacher, and Life-long Learner',
  location: 'San Francisco, CA, USA',
  pronouns: 'she/her/hers',
  pronunciation: 'My = /me/, Chiffon = /shif-ON/, Nguyen = /ngwen/',
  // also supports pronunciationAudioPath

  /**
   * @link src/types/profile-links for more supported profile links
   * @note Build will fail if you use the wrong key
   * */
  links: {
    mail: 'chiffonng136@gmail.com',
    github: 'https://github.com/chiffonng',
    googleScholar: {
      url: 'https://scholar.google.com/citations?user=a25a-rUAAAAJ',
      label: 'platform'
    },
    cv: 'doc/cv.pdf', // under public/ directory
    x: 'https://x.com/chiffonng'
  }
}

export const integ: IntegrationUserConfig = {
  pagefind: true,
  mediumZoom: {
    enable: true,
    selector: '.prose .zoomable',
    options: {
      className: 'zoomable'
    }
  }
}

export const blog: BlogUserConfig = {
  paginatorSize: 8,
  license: {
    type: 'CC-BY-NC-4.0',
    href: 'https://creativecommons.org/licenses/by-nc/4.0/'
  },
  sharePlatforms: ['x', 'linkedin', 'bluesky'] // Choose which platforms to show share buttons for
}

// Process user config through schema to apply defaults
const userConfig: UserConfig = {
  ...theme,
  ...header,
  ...footer,
  ...integ,
  ...profile,
  ...blog
}

// Validate and add default config
const config: Config = ConfigSchema.parse(userConfig)

export default config
