import { test, expect } from "@playwright/test"

test.describe("Link Validation", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chrome", "Link validation is viewport-independent")
    await page.goto("/")
    await page.waitForLoadState("networkidle")
  })

  test("all external links have rel=noopener noreferrer", async ({ page }) => {
    const externalLinks = page.locator('a[target="_blank"]')
    const count = await externalLinks.count()

    for (let i = 0; i < count; i++) {
      const link = externalLinks.nth(i)
      const rel = await link.getAttribute("rel")
      const href = await link.getAttribute("href")
      expect(rel, `Link ${href} missing rel="noopener noreferrer"`).toContain("noopener")
      expect(rel, `Link ${href} missing rel="noopener noreferrer"`).toContain("noreferrer")
    }
  })

  test("all external links have valid href", async ({ page }) => {
    const externalLinks = page.locator('a[target="_blank"]')
    const count = await externalLinks.count()

    for (let i = 0; i < count; i++) {
      const link = externalLinks.nth(i)
      const href = await link.getAttribute("href")
      expect(href, "Link has empty href").toBeTruthy()
      expect(href).toMatch(/^https?:\/\//)
    }
  })

  test("GitHub project links are correct", async ({ page }) => {
    const section = page.locator("section#featured")

    const saucedemoLink = section.getByRole("link", { name: /View Code/i }).first()
    await expect(saucedemoLink).toHaveAttribute("href", /github\.com\/aslavchev/)

    const allureLink = section.getByRole("link", { name: /Allure Report/i })
    await expect(allureLink).toHaveAttribute("href", /aslavchev\.github\.io/)
  })

  test("navigation links scroll to correct sections", async ({ page, isMobile }) => {
    if (isMobile) return // Sidebar not visible on mobile

    const sidebar = page.locator("aside").first()
    if (!(await sidebar.isVisible())) return

    // Click "Projects" nav link and verify scroll
    const projectsLink = sidebar.getByRole("link", { name: /Projects/i }).first()
    if (await projectsLink.isVisible()) {
      await projectsLink.click()
      await expect(page.locator("section#featured")).toBeInViewport()
    }
  })

  test("no internal broken anchor links", async ({ page }) => {
    const anchorLinks = page.locator('a[href^="#"]')
    const count = await anchorLinks.count()

    for (let i = 0; i < count; i++) {
      const link = anchorLinks.nth(i)
      const href = await link.getAttribute("href")
      if (href && href !== "#") {
        const targetId = href.replace("#", "")
        const target = page.locator(`#${targetId}`)
        const exists = (await target.count()) > 0
        expect(exists, `Anchor ${href} points to non-existent element`).toBeTruthy()
      }
    }
  })

  test("social links are present and valid", async ({ page }) => {
    const githubLinks = page.locator('a[href*="github.com/aslavchev"]')
    expect(await githubLinks.count()).toBeGreaterThan(0)

    const linkedinLinks = page.locator('a[href*="linkedin.com/in/aslavchev"]')
    expect(await linkedinLinks.count()).toBeGreaterThan(0)
  })
})
