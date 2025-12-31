#!/usr/bin/env node

/**
 * Automated OG Image Generator
 * Generates a 1200x630px social sharing image
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

console.log('🎨 Generating OG Image...\n');

// Check if we can use Puppeteer
const hasPuppeteer = fs.existsSync(path.join(__dirname, '../node_modules/puppeteer'));

if (hasPuppeteer) {
  console.log('✅ Using Puppeteer for automated generation\n');
  generateWithPuppeteer();
} else {
  console.log('📋 Puppeteer not found. Using manual method...\n');
  generateManual();
}

async function generateWithPuppeteer() {
  try {
    const puppeteer = require('puppeteer');

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Set viewport to exact OG image size
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });

    // Load the HTML file
    const htmlPath = path.join(__dirname, 'generate-og-image.html');
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

    // Wait for images to load
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Get the OG container element
    const element = await page.$('#og-image');

    if (!element) {
      throw new Error('Could not find #og-image element');
    }

    // Take screenshot of the element
    const outputPath = path.join(__dirname, '../public/og-image.png');
    await element.screenshot({
      path: outputPath,
      omitBackground: false
    });

    await browser.close();

    console.log('✅ OG image generated successfully!');
    console.log(`📁 Saved to: ${outputPath}\n`);
    console.log('🔍 Image details:');
    const stats = fs.statSync(outputPath);
    console.log(`   Size: ${(stats.size / 1024).toFixed(2)} KB`);
    console.log('   Dimensions: 1200x630px\n');

  } catch (error) {
    console.error('❌ Error generating with Puppeteer:', error.message);
    console.log('\n📋 Falling back to manual method...\n');
    generateManual();
  }
}

function generateManual() {
  console.log('📸 Manual Screenshot Instructions:\n');
  console.log('1. Open scripts/generate-og-image.html in Chrome/Firefox');
  console.log('2. Press F12 to open DevTools');
  console.log('3. Press Ctrl+Shift+P (Cmd+Shift+P on Mac)');
  console.log('4. Type "screenshot" → select "Capture node screenshot"');
  console.log('5. Click on the dark OG card');
  console.log('6. Save as "og-image.png" in the public folder\n');

  // Try to open the HTML file
  const htmlPath = path.join(__dirname, 'generate-og-image.html');
  const isLinux = process.platform === 'linux';
  const isMac = process.platform === 'darwin';
  const isWindows = process.platform === 'win32';

  let command;
  if (isLinux) {
    command = 'xdg-open';
  } else if (isMac) {
    command = 'open';
  } else if (isWindows) {
    command = 'start';
  }

  if (command) {
    console.log(`🌐 Opening ${htmlPath} in your browser...\n`);
    const openProcess = spawn(command, [htmlPath], {
      detached: true,
      stdio: 'ignore',
      shell: isWindows
    });
    openProcess.unref();
  }
}

// Run the generator
if (require.main === module) {
  // This file is being run directly
}
