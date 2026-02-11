import type { Project } from "./types"

export const featuredProjects: Project[] = [
  {
    title: "SauceDemo Selenium Framework",
    description: "E-commerce UI test automation framework with risk-based test selection and documented architectural decisions",
    image: "/saucedemo-automation.webp",
    metric: "100% pass rate",
    badge: "Automation",
    tools: ["Java", "Selenium", "TestNG", "Allure", "GitHub Actions"],
    industries: ["E-Commerce"],
    githubUrl: "https://github.com/aslavchev/saucedemo-selenium-framework",
  },
  {
    title: "DummyJSON API Test Framework",
    description: "API test automation framework covering authentication and CRUD endpoints with CI/CD and live reporting",
    image: "/dummyjson-api-testing.webp",
    metric: "100% pass rate",
    badge: "Automation",
    tools: ["Java", "REST Assured", "TestNG", "Allure"],
    industries: ["E-Commerce"],
    githubUrl: "https://github.com/aslavchev/dummyjson-restassured-framework",
    liveUrl: "https://aslavchev.github.io/dummyjson-restassured-framework/",
    liveLabel: "Allure Report",
  },
  {
    title: "Quality Engineer Portfolio",
    description: "Professional portfolio website showcasing QA expertise, built with modern Next.js, React, and TypeScript",
    image: "/aslavchev-portfolio.webp",
    metric: "Lighthouse 100/100",
    badge: "Web Development",
    tools: ["Next.js", "React", "TypeScript", "Tailwind"],
    industries: ["QA/Tech"],
    githubUrl: "https://github.com/aslavchev/aslavchev.github.io",
    liveUrl: "https://aslavchev.com/",
  },
  {
    title: "Soma Holistic Studio",
    description: "Professional wellness studio website built with TypeScript and modern web technologies",
    image: "/somaholistic-studio.webp",
    metric: "Live on Cloudflare",
    badge: "Web Development",
    tools: ["TypeScript", "Next.js", "React"],
    industries: ["Wellness", "Healthcare"],
    liveUrl: "https://somaholistic.studio/",
  },
  {
    title: "QA Fundamentals 11-Week Program",
    description: "Comprehensive QA training curriculum focused on fundamentals and process mastery for aspiring quality engineers",
    image: "/qa-mentoring-program.webp",
    metric: "11-week curriculum",
    badge: "Education",
    tools: ["QA Process", "Testing Fundamentals", "Best Practices"],
    industries: ["Education", "QA/Tech"],
    githubUrl: "https://github.com/aslavchev/qa-fundamentals-11weeks",
  },
]

export const projects: Project[] = [
  {
    title: "SauceDemo Selenium Framework",
    description:
      "Selenium test automation framework with risk-based test selection, Allure reporting, and documented architectural decisions.",
    metrics: [
      "100% pass rate",
      "Risk-based test selection",
      "Allure reporting integration",
    ],
    tools: ["Java", "Selenium", "TestNG", "Allure", "GitHub Actions"],
    industries: ["E-Commerce"],
    image: "/saucedemo-automation.webp",
    badge: "Automation",
    githubUrl: "https://github.com/aslavchev/saucedemo-selenium-framework",
  },
  {
    title: "DummyJSON API Test Framework",
    description:
      "API test automation framework covering authentication and CRUD endpoints against the DummyJSON API with live Allure reporting.",
    metrics: [
      "100% pass rate across 12 API tests",
      "Live Allure report on GitHub Pages",
      "CI/CD with GitHub Actions",
    ],
    tools: ["Java", "REST Assured", "TestNG", "Allure", "Maven", "GitHub Actions"],
    industries: ["E-Commerce"],
    image: "/dummyjson-api-testing.webp",
    badge: "Automation",
    githubUrl: "https://github.com/aslavchev/dummyjson-restassured-framework",
    liveUrl: "https://aslavchev.github.io/dummyjson-restassured-framework/",
    liveLabel: "Allure Report",
  },
  {
    title: "Quality Engineer Portfolio",
    description:
      "Professional portfolio website showcasing QA expertise, built with modern Next.js, React, TypeScript, and Tailwind CSS.",
    metrics: [
      "Lighthouse 100/100",
      "WCAG 2.1 AA compliant",
      "Static export on Cloudflare",
    ],
    tools: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    industries: ["QA/Tech"],
    image: "/aslavchev-portfolio.webp",
    badge: "Web Development",
    githubUrl: "https://github.com/aslavchev/aslavchev.github.io",
    liveUrl: "https://aslavchev.com/",
  },
  {
    title: "Soma Holistic Studio",
    description:
      "Professional wellness studio website built with TypeScript and modern web technologies, deployed on Cloudflare.",
    metrics: [
      "Live production website",
      "Bilingual support",
      "Booking wizard integration",
    ],
    tools: ["TypeScript", "React", "Vite", "Tailwind CSS"],
    industries: ["Wellness", "Healthcare"],
    image: "/somaholistic-studio.webp",
    badge: "Web Development",
    liveUrl: "https://somaholistic.studio/",
  },
  {
    title: "QA Fundamentals 11-Week Program",
    description:
      "Comprehensive QA training curriculum focused on fundamentals and process mastery for aspiring quality engineers.",
    metrics: [
      "Structured 11-week curriculum",
      "Process-oriented approach",
      "MIT licensed educational content",
    ],
    tools: ["QA Process", "Testing Fundamentals", "Best Practices"],
    industries: ["Education", "QA/Tech"],
    image: "/qa-mentoring-program.webp",
    badge: "Education",
    githubUrl: "https://github.com/aslavchev/qa-fundamentals-11weeks",
  },
]
