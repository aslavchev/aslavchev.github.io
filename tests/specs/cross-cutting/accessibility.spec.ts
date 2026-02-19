import { test, expect } from "@tests/fixtures/test"

test.describe("Accessibility", { tag: ["@a11y"] }, () => {
  test("skip-to-main-content link works", async ({ page }) => {
    await page.goto("/")
    const skipLink = page.locator("a[href='#main-content']")
    await expect(skipLink).toBeAttached()

    await skipLink.focus()
    await skipLink.click()

    const mainContent = page.locator("main#main-content")
    await expect(mainContent).toBeInViewport()
  })

  test("all images have alt text", async ({ page }) => {
    await page.goto("/")
    // No networkidle — wait for main content instead (Pavel)
    await expect(page.locator("main#main-content")).toBeVisible()
    const images = page.locator("img:not([aria-hidden='true'])")
    const count = await images.count()

    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute("alt")
      expect(alt, `Image ${i} missing alt text`).toBeTruthy()
    }
  })

  test("home page has single h1 heading", async ({ page }) => {
    await page.goto("/")
    const h1Count = await page.locator("h1").count()
    expect(h1Count).toBe(1)
  })

  test("blog page has single h1 heading", async ({ page }) => {
    await page.goto("/blog")
    const h1Count = await page.locator("h1").count()
    expect(h1Count).toBe(1)
  })

  test("ARIA labels on interactive elements", async ({ page }) => {
    await page.goto("/")
    await expect(page.locator("main#main-content")).toBeVisible()

    const buttons = page.locator("button")
    const buttonCount = await buttons.count()
    for (let i = 0; i < buttonCount; i++) {
      const name = await buttons.nth(i).getAttribute("aria-label")
      const text = await buttons.nth(i).textContent()
      const hasAccessibleName = (name && name.length > 0) || (text && text.trim().length > 0)
      expect(hasAccessibleName, `Button ${i} has no accessible name`).toBe(true)
    }
  })

  test("aria-live region is present for announcements", async ({ page }) => {
    await page.goto("/")
    const liveRegion = page.locator("[aria-live='polite']")
    await expect(liveRegion).toBeAttached()
  })

  test("no empty links", async ({ page }) => {
    await page.goto("/")
    await expect(page.locator("main#main-content")).toBeVisible()
    const links = page.locator("a:not([aria-hidden='true'])")
    const count = await links.count()

    for (let i = 0; i < count; i++) {
      const link = links.nth(i)
      const text = await link.textContent()
      const ariaLabel = await link.getAttribute("aria-label")
      const hasChild = await link.locator("img, svg, [aria-hidden]").count()
      const hasAccessibleContent = (text && text.trim().length > 0) || (ariaLabel && ariaLabel.length > 0) || hasChild > 0
      expect(hasAccessibleContent, `Link ${i} at ${await link.getAttribute("href")} has no accessible content`).toBe(true)
    }
  })

  test("keyboard focus is visible on interactive elements", async ({ page }) => {
    await page.goto("/")

    await page.keyboard.press("Tab")
    await page.keyboard.press("Tab")

    const focusedElement = page.locator(":focus")
    await expect(focusedElement).toBeVisible()
  })
})
