import os
import re

symbols_dir = r"c:\Users\Sajida Randhawa\Desktop\fancysymbols\symbols"
root_dir = r"c:\Users\Sajida Randhawa\Desktop\fancysymbols"

# Sidebar updates
sidebar_links_to_add = """      <a href="symbols/numbers.html"><span class="link-icon">①</span> Numbers</a>
      <a href="symbols/writing.html"><span class="link-icon">✍️</span> Writing</a>
      <a href="symbols/roman.html"><span class="link-icon">Ⅳ</span> Roman Numerals</a>"""

def update_sidebar(content, is_subpage=False):
    prefix = "" if not is_subpage else "" # Paths are handled by full replacement or targeted insertion
    # Find the POPULAR SYMBOLS section
    pattern = r'(<div class="sidebar-title">POPULAR SYMBOLS</div>\s*<div class="sidebar-links">.*?)(<a href="symbols/upside-down.html"|<a href="upside-down.html")'
    
    match = re.search(pattern, content, re.DOTALL)
    if match:
        existing_links = match.group(1)
        target = match.group(2)
        
        # Check if already added
        if "numbers.html" in content:
            return content
            
        links = sidebar_links_to_add
        if is_subpage:
            links = links.replace('href="symbols/', 'href="')
            
        new_content = content.replace(target, links + "\n      " + target)
        return new_content
    return content

# Page structure updates
def update_page_layout(content, filename):
    category = filename.replace(".html", "").replace("-", " ").title()
    if category == "Old English": category = "Old English Font"
    
    # Remove back-link from top and update h1
    # Pattern to match main-content start and page-header
    pattern = r'(<main class="main-content">)\s*(<a href="\.\./index.html" class="back-link">.*?</a>)?\s*(<div class="page-header">.*?</h1>.*?</div>)'
    
    replacement = r'\1\n    <div class="page-header">\n      <h1>' + category + r' Symbol Copy and Paste</h1>\n    </div>'
    
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    return content

# Category Grid HTML
category_grid = """
    <!-- CATEGORY NAVIGATION -->
    <div class="section-title">Browse More Symbols <span class="line"></span></div>
    <div class="quick-links-grid">
      <a href="heart.html" class="quick-link-btn"><span>❤️</span> Heart</a>
      <a href="star.html" class="quick-link-btn"><span>⭐</span> Star</a>
      <a href="arrow.html" class="quick-link-btn"><span>⇨</span> Arrow</a>
      <a href="flower.html" class="quick-link-btn"><span>✿</span> Flower</a>
      <a href="checkmark.html" class="quick-link-btn"><span>✔️</span> Check Mark</a>
      <a href="music.html" class="quick-link-btn"><span>🎵</span> Music</a>
      <a href="emoji-faces.html" class="quick-link-btn"><span>🥰</span> Smiley Face</a>
      <a href="crown.html" class="quick-link-btn"><span>👑</span> Crown</a>
      <a href="square.html" class="quick-link-btn"><span>⬛</span> Square</a>
      <a href="dot.html" class="quick-link-btn"><span>•</span> Dot</a>
      <a href="circle.html" class="quick-link-btn"><span>○</span> Circle</a>
      <a href="loading.html" class="quick-link-btn"><span>▓</span> Loading</a>
      <a href="wave.html" class="quick-link-btn"><span>〰</span> Wave</a>
      <a href="bracket.html" class="quick-link-btn"><span>【</span> Bracket</a>
      <a href="divider.html" class="quick-link-btn"><span>┊</span> Divider</a>
      <a href="border.html" class="quick-link-btn"><span>╔</span> Border</a>
      <a href="sparkle.html" class="quick-link-btn"><span>✨</span> Sparkle</a>
      <a href="aesthetic.html" class="quick-link-btn"><span>✧</span> Aesthetic</a>
      <a href="crypto.html" class="quick-link-btn"><span>₿</span> Crypto</a>
      <a href="quotation.html" class="quick-link-btn"><span>❝</span> Quotation Mark</a>
      <a href="diamond.html" class="quick-link-btn"><span>◆</span> Diamond</a>
      <a href="house.html" class="quick-link-btn"><span>🏠</span> House</a>
      <a href="old-english.html" class="quick-link-btn"><span>𝔄</span> Old English</a>
      <a href="upside-down.html" class="quick-link-btn"><span>ʇ</span> Upside Down</a>
      <a href="numbers.html" class="quick-link-btn"><span>①</span> Numbers</a>
      <a href="writing.html" class="quick-link-btn"><span>✍️</span> Writing</a>
      <a href="roman.html" class="quick-link-btn"><span>Ⅳ</span> Roman Numerals</a>
      <a href="zodiac.html" class="quick-link-btn"><span>♈</span> Zodiac</a>
      <a href="currency.html" class="quick-link-btn"><span>$</span> Currency</a>
      <a href="math.html" class="quick-link-btn"><span>∑</span> Math</a>
    </div>
"""

def add_category_grid(content):
    if "CATEGORY NAVIGATION" in content:
        return content
    
    # Insert before the end of main-content
    if "</main>" in content:
        return content.replace("</main>", category_grid + "\n  </main>")
    return content

# Main loop
for filename in os.listdir(symbols_dir):
    if filename.endswith(".html"):
        filepath = os.path.join(symbols_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        content = update_sidebar(content, is_subpage=True)
        content = update_page_layout(content, filename)
        content = add_category_grid(content)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

# Update index.html and all-symbols.html sidebar
for root_file in ["index.html", "all-symbols.html"]:
    filepath = os.path.join(root_dir, root_file)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = update_sidebar(content, is_subpage=False)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Done updating all files.")
