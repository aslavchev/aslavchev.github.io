"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import type { BlogArticle } from "@/lib/data/blog"

interface BlogSearchProps {
  articles: BlogArticle[]
  onFilter: (filtered: BlogArticle[]) => void
}

export function BlogSearch({ articles, onFilter }: BlogSearchProps) {
  const [query, setQuery] = useState("")

  useEffect(() => {
    if (!query.trim()) {
      onFilter(articles)
      return
    }

    const searchTerm = query.toLowerCase()
    const filtered = articles.filter(
      article =>
        article.title.toLowerCase().includes(searchTerm) ||
        article.description.toLowerCase().includes(searchTerm) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    )

    onFilter(filtered)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search articles by title, description, or tags..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="pl-10 pr-10"
      />
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
