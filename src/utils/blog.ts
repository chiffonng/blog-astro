/* Copied from https://github.com/cworld1/astro-theme-pure/blob/a6c04ec82b5c4fa7fe7aabe2225e9885dfab09ed/packages/pure/utils/server.ts */

import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content'

export const prod = import.meta.env.PROD

// Include draft property for the internal server logic
type BlogData = CollectionEntry<'blog'>['data'] & {
  draft?: boolean
}

/**
 * In development, show all posts
 * In production, only show published posts
 */
export async function getBlogCollection(contentType: CollectionKey = 'blog') {
  return await getCollection(contentType, ({ data }: CollectionEntry<typeof contentType>) => {
    // Convert "publish: false" to "draft: true" for internal server logic
    if (!prod) {
      (data as BlogData).draft = !data.publish
    }
    return !prod || data.publish
  })
}

export default getBlogCollection 