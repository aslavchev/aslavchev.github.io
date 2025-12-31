import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TestTube, Code, Workflow, Zap, Shield, Database, Cloud, Smartphone, Monitor, Activity } from "lucide-react"

const skillCategories = [
  {
    title: "Automation",
    icon: TestTube,
    skills: ["Selenium", "Cypress", "Playwright", "Appium", "WebdriverIO"],
    proficiency: 95,
  },
  {
    title: "API Testing",
    icon: Code,
    skills: ["Postman", "REST Assured", "Insomnia", "SoapUI", "GraphQL Testing"],
    proficiency: 90,
  },
  {
    title: "CI/CD",
    icon: Workflow,
    skills: ["Jenkins", "GitHub Actions", "CircleCI", "GitLab CI", "Azure DevOps"],
    proficiency: 88,
  },
  {
    title: "Performance",
    icon: Zap,
    skills: ["JMeter", "K6", "Gatling", "Locust", "LoadRunner"],
    proficiency: 85,
  },
  {
    title: "Security",
    icon: Shield,
    skills: ["OWASP ZAP", "Burp Suite", "Snyk", "SonarQube", "Checkmarx"],
    proficiency: 82,
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "SQL Server"],
    proficiency: 80,
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "Azure"],
    proficiency: 83,
  },
  {
    title: "Mobile Testing",
    icon: Smartphone,
    skills: ["Appium", "Espresso", "XCUITest", "Detox", "BrowserStack"],
    proficiency: 78,
  },
  {
    title: "Cross-Browser",
    icon: Monitor,
    skills: ["BrowserStack", "Sauce Labs", "LambdaTest", "Selenium Grid", "Percy"],
    proficiency: 87,
  },
  {
    title: "Monitoring",
    icon: Activity,
    skills: ["Grafana", "Prometheus", "New Relic", "Datadog", "ELK Stack"],
    proficiency: 81,
  },
]

export function StackSection() {
  return (
    <section id="stack" className="space-y-8">
      <div>
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-2">Skills & Expertise</h2>
        <p className="text-base lg:text-lg text-muted-foreground/80">Comprehensive testing skills across multiple domains</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, index) => {
          const Icon = category.icon
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
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  {category.skills.map((skill, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {skill}
                    </li>
                  ))}
                </ul>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Proficiency</span>
                    <span>{category.proficiency}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-1000"
                      style={{ width: `${category.proficiency}%` }}
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
