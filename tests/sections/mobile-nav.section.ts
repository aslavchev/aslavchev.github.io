import { type Page, type Locator } from "@playwright/test"

export class MobileNavSection {
  readonly page: Page
  readonly toggleButton: Locator
  readonly sidebar: Locator
  readonly dialog: Locator

  constructor(page: Page) {
    this.page = page
    this.toggleButton = page.getByRole("button", { name: "Toggle menu" })
    this.sidebar = page.getByRole("complementary")
    this.dialog = page.getByRole("dialog", { name: "Menu" })
  }

  async openMenu() {
    await this.toggleButton.click()
    await this.dialog.waitFor({ state: "visible" })
  }

  getNavLink(label: string): Locator {
    return this.dialog.getByRole("link", { name: label, exact: true })
  }

  getSheetNavLinks(): Locator {
    return this.dialog.getByRole("link")
  }

  async clickNavLink(label: string) {
    await this.getNavLink(label).click()
  }
}
