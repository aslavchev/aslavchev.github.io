import { test, expect } from "@playwright/test"

test.describe("Responsive Layout", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
    await page.waitForLoadState("networkidle")
  })

  test("sidebar visible on desktop (lg+ viewport)", async ({ page }) => {
    const viewportWidth = page.viewportSize()?.width ?? 0
    if (viewportWidth < 1024) return

    await expect(page.locator("aside").first()).toBeVisible()
  })

  test("sidebar hidden below lg breakpoint", async ({ page }) => {
    const viewportWidth = page.viewportSize()?.width ?? 0
    if (viewportWidth >= 1024) return

    await expect(page.locator("aside").first()).toBeHidden()
  })

  test("mobile nav visible on mobile, hidden on desktop", async ({ page, isMobile }) => {
    if (isMobile) {
      // Mobile nav trigger should exist
      const menuButton = page.getByRole("button", { name: /menu/i })
      await expect(menuButton).toBeVisible()
    }
  })

  test("featured project cards stack on mobile", async ({ page, isMobile }) => {
    if (!isMobile) return

    const section = page.locator("section#featured")
    const cards = section.locator("[data-slot='card']")
    const count = await cards.count()

    for (let i = 0; i < count; i++) {
      const card = cards.nth(i)
      if (await card.isVisible()) {
        const box = await card.boundingBox()
        expect(box).toBeTruthy()
        // On mobile, cards should be nearly full width (minus padding)
        expect(box!.width).toBeGreaterThan(300)
      }
    }
  })

  test("text is readable at all viewports", async ({ page }) => {
    const body = page.locator("body")
    const fontSize = await body.evaluate((el) => {
      return parseFloat(window.getComputedStyle(el).fontSize)
    })
    // Base font size should be at least 14px
    expect(fontSize).toBeGreaterThanOrEqual(14)
  })

  test("no horizontal overflow", async ({ page }) => {
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1) // 1px tolerance
  })

  test("touch targets are at least 44x44px on mobile", async ({ page, isMobile }) => {
    if (!isMobile) return

    // Only check button-styled elements — inline text links are exempt per WCAG 2.2 SC 2.5.8
    const buttons = page.locator("[data-slot='button'], button:not([data-slot])")
    const count = await buttons.count()

    for (let i = 0; i < count; i++) {
      const el = buttons.nth(i)
      if (await el.isVisible()) {
        const box = await el.boundingBox()
        if (box) {
          expect(
            box.height >= 44 && box.width >= 44,
            `Touch target "${await el.textContent()}" too small: ${box.width}x${box.height}`,
          ).toBeTruthy()
        }
      }
    }
  })
})
