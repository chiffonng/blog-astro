import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content'

type Collections = CollectionEntry<CollectionKey>[]

export const prod = import.meta.env.PROD

// Data types for different collection types
type BlogData = CollectionEntry<'blog'>['data'] & {
  publish?: boolean
  draft?: boolean
  publishDate?: Date
  updatedDate?: Date
  tags?: string[]
}

type ProjectData = {
  title: string
  isHighlighted: boolean
  fromDate?: Date
  toDate?: Date
  tags?: string[]
}

// Generic data type for collections with date fields
type CollectionWithDates = {
  data: {
    publishDate?: Date
    updatedDate?: Date
    fromDate?: Date
    toDate?: Date
    tags?: string[]
  }
}

/**
 * In development, show all posts
 * In production, only show published posts (publish: true)
 */
export async function getBlogCollection(contentType: CollectionKey = 'blog') {
  return await getCollection(contentType, ({ data }: CollectionEntry<typeof contentType>) => {
    const blogData = data as BlogData
    // Convert "publish: false" to "draft: true" for internal server logic
    if (!prod) {
      blogData.draft = !blogData.publish
    }
    return !prod || blogData.publish
  })
}

export async function getProjectsCollection(): Promise<CollectionEntry<'projects'>[]> {
  return await getCollection('projects')
}

export function sortProjectsByDate(
  projects: CollectionEntry<'projects'>[]
): CollectionEntry<'projects'>[] {
  return projects.sort((a, b) => {
    const aData = a.data as ProjectData
    const bData = b.data as ProjectData

    // 1. Sort by isHighlighted (highlighted projects first)
    if (aData.isHighlighted !== bData.isHighlighted) {
      return bData.isHighlighted ? 1 : -1
    }

    // 2. Sort by toDate (most recent first)
    const aToDate = aData.toDate ? new Date(aData.toDate).valueOf() : 0
    const bToDate = bData.toDate ? new Date(bData.toDate).valueOf() : 0
    if (aToDate !== bToDate) {
      return bToDate - aToDate
    }

    // 3. Sort by fromDate (most recent first)
    const aFromDate = aData.fromDate ? new Date(aData.fromDate).valueOf() : 0
    const bFromDate = bData.fromDate ? new Date(bData.fromDate).valueOf() : 0
    if (aFromDate !== bFromDate) {
      return bFromDate - aFromDate
    }

    // 4. Sort by title (alphabetical)
    return aData.title.localeCompare(bData.title)
  })
}

function getYearFromCollection<T extends CollectionKey>(
  collection: CollectionEntry<T>
): number | undefined {
  const data = collection.data as CollectionWithDates['data']
  const dateStr = data.updatedDate ?? data.publishDate
  return dateStr ? new Date(dateStr).getFullYear() : undefined
}

export function groupCollectionsByYear<T extends CollectionKey>(
  collections: Collections
): [number, CollectionEntry<T>[]][] {
  const collectionsByYear = collections.reduce((acc, collection) => {
    const year = getYearFromCollection(collection)
    if (year !== undefined) {
      if (!acc.has(year)) {
        acc.set(year, [])
      }
      acc.get(year)!.push(collection)
    }
    return acc
  }, new Map<number, Collections>())

  return Array.from(
    collectionsByYear.entries() as IterableIterator<[number, CollectionEntry<T>[]]>
  ).sort((a, b) => b[0] - a[0])
}

export function sortMDByDate(collections: Collections): Collections {
  return collections.sort((a, b) => {
    const aData = a.data as BlogData
    const bData = b.data as BlogData
    const aDate = new Date(aData.updatedDate ?? aData.publishDate ?? 0).valueOf()
    const bDate = new Date(bData.updatedDate ?? bData.publishDate ?? 0).valueOf()
    return bDate - aDate
  })
}

/** Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so. */
export function getAllTags(collections: Collections): string[] {
  return collections.flatMap((collection) => {
    const data = collection.data as CollectionWithDates['data']
    return data.tags ? [...data.tags] : []
  })
}

/** Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so. */
export function getUniqueTags(collections: Collections): string[] {
  return [...new Set(getAllTags(collections))]
}

/** Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so. */
export function getUniqueTagsWithCount(collections: Collections): [string, number][] {
  return [
    ...getAllTags(collections).reduce(
      (acc, t) => acc.set(t, (acc.get(t) || 0) + 1),
      new Map<string, number>()
    )
  ].sort((a, b) => b[1] - a[1])
}
