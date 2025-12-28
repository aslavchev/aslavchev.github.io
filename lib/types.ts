import type React from "react"

export interface NavigationItem {
  icon: React.ComponentType<{ className?: string }>
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
  icon: React.ComponentType<{ className?: string }>
  description: string
  tools: TestingTool[]
}

export interface QualityMetric {
  title: string
  score: number
  icon: React.ComponentType<{ className?: string }>
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
