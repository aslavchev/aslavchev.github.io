const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function convertToWebP() {
  const publicDir = path.join(process.cwd(), 'public');
  const files = fs.readdirSync(publicDir);
  
  // Find all JPG files
  const jpgFiles = files.filter(file => /\.(jpg|jpeg)$/i.test(file));
  
  console.log(`Found ${jpgFiles.length} JPG files to convert\n`);
  
  let totalOriginalSize = 0;
  let totalWebPSize = 0;
  
  for (const file of jpgFiles) {
    const inputPath = path.join(publicDir, file);
    const outputPath = path.join(publicDir, file.replace(/\.(jpg|jpeg)$/i, '.webp'));
    
    try {
      // Get original size
      const originalStats = fs.statSync(inputPath);
      totalOriginalSize += originalStats.size;
      
      // Convert to WebP
      await sharp(inputPath)
        .webp({ quality: 85, effort: 6 })
        .toFile(outputPath);
      
      // Get WebP size
      const webpStats = fs.statSync(outputPath);
      totalWebPSize += webpStats.size;
      
      const savings = ((1 - webpStats.size / originalStats.size) * 100).toFixed(1);
      
      console.log(`✓ ${file}`);
      console.log(`  ${(originalStats.size / 1024).toFixed(1)} KB → ${(webpStats.size / 1024).toFixed(1)} KB (${savings}% smaller)`);
    } catch (error) {
      console.error(`✗ Error converting ${file}:`, error.message);
    }
  }
  
  const totalSavings = ((1 - totalWebPSize / totalOriginalSize) * 100).toFixed(1);
  
  console.log(`\n=== Summary ===`);
  console.log(`Total original size: ${(totalOriginalSize / 1024).toFixed(1)} KB`);
  console.log(`Total WebP size: ${(totalWebPSize / 1024).toFixed(1)} KB`);
  console.log(`Total savings: ${totalSavings}%`);
}

convertToWebP();