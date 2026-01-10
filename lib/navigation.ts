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
  Award,
  Github,
  MessageSquareQuote,
  Mail,
  Linkedin,
  BookOpen,
  type LucideIcon,
} from "lucide-react"
import { socialLinks } from "@/lib/data"
import { features } from "@/lib/features"

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

const allNavigationItems: NavigationItem[] = [
  { icon: Home, label: "Home", href: "/#home" },
  { icon: Briefcase, label: "Featured Projects", href: "/#featured" },
  { icon: User, label: "Experience", href: "/#experience" },
  { icon: GraduationCap, label: "Education", href: "/#education" },
  { icon: Award, label: "Certifications", href: "/#certifications" },
  { icon: Github, label: "GitHub Activity", href: "/#github" },
  { icon: MessageSquareQuote, label: "Testimonials", href: "/#testimonials" },
  { icon: BookOpen, label: "Blog", href: "/blog" }, // Conditional - only shows if features.showBlog is true
  { icon: Mail, label: "Contact", href: "/#contact" },
  { icon: Linkedin, label: "LinkedIn", href: linkedinUrl, external: true },
  { icon: Github, label: "GitHub Profile", href: githubUrl, external: true },
]

// Export navigation with feature flag filtering
export const navigationConfig: NavigationItem[] = allNavigationItems.filter(item => {
  // Filter out blog link if blog feature is disabled
  if (item.label === "Blog" && !features.showBlog) {
    return false
  }
  return true
})
