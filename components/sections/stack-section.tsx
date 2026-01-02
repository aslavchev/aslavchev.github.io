import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TestTube, Code, Workflow, Zap, Smartphone, Settings, FileCheck, Wrench } from "lucide-react"
import { skills } from "@/lib/data/skills"
import type { LucideIcon } from "lucide-react"

// Icon mapping for skill categories
const iconMap: Record<string, LucideIcon> = {
  "Test Automation": TestTube,
  "API Testing": Code,
  "Performance Testing": Zap,
  "Programming": Code,
  "CI/CD": Workflow,
  "Test Management": FileCheck,
  "Mobile Testing": Smartphone,
  "Debugging & Proxy": Wrench,
}

export function StackSection() {
  return (
    <section id="stack" className="space-y-8">
      <div>
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-2">Skills & Expertise</h2>
        <p className="text-base lg:text-lg text-muted-foreground/80">Comprehensive testing skills across multiple domains</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, index) => {
          const Icon = iconMap[skill.category] || Settings
          return (
            <Card
              key={index}
              className="border-border/50 bg-card/50 backdrop-blur hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{skill.category}</CardTitle>
                </div>
                {skill.description && (
                  <p className="text-xs text-muted-foreground">{skill.description}</p>
                )}
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  {skill.skills.map((skillName, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {skillName}
                    </li>
                  ))}
                </ul>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Proficiency</span>
                    <span>{skill.proficiency}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-1000"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
