import { test, expect } from "./fixtures"
import { featuredProjects } from "../lib/data/projects"

test.describe("Smoke Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
    await page.waitForLoadState("networkidle")
  })

  test("page loads successfully", async ({ page }) => {
    await expect(page).toHaveTitle(/Alex Slavchev/)
  })

  test("hero section renders", async ({ sections }) => {
    await expect(sections.home).toBeVisible()
    await expect(sections.home.getByText("Alex Slavchev")).toBeVisible()
    await expect(sections.home.getByText("Quality Engineer")).toBeVisible()
  })

  test("featured projects section renders with all cards", async ({ sections }) => {
    await expect(sections.featured).toBeVisible()
    await expect(sections.featured.getByText("Featured Projects")).toBeVisible()

    for (const project of featuredProjects) {
      await expect(sections.featured.getByText(project.title)).toBeVisible()
    }
  })

  test("experience section renders", async ({ sections }) => {
    await expect(sections.experience).toBeVisible()
    await expect(sections.experience.getByRole("heading", { name: "Experience" })).toBeVisible()
  })

  test("education section renders", async ({ sections }) => {
    await expect(sections.education).toBeVisible()
  })

  test("certifications section renders", async ({ sections }) => {
    await expect(sections.certifications).toBeVisible()
  })

  test("testimonials section renders", async ({ sections }) => {
    await expect(sections.testimonials).toBeVisible()
  })

  test("contact section renders", async ({ sections }) => {
    await expect(sections.contact).toBeVisible()
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

test.describe("Console Errors", () => {
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
})
