import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'

import { blogSchema, projectSchema } from './types'

// Blog collection
const blog = defineCollection({
  loader: glob({ base: './content/blog', pattern: '**/*.{md,mdx}' }),
  schema: blogSchema
})

// Projects collection
const projects = defineCollection({
  loader: glob({ base: './content/projects', pattern: '**/!(*README).{md,mdx}' }),
  schema: projectSchema
})

export const collections = { blog, projects }
