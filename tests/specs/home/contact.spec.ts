import { test, expect } from "@tests/fixtures/test"
import { socialLinks } from "@/lib/data/personal"

test.describe("Contact Section & Footer", () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto()
    await homePage.scrollToSection("contact")
  })

  test("section heading is visible", { tag: ["@smoke"] }, async ({ homePage }) => {
    await expect(homePage.contact.heading).toBeVisible()
    await expect(homePage.contact.heading).toHaveText("Let's Connect")
  })

  test("live clock displays time", async ({ homePage }) => {
    await expect(homePage.contact.clock).toBeVisible()
    const timeText = await homePage.contact.clock.textContent()
    expect(timeText).toMatch(/\d{1,2}:\d{2}\s?(AM|PM)/i)
  })

  test("availability status is present", async ({ homePage }) => {
    await expect(homePage.contact.availabilityStatus).toBeVisible()
  })

  test("work preferences are shown", async ({ homePage }) => {
    await expect(homePage.contact.workPreferences).toBeVisible()
  })

  test("social links have correct URLs", { tag: ["@critical"] }, async ({ homePage }) => {
    const githubUrl = socialLinks.find((l) => l.name === "GitHub")?.url
    const linkedinUrl = socialLinks.find((l) => l.name === "LinkedIn")?.url

    await expect(homePage.contact.linkedinButton).toHaveAttribute("href", linkedinUrl!)

    const githubProfileButton = homePage.contact.section.getByRole("link", { name: /View.*GitHub.*Profile/i })
    await expect(githubProfileButton).toHaveAttribute("href", githubUrl!)
  })

  test("footer navigation grid renders", async ({ page }) => {
    const footerColumns = ["EXPLORE", "BACKGROUND", "SHOWCASE", "CONNECT"]
    for (const column of footerColumns) {
      await expect(page.getByText(column, { exact: true })).toBeVisible()
    }
  })

  test("footer links point to correct hash anchors", async ({ homePage }) => {
    const footerLinks = homePage.contact.section.locator("a[href^='/#']")
    const count = await footerLinks.count()
    expect(count).toBeGreaterThan(0)

    for (let i = 0; i < count; i++) {
      const href = await footerLinks.nth(i).getAttribute("href")
      expect(href).toMatch(/^\/#[a-z]+$/)
    }
  })
})
