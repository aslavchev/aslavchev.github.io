import { test, expect } from "@tests/fixtures/test"
import { personalInfo } from "@/lib/data/personal"

test.describe("SEO & Meta Tags", () => {
  test.describe("Home Page SEO", () => {
    test("page title is correct", { tag: ["@smoke"] }, async ({ page }) => {
      await page.goto("/")
      await expect(page).toHaveTitle("Alex Slavchev – When It Matters, No Bug Walks Alone")
    })

    test("meta description is present", async ({ page }) => {
      await page.goto("/")
      const description = page.locator("meta[name='description']")
      await expect(description).toHaveAttribute("content", personalInfo.bio)
    })

    test("meta keywords are present", async ({ page }) => {
      await page.goto("/")
      const keywords = page.locator("meta[name='keywords']")
      const content = await keywords.getAttribute("content")
      expect(content).toContain("Quality Engineer")
      expect(content).toContain("Playwright")
    })

    test("Open Graph tags are present", async ({ page }) => {
      await page.goto("/")
      await expect(page.locator("meta[property='og:title']")).toHaveAttribute("content", /Alex Slavchev/)
      await expect(page.locator("meta[property='og:description']")).toHaveAttribute("content", /.+/)
      await expect(page.locator("meta[property='og:image']")).toHaveAttribute("content", /og-image/)
      await expect(page.locator("meta[property='og:type']")).toHaveAttribute("content", "website")
      await expect(page.locator("meta[property='og:site_name']")).toHaveAttribute("content", "Alex Slavchev Portfolio")
    })

    test("Twitter card tags are present", async ({ page }) => {
      await page.goto("/")
      await expect(page.locator("meta[name='twitter:card']")).toHaveAttribute("content", "summary_large_image")
      await expect(page.locator("meta[name='twitter:title']")).toHaveAttribute("content", /Alex Slavchev/)
      await expect(page.locator("meta[name='twitter:image']")).toHaveAttribute("content", /og-image/)
    })

    test("JSON-LD structured data is present and valid", async ({ page }) => {
      await page.goto("/")
      const jsonLd = page.locator("script[type='application/ld+json']")
      await expect(jsonLd).toBeAttached()
      const content = await jsonLd.textContent()
      const data = JSON.parse(content!)
      expect(data).toBeTruthy()
      const hasPersonType = JSON.stringify(data).includes("Person")
      expect(hasPersonType).toBe(true)
    })

    test("html lang attribute is set to English", async ({ page }) => {
      await page.goto("/")
      await expect(page.locator("html")).toHaveAttribute("lang", "en")
    })

    test("page is indexable (no noindex directive)", async ({ page }) => {
      await page.goto("/")
      // Assert zero noindex meta tags — covers both "no robots meta" and "meta without noindex"
      const noindexMeta = page.locator("meta[name='robots'][content*='noindex']")
      await expect(noindexMeta).toHaveCount(0)
    })
  })

  test.describe("Blog Article SEO", () => {
    test("article page has specific title", async ({ page }) => {
      await page.goto("/blog/claude-developer-guide")
      const title = await page.title()
      expect(title).toContain("Claude AI Fundamentals")
    })

    test("article page has meta description", async ({ page }) => {
      await page.goto("/blog/claude-developer-guide")
      const description = page.locator("meta[name='description']")
      const content = await description.getAttribute("content")
      expect(content).toBeTruthy()
      expect(content!.length).toBeGreaterThan(10)
    })
  })
})
