import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Code2, Zap, Activity, Shield, Server, GitBranch } from "lucide-react"

const testingTools = [
  {
    category: "Test Automation Frameworks",
    icon: Code2,
    description: "End-to-end test automation and scripting",
    tools: [
      { name: "Selenium WebDriver", proficiency: 95, experience: "5 years" },
      { name: "Playwright", proficiency: 92, experience: "3 years" },
      { name: "Cypress", proficiency: 90, experience: "4 years" },
      { name: "Appium", proficiency: 85, experience: "3 years" },
    ],
  },
  {
    category: "Performance Testing",
    icon: Zap,
    description: "Load, stress, and performance benchmarking",
    tools: [
      { name: "K6", proficiency: 90, experience: "2 years" },
      { name: "JMeter", proficiency: 88, experience: "4 years" },
      { name: "Gatling", proficiency: 82, experience: "2 years" },
      { name: "Lighthouse", proficiency: 95, experience: "3 years" },
    ],
  },
  {
    category: "API Testing",
    icon: Server,
    description: "REST, GraphQL, and contract testing",
    tools: [
      { name: "Postman", proficiency: 95, experience: "6 years" },
      { name: "REST Assured", proficiency: 88, experience: "4 years" },
      { name: "Pact", proficiency: 80, experience: "2 years" },
      { name: "SoapUI", proficiency: 75, experience: "3 years" },
    ],
  },
  {
    category: "CI/CD Integration",
    icon: GitBranch,
    description: "Continuous integration and deployment pipelines",
    tools: [
      { name: "Jenkins", proficiency: 92, experience: "5 years" },
      { name: "GitHub Actions", proficiency: 90, experience: "3 years" },
      { name: "GitLab CI", proficiency: 85, experience: "2 years" },
      { name: "CircleCI", proficiency: 80, experience: "2 years" },
    ],
  },
  {
    category: "Observability & Monitoring",
    icon: Activity,
    description: "Application performance and error tracking",
    tools: [
      { name: "DataDog", proficiency: 88, experience: "3 years" },
      { name: "New Relic", proficiency: 85, experience: "2 years" },
      { name: "Grafana", proficiency: 82, experience: "2 years" },
      { name: "Sentry", proficiency: 90, experience: "3 years" },
    ],
  },
  {
    category: "Security Testing",
    icon: Shield,
    description: "Security scanning and vulnerability assessment",
    tools: [
      { name: "OWASP ZAP", proficiency: 85, experience: "3 years" },
      { name: "Burp Suite", proficiency: 80, experience: "2 years" },
      { name: "SonarQube", proficiency: 90, experience: "4 years" },
      { name: "Snyk", proficiency: 82, experience: "2 years" },
    ],
  },
]

export function TestingToolsSection() {
  return (
    <section id="testing-tools" className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Testing Tools & Frameworks</h2>
        <p className="text-muted-foreground mt-2">Comprehensive expertise across the QA technology stack</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {testingTools.map((category, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <category.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{category.category}</CardTitle>
                  <CardDescription className="mt-1">{category.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {category.tools.map((tool, toolIndex) => (
                <div key={toolIndex} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{tool.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {tool.experience}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={tool.proficiency} className="flex-1 h-2" />
                    <span className="text-xs text-muted-foreground font-medium w-10 text-right">
                      {tool.proficiency}%
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
