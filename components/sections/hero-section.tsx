"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Mail, Briefcase, Download } from "lucide-react"
import { personalInfo } from "@/lib/data"
import { content } from "@/lib/content"
import { getAssetPath } from "@/lib/asset-path"

export function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="pt-4 lg:pt-8" aria-label="Introduction">
      <div className="grid grid-cols-1 lg:grid-cols-[auto,1fr] gap-8 lg:gap-12 items-start">
        {/* Headshot - Left Column on Desktop */}
        <div className="flex justify-center lg:justify-start">
          <Avatar className="h-48 w-48 lg:h-64 lg:w-64 ring-4 ring-primary/10 ring-offset-4 ring-offset-background">
            <AvatarImage
              src={getAssetPath("/professional-headshot.webp")}
              alt={`${personalInfo.name} - ${personalInfo.title}`}
              className="object-cover"
            />
            <AvatarFallback className="text-4xl lg:text-5xl">AS</AvatarFallback>
          </Avatar>
        </div>

        {/* Content - Right Column on Desktop */}
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-balance leading-[1.15] pb-1">
              {content.hero.greeting}{" "}
              <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                {personalInfo.name}
              </span>
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
            onClick={() => scrollToSection("#featured")}
            aria-label="View featured projects"
            className="font-medium shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 transition-all"
          >
            <Briefcase className="h-4 w-4 mr-2" aria-hidden="true" />
            {content.hero.viewProjects}
          </Button>
          <Button
            size="lg"
            variant="secondary"
            asChild
            className="font-medium shadow-md hover:shadow-lg transition-all"
          >
            <a
              href={getAssetPath("/Alex_Slavchev_CV.pdf")}
              download="Alex_Slavchev_CV.pdf"
              aria-label="Download Alex Slavchev Resume PDF"
            >
              <Download className="h-4 w-4 mr-2" aria-hidden="true" />
              Download Resume
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection("#contact")}
            aria-label="Scroll to contact section"
            className="font-medium border-border/50 hover:border-border hover:bg-muted/50 transition-all"
          >
            <Mail className="h-4 w-4 mr-2" aria-hidden="true" />
            {content.hero.getInTouch}
          </Button>
        </div>
        </div>
      </div>
    </section>
  )
}
