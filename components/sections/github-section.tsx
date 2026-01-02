"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GithubIcon, Star, GitFork, Code2, Users, ExternalLink, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GitHubStats {
  public_repos: number
  followers: number
  following: number
  total_stars: number
  total_forks: number
}

interface Repository {
  name: string
  description: string
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string
  topics: string[]
}

export function GitHubSection() {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [showAllRepos, setShowAllRepos] = useState(false)

  const username = "aslavchev"

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        // Fetch user stats
        const userRes = await fetch(`https://api.github.com/users/${username}`)
        const userData = await userRes.json()

        // Fetch repositories
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
        const reposData = await reposRes.json()

        // Calculate total stars and forks
        const totalStars = reposData.reduce((sum: number, repo: Repository) => sum + repo.stargazers_count, 0)
        const totalForks = reposData.reduce((sum: number, repo: Repository) => sum + repo.forks_count, 0)

        setStats({
          public_repos: userData.public_repos,
          followers: userData.followers,
          following: userData.following,
          total_stars: totalStars,
          total_forks: totalForks,
        })

        // Get top 6 repositories by stars
        const topRepos = reposData
          .filter((repo: Repository) => !repo.name.includes('aslavchev'))
          .sort((a: Repository, b: Repository) => b.stargazers_count - a.stargazers_count)
          .slice(0, 6)

        setRepos(topRepos)
      } catch (error) {
        console.error("Error fetching GitHub data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [username])

  if (loading) {
    return (
      <section id="github" className="space-y-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 bg-primary rounded-full" />
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">GitHub Activity</h2>
          </div>
        </div>
        <div className="text-center py-12 text-muted-foreground">
          Loading GitHub stats...
        </div>
      </section>
    )
  }

  return (
    <section id="github" className="space-y-8">
      {/* Section Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 bg-primary rounded-full" />
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">GitHub Activity</h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Open source contributions, repositories, and code activity
        </p>
      </div>

      {/* Stats Grid */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Repositories</CardDescription>
              <CardTitle className="text-3xl">{stats.public_repos}</CardTitle>
            </CardHeader>
            <CardContent>
              <Code2 className="h-4 w-4 text-muted-foreground" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Stars</CardDescription>
              <CardTitle className="text-3xl">{stats.total_stars}</CardTitle>
            </CardHeader>
            <CardContent>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Forks</CardDescription>
              <CardTitle className="text-3xl">{stats.total_forks}</CardTitle>
            </CardHeader>
            <CardContent>
              <GitFork className="h-4 w-4 text-muted-foreground" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Followers</CardDescription>
              <CardTitle className="text-3xl">{stats.followers}</CardTitle>
            </CardHeader>
            <CardContent>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Following</CardDescription>
              <CardTitle className="text-3xl">{stats.following}</CardTitle>
            </CardHeader>
            <CardContent>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Top Repositories */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Featured Repositories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(showAllRepos ? repos : repos.slice(0, 3)).map((repo) => (
            <Card key={repo.name} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg leading-tight">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors flex items-center gap-2"
                    >
                      {repo.name}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </CardTitle>
                </div>
                <CardDescription className="line-clamp-2">
                  {repo.description || "No description available"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5" />
                    <span>{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="h-3.5 w-3.5" />
                    <span>{repo.forks_count}</span>
                  </div>
                  {repo.language && (
                    <Badge variant="outline" className="text-xs">
                      {repo.language}
                    </Badge>
                  )}
                </div>

                {/* Topics */}
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {repo.topics.slice(0, 3).map((topic) => (
                      <Badge key={topic} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Show More Button */}
        {!showAllRepos && repos.length > 3 && (
          <div className="flex justify-center pt-4">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAllRepos(true)}
              className="gap-2"
            >
              <span>Show {repos.length - 3} more repositor{repos.length - 3 > 1 ? 'ies' : 'y'}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* GitHub Profile Link */}
      <div className="text-center pt-4">
        <Button size="lg" asChild>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="gap-2"
          >
            <GithubIcon className="h-5 w-5" />
            View Full GitHub Profile
          </a>
        </Button>
      </div>
    </section>
  )
}
