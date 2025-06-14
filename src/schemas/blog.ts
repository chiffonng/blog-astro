import { z } from 'astro:content'

import { removeDupsAndLowerCase } from './utils'

export const imageSchema = (image: any) =>
  z.object({
    src: image(),
    alt: z.string().optional(),
    inferSize: z.boolean().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    color: z.string().optional()
  })

export const blogSchema = ({ image }: { image: any }) =>
  z.object({
    title: z.string().max(60),
    description: z.string().max(160),
    publish: z.boolean().default(false),
    publishDate: z.coerce.date().default(new Date()),
    // Optional
    updatedDate: z.coerce.date().optional(),
    heroImage: imageSchema(image).optional(),
    tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
    language: z.string().optional().default('en'),

    // Special fields
    comment: z.boolean().default(false)
  })

export default blogSchema
