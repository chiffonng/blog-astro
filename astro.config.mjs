import { defineConfig } from 'astro/config'
import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import UnoCSS from 'unocss/astro'
import playformCompress from '@playform/compress'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

// import { visualizer } from 'rollup-plugin-visualizer'

// Local integrations
import { pagefindIntegration } from './src/integrations/pagefind.ts'
// Local rehype & remark plugins
import { remarkAddZoomable, remarkReadingTime } from './src/plugins/remark-plugins.ts'
// Shiki
import {
  addCopyButton,
  addLanguage,
  addTitle,
  transformerNotationDiff,
  transformerNotationHighlight,
  updateStyle
} from './src/plugins/shiki-transformers.ts'
import config from './src/site.config.ts'

// Build remark plugins conditionally
const remarkPlugins = [remarkMath, remarkReadingTime]
if (config.mediumZoom.enable) {
  remarkPlugins.push([remarkAddZoomable, config.mediumZoom.options])
}

export default defineConfig({
  // Top-Level Options
  site: 'https://mychiffonn.com',
  // base: '/docs',
  trailingSlash: 'never',

  // Adapter
  // https://docs.astro.build/en/guides/deploy/
  //

  /** https://docs.astro.build/en/reference/configuration-reference/#imageservice */
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },

  integrations: [
    sitemap(),
    mdx({ optimize: true }),
    UnoCSS({ injectReset: true }),
    pagefindIntegration(config.pagefind),
    playformCompress()
  ],

  prefetch: true,

  // Server Options
  server: {
    host: true
  },
  // Markdown Options
  markdown: {
    remarkPlugins,
    rehypePlugins: [
      [rehypeKatex, {}],
      [rehypeHeadingIds, { headingIdCompat: true }],
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: { className: ['anchor'] },
          content: { type: 'text', value: '🔗' }
        }
      ],
      [
        rehypeExternalLinks,
        {
          content: { type: 'text', value: config.content.externalLinksContent },
          target: '_blank',
          rel: ['nofollow', 'noopener', 'noreferrer']
        }
      ]
    ],
    // https://docs.astro.build/en/guides/syntax-highlighting/
    shikiConfig: {
      themes: {
        light: 'one-light',
        dark: 'one-dark-pro'
      },
      transformers: [
        transformerNotationDiff(),
        transformerNotationHighlight(),
        updateStyle(),
        addTitle(),
        addLanguage(),
        addCopyButton(2000)
      ]
    }
  },
  experimental: {
    contentIntellisense: true
  },
  vite: {
    build: {
      rollupOptions: {
        external: ['/pagefind/pagefind.js', '/pagefind/pagefind.js?url']
      }
    }
    // plugins: [
    //   visualizer({
    //     template: 'list',
    //     filename: 'stats.yaml'
    //   })
    // ]
  }
})
