import { test, expect } from "@tests/fixtures/test"
import { socialLinks } from "@/lib/data/personal"
import { featuredProjects } from "@/lib/data/projects"

test.describe("Link Validation", () => {
  test("external links have target=_blank and rel=noopener noreferrer", async ({ page }) => {
    await page.goto("/")
    await expect(page.locator("main#main-content")).toBeVisible()

    const externalLinks = page.locator("a[target='_blank']")
    const count = await externalLinks.count()
    expect(count).toBeGreaterThan(0)

    for (let i = 0; i < count; i++) {
      const rel = await externalLinks.nth(i).getAttribute("rel")
      expect(rel, `External link ${i} missing rel attribute`).toContain("noopener")
      expect(rel, `External link ${i} missing noreferrer`).toContain("noreferrer")
    }
  })

  test("GitHub profile link is valid", async ({ page }) => {
    await page.goto("/")
    await expect(page.locator("main#main-content")).toBeVisible()

    const githubUrl = socialLinks.find((l) => l.name === "GitHub")?.url
    const githubLinks = page.locator(`a[href='${githubUrl}']`)
    const count = await githubLinks.count()
    expect(count).toBeGreaterThan(0)
  })

  test("LinkedIn profile link is valid", async ({ page }) => {
    await page.goto("/")
    await expect(page.locator("main#main-content")).toBeVisible()

    const linkedinUrl = socialLinks.find((l) => l.name === "LinkedIn")?.url
    const linkedinLinks = page.locator(`a[href='${linkedinUrl}']`)
    const count = await linkedinLinks.count()
    expect(count).toBeGreaterThan(0)
  })

  test("project GitHub URLs are properly formatted", { tag: ["@critical"] }, async ({ page }) => {
    await page.goto("/")
    await expect(page.locator("main#main-content")).toBeVisible()

    const projectsWithGithub = featuredProjects.filter((p) => p.githubUrl)
    for (const project of projectsWithGithub) {
      expect(project.githubUrl).toMatch(/^https:\/\/github\.com\//)
      const link = page.locator(`a[href='${project.githubUrl}']`)
      await expect(link).toBeAttached()
    }
  })

  test("internal hash links have matching target elements", async ({ page }) => {
    await page.goto("/")
    await expect(page.locator("main#main-content")).toBeVisible()

    // Some footer links point to disabled sections (e.g. /#github) — skip those
    const disabledSections = ["github"]

    const hashLinks = page.locator("a[href^='/#']")
    const count = await hashLinks.count()
    expect(count).toBeGreaterThan(0)

    for (let i = 0; i < count; i++) {
      const href = await hashLinks.nth(i).getAttribute("href")
      const targetId = href!.replace("/#", "")
      if (disabledSections.includes(targetId)) continue
      const target = page.locator(`#${targetId}`)
      await expect(target, `Target element for ${href} not found`).toBeAttached()
    }
  })
})
