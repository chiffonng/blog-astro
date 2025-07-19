/**
 * Removes duplicate strings and converts to lowercase
 * @param array - Array of strings to deduplicate
 * @returns Deduplicated array in lowercase
 */
function dedupLowerCase(array: readonly string[]): string[] {
  if (!array || array.length === 0) return []
  return [...new Set(array.map((str) => str.trim().toLowerCase()).filter(Boolean))]
}

/**
 * Removes duplicate strings while preserving original case
 * Uses case-insensitive comparison but keeps the first occurrence's case
 * @param array - Array of strings to deduplicate
 * @returns Deduplicated array with original case preserved
 */
function dedupPreserveCase(array: readonly string[]): string[] {
  if (!array || array.length === 0) return []

  const seen = new Map<string, string>()

  for (const item of array) {
    const trimmed = item.trim()
    if (!trimmed) continue

    const lowerKey = trimmed.toLowerCase()
    if (!seen.has(lowerKey)) {
      seen.set(lowerKey, trimmed)
    }
  }

  return Array.from(seen.values())
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&[^;]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export { dedupLowerCase, dedupPreserveCase, stripHtml }
