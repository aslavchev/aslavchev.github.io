"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Linkedin, Github, MessageCircle, Clock } from "lucide-react"
import { useState, useEffect } from "react"
import { personalInfo, socialLinks } from "@/lib/data"

export function ContactSection() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeString = now.toLocaleTimeString("en-US", {
        timeZone: "Europe/Sofia",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      setTime(timeString)

      // Announce time updates to screen readers (only on the hour)
      if (now.getMinutes() === 0) {
        const announcements = document.getElementById('a11y-announcements')
        if (announcements) {
          announcements.textContent = `Current time in Sofia: ${timeString}`
        }
      }
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  const githubUrl = socialLinks.find((link) => link.name === "GitHub")?.url || "https://github.com/aslavchev"
  const linkedinUrl =
    socialLinks.find((link) => link.name === "LinkedIn")?.url || "https://www.linkedin.com/in/aslavchev/"

  return (
    <section id="contact" className="space-y-8 pb-16" aria-labelledby="contact-heading">
      <div>
        <h2 id="contact-heading" className="text-3xl lg:text-4xl font-bold tracking-tight mb-2">Let's Connect</h2>
        <p className="text-base lg:text-lg text-muted-foreground/80">
          Open to QA leadership roles, consulting projects, and strategic testing initiatives
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status Card */}
        <Card className="bg-gradient-to-br from-primary/10 via-background to-accent/10 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-primary" />
              Current Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-4xl font-bold text-primary mb-2" role="timer" aria-live="off" aria-label={`Current time in Sofia: ${time}`}>{time}</p>
              <p className="text-sm text-muted-foreground">Sofia, Bulgaria (EET/EEST)</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium">Available for new opportunities</span>
              </div>
              <p className="text-xs text-foreground/70">Remote • Hybrid • On-site</p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Methods Card */}
        <Card>
          <CardHeader>
            <CardTitle>Get in Touch</CardTitle>
            <CardDescription>Reach out through your preferred channel</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="default" className="w-full justify-start font-semibold" asChild>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect with Alex Slavchev on LinkedIn (opens in new tab)"
              >
                <Linkedin className="h-4 w-4 mr-3" aria-hidden="true" />
                Connect on LinkedIn
              </a>
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Alex Slavchev's GitHub profile (opens in new tab)"
              >
                <Github className="h-4 w-4 mr-3" aria-hidden="true" />
                View GitHub Profile
              </a>
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
              <a
                href="https://wa.me/359886449904?text=Hi%20Alex%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20QA%20opportunity."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Send WhatsApp message to Alex Slavchev (opens in new tab)"
              >
                <MessageCircle className="h-4 w-4 mr-3" aria-hidden="true" />
                WhatsApp Message
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Footer Index */}
      <Card className="mt-12">
        <CardContent className="p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-sm font-semibold mb-3 text-muted-foreground">EXPLORE</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#home" className="hover:text-primary transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#featured" className="hover:text-primary transition-colors">
                    Featured Projects
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3 text-muted-foreground">BACKGROUND</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#experience" className="hover:text-primary transition-colors">
                    Experience
                  </a>
                </li>
                <li>
                  <a href="#education" className="hover:text-primary transition-colors">
                    Education
                  </a>
                </li>
                <li>
                  <a href="#certifications" className="hover:text-primary transition-colors">
                    Certifications
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3 text-muted-foreground">SHOWCASE</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#github" className="hover:text-primary transition-colors">
                    GitHub Activity
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="hover:text-primary transition-colors">
                    Testimonials
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3 text-muted-foreground">CONNECT</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#contact" className="hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 {personalInfo.name}. Built with Next.js and shadcn/ui.</p>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
