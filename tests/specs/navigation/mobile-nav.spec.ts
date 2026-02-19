import { test, expect } from "@tests/fixtures/test"

test.describe("Mobile Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
    await expect(page.locator("main#main-content")).toBeVisible()
  })

  test("hamburger button is visible on mobile", { tag: ["@smoke"] }, async ({ mobileNav }) => {
    await expect(mobileNav.toggleButton).toBeVisible()
  })

  test("sidebar is hidden on mobile", async ({ mobileNav }) => {
    await expect(mobileNav.sidebar).not.toBeVisible()
  })

  test("clicking hamburger opens navigation sheet", async ({ mobileNav }) => {
    await mobileNav.openMenu()
    const dialogOrSheet = mobileNav.page.locator("[role='dialog'], [data-state='open']")
    await expect(dialogOrSheet.first()).toBeVisible()
  })

  test("all navigation items present in sheet", async ({ mobileNav }) => {
    await mobileNav.openMenu()
    const expectedLinks = ["Home", "Featured Projects", "Experience", "Education", "Certifications", "Testimonials", "Blog", "Contact"]
    for (const label of expectedLinks) {
      const link = mobileNav.getSheetNavLinks().filter({ hasText: label }).first()
      await expect(link).toBeVisible()
    }
  })

  test("tapping nav item navigates and closes sheet", { tag: ["@critical"] }, async ({ mobileNav }) => {
    await mobileNav.openMenu()
    const experienceLink = mobileNav.getSheetNavLinks().filter({ hasText: "Experience" }).first()
    await experienceLink.click()
    // Sheet should close after navigation — assert the sheet is gone
    const dialogOrSheet = mobileNav.page.locator("[role='dialog'], [data-state='open']")
    await expect(dialogOrSheet).not.toBeVisible()
  })
})
