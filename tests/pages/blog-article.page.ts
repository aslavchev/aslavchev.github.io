import { type Page, type Locator, expect } from "@playwright/test"

/**
 * Blog Article Page Object — /blog/[slug]
 * Actions only, no assertions.
 */
export class BlogArticlePage {
  readonly page: Page
  readonly article: Locator
  readonly title: Locator
  readonly backToArticlesLink: Locator
  readonly tocNav: Locator
  readonly tocLinks: Locator
  readonly shareLinkedIn: Locator
  readonly shareTwitter: Locator
  readonly shareCopyLink: Locator
  readonly tagLinks: Locator
  readonly prevArticleLink: Locator
  readonly nextArticleLink: Locator

  constructor(page: Page) {
    this.page = page
    this.article = page.getByRole("article")
    this.title = this.article.getByRole("heading", { level: 1 })
    this.backToArticlesLink = page.getByRole("link", { name: "Back to all articles" }).first()
    this.tocNav = this.article.getByRole("navigation")
    this.tocLinks = this.tocNav.getByRole("link")
    this.shareLinkedIn = page.getByRole("button", { name: "Share on LinkedIn" })
    this.shareTwitter = page.getByRole("button", { name: "Share on Twitter" })
    this.shareCopyLink = page.getByRole("button", { name: "Copy link" })
    this.tagLinks = this.article.locator("a[href^='/blog/tag/']")
    this.prevArticleLink = page.getByRole("link", { name: /Previous/ })
    this.nextArticleLink = page.getByRole("link", { name: /Next/ })
  }

  async goto(slug: string) {
    await this.page.goto(`/blog/${slug}`)
    await expect(this.article).toBeVisible()
  }

  async clickBackToArticles() {
    await this.backToArticlesLink.click()
  }

  async clickTocLink(index: number) {
    await this.tocLinks.nth(index).click()
  }

  async clickTag(tagName: string) {
    await this.tagLinks.filter({ hasText: tagName }).first().click()
  }

  async clickPrevArticle() {
    await this.prevArticleLink.click()
  }

  async clickNextArticle() {
    await this.nextArticleLink.click()
  }

  async clickCopyLink() {
    await this.shareCopyLink.click()
  }
}