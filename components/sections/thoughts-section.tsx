import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"

const articles = [
  {
    title: "Exploratory Testing Heuristics",
    description: "A comprehensive guide to structured exploratory testing techniques",
    category: "Testing",
    date: "Dec 2024",
    readTime: "8 min",
  },
  {
    title: "Building Robust Automation Frameworks",
    description: "Best practices for maintainable and scalable test automation",
    category: "Automation",
    date: "Nov 2024",
    readTime: "12 min",
  },
  {
    title: "Quality Metrics That Actually Matter",
    description: "Moving beyond vanity metrics to track real quality indicators",
    category: "Career",
    date: "Nov 2024",
    readTime: "6 min",
  },
  {
    title: "Shift-Left Testing in Practice",
    description: "How to integrate quality earlier in the development lifecycle",
    category: "Testing",
    date: "Oct 2024",
    readTime: "10 min",
  },
]

export function ThoughtsSection() {
  return (
    <section id="insights" className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Thoughts & Insights</h2>
        <p className="text-muted-foreground mt-2">Articles about testing, automation, and quality engineering</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article, index) => (
          <Card
            key={index}
            className="group hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 cursor-pointer"
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-4 mb-2">
                <Badge variant="outline">{article.category}</Badge>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{article.date}</span>
                  <span>·</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
              <CardTitle className="group-hover:text-primary transition-colors">{article.title}</CardTitle>
              <CardDescription className="mt-2">{article.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}
