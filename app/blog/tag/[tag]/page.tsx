import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { features } from "@/lib/features"
import { getArticlesByTag, getAllTags } from "@/lib/data/blog"
import { slugify } from "@/lib/utils"
import { Calendar, Clock, ArrowLeft } from "lucide-react"

interface PageProps {
  params: Promise<{ tag: string }>
}

export function generateStaticParams() {
  if (!features.showBlog) {
    return []
  }

  const tags = getAllTags()
  return tags.map(tag => ({
    tag: slugify(tag),
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag: tagSlug } = await params

  // Find original tag from slug
  const allTags = getAllTags()
  const tag = allTags.find(t => slugify(t) === tagSlug) || tagSlug

  return {
    title: `${tag} Articles – Alex Slavchev`,
    description: `Technical articles about ${tag} from Alex Slavchev.`,
  }
}

export default async function TagPage({ params }: PageProps) {
  if (!features.showBlog) {
    notFound()
  }

  const { tag: tagSlug } = await params

  // Find original tag from slug
  const allTags = getAllTags()
  const tag = allTags.find(t => slugify(t) === tagSlug)

  if (!tag) {
    notFound()
  }

  const articles = getArticlesByTag(tag)

  if (articles.length === 0) {
    notFound()
  }

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Header */}
      <div className="space-y-4">
        <Link href="/blog">
          <Button variant="ghost" size="sm" className="group mb-4">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            All articles
          </Button>
        </Link>

        <div className="flex items-center gap-3">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {tag}
          </h1>
          <Badge variant="secondary">{articles.length}</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          {articles.length === 1 ? '1 article' : `${articles.length} articles`} about {tag}
        </p>
      </div>

      {/* Articles List */}
      <div className="space-y-6">
        {articles.map(article => (
          <Link key={article.slug} href={`/blog/${article.slug}`} className="block group">
            <Card className="hover:shadow-lg hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
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
                <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                  {article.title}
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  {article.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map(t => (
                    <Badge key={t} variant={t === tag ? "default" : "outline"} className="text-xs">
                      {t}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
