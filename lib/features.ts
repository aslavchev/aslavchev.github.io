/**
 * Feature Flags Configuration - JOB PORTFOLIO MODE
 * Toggle features on/off easily without touching component code
 *
 * CURRENT MODE: Job Applications (FAANG-ready)
 * To add Freelance mode later: See FEATURES-AND-CONTENT.md
 */

export const features = {
  // ============================================
  // CORE SECTIONS (Job-Optimized)
  // ============================================
  showHero: true, // ✅ Essential - First impression
  showFeaturedProjects: true, // ✅ Essential - All projects showcased here
  showProjects: false, // 🔜 Re-enable for deep-dive case studies (template in /local/templates/case-study-template.md)
  showExperience: true, // ✅ Essential - Career progression
  showEducation: true, // ✅ Essential - Academic background
  showStack: true, // ✅ Essential - Technical skills
  showTestimonials: true, // ✅ Essential - Social proof and credibility
  showContact: true, // ✅ Essential - Easy to reach you

  // ============================================
  // QA-SPECIFIC SECTIONS (Enable when data ready)
  // ============================================
  showQAMetrics: false, // 🔜 Enable when you have real metrics data
  showTestingTools: false, // ❌ Disabled - no real tools data yet
  showLiveQualityDemo: false, // 🔜 Enable after Lighthouse audit (Phase 4)
  showTestStrategy: false, // 🔜 Enable when you write testing philosophy

  // ============================================
  // OPTIONAL SECTIONS (Not needed for job applications)
  // ============================================
  showThoughts: false, // 🔜 Enable if you have blog/technical writing
  showNewsletter: false, // ❌ Not relevant for jobs
  showFeedAndServices: false, // ❌ Freelance-only (add later if needed)

  // ============================================
  // INTERACTIVE FEATURES
  // ============================================
  showChatbot: false, // ❌ Needs API key + costs money (optional for jobs)

  // ============================================
  // NAVIGATION
  // ============================================
  showMobileNav: true, // ✅ Essential - Mobile responsive
  showSidebar: true, // ✅ Essential - Desktop navigation

  // ============================================
  // ANALYTICS & TRACKING
  // ============================================
  enableAnalytics: true, // ✅ Track portfolio visitors (Vercel Analytics)
} as const

/**
 * Check if a feature is enabled
 */
export function isFeatureEnabled(feature: keyof typeof features): boolean {
  return features[feature]
}

/**
 * Get all enabled features
 */
export function getEnabledFeatures(): string[] {
  return Object.entries(features)
    .filter(([_, enabled]) => enabled)
    .map(([feature]) => feature)
}

/**
 * Get all disabled features
 */
export function getDisabledFeatures(): string[] {
  return Object.entries(features)
    .filter(([_, enabled]) => !enabled)
    .map(([feature]) => feature)
}
