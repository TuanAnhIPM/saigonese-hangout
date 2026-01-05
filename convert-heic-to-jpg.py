#!/usr/bin/env python3
"""
Script to convert all HEIC images to JPG format
Converts HEIC files in the grid-50-morning-tour directory to JPG format
"""

import os
import sys
from pathlib import Path
from PIL import Image
import pillow_heif

# Register HEIF opener with Pillow
pillow_heif.register_heif_opener()

def convert_heic_to_jpg(heic_path, jpg_path, quality=95):
    """
    Convert a HEIC image to JPG format
    
    Args:
        heic_path: Path to the HEIC file
        jpg_path: Path where the JPG file will be saved
        quality: JPG quality (1-100, default 95)
    
    Returns:
        True if conversion successful, False otherwise
    """
    try:
        # Open HEIC image
        img = Image.open(heic_path)
        
        # Convert to RGB if necessary (HEIC might be in RGBA or other mode)
        if img.mode in ('RGBA', 'LA', 'P'):
            # Create a white background
            background = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'P':
                img = img.convert('RGBA')
            background.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
            img = background
        elif img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Save as JPG
        img.save(jpg_path, 'JPEG', quality=quality, optimize=True)
        print(f"✓ Converted: {os.path.basename(heic_path)} → {os.path.basename(jpg_path)}")
        return True
    except Exception as e:
        print(f"✗ Error converting {os.path.basename(heic_path)}: {str(e)}")
        return False

def convert_directory_heic_to_jpg(directory_path, quality=95, delete_original=False):
    """
    Convert all HEIC files in a directory to JPG
    
    Args:
        directory_path: Path to the directory containing HEIC files
        quality: JPG quality (1-100, default 95)
        delete_original: Whether to delete original HEIC files after conversion
    
    Returns:
        Tuple of (successful_count, failed_count)
    """
    directory = Path(directory_path)
    
    if not directory.exists():
        print(f"Error: Directory {directory_path} does not exist!")
        return 0, 0
    
    # Find all HEIC files (case-insensitive)
    heic_files = list(directory.glob("*.heic")) + list(directory.glob("*.HEIC"))
    
    if not heic_files:
        print(f"No HEIC files found in {directory_path}")
        return 0, 0
    
    print(f"Found {len(heic_files)} HEIC file(s) to convert...\n")
    
    successful = 0
    failed = 0
    
    for heic_file in heic_files:
        # Create JPG path (same name, different extension)
        jpg_file = heic_file.with_suffix('.jpg')
        
        # Skip if JPG already exists
        if jpg_file.exists():
            print(f"⊘ Skipped (JPG exists): {heic_file.name}")
            if delete_original:
                try:
                    heic_file.unlink()
                    print(f"  Deleted original: {heic_file.name}")
                except Exception as e:
                    print(f"  Warning: Could not delete {heic_file.name}: {str(e)}")
            continue
        
        # Convert HEIC to JPG
        if convert_heic_to_jpg(heic_file, jpg_file, quality):
            successful += 1
            if delete_original:
                try:
                    heic_file.unlink()
                    print(f"  Deleted original: {heic_file.name}")
                except Exception as e:
                    print(f"  Warning: Could not delete {heic_file.name}: {str(e)}")
        else:
            failed += 1
    
    return successful, failed

def main():
    """Main function"""
    # Get the script directory and find the public/images/grid-50-morning-tour directory
    script_dir = Path(__file__).parent
    target_dir = script_dir / "public" / "images" / "grid-50-morning-tour"
    
    # Allow custom directory via command line argument
    if len(sys.argv) > 1:
        target_dir = Path(sys.argv[1])
    
    # Quality setting (optional second argument)
    quality = 95
    if len(sys.argv) > 2:
        try:
            quality = int(sys.argv[2])
            if not (1 <= quality <= 100):
                print("Warning: Quality must be between 1 and 100. Using default 95.")
                quality = 95
        except ValueError:
            print("Warning: Invalid quality value. Using default 95.")
    
    # Delete original flag (optional third argument)
    delete_original = False
    if len(sys.argv) > 3 and sys.argv[3].lower() in ('true', 'yes', '1', 'delete'):
        delete_original = True
    
    print("=" * 60)
    print("HEIC to JPG Converter")
    print("=" * 60)
    print(f"Target directory: {target_dir}")
    print(f"JPG Quality: {quality}")
    print(f"Delete originals: {'Yes' if delete_original else 'No'}")
    print("=" * 60 + "\n")
    
    successful, failed = convert_directory_heic_to_jpg(target_dir, quality, delete_original)
    
    print("\n" + "=" * 60)
    print("Conversion Summary:")
    print(f"  Successful: {successful}")
    print(f"  Failed: {failed}")
    print(f"  Total: {successful + failed}")
    print("=" * 60)

if __name__ == "__main__":
    main()





























