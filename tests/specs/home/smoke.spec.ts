import { test, expect } from "@tests/fixtures/test"
import { features } from "@/lib/features"

test.describe("Smoke Tests — Page Load & Core Structure", { tag: ["@smoke"] }, () => {
  test("home page loads with 200 status", async ({ page }) => {
    const response = await page.goto("/")
    expect(response?.status()).toBe(200)
  })

  test("main content area exists", async ({ homePage }) => {
    await homePage.goto()
    await expect(homePage.mainContent).toBeVisible()
  })

  test("all enabled sections render", async ({ homePage }) => {
    await homePage.goto()

    const enabledSections = [
      { flag: features.showHero, id: "home" },
      { flag: features.showFeaturedProjects, id: "featured" },
      { flag: features.showExperience, id: "experience" },
      { flag: features.showEducation, id: "education" },
      { flag: features.showCertifications, id: "certifications" },
      { flag: features.showTestimonials, id: "testimonials" },
      { flag: features.showContact, id: "contact" },
    ].filter((s) => s.flag)

    for (const section of enabledSections) {
      await expect(homePage.getSection(section.id)).toBeAttached()
    }
  })

  test("disabled sections do not render", async ({ homePage }) => {
    await homePage.goto()

    const disabledSections = [
      { flag: features.showProjects, id: "projects" },
      { flag: features.showGitHub, id: "github" },
    ].filter((s) => !s.flag)

    for (const section of disabledSections) {
      await expect(homePage.getSection(section.id)).not.toBeAttached()
    }
  })

  test("blog listing page loads", async ({ page }) => {
    const response = await page.goto("/blog")
    expect(response?.status()).toBe(200)
    await expect(page.getByRole("heading", { level: 1, name: "Technical Articles" })).toBeVisible()
  })

  test("blog article page loads", async ({ page }) => {
    const response = await page.goto("/blog/claude-developer-guide")
    expect(response?.status()).toBe(200)
    await expect(page.getByRole("article")).toBeVisible()
  })

  test("scroll progress bar is present", async ({ homePage }) => {
    await homePage.goto()
    await expect(homePage.scrollProgress).toBeAttached()
  })

  test("skip-to-main-content link is present", async ({ homePage }) => {
    await homePage.goto()
    await expect(homePage.skipLink).toBeAttached()
  })
})
