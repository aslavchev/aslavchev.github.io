import { test, expect } from "@playwright/test"

test.describe("Smoke Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
    await page.waitForLoadState("networkidle")
  })

  test("page loads successfully", async ({ page }) => {
    await expect(page).toHaveTitle(/Alex Slavchev/)
  })

  test("hero section renders", async ({ page }) => {
    const hero = page.locator("section#home")
    await expect(hero).toBeVisible()
    await expect(hero.getByText("Alex Slavchev")).toBeVisible()
    await expect(hero.getByText("Quality Engineer")).toBeVisible()
  })

  test("featured projects section renders with all cards", async ({ page }) => {
    const section = page.locator("section#featured")
    await expect(section).toBeVisible()
    await expect(section.getByText("Featured Projects")).toBeVisible()

    // Verify all 5 project cards render (CardTitle renders as div, not heading)
    await expect(section.getByText("SauceDemo Selenium Framework")).toBeVisible()
    await expect(section.getByText("DummyJSON API Test Framework")).toBeVisible()
    await expect(section.getByText("Quality Engineer Portfolio")).toBeVisible()
    await expect(section.getByText("Soma Holistic Studio")).toBeVisible()
    await expect(section.getByText("QA Mentorship Program")).toBeVisible()
  })

  test("experience section renders", async ({ page }) => {
    const section = page.locator("section#experience")
    await expect(section).toBeVisible()
    await expect(section.getByRole("heading", { name: "Experience" })).toBeVisible()
  })

  test("education section renders", async ({ page }) => {
    const section = page.locator("section#education")
    await expect(section).toBeVisible()
  })

  test("certifications section renders", async ({ page }) => {
    const section = page.locator("section#certifications")
    await expect(section).toBeVisible()
  })

  test("testimonials section renders", async ({ page }) => {
    const section = page.locator("section#testimonials")
    await expect(section).toBeVisible()
  })

  test("contact section renders", async ({ page }) => {
    const section = page.locator("section#contact")
    await expect(section).toBeVisible()
  })

  test("no console errors on page load", async ({ page }) => {
    const errors: string[] = []
    page.on("console", (msg) => {
      if (msg.type() === "error" && !msg.text().includes("favicon")) {
        errors.push(msg.text())
      }
    })

    await page.goto("/")
    await page.waitForLoadState("networkidle")
    expect(errors).toHaveLength(0)
  })

  test("no broken images", async ({ page }) => {
    const images = page.locator("img")
    const count = await images.count()

    for (let i = 0; i < count; i++) {
      const img = images.nth(i)
      const src = await img.getAttribute("src")
      if (src && !src.startsWith("data:")) {
        const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth)
        expect(naturalWidth, `Image ${src} failed to load`).toBeGreaterThan(0)
      }
    }
  })
})
