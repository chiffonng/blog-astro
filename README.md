This personal website is built on [Astro 5](https://docs.astro.build/en/concepts/why-astro/), using
a lot of components from [astro-pure-theme](https://github.com/cworld1/astro-theme-pure) and
inspiration from [astro-cv-esquelete](https://github.com/mmouzo/astro-cv-esquelete).

# Changes

## Structure

- [x] Move `src/content` to `content` (not an Astro convention)
- [ ] Move much content to markdown or `src/pages`

## Features

- [ ] feat([projects](./src/schemas/projects.ts)): Use Astro Content Collection API for projects
- [ ] feat([blog](./src/components/blog/Share.astro)): Add more ways to share a blog
- [x] feat([blog](./src/components/tools/ToolSection.astro)): Add tags for tools
- [ ] feat(pubs): parse `papers.bib` and render publications page

## Performance

- [x] perf(icons): Use UnoCSS PresetIcons to replace almost all icon components
- [x] fix([ContentLayout](./src/layouts/ContentLayout.astro)): only render right sidebar scroller if needed (`overflow-y-scroll` to `overflow-y-auto`)
- [x] fix([CommonPage](./src/layouts/CommonPage.astro)): remove headings and right sidebar for non-blog pages

## Refactor / Customize

- [x] refactor([tools](./src/pages/tools/)): Move tools to a new page
- [ ] refactor(footer): Change social icons and credits for consistency
- [ ] refactor(menu): Add submenu
- [x] refactor(blog): add "publish" property in frontmatter and default blog to drafts

## Chores

- chore: use pnpm to manage packages instead of bun
- chore(.gitattributes): define merge strategies and
