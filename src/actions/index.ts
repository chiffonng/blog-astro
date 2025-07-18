import { defineAction } from 'astro:actions'
import { db, PageView } from 'astro:db'
import { z } from 'astro:schema'
import { isbot } from 'isbot'

export const server = {
  pageView: defineAction({
    input: z.object({ url: z.string() }),
    handler: async ({ url }, context) => {
      // Check if user-agent is a bot
      const userAgent = context.request.headers.get('user-agent') || ''

      // Allow bots to view page but don't count in page views
      if (isbot(userAgent)) {
        return
      }

      // Don't track admin or development URLs
      if (url.includes('/admin') || url.includes('/dev') || url.includes('localhost')) {
        return
      }

      try {
        await db.insert(PageView).values({
          url: url,
          date: new Date()
        })
      } catch (error) {
        console.error('Failed to insert page view:', error)
      }
    }
  })
}
