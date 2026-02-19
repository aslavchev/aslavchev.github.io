import { test, expect } from "@tests/fixtures/test"
import { experience } from "@/lib/data/experience"

// Experience is a "thin" section — no dedicated section file.
// Locators stay inline here. (Munger + Jason consensus)
test.describe("Experience Section", () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto()
    await homePage.scrollToSection("experience")
  })

  test("section heading is visible", { tag: ["@smoke"] }, async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Experience", level: 2 })).toBeVisible()
  })

  test("all experience entries render", async ({ homePage }) => {
    const section = homePage.getSection("experience")
    for (const exp of experience) {
      await expect(section.getByText(exp.title, { exact: true }).first()).toBeVisible()
    }
  })

  test("entries show company name and period", async ({ homePage }) => {
    const section = homePage.getSection("experience")
    for (const exp of experience) {
      await expect(section.getByText(exp.company).first()).toBeVisible()
      await expect(section.getByText(exp.period).first()).toBeVisible()
    }
  })

  test("company logos are present", async ({ homePage }) => {
    const section = homePage.getSection("experience")
    const logos = section.locator("img[alt*='logo']")
    const logosCount = experience.filter((e) => e.companyLogo).length
    await expect(logos).toHaveCount(logosCount)
  })

  test("entries with achievements show bullet points", async ({ homePage }) => {
    const section = homePage.getSection("experience")
    const entriesWithAchievements = experience.filter((e) => e.achievements.length > 0)
    for (const exp of entriesWithAchievements) {
      await expect(section.getByText(exp.achievements[0]).first()).toBeVisible()
    }
  })

  test("entry count matches data source", async ({ homePage }) => {
    const section = homePage.getSection("experience")
    const titles = section.locator("[data-slot='card-title']")
    await expect(titles).toHaveCount(experience.length)
  })
})
