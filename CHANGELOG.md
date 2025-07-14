# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - 2025-07-14

The main changes are for About, Projects, and Publication, with a lot of refactoring.

### Added

- New components: [Pill](src/components/base/Pill.astro), [Svg](src/components/base/Svg.astro), [LinkExternal](src/components/base/LinkExternal.astro)
- Phone number validation and display on home page
- Project tags deduplication
- Click-to-close feature for pronunciation tooltip
- [Props interfaces](src/types/components.ts) for better component type safety

### Changed

- **Major refactor**: Moved content to git submodule for to manage separately (`src/content` link to another Github repository)
- **Profile links system overhaul**:
  - Simplified [ProfileLinkConfigSchema](src/types/profile-links.ts) with better validation
  - Enhanced validation to prevent empty strings and undefined values
  - Improved type safety and IntelliSense support
  - Updated [ProfileConfigSchema](src/types/profile.ts) to use simplified schema
- **Architecture improvements**:
  - Moved files under `src/constants/` and `src/utils` to `src/lib` directory
  - Enhanced [process-links.ts](src/lib/process-links.ts) with better error handling
  - Grouped related types and schemas (reducing number of modules)
  - Renamed `types/links` to `types/profile-links` for clarity
- **Component improvements**:
  - Replaced Button component with Link, LinkExternal and Pill components
  - Added props interfaces for better component type safety
  - Refactored component imports for better organization
- **UI/UX enhancements**:
  - Improved prose styling using Tailwind typography
  - Set maximum home page width for better readability
  - Simplified assets (favicon + share previews) and reduced CSS complexity
- **Dependencies**: Updated to latest versions and cleaned up packages
- **Package manager**: Updated to pnpm@10.13.1
- **Configuration**: Changed .gitattributes and added .gitmodules for submodule support

### Fixed

- Profile links validation now properly rejects empty strings and undefined values
- Validation of [phone numbers](src/types/profile.ts), [image](src/content.config.ts) for blog posts
- [Pronunciation](src/components/home/Pronunciation.astro) tooltip interaction and display

### Removed

- All content files moved to separate git submodule (about.md, blog posts, projects, etc.)
- Removed src/constants and src/utils directories (moved to src/lib)
- Button component (replaced with Link, LinkExternal and Pill components)

## [0.4.0] - 2025-07-09

### Added

- [Collapse](src/components/base/Collapse.astro), [TOC](src/components/blog/TOC.astro),
  [TOC Plugin](src/plugins/toc.ts), [Link](src/components/base/Link.astro) copied (original by
  cworld1 from astro-theme-pure)
- [TOC](src/plugins/toc.ts) auto-scroll functionality to keep highlighted headings visible in
  sidebar as users scroll
- [Profile](src/components/home/Profile.astro): Add pronouns, pronunciation guide, location, and
  other profile details
- [ProfileLinks](src/components/layout/ProfileLinks.astro): Customizable navigation component for
  displaying links with configurable label visibility

### Changed

- Complete overhaul of [MenuNav](src/components/layout/MenuNav.astro) with improved responsive
  behavior
  - Search functionality integrated into navigation (search bar on large screens, icon on mobile)
  - Smoother scrolling animations and CSS optimizations
  - Cmd+K to activate search
- Simplified [Footer](src/components/layout/Footer.astro) using new ProfileLinks component for
  better maintainability
- [Collapse](src/components/base/Collapse.astro): Added `isExpanded` prop to control expanded state
  and improved visual styling
- [TOC](src/components/blog/TOC.astro): Enhanced with mobile/desktop responsive design and wrapping
  Collapse component. TOC Desktop version redesigned with sticky text, toggleable interface, and
  improved user experience
- Refactored script code from [TOC component](src/components/blog/TOC.astro) to
  [plugins/toc](src/plugins/toc.ts)
- Shiki copy button in [shiki-transformers.ts](src/plugins/shiki-transformers.ts) to use unicode
  emojis instead of svg icons
- Update assets: favicon, social media preview image, and new icon definitions

### Removed

- ContactBar: Replaced with ProfileLinks component
- Sponsors and Sponsorship: Removed sponsor-related components

### Fixed

- Improved CSS class handling and fixed styling inconsistencies
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

- Migrated from Bun to pnpm
- Migrated most SVG components to CSS classes using UnoCSS PresetIcons
- [Tools](src/pages/uses/index.astro) has a new page
- Handled frontmatter as metadata similar to `SiteMeta` in
  [CommonLayout](src/layouts/CommonLayout.astro) layout
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
- [Render Tools icon](src/components/base/IconRenderer.astro) with either CSS or SVG components
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
