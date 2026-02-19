import { test, expect } from "@tests/fixtures/test"
import { personalInfo } from "@/lib/data/personal"

test.describe("Hero Section", { tag: ["@smoke"] }, () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto()
  })

  test("displays name", async ({ homePage }) => {
    await expect(homePage.hero.heading).toContainText(personalInfo.name)
  })

  test("displays bio with title role", async ({ homePage }) => {
    await expect(homePage.hero.section.getByText(personalInfo.bio)).toBeVisible()
  })

  test("displays tagline", async ({ homePage }) => {
    await expect(homePage.hero.section.getByText(personalInfo.tagline, { exact: true })).toBeVisible()
  })

  test("avatar image is present", async ({ homePage }) => {
    await expect(homePage.hero.avatar).toBeVisible()
  })

  test("availability badge is visible", async ({ homePage }) => {
    await expect(homePage.hero.availabilityBadge).toBeVisible()
  })

  test("View Projects CTA scrolls to featured section", { tag: ["@critical"] }, async ({ homePage }) => {
    await homePage.hero.clickViewProjects()
    const featured = homePage.page.locator("section#featured")
    await expect(featured).toBeInViewport()
  })

  test("Download Resume link has correct PDF attributes", async ({ homePage }) => {
    await expect(homePage.hero.downloadResumeLink).toHaveAttribute("download", "Alex_Slavchev_CV.pdf")
    const href = await homePage.hero.downloadResumeLink.getAttribute("href")
    expect(href).toContain("Alex_Slavchev_CV.pdf")
  })

  test("Download Resume triggers actual file download", { tag: ["@critical"] }, async ({ homePage }) => {
    const downloadPromise = homePage.page.waitForEvent("download")
    await homePage.hero.clickDownloadResume()
    const download = await downloadPromise
    expect(download.suggestedFilename()).toBe("Alex_Slavchev_CV.pdf")
    const path = await download.path()
    expect(path).toBeTruthy()
  })

  test("Get in Touch CTA scrolls to contact section", { tag: ["@critical"] }, async ({ homePage }) => {
    await homePage.hero.clickGetInTouch()
    const contact = homePage.page.locator("section#contact")
    await expect(contact).toBeInViewport()
  })
})
