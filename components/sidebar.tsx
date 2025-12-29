"use client"

import type React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getAssetPath } from "@/lib/asset-path"
import {
  MoonIcon,
  SunIcon,
  Search,
  Home,
  Briefcase,
  FileText,
  User,
  Rss,
  MessageSquare,
  Wrench,
  Mail,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import Link from "next/link"

const navigationSections = [
  {
    category: "EXPLORE",
    items: [{ icon: Home, label: "Home", href: "#home" }],
  },
  {
    category: "PROJECTS",
    items: [
      { icon: Briefcase, label: "Projects", href: "#projects" },
      { icon: FileText, label: "Case Studies", href: "#projects" },
    ],
  },
  {
    category: "SERVICES",
    items: [{ icon: Briefcase, label: "Experience", href: "#experience" }],
  },
  {
    category: "ABOUT",
    items: [{ icon: User, label: "About", href: "#home" }],
  },
  {
    category: "RESOURCES",
    items: [
      { icon: Rss, label: "Insights", href: "#insights" },
      { icon: MessageSquare, label: "Thoughts", href: "#insights" },
      { icon: Wrench, label: "Stack", href: "#stack" },
    ],
  },
  {
    category: "CONNECT",
    items: [
      { icon: Mail, label: "Contact", href: "#contact" },
      { icon: Twitter, label: "Twitter", href: "https://twitter.com", external: true },
      { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com", external: true },
      { icon: Github, label: "GitHub", href: "https://github.com", external: true },
    ],
  },
]

export function Sidebar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-80 bg-card border-r border-border overflow-y-auto hidden lg:flex flex-col">
      {/* Profile Section */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={getAssetPath("/professional-headshot.png")} alt="Alex Rivera - Senior QA Engineer" />
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-lg">Alex Rivera</h2>
            <p className="text-sm text-muted-foreground">Senior QA Engineer</p>
          </div>
        </div>

        {/* Theme Toggle */}
        {mounted && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-full"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <>
                <SunIcon className="h-4 w-4 mr-2" />
                Light Mode
              </>
            ) : (
              <>
                <MoonIcon className="h-4 w-4 mr-2" />
                Dark Mode
              </>
            )}
          </Button>
        )}
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 p-6 space-y-6" aria-label="Main navigation">
        {navigationSections.map((section) => (
          <div key={section.category}>
            <h3 className="text-xs font-semibold text-muted-foreground mb-3 tracking-wider">{section.category}</h3>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={(e) => !item.external && handleNavClick(e, item.href)}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-foreground/80 hover:bg-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Search Bar */}
      <div className="p-6 border-t border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="portfolio-search"
            name="search"
            type="search"
            placeholder="Search..."
            className="pl-9"
            aria-label="Search portfolio"
          />
        </div>
      </div>
    </aside>
  )
}
