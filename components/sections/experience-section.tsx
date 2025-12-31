import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase } from "lucide-react"
import { experience } from "@/lib/data"

export function ExperienceSection() {
  return (
    <section id="experience" className="space-y-8">
      <div>
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-2">Experience</h2>
        <p className="text-base lg:text-lg text-muted-foreground/80">Professional journey and achievements</p>
      </div>

      <div className="space-y-6">
        {experience.map((exp, index) => (
          <Card
            key={index}
            className="hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300"
          >
            <CardHeader className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold break-words leading-tight">
                    {exp.title}
                  </CardTitle>
                  <CardDescription className="text-base sm:text-lg mt-1.5 break-words text-foreground/70">
                    {exp.company}
                  </CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="w-full sm:w-auto justify-center sm:justify-start text-sm font-medium">
                {exp.period}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="text-sm sm:text-base leading-relaxed text-foreground/75">{exp.description}</p>
              <ul className="space-y-3.5">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-base leading-relaxed">
                    <span className="text-primary mt-1 text-lg font-bold shrink-0" aria-hidden="true">
                      •
                    </span>
                    <span className="text-foreground/75">{achievement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
