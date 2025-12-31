import { Card, CardDescription, CardFooter, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Github, ExternalLink } from "lucide-react"
import Image from "next/image"
import { projects } from "@/lib/data"
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
        {projects.map((project, index) => (
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
            <CardHeader className="space-y-5">
              <CardTitle className="group-hover:text-primary transition-colors text-xl sm:text-2xl font-bold break-words leading-tight">
                {project.title}
              </CardTitle>
              <CardDescription className="text-sm sm:text-base text-foreground/75 leading-relaxed">
                {project.description}
              </CardDescription>
              {project.tools && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tools.slice(0, 4).map((tool) => (
                    <Badge key={tool} variant="secondary" className="text-xs font-medium">
                      {tool}
                    </Badge>
                  ))}
                </div>
              )}
            </CardHeader>
            {project.metrics && (
              <CardContent className="pt-0 pb-4">
                <ul className="space-y-2">
                  {project.metrics.map((metric, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-foreground/70">
                      <span className="text-primary mt-0.5 text-sm font-bold">✓</span>
                      <span>{metric}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            )}
            <CardFooter className="flex flex-col gap-3 pt-0">
              <div className="flex gap-2 w-full">
                {project.githubUrl && (
                  <Button
                    size="sm"
                    asChild
                    aria-label={`View code for ${project.title}`}
                    className="flex-1 font-semibold"
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      View Code
                    </a>
                  </Button>
                )}
                {project.liveUrl && (
                  <Button
                    size="sm"
                    variant="secondary"
                    asChild
                    aria-label={`View live demo of ${project.title}`}
                    className="flex-1 font-semibold"
                  >
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </div>
              {project.metric && (
                <span className="text-xs font-medium text-primary text-center">
                  {project.metric}
                </span>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
