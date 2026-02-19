import { test, expect } from "@tests/fixtures/test"
import { education } from "@/lib/data/education"

// Education is a "thin" section — no dedicated section file.
// Locators stay inline here. (Munger + Jason consensus)
test.describe("Education Section", () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto()
    await homePage.scrollToSection("education")
  })

  test("section heading is visible", { tag: ["@smoke"] }, async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Education", level: 2 })).toBeVisible()
  })

  test("all education entries render", async ({ homePage }) => {
    const section = homePage.getSection("education")
    for (const edu of education) {
      await expect(section.getByText(edu.degree, { exact: true }).first()).toBeVisible()
    }
  })

  test("entries show school and period", async ({ homePage }) => {
    const section = homePage.getSection("education")
    for (const edu of education) {
      await expect(section.getByText(edu.school).first()).toBeVisible()
      await expect(section.getByText(edu.period).first()).toBeVisible()
    }
  })

  test("descriptions are present", async ({ homePage }) => {
    const section = homePage.getSection("education")
    for (const edu of education) {
      await expect(section.getByText(edu.description).first()).toBeVisible()
    }
  })

  test("entry count matches data source", async ({ homePage }) => {
    const section = homePage.getSection("education")
    const titles = section.locator("[data-slot='card-title']")
    await expect(titles).toHaveCount(education.length)
  })
})
