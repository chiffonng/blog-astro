# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this
repository.

## Development Commands

### Primary Commands

- `pnpm dev` - Start development server
- `pnpm dev:check` - Start development with TypeScript checking in watch mode
- `pnpm dev:search` - Build site and start pagefind search server for testing search functionality
- `pnpm build` - Production build with type checking
- `pnpm routine` - Run complete code quality check (lint + sync + check + format)

Always run `pnpm routine` and fix bugs iteratively before prompting user for changes.

### Build Commands

- `pnpm preview` - Preview production build locally
- `pnpm clean` - Remove build artifacts (.astro and dist directories)

### Code Quality

- `pnpm lint` - ESLint with auto-fix for TypeScript and Astro files
- `pnpm format` - Prettier formatting for all supported file types
- `pnpm check` - Astro TypeScript checking
- `pnpm sync` - Astro content collection sync

### GitHub Integration

- `gh` CLI is available for GitHub operations (issues, PRs, releases, etc.)
- Use `gh` commands for creating pull requests, managing issues, and other GitHub interactions

### Git Diff Commands for Bug Detection

Use these commands to analyze changes and identify potential bugs (similar to Cursor bugbot):

- `git diff origin/main` - Show all changes in current branch vs main branch
- `git diff origin/main --name-only` - List only changed files vs main branch
- `git diff HEAD~1` - Show changes in the last commit
- `git diff --cached` - Show staged changes before committing
- `git diff origin/main -- src/` - Show changes only in src/ directory vs main
- `git diff origin/main --stat` - Show summary of changes (files and line counts) vs main

**Bug Detection Workflow:**

1. Before committing: `git diff --cached` to review staged changes
2. After committing: `git diff origin/main` to see all branch changes
3. Focus on critical files: `git diff origin/main -- src/components/ src/types/`
4. Check for type safety: `git diff origin/main -- "*.ts" "*.tsx" "*.astro"`

## Architecture Overview

### Core Framework

This is an **Astro 5** static site using the **astro-pure** theme with heavy customization. The site
uses **UnoCSS** for styling with **presetMini** (Tailwind 3 based). Use TypeScript for type-safe
declarations (types, interfaces, utils).

**Key Dependencies:**

- **astro-pure@1.3.1** - Core theme integration
- **UnoCSS@66.3.3** - CSS framework with Tailwind 3 mini preset and typography
- **Shiki@3.7.0** - Syntax highlighting with custom transformers
- **Pagefind@1.3.0** - Client-side search functionality

### Content Management

- **Content Collections**: Blog posts (`src/content/blog/`) and projects (`src/content/projects/`)
  are managed via Astro's content collections with Zod schemas
- **Markdown Processing**: Extended with KaTeX for math, custom Shiki transformers for code blocks,
  and rehype plugins for auto-linking headings

### Configuration Architecture

The site configuration is centralized in `src/site.config.ts` with three main sections:

1. **Theme Config**: Basic site metadata, navigation, footer, content settings
2. **Integration Config**: Feature toggles for pagefind, quotes, medium-zoom, Waline comments
3. **Profile**: Profile links configuration

### Component Structure

Components follow a modular pattern with **consistent prop conventions**:

- `components/base/` - Reusable UI components (Card, Collapse, IconRenderer, Kbd, Link, etc.)
- `components/layout/` - Layout-specific components (BaseHead, Footer, MenuNav)
- `components/blog/` - Blog-specific components (Hero, TOC)
- `components/home/` - Homepage components (Profile, Pronunciation, ProfileLinks)
- `components/search/` - Search components (SearchBox with Cmd+K/Ctrl+K support)
- `layouts/` - Page layout templates

**Component Props Convention:**

- All component types centralized in `src/types/components.ts`
- Props interfaces use `class?: string` (following HTML standard)
- Components destructure with `{ class: className }` (JavaScript-safe variable)

### Styling System

- **UnoCSS** with Tailwind 3 presets and theme colors
- **CSS Variables** for theming with HSL color space
- **Typography** preset with extensive customization for prose content
- **Icon System** combining @iconify collections with custom SVG icons in `src/assets/icons/`

### Plugin System

Custom plugins in `src/plugins/`:

- **Shiki Transformers**: Code block enhancements (copy buttons, language labels, diff highlighting)
- **Rehype Plugins**: Heading auto-linking with anchor generation
- **TOC Plugin**: Table of contents generation and scroll management

## Development Notes

### Working with Search

- Search functionality requires building the site first: `pnpm dev:search`
- Pagefind indexes are generated from the `dist/` directory

### Content Schemas

Content is validated using Zod schemas in `src/types/`. When adding new content fields, update the
corresponding schema and TypeScript types.

### Icon Management

- Icons use a hybrid approach: @iconify collections for standard icons, custom SVGs in
  `src/assets/icons/`
- Dynamic icon classes are managed in `src/theme.ts` for UnoCSS safelist
- Icons are rendered through the `src/components/base/IconRenderer` component to switch between
  inline CSS, SVGs and images when needed. Most of the times inline CSS is used

### Styling Conventions

- Use HSL CSS variables for colors to support theming
- UnoCSS utility classes follow a design system based on the theme configuration
- Typography styles are heavily customized through the UnoCSS typography preset

### Build Considerations

- The project excludes 'astro-pure' from Vite optimization due to TypeScript file shipping
- Pagefind module imports are externalized in Vite config to prevent build errors
- **CSS Organization**:
  - `src/assets/styles/app.css` - Build-time styles (fonts, CSS variables, base styles)
  - `public/styles/global.css` - Runtime styles (animations, Shiki, KaTeX, scrollbars)
  - This separation optimizes build performance while maintaining runtime flexibility

### Commenting

In .astro files, comments are wrapped like "{/_ comment here _/}" in the body.
