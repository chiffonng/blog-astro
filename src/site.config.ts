import type { CardListData, Config, IntegrationUserConfig, ThemeUserConfig } from 'astro-pure/types'
import type { ProfileLinkConfig } from '@/types/contacts'

/**
 * @constant {ThemeUserConfig} theme
 * @description Theme configuration for the site
 * @see https://astro-pure.js.org/docs/themes/user-config
 */
export const theme: ThemeUserConfig = {
  // === Basic configuration ===
  /** Title for your website. Will be used in metadata and as browser tab title. */
  title: 'My Chiffon N.',
  /** Will be used in index page & copyright declaration */
  author: 'My (Chiffon) Nguyen',
  /** Description metadata for your website. Can be used in page metadata. */
  description: '',
  /** The default favicon for your site which should be a path to an image in the `public/` directory. */
  favicon: '/favicon/favicon.ico',
  /** Specify the default language for this site. */
  locale: {
    lang: 'en-US',
    attrs: 'en_US',
    // Date locale
    dateLocale: 'en-US',
    dateOptions: {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }
  },
  /** Set a logo image to show in the homepage. */
  logo: {
    src: 'src/assets/avatar.jpg',
    alt: 'Avatar'
  },

  // === Global configuration ===
  titleDelimiter: '•',
  prerender: true,
  npmCDN: 'https://cdn.jsdelivr.net/npm',

  // Still in test
  head: [
    /* Telegram channel */
    // {
    //   tag: 'meta',
    //   attrs: { name: 'telegram:channel', content: '@cworld0_cn' },
    //   content: ''
    // }
  ],
  customCss: [],

  /** Configure the header of your site. */
  header: {
    menu: [
      { title: 'Projects', link: '/projects' },
      { title: 'Teaching', link: '/teaching' },
      { title: 'Blog', link: '/blog' },
      { title: 'Tools', link: '/tools' },
      { title: 'Now', link: '/now' }
    ]
  },

  /** Configure the footer of your site. */
  footer: {
    links: [
      {
        title: 'Source Code',
        link: 'https://github.com/chiffonng/blog-astro'
      }
    ],
    /** Enable displaying a “Astro & Pure theme powered” link in your site’s footer. */
    credits: true
    /** Optional details about the social media accounts for this site. */
  },

  content: {
    externalLinksContent: ' ↗',
    /** Blog page size for pagination (optional) */
    blogPageSize: 8,
    externalLinkArrow: true, // show external link arrow
    // Currently support weibo, x, bluesky
    share: ['weibo', 'x', 'bluesky']
  }
}

/**
 * @description Profile links configuration for the site
 * @property {string} - The type of profile link 
 * @property {string} - The URL or value for the profile link
 * @note All values are optional. See {@link ProfileLinkConfig} for all possible values. 
 * @note Add new link types to src/types/profileLinkDefinitions, or extend the object with new properties.
 */
export const profileLinks: ProfileLinkConfig = {
  mail: 'chiffonng136@gmail.com',
  github: 'https://github.com/chiffonng',
  googleScholar: 'https://scholar.google.com/citations?user=a25a-rUAAAAJ',
  cv: 'doc/cv.pdf', // relative to public/
  x: 'https://x.com/chiffonng',
}

export const integ: IntegrationUserConfig = {
  // Links management
  // See: https://astro-pure.js.org/docs/integrations/links
  links: {
    logbook: [],
    applyTip: []
  },
  // Enable page search function
  pagefind: true,
  // Add a random quote to the footer (default on homepage footer)
  // See: https://astro-pure.js.org/docs/integrations/advanced#web-content-render
  quote: {
    // https://developer.hitokoto.cn/sentence/#%E8%AF%B7%E6%B1%82%E5%9C%B0%E5%9D%80
    // server: 'https://v1.hitokoto.cn/?c=i',
    // target: (data) => (data as { hitokoto: string }).hitokoto || 'Error'
    // https://github.com/lukePeavey/quotable
    server: 'https://api.quotable.io/quotes/random?maxLength=60',
    target: `(data) => data[0].content || 'Error'`
  },
  // UnoCSS typography
  // See: https://unocss.dev/presets/typography
  typography: {
    class: 'text-muted-foreground prose dark:prose-invert prose-a:text-primary'
  },
  // A lightbox library that can add zoom effect
  // See: https://astro-pure.js.org/docs/integrations/others#medium-zoom
  mediumZoom: {
    enable: true, // disable it will not load the whole library
    selector: '.prose .zoomable',
    options: {
      className: 'zoomable'
    }
  },
  waline: {
    enable: false
  }
}

export const terms: CardListData = {
  title: 'Terms content',
  list: [
    {
      title: 'Privacy Policy',
      link: '/terms/privacy-policy'
    },
    {
      title: 'Terms and Conditions',
      link: '/terms/terms-and-conditions'
    },
    {
      title: 'Copyright',
      link: '/terms/copyright'
    },
    {
      title: 'Disclaimer',
      link: '/terms/disclaimer'
    }
  ]
}

const config = { ...theme, integ, profileLinks } as Config
export default config
