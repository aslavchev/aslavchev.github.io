import { test, expect } from "@tests/fixtures/test"

test.describe("Responsive Layout", () => {
  test("desktop: sidebar visible, hamburger hidden", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chrome", "Desktop-specific test")
    await page.goto("/")
    await expect(page.locator("main#main-content")).toBeVisible()

    const sidebar = page.locator("aside")
    await expect(sidebar).toBeVisible()

    const hamburger = page.getByRole("button", { name: "Toggle menu" })
    await expect(hamburger).not.toBeVisible()
  })

  test("mobile: sidebar hidden, hamburger visible", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile-chrome", "Mobile-specific test")
    await page.goto("/")
    await expect(page.locator("main#main-content")).toBeVisible()

    const sidebar = page.locator("aside")
    await expect(sidebar).not.toBeVisible()

    const hamburger = page.getByRole("button", { name: "Toggle menu" })
    await expect(hamburger).toBeVisible()
  })

  test("tablet: sidebar hidden, hamburger visible", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "tablet", "Tablet-specific test")
    await page.goto("/")
    await expect(page.locator("main#main-content")).toBeVisible()

    const sidebar = page.locator("aside")
    await expect(sidebar).not.toBeVisible()

    const hamburger = page.getByRole("button", { name: "Toggle menu" })
    await expect(hamburger).toBeVisible()
  })

  test("hero section renders on all viewports", { tag: ["@smoke"] }, async ({ page }) => {
    await page.goto("/")
    await expect(page.locator("main#main-content")).toBeVisible()

    const hero = page.locator("section#home")
    await expect(hero).toBeVisible()

    const heading = hero.getByRole("heading", { level: 1 })
    await expect(heading).toBeVisible()
  })

  test("footer renders on all viewports", async ({ page }) => {
    await page.goto("/")
    await expect(page.locator("main#main-content")).toBeVisible()

    const contact = page.locator("section#contact")
    await contact.scrollIntoViewIfNeeded()
    await expect(contact).toBeVisible()
  })

  test("mobile: touch targets meet minimum 44px", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile-chrome", "Mobile-specific test")
    await page.goto("/")
    await expect(page.locator("main#main-content")).toBeVisible()

    const hamburger = page.getByRole("button", { name: "Toggle menu" })
    const box = await hamburger.boundingBox()
    expect(box).toBeTruthy()
    expect(box!.height).toBeGreaterThanOrEqual(44)
  })
})
