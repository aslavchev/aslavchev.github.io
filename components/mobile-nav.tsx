"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getAssetPath } from "@/lib/asset-path"
import { Menu, MoonIcon, SunIcon } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { navigationConfig } from "@/lib/navigation"
import { personalInfo } from "@/lib/data"

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
      <SheetContent side="left" className="w-80 overflow-y-auto p-6" aria-describedby="mobile-menu-description">
        <SheetHeader className="mb-8">
          <SheetTitle className="text-left">Menu</SheetTitle>
          <p id="mobile-menu-description" className="sr-only">
            Portfolio navigation menu
          </p>
        </SheetHeader>

        {/* Profile Section */}
        <div className="mb-8">
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
              <p className="text-sm text-foreground/70">{personalInfo.title}</p>
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
        <nav className="space-y-7">
          {navigationConfig.map((section) => (
            <div key={section.category}>
              <h3 className="text-xs font-bold text-foreground/60 mb-3 tracking-wider uppercase px-3">
                {section.category}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href, item.external)}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-foreground/80 hover:bg-muted hover:text-foreground transition-colors min-h-[44px]"
                    >
                      <item.icon className="h-5 w-5" />
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
