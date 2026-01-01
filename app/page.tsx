"use client"

import { lazy, Suspense } from "react"
import { ErrorBoundary } from "@/components/error-boundary"
import { SectionLoadingSkeleton, ChartLoadingSkeleton } from "@/components/loading-skeleton"
import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { ScrollProgress } from "@/components/scroll-progress"
import { HeroSection } from "@/components/sections/hero-section"
import { FeaturedProjects } from "@/components/sections/featured-projects"
import { features } from "@/lib/features"

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
const CertificationsSection = lazy(() =>
  import("@/components/sections/certifications-section").then((mod) => ({ default: mod.CertificationsSection })),
)
const GitHubSection = lazy(() =>
  import("@/components/sections/github-section").then((mod) => ({ default: mod.GitHubSection })),
)
const TestimonialsSection = lazy(() =>
  import("@/components/sections/testimonials-section").then((mod) => ({ default: mod.TestimonialsSection })),
)
const ProjectsSection = lazy(() =>
  import("@/components/sections/projects-section").then((mod) => ({ default: mod.ProjectsSection })),
)
const ExperienceSection = lazy(() =>
  import("@/components/sections/experience-section").then((mod) => ({ default: mod.ExperienceSection })),
)
const EducationSection = lazy(() =>
  import("@/components/sections/education-section").then((mod) => ({ default: mod.EducationSection })),
)
const ContactSection = lazy(() =>
  import("@/components/sections/contact-section").then((mod) => ({ default: mod.ContactSection })),
)

export default function Home() {
  return (
    <ErrorBoundary>
      <ScrollProgress />
      <div className="flex min-h-screen bg-background">
        {features.showMobileNav && <MobileNav />}

        {/* Fixed Left Sidebar - Hidden on mobile */}
        {features.showSidebar && <Sidebar />}

        {/* Main Content Area - Dashfolio NEO spacing */}
        <main id="main-content" className="flex-1 ml-0 lg:ml-80 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-20 space-y-20 sm:space-y-28 lg:space-y-32">
            {features.showHero && (
              <ErrorBoundary>
                <HeroSection />
              </ErrorBoundary>
            )}

            {features.showFeaturedProjects && (
              <ErrorBoundary>
                <FeaturedProjects />
              </ErrorBoundary>
            )}

            {features.showProjects && (
              <ErrorBoundary>
                <Suspense fallback={<SectionLoadingSkeleton />}>
                  <ProjectsSection />
                </Suspense>
              </ErrorBoundary>
            )}

            {features.showExperience && (
              <ErrorBoundary>
                <Suspense fallback={<SectionLoadingSkeleton />}>
                  <ExperienceSection />
                </Suspense>
              </ErrorBoundary>
            )}

            {features.showEducation && (
              <ErrorBoundary>
                <Suspense fallback={<SectionLoadingSkeleton />}>
                  <EducationSection />
                </Suspense>
              </ErrorBoundary>
            )}

            {features.showStack && (
              <ErrorBoundary>
                <Suspense fallback={<SectionLoadingSkeleton />}>
                  <StackSection />
                </Suspense>
              </ErrorBoundary>
            )}

            {features.showCertifications && (
              <ErrorBoundary>
                <Suspense fallback={<SectionLoadingSkeleton />}>
                  <CertificationsSection />
                </Suspense>
              </ErrorBoundary>
            )}

            {features.showGitHub && (
              <ErrorBoundary>
                <Suspense fallback={<SectionLoadingSkeleton />}>
                  <GitHubSection />
                </Suspense>
              </ErrorBoundary>
            )}

            {features.showTestimonials && (
              <ErrorBoundary>
                <Suspense fallback={<SectionLoadingSkeleton />}>
                  <TestimonialsSection />
                </Suspense>
              </ErrorBoundary>
            )}

            {features.showQAMetrics && (
              <ErrorBoundary>
                <Suspense fallback={<ChartLoadingSkeleton />}>
                  <QAMetricsDashboard />
                </Suspense>
              </ErrorBoundary>
            )}

            {features.showTestingTools && (
              <ErrorBoundary>
                <Suspense fallback={<SectionLoadingSkeleton />}>
                  <TestingToolsSection />
                </Suspense>
              </ErrorBoundary>
            )}

            {features.showLiveQualityDemo && (
              <ErrorBoundary>
                <Suspense fallback={<SectionLoadingSkeleton />}>
                  <LiveQualityDemo />
                </Suspense>
              </ErrorBoundary>
            )}

            {features.showTestStrategy && (
              <ErrorBoundary>
                <Suspense fallback={<SectionLoadingSkeleton />}>
                  <TestStrategyShowcase />
                </Suspense>
              </ErrorBoundary>
            )}

            {features.showThoughts && (
              <ErrorBoundary>
                <Suspense fallback={<SectionLoadingSkeleton />}>
                  <ThoughtsSection />
                </Suspense>
              </ErrorBoundary>
            )}

            {features.showNewsletter && (
              <ErrorBoundary>
                <Suspense fallback={<SectionLoadingSkeleton />}>
                  <NewsletterSection />
                </Suspense>
              </ErrorBoundary>
            )}

            {features.showFeedAndServices && (
              <ErrorBoundary>
                <Suspense fallback={<SectionLoadingSkeleton />}>
                  <FeedAndServices />
                </Suspense>
              </ErrorBoundary>
            )}

            {features.showContact && (
              <ErrorBoundary>
                <Suspense fallback={<SectionLoadingSkeleton />}>
                  <ContactSection />
                </Suspense>
              </ErrorBoundary>
            )}
          </div>
        </main>
      </div>
    </ErrorBoundary>
  )
}
