import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

function removeDupsAndLowerCase(array: string[]) {
  if (!array.length) return array
  const lowercaseItems = array.map((str) => str.toLowerCase())
  const distinctItems = new Set(lowercaseItems)
  return Array.from(distinctItems)
}

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: './content/blog', pattern: '**/*.{md,mdx}' }),
  // Required
  schema: ({ image }) =>
    z.object({
      // Required
      title: z.string().max(60),
      description: z.string().max(160),
      publish: z.boolean().default(false),
      publishDate: z.coerce.date().default(new Date()),
      // Optional
      updatedDate: z.coerce.date().optional(),
      heroImage: z
        .object({
          src: image(),
          alt: z.string().optional(),
          inferSize: z.boolean().optional(),
          width: z.number().optional(),
          height: z.number().optional(),

          color: z.string().optional()
        })
        .optional(),
      tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
      language: z.string().optional().default('en'),
      
      // Special fields
      comment: z.boolean().default(false)
    })
})

export const collections = { blog }
