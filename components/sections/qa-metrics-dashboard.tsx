"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { TrendingUp, Bug, CheckCircle2, Clock } from "lucide-react"

const coverageData = [
  { month: "Jan", coverage: 65, defects: 45 },
  { month: "Feb", coverage: 72, defects: 38 },
  { month: "Mar", coverage: 78, defects: 32 },
  { month: "Apr", coverage: 82, defects: 25 },
  { month: "May", coverage: 88, defects: 18 },
  { month: "Jun", coverage: 92, defects: 12 },
]

const performanceData = [
  { test: "Login", baseline: 1200, current: 450 },
  { test: "Search", baseline: 800, current: 320 },
  { test: "Checkout", baseline: 2500, current: 980 },
  { test: "API Load", baseline: 500, current: 180 },
]

const releaseQualityData = [
  { version: "v1.0", preReleaseBugs: 85, postReleaseBugs: 12 },
  { version: "v1.5", preReleaseBugs: 92, postReleaseBugs: 8 },
  { version: "v2.0", preReleaseBugs: 105, postReleaseBugs: 5 },
  { version: "v2.5", preReleaseBugs: 118, postReleaseBugs: 3 },
]

const keyMetrics = [
  {
    title: "Test Coverage",
    value: "92%",
    change: "+27% from last quarter",
    icon: CheckCircle2,
    color: "text-green-500",
  },
  {
    title: "Defect Detection Rate",
    value: "95.8%",
    change: "Pre-production catch rate",
    icon: Bug,
    color: "text-orange-500",
  },
  {
    title: "Avg. Test Execution Time",
    value: "12 min",
    change: "-70% reduction",
    icon: Clock,
    color: "text-blue-500",
  },
  {
    title: "Release Velocity",
    value: "3x Faster",
    change: "From bi-weekly to daily",
    icon: TrendingUp,
    color: "text-purple-500",
  },
]

export function QAMetricsDashboard() {
  return (
    <section id="metrics" className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Quality Engineering Impact</h2>
        <p className="text-muted-foreground mt-2">Data-driven results and measurable improvements</p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className={`h-5 w-5 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{metric.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Interactive Charts */}
      <Tabs defaultValue="coverage" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="coverage">Test Coverage & Defects</TabsTrigger>
          <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
          <TabsTrigger value="quality">Release Quality</TabsTrigger>
        </TabsList>

        <TabsContent value="coverage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Test Automation Coverage vs Defect Rate</CardTitle>
              <CardDescription>
                Tracking the correlation between automation coverage and defect discovery
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={coverageData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="coverage"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    name="Coverage %"
                  />
                  <Line
                    type="monotone"
                    dataKey="defects"
                    stroke="hsl(var(--destructive))"
                    strokeWidth={2}
                    name="Defects Found"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Testing Results</CardTitle>
              <CardDescription>Response time improvements across key user flows (in milliseconds)</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="test" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="baseline" fill="hsl(var(--muted))" name="Baseline" />
                  <Bar dataKey="current" fill="hsl(var(--primary))" name="Optimized" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Release Quality Improvement</CardTitle>
              <CardDescription>Pre-release vs post-release bug discovery trends</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={releaseQualityData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="version" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="preReleaseBugs" fill="hsl(var(--primary))" name="Pre-Release Bugs" />
                  <Bar dataKey="postReleaseBugs" fill="hsl(var(--destructive))" name="Post-Release Bugs" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  )
}
