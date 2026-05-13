import os
import re

symbols_dir = r"c:\Users\Sajida Randhawa\Desktop\fancysymbols\symbols"

def get_keyword(content):
    # Try title tag first
    title_match = re.search(r'<title>(.*?)(?:\s+Symbols?|\s+Symbol).*?</title>', content, re.IGNORECASE)
    if title_match:
        return title_match.group(1).strip()
    return None

for filename in os.listdir(symbols_dir):
    if filename.endswith(".html"):
        filepath = os.path.join(symbols_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        keyword = get_keyword(content)
        if not keyword:
            # Fallback to filename
            keyword = filename.replace(".html", "").replace("-", " ").title()
            # Special case for lenny face or similar if they were here
        
        # Standardize keyword: remove emojis if any at the start/end
        keyword = re.sub(r'^[^\w\s]+|[^\w\s]+$', '', keyword).strip()
        
        new_h1 = f"<h1>{keyword} Symbols Copy and Paste</h1>"
        
        # Replace the entire H1 tag
        new_content = re.sub(r'<h1>.*?</h1>', new_h1, content)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filename}: {new_h1}")
        else:
            print(f"No change for {filename}")
