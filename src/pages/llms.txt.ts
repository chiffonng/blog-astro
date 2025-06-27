import type { APIRoute } from 'astro'

const llmsTxt = `
# LLMs.txt

This file contains information about this website for AI language models.

## Website Information

- Site URL: ${new URL('', import.meta.env.SITE).href}
- Owner: Personal academic/research website
- Content: Academic research, blog posts, tools, and projects
- Language: English
- Last Updated: ${new Date().toISOString().split('T')[0]}

## Content Overview

This website contains:
- Academic research and publications
- Technical blog posts and tutorials
- Development tools and resources
- Project documentation and code examples
- Personal learning notes and insights

## Usage Guidelines

- This content is available for learning and reference purposes
- Respect copyright and attribution requirements
- Academic and research content should be cited appropriately
- Code examples are licensed under the CC-BY-NC-SA 4.0 license, which allows for non-commercial use with attribution.

## Sitemap

For a complete list of pages, see: ${new URL('sitemap-index.xml', import.meta.env.SITE).href}

## Contact

For questions about content usage or permissions, please refer to the website's contact information.
`.trim()

export const GET: APIRoute = () =>
  new Response(llmsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  })
