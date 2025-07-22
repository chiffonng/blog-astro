import { z } from 'astro/zod'

import { faviconSchema } from './common'
import { ProfileConfigSchema } from './profile'

export const SiteMetaSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  ogImage: z.string().optional(),
  articleDate: z.string().optional()
})

export const CoreThemeConfigSchema = z.object({
  title: z.string(),
  favicon: faviconSchema,
  titleDelimiter: z.string(),
  /**
   * Whether to
   * {@link https://docs.astro.build/en/reference/routing-reference/#prerender}
   */
  prerender: z.boolean().default(true),
  /** Display markdown content */
  content: z.object({
    /** Whether to add an arrow to specify external link */
    externalLinkArrow: z.boolean().default(true),
    /** The arrow (unicode string) for external link.
     * @example: ↗, ⤴, 🔗,
     */
    externalLinksContent: z.string().default(' ↗')
  })
})

// Locale and internationalization
export const LocaleConfigSchema = z.object({
  locale: z.object({
    /** Html lang attribute */
    lang: z.string().default('en-US'),
    /** Head og meta locale */
    attrs: z.string().default('en_US'),
    /** Date configuration */
    dateLocale: z.string().default('en-US'),
    dateOptions: z
      .object({
        localeMatcher: z.enum(['best fit', 'lookup']).optional(),
        weekday: z.enum(['narrow', 'short', 'long']).optional(),
        era: z.enum(['narrow', 'short', 'long']).optional(),
        year: z.enum(['numeric', '2-digit']).default('numeric').optional(),
        month: z.enum(['numeric', '2-digit', 'narrow', 'short', 'long']).default('long').optional(),
        day: z.enum(['numeric', '2-digit']).default('numeric').optional(),
        hour: z.enum(['numeric', '2-digit']).optional(),
        minute: z.enum(['numeric', '2-digit']).optional(),
        second: z.enum(['numeric', '2-digit']).optional(),
        timeZoneName: z.enum(['short', 'long']).optional(),
        formatMatcher: z.enum(['best fit', 'basic']).optional(),
        hour12: z.boolean().optional(),
        timeZone: z.string().optional()
      })
      .default({})
      .optional()
  })
})

// Development and external resources
export const DevConfigSchema = z.object({
  /** The npm CDN to use for loading npm packages.
   * @example
   * https://cdn.jsdelivr.net/npm
   * https://unpkg.com/npm
   *
   */
  npmCDN: z
    .string()
    .default('https://cdn.jsdelivr.net/npm')
    .describe('The npm CDN to use for loading npm packages.'),
  head: z
    .array(
      z.object({
        /** Name of the HTML tag to add to `<head>`, e.g. `'meta'`, `'link'`, or `'script'`. */
        tag: z.enum(['title', 'base', 'link', 'style', 'meta', 'script', 'noscript', 'template']),
        /** Attributes to set on the tag, e.g. `{ rel: 'stylesheet', href: '/custom.css' }`. */
        attrs: z.record(z.union([z.string(), z.boolean(), z.undefined()])).default({}),
        /** Content to place inside the tag (optional). */
        content: z.string().default('')
      })
    )
    .default([])
    .optional()
})

// Combined theme schema
export const ThemeConfigSchema = () =>
  CoreThemeConfigSchema.merge(LocaleConfigSchema).merge(DevConfigSchema)

const MenuItemSchema = z.object({
  title: z.string(),
  link: z.string()
})

const SubmenuItemSchema = z.object({
  title: z.string(),
  submenu: z.array(MenuItemSchema)
})

export const HeaderConfigSchema = () =>
  z.object({
    menu: z.array(z.union([MenuItemSchema, SubmenuItemSchema]))
  })

export const FooterConfigSchema = () =>
  z.object({
    credits: z.boolean(),
    sourceCode: z.string().url().optional(),
    /** Source of markdown
     * @note If not provided, infer from sourceCode
     */
    sourceContent: z.string().url().optional(),
    footerLinks: z
      .array(
        z.object({
          href: z.string().url(),
          label: z.string()
        })
      )
      .default([])
  })

export const IntegrationConfigSchema = () =>
  z.object({
    /** Static search of the website using pagefind */
    pagefind: z.boolean().default(true),
    /** A lightbox library that can add zoom effect */
    mediumZoom: z
      .object({
        enable: z.boolean(),
        /** The selector to apply the zoom effect to. */
        selector: z.string(),
        /** Options to pass to the medium zoom library. */
        options: z.record(z.string(), z.any())
      })
      .default({
        enable: true,
        selector: '.prose .zoomable',
        options: { className: 'zoomable' }
      }),
    /** Enable page view tracking with Astro DB */
    pageView: z.boolean().default(false)
  })

export const BlogConfigSchema = () =>
  z.object({
    paginatorSize: z.coerce.number().default(8),
    license: z
      .object({
        type: z.string(),
        href: z.string().url()
      })
      .default({
        type: 'CC-BY-NC-4.0',
        href: 'https://creativecommons.org/licenses/by-nc/4.0/'
      }),
    /** Social platforms to show share buttons for. Copy link and email are always included.
     * @see 'src/lib/shares.ts' for available platforms
     */
    sharePlatforms: z.array(z.enum(['x', 'bluesky', 'linkedin', 'facebook', 'weibo'])).default([])
  })

export const ConfigSchema = ThemeConfigSchema()
  .merge(HeaderConfigSchema())
  .merge(FooterConfigSchema())
  .merge(IntegrationConfigSchema())
  .merge(ProfileConfigSchema)
  .merge(BlogConfigSchema())
  .transform((config) => ({
    ...config,
    // Pagefind only defaults to true if prerender is also true.
    pagefind: config.pagefind ?? config.prerender
  }))
  .refine((config) => !(config.pagefind && !config.prerender), {
    message: 'Pagefind search is not supported with prerendering disabled.'
  })

// Input TypeScript types (what user provides - partial with defaults)
export type SiteMeta = z.infer<typeof SiteMetaSchema>
export type IntegrationUserConfig = z.input<ReturnType<typeof IntegrationConfigSchema>>
export type ThemeUserConfig = z.input<ReturnType<typeof ThemeConfigSchema>>
export type HeaderUserConfig = z.input<ReturnType<typeof HeaderConfigSchema>>
export type FooterUserConfig = z.input<ReturnType<typeof FooterConfigSchema>>
export type BlogUserConfig = z.input<ReturnType<typeof BlogConfigSchema>>
export type UserConfig = z.input<typeof ConfigSchema>

// Output types (what gets processed - complete with defaults applied)
export type ThemeConfig = z.output<ReturnType<typeof ThemeConfigSchema>>
export type HeaderConfig = z.output<ReturnType<typeof HeaderConfigSchema>>
export type FooterConfig = z.output<ReturnType<typeof FooterConfigSchema>>
export type IntegrationConfig = z.output<ReturnType<typeof IntegrationConfigSchema>>
export type BlogConfig = z.output<ReturnType<typeof BlogConfigSchema>>
export type Config = z.output<typeof ConfigSchema>
