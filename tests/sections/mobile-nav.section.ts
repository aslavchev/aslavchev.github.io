import { type Page, type Locator } from "@playwright/test"

export class MobileNavSection {
  readonly page: Page
  readonly toggleButton: Locator
  readonly sidebar: Locator

  constructor(page: Page) {
    this.page = page
    this.toggleButton = page.getByRole("button", { name: "Toggle menu" })
    this.sidebar = page.getByRole("complementary")
  }

  async openMenu() {
    await this.toggleButton.click()
    // Wait for sheet to open — state-based, not time-based
    const sheet = this.page.locator("[role='dialog'], [data-state='open']")
    await sheet.first().waitFor({ state: "visible" })
  }

  getNavLink(label: string): Locator {
    return this.page.getByRole("link", { name: label, exact: true })
  }

  getSheetNavLinks(): Locator {
    return this.page.locator("[role='dialog'] a, [data-state='open'] a")
  }

  async clickNavLink(label: string) {
    await this.getNavLink(label).click()
  }
}
