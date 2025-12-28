export interface NavigationItem {
  icon: any
  label: string
  href: string
  external?: boolean
}

export interface NavigationSection {
  category: string
  items: NavigationItem[]
}

export interface TestingTool {
  name: string
  proficiency: number
  experience: string
}

export interface TestingCategory {
  category: string
  icon: any
  description: string
  tools: TestingTool[]
}

export interface QualityMetric {
  title: string
  score: number
  icon: any
  color: string
  description: string
  details: string[]
}

export interface CoreWebVital {
  name: string
  value: string
  target: string
  status: string
}
