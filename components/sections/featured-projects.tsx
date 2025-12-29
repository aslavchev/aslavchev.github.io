import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Github, ExternalLink } from "lucide-react"
import Image from "next/image"
import { featuredProjects } from "@/lib/data"
import { getAssetPath } from "@/lib/asset-path"
import { content } from "@/lib/content"

export function FeaturedProjects() {
  return (
    <section id="featured" className="space-y-10 lg:space-y-12">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">{content.featuredProjects.title}</h2>
          <p className="text-base lg:text-lg text-muted-foreground/80">{content.featuredProjects.subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
        {featuredProjects.map((project, index) => (
          <Card
            key={index}
            className="group hover:shadow-xl hover:shadow-primary/8 transition-all duration-300 overflow-hidden border-border/50 hover:border-border bg-card/50 backdrop-blur-sm"
          >
            <div className="aspect-video overflow-hidden bg-muted/50 relative">
              <Image
                src={getAssetPath(project.image || "/placeholder.svg?height=400&width=600")}
                alt={`${project.title} - QA testing project dashboard`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index < 2}
              />
            </div>
            <CardHeader className="space-y-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="group-hover:text-primary transition-colors text-lg sm:text-xl lg:text-2xl break-words leading-tight flex-1">
                    {project.title}
                  </CardTitle>
                  {project.badge && (
                    <Badge variant="secondary" className="shrink-0 bg-primary/10 text-primary border-primary/20 text-xs">
                      {project.badge}
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-sm sm:text-base text-muted-foreground/80 leading-relaxed">
                  {project.description}
                </CardDescription>
              </div>
            </CardHeader>
            <CardFooter className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
              <span className="text-sm font-medium text-primary/80 flex items-center gap-1.5">
                {project.metric}
              </span>
              <div className="flex gap-2 w-full sm:w-auto">
                {project.githubUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    aria-label={`View code for ${project.title}`}
                    className="text-sm flex-1 sm:flex-initial"
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      View Code
                    </a>
                  </Button>
                )}
                {project.liveUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    aria-label={`View live demo of ${project.title}`}
                    className="text-sm flex-1 sm:flex-initial"
                  >
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
