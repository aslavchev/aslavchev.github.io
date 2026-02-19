import { type Page, type Locator } from "@playwright/test"

export class CertificationsSection {
  readonly page: Page
  readonly section: Locator
  readonly heading: Locator
  readonly expandButton: Locator
  readonly certCards: Locator
  readonly credentialLinks: Locator

  constructor(page: Page) {
    this.page = page
    this.section = page.locator("section#certifications")
    this.heading = page.getByRole("heading", { name: "Certifications", level: 2 })
    this.expandButton = page.getByRole("button", { name: /Show all.*certifications/i })
    this.certCards = this.section.locator("[data-slot='card-title']")
    this.credentialLinks = this.section.getByText("View Credential")
  }

  async expandAll() {
    await this.expandButton.scrollIntoViewIfNeeded()
    await this.expandButton.click()
  }
}
