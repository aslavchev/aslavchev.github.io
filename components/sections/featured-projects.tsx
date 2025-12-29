import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { featuredProjects } from "@/lib/data"
import { getAssetPath } from "@/lib/asset-path"

export function FeaturedProjects() {
  return (
    <section id="featured" className="space-y-10 lg:space-y-12">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">Featured Projects</h2>
          <p className="text-base lg:text-lg text-muted-foreground/80">Recent quality engineering achievements</p>
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
            <CardHeader className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <CardTitle className="group-hover:text-primary transition-colors text-xl lg:text-2xl">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-sm lg:text-base text-muted-foreground/80">
                    {project.description}
                  </CardDescription>
                </div>
                {project.badge && (
                  <Badge variant="secondary" className="shrink-0 bg-primary/10 text-primary border-primary/20">
                    {project.badge}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardFooter className="flex items-center justify-between pt-4">
              <span className="text-sm font-semibold text-primary flex items-center gap-1.5">
                {project.metric}
              </span>
              <Button
                variant="ghost"
                size="sm"
                aria-label={`View details for ${project.title}`}
                className="text-sm hover:bg-muted/50"
              >
                View Details
                <ArrowUpRight className="h-4 w-4 ml-1.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
