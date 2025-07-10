import { defineCollection, z, type ImageFunction } from 'astro:content'
import { glob } from 'astro/loaders'

import { projectSchema } from '@/types'
import { removeDupsAndLowerCase } from '@/utils'

const imageSchema = (image: ImageFunction) =>
  z.object({
    src: image(),
    alt: z.string().optional(),
    inferSize: z.boolean().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    color: z.string().optional()
  })

const blogSchema = ({ image }: { image: ImageFunction }) =>
  z.object({
    title: z.string().max(60),

    publish: z.boolean().default(false),
    publishDate: z.coerce.date().default(new Date()),
    description: z.string().max(160).optional(),

    updatedDate: z.coerce.date().optional(),
    heroImage: imageSchema(image).optional(),
    tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
    language: z.string().optional().default('en'),

    // Special fields
    comment: z.boolean().default(false)
  })

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
