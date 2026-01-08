/**
 * Structured Data (Schema.org JSON-LD)
 * Helps search engines understand portfolio content
 * Enables rich search results and knowledge graph entries
 */

import { personalInfo, socialLinks } from "./data/personal"
import { experience } from "./data/experience"
import { education } from "./data/education"

const githubUrl = socialLinks.find((link) => link.name === "GitHub")?.url || "https://github.com/aslavchev"
const linkedinUrl = socialLinks.find((link) => link.name === "LinkedIn")?.url || "https://www.linkedin.com/in/aslavchev/"

/**
 * Main Person Schema
 * Represents Alex Slavchev as a professional entity
 */
export function getPersonSchema(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}#person`,
    name: personalInfo.name,
    givenName: "Alex",
    familyName: "Slavchev",
    alternateName: "Alexander Slavchev",

    // Professional Identity
    jobTitle: personalInfo.title,
    hasOccupation: {
      "@type": "Occupation",
      name: "Senior Quality Assurance Engineer",
      occupationalCategory: "15-1253.00", // SOC code for Software Quality Assurance Engineers
      skills: [
        "Test Automation",
        "Selenium",
        "Playwright",
        "Cypress",
        "Performance Testing",
        "API Testing",
        "Mobile Testing",
        "CI/CD",
        "Java",
        "TypeScript",
        "Python",
        "Quality Engineering",
        "Test Strategy",
        "Agile Testing",
        "DevOps",
      ],
      responsibilities: [
        "Leading quality assurance initiatives for enterprise applications",
        "Designing and implementing comprehensive test automation frameworks",
        "Mentoring junior QA engineers and establishing testing best practices",
        "Ensuring software quality at scale for 100K+ users",
      ],
    },

    // Contact Information
    email: personalInfo.email,
    telephone: "+359886449904",

    // Location
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sofia",
      addressCountry: "BG",
    },

    // Online Presence
    url: baseUrl,
    image: `${baseUrl}/professional-headshot.webp`,
    sameAs: [
      linkedinUrl,
      githubUrl,
    ],

    // Professional Summary
    description: personalInfo.bio,
    knowsAbout: [
      "Quality Assurance",
      "Test Automation",
      "Software Testing",
      "Performance Testing",
      "API Testing",
      "Mobile Testing",
      "Continuous Integration",
      "Continuous Deployment",
      "Agile Methodologies",
      "Test-Driven Development",
      "Behavior-Driven Development",
      "Cloud Computing",
      "Virtualization",
      "DevOps",
    ],

    // Skills
    knowsLanguage: [
      {
        "@type": "Language",
        name: "English",
        alternateName: "en",
      },
      {
        "@type": "Language",
        name: "Bulgarian",
        alternateName: "bg",
      },
      {
        "@type": "Language",
        name: "Spanish",
        alternateName: "es",
      },
    ],

    // Work Experience
    worksFor: {
      "@type": "Organization",
      name: experience[0].company,
      url: "https://www.tumba.solutions/",
    },

    // Alumni
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "Plovdiv University \"Paisii Hilendarski\"",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Plovdiv",
          addressCountry: "BG",
        },
      },
      {
        "@type": "EducationalOrganization",
        name: "Cisco Academy \"Future 21 Century\"",
      },
    ],

    // Awards & Achievements
    award: [
      "Zero-critical-failure track record across 18+ years",
      "Led quality assurance for 100K+ user applications",
      "CCNA Certification",
    ],
  }
}

/**
 * Work Experience Schema
 * Detailed employment history
 */
