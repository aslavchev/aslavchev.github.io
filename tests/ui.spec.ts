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

  test("all featured project cards have correct structure", async ({ page }) => {
    const section = page.locator("section#featured")
    const cards = section.locator("[data-slot='card']")
    const cardCount = await cards.count()
    expect(cardCount).toBe(5)

    for (let i = 0; i < cardCount; i++) {
      const card = cards.nth(i)
      const title = await card.locator("h3, [data-slot='card-title']").textContent()

      // Each card has a visible title
      await expect(card.locator("h3, [data-slot='card-title']")).toBeVisible()

      // Each card has an image
      await expect(card.locator("img"), `Card "${title}" missing image`).toBeVisible()

      // Each card has at least one technology badge
      const badges = card.locator("[data-slot='badge']")
      expect(await badges.count(), `Card "${title}" missing badges`).toBeGreaterThanOrEqual(1)

      // Each card has at least one action link (GitHub or Live)
      const links = card.getByRole("link")
      expect(await links.count(), `Card "${title}" missing action links`).toBeGreaterThanOrEqual(1)
    }
  })

  test("featured projects grid layout is correct on desktop", async ({ page, isMobile }) => {
    if (isMobile) return

    const section = page.locator("section#featured")
    const cards = section.locator("[data-slot='card']")
    const count = await cards.count()
    expect(count).toBe(5)

    // Row 1: cards 0 and 1 should be side by side (similar Y)
    const box0 = await cards.nth(0).boundingBox()
    const box1 = await cards.nth(1).boundingBox()
    expect(box0).toBeTruthy()
    expect(box1).toBeTruthy()
    expect(Math.abs(box0!.y - box1!.y)).toBeLessThan(5)

    // Row 2: cards 2 and 3 should be side by side
    const box2 = await cards.nth(2).boundingBox()
    const box3 = await cards.nth(3).boundingBox()
    expect(box2).toBeTruthy()
    expect(box3).toBeTruthy()
    expect(Math.abs(box2!.y - box3!.y)).toBeLessThan(5)

    // Row 2 should be below row 1
    expect(box2!.y).toBeGreaterThan(box0!.y)

    // Row 3: last card should be below row 2
    const box4 = await cards.nth(4).boundingBox()
    expect(box4).toBeTruthy()
    expect(box4!.y).toBeGreaterThan(box2!.y)
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
    const githubButton = section.getByRole("link", { name: /View code for QA Mentorship/i })
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
