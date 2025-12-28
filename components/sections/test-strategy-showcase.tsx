import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Layers, TrendingUp, ShieldCheck, GitBranch, Users, FileCode } from "lucide-react"

const testingPyramid = [
  {
    level: "E2E Tests",
    percentage: "10%",
    description: "Critical user journeys",
    tools: ["Playwright", "Cypress"],
    color: "bg-red-500/20 border-red-500",
  },
  {
    level: "Integration Tests",
    percentage: "30%",
    description: "Component interactions",
    tools: ["Jest", "Testing Library"],
    color: "bg-orange-500/20 border-orange-500",
  },
  {
    level: "Unit Tests",
    percentage: "60%",
    description: "Individual functions",
    tools: ["Jest", "Vitest"],
    color: "bg-green-500/20 border-green-500",
  },
]

const qualityGates = [
  {
    name: "Code Quality Gate",
    icon: FileCode,
    checks: ["Code coverage > 80%", "No critical bugs", "Code smells addressed"],
  },
  {
    name: "Security Gate",
    icon: ShieldCheck,
    checks: ["Vulnerability scan passed", "Dependencies up to date", "OWASP compliance"],
  },
  {
    name: "Performance Gate",
    icon: TrendingUp,
    checks: ["Lighthouse score > 90", "API response < 200ms", "Bundle size optimized"],
  },
  {
    name: "Integration Gate",
    icon: GitBranch,
    checks: ["All tests passing", "Build successful", "E2E scenarios green"],
  },
]

const testingPhilosophies = [
  {
    title: "Shift-Left Testing",
    description: "Integrate testing early in the development cycle to catch issues before they escalate",
    benefits: ["Earlier bug detection", "Reduced fix costs", "Faster feedback loops"],
    icon: Users,
  },
  {
    title: "Test Automation ROI",
    description: "Strategic automation focusing on high-value, stable test cases with maximum impact",
    benefits: ["70% time savings", "95% accuracy", "3x faster releases"],
    icon: TrendingUp,
  },
  {
    title: "Risk-Based Testing",
    description: "Prioritize testing efforts based on business impact and technical risk assessment",
    benefits: ["Optimized coverage", "Critical path focus", "Resource efficiency"],
    icon: ShieldCheck,
  },
]

export function TestStrategyShowcase() {
  return (
    <section id="test-strategy" className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Testing Strategy & Frameworks</h2>
        <p className="text-muted-foreground mt-2">Proven methodologies and custom frameworks I've implemented</p>
      </div>

      {/* Testing Pyramid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5" />
            Testing Pyramid Approach
          </CardTitle>
          <CardDescription>Balanced test distribution for optimal coverage and maintainability</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {testingPyramid.map((level, index) => (
              <div key={index} className={`p-6 rounded-lg border-2 ${level.color}`}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-lg">{level.level}</h4>
                    <p className="text-sm text-muted-foreground">{level.description}</p>
                  </div>
                  <Badge variant="secondary" className="text-lg">
                    {level.percentage}
                  </Badge>
                </div>
                <div className="flex gap-2 mt-3">
                  {level.tools.map((tool) => (
                    <Badge key={tool} variant="outline">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quality Gates */}
      <div>
        <h3 className="text-2xl font-bold mb-4">CI/CD Quality Gates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {qualityGates.map((gate, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <gate.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{gate.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {gate.checks.map((check, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span>{check}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Testing Philosophies */}
      <div>
        <h3 className="text-2xl font-bold mb-4">Testing Philosophies</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testingPhilosophies.map((philosophy, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="p-3 rounded-lg bg-primary/10 w-fit mb-3">
                  <philosophy.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{philosophy.title}</CardTitle>
                <CardDescription>{philosophy.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h5 className="font-semibold text-sm">Key Benefits:</h5>
                  <ul className="space-y-1">
                    {philosophy.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="text-primary">→</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
