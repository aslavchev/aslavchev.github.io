import { type Page, type Locator } from "@playwright/test"

export class HeroSection {
  readonly page: Page
  readonly section: Locator
  readonly heading: Locator
  readonly avatar: Locator
  readonly availabilityBadge: Locator
  readonly viewProjectsButton: Locator
  readonly downloadResumeLink: Locator
  readonly getInTouchButton: Locator

  constructor(page: Page) {
    this.page = page
    this.section = page.locator("section#home")
    this.heading = this.section.getByRole("heading", { level: 1 })
    this.avatar = this.section.locator("img[alt*='Alex Slavchev']")
    this.availabilityBadge = this.section.getByText("Available for Opportunities")
    this.viewProjectsButton = page.getByRole("button", { name: "View featured projects" })
    this.downloadResumeLink = page.getByRole("link", { name: "Download Alex Slavchev Resume PDF" })
    this.getInTouchButton = page.getByRole("button", { name: "Scroll to contact section" })
  }

  async clickViewProjects() {
    await this.viewProjectsButton.click()
  }

  async clickDownloadResume() {
    await this.downloadResumeLink.click()
  }

  async clickGetInTouch() {
    await this.getInTouchButton.click()
  }
}
