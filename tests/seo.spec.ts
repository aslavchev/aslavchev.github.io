import { test, expect } from "@playwright/test"

test.describe("SEO & Meta Tags", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chrome", "SEO tags are viewport-independent")
    await page.goto("/")
    await page.waitForLoadState("networkidle")
  })

  test("has correct page title", async ({ page }) => {
    await expect(page).toHaveTitle("Alex Slavchev – When It Matters, No Bug Walks Alone")
  })

  test("has meta description", async ({ page }) => {
    const description = page.locator('meta[name="description"]')
    await expect(description).toHaveAttribute("content", /Quality Engineer/)
  })

  test("has Open Graph tags", async ({ page }) => {
    const ogTitle = page.locator('meta[property="og:title"]')
    await expect(ogTitle).toHaveAttribute("content", /Alex Slavchev/)

    const ogDescription = page.locator('meta[property="og:description"]')
    await expect(ogDescription).toHaveAttribute("content", /Quality Engineer/)

    const ogImage = page.locator('meta[property="og:image"]')
    const ogImageContent = await ogImage.getAttribute("content")
    expect(ogImageContent).toContain("og-image.png")

    const ogType = page.locator('meta[property="og:type"]')
    await expect(ogType).toHaveAttribute("content", "website")

    const ogUrl = page.locator('meta[property="og:url"]')
    await expect(ogUrl).toHaveAttribute("content", "https://aslavchev.com/")
  })

  test("has Twitter card tags", async ({ page }) => {
    const twitterCard = page.locator('meta[name="twitter:card"]')
    await expect(twitterCard).toHaveAttribute("content", "summary_large_image")

    const twitterTitle = page.locator('meta[name="twitter:title"]')
    await expect(twitterTitle).toHaveAttribute("content", /Alex Slavchev/)

    const twitterImage = page.locator('meta[name="twitter:image"]')
    const content = await twitterImage.getAttribute("content")
    expect(content).toContain("og-image.png")
  })

  test("has valid structured data (JSON-LD)", async ({ page }) => {
    const jsonLd = page.locator('script[type="application/ld+json"]')
    const content = await jsonLd.textContent()
    expect(content).toBeTruthy()

    const data = JSON.parse(content!)
    expect(data["@context"]).toBe("https://schema.org")
    expect(data["@graph"]).toBeDefined()

    // Verify Person schema exists
    const person = data["@graph"].find((item: Record<string, string>) => item["@type"] === "Person")
    expect(person).toBeDefined()
    expect(person.name).toBe("Alex Slavchev")
    expect(person.jobTitle).toBe("Quality Engineer")
  })

  test("has favicon", async ({ page, request }) => {
    const response = await request.get("/favicon.ico")
    expect(response.status()).toBe(200)
  })

  test("robots meta allows indexing", async ({ page }) => {
    const robots = page.locator('meta[name="robots"]')
    const content = await robots.getAttribute("content")
    expect(content).toContain("index")
    expect(content).toContain("follow")
  })

  test("viewport meta is correctly set", async ({ page }) => {
    const viewport = page.locator('meta[name="viewport"]')
    const content = await viewport.getAttribute("content")
    expect(content).toContain("width=device-width")
    expect(content).toContain("initial-scale=1")
  })
})
