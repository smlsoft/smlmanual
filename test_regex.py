#!/usr/bin/env python3

import re

# Test content with broken image
content = '''**ยอดลูกหนี้ยกมา**[![](http://www.smlaccount.com/manual/wp-
content/uploads/2017/10/ตั้งหนี้ยกมา.jpg)](http://www.smlaccount.com/manual/wp-
content/uploads/2017/10/ตั้งหนี้ยกมา.jpg)'''

print('Original content:')
print(repr(content))
print()

# Test the regex pattern
pattern = r'(\[!\[[^\]]*\]\(http://[^)]*wp-)\s*\n\s*(content/uploads/[^)]*\))'
matches = re.findall(pattern, content, flags=re.MULTILINE)

print(f'Found {len(matches)} matches')
for i, match in enumerate(matches):
    print(f'Match {i}: {match}')

# Apply the fix
def replace_func(match):
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

fixed_content = re.sub(pattern, replace_func, content, flags=re.MULTILINE)

print('\nFixed content:')
print(repr(fixed_content))
