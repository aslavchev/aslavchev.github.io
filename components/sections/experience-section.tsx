import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { experience } from "@/lib/data"
import { getAssetPath } from "@/lib/asset-path"

const getCompanyInitials = (company: string) => {
  return company
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function ExperienceSection() {
  return (
    <section id="experience" className="space-y-8">
      <div>
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-2">Experience</h2>
        <p className="text-base lg:text-lg text-muted-foreground/80">Professional journey and achievements</p>
      </div>

      <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/20 before:to-transparent md:before:ml-[2.5rem]">
        {experience.map((exp, index) => (
          <div key={index} className="relative flex gap-4 md:gap-6">
            {/* Timeline Node */}
            <div className="relative flex flex-col items-center">
              <div className="z-10 flex h-10 w-10 md:h-20 md:w-20 items-center justify-center rounded-full border-4 border-background bg-primary/10">
                <Avatar className="h-8 w-8 md:h-16 md:w-16 border-2 border-primary">
                  {exp.companyLogo && (
                    <AvatarImage src={getAssetPath(exp.companyLogo)} alt={`${exp.company} logo`} />
                  )}
                  <AvatarFallback className="bg-primary text-primary-foreground font-bold text-xs md:text-sm">
                    {getCompanyInitials(exp.company)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>

            {/* Content Card */}
            <Card className="flex-1 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300">
              <CardHeader className="space-y-4">
                <div>
                  <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold break-words leading-tight">
                    {exp.title}
                  </CardTitle>
                  <CardDescription className="text-base sm:text-lg mt-1.5 break-words text-foreground/70">
                    {exp.company}
                  </CardDescription>
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  <Badge variant="outline" className="text-sm font-medium">
                    {exp.period}
                  </Badge>
                  {exp.projects && exp.projects.map((project, i) => (
                    <Badge key={i} variant="secondary" className="text-xs font-medium bg-primary/10 text-primary border-primary/20">
                      {project}
                    </Badge>
                  ))}
                </div>
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
          </div>
        ))}
      </div>
    </section>
  )
}
