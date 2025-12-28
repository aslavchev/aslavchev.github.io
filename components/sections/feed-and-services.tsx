import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Rss, Briefcase } from "lucide-react"

const feedItems = [
  "Just completed a major automation refactor - 40% faster test execution",
  "Speaking at QA Summit 2025 on CI/CD best practices",
  "New article: Shift-left testing strategies",
]

const services = [
  "Test Automation Consulting",
  "QA Process Optimization",
  "Team Training & Mentorship",
  "Quality Strategy Development",
]

export function FeedAndServices() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Feed Card */}
      <Card className="hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Rss className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Recent Updates</CardTitle>
              <CardDescription>Latest activities and announcements</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-3">
            {feedItems.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-1">•</span>
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
          <Button variant="ghost" className="w-full justify-between">
            View Full Feed
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Services Card */}
      <Card className="hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>QA Services</CardTitle>
              <CardDescription>Consulting and expertise offerings</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-3">
            {services.map((service, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-1">✓</span>
                <span className="text-foreground">{service}</span>
              </li>
            ))}
          </ul>
          <Button variant="ghost" className="w-full justify-between">
            Learn More
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </section>
  )
}
