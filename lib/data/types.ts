export interface Project {
  title: string
  description: string
  image: string
  metrics?: string[]
  metric?: string
  badge?: string
  tools?: string[]
  githubUrl?: string
  liveUrl?: string
}

export interface Experience {
  title: string
  company: string
  period: string
  description: string
  achievements: string[]
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
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}
