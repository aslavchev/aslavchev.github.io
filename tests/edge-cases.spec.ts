import { test, expect } from "./fixtures"
import { featuredProjects } from "../lib/data/projects"

test.describe("Edge Cases & Negative Tests", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chrome", "Edge case tests are viewport-independent")
    await page.goto("/")
    await page.waitForLoadState("networkidle")
  })

  test("navigating to non-existent anchor does not break page", async ({ page }) => {
    await page.goto("/#non-existent-section")
    await page.waitForLoadState("networkidle")

    // Page should still render normally
    await expect(page.locator("section#home")).toBeVisible()
    await expect(page.locator("section#featured")).toBeVisible()
  })

  test("every project in data has required fields", async () => {
    for (const project of featuredProjects) {
      expect(project.title, "Project missing title").toBeTruthy()
      expect(project.description, `"${project.title}" missing description`).toBeTruthy()
      expect(project.image, `"${project.title}" missing image`).toBeTruthy()
      expect(project.tools?.length, `"${project.title}" missing tools`).toBeGreaterThan(0)

      // Every project must have at least one action URL
      const hasAction = project.githubUrl || project.liveUrl
      expect(hasAction, `"${project.title}" has no GitHub or live URL`).toBeTruthy()
    }
  })

  test("custom liveLabel projects have matching liveUrl", async () => {
    const projectsWithLabel = featuredProjects.filter(p => p.liveLabel)
    for (const project of projectsWithLabel) {
      expect(project.liveUrl, `"${project.title}" has liveLabel but no liveUrl`).toBeTruthy()
    }
  })

  test("theme persists after page reload", async ({ page }) => {
    const themeToggle = page.getByRole("button", { name: /dark mode|light mode/i })
    if (!(await themeToggle.isVisible())) return

    await themeToggle.click()
    const themeAfterToggle = await page.locator("html").getAttribute("class")

    await page.reload()
    await page.waitForLoadState("networkidle")

    const themeAfterReload = await page.locator("html").getAttribute("class")
    expect(themeAfterReload).toBe(themeAfterToggle)
  })

  test("page handles rapid scrolling without errors", async ({ page }) => {
    const errors: string[] = []
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text())
    })

    // Rapid scroll down and back up
    for (let i = 0; i < 5; i++) {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
      await page.evaluate(() => window.scrollTo(0, 0))
    }

    expect(errors).toHaveLength(0)
  })

  test("JSON-LD schema has all required Person fields", async ({ page }) => {
    const jsonLd = page.locator('script[type="application/ld+json"]')
    const content = await jsonLd.textContent()
    const data = JSON.parse(content!)
    const person = data["@graph"].find((item: Record<string, string>) => item["@type"] === "Person")

    expect(person.name, "Person schema missing name").toBeTruthy()
    expect(person.jobTitle, "Person schema missing jobTitle").toBeTruthy()
    expect(person.url, "Person schema missing url").toBeTruthy()
    expect(person.sameAs, "Person schema missing sameAs links").toBeDefined()
    expect(Array.isArray(person.sameAs)).toBe(true)
    expect(person.sameAs.length, "Person schema has no social links").toBeGreaterThan(0)
  })
})
