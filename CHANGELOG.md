# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2025-06-27

### Added

- **LLMs.txt API route** - Added `/llms.txt` endpoint for AI discovery
- **Contact Bar** - Restored contacts section to homepage with improved layout
- **Tool tagging system** - Added tag support for tools in ToolSection component (#1)
- **CSS icon classes** - Implemented UnoCSS PresetIcons for better performance (#3)
- Added new SVG assets in src/assets/icons

### Changed

- **Schema refactoring** - Renamed schemas for consistency and clarity across the project
- **Content structure** - Moved `src/content` to `content` directory (non-Astro convention)
- **Package management** - Switched from Bun to pnpm for dependency management (#2)
- **Merge strategy** - Updated git merge strategy and added pnpm workspace configuration

### Performance Improvements

- **Icon optimization** - Replaced SVG components with CSS classes for better performance

### Fixed

- **ContactBar imports** - Corrected import path for contacts configuration
- **Linter issues** - Updated .prettierignore and resolved linting errors
- **Sidebar overflow** - Fixed right sidebar scroll behavior (`overflow-y-scroll` to
  `overflow-y-auto`) in ContentLayout.astro
- **Non-blog pages** - Removed unnecessary headings and right sidebar for non-blog pages in
  ContentLayout

### Refactored

- **Components organization** - Added components to index export for better structure
- **Array utilities** - Improved array manipulation and custom date validation schema
- **Card and Sponsorship** - Customized Card and Sponsorship components for better UI
- **Tools page** - Moved tools to dedicated page with improved organization
- **Blog drafts** - Added "publish" property to frontmatter with default draft status

### Developer Experience

- **Git attributes** - Configured linguist to ignore certain file types

---

**Author:** My Chiffon Nguyen  
**Project:** Astro Academic Blog - A personal website built on Astro 5 with components from
astro-pure-theme and inspiration from astro-cv-esquelete.
