import type { MarkdownHeading } from 'astro'

export interface TocItem extends MarkdownHeading {
  subheadings: TocItem[]
}

export interface TOCLink {
  element: HTMLAnchorElement
  progressBar: HTMLElement
  slug: string
}

export interface HeadingProgress {
  inView: boolean
  progress: number
}

function validateHeadingHierarchy(headings: readonly MarkdownHeading[]) {
  if (headings.length === 0) return

  let previousDepth = 0
  const orphanHeadings: MarkdownHeading[] = []

  headings.forEach((heading, index) => {
    const { depth } = heading

    // Skip first heading
    if (index === 0) {
      previousDepth = depth
      return
    }

    // Check for orphan headings (jumping more than 1 level)
    const depthJump = depth - previousDepth
    if (depthJump > 1) {
      orphanHeadings.push(heading)
    }

    previousDepth = depth
  })

  // Warn about orphan headings
  if (orphanHeadings.length > 0) {
    console.warn('⚠️  TOC: Found orphan headings with improper hierarchy:')
    orphanHeadings.forEach(({ depth, text, slug }) => {
      console.warn(`   h${depth}: "${text}" (${slug}) - Consider using proper heading levels`)
    })
    console.warn('   Learn more: https://webaim.org/articles/screenreader/#headings')
  }
}

export function generateToc(headings: readonly MarkdownHeading[]) {
  // Only include h1, h2, h3 headings (depths 1-3)
  const bodyHeadings = [...headings.filter(({ depth }) => depth >= 1 && depth <= 3)]

  if (bodyHeadings.length === 0) return []

  // Validate heading hierarchy and warn about orphans
  validateHeadingHierarchy(bodyHeadings)

  // Find the first heading's depth and use it as the base level
  const firstHeadingDepth = bodyHeadings[0].depth

  // Normalize all headings relative to the first heading (treat first heading as depth 2)
  const normalizedHeadings = bodyHeadings
    .map((heading) => ({
      ...heading,
      depth: heading.depth - firstHeadingDepth + 2 // Normalize: first heading becomes depth 2
    }))
    .filter((heading) => heading.depth <= 3) // Only keep up to 3 levels from the first heading (depths 2-4)

  const toc: TocItem[] = []
  const stack: TocItem[] = []

  normalizedHeadings.forEach((h) => {
    const heading: TocItem = { ...h, subheadings: [] }

    // Find the correct parent for this heading
    while (stack.length > 0 && stack[stack.length - 1].depth >= heading.depth) {
      stack.pop()
    }

    // If no parent exists or this is depth 2 (normalized), add to top level
    if (stack.length === 0 || heading.depth === 2) {
      toc.push(heading)
      stack.length = 0 // Clear stack for new top-level item
      stack.push(heading)
    } else {
      // Add as child to the most recent valid parent
      const parent = stack[stack.length - 1]
      parent.subheadings.push(heading)
      stack.push(heading)
    }
  })
  return toc
}

export class TOCScrollManager {
  headings: HTMLElement[] = []
  tocLinks: TOCLink[] = []
  headingProgress: Record<string, HeadingProgress> = {}
  element: HTMLElement
  private containerId: string = 'sidebar'
  private intersectionObserver: IntersectionObserver | null = null
  private scrollTimeout: number | null = null

  constructor(element: HTMLElement) {
    this.element = element
    this.initializeElements()
  }

  setContainerId(id: string) {
    this.containerId = id
  }

  private initializeElements() {
    // Initialize the headings and tocLinks
    this.headings = Array.from(document.querySelectorAll('article h2, article h3'))
    this.tocLinks = Array.from(this.element.querySelectorAll('a[href^="#"]')).map((link) => ({
      element: link as HTMLAnchorElement,
      progressBar: link.previousElementSibling as HTMLElement,
      slug: (link.getAttribute('href') || '').substring(1)
    }))
  }

