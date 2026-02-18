import { test as base, type Locator } from "@playwright/test"

type Sections = {
  home: Locator
  featured: Locator
  experience: Locator
  education: Locator
  certifications: Locator
  testimonials: Locator
  contact: Locator
}

export const test = base.extend<{ sections: Sections }>({
  sections: async ({ page }, use) => {
    await use({
      home: page.locator("section#home"),
      featured: page.locator("section#featured"),
      experience: page.locator("section#experience"),
      education: page.locator("section#education"),
      certifications: page.locator("section#certifications"),
      testimonials: page.locator("section#testimonials"),
      contact: page.locator("section#contact"),
    })
  },
})

export { expect } from "@playwright/test"
