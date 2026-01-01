# Alex Slavchev – Senior QA Engineer

18+ years ensuring software works flawlessly at scale. From sports to finance to autonomous vehicles.

**[View Portfolio →](https://aslavchev.github.io/aslavchev-portfolio-website/)** | **[Download Resume →](https://aslavchev.github.io/aslavchev-portfolio-website/Alex_Slavchev_CV.pdf)**

## Track Record

- 18+ years quality engineering: sports, finance, health, autonomous vehicles
- 100,000+ users relying on tested applications
- Zero critical failures through rigorous testing protocols
- Built testing infrastructure from zero to production-ready

## Approach

1. **Think Like a User** – Test how it fails in the real world
2. **Automate Relentlessly** – Machines don't get tired
3. **Measure Everything** – You can't improve what you don't measure
4. **Fail Fast** – Find issues early when they're cheap to fix

## This Portfolio

Built with the same quality principles I apply to testing:

**Tech Stack:**
- Next.js 16 (App Router) + React 19
- TypeScript for type safety
- Tailwind CSS v4
- Automated optimization scripts

**Quality Metrics:**
- Lighthouse: 95+ performance, 100 accessibility, 100 SEO
- WCAG 2.1 AA compliant
- 1.2MB image savings (WebP conversion + compression)
- Error boundaries, lazy loading, graceful degradation

**Automation:**
- Puppeteer-driven OG image generation
- Automated sitemap updates
- Image optimization scripts
- Schema validation

## Quick Start

```bash
git clone https://github.com/aslavchev/aslavchev-portfolio-website.git
cd aslavchev-portfolio-website
npm install
npm run dev              # Local development
npm run build            # Production build

# Optimization scripts
npm run optimize:all     # Image optimization
npm run generate:og      # Social sharing image
npm run update:sitemap   # Update sitemap
```

## Features

**Performance:**
- Resource hints (preconnect, dns-prefetch)
- Font preloading with system fallbacks
- Lazy loading, code splitting
- WebP images (35.8% average reduction)
- OG image optimized: 797KB → 87KB (89% reduction)

**Accessibility:**
- Keyboard navigation
- ARIA labels, focus indicators
- Skip links, screen reader optimized
- 44px minimum touch targets
- Respects reduced motion

**SEO:**
- Sitemap with automated updates
- Schema.org JSON-LD structured data
- OpenGraph and Twitter Card metadata
- robots.txt for crawler guidance

**UX:**
- Dark/light theme
- Scroll progress indicator
- Mobile-first responsive design
- WhatsApp quick contact
- One-click resume download

## Experience Highlights

**Tumba Solutions** (2016-2025) – Senior QA Engineer
Quality assurance for Baseball, Financial Media, Cycling, and Self-driving applications. Mentored junior engineers. Designed testing infrastructure for 100K+ users.

**VMware** (2007-2015) – Quality Assurance Engineer
Testing protocols for VCloud UI. Cross-functional delivery for Windows VM monitoring. Aligned US/Bulgaria engineering teams.

[Full experience →](https://aslavchev.github.io/aslavchev-portfolio-website/#experience)

## Contact

**Email**: [sandixx@gmail.com](mailto:sandixx@gmail.com)
**LinkedIn**: [linkedin.com/in/aslavchev](https://www.linkedin.com/in/aslavchev/)
**GitHub**: [github.com/aslavchev](https://github.com/aslavchev)
**WhatsApp**: [+359 886 449904](https://wa.me/359886449904?text=Hi%20Alex%2C%20I%20saw%20your%20portfolio)
**Location**: Sofia, Bulgaria (Remote • Hybrid • On-site)

---

## Technical Documentation

### Project Structure

```
├── app/
│   ├── layout.tsx           # Metadata, SEO, performance
│   └── page.tsx             # Main page with lazy loading
├── components/
│   ├── sections/            # Portfolio sections
│   └── ui/                  # shadcn/ui components
├── lib/
│   ├── data/                # Content configuration
│   ├── structured-data.ts   # Schema.org JSON-LD
│   ├── navigation.ts        # Navigation config
│   └── features.ts          # Feature flags
├── public/
│   ├── og-image.png         # 87KB (optimized)
│   ├── *.webp               # Optimized images
│   └── sitemap.xml          # SEO
└── scripts/
    ├── optimize-og-image.js # 89% reduction
    ├── convert-to-webp.js   # 36% reduction
    ├── generate-og.js       # Automated OG
    └── update-sitemap.js    # Automated dates
```

### Scripts

```bash
# Development
npm run dev              # Development server
npm run build            # Production build
npm run preview          # Preview build

# Optimization
npm run optimize:og      # OG image (797KB → 87KB)
npm run optimize:images  # JPG → WebP (35.8% savings)
npm run optimize:all     # All optimizations

# SEO
npm run generate:og      # Generate social image
npm run update:sitemap   # Update dates
npm run validate:schema  # Validate JSON-LD
```

### Deployment

**GitHub Pages:**
```bash
git push origin main     # Auto-deploys via GitHub Actions
```

**Vercel:**
```bash
vercel deploy
```

### Performance Metrics

| Metric | Score |
|--------|-------|
| Performance | 95+ |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

**Optimizations:**
- OG image: 797KB → 87KB (89%)
- WebP conversion: 35.8% average
- Total savings: ~1.2MB
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s

---

Built with precision. Tested with purpose.

© 2025 Alex Slavchev
