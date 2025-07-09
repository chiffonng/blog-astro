import { z } from 'astro/zod'

// File validation constants
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
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg'] as const

// Client-safe extension validators (no filesystem operations)
const isValidAudioExtension = (filePath: string): boolean => {
  const ext = filePath.toLowerCase().split('.').pop()
  return ext ? AUDIO_EXTENSIONS.includes(`.${ext}` as (typeof AUDIO_EXTENSIONS)[number]) : false
}

const isAudioHost = (hostname: string): boolean =>
  AUDIO_HOSTS.some((host) => hostname.includes(host))

const isValidImageExtension = (filePath: string): boolean => {
  const ext = filePath.toLowerCase().split('.').pop()
  return ext ? IMAGE_EXTENSIONS.includes(`.${ext}` as (typeof IMAGE_EXTENSIONS)[number]) : false
}

// Client-safe validation schemas (no filesystem operations)
export const audioPathSchema = z.string().refine(
  (value) => {
    try {
      const url = new URL(value)
      return isValidAudioExtension(url.pathname) || isAudioHost(url.hostname)
    } catch {
      // For local files, just validate path format and extension
      const startPaths = ['public/audio/', '/audio/', 'audio/', './', '../']
      return startPaths.some(path => value.startsWith(path)) && isValidAudioExtension(value)
    }
  },
  {
    message: `Must be a valid audio URL or audio file path (${AUDIO_EXTENSIONS.join(', ')}).`
  }
)

export const imgPathSchema = z.string().refine(
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
