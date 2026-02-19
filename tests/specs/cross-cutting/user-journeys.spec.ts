import { test, expect } from "@tests/fixtures/test"
import { getPublishedArticles } from "@/lib/data/blog"
import { personalInfo } from "@/lib/data/personal"

const articles = getPublishedArticles()

test.describe("Cross-Page User Journeys", () => {
  test("Home → Blog nav → blog listing loads", { tag: ["@critical"] }, async ({ homePage }) => {
    await homePage.goto()

    // Click Blog in sidebar navigation
    const blogLink = homePage.page.getByRole("complementary").getByRole("link", { name: "Blog" })
    await blogLink.click()

    await expect(homePage.page).toHaveURL(/\/blog\/?$/)
    await expect(homePage.page.getByRole("heading", { level: 1, name: "Technical Articles" })).toBeVisible()
  })

  test("Blog listing → article click → article loads", { tag: ["@critical"] }, async ({ blogListingPage }) => {
    await blogListingPage.goto()

    const firstArticle = articles[0]
    await blogListingPage.page.getByText(firstArticle.title).click()

    await expect(blogListingPage.page).toHaveURL(new RegExp(`/blog/${firstArticle.slug}`))
    await expect(blogListingPage.page.getByRole("article").getByRole("heading", { level: 1 })).toContainText(firstArticle.title)
  })

  test("Article → back button → returns to blog listing", { tag: ["@critical"] }, async ({ blogArticlePage }) => {
    await blogArticlePage.goto(articles[0].slug)

    await blogArticlePage.page.getByRole("link", { name: "Back to all articles" }).first().click()

    await expect(blogArticlePage.page).toHaveURL(/\/blog\/?$/)
    await expect(blogArticlePage.page.getByRole("heading", { level: 1, name: "Technical Articles" })).toBeVisible()
  })

  test("Article → tag click → tag page → article click → correct article", async ({ blogArticlePage }) => {
    await blogArticlePage.goto(articles[0].slug)

    // Click first tag link on the article
    const firstTag = articles[0].tags[0]
    const tagLink = blogArticlePage.page.getByRole("article").locator(`a[href^='/blog/tag/']`).filter({ hasText: firstTag }).first()
    await tagLink.click()

    // Should be on tag page
    const tagSlug = firstTag.toLowerCase().replace(/\s+/g, "-")
    await expect(blogArticlePage.page).toHaveURL(new RegExp(`/blog/tag/${tagSlug}`))

    // Click the first article on tag page
    const articleLink = blogArticlePage.page.locator("main a[href^='/blog/']:not([href*='/tag/']):not([href='/blog/'])")
    await articleLink.first().click()

    // Should land on an article page
    await expect(blogArticlePage.page.getByRole("article")).toBeVisible()
    await expect(blogArticlePage.page.getByRole("article").getByRole("heading", { level: 1 })).toBeVisible()
  })

  // Portfolio evaluation journey — validates the site serves its core purpose (Jobs)
  // A visitor reviews credentials, downloads the CV, and navigates to connect.
  test("Portfolio evaluation: review credentials, download CV, and connect", { tag: ["@critical"] }, async ({ homePage }) => {
    await homePage.goto()

    // 1. Verify the hero introduces who Alex is
    await expect(homePage.hero.heading).toContainText(personalInfo.name)
    await expect(homePage.hero.availabilityBadge).toBeVisible()

    // 2. Scroll through experience to review credentials
    await homePage.scrollToSection("experience")
    const experienceSection = homePage.getSection("experience")
    await expect(experienceSection).toBeInViewport()
    const experienceTitles = experienceSection.locator("[data-slot='card-title']")
    const expCount = await experienceTitles.count()
    expect(expCount).toBeGreaterThan(0)

    // 3. Check certifications
    await homePage.scrollToSection("certifications")
    await expect(homePage.certifications.heading).toBeVisible()

    // 4. Download the CV — verify the link exists and points to a PDF
    const downloadLink = homePage.hero.downloadResumeLink
    await expect(downloadLink).toBeAttached()
    const href = await downloadLink.getAttribute("href")
    expect(href).toMatch(/\.pdf$/i)

    // 5. Navigate to contact to connect
    await homePage.scrollToSection("contact")
    await expect(homePage.contact.heading).toBeVisible()
    await expect(homePage.contact.linkedinButton).toBeVisible()
  })
})
