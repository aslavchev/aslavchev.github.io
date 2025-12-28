"use client"

import { lazy, Suspense } from "react"
import { ErrorBoundary } from "@/components/error-boundary"
import { SectionLoadingSkeleton, ChartLoadingSkeleton } from "@/components/loading-skeleton"
import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { HeroSection } from "@/components/sections/hero-section"
import { FeaturedProjects } from "@/components/sections/featured-projects"

const QAMetricsDashboard = lazy(() =>
  import("@/components/sections/qa-metrics-dashboard").then((mod) => ({ default: mod.QAMetricsDashboard })),
)
const TestingToolsSection = lazy(() =>
  import("@/components/sections/testing-tools-section").then((mod) => ({ default: mod.TestingToolsSection })),
)
const LiveQualityDemo = lazy(() =>
  import("@/components/sections/live-quality-demo").then((mod) => ({ default: mod.LiveQualityDemo })),
)
const TestStrategyShowcase = lazy(() =>
  import("@/components/sections/test-strategy-showcase").then((mod) => ({ default: mod.TestStrategyShowcase })),
)
const ThoughtsSection = lazy(() =>
  import("@/components/sections/thoughts-section").then((mod) => ({ default: mod.ThoughtsSection })),
)
const NewsletterSection = lazy(() =>
  import("@/components/sections/newsletter-section").then((mod) => ({ default: mod.NewsletterSection })),
)
const FeedAndServices = lazy(() =>
  import("@/components/sections/feed-and-services").then((mod) => ({ default: mod.FeedAndServices })),
)
const StackSection = lazy(() =>
  import("@/components/sections/stack-section").then((mod) => ({ default: mod.StackSection })),
)
const ProjectsSection = lazy(() =>
  import("@/components/sections/projects-section").then((mod) => ({ default: mod.ProjectsSection })),
)
const ExperienceSection = lazy(() =>
  import("@/components/sections/experience-section").then((mod) => ({ default: mod.ExperienceSection })),
)
const ContactSection = lazy(() =>
  import("@/components/sections/contact-section").then((mod) => ({ default: mod.ContactSection })),
)
const Chatbot = lazy(() => import("@/components/chatbot").then((mod) => ({ default: mod.Chatbot })))

export default function Home() {
  return (
    <ErrorBoundary>
      <div className="flex min-h-screen bg-background">
        <MobileNav />

        {/* Fixed Left Sidebar - Hidden on mobile */}
        <Sidebar />

        {/* Main Content Area */}
        <main id="main-content" className="flex-1 ml-0 lg:ml-80 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12 space-y-16 sm:space-y-24">
            <ErrorBoundary>
              <HeroSection />
            </ErrorBoundary>

            <ErrorBoundary>
              <FeaturedProjects />
            </ErrorBoundary>

            <ErrorBoundary>
              <Suspense fallback={<ChartLoadingSkeleton />}>
                <QAMetricsDashboard />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary>
              <Suspense fallback={<SectionLoadingSkeleton />}>
                <TestingToolsSection />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary>
              <Suspense fallback={<SectionLoadingSkeleton />}>
                <LiveQualityDemo />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary>
              <Suspense fallback={<SectionLoadingSkeleton />}>
                <TestStrategyShowcase />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary>
              <Suspense fallback={<SectionLoadingSkeleton />}>
                <ThoughtsSection />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary>
              <Suspense fallback={<SectionLoadingSkeleton />}>
                <NewsletterSection />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary>
              <Suspense fallback={<SectionLoadingSkeleton />}>
                <FeedAndServices />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary>
              <Suspense fallback={<SectionLoadingSkeleton />}>
                <StackSection />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary>
              <Suspense fallback={<SectionLoadingSkeleton />}>
                <ProjectsSection />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary>
              <Suspense fallback={<SectionLoadingSkeleton />}>
                <ExperienceSection />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary>
              <Suspense fallback={<SectionLoadingSkeleton />}>
                <ContactSection />
              </Suspense>
            </ErrorBoundary>
          </div>
        </main>

        <ErrorBoundary>
          <Suspense fallback={null}>
            <Chatbot />
          </Suspense>
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  )
}
