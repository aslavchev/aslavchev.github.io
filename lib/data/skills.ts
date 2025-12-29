import type { Skill } from "./types"

export const skills: Skill[] = [
  {
    category: "Test Automation",
    description: "End-to-end automation frameworks",
    skills: ["Selenium WebDriver", "Playwright", "Cypress", "Appium", "TestNG"],
    proficiency: 95,
  },
  {
    category: "API Testing",
    description: "REST/GraphQL testing tools",
    skills: ["Postman", "REST Assured", "Pact", "SoapUI", "GraphQL"],
    proficiency: 92,
  },
  {
    category: "Performance Testing",
    description: "Load and stress testing",
    skills: ["JMeter", "K6", "Gatling", "Lighthouse", "WebPageTest"],
    proficiency: 88,
  },
  {
    category: "Programming",
    description: "Test scripting languages",
    skills: ["JavaScript", "TypeScript", "Python", "Java", "Bash"],
    proficiency: 90,
  },
  {
    category: "CI/CD",
    description: "Continuous integration tools",
    skills: ["Jenkins", "GitHub Actions", "GitLab CI", "CircleCI", "Docker"],
    proficiency: 87,
  },
  {
    category: "Test Management",
    description: "Planning and tracking",
    skills: ["Jira", "TestRail", "Zephyr", "qTest", "Azure DevOps"],
    proficiency: 93,
  },
  {
    category: "Security Testing",
    description: "Vulnerability assessment",
    skills: ["OWASP ZAP", "Burp Suite", "SonarQube", "Snyk", "Checkmarx"],
    proficiency: 82,
  },
  {
    category: "Mobile Testing",
    description: "iOS and Android testing",
    skills: ["Appium", "Espresso", "XCTest", "BrowserStack", "Sauce Labs"],
    proficiency: 85,
  },
  {
    category: "Database",
    description: "Database testing and validation",
    skills: ["SQL", "PostgreSQL", "MongoDB", "Redis", "MySQL"],
    proficiency: 84,
  },
  {
    category: "Observability",
    description: "Monitoring and analytics",
    skills: ["DataDog", "New Relic", "Grafana", "Sentry", "Splunk"],
    proficiency: 86,
  },
]
