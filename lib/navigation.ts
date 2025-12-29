/**
 * Shared Navigation Configuration
 * Single source of truth for navigation - used by both Sidebar and MobileNav
 */

import {
  Home,
  Briefcase,
  User,
  Wrench,
  Mail,
  Github,
  Linkedin,
  type LucideIcon,
} from "lucide-react"
import { socialLinks } from "@/lib/data"

export interface NavigationItem {
  icon: LucideIcon
  label: string
  href: string
  external?: boolean
}

export interface NavigationSection {
  category: string
  items: NavigationItem[]
}

// Get real social link URLs from data
const githubUrl = socialLinks.find((link) => link.name === "GitHub")?.url || "https://github.com/aslavchev"
const linkedinUrl =
  socialLinks.find((link) => link.name === "LinkedIn")?.url || "https://www.linkedin.com/in/aslavchev/"

export const navigationConfig: NavigationSection[] = [
  {
    category: "EXPLORE",
    items: [{ icon: Home, label: "Home", href: "#home" }],
  },
  {
    category: "PROJECTS",
    items: [{ icon: Briefcase, label: "Projects", href: "#projects" }],
  },
  {
    category: "ABOUT",
    items: [
      { icon: User, label: "Experience", href: "#experience" },
      { icon: Wrench, label: "Stack", href: "#stack" },
    ],
  },
  {
    category: "CONNECT",
    items: [
      { icon: Mail, label: "Contact", href: "#contact" },
      { icon: Github, label: "GitHub", href: githubUrl, external: true },
      { icon: Linkedin, label: "LinkedIn", href: linkedinUrl, external: true },
    ],
  },
]
