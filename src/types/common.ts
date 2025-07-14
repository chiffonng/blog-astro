/**
 * @fileoverview Schemas for custom ISO date, audio, and image path
 */

import { z } from 'astro/zod'

/**
 * @description Custom date validation that accepts both YYYY-MM and YYYY-MM-DD formats
 */
const dateSchema = z
  .union([
    // Accept ISO date strings (YYYY-MM-DD)
    z.coerce.date(),
    // Accept YYYY-MM format
    z
      .string()
      .regex(/^\d{4}-(?:0[1-9]|1[0-2])$/, 'Invalid month format')
      .transform((val) => new Date(`${val}-01`))
  ])
  .refine((date) => !Number.isNaN(date.getTime()), {
    message: 'Invalid date format. Must be YYYY-MM-DD or YYYY-MM'
  })

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg'] as const

const imgPathSchema = z.string().refine(
  (value) => {
    try {
      const url = new URL(value)
      return url.protocol === 'http:' || url.protocol === 'https:'
    } catch {
      // For local files, just validate path format and extension
      return value.startsWith('src/assets/') && isValidImageExtension(value)
    }
  },
  {
    message: `Image must be either a valid URL or a local image file in src/assets/ directory (${IMAGE_EXTENSIONS.join(', ')}).`
  }
)
const isValidImageExtension = (filePath: string): boolean => {
  const ext = filePath.toLowerCase().split('.').pop()
  return ext ? IMAGE_EXTENSIONS.includes(`.${ext}` as (typeof IMAGE_EXTENSIONS)[number]) : false
}

const AUDIO_EXTENSIONS = ['.mp3', '.wav', '.ogg', '.m4a', '.aac', '.flac', '.webm'] as const
const AUDIO_HOSTS = [
  'soundcloud.com',
  'spotify.com',
  'youtube.com',
  'youtu.be',
  'anchor.fm',
  'buzzsprout.com',
  'apple.com/podcasts',
  'howtopronounce.com'
] as const

const isValidAudioExtension = (filePath: string): boolean => {
  const ext = filePath.toLowerCase().split('.').pop()
  return ext ? AUDIO_EXTENSIONS.includes(`.${ext}` as (typeof AUDIO_EXTENSIONS)[number]) : false
}

const isAudioHost = (hostname: string): boolean =>
  AUDIO_HOSTS.some((host) => hostname.includes(host))

const audioPathSchema = z.string().refine(
  (value) => {
    try {
      const url = new URL(value)
      return isValidAudioExtension(url.pathname) || isAudioHost(url.hostname)
    } catch {
      // For local files, just validate path format and extension
      const startPaths = ['public/audio/', '/audio/', 'audio/', './', '../']
      return startPaths.some((path) => value.startsWith(path)) && isValidAudioExtension(value)
    }
  },
  {
    message: `Must be a valid audio URL or audio file path (${AUDIO_EXTENSIONS.join(', ')}).`
  }
)

export { imgPathSchema, audioPathSchema, dateSchema }
