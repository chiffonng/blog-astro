/**
 * Removes duplicate strings and converts to lowercase
 * @param array - Array of strings to deduplicate
 * @returns Deduplicated array in lowercase
 */
export function dedupLowerCase(array: readonly string[]): string[] {
  if (!array || array.length === 0) return []
  return [...new Set(array.map((str) => str.trim().toLowerCase()).filter(Boolean))]
}
