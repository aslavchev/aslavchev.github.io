import { test, expect } from "@tests/fixtures/test"
import { testimonials } from "@/lib/data/testimonials"

test.describe("Testimonials Section", () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto()
    await homePage.scrollToSection("testimonials")
  })

  test("section heading is visible", { tag: ["@smoke"] }, async ({ homePage }) => {
    await expect(homePage.testimonials.heading).toBeVisible()
  })

  test("testimonials display names, roles, and companies", async ({ homePage }) => {
    for (const t of testimonials) {
      await expect(homePage.testimonials.section.getByText(t.name).first()).toBeVisible()
      await expect(homePage.testimonials.section.getByText(t.role).first()).toBeVisible()
      await expect(homePage.testimonials.section.getByText(t.company).first()).toBeVisible()
    }
  })

  test("testimonial quotes are visible", async ({ homePage }) => {
    for (const t of testimonials) {
      const firstSentence = t.content.split(".")[0]
      await expect(homePage.testimonials.section.getByText(firstSentence, { exact: false }).first()).toBeVisible()
    }
  })

  test("LinkedIn profile links are present for each testimonial", async ({ homePage }) => {
    const withLinkedIn = testimonials.filter((t) => t.linkedinUrl)
    expect(withLinkedIn.length).toBeGreaterThan(0)

    for (const t of withLinkedIn) {
      const link = homePage.testimonials.getTestimonialLink(t.linkedinUrl!)
      await expect(link).toBeAttached()
    }
  })

  test("navigation controls are present", async ({ homePage }) => {
    await expect(homePage.testimonials.prevButton).toBeVisible()
    await expect(homePage.testimonials.nextButton).toBeVisible()
  })

  test("View LinkedIn Recommendations link is present", async ({ homePage }) => {
    await expect(homePage.testimonials.linkedinRecommendationsLink).toBeVisible()
    await expect(homePage.testimonials.linkedinRecommendationsLink).toHaveAttribute("href", "https://www.linkedin.com/in/aslavchev/")
  })
})
