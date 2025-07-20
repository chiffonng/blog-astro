# Academic Website + Blog

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/tiny.svg)](https://astro.build)

![](public/img/social-preview.png)

> [!WARNING] This theme is still under active development. There are no releases or tag versions.
> Use at your own risk.

Personal website for academia, a fork of
[astro-pure-theme v.4.0.5](https://github.com/cworld1/astro-theme-pure). It has inspiration from
[astro-cv-esquelete](https://github.com/mmouzo/astro-cv-esquelete),
[al-folio](https://github.com/alshedivat/al-folio), and
[vuepress-theme-hope](https://theme-hope.vuejs.press/).

See [CHANGELOG](CHANGELOG.md) for changes.

# Features

From [astro-pure-theme v.4.0.5](https://github.com/cworld1/astro-theme-pure):

🚀 Fast & high performance 📱 Responsive design 🔍 Full-site search built with pagefind 🗺️ Sitemap &
RSS feed 🕸️ SEO-friendly 📖 TOC (table of contents) 🖼️ Dynamic open graph generation for posts 🖼️
Mediumzoom lightbox for images

Added:

- [x] 🐳 Docker support
- [ ] 📄 Show publications from a bibtex file
- [ ] ✏️ Richer markdown support with wikilinks [[]],
- [x] 📃 Special pages, including [llms.txt](https://llmstxt.org/), [/uses](https://uses.tech/),
      [/now](https://nownownow.com/about)
- [x] 🌐 Improved accessibility: pronouns, name pronunciation,
- [x] 🔧 Easier configuration
- [x] 🛡️ Safe external links and protected email field
- [x] ➕ Enhancements for profile links / socials display, menu navigation, and footer

Internally, performance is improved with icon inline CSS (UnoCSS-powered), better prop handling, and
reusable components.

## Installation

### If Node.js is installed

Node >= 22, then you can run in your directory of choice (with npm/pnpm/yarn/bun):

```sh
pnpm create astro@latest --template chiffonng/blog-astro
```

See [Astro official guide](https://docs.astro.build/en/install-and-setup/) for more information.

### Prerequisites

- Ensure Docker Desktop has at least 8GB RAM allocated (Docker → Settings → Resources → Memory)
- The project has 685+ dependencies requiring significant memory during installation

### Development

```bash
# Build and start development container
cd docker && docker compose up --build astro-dev

# Development with search functionality
cd docker && docker compose up --build astro-dev-search

# Stop services
docker compose down
```

### Production

```bash
cd docker && docker compose up --build astro-prod
```

### Troubleshooting

- **Memory errors during build**: Increase Docker Desktop memory allocation
- **Port conflicts**: Change ports in `docker-compose.yaml`
- **Slow builds**: Enable BuildKit with `export DOCKER_BUILDKIT=1`
