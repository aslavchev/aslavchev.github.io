# Alex Slavchev – Senior QA Engineer

> "Quality is not an act, it is a habit." – Aristotle

## Why This Matters

In an industry where a single bug can cost millions and damage trust built over years, quality assurance isn't just a role—it's a responsibility to users, stakeholders, and the future of software itself.

This portfolio represents 18+ years of ensuring that software doesn't just work—it works flawlessly, at scale, under pressure.

## What I Do

I build quality into software from the ground up. Not as an afterthought. Not as a checkbox. As a fundamental principle.

**The numbers tell the story:**
- 18+ years of quality engineering across sports, finance, health, and autonomous vehicles
- 100,000+ users relying on applications I've tested
- Zero-critical-failure track record through rigorous testing protocols
- Led teams from zero to production-ready in enterprise environments

**But numbers don't capture everything:**
- I've mentored junior engineers who became senior contributors
- I've designed testing infrastructure that scales with business growth
- I've caught critical issues hours before release that would have cost millions
- I've built quality cultures, not just test suites

## The Approach

Quality isn't about finding bugs. It's about preventing them.

1. **Think Like a User** – Every test case starts with "How would this fail in the real world?"
2. **Automate Relentlessly** – Humans make mistakes. Machines don't get tired.
3. **Measure Everything** – You can't improve what you don't measure
4. **Fail Fast, Learn Faster** – Find issues early when they're cheap to fix

## The Portfolio

This isn't just a website. It's a demonstration of the same principles I apply to testing:

- **Performance-First**: Built with Next.js 16, optimized for speed
- **Automated Quality**: Puppeteer-driven OG image generation, automated sitemaps
- **Accessibility**: WCAG 2.1 AA compliant—quality means accessible to everyone
- **Resilient Architecture**: Error boundaries, lazy loading, graceful degradation
- **SEO Optimized**: Because quality work should be discoverable

**Tech Stack:**
- Next.js 16 (App Router) + React 19
- TypeScript for type safety
- Tailwind CSS v4 for maintainable styling
- shadcn/ui for consistent components
- Automated tooling with Puppeteer

## Live Site

