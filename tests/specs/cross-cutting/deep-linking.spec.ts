import { test, expect } from "@tests/fixtures/test"
import { getPublishedArticles, getAllTags, getArticlesByTag } from "@/lib/data/blog"

const articles = getPublishedArticles()
const allTags = getAllTags()

test.describe("Deep Linking & Error Handling", () => {
  test("direct URL to article loads correctly", async ({ page }) => {
    for (const article of articles) {
      await page.goto(`/blog/${article.slug}`)
      await expect(page.getByRole("article")).toBeVisible()
      await expect(page.getByRole("article").getByRole("heading", { level: 1 })).toContainText(article.title)
    }
  })

  test("direct URL to tag page loads correctly", async ({ page }) => {
    const tag = "Tutorial"
    const tagSlug = tag.toLowerCase().replace(/\s+/g, "-")
    const expectedArticles = getArticlesByTag(tag)

    await page.goto(`/blog/tag/${tagSlug}`)
    await expect(page.getByRole("heading", { level: 1 })).toContainText(tag)
    await expect(page.getByText(new RegExp(`${expectedArticles.length} article`))).toBeVisible()
  })

  test("non-existent blog slug shows not-found state", async ({ page }) => {
    const response = await page.goto("/blog/this-article-does-not-exist")
    const status = response?.status()
    const title = await page.title()
    const is404 = status === 404 || title.toLowerCase().includes("not found")
    expect(is404).toBe(true)
  })

  test("non-existent tag shows not-found or empty state", async ({ page }) => {
    const response = await page.goto("/blog/tag/nonexistent-tag-xyz")
    const status = response?.status()
    const is404 = status === 404
    if (!is404) {
      // Page returned 200 — must show empty state or "not found" in content
      const notFoundIndicator = page.getByText(/not found/i).or(page.getByText(/0 article/i))
      await expect(notFoundIndicator.first()).toBeVisible()
    }
  })

  test("all tag pages are reachable via direct URL", async ({ page }) => {
    for (const tag of allTags) {
      const tagSlug = tag.toLowerCase().replace(/\s+/g, "-")
      const response = await page.goto(`/blog/tag/${tagSlug}`)
      expect(response?.status()).toBe(200)
      await expect(page.getByRole("heading", { level: 1 })).toContainText(tag)
    }
  })
})
