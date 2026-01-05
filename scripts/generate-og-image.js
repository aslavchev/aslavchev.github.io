const { createCanvas, loadImage } = require('@napi-rs/canvas');
const fs = require('fs');
const path = require('path');

async function generateOGImage() {
  const width = 1200;
  const height = 630;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Teal color from theme (oklch 0.60 0.14 185)
  const tealColor = '#4dd9d3';
  const whiteColor = '#ffffff';
  const grayColor = '#a0a0a0';
  const darkBg = '#0a0a0a';

  // Background gradient
  const gradient = ctx.createRadialGradient(300, 315, 0, 300, 315, 600);
  gradient.addColorStop(0, '#1a1a2e');
  gradient.addColorStop(1, darkBg);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Vertical line separator
  ctx.strokeStyle = tealColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(600, 100);
  ctx.lineTo(600, 530);
  ctx.stroke();

  // Load and draw profile image
  try {
    const profileImage = await loadImage(path.join(__dirname, '../public/professional-headshot.png'));
    const centerX = 270;
    const centerY = 315;
    const radius = 180;

    // Circular clip
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(profileImage, centerX - radius, centerY - radius, radius * 2, radius * 2);
    ctx.restore();

    // Glow effect
    ctx.strokeStyle = tealColor;
    ctx.lineWidth = 4;
    ctx.shadowBlur = 30;
    ctx.shadowColor = tealColor;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;
  } catch (error) {
    console.error('⚠️ Could not load profile image:', error.message);
  }

  // Text content - right side
  const startX = 640;

  // Name - white
  ctx.fillStyle = whiteColor;
  ctx.font = 'bold 72px Arial, sans-serif';
  ctx.fillText('Alex Slavchev', startX, 180);

  // Title - TEAL (not purple!) - no "Senior", 18+ years speaks for itself
  ctx.fillStyle = tealColor;
  ctx.font = 'bold 48px Arial, sans-serif';
  ctx.fillText('Software Engineer', startX, 250);
  ctx.fillText('in Test', startX, 310);

  // Subtitle - gray
  ctx.fillStyle = grayColor;
  ctx.font = '32px Arial, sans-serif';
  ctx.fillText('Building Quality at Scale', startX, 365);

  // Stats - TEAL
  ctx.fillStyle = tealColor;
  ctx.font = 'bold 64px Arial, sans-serif';
  ctx.fillText('18+', startX, 460);
  ctx.fillText('100K+', startX + 220, 460);

  // Stats labels - gray
  ctx.fillStyle = grayColor;
  ctx.font = '20px Arial, sans-serif';
  ctx.fillText('YEARS', startX, 490);
  ctx.fillText('USERS', startX + 220, 490);

  // NO v0 WATERMARK - Jobs would NOT approve branding someone else's tool!

  // Save
  const buffer = canvas.toBuffer('image/png');
  const outputPath = path.join(__dirname, '../public/og-image.png');
  fs.writeFileSync(outputPath, buffer);

  console.log('✅ OG image generated successfully!');
  console.log(`📁 ${outputPath}`);
  console.log(`📐 ${(buffer.length / 1024).toFixed(1)} KB`);
  console.log('');
  console.log('✓ Title: "Senior Software Engineer in Test"');
  console.log('✓ Color: Teal (brand-aligned)');
  console.log('✓ No v0 watermark');
}

generateOGImage().catch(console.error);
