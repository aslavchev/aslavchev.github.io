import { test, expect } from "@tests/fixtures/test"
import { navigationConfig } from "@/lib/navigation"

test.describe("Desktop Sidebar Navigation", () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto()
  })

  test("sidebar is visible on desktop", { tag: ["@smoke"] }, async ({ homePage }) => {
    await expect(homePage.sidebar.sidebar).toBeVisible()
  })

  test("all navigation items are present", async ({ homePage }) => {
    for (const item of navigationConfig) {
      await expect(homePage.sidebar.getNavItem(item.label)).toBeVisible()
    }
  })

  test("navigation item count matches config", async ({ homePage }) => {
    await expect(homePage.sidebar.navLinks).toHaveCount(navigationConfig.length)
  })

  test("theme toggle button is present", async ({ homePage }) => {
    await expect(homePage.sidebar.themeToggle).toBeVisible()
  })

  test("theme toggle switches between light and dark", async ({ homePage }) => {
    const htmlEl = homePage.page.locator("html")

    // Click to switch to dark
    await homePage.sidebar.toggleTheme()
    await expect(htmlEl).toHaveClass(/dark/)

    // Click to switch back to light
    await homePage.sidebar.toggleTheme()
    await expect(htmlEl).not.toHaveClass(/dark/)
  })

  test("clicking hash nav item scrolls to section", { tag: ["@critical"] }, async ({ homePage }) => {
    await homePage.sidebar.clickNavItem("Experience")
    // No waitForTimeout — Playwright auto-waits on toBeInViewport() (Pavel)
    const experienceSection = homePage.page.locator("section#experience")
    await expect(experienceSection).toBeInViewport()
  })

  test("Blog link navigates to /blog page", { tag: ["@critical"] }, async ({ homePage }) => {
    await homePage.sidebar.clickNavItem("Blog")
    await expect(homePage.page).toHaveURL(/\/blog/)
  })
})
