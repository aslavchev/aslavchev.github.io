/**
 * Shared Navigation Configuration
 * Single source of truth for navigation - used by both Sidebar and MobileNav
 * Simple, flat structure - no unnecessary hierarchy
 */

import {
  Home,
  Briefcase,
  User,
  GraduationCap,
  Wrench,
  MessageSquareQuote,
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

// Get real social link URLs from data
const githubUrl = socialLinks.find((link) => link.name === "GitHub")?.url || "https://github.com/aslavchev"
const linkedinUrl =
  socialLinks.find((link) => link.name === "LinkedIn")?.url || "https://www.linkedin.com/in/aslavchev/"

export const navigationConfig: NavigationItem[] = [
  { icon: Home, label: "Home", href: "#home" },
  { icon: Briefcase, label: "Featured Projects", href: "#featured" },
  { icon: User, label: "Experience", href: "#experience" },
  { icon: GraduationCap, label: "Education", href: "#education" },
  { icon: Wrench, label: "Stack", href: "#stack" },
  { icon: MessageSquareQuote, label: "Testimonials", href: "#testimonials" },
  { icon: Mail, label: "Contact", href: "#contact" },
  { icon: Linkedin, label: "LinkedIn", href: linkedinUrl, external: true },
  { icon: Github, label: "GitHub", href: githubUrl, external: true },
]
