import { test, expect } from "@tests/fixtures/test"
import { navigationConfig } from "@/lib/navigation"

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
    await expect(mobileNav.dialog).toBeVisible()
  })

  test("all navigation items present in sheet", async ({ mobileNav }) => {
    await mobileNav.openMenu()
    for (const { label } of navigationConfig) {
      const link = mobileNav.getSheetNavLinks().filter({ hasText: label }).first()
      await expect(link).toBeVisible()
    }
  })

  test("tapping nav item navigates and closes sheet", { tag: ["@critical"] }, async ({ mobileNav }) => {
    await mobileNav.openMenu()
    const experienceLink = mobileNav.getSheetNavLinks().filter({ hasText: "Experience" }).first()
    await experienceLink.click()
    // Sheet should close after navigation
    await expect(mobileNav.dialog).not.toBeVisible()
  })
})