  updatePositionAndStyle = () => {
    const windowHeight = window.innerHeight
    const pageOffset =
      window.scrollY - ((document.querySelector('#content') as HTMLElement)?.offsetTop || 0)
    const postOffset =
      ((document.querySelector('#content') as HTMLElement)?.offsetHeight || 0) + 127

    this.headings.forEach((el, index) => {
      const nextHeadingTop = this.headings[index + 1]?.offsetTop || postOffset
      const range = [el.offsetTop - pageOffset, nextHeadingTop - pageOffset - el.offsetHeight]
      const progress = (windowHeight - range[0]) / (range[1] - range[0])

      this.headingProgress[el.id] = {
        inView: range[0] < windowHeight && range[1] > 0,
        progress: Math.max(0, Math.min(1, progress))
      }
    })

    let activeElement: HTMLAnchorElement | null = null
    this.tocLinks.forEach(({ element: el, progressBar: bar, slug }, i) => {
      const { inView, progress } = this.headingProgress[slug]
      if (this.headingProgress[slug]) {
        const wasHighlighted = el.classList.contains('highlight')
        el.classList.toggle('highlight', inView)
        el.classList.toggle('highlight-bg-translucent', inView)
        el.classList.toggle(
          'toc-highlight-first',
          inView && (i == 0 || !this.headingProgress[this.tocLinks[i - 1]?.slug].inView)
        )
        el.classList.toggle(
          'toc-highlight-last',
          inView &&
            (i == this.tocLinks.length - 1 ||
              !this.headingProgress[this.tocLinks[i + 1]?.slug].inView)
        )
        bar.classList.toggle('is-read', !inView && progress == 1)
        bar.classList.toggle('highlight-bg', inView)
        bar.style.setProperty('height', `${progress * 90}%`)

        // Track the currently active element for auto-scroll
        if (inView && !wasHighlighted) {
          activeElement = el
        }
      }
    })

    // Auto-scroll TOC to keep highlighted item visible
    if (activeElement) {
      this.autoScrollToActiveElement(activeElement)
    }
  }

  private autoScrollToActiveElement(activeElement: HTMLAnchorElement) {
    const sidebar = document.getElementById(this.containerId)
    if (sidebar) {
      // Get element position relative to the sidebar container
      const sidebarRect = sidebar.getBoundingClientRect()
      const elementRect = (activeElement as HTMLElement).getBoundingClientRect()

      const sidebarTop = sidebarRect.top
      const sidebarBottom = sidebarRect.bottom
      const elementTop = elementRect.top
      const elementBottom = elementRect.bottom

      // Check if element is outside the visible area
      if (elementTop < sidebarTop + 80 || elementBottom > sidebarBottom) {
        // Calculate how much to scroll
        const elementOffsetFromTop = elementTop - sidebarTop
        const targetScroll = sidebar.scrollTop + elementOffsetFromTop - 120

        sidebar.scrollTo({
          top: Math.max(0, targetScroll),
          behavior: 'smooth'
        })
      }
    }
  }

  private setupSmoothScroll() {
    this.tocLinks.forEach((link) => {
      link.element.addEventListener('click', (e) => {
        e.preventDefault()
        // Push the history to add the hash at the end of the URL
        const directHeading = this.headings.find((heading) => heading.id === link.slug)
        if (directHeading) {
          // Push the history to add the hash at the end of the URL
          history.pushState(
            null,
            directHeading.textContent || '',
            link.element.getAttribute('href')
          )
          directHeading.scrollIntoView({ behavior: 'smooth' })
        } else {
          this.handleMissingHeading(link.slug, link.element)
        }
      })
    })
  }

  private handleMissingHeading(slug: string, linkElement: HTMLElement) {
    console.warn(`TOC: No heading found for slug "${slug}". Link will be disabled.`)

    // Gracefully handle missing heading
    linkElement.setAttribute('aria-disabled', 'true')
    linkElement.style.opacity = '0.5'
    linkElement.style.pointerEvents = 'none'
    linkElement.title = `Heading "${slug}" not found on this page`
  }

  private setupIntersectionObserver() {
    try {
      const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }

      this.intersectionObserver = new IntersectionObserver(() => {
        // Use requestAnimationFrame to batch updates
        if (this.scrollTimeout) {
          cancelAnimationFrame(this.scrollTimeout)
        }

        this.scrollTimeout = requestAnimationFrame(() => {
          this.updatePositionAndStyle()
        })
      }, observerOptions)

      // Observe all headings
      this.headings.forEach((heading) => {
        if (this.intersectionObserver) {
          this.intersectionObserver.observe(heading)
        }
      })
    } catch (error) {
      console.error('TOC: Failed to setup IntersectionObserver:', error)
      // Fallback to throttled scroll listener
      this.setupFallbackScrollListener()
    }
  }

  private setupFallbackScrollListener() {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updatePositionAndStyle()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
  }

  init() {
    try {
      this.setupSmoothScroll()

      // Use IntersectionObserver for better performance
      this.setupIntersectionObserver()

      // Initial update
      this.updatePositionAndStyle()
    } catch (error) {
      console.error('TOC: Failed to initialize scroll manager:', error)
    }
  }

  destroy() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect()
      this.intersectionObserver = null
    }

    if (this.scrollTimeout) {
      cancelAnimationFrame(this.scrollTimeout)
      this.scrollTimeout = null
    }
  }
}
