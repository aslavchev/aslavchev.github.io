import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { ScrollProgress } from "@/components/scroll-progress"
import { ErrorBoundary } from "@/components/error-boundary"
import { features } from "@/lib/features"
import "./blog-styles.css"

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ErrorBoundary>
      <ScrollProgress />
      <div className="flex min-h-screen bg-background">
        {features.showMobileNav && <MobileNav />}

        {/* Fixed Left Sidebar - Hidden on mobile */}
        {features.showSidebar && <Sidebar />}

        {/* Main Content Area - Matches portfolio spacing */}
        <main id="main-content" className="flex-1 ml-0 lg:ml-80 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-20">
            {children}
          </div>
        </main>
      </div>
    </ErrorBoundary>
  )
}
