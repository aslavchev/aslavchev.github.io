import { type Page, type Locator } from "@playwright/test"

export class FeaturedProjectsSection {
  readonly page: Page
  readonly section: Locator
  readonly heading: Locator
  readonly viewCodeLinks: Locator
  readonly projectImages: Locator

  constructor(page: Page) {
    this.page = page
    this.section = page.locator("section#featured")
    this.heading = page.getByRole("heading", { name: "Featured Projects", level: 2 })
    this.viewCodeLinks = this.section.getByRole("link", { name: /View code/i })
    this.projectImages = this.section.locator("img[alt*='project']")
  }

  getLiveLinks(): Locator {
    return this.section.getByRole("link", { name: /Allure Report|Live Demo|live/i })
  }

  getProjectLink(projectTitle: string): Locator {
    return this.section.getByRole("link", { name: new RegExp(`View code for ${projectTitle}`, "i") })
  }
}
