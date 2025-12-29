import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import { projects } from "@/lib/data"

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
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2 aspect-video md:aspect-auto overflow-hidden bg-muted relative min-h-[250px]">
                <Image
                  src={project.image || "/placeholder.svg?height=400&width=600"}
                  alt={`${project.title} - QA case study dashboard and metrics`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              <div className="md:col-span-3">
                <CardHeader>
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors">{project.title}</CardTitle>
                  <CardDescription className="text-base mt-3">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {project.metrics && (
                    <div>
                      <h4 className="text-sm font-semibold mb-3">Key Achievements</h4>
                      <ul className="space-y-2">
                        {project.metrics.map((metric, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-1" aria-hidden="true">
                              ✓
                            </span>
                            <span>{metric}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {project.tools && (
                    <div className="flex flex-wrap gap-2">
                      {project.tools.map((tool) => (
                        <Badge key={tool} variant="secondary">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="gap-3">
                  <Button variant="outline" size="sm" aria-label={`View code for ${project.title}`}>
                    <Github className="h-4 w-4 mr-2" />
                    View Code
                  </Button>
                  <Button variant="outline" size="sm" aria-label={`View live demo of ${project.title}`}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </Button>
                </CardFooter>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
