import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get directory from command line argument or use default
const targetDir = process.argv[2] || 'grid-50-morning-tour';
const gridDir = path.join(__dirname, 'public', 'images', targetDir);
const maxWidth = 400; // Max width for grid images (smaller = faster)
const quality = 75; // JPEG quality (lower = smaller file size)

async function optimizeImage(filePath) {
  try {
    const stats = await fs.stat(filePath);
    const originalSize = stats.size;
    
    const ext = path.extname(filePath).toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.heic'].includes(ext)) {
      console.log(`⏭️  Skipping ${path.basename(filePath)} (not an image)`);
      return;
    }

    // For .jpg files, optimize in place using temp file
    const isJpg = ['.jpg', '.jpeg'].includes(ext);
    const outputPath = isJpg 
      ? filePath + '.tmp' // Use temp file for .jpg
      : filePath.replace(/\.(JPG|HEIC|PNG)$/i, '.jpg');
    
    // Skip if already optimized (check file size)
    if (originalSize < 100 * 1024) { // Less than 100KB, likely already optimized
      console.log(`✓ Already optimized: ${path.basename(filePath)} (${(originalSize / 1024).toFixed(1)}KB)`);
      return;
    }

    await sharp(filePath)
      .resize(maxWidth, maxWidth, {
        fit: 'cover',
        withoutEnlargement: true,
      })
      .jpeg({ quality, mozjpeg: true })
      .toFile(outputPath);

    const newStats = await fs.stat(outputPath);
    const newSize = newStats.size;
    const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    // For .jpg files, replace original with optimized version
    if (isJpg) {
      await fs.rename(outputPath, filePath);
      console.log(`✓ Optimized ${path.basename(filePath)}: ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(newSize / 1024 / 1024).toFixed(2)}MB (${reduction}% reduction)`);
    } else {
      const newStats = await fs.stat(outputPath);
      const newSize = newStats.size;
      const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);
      console.log(`✓ Optimized ${path.basename(filePath)}: ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(newSize / 1024 / 1024).toFixed(2)}MB (${reduction}% reduction)`);
      
      // Remove original if it's a different file
      await fs.unlink(filePath);
      console.log(`  🗑️  Removed original: ${path.basename(filePath)}`);
    }
  } catch (error) {
    console.error(`❌ Error optimizing ${path.basename(filePath)}:`, error.message);
  }
}

async function optimizeAllImages() {
  try {
    console.log('🚀 Starting image optimization...\n');
    console.log(`📁 Directory: ${gridDir}\n`);
    
    const files = await fs.readdir(gridDir);
    const imageFiles = files.filter(f => 
      /\.(jpg|jpeg|png|JPG|JPEG|PNG|heic|HEIC)$/i.test(f)
    );

    console.log(`📸 Found ${imageFiles.length} images to optimize\n`);

    for (const file of imageFiles) {
      const filePath = path.join(gridDir, file);
      await optimizeImage(filePath);
    }

    console.log('\n✅ Image optimization complete!');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

optimizeAllImages();

