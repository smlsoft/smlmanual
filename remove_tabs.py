#!/usr/bin/env python3
"""
Script to replace single spaces with dashes in markdown filenames.
This script will:
1. Rename files that have spaces in their filenames to use dashes instead
2. Keep file content unchanged
"""

import os
import re
import shutil

def sanitize_filename(filename):
    """Replace single spaces with dashes in filename"""
    return filename.replace(' ', '-')

def remove_tabs_from_content(content):
    """Keep content unchanged - no modifications needed"""
    return content

def process_markdown_files(docs_dir):
    """Process all markdown files in the docs directory"""
    if not os.path.exists(docs_dir):
        print(f"Directory {docs_dir} does not exist")
        return
    
    files_processed = 0
    files_renamed = 0
    files_content_updated = 0
    
    # Get list of all markdown files
    for filename in os.listdir(docs_dir):
        if not filename.endswith('.md'):
            continue
            
        old_filepath = os.path.join(docs_dir, filename)
        
        # Check if filename has spaces
        new_filename = sanitize_filename(filename)
        new_filepath = os.path.join(docs_dir, new_filename)
        
        print(f"Processing: {filename}")
        
        # Read and process file content
        try:
            with open(old_filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Keep content unchanged
            new_content = remove_tabs_from_content(content)
            content_changed = content != new_content
            
            # If filename changed, rename the file
            if old_filepath != new_filepath:
                # Write content to new filename
                with open(new_filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                
                # Remove old file
                os.remove(old_filepath)
                print(f"  -> Renamed: {filename} -> {new_filename}")
                files_renamed += 1
            else:
                # Just update content if it changed (though it shouldn't change now)
                if content_changed:
                    with open(old_filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"  -> Updated content")
                    files_content_updated += 1
            
            files_processed += 1
            
        except Exception as e:
            print(f"  -> Error processing {filename}: {e}")
    
    print(f"\nSummary:")
    print(f"  Processed: {files_processed} files")
    print(f"  Renamed: {files_renamed} files")
    print(f"  Content updated: {files_content_updated} files")

if __name__ == "__main__":
    docs_directory = "/Users/toe/DEV/smldocs/docs"
    print(f"Replacing spaces with dashes in markdown filenames in: {docs_directory}")
    process_markdown_files(docs_directory)
    print("Done!")
