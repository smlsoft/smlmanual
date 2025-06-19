import os
import requests
import html2text

# === CONFIG ===
WORDPRESS_API_URL = 'https://www.smlaccount.com/manual/wp-json/wp/v2/pages'
EXPORT_FOLDER = 'docs'  # Folder to save .md files

# === INIT ===
if not os.path.exists(EXPORT_FOLDER):
    os.makedirs(EXPORT_FOLDER)

html_to_md = html2text.HTML2Text()
html_to_md.ignore_links = False  # You can set to True if you want to remove links

# === GET WP PAGES ===
def get_wordpress_pages():
    all_pages = []
    page = 1
    while True:
        print(f"Fetching page {page}...")
        res = requests.get(f"{WORDPRESS_API_URL}?per_page=100&page={page}")
        if res.status_code != 200:
            print(f"Error: HTTP {res.status_code}")
            break
        
        pages_data = res.json()
        if not pages_data:
            print("No more pages found.")
            break
            
        all_pages += pages_data
        print(f"Retrieved {len(pages_data)} pages. Total so far: {len(all_pages)}")
        page += 1
    
    print(f"Total pages retrieved: {len(all_pages)}")
    return all_pages

# === SAVE AS MARKDOWN ===
def save_page_as_markdown(page):
    title = page['title']['rendered']
    slug = page['slug']
    content_html = page['content']['rendered']
    date = page['date'][:10]

    # Convert HTML to Markdown
    content_md = html_to_md.handle(content_html)

    # Clean title for filename - remove HTML entities and invalid characters
    import html
    import re
    clean_title = html.unescape(title)  # Decode HTML entities
    clean_title = re.sub(r'[<>:"/\\|?*]', '', clean_title)  # Remove invalid filename characters
    clean_title = clean_title.replace(' ', '-')  # Replace spaces with hyphens
    clean_title = clean_title[:100]  # Limit length to avoid filesystem issues
    
    # Use title for filename instead of slug
    filename = f"{date}-{clean_title}.md"
    filepath = os.path.join(EXPORT_FOLDER, filename)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(f"# {title}\n\n")
        f.write(content_md)

    print(f"✅ Saved: {filename}")

# === RUN ===
print("Starting WordPress export...")
pages = get_wordpress_pages()
print(f"\nExporting {len(pages)} pages to markdown...")

for i, page in enumerate(pages, 1):
    try:
        save_page_as_markdown(page)
        print(f"Progress: {i}/{len(pages)} pages processed")
    except Exception as e:
        print(f"❌ Error processing page {i}: {e}")
        continue

print(f"\n🎉 Export completed! {len(pages)} pages processed.")
