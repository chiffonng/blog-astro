import { defineCollection, z, type SchemaContext } from 'astro:content'
import { glob } from 'astro/loaders'

import { dateSchema } from '@/types'
import { dedupLowerCase, dedupPreserveCase } from '@/lib'

export const PROJECT_DESCRIPTION_LENGTH = 150

export const imageSchema = ({ image }: SchemaContext) =>
  z.object({
    src: image(),
    alt: z.string().optional(),
    inferSize: z.boolean().optional(),
    width: z.number().optional(),
    height: z.number().optional(),

    color: z.string().optional()
  })

const blogSchema = ({ image }: SchemaContext) =>
  z.object({
    title: z.string().max(60),

    publish: z.boolean().default(false),
    publishDate: z.coerce.date().default(new Date()),
    description: z.string().max(160).optional(),

    updatedDate: z.coerce.date().optional(),
    heroImage: imageSchema({ image }).optional(),
    tags: z.array(z.string()).default([]).transform(dedupLowerCase),
    language: z.string().optional().default('en'),

    // Special fields
    comment: z.boolean().default(false)
  })

const projectSchema = z
  .object({
    title: z.string(),
    isHighlighted: z.boolean().default(false),
    fromDate: dateSchema.optional(),
    toDate: dateSchema.optional(),
    repo: z.string().url().optional(),
    doc: z.string().url().optional(),
    url: z.string().url().optional(),
    release: z.string().url().optional(),
    context: z.enum(['school', 'personal', 'work', 'collab']).optional(),
    description: z.string().max(PROJECT_DESCRIPTION_LENGTH).optional(),
    tags: z.array(z.string()).default([]).transform(dedupPreserveCase)
  })
  .refine(
    // Validate that toDate is after fromDate
    (data) => {
      if (!data.fromDate || !data.toDate) return true
      return data.toDate >= data.fromDate
    },
    {
      message: 'End date must be after or equal to start date'
    }
  )

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: blogSchema
})

// Projects collection
const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/!(*README).{md,mdx}' }),
  schema: projectSchema
})

export const collections = { blog, projects }
