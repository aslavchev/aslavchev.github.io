"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Mail, Briefcase } from "lucide-react"
import { personalInfo } from "@/lib/data"
import { content } from "@/lib/content"

export function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="pt-4 lg:pt-8">
      <div className="space-y-8 lg:space-y-10">
        {/* Availability badge - refined */}
        <div className="inline-flex items-center px-4 py-2 bg-primary/8 text-primary rounded-full text-sm font-medium border border-primary/10">
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          {content.hero.availability}
        </div>

        {/* Main heading - refined hierarchy */}
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-balance leading-tight">
            {content.hero.greeting}{" "}
            <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
              {personalInfo.name}
            </span>
            .
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground/80 text-balance font-medium tracking-tight leading-snug">
            {personalInfo.tagline}
          </p>
        </div>

        {/* Bio text - better readability */}
        <p className="text-base sm:text-lg text-foreground/75 max-w-2xl leading-relaxed">
          {personalInfo.bio}
        </p>

        {/* CTAs - refined styling */}
        <div className="flex flex-wrap gap-3 pt-6">
          <Button
            size="lg"
            onClick={() => scrollToSection("#projects")}
            aria-label={content.hero.viewProjects}
            className="font-medium shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 transition-all"
          >
            <Briefcase className="h-4 w-4 mr-2" />
            {content.hero.viewProjects}
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection("#contact")}
            aria-label={content.hero.getInTouch}
            className="font-medium border-border/50 hover:border-border hover:bg-muted/50 transition-all"
          >
            <Mail className="h-4 w-4 mr-2" />
            {content.hero.getInTouch}
          </Button>
        </div>
      </div>
    </section>
  )
}
