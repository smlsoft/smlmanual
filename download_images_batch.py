#!/usr/bin/env python3
"""
Script to download all images from markdown files and update the links to local paths.
This will:
1. Find all image URLs in markdown files
2. Download images to a local 'images' directory
3. Update markdown files to use local image paths
"""

import os
import re
import glob
import requests
import urllib.parse
from pathlib import Path
import time
import sys

class ImageDownloader:
    def __init__(self, base_dir="/Users/toe/DEV/smldocs"):
        self.base_dir = Path(base_dir)
        self.docs_dir = self.base_dir / "docs"
        self.images_dir = self.base_dir / "static" / "images"
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
        
        # Create images directory if it doesn't exist
        self.images_dir.mkdir(parents=True, exist_ok=True)
        
        # Track downloaded images to avoid duplicates
        self.downloaded_images = {}
        self.updated_files = []

    def extract_image_urls(self, content):
        """Extract all image URLs from markdown content."""
        image_urls = set()
        
        # Pattern 1: Standard markdown images ![alt](url)
        pattern1 = r'!\[[^\]]*\]\(([^)]+)\)'
        
        # Pattern 2: Linked images [![alt](img_url)](link_url) - capture first URL
        pattern2 = r'\[!\[[^\]]*\]\(([^)]+)\)\]\([^)]+\)'
        
        # Pattern 3: Just the image URL in linked format [![alt](url)]
        pattern3 = r'\[!\[[^\]]*\]\(([^)]+)\)\]'
        
        # Find all matches
        matches1 = re.findall(pattern1, content, re.MULTILINE | re.DOTALL)
        matches2 = re.findall(pattern2, content, re.MULTILINE | re.DOTALL)
        matches3 = re.findall(pattern3, content, re.MULTILINE | re.DOTALL)
        
        # Combine all URLs
        all_matches = matches1 + matches2 + matches3
        
        for url in all_matches:
            # Clean up URLs that might have line breaks or extra spaces
            url = re.sub(r'\s+', '', url.strip())
            
            # Only process URLs from smlaccount.com
            if 'smlaccount.com' in url and url.startswith('http'):
                image_urls.add(url)
        
        return image_urls

    def download_image(self, url):
        """Download an image and return the local filename."""
        try:
            # Parse the URL to get filename
            parsed_url = urllib.parse.urlparse(url)
            # URL decode to get original filename with Thai characters
            filename = urllib.parse.unquote(os.path.basename(parsed_url.path))
            
            # If filename is empty or doesn't have extension, create one
            if not filename or '.' not in filename:
                filename = f"image_{hash(url) % 10000}.jpg"
            
            # Keep original filename with Thai characters - only remove problematic characters
            # Remove only characters that are actually problematic for filesystems
            filename = re.sub(r'[<>:"/\\|?*]', '_', filename)
            
            local_path = self.images_dir / filename
            
            # Check if already downloaded
            if local_path.exists():
                print(f"    Already exists: {filename}")
                return filename
            
            # Download the image
            print(f"    Downloading: {filename}")
            response = self.session.get(url, timeout=30)
            response.raise_for_status()
            
            # Save the image
            with open(local_path, 'wb') as f:
                f.write(response.content)
            
            print(f"    Saved: {filename}")
            return filename
            
        except Exception as e:
            print(f"    Error downloading {url}: {e}")
            return None

    def update_markdown_content(self, content, url_mapping):
        """Update markdown content to use local image paths."""
        updated_content = content
        
        for original_url, local_filename in url_mapping.items():
            if local_filename:
                # Create relative path from docs to static/images
                local_path = f"/images/{local_filename}"
                
                # Replace all occurrences of the original URL
                updated_content = updated_content.replace(original_url, local_path)
        
        return updated_content

    def process_markdown_file(self, file_path):
        """Process a single markdown file."""
        print(f"\nProcessing: {file_path.name}")
        
        try:
            # Read the file
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Extract image URLs
            image_urls = self.extract_image_urls(content)
            
            if not image_urls:
                print("  No smlaccount.com images found")
                return False
            
            print(f"  Found {len(image_urls)} smlaccount.com images")
            
            # Download images and create mapping
            url_mapping = {}
            for url in image_urls:
                local_filename = self.download_image(url)
                url_mapping[url] = local_filename
                
                # Add a small delay to be respectful to the server
                time.sleep(0.5)
            
            # Update content with local paths
            updated_content = self.update_markdown_content(content, url_mapping)
            
            # Only write if content changed
            if updated_content != content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(updated_content)
                print(f"  Updated markdown file")
                return True
            else:
                print("  No changes needed")
                return False
                
        except Exception as e:
            print(f"  Error processing {file_path}: {e}")
            return False

    def process_batch(self, start_idx=0, batch_size=10):
        """Process a batch of markdown files."""
        print(f"Processing batch starting at index {start_idx}...")
        
        # Find all markdown files
        md_files = list(self.docs_dir.glob("**/*.md"))
        total_files = len(md_files)
        print(f"Total files found: {total_files}")
        
        # Process batch
        end_idx = min(start_idx + batch_size, total_files)
        batch_files = md_files[start_idx:end_idx]
        
        updated_count = 0
        
        for file_path in batch_files:
            if self.process_markdown_file(file_path):
                updated_count += 1
                self.updated_files.append(file_path)
        
        print(f"\n=== Batch {start_idx//batch_size + 1} Summary ===")
        print(f"Processed {len(batch_files)} files (files {start_idx+1}-{end_idx})")
        print(f"Updated {updated_count} files")
        
        return end_idx < total_files  # Return True if more files to process

    def process_all_files(self):
        """Process all markdown files in batches."""
        print("Starting image download and link update process...")
        print(f"Images will be saved to: {self.images_dir}")
        
        batch_size = 10
        start_idx = 0
        total_updated = 0
        
        while True:
            has_more = self.process_batch(start_idx, batch_size)
            total_updated += len([f for f in self.updated_files[total_updated:]])
            
            if not has_more:
                break
                
            start_idx += batch_size
            
            # Ask user if they want to continue
            response = input(f"\nContinue with next batch? (y/n/q): ").lower()
            if response in ['n', 'q', 'quit', 'no']:
                break
        
        print(f"\n=== Final Summary ===")
        print(f"Total updated files: {len(self.updated_files)}")
        print(f"Downloaded images to: {self.images_dir}")
        
        if self.updated_files:
            print(f"\nUpdated files:")
            for file_path in self.updated_files:
                print(f"  - {file_path.name}")

def main():
    """Main function."""
    import sys
    
    downloader = ImageDownloader()
    
    if len(sys.argv) > 1 and sys.argv[1] == "--all":
        # Process all files without asking
        downloader.process_all_files()
    else:
        # Process in batches with user confirmation
        downloader.process_all_files()

if __name__ == "__main__":
    main()
