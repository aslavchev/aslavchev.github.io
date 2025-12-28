"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Menu,
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
  MoonIcon,
  SunIcon,
} from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"

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

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isExternal?: boolean) => {
    if (!isExternal && href.startsWith("#")) {
      e.preventDefault()
      setOpen(false) // Close drawer
      setTimeout(() => {
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden fixed top-4 left-4 z-50 bg-background/80 backdrop-blur-sm"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        </SheetHeader>

        {/* Profile Section */}
        <div className="mb-6 mt-2">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Alex Rivera" />
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold text-lg">Alex Rivera</h2>
              <p className="text-sm text-muted-foreground">Senior QA Engineer</p>
            </div>
          </div>

          {/* Theme Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-full"
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
        </div>

        {/* Navigation Sections */}
        <nav className="space-y-6">
          {navigationSections.map((section) => (
            <div key={section.category}>
              <h3 className="text-xs font-semibold text-muted-foreground mb-3 tracking-wider">{section.category}</h3>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href, item.external)}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-foreground/80 hover:bg-muted hover:text-foreground transition-colors"
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
      </SheetContent>
    </Sheet>
  )
}
