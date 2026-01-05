#!/usr/bin/env node
/**
 * Script to optimize partner/B2B logos
 * Resizes and compresses logos for web use
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const partnersDir = path.join(__dirname, 'public/images/partners');

// Check if sharp is available for optimization
let sharp;
try {
  sharp = (await import('sharp')).default;
} catch (e) {
  console.log('⚠️  Sharp not available. Using basic optimization...');
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const basename = path.basename(filePath, ext);
  const dir = path.dirname(filePath);
  
  try {
    if (sharp) {
      const image = sharp(filePath);
      const metadata = await image.metadata();
      
      console.log(`\n📸 Optimizing: ${path.basename(filePath)}`);
      console.log(`   Original: ${metadata.width}x${metadata.height}, ${(fs.statSync(filePath).size / 1024).toFixed(2)} KB`);
      
      // For logos, we typically want max 400px width/height
      const maxDimension = 400;
      let width = metadata.width;
      let height = metadata.height;
      
      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          width = maxDimension;
          height = Math.round((metadata.height / metadata.width) * maxDimension);
        } else {
          height = maxDimension;
          width = Math.round((metadata.width / metadata.height) * maxDimension);
        }
      }
      
      // Optimize based on format
      if (ext === '.jpeg' || ext === '.jpg') {
        await image
          .resize(width, height, { fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: 85, progressive: true, mozjpeg: true })
          .toFile(path.join(dir, `${basename}-optimized.jpg`));
      } else if (ext === '.png') {
        await image
          .resize(width, height, { fit: 'inside', withoutEnlargement: true })
          .png({ quality: 90, compressionLevel: 9 })
          .toFile(path.join(dir, `${basename}-optimized.png`));
      } else if (ext === '.gif') {
        // For GIF, we'll keep original but can create a PNG version
        console.log(`   ⚠️  GIF format - keeping original. Consider converting to PNG for better optimization.`);
        return filePath;
      }
      
      const optimizedPath = path.join(dir, `${basename}-optimized${ext}`);
      const originalSize = fs.statSync(filePath).size;
      const optimizedSize = fs.statSync(optimizedPath).size;
      const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);
      
      console.log(`   ✅ Optimized: ${width}x${height}, ${(optimizedSize / 1024).toFixed(2)} KB (${savings}% smaller)`);
      
      return optimizedPath;
    } else {
      console.log(`⚠️  Sharp not available. Skipping optimization for: ${path.basename(filePath)}`);
      return filePath;
    }
  } catch (error) {
    console.error(`❌ Error optimizing ${path.basename(filePath)}:`, error.message);
    return filePath;
  }
}

async function main() {
  console.log('🚀 Starting logo optimization...\n');
  
  if (!fs.existsSync(partnersDir)) {
    console.error(`❌ Partners directory not found: ${partnersDir}`);
    process.exit(1);
  }
  
  const files = fs.readdirSync(partnersDir).filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
  });
  
  if (files.length === 0) {
    console.log('ℹ️  No image files found in partners directory');
    return;
  }
  
  console.log(`📂 Found ${files.length} logo file(s) to optimize:\n`);
  files.forEach(file => console.log(`   - ${file}`));
  
  for (const file of files) {
    const filePath = path.join(partnersDir, file);
    await optimizeImage(filePath);
  }
  
  console.log('\n✨ Optimization complete!\n');
  console.log('💡 Tip: Review optimized files and replace originals if satisfied.');
}

main().catch(console.error);










