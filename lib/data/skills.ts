import type { Skill } from "./types"

export const skills: Skill[] = [
  {
    category: "Test Automation",
    description: "End-to-end automation frameworks",
    skills: ["Selenium WebDriver", "Playwright", "Appium", "TestNG"],
    proficiency: 84,
  },
  {
    category: "API Testing",
    description: "REST/GraphQL testing tools",
    skills: ["Postman", "REST Assured", "SoapUI", "GraphQL"],
    proficiency: 80,
  },
  {
    category: "Performance Testing",
    description: "Load and stress testing",
    skills: ["JMeter", "K6", "Gatling", "Lighthouse", "WebPageTest"],
    proficiency: 80,
  },
  {
    category: "Programming",
    description: "Test scripting languages",
    skills: ["JavaScript", "TypeScript", "Python", "Java", "Bash"],
    proficiency: 85,
  },
  {
    category: "CI/CD",
    description: "Continuous integration tools",
    skills: ["GitHub Actions", "Docker"],
    proficiency: 82,
  },
  {
    category: "Test Management",
    description: "Planning and tracking",
    skills: ["Jira", "TestRail", "Zephyr", "HP Quality Center"],
    proficiency: 93,
  },
  {
    category: "Mobile Testing",
    description: "iOS and Android testing",
    skills: ["Appium", "Espresso", "XCTest", "BrowserStack", "Sauce Labs"],
    proficiency: 85,
  },
  {
    category: "Debugging & Proxy",
    description: "Network debugging and analysis",
    skills: ["Charles Proxy", "Chrome DevTools", "Postman"],
    proficiency: 80,
  },
]
