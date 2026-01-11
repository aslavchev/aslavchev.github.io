"use client"

import { useRef, useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { testimonials } from "@/lib/data/testimonials"
import { Quote, LinkedinIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const getCardWidth = () => {
    // 340px on mobile (<640px), 380px on desktop
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640
    return (isMobile ? 340 : 380) + 24 // card width + gap
  }

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return

      const scrollLeft = scrollRef.current.scrollLeft
      const cardWidth = getCardWidth()
      const index = Math.round(scrollLeft / cardWidth)
      setActiveIndex(index)
    }

    const scrollContainer = scrollRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll)
      return () => scrollContainer.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTestimonial = (index: number) => {
    if (!scrollRef.current) return
    const cardWidth = getCardWidth()
    scrollRef.current.scrollTo({
      left: cardWidth * index,
      behavior: 'smooth'
    })
  }

  const scrollNext = () => {
    const nextIndex = (activeIndex + 1) % testimonials.length
    scrollToTestimonial(nextIndex)
  }

  const scrollPrev = () => {
    const prevIndex = (activeIndex - 1 + testimonials.length) % testimonials.length
    scrollToTestimonial(prevIndex)
  }

  return (
    <section id="testimonials" className="space-y-8">
      {/* Section Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 bg-primary rounded-full" />
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">What People Say</h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Testimonials from managers, colleagues, and team members I've worked with
        </p>
      </div>

      {/* Testimonials Horizontal Scroll */}
      <div className="relative -mx-6 sm:-mx-8 lg:-mx-16 group">
        {/* Navigation Arrows */}
        <Button
          variant="outline"
          size="icon"
          onClick={scrollPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 sm:opacity-100 transition-opacity shadow-lg"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={scrollNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 sm:opacity-100 transition-opacity shadow-lg"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>

        <div
          ref={scrollRef}
          className="overflow-x-auto px-6 sm:px-8 lg:px-16 pb-4 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent snap-x snap-mandatory"
        >
          <div className="flex gap-6 min-w-max">
            {testimonials.map((testimonial) => {
              const initials = testimonial.name
                .split(" ")
                .map((n) => n[0])
                .join("")

              return (
                <Card key={testimonial.id} className="relative overflow-hidden hover:shadow-lg transition-shadow w-[340px] sm:w-[380px] flex-shrink-0 snap-start">
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 opacity-10">
                <Quote className="h-16 w-16 text-primary" />
              </div>

              <CardContent className="p-6 space-y-4">
                {/* Header with Avatar and Info */}
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12 border-2 border-primary/10">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground truncate">{testimonial.name}</h3>
                      {testimonial.linkedinUrl && (
                        <a
                          href={testimonial.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label={`${testimonial.name}'s LinkedIn profile`}
                        >
                          <LinkedinIcon className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                  </div>
                </div>

                {/* Testimonial Content */}
                <blockquote className="text-sm text-foreground/90 leading-relaxed relative">
                  <span className="text-primary font-serif text-2xl absolute -left-1 -top-2">"</span>
                  <span className="block pl-4">{testimonial.content}</span>
                </blockquote>

                {/* Relationship Badge */}
                <div className="pt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize">
                    {testimonial.relationship.replace("-", " ")}
                  </span>
                </div>
              </CardContent>
            </Card>
              )
            })}
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      {testimonials.length > 1 && (
        <div className="flex justify-center gap-2 pt-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToTestimonial(index)}
              className={`h-2 rounded-full transition-all ${
                activeIndex === index
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-primary/20 hover:bg-primary/40'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* LinkedIn CTA */}
      <div className="text-center pt-4">
        <p className="text-sm text-muted-foreground mb-4">
          Want to add your testimonial or see more recommendations?
        </p>
        <Button variant="outline" size="lg" asChild>
          <a
            href="https://www.linkedin.com/in/aslavchev/"
            target="_blank"
            rel="noopener noreferrer"
            className="gap-2"
          >
            <LinkedinIcon className="h-4 w-4" />
            View LinkedIn Recommendations
          </a>
        </Button>
      </div>
    </section>
  )
}
