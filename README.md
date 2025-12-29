# Alex Rivera - Senior QA Engineer Portfolio

A modern, production-ready portfolio website showcasing quality engineering expertise, built with Next.js 16, TypeScript, and Tailwind CSS.

## Features

- **FAANG-Ready Design**: Professional portfolio demonstrating senior-level QA expertise
- **Interactive Metrics Dashboard**: Real-time data visualizations using Recharts
- **AI-Powered Chatbot**: Context-aware assistant to answer portfolio questions
- **Mobile-First**: Fully responsive with hamburger navigation for mobile devices
- **Performance Optimized**: 
  - Lazy loading with React Suspense
  - Next.js Image optimization
  - Code splitting for optimal bundle size
- **Accessibility**: WCAG 2.1 AA compliant with proper semantic HTML and ARIA labels
- **Error Resilience**: Error boundaries for graceful failure handling
- **SEO Optimized**: Comprehensive metadata and structured data

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **AI**: Vercel AI SDK v5
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
\`\`\`bash
git clone https://github.com/alexrivera/portfolio.git
cd portfolio
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Create environment variables (optional)
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Run the development server
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

\`\`\`
├── app/                      # Next.js app directory
│   ├── api/                 # API routes
│   │   └── chat/           # AI chatbot endpoint
│   ├── layout.tsx          # Root layout with metadata
│   └── page.tsx            # Main page with lazy loading
├── components/              # React components
│   ├── sections/           # Page sections
│   ├── ui/                 # shadcn/ui components
│   ├── error-boundary.tsx  # Error handling
│   ├── mobile-nav.tsx      # Mobile navigation
│   └── sidebar.tsx         # Desktop sidebar
├── lib/                    # Utilities and data
│   ├── portfolio-data.ts   # Centralized content
│   ├── rate-limit.ts       # API rate limiting
│   └── utils.ts           # Helper functions
└── public/                 # Static assets
\`\`\`

## Key Sections

1. **Hero**: Introduction with call-to-action buttons
2. **Featured Projects**: Highlight reel of top achievements
3. **QA Metrics Dashboard**: Interactive charts showing impact
4. **Testing Tools**: Comprehensive tool proficiency breakdown
5. **Live Quality Demo**: Lighthouse scores and Core Web Vitals
6. **Test Strategy**: Testing pyramid and quality gates
7. **Case Studies**: Detailed project breakdowns
8. **Experience**: Professional history timeline
9. **Contact**: Get in touch form

## Customization

### Update Personal Information

Edit `lib/portfolio-data.ts` to update:
- Personal info (name, title, bio)
- Projects and achievements
- Work experience
- Skills and tools
- Social links

### Modify Styling

- Colors: Edit `app/globals.css` design tokens
- Components: Modify files in `components/`
- Layout: Adjust `app/page.tsx` section order

### Configure Chatbot

The chatbot uses Vercel AI Gateway by default (no API key needed). To customize:
1. Edit the system prompt in `app/api/chat/route.ts`
2. Adjust rate limits in `lib/rate-limit.ts`

## Performance

- Lighthouse Score: 98+ Performance
- First Contentful Paint: < 1s
- Time to Interactive: < 1.5s
- Bundle Size: Optimized with lazy loading

## Accessibility

- WCAG 2.1 AA Compliant
- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly
- Proper ARIA labels

## Security

- Security headers configured
- Rate limiting on API endpoints
- Input validation
- XSS protection
- No exposed credentials

## Deployment

### GitHub Pages (Current Setup)

**Automatic deployment on every push to `main`:**

1. Push to main branch
2. GitHub Actions builds and deploys automatically
3. Site available at: `https://aslavchev.github.io/aslavchev-portfolio-website/`

**Manual Deployment:**
```bash
npm run build  # Creates static export in ./out
```

### Docker

**Build and run locally:**
```bash
docker build -t portfolio .
docker run -p 8080:80 portfolio
# Visit http://localhost:8080
```

**Pull from GitHub Container Registry:**
```bash
docker pull ghcr.io/aslavchev/aslavchev-portfolio-website:main
docker run -p 8080:80 ghcr.io/aslavchev/aslavchev-portfolio-website:main
```

### CI/CD Workflows

**Three automated workflows:**

1. **CI** (`.github/workflows/ci.yml`)
   - Runs on all PRs and pushes to main
   - TypeScript checks
   - Build verification
   - Artifact upload

2. **Deploy** (`.github/workflows/deploy.yml`)
   - Deploys to GitHub Pages on main push
   - Automatic static export
   - No manual intervention

3. **Docker** (`.github/workflows/docker.yml`)
   - Builds Docker image on main push
   - Pushes to GitHub Container Registry
   - Tagged with commit SHA and version

### Other Platforms

The portfolio can be deployed to any platform supporting Next.js:
- Vercel (zero-config)
- Netlify
- AWS Amplify
- Railway
- Render

## License

MIT License - feel free to use this as a template for your own portfolio!

## Contact

Alex Rivera - [alex.rivera@example.com](mailto:alex.rivera@example.com)

Portfolio: [https://alexrivera.dev](https://alexrivera.dev)
LinkedIn: [linkedin.com/in/alexrivera](https://linkedin.com/in/alexrivera)
GitHub: [github.com/alexrivera](https://github.com/alexrivera)
