/**
 * Certifications Data
 * Professional certifications, credentials, and badges
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
}

export const certifications: Certification[] = [
  {
    id: "1",
    name: "ISTQB Certified Tester - Foundation Level",
    issuer: "International Software Testing Qualifications Board",
    issueDate: "2015",
    credentialUrl: "https://www.istqb.org/",
    description: "Foundation-level certification covering fundamental testing concepts, techniques, and best practices",
    skills: ["Software Testing", "Test Planning", "Test Design", "Quality Assurance"],
  },
  {
    id: "2",
    name: "AWS Certified Developer - Associate",
    issuer: "Amazon Web Services",
    issueDate: "2022",
    expiryDate: "2025",
    credentialUrl: "https://aws.amazon.com/certification/",
    description: "Demonstrates expertise in developing and maintaining AWS-based applications",
    skills: ["AWS", "Cloud Computing", "CI/CD", "DevOps"],
  },
  {
    id: "3",
    name: "Certified Selenium Professional",
    issuer: "Selenium Testing Certification",
    issueDate: "2018",
    credentialUrl: "https://www.selenium.dev/",
    description: "Advanced certification in Selenium WebDriver automation testing",
    skills: ["Selenium", "Test Automation", "WebDriver", "Java"],
  },
  {
    id: "4",
    name: "Certified ScrumMaster (CSM)",
    issuer: "Scrum Alliance",
    issueDate: "2016",
    expiryDate: "2026",
    credentialUrl: "https://www.scrumalliance.org/",
    description: "Professional certification in Scrum framework and Agile methodologies",
    skills: ["Scrum", "Agile", "Team Collaboration", "Project Management"],
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
 * Get certifications by issuer
 */
export function getCertificationsByIssuer(issuer: string): Certification[] {
  return certifications.filter((cert) => cert.issuer === issuer)
}
