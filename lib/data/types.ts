export interface Project {
  title: string
  description: string
  image: string
  metrics?: string[]
  metric?: string
  badge?: string
  tools?: string[]
  industries?: string[]
  githubUrl?: string
  liveUrl?: string
}

export interface Experience {
  title: string
  company: string
  companyLogo?: string
  period: string
  description: string
  achievements: string[]
  projects?: string[]
}

export interface Skill {
  category: string
  description: string
  skills: string[]
  proficiency: number
}

export interface Education {
  degree: string
  school: string
  period: string
  description: string
  type?: "degree" | "certification" | "training" | "international" | "professional"
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}
