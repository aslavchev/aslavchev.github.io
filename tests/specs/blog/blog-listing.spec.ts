import { test, expect } from "@tests/fixtures/test"
import { getPublishedArticles, getAllTags } from "@/lib/data/blog"

const articles = getPublishedArticles()
const allTags = getAllTags()

test.describe("Blog Listing Page", () => {
  test.beforeEach(async ({ blogListingPage }) => {
    await blogListingPage.goto()
  })

  test("page renders with heading and subtitle", { tag: ["@smoke"] }, async ({ blogListingPage }) => {
    await expect(blogListingPage.heading).toBeVisible()
    await expect(blogListingPage.page.getByText("Practical guides on QA testing")).toBeVisible()
  })

  test("displays all published articles", async ({ blogListingPage }) => {
    const visibleArticles = blogListingPage.getVisibleArticles()
    await expect(visibleArticles).toHaveCount(articles.length)
  })

  test("article cards show title, description, date, and read time", async ({ blogListingPage }) => {
    for (const article of articles) {
      const card = blogListingPage.getArticleCardByTitle(article.title)
      await expect(card).toBeVisible()
      await expect(card).toContainText(article.description)
      await expect(card).toContainText(article.readTime)
    }
  })

  test("article cards show tag badges", async ({ blogListingPage }) => {
    const firstArticle = articles[0]
    const card = blogListingPage.getArticleCardByTitle(firstArticle.title)
    for (const tag of firstArticle.tags) {
      await expect(card.locator("..").getByText(tag, { exact: true }).first()).toBeVisible()
    }
  })

  test("all tag filter links are present", async ({ blogListingPage }) => {
    for (const tag of allTags) {
      const tagSlug = tag.toLowerCase().replace(/\s+/g, "-")
      const tagLink = blogListingPage.page.locator(`main a[href="/blog/tag/${tagSlug}/"]`).first()
      await expect(tagLink).toBeVisible()
    }
  })

  test("search filters articles by title", async ({ blogListingPage }) => {
    await blogListingPage.search("Claude AI")
    const visible = blogListingPage.getVisibleArticles()
    await expect(visible).toHaveCount(1)
    await expect(visible.first()).toContainText("Claude AI Fundamentals")
  })

  test("search filters articles by description keyword", async ({ blogListingPage }) => {
    await blogListingPage.search("Charles Proxy")
    const visible = blogListingPage.getVisibleArticles()
    await expect(visible).toHaveCount(1)
    await expect(visible.first()).toContainText("Charles Proxy")
  })

  test("search filters articles by tag", async ({ blogListingPage }) => {
    await blogListingPage.search("Tutorial")
    const visible = blogListingPage.getVisibleArticles()
    await expect(visible).toHaveCount(1)
    await expect(visible.first()).toContainText("Charles Proxy")
  })

  test("empty search shows all articles", async ({ blogListingPage }) => {
    await blogListingPage.search("something")
    await blogListingPage.clearSearch()
    const visible = blogListingPage.getVisibleArticles()
    await expect(visible).toHaveCount(articles.length)
  })

  test("no-match search shows empty state", async ({ blogListingPage }) => {
    await blogListingPage.search("xyznonexistent123")
    const visible = blogListingPage.getVisibleArticles()
    await expect(visible).toHaveCount(0)
  })

  test("clicking article card navigates to article page", { tag: ["@critical"] }, async ({ blogListingPage }) => {
    const firstArticle = articles[0]
    await blogListingPage.getArticleCardByTitle(firstArticle.title).click()
    await expect(blogListingPage.page).toHaveURL(new RegExp(`/blog/${firstArticle.slug}`))
  })

  test("clicking tag link navigates to tag page", async ({ blogListingPage }) => {
    const firstTag = allTags[0]
    const tagSlug = firstTag.toLowerCase().replace(/\s+/g, "-")
    await blogListingPage.clickTagFilter(firstTag)
    await expect(blogListingPage.page).toHaveURL(new RegExp(`/blog/tag/${tagSlug}`))
  })
})
