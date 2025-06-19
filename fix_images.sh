#!/bin/bash

# Script to fix broken image markdown syntax in all markdown files
# This script fixes URLs that are split across multiple lines

echo "Fixing broken image syntax in markdown files..."

# Find all markdown files and process them
find /Users/toe/DEV/smldocs/docs -name "*.md" -type f | while read -r file; do
    echo "Processing: $(basename "$file")"
    
    # Create a temporary file
    temp_file=$(mktemp)
    
    # Fix broken image URLs by joining lines that end with 'wp-' and start with 'content/'
    sed ':a;N;$!ba;s/wp-\n[[:space:]]*content\//wp-content\//g' "$file" > "$temp_file"
    
    # Check if changes were made
    if ! diff -q "$file" "$temp_file" > /dev/null; then
        echo "  Fixed broken URLs in: $(basename "$file")"
        cp "$temp_file" "$file"
    fi
    
    # Clean up
    rm "$temp_file"
done

echo "Done fixing broken image syntax!"

# Now add alt text to images without it
echo "Adding alt text to images..."

find /Users/toe/DEV/smldocs/docs -name "*.md" -type f | while read -r file; do
    # Use sed to add alt text to images that have empty alt text [![](
    if grep -q '!\[\](' "$file"; then
        echo "Adding alt text to: $(basename "$file")"
        
        # Extract image filename and use as alt text
        sed -i '' 's/!\[\](\([^)]*\/\([^/)]*\)\.jpg\))/![\2](\1)/g' "$file"
    fi
done

echo "Done adding alt text!"
