import { type Page, type Locator, expect } from "@playwright/test"

/**
 * Blog Tag Page Object — /blog/tag/[tag]
 * Actions only, no assertions.
 */
export class BlogTagPage {
  readonly page: Page
  readonly heading: Locator
  readonly backToAllLink: Locator
  readonly articleCards: Locator

  constructor(page: Page) {
    this.page = page
    this.heading = page.getByRole("heading", { level: 1 })
    this.backToAllLink = page.getByRole("link", { name: "All articles" })
    this.articleCards = page.locator("main a[href^='/blog/']:not([href*='/tag/']):not([href='/blog/'])")
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
    await this.articleCards.nth(index).click()
  }
}