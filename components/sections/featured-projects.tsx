import { Card, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
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
          <p className="text-base lg:text-lg text-muted-foreground">{content.featuredProjects.subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
        {featuredProjects.map((project, index) => {
          const isLastOdd = featuredProjects.length % 2 !== 0 && index === featuredProjects.length - 1
          return (
          <Card
            key={index}
            className={`group hover:shadow-xl hover:shadow-primary/8 transition-all duration-300 overflow-hidden border-border/50 hover:border-border bg-card/50 backdrop-blur-sm md:grid md:grid-rows-subgrid md:row-span-6 ${isLastOdd ? 'md:col-span-2' : ''}`}
          >
            {/* Row 1: Image */}
            <div className="aspect-video overflow-hidden bg-muted/50 relative border-2 border-primary">
              <Image
                src={getAssetPath(project.image || "/placeholder.svg?height=400&width=600")}
                alt={`${project.title} - QA testing project dashboard`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            {/* Row 2: Title */}
            <div className="px-6 pt-6">
              <CardTitle className="group-hover:text-primary transition-colors text-xl sm:text-2xl font-bold break-words leading-tight">
                {project.title}
              </CardTitle>
            </div>
            {/* Row 3: Description */}
            <div className="px-6">
              <CardDescription className="text-sm sm:text-base text-foreground/75 leading-relaxed">
                {project.description}
              </CardDescription>
            </div>
            {/* Row 3: Tool badges */}
            <div className="px-6">
              {project.tools && (
                <div className="flex flex-wrap gap-2">
                  {project.tools.slice(0, 4).map((tool) => (
                    <Badge key={tool} variant="secondary" className="text-xs font-medium">
                      {tool}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            {/* Row 4: Industry badges */}
            <div className="px-6">
              {project.industries && (
                <div className="flex flex-wrap gap-2">
                  {project.industries.map((industry) => (
                    <Badge key={industry} variant="outline" className="text-xs font-medium text-primary border-primary/50">
                      {industry}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            {/* Row 5: Action buttons */}
            <CardFooter className="flex flex-col gap-3 pt-0">
              <div className="grid grid-cols-2 gap-2 w-full">
                {project.githubUrl && (
                  <Button
                    size="sm"
                    asChild
                    aria-label={`View code for ${project.title} (opens in new tab)`}
                    className={`font-semibold ${!project.liveUrl ? 'col-span-2' : ''}`}
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      View Code
                      <ArrowUpRight className="h-3 w-3 ml-1 opacity-70" />
                    </a>
                  </Button>
                )}
                {project.liveUrl && (
                  <Button
                    size="sm"
                    variant="secondary"
                    asChild
                    aria-label={`View ${project.liveLabel || 'live demo'} of ${project.title} (opens in new tab)`}
                    className={`font-semibold ${!project.githubUrl ? 'col-span-2' : ''}`}
                  >
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {project.liveLabel || "Live Demo"}
                      <ArrowUpRight className="h-3 w-3 ml-1 opacity-70" />
                    </a>
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
          )
        })}
      </div>
    </section>
  )
}
