import { type Page, type Locator } from "@playwright/test"

export class ContactSection {
  readonly page: Page
  readonly section: Locator
  readonly heading: Locator
  readonly clock: Locator
  readonly availabilityStatus: Locator
  readonly workPreferences: Locator
  readonly linkedinButton: Locator
  readonly githubButton: Locator
  readonly footerNav: Locator

  constructor(page: Page) {
    this.page = page
    this.section = page.locator("section#contact")
    this.heading = page.getByRole("heading", { name: "Let's Connect", level: 2 })
    this.clock = this.section.getByRole("timer")
    this.availabilityStatus = this.section.getByText("Available for new opportunities")
    this.workPreferences = this.section.getByText("Remote • Hybrid • On-site")
    this.linkedinButton = this.section.getByRole("link", { name: /Connect.*LinkedIn/ })
    this.githubButton = this.section.getByRole("link", { name: /GitHub/ })
    this.footerNav = this.section.getByRole("navigation", { name: "Footer navigation" })
  }

  getFooterColumn(heading: string): Locator {
    return this.footerNav.getByRole("list", { name: heading })
  }
}
