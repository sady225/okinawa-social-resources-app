import os
import re

html_template_path = "/Users/kanmemacbookair/Desktop/github/alpaca-school-youtube/okinawa-social-resources-app/dist/index.html"
output_path = "/Users/kanmemacbookair/Desktop/github/alpaca-school-youtube/okinawa-social-resources-app/dist/standalone.html"

# Read HTML template
with open(html_template_path, "r", encoding="utf-8") as f:
    html_content = f.read()

# Find CSS and JS file paths from the HTML content using regex
css_match = re.search(r'<link rel="stylesheet" crossorigin href="(/assets/index-[a-zA-Z0-9]+\.css)">' , html_content)
js_match = re.search(r'<script type="module" crossorigin src="(/assets/index-[a-zA-Z0-9]+\.js)"></script>', html_content)

# Get the full matched strings for replacement
old_css_link_tag = css_match.group(0) if css_match else None
old_js_script_tag = js_match.group(0) if js_match else None

if not old_css_link_tag or not old_js_script_tag:
    print("Error: Could not find CSS or JS link/script tags in index.html")
    exit(1)

# Extract relative paths for reading file content
css_file_relative_path = css_match.group(1)
js_file_relative_path = js_match.group(1)

# Construct absolute paths
base_dir = os.path.dirname(html_template_path)
css_path = os.path.join(base_dir, css_file_relative_path.lstrip('/'))
js_path = os.path.join(base_dir, js_file_relative_path.lstrip('/'))

# Read CSS content
with open(css_path, "r", encoding="utf-8") as f:
    css_content = f.read()

# Read JavaScript content
with open(js_path, "r", encoding="utf-8") as f:
    js_content = f.read()

# Inline CSS
html_content = html_content.replace(
    old_css_link_tag,
    f'<style>{css_content}</style>'
)

# Inline JavaScript
html_content = html_content.replace(
    old_js_script_tag,
    f'<script type="module">{js_content}</script>'
)

# Write the combined HTML to a new file
with open(output_path, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"Successfully created {output_path}")
