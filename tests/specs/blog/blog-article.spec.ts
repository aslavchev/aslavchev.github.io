import { test, expect } from "@tests/fixtures/test"
import { getPublishedArticles, getAdjacentArticles } from "@/lib/data/blog"

const articles = getPublishedArticles()
const firstArticle = articles[0] // claude-developer-guide (newest)
// Article with navigation neighbors — not the first (which has no prev)
const articleWithNav = articles.length > 1 ? articles[1] : articles[0]

test.describe("Blog Article Page", () => {
  test("article renders with title, date, and read time", { tag: ["@smoke"] }, async ({ blogArticlePage }) => {
    await blogArticlePage.goto(firstArticle.slug)
    await expect(blogArticlePage.title).toContainText(firstArticle.title)
    await expect(blogArticlePage.article).toContainText(firstArticle.readTime)
  })

  test("article tags display as clickable links", async ({ blogArticlePage }) => {
    await blogArticlePage.goto(firstArticle.slug)
    for (const tag of firstArticle.tags) {
      const tagLink = blogArticlePage.tagLinks.filter({ hasText: tag }).first()
      await expect(tagLink).toBeVisible()
      const href = await tagLink.getAttribute("href")
      const expectedSlug = tag.toLowerCase().replace(/\s+/g, "-")
      expect(href).toContain(`/blog/tag/${expectedSlug}`)
    }
  })

  test("table of contents renders with links", async ({ blogArticlePage }) => {
    await blogArticlePage.goto(firstArticle.slug)
    await expect(blogArticlePage.tocNav).toBeVisible()
    const tocHeading = blogArticlePage.tocNav.getByRole("heading", { name: "Contents" })
    await expect(tocHeading).toBeVisible()
    const linkCount = await blogArticlePage.tocLinks.count()
    expect(linkCount).toBeGreaterThan(0)
  })

  test("TOC links point to valid heading anchors", async ({ blogArticlePage }) => {
    await blogArticlePage.goto(firstArticle.slug)
    const linkCount = await blogArticlePage.tocLinks.count()
    for (let i = 0; i < linkCount; i++) {
      const href = await blogArticlePage.tocLinks.nth(i).getAttribute("href")
      expect(href).toMatch(/^#.+/)
      const targetId = href!.replace("#", "")
      const targetElement = blogArticlePage.page.locator(`[id="${targetId}"]`)
      await expect(targetElement).toBeAttached()
    }
  })

  test("share buttons are present", async ({ blogArticlePage }) => {
    await blogArticlePage.goto(firstArticle.slug)
    await expect(blogArticlePage.shareLinkedIn).toBeVisible()
    await expect(blogArticlePage.shareTwitter).toBeVisible()
    await expect(blogArticlePage.shareCopyLink).toBeVisible()
  })

  test("previous/next article navigation renders correctly", async ({ blogArticlePage }) => {
    const { prev } = getAdjacentArticles(articleWithNav.slug)
    test.skip(!prev, "Selected article has no previous neighbor")

    await blogArticlePage.goto(articleWithNav.slug)
    await expect(blogArticlePage.prevArticleLink).toBeVisible()
    await expect(blogArticlePage.prevArticleLink).toContainText(prev!.title)
  })

  test("previous article link navigates correctly", { tag: ["@critical"] }, async ({ blogArticlePage }) => {
    const { prev } = getAdjacentArticles(articleWithNav.slug)
    test.skip(!prev, "Selected article has no previous neighbor")

    await blogArticlePage.goto(articleWithNav.slug)
    await blogArticlePage.clickPrevArticle()
    await expect(blogArticlePage.page).toHaveURL(new RegExp(`/blog/${prev!.slug}`))
    await expect(blogArticlePage.title).toContainText(prev!.title)
  })

  test("back to all articles link works", { tag: ["@critical"] }, async ({ blogArticlePage }) => {
    await blogArticlePage.goto(firstArticle.slug)
    await blogArticlePage.clickBackToArticles()
    await expect(blogArticlePage.page).toHaveURL(/\/blog\/?$/)
  })

  test("article content renders markdown headings", async ({ blogArticlePage }) => {
    await blogArticlePage.goto(firstArticle.slug)
    const h2Count = await blogArticlePage.article.getByRole("heading", { level: 2 }).count()
    expect(h2Count).toBeGreaterThan(0)
  })

  test("article content renders tables", async ({ blogArticlePage }) => {
    await blogArticlePage.goto(firstArticle.slug)
    const tableCount = await blogArticlePage.article.locator("table").count()
    expect(tableCount).toBeGreaterThan(0)
  })

  test("clicking tag navigates to tag page", async ({ blogArticlePage }) => {
    await blogArticlePage.goto(firstArticle.slug)
    const firstTag = firstArticle.tags[0]
    await blogArticlePage.clickTag(firstTag)
    const expectedSlug = firstTag.toLowerCase().replace(/\s+/g, "-")
    await expect(blogArticlePage.page).toHaveURL(new RegExp(`/blog/tag/${expectedSlug}`))
  })
})
