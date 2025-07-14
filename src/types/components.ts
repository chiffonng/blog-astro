/**
 * @fileoverview Component Props interfaces for all Astro components
 * This file provides a centralized location for component prop types
 */

import type { ImageMetadata, MarkdownHeading } from 'astro'
import type { CollectionEntry, InferEntrySchema } from 'astro:content'
import type { HTMLAttributes } from 'astro/types'

// Base component props
export interface CardProps {
  as?: keyof HTMLElementTagNameMap
  class?: string
  href?: string
  heading?: string
  subheading?: string
  date?: string
}

export interface CollapseProps {
  class?: string
  title: string
  isExpanded?: boolean
}

export interface IconRendererProps {
  icon: string | ImageMetadata | Promise<typeof import('*.svg?raw')>
  alt: string
  className?: string
}

export interface LinkProps {
  as?: keyof HTMLElementTagNameMap
  class?: string
  title?: string
  href?: string
  style?: 'button' | 'pill' | 'back' | 'ahead'
}

export interface LinkExternalProps extends HTMLAttributes<'a'> {
  title: string
  icon?: string
}

export interface PillProps {
  title?: string
  class?: string
}

export interface ProfileLinksProps {
  /**
   * Include RSS feed link in the contact list
   * @default false
   */
  includeRss?: boolean
  /**
   * Show text labels alongside icons
   * @default false
   */
  showLabels?: boolean
  /**
   * Custom CSS classes for the container
   */
  class?: string
  /**
   * Custom CSS classes for individual links
   */
  linkClass?: string
  /**
   * ARIA label for the navigation
   */
  ariaLabel?: string
}

export type KbdProps = {
  keys?: (
    | 'cmd'
    | 'shift'
    | 'ctrl'
    | 'option'
    | 'enter'
    | 'del'
    | 'esc'
    | 'tab'
    | 'capslock'
    | 'up'
    | 'down'
    | 'left'
    | 'right'
    | 'pageup'
    | 'pagedown'
    | 'home'
    | 'end'
    | 'help'
    | 'space'
  )[]
  className?: string
}

// Layout component props
export interface SectionProps {
  class?: string
  title: string
}

// Blog component props
export interface HeroProps {
  data: InferEntrySchema<'blog'>
  remarkPluginFrontmatter: Record<string, unknown>
}

export interface TOCProps {
  headings: MarkdownHeading[]
  class?: string
  id?: string
  isMobile?: boolean
}

// Home component props
export interface ProfileProps {
  showLabels?: boolean
}

export interface PronunciationProps {
  pronounce?: string
  pronounceAudio?: string
  class?: string
}

export interface SkillLayoutProps {
  title: string
  skills: string[]
}

// Project component props
export interface ProjectCardProps {
  project: CollectionEntry<'projects'>
}

// Tool component props
export enum ToolTag {
  OpenSource = 'oss',
  SelfHosted = 'self-hosted',
  Favorite = '>u',
  Free = 'free',
  Paid = 'paid',
  Gifted = 'gifted',
  Subscription = 'subscription',
  Organization = 'org',
  Bundle = 'bundle',
  SecondHand = 'second-hand',
  Web = 'web',
  Mobile = 'mobile',
  Desktop = 'desktop'
}

export interface ToolProps {
  name: string
  description: string
  href: string
  icon: string | Promise<typeof import('*.svg?raw')> | ImageMetadata
  tags?: ToolTag[]
}

export interface ToolSectionProps {
  class?: string
  title: string
  tools: ToolProps[]
}

export interface SearchBoxProps {
  class?: string
}

export interface GithubCardProps {
  repo: string
}

export interface GithubActivityProps {
  /**
   * Optional username; if empty, get github username from site.config.ts profile variable
   */
  username?: string
  class?: string
}
