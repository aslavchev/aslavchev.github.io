export interface Project {
  title: string
  description: string
  image: string
  metrics?: string[]
  metric?: string
  badge?: string
  tools?: string[]
}

export interface Experience {
  title: string
  company: string
  period: string
  description: string
  achievements: string[]
}

export interface Skill {
  category: string
  description: string
  skills: string[]
  proficiency: number
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}

export const personalInfo = {
  name: "Alex Rivera",
  title: "Senior QA Engineer",
  tagline: "Building Quality at Scale",
  email: "contact@aslavchev-qa.dev",
  location: "San Francisco, CA",
  yearsOfExperience: "8+",
  bio: "Senior Quality Assurance Engineer specializing in test automation, performance testing, and quality at scale. Passionate about delivering flawless software through comprehensive testing strategies and continuous improvement.",
}

export const socialLinks: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/aslavchev", icon: "github" },
  { name: "LinkedIn", url: "https://linkedin.com/in/aslavchev", icon: "linkedin" },
]

export const featuredProjects: Project[] = [
  {
    title: "E-Commerce Test Automation Suite",
    description: "Comprehensive automation framework covering 500+ test scenarios",
    image: "/automation-dashboard.jpg",
    metric: "Reduced defects 50%",
    badge: "Automation",
  },
  {
    title: "API Testing Framework",
    description: "Robust REST API testing solution with 95% code coverage",
    image: "/api-testing.jpg",
    metric: "10M+ requests/day",
    badge: "Performance",
  },
  {
    title: "Mobile App QA Strategy",
    description: "Cross-platform testing for iOS and Android applications",
    image: "/mobile-testing.jpg",
    metric: "4.8★ app rating",
    badge: "Mobile",
  },
  {
    title: "CI/CD Quality Gates",
    description: "Automated quality checks integrated into deployment pipelines",
    image: "/cicd-pipeline.jpg",
    metric: "3x faster releases",
    badge: "DevOps",
  },
]

export const projects: Project[] = [
  {
    title: "Enterprise E-Commerce Testing",
    description:
      "Led QA for a major e-commerce platform serving 10M+ monthly users. Designed and implemented comprehensive test automation strategy covering web, mobile, and API layers.",
    metrics: [
      "Identified 150+ critical bugs pre-production",
      "Reduced regression testing time by 70%",
      "Achieved 85% automation coverage",
    ],
    tools: ["Selenium", "Cypress", "Postman", "Jenkins"],
    image: "/ecommerce-testing.jpg",
  },
  {
    title: "Financial Services API Testing",
    description:
      "Built robust API testing framework for fintech application handling millions of transactions daily. Implemented contract testing and performance benchmarking.",
    metrics: [
      "Validated 200+ API endpoints",
      "Detected performance issues before production",
      "Automated security compliance checks",
    ],
    tools: ["Postman", "JMeter", "K6", "GitHub Actions"],
    image: "/api-testing-dashboard.jpg",
  },
  {
    title: "Healthcare Mobile App QA",
    description:
      "Comprehensive mobile testing strategy for HIPAA-compliant healthcare application across iOS and Android platforms.",
    metrics: [
      "Maintained 4.8★ rating across platforms",
      "Zero critical bugs in production for 6 months",
      "Automated 90% of regression scenarios",
    ],
    tools: ["Appium", "BrowserStack", "TestRail", "Jira"],
    image: "/mobile-app-testing.jpg",
  },
  {
    title: "CI/CD Quality Pipeline",
    description:
      "Designed and implemented quality gates in CI/CD pipeline for SaaS platform, ensuring code quality and test coverage at every stage.",
    metrics: [
      "Reduced production defects by 55%",
      "Accelerated release cycle from bi-weekly to daily",
      "Integrated automated security scans",
    ],
    tools: ["Jenkins", "Docker", "SonarQube", "Selenium"],
    image: "/cicd-pipeline-dashboard.jpg",
  },
]

export const experience: Experience[] = [
  {
    title: "Senior QA Engineer",
    company: "TechCorp Inc.",
    period: "2020 - Present",
    description: "Leading quality assurance initiatives for enterprise SaaS platform",
    achievements: [
      "Increased test automation coverage from 45% to 92%",
      "Reduced production defects by 60% through comprehensive testing strategy",
      "Mentored team of 5 QA engineers",
      "Implemented CI/CD quality gates reducing deployment time by 40%",
    ],
  },
  {
    title: "QA Engineer",
    company: "FinTech Solutions",
    period: "2018 - 2020",
    description: "Developed testing frameworks for financial services applications",
    achievements: [
      "Built API testing framework handling 10M+ daily transactions",
      "Achieved 95% test coverage on critical payment flows",
      "Implemented performance testing reducing API response time by 50%",
      "Collaborated with security team on vulnerability assessments",
    ],
  },
  {
    title: "Junior QA Engineer",
    company: "Mobile Apps Co.",
    period: "2016 - 2018",
    description: "Focused on mobile application testing across iOS and Android",
    achievements: [
      "Executed 500+ test cases for mobile e-commerce app",
      "Maintained 4.7★ average app store rating",
      "Implemented automated regression suite reducing testing time by 70%",
      "Coordinated with developers to resolve 200+ bugs pre-launch",
    ],
  },
]

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
