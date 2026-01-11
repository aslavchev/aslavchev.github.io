"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BlogSearch } from "@/components/blog-search"
import { features } from "@/lib/features"
import { getPublishedArticles, getAllTags } from "@/lib/data/blog"
import { slugify } from "@/lib/utils"
import { Calendar, Clock } from "lucide-react"
import { useState } from "react"
import type { BlogArticle } from "@/lib/data/blog"

export default function BlogPage() {
  // Feature flag check - return 404 if blog is disabled
  if (!features.showBlog) {
    notFound()
  }

  const allArticles = getPublishedArticles()
  const tags = getAllTags()
  const [filteredArticles, setFilteredArticles] = useState<BlogArticle[]>(allArticles)

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

      {/* Search */}
      <BlogSearch articles={allArticles} onFilter={setFilteredArticles} />

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <Link key={tag} href={`/blog/tag/${slugify(tag)}`}>
              <Badge variant="secondary" className="cursor-pointer hover:bg-primary/20 transition-colors">
                {tag}
              </Badge>
            </Link>
          ))}
        </div>
      )}

      {/* Articles List */}
      {filteredArticles.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">
              No articles found. Try a different search term.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {filteredArticles.map(article => (
            <Card key={article.slug} className="hover:shadow-lg hover:border-primary hover:bg-primary/5 hover:-translate-y-1 transition-all duration-300 h-full">
              <Link href={`/blog/${article.slug}`} className="block group">
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
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors cursor-pointer">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-base mt-2">
                    {article.description}
                  </CardDescription>
                </CardHeader>
              </Link>
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
          ))}
        </div>
      )}
    </div>
  )
}
