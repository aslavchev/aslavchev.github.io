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
  MessageSquareQuote,
  Mail,
  BookOpen,
  type LucideIcon,
} from "lucide-react"
import { features } from "@/lib/features"

export interface NavigationItem {
  icon: LucideIcon
  label: string
  href: string
  external?: boolean
}

const allNavigationItems: NavigationItem[] = [
  { icon: Home, label: "Home", href: "/#home" },
  { icon: Briefcase, label: "Featured Projects", href: "/#featured" },
  { icon: User, label: "Experience", href: "/#experience" },
  { icon: GraduationCap, label: "Education", href: "/#education" },
  { icon: Award, label: "Certifications", href: "/#certifications" },
  { icon: MessageSquareQuote, label: "Testimonials", href: "/#testimonials" },
  { icon: BookOpen, label: "Blog", href: "/blog" }, // Conditional - only shows if features.showBlog is true
  { icon: Mail, label: "Contact", href: "/#contact" },
]

// Export navigation with feature flag filtering
export const navigationConfig: NavigationItem[] = allNavigationItems.filter(item => {
  // Filter out blog link if blog feature is disabled
  if (item.label === "Blog" && !features.showBlog) {
    return false
  }
  return true
})
