#!/usr/bin/env python3
"""
Script to optimize partner/B2B logos
Resizes and compresses logos for web use
"""

import os
import sys
from pathlib import Path
from PIL import Image

def optimize_logo(input_path, max_dimension=400, quality=85):
    """
    Optimize a logo image
    
    Args:
        input_path: Path to the input image
        max_dimension: Maximum width or height (default 400px)
        quality: JPEG quality (1-100, default 85)
    
    Returns:
        Path to optimized image or None if failed
    """
    try:
        img = Image.open(input_path)
        original_size = os.path.getsize(input_path)
        
        print(f"\n📸 Optimizing: {os.path.basename(input_path)}")
        print(f"   Original: {img.size[0]}x{img.size[1]}, {original_size / 1024:.2f} KB")
        
        # Calculate new dimensions
        width, height = img.size
        if width > max_dimension or height > max_dimension:
            if width > height:
                new_width = max_dimension
                new_height = int((height / width) * max_dimension)
            else:
                new_height = max_dimension
                new_width = int((width / height) * max_dimension)
        else:
            new_width, new_height = width, height
        
        # Convert to RGB if necessary (for JPEG)
        if img.mode in ('RGBA', 'LA', 'P'):
            # Create white background
            background = Image.new('RGB', (new_width, new_height), (255, 255, 255))
            if img.mode == 'P':
                img = img.convert('RGBA')
            resized = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
            if resized.mode in ('RGBA', 'LA'):
                background.paste(resized, mask=resized.split()[-1] if resized.mode in ('RGBA', 'LA') else None)
            else:
                background.paste(resized)
            img = background
        elif img.mode != 'RGB':
            img = img.convert('RGB')
            img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
        else:
            img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
        
        # Determine output format
        ext = Path(input_path).suffix.lower()
        output_path = input_path.replace(ext, '-optimized.jpg' if ext in ['.jpeg', '.jpg'] else '-optimized.png')
        
        # Save optimized image
        if ext in ['.jpeg', '.jpg']:
            img.save(output_path, 'JPEG', quality=quality, optimize=True)
        elif ext == '.png':
            img.save(output_path, 'PNG', optimize=True, compress_level=9)
        elif ext == '.gif':
            # For GIF, convert to PNG for better optimization
            output_path = input_path.replace('.gif', '-optimized.png')
            img.save(output_path, 'PNG', optimize=True, compress_level=9)
            print(f"   ⚠️  GIF converted to PNG for better optimization")
        else:
            print(f"   ⚠️  Unsupported format: {ext}")
            return None
        
        optimized_size = os.path.getsize(output_path)
        savings = ((1 - optimized_size / original_size) * 100) if original_size > 0 else 0
        
        print(f"   ✅ Optimized: {new_width}x{new_height}, {optimized_size / 1024:.2f} KB ({savings:.1f}% smaller)")
        
        return output_path
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        return None

def main():
    script_dir = Path(__file__).parent
    partners_dir = script_dir / "public" / "images" / "partners"
    
    if not partners_dir.exists():
        print(f"❌ Partners directory not found: {partners_dir}")
        sys.exit(1)
    
    # Find all image files
    image_extensions = ['.jpg', '.jpeg', '.png', '.gif']
    files = [f for f in partners_dir.iterdir() 
             if f.is_file() and f.suffix.lower() in image_extensions 
             and '-optimized' not in f.name]
    
    if not files:
        print("ℹ️  No image files found in partners directory")
        return
    
    print(f"🚀 Starting logo optimization...\n")
    print(f"📂 Found {len(files)} logo file(s) to optimize:\n")
    for f in files:
        print(f"   - {f.name}")
    
    optimized_count = 0
    for file_path in files:
        result = optimize_logo(str(file_path))
        if result:
            optimized_count += 1
    
    print(f"\n{'='*60}")
    print(f"📊 Summary:")
    print(f"   ✅ Optimized: {optimized_count}/{len(files)} files")
    print(f"{'='*60}\n")
    print("💡 Tip: Review optimized files and replace originals if satisfied.")
    print("   You can rename optimized files to replace originals.")

if __name__ == "__main__":
    main()

