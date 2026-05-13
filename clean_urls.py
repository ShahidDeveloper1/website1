import os
import re

def clean_file(filepath, is_root=False, is_symbols=False, is_pages=False):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update Canonical and OG URL (Absolute URLs)
    content = re.sub(r"(https?://fancysymbols\.com/[^'\"]+)\.html", r"\1", content)
    # Special case for index.html in absolute URLs
    content = content.replace("https://fancysymbols.com/index", "https://fancysymbols.com/")

    # 2. Update Internal Links (Relative/Local paths)
    
    # Root links
    content = re.sub(r'href=["\'](\.\./)?index\.html["\']', 'href="/"', content)
    content = re.sub(r'href=["\'](\.\./)?all-symbols\.html["\']', 'href="/all-symbols"', content)
    content = re.sub(r'href=["\'](\.\./)?font-generator\.html["\']', 'href="/font-generator"', content)
    content = re.sub(r'href=["\'](\.\./)?lenny-face\.html["\']', 'href="/lenny-face"', content)

    # Pages links
    content = re.sub(r'href=["\'](\.\./)?pages/([^"\']+)\.html["\']', r'href="/pages/\2"', content)
    
    # Symbols links
    if is_root:
        # In root files, symbols are usually in symbols/ folder
        content = re.sub(r'href=["\']symbols/([^"\']+)\.html["\']', r'href="/symbols/\1"', content)
    elif is_symbols:
        # In symbols files, other symbols are usually in same folder (relative)
        # We transform them to root-relative
        content = re.sub(r'href=["\'](?!\.\./)([^"\']+)\.html["\']', r'href="/symbols/\1"', content)
    elif is_pages:
        # In pages files
        content = re.sub(r'href=["\']\.\./symbols/([^"\']+)\.html["\']', r'href="/symbols/\1"', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

base_dir = r"c:\Users\Sajida Randhawa\Desktop\fancysymbols"

# Root level
root_files = [f for f in os.listdir(base_dir) if f.endswith('.html')]
for f in root_files:
    clean_file(os.path.join(base_dir, f), is_root=True)

# Symbols level
symbols_dir = os.path.join(base_dir, 'symbols')
if os.path.exists(symbols_dir):
    symbol_files = [f for f in os.listdir(symbols_dir) if f.endswith('.html')]
    for f in symbol_files:
        clean_file(os.path.join(symbols_dir, f), is_symbols=True)

# Pages level
pages_dir = os.path.join(base_dir, 'pages')
if os.path.exists(pages_dir):
    page_files = [f for f in os.listdir(pages_dir) if f.endswith('.html')]
    for f in page_files:
        clean_file(os.path.join(pages_dir, f), is_pages=True)

print("Clean URLs migration complete.")
