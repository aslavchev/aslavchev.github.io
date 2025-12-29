/**
 * YOUR PERSONAL PORTFOLIO DATA
 *
 * INSTRUCTIONS:
 * 1. Copy this file to: lib/portfolio-data.ts
 * 2. Replace ALL CAPS placeholders with your actual information
 * 3. Delete examples you don't need
 * 4. Add more projects/experience as needed
 *
 * This is your ONLY file for personal content.
 * DO NOT edit components - just update this file!
 */

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

// ============================================
// YOUR PERSONAL INFORMATION
// ============================================

export const personalInfo = {
  name: "YOUR FULL NAME",
  title: "YOUR JOB TITLE", // e.g., "Senior QA Engineer" or "Full-Stack Developer"
  tagline: "YOUR ONE-LINE PITCH", // e.g., "Building Quality at Scale" or "Crafting Scalable Web Applications"
  email: "YOUR-EMAIL@DOMAIN.COM",
  location: "YOUR CITY, COUNTRY", // e.g., "Sofia, Bulgaria" or "Remote"
  yearsOfExperience: "X+", // e.g., "5+" or "8+"

  // YOUR BIO (2-3 sentences about you)
  bio: "REPLACE THIS: Write 2-3 sentences about your expertise, what you specialize in, and what drives you professionally. Focus on value you bring and technologies you love working with.",
}

// ============================================
// YOUR SOCIAL LINKS
// ============================================

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/YOUR-USERNAME", // Replace YOUR-USERNAME
    icon: "github"
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/YOUR-PROFILE", // Replace YOUR-PROFILE
    icon: "linkedin"
  },
  // Add more if needed (Twitter, Portfolio, etc.)
  // { name: "Twitter", url: "https://twitter.com/YOUR-HANDLE", icon: "twitter" },
]

// ============================================
// FEATURED PROJECTS (2-4 of your best work)
// ============================================

export const featuredProjects: Project[] = [
  {
    title: "PROJECT NAME #1",
    description: "Brief description of what you built and the problem it solved. Focus on impact and technologies used.",
    image: "/your-project-screenshot-1.jpg", // Add screenshot to /public folder
    metric: "70% Performance Improvement", // Key metric or achievement
    badge: "Featured", // Optional: "Open Source", "Client Work", etc.
    tools: ["React", "TypeScript", "PostgreSQL"], // Technologies used
  },
  {
    title: "PROJECT NAME #2",
    description: "Another project description highlighting your skills and the value delivered.",
    image: "/your-project-screenshot-2.jpg",
    metric: "10K+ Users",
    tools: ["Next.js", "Node.js", "AWS"],
  },
  // Add 1-2 more featured projects
  // Copy the structure above and fill with your data
]

// ============================================
// ALL PROJECTS (Detailed case studies)
// ============================================

export const projects: Project[] = [
  {
    title: "DETAILED PROJECT #1",
    description: "Comprehensive description of a major project. Explain the challenge, your approach, technologies used, and measurable outcomes.",
    image: "/project-detail-1.jpg",
    metrics: [
      "Specific metric #1 (e.g., 'Reduced load time by 60%')",
      "Specific metric #2 (e.g., 'Increased test coverage from 45% to 92%')",
      "Specific metric #3 (e.g., 'Deployed to 100K+ users')",
    ],
    tools: ["Technology 1", "Technology 2", "Technology 3", "Technology 4"],
  },
  {
    title: "DETAILED PROJECT #2",
    description: "Another detailed project showcasing different skills or domain expertise.",
    image: "/project-detail-2.jpg",
    metrics: [
      "Impact metric #1",
      "Impact metric #2",
      "Impact metric #3",
    ],
    tools: ["Tech 1", "Tech 2", "Tech 3"],
  },
  // Add 3-5 total projects (mix of work, side projects, open source)
]

// ============================================
// PROFESSIONAL EXPERIENCE
// ============================================

export const experiences: Experience[] = [
  {
    title: "YOUR JOB TITLE",
    company: "COMPANY NAME",
    period: "Month YEAR - Present", // e.g., "Jan 2023 - Present"
    description: "Brief overview of your role and main responsibilities.",
    achievements: [
      "Key achievement #1 with measurable impact",
      "Key achievement #2 showing technical expertise",
      "Key achievement #3 demonstrating leadership/initiative",
      "Key achievement #4 (if applicable)",
    ],
  },
  {
    title: "PREVIOUS JOB TITLE",
    company: "PREVIOUS COMPANY",
    period: "Month YEAR - Month YEAR", // e.g., "Mar 2020 - Dec 2022"
    description: "What you did in this role.",
    achievements: [
      "Achievement #1",
      "Achievement #2",
      "Achievement #3",
    ],
  },
  // Add more experience as needed
  // Show career progression
]

// ============================================
// TECHNICAL SKILLS (For job applications)
// ============================================

export const skills: Skill[] = [
  {
    category: "YOUR PRIMARY SKILL CATEGORY", // e.g., "Test Automation", "Frontend Development"
    description: "Brief description of your expertise in this area",
    skills: ["Skill 1", "Skill 2", "Skill 3", "Skill 4"],
    proficiency: 90, // 0-100 (be honest!)
  },
  {
    category: "SECONDARY SKILL CATEGORY", // e.g., "Backend Development", "Performance Testing"
    description: "Your experience level in this domain",
    skills: ["Skill 1", "Skill 2", "Skill 3"],
    proficiency: 85,
  },
  {
    category: "TOOLS & PLATFORMS",
    description: "Development tools and platforms you work with",
    skills: ["Tool 1", "Tool 2", "Tool 3", "Tool 4", "Tool 5"],
    proficiency: 80,
  },
  // Add 3-5 skill categories
  // Focus on job-relevant skills
]

// ============================================
// CERTIFICATIONS (Optional but valuable for jobs)
// ============================================

export const certifications = [
  {
    name: "CERTIFICATION NAME",
    issuer: "ISSUING ORGANIZATION",
    date: "Month YEAR",
    credential: "https://link-to-credential.com", // Optional
  },
  // Add relevant certifications
  // AWS, Google Cloud, Microsoft, ISTQB, etc.
]

// ============================================
// EDUCATION
// ============================================

export const education = [
  {
    degree: "YOUR DEGREE", // e.g., "Bachelor of Science in Computer Science"
    school: "UNIVERSITY NAME",
    year: "YEAR", // e.g., "2020"
    location: "CITY, COUNTRY",
  },
  // Add relevant education
]

// ============================================
// TIPS FOR FILLING THIS OUT
// ============================================

/*
PROJECT DESCRIPTIONS:
- Start with the problem/challenge
- Explain your solution
- Highlight technologies used
- Quantify impact (%, $, time saved)
- Show before/after metrics

METRICS THAT IMPRESS:
- Performance: "70% faster", "Reduced load time from 4s to 1.2s"
- Quality: "Increased coverage from 45% to 92%"
- Scale: "Handling 10K+ daily users", "Processing 1M+ requests/day"
- Business: "Saved $50K/year", "Reduced deployment time 60%"
- Team: "Led team of 3", "Mentored 5 junior developers"

SKILLS TO EMPHASIZE:
- Technologies listed in job descriptions you're targeting
- Full stack: Frontend + Backend + DevOps
- Modern: React, TypeScript, Node.js, Docker, AWS
- Testing: Jest, Playwright, Cypress (for QA roles)

SOCIAL PROOF:
- GitHub: Active repos, contributions, stars
- LinkedIn: Recommendations, endorsements
- Blog/Portfolio: Technical writing (optional)
*/
