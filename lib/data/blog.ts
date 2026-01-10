/**
 * Blog Articles Metadata
 *
 * Article content lives in content/blog/{slug}.md
 * Add metadata here, write content in markdown files
 */

export interface BlogArticle {
  slug: string // URL-friendly identifier (matches filename: content/blog/{slug}.md)
  title: string // Article title
  description: string // Short summary for list view and SEO
  date: string // Publication date (YYYY-MM-DD format)
  readTime: string // Estimated reading time (e.g., "5 min read")
  tags: string[] // Categories/topics
  published: boolean // Draft vs published (only published articles show on site)
}

/**
 * Blog articles (newest first)
 *
 * To add a new article:
 * 1. Add entry below
 * 2. Set published: false while drafting
 * 3. Set published: true when ready to ship
 */
export const blogArticles: BlogArticle[] = [
  // Example article (content in: content/blog/charles-proxy-setup.md)
  {
    slug: "charles-proxy-setup",
    title: "How to Setup Charles Proxy for Mobile App Testing",
    description: "Step-by-step guide to configure Charles Proxy for iOS and Android mobile testing, including SSL certificate installation and common troubleshooting.",
    date: "2026-01-10",
    readTime: "8 min read",
    tags: ["Mobile Testing", "Charles Proxy", "Tools", "Tutorial"],
    published: true, // Set to true when article is ready to publish
  },

  // Add more articles as you write them:
  // {
  //   slug: "bug-template-github",
  //   title: "Creating Effective Bug Templates in GitHub",
  //   description: "Learn how to create comprehensive bug report templates...",
  //   date: "2026-01-15",
  //   readTime: "6 min read",
  //   tags: ["Bug Tracking", "GitHub", "Best Practices"],
  //   published: false,
  // },
]

/**
 * Get all published articles (sorted by date, newest first)
 */
export function getPublishedArticles(): BlogArticle[] {
  return blogArticles
    .filter(article => article.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/**
 * Get article by slug
 */
export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find(article => article.slug === slug && article.published)
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
  const tags = new Set<string>()
  blogArticles
    .filter(article => article.published)
    .forEach(article => article.tags.forEach(tag => tags.add(tag)))
  return Array.from(tags).sort()
}

/**
 * Get articles by tag
 */
export function getArticlesByTag(tag: string): BlogArticle[] {
  return getPublishedArticles().filter(article =>
    article.tags.includes(tag)
  )
}

/**
 * Get previous and next articles for navigation
 */
export function getAdjacentArticles(currentSlug: string): {
  prev: BlogArticle | null
  next: BlogArticle | null
} {
  const articles = getPublishedArticles()
  const currentIndex = articles.findIndex(a => a.slug === currentSlug)

  if (currentIndex === -1) {
    return { prev: null, next: null }
  }

  return {
    prev: articles[currentIndex + 1] || null,
    next: articles[currentIndex - 1] || null,
  }
}

/**
 * Get related articles based on shared tags
 */
export function getRelatedArticles(currentSlug: string, limit = 3): BlogArticle[] {
  const currentArticle = getArticleBySlug(currentSlug)
  if (!currentArticle) {
    return []
  }

  const allArticles = getPublishedArticles().filter(a => a.slug !== currentSlug)

  // Score articles by number of shared tags
  const scored = allArticles.map(article => {
    const sharedTags = article.tags.filter(tag => currentArticle.tags.includes(tag))
    return { article, score: sharedTags.length }
  })

  // Sort by score (most shared tags first), then by date
  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return new Date(b.article.date).getTime() - new Date(a.article.date).getTime()
    })
    .slice(0, limit)
    .map(item => item.article)
}
