import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap } from "lucide-react"
import { education } from "@/lib/data"

export function EducationSection() {
  return (
    <section id="education" className="space-y-8">
      <div>
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-2">Education</h2>
        <p className="text-base lg:text-lg text-muted-foreground/80">Academic background</p>
      </div>

      <div className="space-y-4">
        {education.map((edu, index) => (
          <Card
            key={index}
            className="hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300"
          >
            <CardHeader className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold break-words leading-tight">
                    {edu.degree}
                  </CardTitle>
                  <CardDescription className="text-base sm:text-lg mt-1.5 break-words text-foreground/70">
                    {edu.school}
                  </CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="w-full sm:w-auto justify-center sm:justify-start text-sm font-medium">
                {edu.period}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm sm:text-base leading-relaxed text-foreground/75">{edu.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
