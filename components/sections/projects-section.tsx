import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import { projects } from "@/lib/data"
import { getAssetPath } from "@/lib/asset-path"

export function ProjectsSection() {
  return (
    <section id="projects" className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Case Studies</h2>
        <p className="text-muted-foreground mt-2">Detailed project breakdowns and achievements</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {projects.map((project, index) => (
          <Card
            key={index}
            className="group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 overflow-hidden"
          >
            <div className="flex flex-col md:grid md:grid-cols-5 gap-0 md:gap-6">
              {/* Image - no badge */}
              <div className="relative md:col-span-2 aspect-[16/10] md:aspect-auto overflow-hidden bg-muted md:min-h-[340px]">
                <Image
                  src={getAssetPath(project.image || "/placeholder.svg?height=400&width=600")}
                  alt={`${project.title} - QA case study dashboard and metrics`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority={index === 0}
                />
              </div>

              {/* Content */}
              <div className="md:col-span-3 flex flex-col">
                <CardHeader className="space-y-5 pb-4">
                  <CardTitle className="text-2xl sm:text-3xl font-bold group-hover:text-primary transition-colors leading-tight">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base leading-relaxed text-foreground/75">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 flex-1 pt-0">
                  {project.metrics && (
                    <div className="space-y-4">
                      <h4 className="text-base font-bold text-foreground uppercase tracking-wide">
                        Key Achievements
                      </h4>
                      <ul className="space-y-3">
                        {project.metrics.map((metric, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
                            <span className="text-primary mt-0.5 text-lg font-bold" aria-hidden="true">
                              ✓
                            </span>
                            <span className="text-foreground/80">{metric}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {project.tools && (
                    <div className="space-y-4">
                      <h4 className="text-base font-bold text-foreground uppercase tracking-wide">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tools.map((tool) => (
                          <Badge key={tool} variant="secondary" className="text-xs font-medium">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="gap-3">
                  {project.githubUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      aria-label={`View code for ${project.title}`}
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
                    >
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
