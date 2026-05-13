import os
import re

root_dir = r"c:\Users\Sajida Randhawa\Desktop\fancysymbols"
symbols_dir = os.path.join(root_dir, "symbols")
pages_dir = os.path.join(root_dir, "pages")

header_link = '<a href="/cute-fonts">Cute Fonts</a>'
sidebar_link = '<a href="/cute-fonts"><span class="link-icon">🌸</span> Cute Fonts</a>'
footer_link = '<a href="/cute-fonts">Cute Fonts</a>'

def update_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'href="/cute-fonts"' in content:
        return # Already updated

    # Update Header
    header_nav_pattern = r'(<nav class="header-nav">)(.*?)(</nav>)'
    def header_rep(match):
        pre, inner, post = match.groups()
        if 'Preppy Font Generator</a>' in inner:
            return pre + inner.replace('Preppy Font Generator</a>', 'Preppy Font Generator</a>' + header_link) + post
        elif 'All Symbols</a>' in inner:
            return pre + inner.replace('All Symbols</a>', 'All Symbols</a>' + header_link) + post
        return match.group(0)
    
    content = re.sub(header_nav_pattern, header_rep, content, flags=re.DOTALL)

    # Update Sidebar (MAIN section)
    sidebar_pattern = r'(<div class="sidebar-title">MAIN</div>\s*<div class="sidebar-links">)(.*?)(</div>)'
    def sidebar_rep(match):
        pre, inner, post = match.groups()
        if 'Preppy Font Generator</a>' in inner:
            return pre + inner.replace('Preppy Font Generator</a>', 'Preppy Font Generator</a>' + sidebar_link) + post
        elif 'All Symbols</a>' in inner:
            return pre + inner.replace('All Symbols</a>', 'All Symbols</a>' + sidebar_link) + post
        return match.group(0)

    content = re.sub(sidebar_pattern, sidebar_rep, content, flags=re.DOTALL)

    # Update Footer
    footer_pattern = r'(<div class="footer-links">)(.*?)(</div>)'
    def footer_rep(match):
        pre, inner, post = match.groups()
        if 'Preppy Font Generator</a>' in inner:
            return pre + inner.replace('Preppy Font Generator</a>', 'Preppy Font Generator</a>' + footer_link) + post
        elif 'All Symbols</a>' in inner:
            return pre + inner.replace('All Symbols</a>', 'All Symbols</a>' + footer_link) + post
        return match.group(0)

    content = re.sub(footer_pattern, footer_rep, content, flags=re.DOTALL)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

# Update root files
for filename in os.listdir(root_dir):
    if filename.endswith(".html"):
        update_file(os.path.join(root_dir, filename))

# Update symbols files
if os.path.exists(symbols_dir):
    for filename in os.listdir(symbols_dir):
        if filename.endswith(".html"):
            update_file(os.path.join(symbols_dir, filename))

# Update pages files
if os.path.exists(pages_dir):
    for filename in os.listdir(pages_dir):
        if filename.endswith(".html"):
            update_file(os.path.join(pages_dir, filename))

print("Navigation update complete.")