export function getWorkExperienceSchema(baseUrl: string) {
  return experience.map((exp, index) => {
    // Parse period to get start and end dates
    const [startStr, endStr] = exp.period.split(" - ")
    const startDate = parseDate(startStr)
    const endDate = endStr?.toLowerCase() === "present" || endStr?.toLowerCase().includes("2025") ? new Date().toISOString().split('T')[0] : parseDate(endStr)

    return {
      "@context": "https://schema.org",
      "@type": "OrganizationRole",
      "@id": `${baseUrl}#experience-${index}`,
      roleName: exp.title,
      startDate,
      endDate,

      // The organization
      organization: {
        "@type": "Organization",
        name: exp.company,
        ...(exp.companyLogo && { logo: `${baseUrl}${exp.companyLogo}` }),
      },

      // Role description
      description: exp.description,

      // Achievements as itemListElement
      ...(exp.achievements.length > 0 && {
        result: exp.achievements.map(achievement => ({
          "@type": "Thing",
          name: achievement,
        })),
      }),
    }
  })
}

/**
 * Educational Background Schema
 */
export function getEducationSchema(baseUrl: string) {
  return education.map((edu, index) => {
    const [startStr, endStr] = edu.period.split(" - ")
    const startDate = parseDate(startStr)
    const endDate = endStr ? parseDate(endStr) : startDate

    // Determine credential category
    let credentialType = "Course"
    if (edu.type === "degree") credentialType = "Degree"
    if (edu.type === "certification") credentialType = "Certificate"

    return {
      "@context": "https://schema.org",
      "@type": "EducationalOccupationalCredential",
      "@id": `${baseUrl}#education-${index}`,
      credentialCategory: credentialType,
      name: edu.degree,
      description: edu.description,

      // Educational institution
      recognizedBy: {
        "@type": "EducationalOrganization",
        name: edu.school,
      },

      // Dates
      ...(startDate && { dateCreated: startDate }),
      ...(endDate && { validFrom: endDate }),
    }
  })
}

/**
 * Website Schema
 * Represents the portfolio website itself
 */
export function getWebsiteSchema(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${baseUrl}#website`,
    url: baseUrl,
    name: `${personalInfo.name} - ${personalInfo.title}`,
    description: personalInfo.bio,
    author: {
      "@id": `${baseUrl}#person`,
    },
    mainEntity: {
      "@id": `${baseUrl}#person`,
    },
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${baseUrl}#portfolio`,
      name: `${personalInfo.name} Portfolio`,
      url: baseUrl,
    },
  }
}

/**
 * Breadcrumb Schema
 * Navigation structure
 */
export function getBreadcrumbSchema(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${baseUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${baseUrl}#home`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${baseUrl}#featured`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Experience",
        item: `${baseUrl}#experience`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Education",
        item: `${baseUrl}#education`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Tech Stack",
        item: `${baseUrl}#stack`,
      },
      {
        "@type": "ListItem",
        position: 6,
        name: "Contact",
        item: `${baseUrl}#contact`,
      },
    ],
  }
}

/**
 * Combined Structured Data
 * All schemas in a single graph
 */
export function getAllStructuredData(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      getPersonSchema(baseUrl),
      ...getWorkExperienceSchema(baseUrl),
      ...getEducationSchema(baseUrl),
      getWebsiteSchema(baseUrl),
      getBreadcrumbSchema(baseUrl),
    ],
  }
}

/**
 * Helper: Parse date string to ISO format
 */
function parseDate(dateStr?: string): string {
  if (!dateStr) return ""

  // Handle various date formats
  // "January 2016" -> "2016-01"
  // "Feb 2025" -> "2025-02"
  // "2004" -> "2004"

  const months: Record<string, string> = {
    january: "01", jan: "01",
    february: "02", feb: "02",
    march: "03", mar: "03",
    april: "04", apr: "04",
    may: "05",
    june: "06", jun: "06",
    july: "07", jul: "07",
    august: "08", aug: "08",
    september: "09", sep: "09",
    october: "10", oct: "10",
    november: "11", nov: "11",
    december: "12", dec: "12",
  }

  const cleaned = dateStr.trim().toLowerCase()

  // Just a year: "2004"
  if (/^\d{4}$/.test(cleaned)) {
    return cleaned
  }

  // Month + Year: "January 2016"
  const parts = cleaned.split(/\s+/)
  if (parts.length === 2) {
    const [monthStr, year] = parts
    const month = months[monthStr]
    if (month && year) {
      return `${year}-${month}`
    }
  }

  return ""
}
