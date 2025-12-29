"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import { personalInfo } from "@/lib/portfolio-data"
import { content } from "@/lib/content"

export function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="pt-8">
      <div className="space-y-6">
        <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
          {content.hero.availability}
        </div>

        <h1 className="text-5xl lg:text-7xl font-bold text-balance">
          {content.hero.greeting} <span className="text-primary">{personalInfo.name}</span>.
        </h1>

        <p className="text-2xl lg:text-3xl text-muted-foreground text-balance">{personalInfo.tagline}</p>

        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">{personalInfo.bio}</p>

        <div className="flex flex-wrap gap-4 pt-4">
          <Button size="lg" onClick={() => scrollToSection("#projects")} aria-label={content.hero.viewProjects}>
            <User className="h-4 w-4 mr-2" />
            {content.hero.viewProjects}
          </Button>
          <Button size="lg" variant="outline" onClick={() => scrollToSection("#contact")} aria-label={content.hero.getInTouch}>
            <Mail className="h-4 w-4 mr-2" />
            {content.hero.getInTouch}
          </Button>
        </div>
      </div>
    </section>
  )
}

function User(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
