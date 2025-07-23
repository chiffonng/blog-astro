interface Book {
  id: string
  title: string
  author: string
  imageUrl: string
  bookUrl: string
}

export async function getCurrentlyReadingBooks(storygraphUser: string): Promise<Book[]> {
  try {
    const url = `https://app.thestorygraph.com/currently-reading/${storygraphUser}`

    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      }
    })

    if (!response.ok) {
      console.error('Failed to fetch StoryGraph page:', response.status, response.statusText)
      return []
    }

    const html = await response.text()
    return parseCurrentlyReadingBooks(html)
  } catch (error) {
    console.error('Error fetching currently reading books:', error)
    return []
  }
}

function parseCurrentlyReadingBooks(html: string): Book[] {
  const books: Book[] = []

  // First, extract only the current reads section (not paused books)
  const currentReadsMatch = html.match(
    /<span class="read-books-panes">([\s\S]*?)(?=<hr[^>]*id='paused'|$)/
  )
  if (!currentReadsMatch) {
    return books
  }

  const currentReadsSection = currentReadsMatch[1]

  // Look for main book panes within current reads section only
  const bookPaneRegex =
    /<div[^>]+class="max-w-3xl[^"]*book-pane[^"]*"[^>]+data-book-id=([^\s>]+)[^>]*>([\s\S]*?)(?=<div[^>]+class="max-w-3xl[^"]*book-pane|$)/g

  let match
  while ((match = bookPaneRegex.exec(currentReadsSection)) !== null) {
    const bookId = match[1]
    const bookContent = match[2]

    // Extract image URL from img tag - just get the first one
    const imageMatch = bookContent.match(/<img[^>]+src="([^"]+)"/)
    const imageUrl = imageMatch ? imageMatch[1] : ''

    // Extract book title from the h3 tag with a link to books
    const titleMatch = bookContent.match(
      /<h3[^>]*>[\s\S]*?<a[^>]+href="\/books\/[^"]*">([^<]+)<\/a>/
    )
    const title = titleMatch ? titleMatch[1].trim() : ''

    // Extract author name from the first font-body paragraph with an author link
    const authorMatch = bookContent.match(
      /<p[^>]+class="[^"]*font-body[^"]*"[^>]*>[\s\S]*?<a[^>]+href="\/authors\/[^"]*">([^<]+)<\/a>/
    )
    const author = authorMatch ? authorMatch[1].trim() : ''

    // Extract book URL from the first link to books
    const bookUrlMatch = bookContent.match(/<a[^>]+href="(\/books\/[^"]+)"/)
    const bookUrl = bookUrlMatch ? `https://app.thestorygraph.com${bookUrlMatch[1]}` : ''

    if (bookId && title && author && imageUrl) {
      books.push({
        id: bookId,
        title: title,
        author: author,
        imageUrl: imageUrl,
        bookUrl: bookUrl
      })
    }
  }

  return books
}
