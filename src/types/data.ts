import { z } from 'astro/zod'

import { dedupLowerCase } from '@/lib'

import { dateSchema } from './common'

export const certificateSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  organization: z.string().optional(),
  date: z.coerce.date(),
  expiry: z
    .union([z.coerce.date(), z.literal('never')])
    .optional()
    .default('never'),
  tags: z.array(z.string()).default([]).transform(dedupLowerCase)
})

export const educationSchema = z.object({
  institute: z.string(),
  location: z.string().optional(),
  website: z.string().url().optional(),
  fromDate: dateSchema.or(z.string()).optional(),
  toDate: dateSchema.or(z.string()).optional()
})

export type CertificateType = z.infer<typeof certificateSchema>
export type EducationType = z.infer<typeof educationSchema>
