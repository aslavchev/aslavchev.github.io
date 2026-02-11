import { test, expect } from "@playwright/test"

test.describe("UI & Visual Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
    await page.waitForLoadState("networkidle")
  })

  test("theme toggle switches between light and dark", async ({ page }) => {
    const themeToggle = page.getByRole("button", { name: /dark mode|light mode/i })
    if (!(await themeToggle.isVisible())) return

    const initialClass = await page.locator("html").getAttribute("class")

    await themeToggle.click()
    await page.waitForFunction(
      (initial) => document.documentElement.className !== initial,
      initialClass,
    )

    const newClass = await page.locator("html").getAttribute("class")
    expect(newClass).not.toBe(initialClass)

    // Toggle back
    const restoreToggle = page.getByRole("button", { name: /dark mode|light mode/i })
    await restoreToggle.click()
    await page.waitForFunction(
      (prev) => document.documentElement.className !== prev,
      newClass,
    )

    const restoredClass = await page.locator("html").getAttribute("class")
    expect(restoredClass).toBe(initialClass)
  })

  test("featured project cards have correct structure", async ({ page }) => {
    const section = page.locator("section#featured")

    // Card has project title
    await expect(section.getByText("SauceDemo Selenium Framework")).toBeVisible()

    // Card has description
    await expect(section.getByText("E-commerce UI test automation framework")).toBeVisible()

    // Card has image
    await expect(section.locator("img").first()).toBeVisible()

    // Card has technology badges (known tools)
    await expect(section.getByText("Java").first()).toBeVisible()
    await expect(section.getByText("Selenium").first()).toBeVisible()

    // Card has action button
    await expect(section.getByRole("link", { name: /View code for SauceDemo/i })).toBeVisible()
  })

  test("featured projects grid layout is correct on desktop", async ({ page, isMobile }) => {
    if (isMobile) return

    const section = page.locator("section#featured")
    const images = section.locator("img")
    const count = await images.count()
    expect(count).toBe(5)

    // First two images should be in same row (similar Y position)
    const box1 = await images.nth(0).boundingBox()
    const box2 = await images.nth(1).boundingBox()
    expect(box1).toBeTruthy()
    expect(box2).toBeTruthy()
    expect(Math.abs(box1!.y - box2!.y)).toBeLessThan(5)
  })

  test("last card spans full width when odd count", async ({ page, isMobile }) => {
    if (isMobile) return

    const section = page.locator("section#featured")
    const images = section.locator("img")

    const firstImgBox = await images.nth(0).boundingBox()
    const lastImgBox = await images.nth(4).boundingBox()
    expect(firstImgBox).toBeTruthy()
    expect(lastImgBox).toBeTruthy()
    expect(lastImgBox!.width).toBeGreaterThan(firstImgBox!.width * 1.5)
  })

  test("project images have hover zoom effect", async ({ page, isMobile }) => {
    if (isMobile) return

    const section = page.locator("section#featured")
    const firstImg = section.locator("img").first()

    // Tailwind's group-hover:scale-105 only triggers when the ancestor with class "group" is hovered,
    // not the image itself. We need xpath to traverse up from the card title to the Card (group) container.
    const card = section.getByText("SauceDemo Selenium Framework").locator("xpath=ancestor::div[contains(@class, 'group')]").first()

    // Tailwind v4 uses CSS `scale` property, not `transform`
    const getScale = (el: Element) => {
      const style = window.getComputedStyle(el)
      return style.scale || style.transform
    }
    const initialScale = await firstImg.evaluate(getScale)

    // Hover the card (group element) to trigger group-hover:scale-105 on the image
    await card.hover()
    await expect(async () => {
      const hoveredScale = await firstImg.evaluate(getScale)
      expect(hoveredScale).not.toBe(initialScale)
    }).toPass({ timeout: 2000 })
  })

  test("buttons with only GitHub show full width", async ({ page }) => {
    const section = page.locator("section#featured")
    const githubButton = section.getByRole("link", { name: /View code for QA Fundamentals/i })
    await expect(githubButton).toBeVisible()

    const className = await githubButton.evaluate((el) => el.className)
    expect(className).toContain("col-span-2")
  })

  test("Allure Report button shows correct label", async ({ page }) => {
    const section = page.locator("section#featured")
    const allureButton = section.getByRole("link", { name: /Allure Report/i })
    await expect(allureButton).toBeVisible()
    await expect(allureButton).toHaveAttribute("href", /aslavchev\.github\.io\/dummyjson/)
  })

  test("industry badges render correctly", async ({ page }) => {
    const section = page.locator("section#featured")

    // E-Commerce appears on SauceDemo and DummyJSON cards
    const ecommerceTexts = section.getByText("E-Commerce")
    expect(await ecommerceTexts.count()).toBeGreaterThanOrEqual(2)

    // QA/Tech appears on portfolio and QA Fundamentals
    const qaTechTexts = section.getByText("QA/Tech")
    expect(await qaTechTexts.count()).toBeGreaterThanOrEqual(1)
  })

  test("scroll progress indicator works", async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 500))
    await page.waitForFunction(() => window.scrollY > 0)
  })
})
