# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this
repository.

## Development Commands

### Primary Commands

- `pnpm dev` - Start development server
- `pnpm dev:check` - Start development with TypeScript checking in watch mode
- `pnpm dev:search` - Build site and start pagefind search server for testing search functionality
- `pnpm build` - Full production build (site + search index)
- `pnpm build:site` - Build site only (runs TypeScript check then Astro build)
- `pnpm build:search` - Generate search index only using pagefind
- `pnpm routine` - Run complete code quality check (lint + sync + check + format)

### Code Quality

- `pnpm lint` - ESLint with auto-fix for TypeScript and Astro files
- `pnpm format` - Prettier formatting for all supported file types
- `pnpm check` - Astro TypeScript checking
- `pnpm sync` - Astro content collection sync

Always run `pnpm routine` before committing changes.

### GitHub Integration

- `gh` CLI is available for GitHub operations (issues, PRs, releases, etc.)
- Use `gh` commands for creating pull requests, managing issues, and other GitHub interactions

## Architecture Overview

### Core Framework

This is an **Astro 5** static site using the **astro-pure** theme with heavy customization. The site
uses **UnoCSS** for styling with **presetMini** (Tailwind 3 based). Use TypeScript for type-safe
declarations (types, interfaces, utils).

### Content Management

- **Content Collections**: Blog posts (`content/blog/`) and projects (`content/projects/`) are
  managed via Astro's content collections with Zod schemas
- **Markdown Processing**: Extended with KaTeX for math, custom Shiki transformers for code blocks,
  and rehype plugins for auto-linking headings
- **Search**: Powered by Pagefind with a custom SearchModal component that uses the pagefind.js API

### Configuration Architecture

The site configuration is centralized in `src/site.config.ts` with three main sections:

1. **Theme Config**: Basic site metadata, navigation, footer, content settings
2. **Integration Config**: Feature toggles for pagefind, quotes, medium-zoom, Waline comments
3. **Profile**: Social/contact links configuration

### Component Structure

Components follow a modular pattern:

- `components/base/` - Reusable UI components (SearchModal, Card, Collapse, etc.)
- `components/layout/` - Layout-specific components (Header, Footer, Navigation)
- `components/blog/` - Blog-specific components (Hero, TOC)
- `components/home/` - Homepage components
- `layouts/` - Page layout templates

### Styling System

- **UnoCSS** with custom presets and theme colors
- **CSS Variables** for theming with HSL color space
- **Typography** preset with extensive customization for prose content
- **Icon System** combining @iconify collections with custom SVG icons in `src/assets/icons/`

### Search Implementation

The SearchModal component (`src/components/base/SearchModal.astro`) implements:

- Dynamic pagefind.js loading to avoid build-time issues
- Keyboard navigation (arrow keys, Enter, Escape)
- Algolia-like UI with search term highlighting
- Debounced search with preloading for performance

Documentation is available on fetch here: https://context7.com/cloudcannon/pagefind/llms.txt

### Plugin System

Custom plugins in `src/plugins/`:

- **Shiki Transformers**: Code block enhancements (copy buttons, language labels, diff highlighting)
- **Rehype Plugins**: Heading auto-linking with anchor generation
- **TOC Plugin**: Table of contents generation and scroll management

## Development Notes

### Working with Search

- Search functionality requires building the site first: `pnpm dev:search`
- Pagefind indexes are generated from the `dist/` directory
- The SearchModal uses dynamic imports to avoid Vite build issues with pagefind.js

### Content Schemas

Content is validated using Zod schemas in `src/schemas/`. When adding new content fields, update the
corresponding schema and TypeScript types.

### Icon Management

- Icons use a hybrid approach: @iconify collections for standard icons, custom SVGs in
  `src/assets/icons/`
- Dynamic icon classes are managed in `src/constants/icons.ts` for UnoCSS safelist
- Icons are rendered through the IconRenderer component to switch between inline CSS, SVGs and
  images when needed. Most of the times inline CSS is used

### Styling Conventions

- Use HSL CSS variables for colors to support theming
- UnoCSS utility classes follow a design system based on the theme configuration
- Typography styles are heavily customized through the UnoCSS typography preset

### Build Considerations

- The project excludes 'astro-pure' from Vite optimization due to TypeScript file shipping
- Pagefind module imports are externalized in Vite config to prevent build errors
- Sharp is used for image optimization in production builds

### Commenting

In .astro files, comments are wrapped like "{/_ comment here _/}" in the body.
