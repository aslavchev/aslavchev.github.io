import { type Page, type Locator, expect } from "@playwright/test"

/**
 * Blog Tag Page Object — /blog/tag/[tag]
 * Actions only, no assertions.
 */
export class BlogTagPage {
  readonly page: Page
  readonly heading: Locator
  readonly backToAllLink: Locator
  readonly articleLinks: Locator

  constructor(page: Page) {
    this.page = page
    this.heading = page.getByRole("heading", { level: 1 })
    this.backToAllLink = page.getByRole("link", { name: "All articles" })
    this.articleLinks = page.getByRole("link", { name: /^Read article:/ })
  }

  async goto(tag: string) {
    const slug = tag.toLowerCase().replace(/\s+/g, "-")
    await this.page.goto(`/blog/tag/${slug}`)
    await expect(this.heading).toBeVisible()
  }

  async clickBackToAll() {
    await this.backToAllLink.click()
  }

  async clickArticle(index: number) {
    await this.articleLinks.nth(index).click()
  }
}