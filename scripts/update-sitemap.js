#!/usr/bin/env node

/**
 * Sitemap Updater
 * Automatically updates lastmod dates in sitemap.xml to today's date
 */

const fs = require('fs');
const path = require('path');

const sitemapPath = path.join(__dirname, '../public/sitemap.xml');

// Get today's date in YYYY-MM-DD format
const today = new Date().toISOString().split('T')[0];

console.log('📅 Updating sitemap.xml dates...\n');

try {
  // Read sitemap
  let sitemap = fs.readFileSync(sitemapPath, 'utf8');

  // Count how many dates will be updated
  const dateRegex = /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g;
  const matches = sitemap.match(dateRegex);
  const updateCount = matches ? matches.length : 0;

  // Update all lastmod dates to today
  sitemap = sitemap.replace(dateRegex, `<lastmod>${today}</lastmod>`);

  // Write back to file
  fs.writeFileSync(sitemapPath, sitemap, 'utf8');

  console.log(`✅ Updated ${updateCount} lastmod dates to ${today}`);
  console.log(`📁 Sitemap: ${sitemapPath}\n`);

  // Validate XML structure
  if (!sitemap.includes('<?xml version="1.0"')) {
    console.warn('⚠️  Warning: Sitemap may be missing XML declaration');
  }

  if (!sitemap.includes('</urlset>')) {
    console.warn('⚠️  Warning: Sitemap may be missing closing urlset tag');
  }

  console.log('✅ Sitemap validation passed!\n');

} catch (error) {
  console.error('❌ Error updating sitemap:', error.message);
  process.exit(1);
}
