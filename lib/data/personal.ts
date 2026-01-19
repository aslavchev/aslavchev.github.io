import type { SocialLink } from "./types"

export const personalInfo = {
  name: "Alex Slavchev",
  title: "Software Engineer in Test",
  tagline: "When It Matters, No Bug Walks Alone",
  email: "sandixx@gmail.com",
  phone: "+359884123456", // WhatsApp-enabled number (replace with your actual number)
  location: "Sofia, Bulgaria",
  yearsOfExperience: "18+",
  bio: "Software Engineer in Test who thinks backwards—finding what breaks before users do. Specializing in test automation, quality engineering, and quality at scale.",
}

export const socialLinks: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/aslavchev", icon: "github" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/aslavchev/", icon: "linkedin" },
]
