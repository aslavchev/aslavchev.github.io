# Portfolio Scripts

Automation scripts for maintaining the portfolio website.

## Available Scripts

### 📸 OG Image Generator

Generates the OpenGraph social sharing image (1200x630px).

```bash
npm run generate:og
```

**What it does:**
- Creates a professional social sharing image with your headshot
- Outputs to `public/og-image.png`
- Uses Puppeteer to render the HTML template

**When to run:**
- After updating your profile information
- After changing your headshot
- When redesigning the OG card

**Manual method:**
If you prefer manual control, open `scripts/generate-og-image.html` in a browser and follow the on-screen instructions.

---

### 📅 Sitemap Updater

Updates all `lastmod` dates in the sitemap to today's date.

```bash
npm run update:sitemap
```

**What it does:**
- Updates all `<lastmod>` tags in `public/sitemap.xml` to today's date
- Validates XML structure
- Helps search engines know when content was last updated

**When to run:**
- After making significant content changes
- Before deploying updates
- Monthly as part of maintenance

---

### 🔍 Schema Validator

Validates the structured data (JSON-LD) against Schema.org specifications.

```bash
npm run validate:schema
```

**What it does:**
- Extracts JSON-LD from the built HTML
- Validates structure and completeness
- Counts and categorizes schema types
- Outputs detailed summary of structured data
- Saves formatted JSON to `out/structured-data.json`

**When to run:**
- After updating personal information
- After modifying experience or education data
- Before submitting sitemap to search engines
- To verify structured data is correctly embedded

**Validated schemas:**
- Person (with skills, languages, occupation)
- OrganizationRole (work experience)
- EducationalOccupationalCredential (education)
- ProfilePage (website metadata)
- BreadcrumbList (navigation structure)

---

## File Structure

```
scripts/
├── README.md                   # This file
├── generate-og.js              # OG image automation script
├── generate-og-image.html      # OG image template
└── update-sitemap.js           # Sitemap date updater
```

## SEO Files

These scripts maintain the following SEO-critical files:

- `public/sitemap.xml` - Search engine sitemap
- `public/robots.txt` - Crawler instructions
- `public/og-image.png` - Social sharing preview image

## Tips

1. **Before deploying:** Run `npm run update:sitemap` to ensure fresh dates
2. **After profile updates:** Run `npm run generate:og` to update social preview
3. **Validate sitemap:** Use https://www.xml-sitemaps.com/validate-xml-sitemap.html
4. **Test OG image:** Use https://www.opengraph.xyz/ to preview social cards

## Troubleshooting

**OG Image generation fails:**
- Ensure Puppeteer is installed: `npm install --save-dev puppeteer`
- Check that `public/professional-headshot.png` exists
- Fallback to manual method using the HTML template

**Sitemap validation errors:**
- Verify all URLs use HTTPS
- Check that all tags are properly closed
- Ensure dates are in YYYY-MM-DD format
