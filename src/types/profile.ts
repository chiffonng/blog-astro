import { z } from 'astro/zod'

import { ProfileLinkConfigSchema } from './links'

/**
 * @description Schema for profile configuration
 */
export const ProfileConfigSchema = () =>
  z.object({
    /** Profile links configuration */
    links: ProfileLinkConfigSchema().describe('Profile links configuration')
  })

export type ProfileConfig = z.infer<ReturnType<typeof ProfileConfigSchema>>
