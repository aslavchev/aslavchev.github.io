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
      <nav className="flex-1 p-6 space-y-6" aria-label="Main navigation">
        {navigationConfig.map((section) => (
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
    </aside>
  )
}
