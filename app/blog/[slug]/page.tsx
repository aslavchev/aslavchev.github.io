import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { readFile } from "fs/promises"
import path from "path"
import { marked } from "marked"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { features } from "@/lib/features"
import { getArticleBySlug, getPublishedArticles } from "@/lib/data/blog"
import { Calendar, Clock, ArrowLeft } from "lucide-react"

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

  return {
    title: `${article.title} – Alex Slavchev`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.date,
      tags: article.tags,
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
    return marked(fileContent)
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

  return (
    <div className="max-w-3xl space-y-12">
      {/* Back button */}
      <Link href="/blog">
        <Button variant="ghost" size="sm" className="group">
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Articles
        </Button>
      </Link>

      {/* Article header */}
      <article className="space-y-12">
        <header className="space-y-6">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(article.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
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
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </header>

        {/* Article content */}
        <div
          className="prose prose-base dark:prose-invert max-w-none
            prose-headings:scroll-mt-20
            prose-h1:text-2xl prose-h1:font-bold prose-h1:mt-10 prose-h1:mb-5 prose-h1:border-b prose-h1:border-border prose-h1:pb-3 prose-h1:text-foreground
            prose-h2:text-xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-primary
            prose-h3:text-lg prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-foreground
            prose-h4:text-base prose-h4:font-semibold prose-h4:mt-5 prose-h4:mb-2 prose-h4:text-foreground/90
            prose-p:text-foreground/90 prose-p:leading-relaxed prose-p:my-3 prose-p:text-[15px]
            prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-a:underline-offset-2 prose-a:decoration-2 prose-a:transition-colors
            prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-[''] prose-code:after:content-['']
            prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:p-4 prose-pre:rounded-md prose-pre:overflow-x-auto prose-pre:text-[13px] prose-pre:leading-relaxed
            prose-pre:my-5 prose-pre:shadow-sm
            prose-strong:text-foreground prose-strong:font-semibold
            prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
            prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2
            prose-li:text-foreground/90 prose-li:leading-relaxed prose-li:text-[15px]
            prose-li:marker:text-primary/80 prose-li:marker:font-normal
            prose-blockquote:border-l-4 prose-blockquote:border-l-primary prose-blockquote:bg-muted/30 prose-blockquote:py-3 prose-blockquote:px-4 prose-blockquote:not-italic prose-blockquote:my-6 prose-blockquote:text-foreground/80
            prose-hr:border-border prose-hr:my-8
            prose-table:border-collapse prose-table:w-full prose-table:my-6
            prose-th:border prose-th:border-border prose-th:bg-muted prose-th:p-3 prose-th:text-left prose-th:font-semibold prose-th:text-sm
            prose-td:border prose-td:border-border prose-td:p-3 prose-td:text-sm
            prose-img:rounded-lg prose-img:my-6 prose-img:shadow-md"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Back to blog link */}
        <div className="pt-8 border-t">
          <Link href="/blog">
            <Button variant="ghost" size="sm" className="group">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to all articles
            </Button>
          </Link>
        </div>
      </article>
    </div>
  )
}
