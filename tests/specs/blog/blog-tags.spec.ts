import { test, expect } from "@tests/fixtures/test"
import { getAllTags, getArticlesByTag } from "@/lib/data/blog"

const allTags = getAllTags()

test.describe("Blog Tag Page", () => {
  test("page heading shows tag name", { tag: ["@smoke"] }, async ({ blogTagPage }) => {
    await blogTagPage.goto("Tutorial")
    await expect(blogTagPage.heading).toContainText("Tutorial")
  })

  test("article count matches data source", async ({ blogTagPage }) => {
    for (const tag of allTags) {
      const expectedArticles = getArticlesByTag(tag)
      await blogTagPage.goto(tag)
      const subtitle = blogTagPage.page.getByText(new RegExp(`${expectedArticles.length} article`))
      await expect(subtitle).toBeVisible()
    }
  })

  test("only matching articles are displayed", async ({ blogTagPage }) => {
    const tag = "Tutorial"
    const expectedArticles = getArticlesByTag(tag)
    await blogTagPage.goto(tag)
    await expect(blogTagPage.articleCards).toHaveCount(expectedArticles.length)
    for (const article of expectedArticles) {
      await expect(blogTagPage.page.getByText(article.title)).toBeVisible()
    }
  })

  test("back to all articles link works", { tag: ["@critical"] }, async ({ blogTagPage }) => {
    await blogTagPage.goto("Tutorial")
    await blogTagPage.clickBackToAll()
    await expect(blogTagPage.page).toHaveURL(/\/blog\/?$/)
  })

  test("clicking article navigates to article page", { tag: ["@critical"] }, async ({ blogTagPage }) => {
    const tag = "Tutorial"
    const expectedArticles = getArticlesByTag(tag)
    await blogTagPage.goto(tag)
    await blogTagPage.clickArticle(0)
    await expect(blogTagPage.page).toHaveURL(new RegExp(`/blog/${expectedArticles[0].slug}`))
  })
})
