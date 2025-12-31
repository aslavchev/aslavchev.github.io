const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function optimizeOGImage() {
  const inputPath = path.join(process.cwd(), 'public', 'og-image.png');
  const outputPath = path.join(process.cwd(), 'public', 'og-image-optimized.png');
  const backupPath = path.join(process.cwd(), 'public', 'og-image-original.png');

  try {
    // Get original file size
    const originalStats = fs.statSync(inputPath);
    const originalSizeKB = (originalStats.size / 1024).toFixed(2);
    
    console.log(`Original OG image size: ${originalSizeKB} KB`);

    // Backup original
    fs.copyFileSync(inputPath, backupPath);
    console.log('✓ Backed up original to og-image-original.png');

    // Optimize the image
    await sharp(inputPath)
      .resize(1200, 630, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png({
        quality: 90,
        compressionLevel: 9,
        palette: true
      })
      .toFile(outputPath);

    // Get optimized file size
    const optimizedStats = fs.statSync(outputPath);
    const optimizedSizeKB = (optimizedStats.size / 1024).toFixed(2);
    const savings = ((1 - optimizedStats.size / originalStats.size) * 100).toFixed(1);

    console.log(`✓ Optimized OG image size: ${optimizedSizeKB} KB`);
    console.log(`✓ Size reduction: ${savings}%`);

    // Replace original with optimized
    fs.copyFileSync(outputPath, inputPath);
    fs.unlinkSync(outputPath);
    
    console.log('✓ Replaced original with optimized version');
    console.log(`\nFinal size: ${optimizedSizeKB} KB (was ${originalSizeKB} KB)`);
  } catch (error) {
    console.error('Error optimizing OG image:', error);
    process.exit(1);
  }
}

optimizeOGImage();
