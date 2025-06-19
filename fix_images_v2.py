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
    """
    
    # Pattern 1: Fix broken image URLs split across lines
    # Matches: [![...](http://...wp-\ncontent/uploads/...)]
    pattern1 = r'(\[!\[[^\]]*\]\(http://[^)]*wp-)\s*\n\s*(content/uploads/[^)]*\))'
    
    def replace_func1(match):
        url_start = match.group(1)
        url_end = match.group(2)
        
        # Extract filename for alt text
        filename_match = re.search(r'/([^/]+)\.jpg', url_end)
        alt_text = "image"
        if filename_match:
            alt_text = filename_match.group(1).replace('-', ' ')
        
        # Fix empty alt text
        if '[![](' in url_start:
            url_start = url_start.replace('[![](', f'[![{alt_text}](')
        
        return url_start + url_end
    
    # Pattern 2: Fix broken link URLs split across lines  
    # Matches: ...)](http://...wp-\ncontent/uploads/...)
    pattern2 = r'(\)\]\(http://[^)]*wp-)\s*\n\s*(content/uploads/[^)]*\))'
    
    def replace_func2(match):
        url_start = match.group(1)
        url_end = match.group(2)
        return url_start + url_end
    
    # Apply fixes
    fixed_content = content
    fixed_content = re.sub(pattern1, replace_func1, fixed_content, flags=re.MULTILINE)
    fixed_content = re.sub(pattern2, replace_func2, fixed_content, flags=re.MULTILINE)
    
    # Add line breaks between images for better readability
    fixed_content = re.sub(r'(\]\([^)]+\))\n(\[!\[)', r'\1\n\n\2', fixed_content)
    
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
            
            original_content = content
            
            # Fix broken images
            fixed_content = fix_broken_images(content)
            
            # Only write back if changes were made
            if fixed_content != original_content:
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
