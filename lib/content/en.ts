/**
 * English Content
 * All text content for the portfolio (prepared for i18n)
 */

export const content = {
  // Navigation
  nav: {
    skipToContent: "Skip to main content",
    toggleMenu: "Toggle menu",
    home: "Home",
    projects: "Projects",
    caseStudies: "Case Studies",
    experience: "Experience",
    about: "About",
    insights: "Insights",
    thoughts: "Thoughts",
    stack: "Stack",
    contact: "Contact",
    github: "GitHub",
    linkedin: "LinkedIn",
    twitter: "Twitter",
  },

  // Hero Section
  hero: {
    availability: "Available for Opportunities",
    greeting: "Hey, I'm",
    viewProjects: "View Projects",
    getInTouch: "Get in Touch",
  },

  // Featured Projects Section
  featuredProjects: {
    title: "Featured Projects",
    subtitle: "Recent projects and contributions",
    viewDetails: "View Details",
  },

  // QA Metrics Dashboard Section
  qaMetrics: {
    title: "Quality Engineering Impact",
    subtitle: "Data-driven quality metrics across projects",
    testCoverage: "Test Coverage",
    automationRate: "Automation Rate",
    defectsFound: "Defects Found",
    releaseTime: "Release Time",
    togglePeriod: "Toggle time period",
  },

  // Testing Tools Section
  testingTools: {
    title: "Testing Tools & Expertise",
    subtitle: "Comprehensive QA technology stack",
    categories: {
      automation: "Test Automation",
      performance: "Performance Testing",
      api: "API Testing",
      cicd: "CI/CD Integration",
      monitoring: "Monitoring & Observability",
    },
    proficiency: "Proficiency",
  },

  // Live Quality Demo Section
  liveQualityDemo: {
    title: "This Portfolio IS the Test",
    subtitle: "Live quality metrics for this website",
    performance: "Performance",
    accessibility: "Accessibility",
    bestPractices: "Best Practices",
    seo: "SEO",
    runAudit: "Run Lighthouse Audit",
  },

  // Test Strategy Section
  testStrategy: {
    title: "Testing Philosophy & Frameworks",
    subtitle: "Proven strategies for quality at scale",
    testingPyramid: "Testing Pyramid",
    shiftLeft: "Shift-Left Testing",
    qualityGates: "Quality Gates",
    automation: "Automation ROI",
  },

  // Thoughts/Blog Section
  thoughts: {
    title: "Latest Insights",
    subtitle: "Thoughts on quality engineering and testing",
    readMore: "Read More",
    minutesRead: "min read",
  },

  // Newsletter Section
  newsletter: {
    title: "Stay Updated",
    subtitle: "Get the latest insights on quality engineering",
    emailPlaceholder: "Enter your email",
    subscribe: "Subscribe",
    subscribing: "Subscribing...",
    success: "Thanks for subscribing!",
    error: "Something went wrong. Please try again.",
  },

  // Stack Section
  stack: {
    title: "Technology Stack",
    subtitle: "Tools and technologies I work with",
  },

  // Projects Section (Case Studies)
  projects: {
    title: "Case Studies",
    subtitle: "Detailed project breakdowns and achievements",
    keyAchievements: "Key Achievements",
    viewCode: "View Code",
    liveDemoTitle: "Live Demo",
  },

  // Experience Section
  experience: {
    title: "Professional Experience",
    subtitle: "Career journey and key achievements",
    present: "Present",
  },

  // Contact Section
  contact: {
    title: "Get in Touch",
    subtitle: "Let's discuss your quality engineering needs",
    name: "Name",
    namePlaceholder: "Your name",
    email: "Email",
    emailPlaceholder: "your.email@example.com",
    message: "Message",
    messagePlaceholder: "Tell me about your project...",
    send: "Send Message",
    sending: "Sending...",
    success: "Message sent successfully!",
    error: "Failed to send message. Please try again.",
    required: "This field is required",
    invalidEmail: "Please enter a valid email address",
  },

  // Chatbot
  chatbot: {
    title: "Ask me anything",
    placeholder: "Ask about my experience...",
    send: "Send",
    close: "Close chat",
    open: "Open chat",
    thinking: "Thinking...",
    error: "Failed to send message",
    rateLimit: "Too many requests. Please wait a moment.",
  },

  // Theme
  theme: {
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    toggle: "Toggle theme",
  },

  // Error Messages
  errors: {
    somethingWrong: "Something went wrong",
    sectionError: "We encountered an error loading this section",
    description: "Don't worry! This is handled gracefully. You can try refreshing the page or continue browsing.",
    tryAgain: "Try Again",
    pageNotFound: "Page not found",
    goHome: "Go Home",
  },

  // Loading States
  loading: {
    section: "Loading section...",
    chart: "Loading chart...",
    content: "Loading content...",
  },

  // Accessibility
  a11y: {
    menuIcon: "Menu icon",
    closeIcon: "Close icon",
    navigationMenu: "Navigation Menu",
    userAvatar: "User avatar",
    projectImage: "Project screenshot",
    chartDescription: "Interactive chart showing metrics",
  },

  // Meta / SEO (can be used for dynamic meta tags)
  meta: {
    defaultTitle: "Alex Slavchev – Quality Engineer | Quality Engineering at Scale",
    defaultDescription: "Quality Engineer specializing in test automation, API testing, and AI-assisted development.",
    titleTemplate: "%s | Alex Slavchev",
  },

  // Common
  common: {
    learnMore: "Learn More",
    viewAll: "View All",
    showMore: "Show More",
    showLess: "Show Less",
    backToTop: "Back to Top",
    share: "Share",
    copy: "Copy",
    copied: "Copied!",
    download: "Download",
    external: "Opens in new window",
  },
} as const

export type Content = typeof content
