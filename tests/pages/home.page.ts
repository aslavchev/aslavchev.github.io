import { type Page, type Locator, expect } from "@playwright/test"
import { HeroSection } from "../sections/hero.section"
import { SidebarSection } from "../sections/sidebar.section"
import { ContactSection } from "../sections/contact.section"
import { CertificationsSection } from "../sections/certifications.section"
import { FeaturedProjectsSection } from "../sections/featured-projects.section"
import { TestimonialsSection } from "../sections/testimonials.section"

export class HomePage {
  readonly page: Page
  readonly hero: HeroSection
  readonly featuredProjects: FeaturedProjectsSection
  readonly certifications: CertificationsSection
  readonly testimonials: TestimonialsSection
  readonly contact: ContactSection
  readonly sidebar: SidebarSection
  readonly mainContent: Locator
  readonly scrollProgress: Locator
  readonly skipLink: Locator

  constructor(page: Page) {
    this.page = page
    this.hero = new HeroSection(page)
    this.featuredProjects = new FeaturedProjectsSection(page)
    this.certifications = new CertificationsSection(page)
    this.testimonials = new TestimonialsSection(page)
    this.contact = new ContactSection(page)
    this.sidebar = new SidebarSection(page)
    this.mainContent = page.locator("main#main-content")
    this.scrollProgress = page.locator("[data-testid='scroll-progress']")
    this.skipLink = page.locator("a.skip-link")
  }

  async goto() {
    await this.page.goto("/")
    await expect(this.mainContent).toBeVisible()
    // Theme toggle renders only after React hydration (mounted state in sidebar.tsx).
    // Without this, clicks fire before event handlers are attached — buttons don't respond.
    await expect(this.sidebar.themeToggle).toBeVisible()
  }

  getSection(id: string): Locator {
    return this.page.locator(`section#${id}`)
  }

  async scrollToSection(id: string) {
    await this.page.locator(`section#${id}`).scrollIntoViewIfNeeded()
  }
}
