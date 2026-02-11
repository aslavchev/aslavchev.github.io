import { test, expect } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"

test.describe("Accessibility", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
    await page.waitForLoadState("networkidle")
  })

  test("should pass axe-core accessibility scan including color contrast", async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .exclude(".recharts-wrapper")
      .analyze()

    expect(results.violations).toEqual([])
  })

  test("skip-to-content link works", async ({ page }) => {
    const skipLink = page.locator("a[href='#main-content']")
    await skipLink.focus()
    await expect(skipLink).toBeVisible()
    await skipLink.click()

    const main = page.locator("#main-content")
    await expect(main).toBeVisible()
  })

  test("heading hierarchy is correct", async ({ page }) => {
    const headings = await page.locator("h1, h2, h3, h4, h5, h6").all()
    let previousLevel = 0

    for (const heading of headings) {
      const tagName = await heading.evaluate((el) => el.tagName)
      const level = parseInt(tagName.replace("H", ""))

      // Heading level should not skip more than 1 level
      if (previousLevel > 0) {
        expect(level, `Heading "${await heading.textContent()}" skips levels`).toBeLessThanOrEqual(
          previousLevel + 1,
        )
      }
      previousLevel = level
    }
  })

  test("all images have alt text", async ({ page }) => {
    const images = page.locator("img")
    const count = await images.count()

    for (let i = 0; i < count; i++) {
      const img = images.nth(i)
      const alt = await img.getAttribute("alt")
      const src = await img.getAttribute("src")
      expect(alt, `Image ${src} missing alt text`).toBeTruthy()
    }
  })

  test("interactive elements are keyboard focusable", async ({ page }) => {
    const buttons = page.locator("a[href], button")
    const count = await buttons.count()
    expect(count).toBeGreaterThan(0)

    for (let i = 0; i < Math.min(count, 10); i++) {
      const el = buttons.nth(i)
      if (await el.isVisible()) {
        const tabIndex = await el.evaluate((el) => el.tabIndex)
        expect(tabIndex, `Element ${await el.textContent()} not keyboard focusable`).toBeGreaterThanOrEqual(0)
      }
    }
  })

  test("page has correct lang attribute", async ({ page }) => {
    const lang = await page.locator("html").getAttribute("lang")
    expect(lang).toBe("en")
  })
})
