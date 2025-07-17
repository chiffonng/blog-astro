# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - 2025-07-14

Major architectural refactor with content management improvements and component system overhaul.

### Added

- New components: [Pill](src/components/base/Pill.astro), [Svg](src/components/base/Svg.astro),
  [LinkExternal](src/components/base/LinkExternal.astro)
- [Props interfaces](src/types/components.ts) for centralized component type safety
- Phone number validation and display on home page
- Project tags deduplication logic in [content.config.ts](src/content.config.ts)
- Click-to-close functionality for pronunciation tooltip

### Changed

- **Content management**: Moved all content to git submodule (`src/content` → separate repository)
- **Profile links system**: Complete overhaul with simplified
  [ProfileLinkConfigSchema](src/types/profile-links.ts), enhanced validation, and improved type
  safety
- **Architecture**: Consolidated `src/constants/` and `src/utils/` into `src/lib/` directory with
  better organization
- **Component system**: Replaced Button with specialized Link, LinkExternal, and Pill components
- **UI/UX**: Improved prose styling, set maximum home page width, simplified assets and CSS
- **Dependencies**: Updated to latest versions, migrated to pnpm@10.13.1

### Fixed

- Profile links validation for empty strings and undefined values
- Phone number and blog post image validation
- Pronunciation tooltip interaction and display issues

### Removed

- Button component (replaced with specialized alternatives)
- Legacy `src/constants/` and `src/utils/` directories

## [0.4.0] - 2025-07-09

### Added

- [Collapse](src/components/base/Collapse.astro), [TOC](src/components/blog/TOC.astro),
  [TOC Plugin](src/plugins/toc.ts), [Link](src/components/base/Link.astro) components
- TOC auto-scroll functionality to keep highlighted headings visible during scrolling
- Enhanced [Profile](src/components/home/Profile.astro) with pronouns, pronunciation guide, and
  location
- [ProfileLinks](src/components/base/ProfileLinks.astro) component with configurable label
  visibility

### Changed

- **Navigation**: Complete [MenuNav](src/components/layout/MenuNav.astro) overhaul with responsive
  search integration, Cmd+K support, and improved animations
- **TOC system**: Enhanced with mobile/desktop responsive design, sticky interface, and refactored
  logic to [plugins/toc](src/plugins/toc.ts)
- **Footer**: Simplified using ProfileLinks component for better maintainability
- **Collapse**: Added `isExpanded` prop and improved visual styling
- **Code blocks**: Shiki copy button now uses unicode emojis instead of SVG icons
- **Assets**: Updated favicon, social media preview image, and icon definitions

### Fixed

- CSS class handling and styling inconsistencies
- Mobile TOC sidebar overlay and rounded border issues

### Removed

- ContactBar component (replaced with ProfileLinks)
- Sponsor-related components

## [0.3.0] - 2025-07-01

Initial migration from upstream theme with significant architectural changes.

### Added

- Content directory restructure with new blog posts, projects, and pages
- [500 error page](src/pages/500.astro)
- UnoCSS PresetIcons for CSS-based icon rendering (iconify/mingcute and iconify/academicons)
- Tagging system for [Tools](src/components/tools/ToolSection.astro)
- `/llms.txt` endpoint for AI discovery
- Content validation [schemas](src/schemas/) for type safety

### Changed

- **Package manager**: Migrated from Bun to pnpm
- **Icons**: Migrated SVG components to CSS classes using UnoCSS PresetIcons
- **Tools page**: Complete redesign of [Tools](src/pages/uses/index.astro)
- **Layout system**: Enhanced frontmatter handling and footer positioning
- **Components**: Redesigned Footer and ContactBar with profile links integration
- **Post preview**: Replaced PostPreview with [PreviewCard](src/components/blog/PreviewCard.astro),
  changed `draft` to `publish` property

### Fixed

- ContentLayout conditional rendering for sidebar and mobile menu
- ESLint, TypeScript, and formatting issues
- IconRenderer component to handle both CSS and SVG icons
- Hero component date formatting with proper font styling

### Removed

- Obsolete images, icons, and components
- Original theme pages (docs, links, about)
- Bun configuration files

---

**Author:** My Chiffon Nguyen

**Project:** Astro Academic Blog - A personal website built on Astro 5 with components from
astro-pure-theme and inspiration from astro-cv-esquelete.
