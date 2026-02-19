import { type Page, type Locator } from "@playwright/test"

export class TestimonialsSection {
  readonly page: Page
  readonly section: Locator
  readonly heading: Locator
  readonly prevButton: Locator
  readonly nextButton: Locator
  readonly linkedinRecommendationsLink: Locator

  constructor(page: Page) {
    this.page = page
    this.section = page.locator("section#testimonials")
    this.heading = page.getByRole("heading", { name: "What People Say", level: 2 })
    this.prevButton = page.getByRole("button", { name: "Previous testimonial" })
    this.nextButton = page.getByRole("button", { name: "Next testimonial" })
    this.linkedinRecommendationsLink = page.getByRole("link", { name: /View LinkedIn Recommendations/i })
  }

  getTestimonialLink(url: string): Locator {
    return this.section.locator(`a[href='${url}']`)
  }
}
