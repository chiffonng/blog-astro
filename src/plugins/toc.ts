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

function diveChildren(item: TocItem, depth: number): TocItem[] {
  if (depth === 1 || !item.subheadings.length) {
    return item.subheadings
  } else {
    // e.g., 2
    return diveChildren(item.subheadings[item.subheadings.length - 1] as TocItem, depth - 1)
  }
}

export function generateToc(headings: readonly MarkdownHeading[]) {
  // this ignores/filters out h1 element(s)
  const bodyHeadings = [...headings.filter(({ depth }) => depth > 1)]
  const toc: TocItem[] = []

  bodyHeadings.forEach((h) => {
    const heading: TocItem = { ...h, subheadings: [] }

    // add h2 elements into the top level
    if (heading.depth === 2) {
      toc.push(heading)
    } else {
      const lastItemInToc = toc[toc.length - 1]!
      if (heading.depth < lastItemInToc.depth) {
        throw new Error(`Orphan heading found: ${heading.text}.`)
      }

      // higher depth
      // push into children, or children's children
      const gap = heading.depth - lastItemInToc.depth
      const target = diveChildren(lastItemInToc, gap)
      target.push(heading)
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

  constructor(element: HTMLElement) {
    this.element = element
    this.initializeElements()
  }

  setContainerId(id: string) {
    this.containerId = id
  }

  private initializeElements() {
    // Initialize the headings and tocLinks
    this.headings = Array.from(
      document.querySelectorAll('article h2, article h3, article h4, article h5, article h6')
    )
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
          'rounded-t-2xl',
          inView && (i == 0 || !this.headingProgress[this.tocLinks[i - 1]?.slug].inView)
        )
        el.classList.toggle(
          'rounded-b-2xl',
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
          console.warn(`No heading found for slug: ${link.slug}`)
        }
      })
    })
  }

  init() {
    this.setupSmoothScroll()

    // Initial first and listen to scroll event
    setInterval(this.updatePositionAndStyle, 100)
    window.addEventListener('scroll', this.updatePositionAndStyle)
  }
}
