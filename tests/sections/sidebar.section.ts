import { type Page, type Locator } from "@playwright/test"

export class SidebarSection {
  readonly page: Page
  readonly sidebar: Locator
  readonly nav: Locator
  readonly navLinks: Locator
  readonly themeToggle: Locator
  readonly profileLink: Locator

  constructor(page: Page) {
    this.page = page
    this.sidebar = page.locator("aside")
    this.nav = page.getByRole("navigation", { name: "Main navigation" })
    this.navLinks = this.nav.getByRole("link")
    this.themeToggle = this.sidebar.getByRole("button", { name: /Switch to .* mode/ })
    this.profileLink = page.getByRole("link", { name: "Return to home" })
  }

  async clickNavItem(label: string) {
    await this.nav.getByRole("link", { name: label, exact: true }).click()
  }

  async toggleTheme() {
    await this.themeToggle.click()
  }

  getNavItem(label: string): Locator {
    return this.nav.getByRole("link", { name: label, exact: true })
  }
}
