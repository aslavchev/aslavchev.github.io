/**
 * Testimonials Data
 * Real testimonials from LinkedIn recommendations
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
    name: "Flavio Kruger",
    role: "Engineering Manager",
    company: "Super (Ex-Glovo, Dow Jones)",
    relationship: "colleague",
    content:
      "I had the opportunity of working with Aleksandar on the Candybar/Tout product feature at Dow Jones - Wall Street Journal. As our QA Analyst, he consistently delivered thorough testing for every PR code change, ensuring our product met all requirements.\n\nI highly appreciate Aleksandar's responsiveness. He maintained open communication with the team and readily handled impromptu QA requests that unblocked our team. His technical QA skills were complemented by his positive attitude, bringing good energy to our collaboration.\n\nI'm thankful for his contributions to our team and the quality he brought to our product. Working with Aleksandar was truly a smooth experience.",
    linkedinUrl: "https://www.linkedin.com/in/flavio-kruger/",
    date: "April 2, 2025",
  },
  {
    id: "2",
    name: "Cane Allesta",
    role: "Apple Development with AI",
    company: "Dow Jones - Wall Street Journal",
    relationship: "colleague",
    content:
      "I had the pleasure of working with Aleksandar on several projects, and I was always impressed by their attention to detail and strong QA skills. Every release was smoother thanks to their thorough testing and proactive approach.\n\nAleksandar was always quick to respond, open to feedback, and ready to jump in whenever the team needed support. Their positive attitude made collaboration easy and enjoyable.\n\nI truly appreciated having Aleksandar on the team and would gladly work with them again in the future.",
    linkedinUrl: "https://www.linkedin.com/in/cane-allesta-4a0b54161",
    date: "April 3, 2025",
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
