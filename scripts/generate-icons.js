const { createCanvas } = require('@napi-rs/canvas');
const fs = require('fs');
const path = require('path');

const tealColor = '#4dd9d3';
const darkBg = '#0a0a0a';
const whiteBg = '#ffffff';

function generateIcon(size, text, bgColor, textColor, filename) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, size, size);

  // Round corners for apple icon
  if (size > 100) {
    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.roundRect(0, 0, size, size, size * 0.2);
    ctx.fill();
  }

  // Text
  ctx.fillStyle = textColor;
  ctx.font = `bold ${size * 0.45}px Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, size / 2, size / 2 + size * 0.02);

  // Save
  const buffer = canvas.toBuffer('image/png');
  const outputPath = path.join(__dirname, '../public', filename);
  fs.writeFileSync(outputPath, buffer);
  console.log(`✅ Generated: ${filename}`);
}

// Generate all icons
generateIcon(32, 'AS', darkBg, tealColor, 'icon-light-32x32.png');  // Dark icon for light browser theme
generateIcon(32, 'AS', whiteBg, darkBg, 'icon-dark-32x32.png');     // Light icon for dark browser theme
generateIcon(180, 'AS', darkBg, tealColor, 'apple-icon.png');       // Apple touch icon

console.log('\n✅ All icons generated!');