**[View Portfolio →](https://aslavchev.github.io/aslavchev-portfolio-website/)**

**[Download Resume (PDF) →](https://aslavchev.github.io/aslavchev-portfolio-website/Alex_Slavchev_CV.pdf)**

## Quick Start

```bash
# Clone this repository
git clone https://github.com/aslavchev/aslavchev-portfolio-website.git
cd aslavchev-portfolio-website

# Install dependencies
npm install

# Run locally
npm run dev

# Build for production
npm run build

# Optimization & SEO Scripts
npm run generate:og      # Generate social sharing image
npm run update:sitemap   # Update sitemap dates
npm run optimize:og      # Optimize OG image (797KB → 87KB)
npm run optimize:images  # Convert JPG to WebP (35% savings)
npm run optimize:all     # Run all image optimizations
```

## What Sets This Apart

### Professional Visual Identity
- **Automated OG Image Generation**: Professional social sharing cards with Puppeteer
- **Timeline Visualization**: Experience and education with visual progression
- **Company Branding**: Integrated company logos with graceful fallbacks
- **Responsive Design**: Mobile-first approach, works flawlessly on any device

### SEO Excellence
- Comprehensive sitemap with all sections and resume
- robots.txt for proper crawler guidance
- OpenGraph and Twitter Card metadata
- Rich structured data (Schema.org JSON-LD):
  - Person schema with 15+ skills and 3 languages
  - 4 detailed work experience entries
  - 8 education credentials
  - Breadcrumb navigation
  - ProfilePage metadata
- Automated lastmod date updates
- Schema validation tools included

### User Experience First
- Scroll progress indicator for orientation
- Smooth section navigation with flat, simple hierarchy
- Dark/light theme support
- Testimonials section with horizontal scrolling
- WhatsApp quick contact integration
- Download resume with one click
- Mobile-optimized touch targets (44x44px minimum)

### Accessibility (WCAG 2.1 AA)
- Complete keyboard navigation support
- Enhanced focus indicators (3px outline with box shadow)
- ARIA labels on all interactive elements
- Skip link to main content
- Screen reader optimized
- Respects reduced motion preferences
- 44x44px minimum touch targets
- High contrast mode support
- See [ACCESSIBILITY.md](./ACCESSIBILITY.md) for full statement

## The Philosophy

### On Quality
Quality isn't expensive. It's priceless. The cost of poor quality—lost users, damaged reputation, emergency fixes—far exceeds the investment in getting it right the first time.

### On Testing
Every line of code is a promise to users. Testing is how we keep that promise.

### On Automation
Manual testing doesn't scale. Automated testing frees humans to think about edge cases machines can't imagine.

### On Continuous Improvement
The best testing strategy is the one that evolves with your product. Static processes create technical debt.

## Experience Highlights

**Tumba Solutions** (2016-2025) – Senior QA Engineer
Led quality assurance for Baseball, Financial Media, Cycling Performance, and Self-driving car applications. Mentored junior QA engineers. Designed comprehensive testing infrastructure for client applications serving 100K+ users.

**VMware** (2007-2015) – Quality Assurance Engineer
Established testing protocols for VMware's VCloud UI management interface. Led cross-functional project delivery for Windows VM performance monitoring. Aligned testing efforts across US and Bulgaria engineering teams.

[See full experience →](https://aslavchev.github.io/aslavchev-portfolio-website/#experience)

## Get in Touch

Quality software doesn't happen by accident. It's engineered, tested, and refined.

If you're looking for someone who doesn't just test software but builds quality into the culture, let's talk.

**Email**: [sandixx@gmail.com](mailto:sandixx@gmail.com)
**LinkedIn**: [linkedin.com/in/aslavchev](https://www.linkedin.com/in/aslavchev/)
**GitHub**: [github.com/aslavchev](https://github.com/aslavchev)
**WhatsApp**: [+359 886 449904](https://wa.me/359886449904?text=Hi%20Alex%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20QA%20opportunity.)
**Location**: Sofia, Bulgaria (Remote • Hybrid • On-site)

---

## Technical Documentation

### Project Structure

```
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout, metadata, SEO
│   └── page.tsx             # Main page with lazy loading
├── components/
│   ├── sections/            # Portfolio sections
│   │   ├── hero-section.tsx
│   │   ├── featured-projects.tsx
│   │   ├── experience-section.tsx
│   │   ├── education-section.tsx
│   │   ├── testimonials-section.tsx
│   │   ├── stack-section.tsx
│   │   └── contact-section.tsx
│   ├── ui/                  # shadcn/ui components
│   ├── sidebar.tsx          # Desktop navigation
│   └── mobile-nav.tsx       # Mobile navigation
├── lib/
│   ├── data/                # Content and configuration
│   │   ├── personal.ts      # Personal information
│   │   ├── experience.ts    # Work history
│   │   ├── education.ts     # Academic background
│   │   ├── projects.ts      # Portfolio projects
│   │   └── testimonials.ts  # Professional testimonials
│   ├── structured-data.ts   # Schema.org JSON-LD
│   ├── navigation.ts        # Flat navigation config
│   ├── features.ts          # Feature flags
│   └── utils.ts             # Utility functions
├── public/
│   ├── og-image.png         # Optimized social image (87KB)
│   ├── sitemap.xml          # SEO sitemap
│   ├── robots.txt           # Crawler instructions
│   ├── *.webp               # Optimized project images
│   └── company-logos/       # Brand assets
└── scripts/
    ├── generate-og.js       # Automated OG image generation
    ├── optimize-og-image.js # OG image optimization (89% reduction)
    ├── convert-to-webp.js   # JPG to WebP converter (36% reduction)
    ├── update-sitemap.js    # Sitemap date updater
    ├── validate-schema.js   # JSON-LD schema validator
    └── README.md            # Script documentation
```

### Deployment

**GitHub Pages** (Current):
- Automatic deployment on push to `main`
- Static export to `./out`
- Available at: https://aslavchev.github.io/aslavchev-portfolio-website/

**Vercel** (Alternative):
```bash
npm install -g vercel
vercel deploy
```

### Scripts

```bash
# Development & Build
npm run dev              # Start development server
npm run build            # Create production build
npm run preview          # Preview production build locally

# SEO & Metadata
npm run generate:og      # Generate social sharing image
npm run update:sitemap   # Update sitemap dates to today
npm run validate:schema  # Validate structured data (JSON-LD)

# Performance Optimization
npm run optimize:og      # Optimize OG image (797KB → 87KB, 89% savings)
npm run optimize:images  # Convert all JPG to WebP (35.8% average savings)
npm run optimize:all     # Run all image optimizations
```

### Performance

**Lighthouse Scores:**
- Performance: 95+
- Accessibility: 100/100
- Best Practices: 100/100
- SEO: 100/100

**Image Optimizations:**
- OG image optimized: 797KB → 87KB (89% reduction)
- All project images converted to WebP (35.8% average reduction)
- Total image savings: ~1.2MB
- Automated optimization scripts included

**Performance Features:**
- Resource hints (preconnect, dns-prefetch)
- Font preloading with fallbacks
- Lazy loading for all sections
- Code splitting and tree shaking
- Compression enabled
- WebP and AVIF format support

---

Built with precision. Tested with purpose. Deployed with confidence.

© 2025 Alex Slavchev. Available for opportunities worldwide.
