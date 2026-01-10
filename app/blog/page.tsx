import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { features } from "@/lib/features"
import { getPublishedArticles, getAllTags } from "@/lib/data/blog"
import { Calendar, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog – Alex Slavchev",
  description: "Technical articles on QA testing, automation, and quality engineering best practices.",
}

export default function BlogPage() {
  // Feature flag check - return 404 if blog is disabled
  if (!features.showBlog) {
    notFound()
  }

  const articles = getPublishedArticles()
  const tags = getAllTags()

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Technical Articles
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Practical guides on QA testing, automation, and quality engineering.
        </p>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Articles List */}
      {articles.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">
              No articles published yet. Check back soon!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {articles.map(article => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className="block group">
              <Card className="hover:shadow-lg hover:border-primary/50 transition-all duration-300 cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
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
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-base mt-2">
                    {article.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
