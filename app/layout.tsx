import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { getAssetPath } from "@/lib/asset-path"
import { getAllStructuredData } from "@/lib/structured-data"
import "./globals.css"
import "./accessibility.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  fallback: ["system-ui", "arial"],
})

const baseUrl = "https://aslavchev.github.io"

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Alex Slavchev – When It Matters, No Bug Walks Alone",
  description:
    "Senior Software Engineer in Test specializing in test automation, quality engineering, and quality at scale. 18+ years of experience delivering flawless software through comprehensive testing strategies.",
  keywords: [
    "Software Engineer in Test",
    "SDET",
    "Test Automation",
    "Quality Engineering",
    "Selenium",
    "Playwright",
    "Cypress",
    "CI/CD",
    "Senior SDET",
    "QA Engineer",
  ],
  authors: [{ name: "Alex Slavchev" }],
  creator: "Alex Slavchev",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aslavchev.github.io/",
    title: "Alex Slavchev – When It Matters, No Bug Walks Alone",
    description:
      "Senior Software Engineer in Test specializing in test automation, quality engineering, and quality at scale. 18+ years of experience.",
    siteName: "Alex Slavchev Portfolio",
    images: [
      {
        url: getAssetPath("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "Alex Slavchev - Senior Software Engineer in Test | Building Quality at Scale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Slavchev – When It Matters, No Bug Walks Alone",
    description: "Senior Software Engineer in Test specializing in test automation, quality engineering, and quality at scale. 18+ years of experience.",
    images: [getAssetPath("/og-image.png")],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: getAssetPath("/icon-light-32x32.png"),
        media: "(prefers-color-scheme: light)",
      },
      {
        url: getAssetPath("/icon-dark-32x32.png"),
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: getAssetPath("/icon.svg"),
        type: "image/svg+xml",
      },
    ],
    apple: getAssetPath("/apple-icon.png"),
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const baseUrl = "https://aslavchev.github.io"
  const structuredData = getAllStructuredData(baseUrl)

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Resource Hints for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://linkedin.com" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <a
          href="#main-content"
          className="skip-link"
          aria-label="Skip to main content"
        >
          Skip to main content
        </a>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        {/* Accessibility announcements */}
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
          id="a11y-announcements"
        />
      </body>
    </html>
  )
}
