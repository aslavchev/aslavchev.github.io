import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { featuredProjects } from "@/lib/portfolio-data"

export function FeaturedProjects() {
  return (
    <section id="featured" className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Featured Projects</h2>
          <p className="text-muted-foreground mt-2">Recent quality engineering achievements</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuredProjects.map((project, index) => (
          <Card
            key={index}
            className="group hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 overflow-hidden"
          >
            <div className="aspect-video overflow-hidden bg-muted relative">
              <Image
                src={project.image || "/placeholder.svg?height=400&width=600"}
                alt={`${project.title} - QA testing project dashboard`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index < 2}
              />
            </div>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="group-hover:text-primary transition-colors">{project.title}</CardTitle>
                  <CardDescription className="mt-2">{project.description}</CardDescription>
                </div>
                {project.badge && <Badge variant="secondary">{project.badge}</Badge>}
              </div>
            </CardHeader>
            <CardFooter className="flex items-center justify-between">
              <span className="text-sm font-semibold text-primary">{project.metric}</span>
              <Button variant="ghost" size="sm" aria-label={`View details for ${project.title}`}>
                View Details
                <ArrowUpRight className="h-4 w-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
