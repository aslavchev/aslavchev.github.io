import { type Page, type Locator, expect } from "@playwright/test"

/**
 * Blog Listing Page Object — /blog
 * Actions only, no assertions.
 */
export class BlogListingPage {
  readonly page: Page
  readonly heading: Locator
  readonly searchInput: Locator
  readonly articleLinks: Locator
  readonly tagLinks: Locator

  constructor(page: Page) {
    this.page = page
    this.heading = page.getByRole("heading", { level: 1, name: "Technical Articles" })
    this.searchInput = page.getByRole("textbox", { name: "Search blog articles" })
    this.articleLinks = page.getByRole("link", { name: /^Read article:/ })
    // CSS selector — no ARIA alternative for tag filter links without template changes
    this.tagLinks = page.locator("main a[href^='/blog/tag/']")
  }

  async goto() {
    await this.page.goto("/blog")
    await expect(this.heading).toBeVisible()
  }

  async search(query: string) {
    await this.searchInput.fill(query)
  }

  async clearSearch() {
    await this.searchInput.fill("")
  }

  async clickArticle(index: number) {
    await this.articleLinks.nth(index).click()
  }

  async clickTagFilter(tagName: string) {
    await this.page.locator(`main a[href^='/blog/tag/']`).filter({ hasText: tagName }).first().click()
  }

  getArticleLinkByTitle(title: string): Locator {
    const escaped = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    return this.page.getByRole("link", { name: new RegExp(`Read article: ${escaped}`, "i") })
  }

  getVisibleArticleLinks(): Locator {
    return this.page.getByRole("link", { name: /^Read article:/ })
  }
}
