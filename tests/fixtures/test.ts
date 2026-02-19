import { test as base, expect } from "@playwright/test"
import { HomePage } from "../pages/home.page"
import { BlogListingPage } from "../pages/blog-listing.page"
import { BlogArticlePage } from "../pages/blog-article.page"
import { BlogTagPage } from "../pages/blog-tag.page"
import { MobileNavSection } from "../sections/mobile-nav.section"

// Type definition for our custom fixtures.
// In Java terms: this is like an interface declaring what dependencies are available.
// Every key here becomes a parameter you can destructure in test functions.
type Fixtures = {
  homePage: HomePage
  blogListingPage: BlogListingPage
  blogArticlePage: BlogArticlePage
  blogTagPage: BlogTagPage
  mobileNav: MobileNavSection
}

// test.extend() creates a NEW test function that knows how to provide these fixtures.
// Think of it as Spring's @Configuration — you're declaring beans/providers.
//
// Key rules (Pavel):
// 1. Fixtures are LAZY — only created when destructured by a test
// 2. No navigation in fixtures — tests own their lifecycle
// 3. The `use` callback is like Java's try-with-resources:
//    - Everything before `use()` is setup
//    - Everything after `use()` is teardown (runs even if test fails)
export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page))
  },
  blogListingPage: async ({ page }, use) => {
    await use(new BlogListingPage(page))
  },
  blogArticlePage: async ({ page }, use) => {
    await use(new BlogArticlePage(page))
  },
  blogTagPage: async ({ page }, use) => {
    await use(new BlogTagPage(page))
  },
  mobileNav: async ({ page }, use) => {
    await use(new MobileNavSection(page))
  },
})

// Re-export expect so specs only need one import line:
//   import { test, expect } from "@tests/fixtures/test"
export { expect }
