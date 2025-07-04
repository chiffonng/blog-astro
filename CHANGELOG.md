# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2025-07-03

### Added

- [TOC](src/components/blog/TOC.astro): Table of Contents component with smooth scrolling and
  progress tracking (original by cworld1 from astro-theme-pure)
- [Collapse](src/components/base/Collapse.astro): Collapsible component for expandable content
  sections (original by cworld1 from astro-theme-pure)
- [TOC Plugin](src/plugins/toc.ts): Table of contents generation utilities and TOCScrollManager
  class (original by cworld1 from astro-theme-pure)
- [TOC](src/plugins/toc.ts) auto-scroll functionality to keep highlighted headings visible in
  sidebar as users scroll

### Changed

- [Collapse](src/components/base/Collapse.astro): Added `isExpanded` prop to control expanded state
  and improved visual styling
- [TOC](src/components/blog/TOC.astro): Enhanced with mobile/desktop responsive design and wrapping
  Collapse component. TOC Desktop version redesigned with sticky text, toggleable interface, and
  improved user experience
- Refactored script code from [TOC component](src/components/blog/TOC.astro) to
  [plugins/toc](src/plugins/toc.ts)
- Shiki copy button in [shiki-transformers.ts](src/plugins/shiki-transformers.ts) and related styles

### Fixed

- Fixed sidebar overlay and rounded border of TOC on mobile in
  [ContentLayout](src/layouts/ContentLayout.astro)

## [0.3.0] - 2025-07-01

Based on `git diff upstream/main...origin/main`, excluding personal configuration and content.

### Added

- Moved from `src/content` to `content` directory with new blog posts, projects, and pages
- Added [505](/src/pages/500.astro) error page
- Added UnoCSS PresetIcons to render icons in CSS, and replaced almost all svg components with icon
  CSS from iconify/mingcute and iconify/academicons
- Added tagging system to [Tools](src/components/tools/ToolSection.astro)
- Added `/llms.txt` endpoint for AI discovery
- New [schemas](src/schemas/) for blog, projects, and contacts

### Changed

- Migrated from Bun to pnpm with workspace configuration
- Migrated most SVG components to CSS classes using UnoCSS PresetIcons
- Refactored `Tools` section in About page to the new page: [Tool](src/pages/tools/index.astro)
- Handled frontmatter as metadata similar to `SiteMeta` in
  [CommonPage](src/layouts/CommonPage.astro) layout
- Flushed `Footer` down to the bottom in [BaseLayout](src/layouts/BaseLayout.astro)
- Redesigned [Footer](src/components/layout/Footer.astro) by grouping links, rendering profile links
  from site.config.ts
- Redesigned [ContactBar](src/components/home/ContactBar.astro) on home page with new icons and
  styling (accept profile links from site.config.ts)
- Replaced PostPreview with [BlogCard](src/components/blog/BlogCard.astro)
  - Replaced `draft` property with `publish`
  - Move published date to the same line as other info like reading time and language

### Fixed

- In [ContentLayout](src/layouts/ContentLayout.astro) only renders sidebar, scroll shade, and menu
  toggle (on mobile) when there is sidebar slot (temp fix, since we actually want to render when
  there is at least one Markdown heading - need TOC component)
- Resolved ESLint, TypeScript, and formatting issues
- [Render Tools icon](src/components/tools/RenderIcon.astro) with either CSS or SVG components
- In [Hero](src/components/blog/Hero.astro) component, fixed `FormattedDate` with `!font-sans` to
  undo `font-mono` styling

### Removed

- Cleaned up obsolete images, icons, and components
- Removed docs, links, and about pages from original theme
- Removed bun.lock and legacy configuration files

---

**Author:** My Chiffon Nguyen  
**Project:** Astro Academic Blog - A personal website built on Astro 5 with components from
astro-pure-theme and inspiration from astro-cv-esquelete.
