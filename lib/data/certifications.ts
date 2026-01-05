/**
 * Certifications Data
 * Professional certifications organized by QA/Tech skills and Domain Expertise
 */

export interface Certification {
  id: string
  name: string
  issuer: string
  issueDate: string
  expiryDate?: string
  credentialId?: string
  credentialUrl?: string
  logo?: string
  skills?: string[]
  description?: string
  category?: "qa-tech" | "domain"
}

export const certifications: Certification[] = [
  // QA/Tech Certifications
  {
    id: "1",
    name: "DevOps Essentials",
    issuer: "Pragmatic IT Learning & Outsourcing Center",
    issueDate: "June 2025",
    credentialId: "202025228",
    credentialUrl: "https://www.linkedin.com/in/aslavchev/details/certifications/",
    category: "qa-tech",
    description: "Essential DevOps practices including CI/CD, Docker, and automation",
    skills: ["DevOps", "Docker", "CI/CD", "Automation"],
  },
  {
    id: "2",
    name: "Web Services Testing (Foundation Level)",
    issuer: "Pragmatic IT Learning & Outsourcing Center",
    issueDate: "December 2021",
    credentialId: "Ref. N. 92021185",
    credentialUrl: "https://www.linkedin.com/in/aslavchev/details/certifications/",
    category: "qa-tech",
    description: "Foundation-level certification in REST API and web services testing",
    skills: ["API Testing", "REST", "Web Services", "Postman"],
  },
  {
    id: "3",
    name: "Automated Testing (Foundation Level)",
    issuer: "Pragmatic IT Learning & Outsourcing Center",
    issueDate: "May 2021",
    credentialId: "42021833",
    credentialUrl: "https://www.linkedin.com/in/aslavchev/details/certifications/",
    category: "qa-tech",
    description: "Foundation-level certification in test automation with Selenium and Java",
    skills: ["Test Automation", "Selenium", "Java", "WebDriver"],
  },

  // Domain Expertise Certifications
  {
    id: "4",
    name: "Commodities Futures Trading",
    issuer: "Trading Advantage",
    issueDate: "November 2014",
    credentialUrl: "https://www.linkedin.com/in/aslavchev/details/certifications/",
    category: "domain",
    description: "Professional trading certification in commodities futures markets",
    skills: ["Trading Platforms", "Financial Systems", "Market Analysis"],
  },
  {
    id: "5",
    name: "Currencies Futures Trading",
    issuer: "Trading Advantage",
    issueDate: "November 2014",
    credentialUrl: "https://www.linkedin.com/in/aslavchev/details/certifications/",
    category: "domain",
    description: "Professional trading certification in currency futures markets",
    skills: ["Forex Trading", "Financial Systems", "Payment Systems"],
  },
  {
    id: "6",
    name: "Bulgarian Football Union C License",
    issuer: "Bulgarian Football Union",
    issueDate: "May 2011",
    expiryDate: "June 2027",
    credentialId: "00924",
    credentialUrl: "https://www.linkedin.com/in/aslavchev/details/certifications/",
    category: "domain",
    description: "Professional football coaching license for youth development and team management",
    skills: ["Sports Coaching", "Youth Development", "Team Management"],
  },
  {
    id: "7",
    name: "Prozone Performance Analysis - Level 1",
    issuer: "Prozone Sports Ltd",
    issueDate: "February 2013",
    credentialUrl: "https://www.linkedin.com/in/aslavchev/details/certifications/",
    category: "domain",
    description: "Professional certification in sports performance analysis and data-driven coaching",
    skills: ["Sports Analytics", "Performance Metrics", "Data Analysis"],
  },
]

/**
 * Get active (non-expired) certifications
 */
export function getActiveCertifications(): Certification[] {
  const now = new Date()
  return certifications.filter((cert) => {
    if (!cert.expiryDate) return true
    const expiry = new Date(cert.expiryDate)
    return expiry > now
  })
}

/**
 * Get certifications by category
 */
export function getCertificationsByCategory(category: "qa-tech" | "domain"): Certification[] {
  return certifications.filter((cert) => cert.category === category)
}

/**
 * Get certifications by issuer
 */
export function getCertificationsByIssuer(issuer: string): Certification[] {
  return certifications.filter((cert) => cert.issuer === issuer)
}
