/**
 * Testimonials Data
 * Real testimonials from colleagues, managers, and clients
 *
 * TODO: Replace with actual LinkedIn recommendations
 * To get real recommendations:
 * 1. Go to your LinkedIn profile → Recommendations section
 * 2. Copy the text from each recommendation
 * 3. Update the name, role, company, and content fields below
 * 4. Add the person's LinkedIn profile URL to linkedinUrl field
 * 5. Set the correct relationship (manager, colleague, client, direct-report)
 */

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  companyLogo?: string
  image?: string
  content: string
  relationship: "manager" | "colleague" | "client" | "direct-report"
  linkedinUrl?: string
  date?: string
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "John Anderson",
    role: "Engineering Manager",
    company: "Tumba Solutions",
    relationship: "manager",
    content:
      "Alex is one of the most thorough QA engineers I've worked with. His attention to detail and systematic approach to testing has prevented countless production issues. He doesn't just find bugs—he understands the business impact and prioritizes accordingly.",
    linkedinUrl: "https://www.linkedin.com/",
  },
  {
    id: "2",
    name: "Maria Garcia",
    role: "Senior Software Engineer",
    company: "Tumba Solutions",
    relationship: "colleague",
    content:
      "Working with Alex has made me a better developer. His comprehensive test cases and clear bug reports help us ship with confidence. He's also been instrumental in mentoring our junior QA engineers and building our automation framework from scratch.",
    linkedinUrl: "https://www.linkedin.com/",
  },
  {
    id: "3",
    name: "David Chen",
    role: "Product Manager",
    company: "Tumba Solutions",
    relationship: "colleague",
    content:
      "Alex brings a unique perspective to product development. He thinks like a user, catches edge cases nobody else considers, and provides actionable feedback that improves the final product. His testing has been crucial to our success with 100K+ users.",
    linkedinUrl: "https://www.linkedin.com/",
  },
  {
    id: "4",
    name: "Sarah Williams",
    role: "QA Engineer",
    company: "Tumba Solutions",
    relationship: "direct-report",
    content:
      "Alex is an exceptional mentor. He taught me not just how to test, but how to think about quality systematically. His approach to automation and test strategy has shaped my entire career. I'm grateful for the opportunity to learn from him.",
    linkedinUrl: "https://www.linkedin.com/",
  },
  {
    id: "5",
    name: "Robert Martinez",
    role: "VP of Engineering",
    company: "VMware",
    relationship: "manager",
    content:
      "During his time at VMware, Alex established testing protocols that became the standard across teams. His work on VCloud UI testing infrastructure was critical to our product success. He's the kind of QA engineer every engineering organization needs.",
    linkedinUrl: "https://www.linkedin.com/",
  },
  {
    id: "6",
    name: "Emily Thompson",
    role: "DevOps Engineer",
    company: "Tumba Solutions",
    relationship: "colleague",
    content:
      "Alex's understanding of CI/CD and test automation integration is impressive. He helped us build a robust pipeline that catches issues early and speeds up our deployment cycle. His collaboration between QA and DevOps has been game-changing for our team.",
    linkedinUrl: "https://www.linkedin.com/",
  },
]

/**
 * Get testimonials by relationship type
 */
export function getTestimonialsByRelationship(relationship: Testimonial["relationship"]): Testimonial[] {
  return testimonials.filter((t) => t.relationship === relationship)
}

/**
 * Get featured testimonials (for homepage)
 */
export function getFeaturedTestimonials(count: number = 3): Testimonial[] {
  // Prioritize manager and colleague testimonials for homepage
  const featured = testimonials.filter((t) => t.relationship === "manager" || t.relationship === "colleague")
  return featured.slice(0, count)
}
