import { z } from 'astro:content'

export function removeDupsAndLowerCase(array: string[]) {
  if (!array.length) return array
  const lowercaseItems = array.map((str) => str.toLowerCase())
  const distinctItems = new Set(lowercaseItems)
  return Array.from(distinctItems)
}

// Custom date validation that accepts both YYYY-MM and YYYY-MM-DD
export const DATE_SCHEMA = z
  .union([
    // Accept ISO date strings (YYYY-MM-DD)
    z.coerce.date(),
    // Accept YYYY-MM format
    z
      .string()
      .regex(/^\d{4}-(?:0[1-9]|1[0-2])$/)
      .transform((val) => {
        return new Date(`${val}-01`)
      })
  ])
  .refine((date) => !isNaN(date.getTime()), {
    message: 'Invalid date format. Must be YYYY-MM-DD or YYYY-MM'
  })

export const AUDIO_SCHEMA = z.instanceof(File).refine((file) => file.type.startsWith('audio/'), {
  message: 'File must be an audio file'
})
