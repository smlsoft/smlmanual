#!/usr/bin/env python3
"""
Script to fix broken image markdown syntax in all markdown files.
Fixes images where the URL is split across multiple lines.
"""

import os
import re
import glob

def fix_broken_images(content):
    """
    Fix broken image syntax where URLs are split across lines.
    Pattern: [![...]](http://...wp-\ncontent/uploads/...)
    """
    
    # Pattern to match broken image syntax across multiple lines
    # This matches: [![...](url-part-1\nurl-part-2)]
    pattern = r'(\[!\[[^\]]*\]\(http://[^\)]*wp-)\s*\n\s*(content/uploads/[^\)]*\))'
    
    def replace_func(match):
        # Join the URL parts and add proper alt text
        url_start = match.group(1)
        url_end = match.group(2)
        
        # Extract the image filename for alt text
        filename_match = re.search(r'/([^/]+\.jpg)', url_end)
        alt_text = ""
        if filename_match:
            # Use filename without extension as alt text
            alt_text = filename_match.group(1).replace('.jpg', '').replace('-', ' ')
        
        # If no alt text found in the original, add a generic one
        if '[![](' in url_start:
            full_url = url_start.replace('[![](', f'[![{alt_text}](') + url_end
        else:
            full_url = url_start + url_end
            
        return full_url
    
    # Apply the fix
    fixed_content = re.sub(pattern, replace_func, content, flags=re.MULTILINE)
    
    # Also fix cases where the entire image+link syntax spans multiple lines
    # Pattern: [![...](url1)]\n(url2)
    pattern2 = r'(\[!\[[^\]]*\]\([^)]*wp-)\s*\n\s*(content/uploads/[^)]*\)\]\([^)]*wp-)\s*\n\s*(content/uploads/[^)]*\))'
    
    def replace_func2(match):
        url_start1 = match.group(1)
        url_end1 = match.group(2) 
        url_start2 = match.group(3)
        url_end2 = match.group(4)
        
        # Extract filename for alt text
        filename_match = re.search(r'/([^/]+\.jpg)', url_end1)
        alt_text = ""
        if filename_match:
            alt_text = filename_match.group(1).replace('.jpg', '').replace('-', ' ')
        
        # Reconstruct the full image syntax
        full_image_url = url_start1 + url_end1 + url_start2 + url_end2
        
        if '[![](' in url_start1:
            full_image_url = url_start1.replace('[![](', f'[![{alt_text}](') + url_end1 + url_start2 + url_end2
        
        return full_image_url
        
    fixed_content = re.sub(pattern2, replace_func2, fixed_content, flags=re.MULTILINE)
    
    return fixed_content

def process_markdown_files():
    """Process all markdown files in the docs directory."""
    
    # Find all markdown files
    md_files = glob.glob('/Users/toe/DEV/smldocs/docs/**/*.md', recursive=True)
    
    fixed_files = []
    
    for file_path in md_files:
        try:
            # Read the file
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Fix broken images
            fixed_content = fix_broken_images(content)
            
            # Only write back if changes were made
            if fixed_content != content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(fixed_content)
                
                fixed_files.append(file_path)
                print(f"Fixed: {os.path.basename(file_path)}")
        
        except Exception as e:
            print(f"Error processing {file_path}: {e}")
    
    return fixed_files

if __name__ == "__main__":
    print("Fixing broken image syntax in markdown files...")
    fixed_files = process_markdown_files()
    
    if fixed_files:
        print(f"\nFixed {len(fixed_files)} files:")
        for file_path in fixed_files:
            print(f"  - {os.path.basename(file_path)}")
    else:
        print("\nNo files needed fixing.")
    
    print("\nDone!")
