import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { getAssetPath } from "@/lib/asset-path"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Alex Slavchev – Senior QA Engineer | Quality Engineering at Scale",
  description:
    "Senior Quality Assurance Engineer specializing in test automation, performance testing, and quality at scale. 18+ years of experience delivering flawless software through comprehensive testing strategies.",
  keywords: [
    "QA Engineer",
    "Quality Assurance",
    "Test Automation",
    "Selenium",
    "Playwright",
    "Cypress",
    "Performance Testing",
    "CI/CD",
    "Senior QA Engineer",
    "SDET",
  ],
  authors: [{ name: "Alex Slavchev" }],
  creator: "Alex Slavchev",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aslavchev.github.io/aslavchev-portfolio-website/",
    title: "Alex Slavchev – Senior QA Engineer Portfolio",
    description:
      "Senior Quality Assurance Engineer specializing in test automation, performance testing, and quality at scale. 18+ years of experience.",
    siteName: "Alex Slavchev Portfolio",
    images: [
      {
        url: getAssetPath("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "Alex Slavchev - Senior QA Engineer | Building Quality at Scale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Slavchev – Senior QA Engineer",
    description: "Senior Quality Assurance Engineer specializing in test automation and quality at scale. 18+ years of experience.",
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
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Alex Slavchev",
              jobTitle: "Senior QA Engineer",
              description:
                "Senior Quality Assurance Engineer specializing in test automation, performance testing, and quality at scale. 18+ years of experience.",
              url: typeof window !== "undefined" ? window.location.origin : "",
              sameAs: [
                "https://github.com/aslavchev",
                "https://www.linkedin.com/in/aslavchev/",
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
        >
          Skip to main content
        </a>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
