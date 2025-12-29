import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase } from "lucide-react"
import { experience } from "@/lib/data"

export function ExperienceSection() {
  return (
    <section id="experience" className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Experience</h2>
        <p className="text-muted-foreground mt-2">Professional journey and achievements</p>
      </div>

      <div className="space-y-6">
        {experience.map((exp, index) => (
          <Card
            key={index}
            className="hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300"
          >
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-xl break-words">{exp.title}</CardTitle>
                    <CardDescription className="text-base mt-1 break-words">{exp.company}</CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="shrink-0 self-start">
                  {exp.period}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{exp.description}</p>
              <ul className="space-y-2">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-primary mt-1" aria-hidden="true">
                      •
                    </span>
                    <span className="text-muted-foreground">{achievement}</span>
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
