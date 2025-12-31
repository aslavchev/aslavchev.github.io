"use client"

import type React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { getAssetPath } from "@/lib/asset-path"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import Link from "next/link"
import { navigationConfig } from "@/lib/navigation"
import { personalInfo } from "@/lib/data"

export function Sidebar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("#home")

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["#home", "#featured", "#experience", "#education", "#stack", "#contact"]
      const scrollPosition = window.scrollY + 150 // Offset for better detection

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.querySelector(sections[i])
        if (section) {
          const sectionTop = (section as HTMLElement).offsetTop
          if (scrollPosition >= sectionTop) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }

    handleScroll() // Initial check
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
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
            <AvatarImage
              src={getAssetPath("/professional-headshot.png")}
              alt={`${personalInfo.name} - ${personalInfo.title}`}
            />
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-lg">{personalInfo.name}</h2>
            <p className="text-sm text-muted-foreground">{personalInfo.title}</p>
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
      <nav className="flex-1 p-6 space-y-8" aria-label="Main navigation">
        {navigationConfig.map((section, idx) => (
          <div key={section.category} className={idx > 0 ? "pt-2" : ""}>
            <h3 className="text-[10px] font-bold text-muted-foreground/60 mb-4 tracking-widest uppercase px-3">
              {section.category}
            </h3>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = !item.external && item.href === activeSection
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={(e) => !item.external && handleNavClick(e, item.href)}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        isActive
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-foreground/80 hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
