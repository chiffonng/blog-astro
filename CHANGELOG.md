# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2025-06-27

Based on `git diff upstream/main...fix-layouts`

### Added

- Moved from `src/content` to `content` directory with new blog posts, projects, and pages
- Added Now, Teaching, Tools, and custom error pages
- Copied and customized Hero, BlogCard, Card, Footer components from astro-pure-theme
- Complete `Tools` page with tagging, categories, and icon rendering system
- New project entries with detailed descriptions and metadata
- `ContactBar` component with social links and CV download
- Added `/llms.txt` endpoint for AI discovery
- New schemas for blog, projects, contacts, and utilities

### Changed

- Migrated from Bun to pnpm with workspace configuration
- Updated branding, URLs, contact information, and favicon
- Enhanced CommonPage and ContentLayout with better metadata handling
- Replaced PostPreview with BlogCard, added publish property to frontmatter
- Updated ProjectSection with new icons and improved layout
- Migrated from SVG components to CSS classes using UnoCSS PresetIcons

### Fixed

- Improved ContentLayout sidebar rendering and toggle behavior
- Resolved ESLint, TypeScript, and formatting issues
- TEMP Fixed FormattedDate font styling in Hero component
- TEMP Only render sidebar toggle and scroll shade when there is sidebar slot

### Removed

- Completely removed packages/pure theme dependency
- Cleaned up obsolete images, icons, and components
- Removed docs, links, and about pages from original theme
- Removed bun.lock and legacy configuration files

---

**Author:** My Chiffon Nguyen  
**Project:** Astro Academic Blog - A personal website built on Astro 5 with components from
astro-pure-theme and inspiration from astro-cv-esquelete.
