import { type Page, type Locator, expect } from "@playwright/test"

export class CertificationsSection {
  readonly page: Page
  readonly section: Locator
  readonly heading: Locator
  readonly expandButton: Locator
  readonly certHeadings: Locator
  readonly credentialLinks: Locator

  constructor(page: Page) {
    this.page = page
    this.section = page.locator("section#certifications")
    this.heading = page.getByRole("heading", { name: "Certifications", level: 2 })
    this.expandButton = page.getByRole("button", { name: /^Show all \d+ certifications/i })
    this.certHeadings = this.section.getByRole("heading", { level: 4 })
    this.credentialLinks = this.section.getByRole("link", { name: /View credential/i })
  }

  async expandAll() {
    await expect(this.expandButton).toBeVisible()
    await this.expandButton.scrollIntoViewIfNeeded()
    await this.expandButton.click()
    // Wait for the expand button to unmount — confirms all certs are rendered
    await expect(this.expandButton).not.toBeVisible()
  }
}
