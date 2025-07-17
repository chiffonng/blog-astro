interface ShareData {
  title: string
  url: string
  description?: string
  image?: string
  author?: string
}

interface SharePlatform {
  name: string
  url: string
}

// Platform configurations
const PLATFORMS = {
  x: {
    name: 'X (Twitter)',
    urlTemplate: (data: ShareData) => {
      const { title, url, author = '' } = data
      return `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}${author ? `&by=${encodeURIComponent(author)}` : ''}`
    }
  },
  bluesky: {
    name: 'Bluesky',
    urlTemplate: (data: ShareData) => {
      const { title, url } = data
      return `https://bsky.app/intent/compose?text=${encodeURIComponent(title)}%0A${encodeURIComponent(url)}`
    }
  },
  linkedin: {
    name: 'LinkedIn',
    urlTemplate: (data: ShareData) => {
      const { title, url, description = '' } = data
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`
    }
  },
  facebook: {
    name: 'Facebook',
    urlTemplate: (data: ShareData) => {
      const { title, url } = data
      return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&t=${encodeURIComponent(title)}`
    }
  },
  weibo: {
    name: 'Weibo',
    urlTemplate: (data: ShareData) => {
      const { title, url, image = '' } = data
      return `http://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}${image ? `&pic=${encodeURIComponent(image)}` : ''}`
    }
  },
  email: {
    name: 'Email',
    urlTemplate: (data: ShareData) => {
      const { title, url, description = '' } = data
      const subject = encodeURIComponent(`Check out: ${title}`)
      const body = encodeURIComponent(
        `I thought you might find this interesting:\n\n${title}\n${description}\n\nRead more: ${url}`
      )
      return `mailto:?subject=${subject}&body=${body}`
    }
  }
} as const

// Window features for different platforms
const WINDOW_FEATURES = {
  x: 'width=550,height=420',
  facebook: 'width=626,height=436',
  linkedin: 'width=750,height=600',
  weibo: 'width=615,height=505',
  default: 'width=600,height=500'
} as const

/**
 * Generate share URLs for all platforms
 * @param data - The content data to share
 * @returns Object containing share URLs for different platforms
 */
export function getShareUrls(data: ShareData): Record<string, SharePlatform> {
  return Object.entries(PLATFORMS).reduce(
    (acc, [key, platform]) => {
      acc[key] = {
        name: platform.name,
        url: platform.urlTemplate(data)
      }
      return acc
    },
    {} as Record<string, SharePlatform>
  )
}

/**
 * Get list of platform keys for iteration
 */
export function getPlatformKeys(): string[] {
  return Object.keys(PLATFORMS)
}

/**
 * Open a share URL in a new window with appropriate dimensions
 * @param url - The share URL to open
 * @param platform - The platform name for window sizing
 */
export function openShareWindow(url: string, platform: string): void {
  const features =
    WINDOW_FEATURES[platform as keyof typeof WINDOW_FEATURES] || WINDOW_FEATURES.default
  const windowFeatures = `scrollbars=yes,resizable=yes,toolbar=no,location=yes,${features}`
  window.open(url, `share-${platform}`, windowFeatures)
}

/**
 * Copy text to clipboard with fallback for older browsers
 * @param text - The text to copy
 * @returns Promise that resolves when copy is complete
 */
export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    document.execCommand('copy')
    textArea.remove()
  }
}
