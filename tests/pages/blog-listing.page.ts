import { type Page, type Locator, expect } from "@playwright/test"

/**
 * Blog Listing Page Object — /blog
 * Actions only, no assertions.
 */
export class BlogListingPage {
  readonly page: Page
  readonly heading: Locator
  readonly searchInput: Locator
  readonly articleCards: Locator
  readonly tagLinks: Locator

  constructor(page: Page) {
    this.page = page
    this.heading = page.getByRole("heading", { level: 1, name: "Technical Articles" })
    this.searchInput = page.getByRole("textbox", { name: "Search blog articles" })
    this.articleCards = page.locator("main").getByRole("link").filter({ has: page.locator("[class*='card']") })
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
    const articles = this.page.locator("main a[href^='/blog/'][href$='/']").filter({
      hasNot: this.page.locator("a[href^='/blog/tag/']"),
    })
    // Filter to only article links (not tag links, not "Back" links)
    const articleLinks = this.page.locator("main a[href^='/blog/']:not([href*='/tag/']):not([href='/blog/'])")
    await articleLinks.nth(index).click()
  }

  async clickTagFilter(tagName: string) {
    await this.page.locator(`main a[href^='/blog/tag/']`).filter({ hasText: tagName }).first().click()
  }

  getArticleCardByTitle(title: string): Locator {
    return this.page.locator("main a").filter({ hasText: title })
  }

  getVisibleArticles(): Locator {
    // Article cards are links that go to /blog/{slug}/ (not /blog/tag/)
    return this.page.locator("main a[href^='/blog/']:not([href*='/tag/']):not([href='/blog/'])")
  }
}
