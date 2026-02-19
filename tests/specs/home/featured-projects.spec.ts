import { test, expect } from "@tests/fixtures/test"
import { featuredProjects } from "@/lib/data/projects"

test.describe("Featured Projects Section", () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto()
  })

  test("section heading is visible", { tag: ["@smoke"] }, async ({ homePage }) => {
    await expect(homePage.featuredProjects.heading).toBeVisible()
  })

  test("all project cards render", async ({ homePage }) => {
    for (const project of featuredProjects) {
      await expect(homePage.featuredProjects.section.getByText(project.title).first()).toBeVisible()
    }
  })

  test("project cards show title and description", async ({ homePage }) => {
    for (const project of featuredProjects) {
      await expect(homePage.featuredProjects.section.getByText(project.title).first()).toBeVisible()
      await expect(homePage.featuredProjects.section.getByText(project.description).first()).toBeVisible()
    }
  })

  test("project cards show tool badges", async ({ homePage }) => {
    const firstProject = featuredProjects[0]
    test.skip(!firstProject.tools?.length, "First project has no tools data")

    for (const tool of firstProject.tools!.slice(0, 4)) {
      await expect(homePage.featuredProjects.section.getByText(tool, { exact: true }).first()).toBeVisible()
    }
  })

  test("projects with githubUrl show View Code link", async ({ homePage }) => {
    const projectsWithGithub = featuredProjects.filter((p) => p.githubUrl)
    await expect(homePage.featuredProjects.viewCodeLinks).toHaveCount(projectsWithGithub.length)
  })

  test("projects with liveUrl show live demo link", async ({ homePage }) => {
    const projectsWithLive = featuredProjects.filter((p) => p.liveUrl)
    const liveLinks = homePage.featuredProjects.getLiveLinks()
    await expect(liveLinks).toHaveCount(projectsWithLive.length)
  })

  test("GitHub links point to correct URLs", async ({ homePage }) => {
    const projectsWithGithub = featuredProjects.filter((p) => p.githubUrl)

    for (const project of projectsWithGithub) {
      const link = homePage.featuredProjects.getProjectLink(project.title)
      await expect(link).toHaveAttribute("href", project.githubUrl!)
    }
  })

  test("project images are present", async ({ homePage }) => {
    await expect(homePage.featuredProjects.projectImages).toHaveCount(featuredProjects.length)
  })
})
