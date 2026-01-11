"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getAssetPath } from "@/lib/asset-path"
import { Menu, MoonIcon, SunIcon } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { navigationConfig } from "@/lib/navigation"
import { personalInfo } from "@/lib/data"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [activeSection, setActiveSection] = useState("#home")

  // Handle scroll position tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["#home", "#featured", "#experience", "#education", "#stack", "#contact"]
      const scrollPosition = window.scrollY + 150

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

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle hash scrolling after route changes
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    }
  }, [router])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isExternal?: boolean) => {
    const hash = href.startsWith("/#") ? href.substring(1) : href.startsWith("#") ? href : null

    if (!isExternal && hash) {
      e.preventDefault()
      setOpen(false)

      // Just navigate - useEffect will handle scrolling
      router.push(href)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="mobile-nav-trigger lg:hidden fixed top-4 left-4 z-50 bg-background/80 backdrop-blur-sm"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 overflow-y-auto p-6">
        <SheetHeader className="mb-8">
          <SheetTitle className="text-left">Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Portfolio navigation menu
          </SheetDescription>
        </SheetHeader>

        {/* Profile Section */}
        <div className="mb-8">
          <Link
            href="/#home"
            onClick={(e) => handleNavClick(e, "/#home")}
            className="flex items-center gap-4 mb-4 cursor-pointer hover:opacity-80 transition-opacity rounded-lg p-2 -m-2"
            aria-label="Return to home"
          >
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={getAssetPath("/professional-headshot.webp")}
                alt={`${personalInfo.name} - ${personalInfo.title}`}
              />
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold text-lg">{personalInfo.name}</h2>
              <p className="text-sm text-foreground/70">{personalInfo.title}</p>
            </div>
          </Link>

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

        {/* Navigation */}
        <nav>
          <ul className="space-y-1">
            {navigationConfig.map((item) => {
              const isActive = !item.external && item.href === activeSection
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href, item.external)}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors min-h-[44px] ${
                      isActive
                        ? "bg-primary/10 text-primary font-bold"
                        : "text-foreground/80 hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
