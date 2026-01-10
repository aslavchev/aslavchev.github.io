/**
 * Extract headings from HTML content for table of contents
 */
export interface Heading {
  id: string
  text: string
  level: number
}

export function extractHeadings(html: string): Heading[] {
  const headings: Heading[] = []
  const headingRegex = /<h2[^>]*>(.*?)<\/h2>/gi
  const seenIds = new Map<string, number>()
  let match

  while ((match = headingRegex.exec(html)) !== null) {
    const text = match[1].replace(/<[^>]*>/g, '').trim()
    let id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    // Handle duplicate IDs
    const count = seenIds.get(id) || 0
    seenIds.set(id, count + 1)
    if (count > 0) {
      id = `${id}-${count}`
    }

    headings.push({ id, text, level: 2 })
  }

  return headings
}

/**
 * Add IDs to headings in HTML for anchor links
 */
export function addHeadingIds(html: string): string {
  const seenIds = new Map<string, number>()

  return html.replace(/<h2>(.*?)<\/h2>/gi, (_match, text) => {
    const cleanText = text.replace(/<[^>]*>/g, '').trim()
    let id = cleanText
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    // Handle duplicate IDs
    const count = seenIds.get(id) || 0
    seenIds.set(id, count + 1)
    if (count > 0) {
      id = `${id}-${count}`
    }

    return `<h2 id="${id}">${text}</h2>`
  })
}
