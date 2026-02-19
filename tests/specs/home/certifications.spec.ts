import { test, expect } from "@tests/fixtures/test"
import { certifications } from "@/lib/data/certifications"

test.describe("Certifications Section", () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto()
    await homePage.scrollToSection("certifications")
  })

  test("section heading is visible", { tag: ["@smoke"] }, async ({ homePage }) => {
    await expect(homePage.certifications.heading).toBeVisible()
  })

  test("initially shows limited certifications", async ({ homePage }) => {
    const count = await homePage.certifications.certCards.count()
    expect(count).toBeLessThan(certifications.length)
  })

  test("show all button displays total count", async ({ homePage }) => {
    await expect(homePage.certifications.expandButton).toBeVisible()
    await expect(homePage.certifications.expandButton).toContainText(`${certifications.length} total`)
  })

  test("clicking expand shows all certifications", async ({ homePage }) => {
    await homePage.certifications.expandAll()

    for (const cert of certifications) {
      await expect(homePage.certifications.section.getByText(cert.name).first()).toBeVisible()
    }
  })

  test("each certification shows name and issuer", async ({ homePage }) => {
    await homePage.certifications.expandAll()

    for (const cert of certifications) {
      await expect(homePage.certifications.section.getByText(cert.name).first()).toBeVisible()
    }
  })

  test("credential links are present", async ({ homePage }) => {
    const count = await homePage.certifications.credentialLinks.count()
    expect(count).toBeGreaterThan(0)
  })

  test("expand button disappears after expanding (shows all certs)", async ({ homePage }) => {
    // NOTE: Product behavior — when all certifications are shown, hiddenCount becomes 0
    // and the toggle button unmounts. There is no way to collapse back.
    await homePage.certifications.expandAll()
    await expect(homePage.certifications.expandButton).not.toBeVisible()
    await expect(homePage.certifications.certCards).toHaveCount(certifications.length)
  })
})
