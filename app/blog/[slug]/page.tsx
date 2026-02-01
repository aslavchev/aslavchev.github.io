import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { readFile } from "fs/promises"
import path from "path"
import { marked } from "marked"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShareButtons } from "@/components/share-buttons"
import { ReadingProgress } from "@/components/reading-progress"
import { features } from "@/lib/features"
import { getArticleBySlug, getPublishedArticles, getAdjacentArticles, getRelatedArticles } from "@/lib/data/blog"
import { extractHeadings, addHeadingIds } from "@/lib/markdown-utils"
import { slugify } from "@/lib/utils"
import { Calendar, Clock, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"

interface PageProps {
  params: Promise<{ slug: string }>
}

// Generate static params for all published articles (required for static export)
export function generateStaticParams() {
  if (!features.showBlog) {
    return []
  }

  const articles = getPublishedArticles()
  return articles.map(article => ({
    slug: article.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    return {
      title: "Article Not Found",
    }
  }

  const articleUrl = `https://aslavchev.com/blog/${slug}`

  return {
    title: `${article.title} – Alex Slavchev`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      url: articleUrl,
      siteName: "Alex Slavchev - Quality Engineer",
      type: "article",
      publishedTime: article.date,
      tags: article.tags,
      images: [
        {
          url: "https://aslavchev.com/og-image.png",
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: ["https://aslavchev.com/og-image.png"],
      creator: "@aslavchev",
    },
    other: {
      'article:published_time': article.date,
      'article:author': 'Alex Slavchev',
      'article:tag': article.tags.join(', '),
    },
  }
}

// Configure marked for GitHub Flavored Markdown
marked.setOptions({
  gfm: true,
})

// Read markdown file content
async function getArticleContent(slug: string): Promise<string> {
  try {
    const filePath = path.join(process.cwd(), 'content', 'blog', `${slug}.md`)
    const fileContent = await readFile(filePath, 'utf-8')
    const html = await marked(fileContent)
    return addHeadingIds(html)
  } catch (error) {
    console.error(`Error reading article ${slug}:`, error)
    return '<p>Article content not found.</p>'
  }
}

export default async function ArticlePage({ params }: PageProps) {
  // Feature flag check
  if (!features.showBlog) {
    notFound()
  }

  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const htmlContent = await getArticleContent(slug)
  const { prev, next } = getAdjacentArticles(slug)
  const headings = extractHeadings(htmlContent)
  const showToc = headings.length >= 5
  const relatedArticles = getRelatedArticles(slug, 3)

  const articleUrl = `https://aslavchev.com/blog/${slug}`

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "datePublished": article.date,
    "author": {
      "@type": "Person",
      "name": "Alex Slavchev",
      "url": "https://aslavchev.com"
    },
    "publisher": {
      "@type": "Person",
      "name": "Alex Slavchev"
    },
    "keywords": article.tags.join(", "),
    "url": articleUrl
  }

  return (
    <>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="max-w-3xl space-y-12">
      {/* Back button */}
      <Link href="/blog">
        <Button variant="ghost" size="sm" className="group">
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to all articles
        </Button>
      </Link>

      {/* Article header */}
      <article className="blog-article space-y-12">
        <header className="space-y-6">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(article.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {article.readTime}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {article.tags.map(tag => (
              <Link key={tag} href={`/blog/tag/${slugify(tag)}`}>
                <Badge variant="secondary" className="cursor-pointer hover:bg-primary/20 transition-colors">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        </header>

        {/* Table of Contents */}
        {showToc && (
          <nav className="p-3 bg-muted/50 rounded-lg border">
            <h2 className="text-xs font-semibold mb-1.5 uppercase tracking-wide">Contents</h2>
            <ul>
              {headings.map(heading => (
                <li key={heading.id} className="leading-tight">
                  <a
                    href={`#${heading.id}`}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors py-0.5 block"
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Article content */}
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Share buttons */}
        <ShareButtons title={article.title} url={articleUrl} />

        {/* Related articles */}
        {relatedArticles.length > 0 && (
          <div className="pt-8 border-t space-y-4">
            <h2 className="text-lg font-semibold">Related Articles</h2>
            <div className="grid gap-4">
              {relatedArticles.map(related => (
                <Link key={related.slug} href={`/blog/${related.slug}`} className="group">
                  <div className="p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-all">
                    <h3 className="font-medium group-hover:text-primary transition-colors mb-2">
                      {related.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {related.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {related.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Article navigation */}
        <div className="pt-8 border-t space-y-6">
          {(prev || next) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prev && (
                <Link href={`/blog/${prev.slug}`} className="group">
                  <div className="p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-all">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <ChevronLeft className="h-4 w-4" />
                      <span>Previous</span>
                    </div>
                    <div className="font-medium group-hover:text-primary transition-colors line-clamp-2">
                      {prev.title}
                    </div>
                  </div>
                </Link>
              )}
              {next && (
                <Link href={`/blog/${next.slug}`} className="group sm:ml-auto">
                  <div className="p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-all">
                    <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground mb-2">
                      <span>Next</span>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                    <div className="font-medium group-hover:text-primary transition-colors line-clamp-2 text-right">
                      {next.title}
                    </div>
                  </div>
                </Link>
              )}
            </div>
          )}

          <Link href="/blog">
            <Button variant="ghost" size="sm" className="group">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to all articles
            </Button>
          </Link>
        </div>
      </article>
      </div>
    </>
  )
}
