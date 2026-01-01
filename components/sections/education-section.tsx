import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Award, Briefcase, Globe, Users } from "lucide-react"
import { education } from "@/lib/data"
import type { Education } from "@/lib/data/types"

const getEducationIcon = (type?: Education["type"]) => {
  switch (type) {
    case "degree":
      return GraduationCap // University degrees
    case "certification":
      return Award // Professional certifications
    case "training":
      return Briefcase // Professional training courses
    case "international":
      return Globe // International programs (Buenos Aires!)
    case "professional":
      return Users // Professional development
    default:
      return GraduationCap
  }
}

export function EducationSection() {
  return (
    <section id="education" className="space-y-8">
      <div>
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-2">Education</h2>
        <p className="text-base lg:text-lg text-muted-foreground/80">Academic background</p>
      </div>

      <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/20 before:to-transparent md:before:ml-[2.5rem]">
        {education.map((edu, index) => {
          const Icon = getEducationIcon(edu.type)
          return (
            <div key={index} className="relative flex gap-4 md:gap-6">
              {/* Timeline Node */}
              <div className="relative flex flex-col items-center">
                <div className="z-10 flex h-10 w-10 md:h-20 md:w-20 items-center justify-center rounded-full border-4 border-background bg-primary/10">
                  <div className="flex h-8 w-8 md:h-16 md:w-16 items-center justify-center rounded-full bg-primary">
                    <Icon className="h-4 w-4 md:h-8 md:w-8 text-primary-foreground" />
                  </div>
                </div>
              </div>

              {/* Content Card */}
              <Card className="flex-1 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300">
                <CardHeader className="space-y-4">
                  <div>
                    <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold break-words leading-tight">
                      {edu.degree}
                    </CardTitle>
                    <CardDescription className="text-base sm:text-lg mt-1.5 break-words text-foreground/70">
                      {edu.school}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="w-fit justify-start text-sm font-medium">
                    {edu.period}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base leading-relaxed text-foreground/75">{edu.description}</p>
                </CardContent>
              </Card>
            </div>
          )
        })}
      </div>
    </section>
  )
}
