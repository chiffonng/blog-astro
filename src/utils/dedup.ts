/**
 * Removes duplicate strings and converts to lowercase
 * @param array - Array of strings to deduplicate
 * @returns Deduplicated array in lowercase
 */
export function removeDupsAndLowerCase(array: readonly string[]): string[] {
  if (array.length === 0) return []
  return [...new Set(array.map((str) => str.toLowerCase()))]
}
