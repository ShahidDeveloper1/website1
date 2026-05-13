const fs = require('fs');
const path = require('path');

const DOMAIN = "https://fancysymbols.com";

const CORE_ROOT_PAGES = [
    'index.html', 'all-symbols.html', 'cute-fonts.html', 
    'preppy-fonts.html', 'aesthetic-fonts.html', 'lenny-face.html'
];

function getHeader() {
    return `<header class="header">
  <div class="header-inner">
    <a href="/" class="logo">
      <img src="/favicon.png" alt="TextSymbols Logo" class="logo-img">
      <span class="logo-text">TextSymbols</span>
    </a>
    <nav class="header-nav">
      <a href="/index.html">Home</a>
      <a href="/all-symbols.html">All Symbols</a>
      <a href="/preppy-fonts.html"><span class="link-icon">🎀</span> Preppy Font Generator</a>
      <a href="/cute-fonts.html">Cute Fonts</a>
      <a href="/aesthetic-fonts.html">Aesthetic Fonts</a>
      <a href="/lenny-face.html" class="nav-cta">Lenny Faces</a>
    </nav>
    <button class="menu-toggle" id="menuToggle">☰</button>
  </div>
</header>
<div class="sidebar-overlay" id="sidebarOverlay"></div>
<aside class="sidebar" id="sidebar"></aside>`;
}

function getFooter() {
    return `<footer class="footer">
  <div class="footer-inner">
    <div class="footer-grid">
      <div class="footer-brand">
        <span class="logo-text highlight">TextSymbols</span>
        <p class="footer-desc">Your premium destination for aesthetic symbols, cute fonts, and creative text tools. Elevate your digital presence with ease.</p>
      </div>
      
      <div>
        <h4 class="footer-col-title">Text Tools</h4>
        <ul class="footer-links-list">
          <li><a href="/all-symbols.html">All Symbols</a></li>
          <li><a href="/preppy-fonts.html">Preppy Font Generator</a></li>
          <li><a href="/aesthetic-fonts.html">Aesthetic Fonts</a></li>
          <li><a href="/cute-fonts.html">Cute Fonts</a></li>
          <li><a href="/lenny-face.html">Lenny Faces</a></li>
        </ul>
      </div>

      <div>
        <h4 class="footer-col-title">Categories</h4>
        <ul class="footer-links-list">
          <li><a href="/symbols/heart.html">Heart Symbols</a></li>
          <li><a href="/symbols/star.html">Star Symbols</a></li>
          <li><a href="/symbols/flower.html">Flower Symbols</a></li>
          <li><a href="/symbols/aesthetic.html">Aesthetic Symbols</a></li>
        </ul>
      </div>

      <div>
        <h4 class="footer-col-title">Company</h4>
        <ul class="footer-links-list">
          <li><a href="/pages/privacy.html">Privacy Policy</a></li>
          <li><a href="/pages/terms.html">Terms of Service</a></li>
          <li><a href="/pages/contact.html">Contact Us</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <p class="footer-copy">© 2026 FancySymbols.</p>
      <div class="footer-socials">
        <a href="#" class="footer-social-icon">𝕏</a>
        <a href="#" class="footer-social-icon">📸</a>
        <a href="#" class="footer-social-icon">🎵</a>
      </div>
    </div>
  </div>
  <div id="clipboard-bar"></div>
</footer>
<script src="/script.js?v=5.1"></script>`;
}

// List of all symbol pages to help fix broken relative links
const SYMBOL_PAGES = [
    'heart', 'checkmark', 'animal', 'star', 'sun', 'moon', 'music', 'cross', 'zodiac', 
    'numbers', 'arrow', 'uparrow', 'downarrow', 'flower', 'gender', 'infinity', 
    'medical', 'currency', 'chess', 'weather', 'bracket', 'religion', 'copyright', 
    'unit', 'card', 'dice', 'transport', 'office', 'award', 'lock', 'warning', 
    'writing', 'weapon', 'roman', 'greek', 'emoji-faces', 'fraction', 'comparison', 
    'line', 'circle', 'triangle', 'square', 'rectangle', 'corner', 'punctuation', 
    'chinese', 'japanese', 'korean', 'hand', 'bubble', 'cursive', 'upside-down', 
    'old-english', 'house', 'crown', 'diamond', 'quotation', 'crypto', 'loading', 
    'wave', 'divider', 'border', 'sparkle', 'aesthetic', 'dot', 'german'
];

const LEGAL_PAGES = ['privacy', 'terms', 'contact'];

function modernizePage(filepath) {
    let content = fs.readFileSync(filepath, 'utf8');
    const filename = path.basename(filepath, '.html');
    const isSubdir = filepath.includes(path.sep + 'symbols' + path.sep) || filepath.includes(path.sep + 'pages' + path.sep);
    const folder = isSubdir ? path.basename(path.dirname(filepath)) : '';
    
    // SEO Data
    let h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    let titleText = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : "Fancy Symbols";
    if (filename === 'index') titleText = "Text Symbols Copy and Paste | Cool & Aesthetic Symbols";
    
    const cleanUrlPath = isSubdir ? `${folder}/${filename}.html` : `${filename}.html`;
    const fullUrl = `${DOMAIN}/${cleanUrlPath === 'index.html' ? '' : cleanUrlPath}`;

    const seoHead = `  <meta charset='UTF-8'>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${titleText} - TextSymbols</title>
  <meta name="description" content="Copy and paste ${titleText.toLowerCase()} for your bio, social posts, and messages. Huge collection of aesthetic and cool text symbols. One-click copy!">
  <link rel='canonical' href='${fullUrl}'>
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${fullUrl}">
  <meta property="og:title" content="${titleText}">
  <meta property="og:description" content="Copy and paste ${titleText.toLowerCase()} instantly. Perfect for Instagram, TikTok, and gaming.">
  <meta property="og:image" content="${DOMAIN}/og-image.png">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${fullUrl}">
  <meta name="twitter:title" content="${titleText}">
  <meta name="twitter:description" content="One-click copy for ${titleText.toLowerCase()} and aesthetic text decorations.">
  <meta name="twitter:image" content="${DOMAIN}/og-image.png">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/style.css?v=5.1">
  <link rel="icon" type="image/png" href="/favicon.png">`;

    // 1. Inject Head
    content = content.replace(/<head>[\s\S]*?<\/head>/i, `<head>\n${seoHead}\n</head>`);

    // 2. Inject Header/Sidebar (Removing Slider)
    let headerRegex = /<header[\s\S]*?<\/header>[\s\S]*?<aside[\s\S]*?<\/aside>/i;
    // Check for the control bar if it exists and remove it too
    const controlBarRegex = /<div class="preview-controls">[\s\S]*?<\/div>/i;
    content = content.replace(controlBarRegex, '');
    
    if (!headerRegex.test(content)) headerRegex = /<header[\s\S]*?<\/header>/i;
    content = content.replace(headerRegex, getHeader());

    // 3. Inject Footer
    const footerRegex = /<footer[\s\S]*?<\/footer>[\s\S]*?<script[\s\S]*?<\/script>/i;
    content = content.replace(footerRegex, getFooter());

    // 4. Link Fixes
    content = content.replace(/href="(?!\/\/|http|#)([^"]+)\.html"/g, (match, p1) => {
        let clean = p1.replace(/^\.\.\//, '').replace(/^\.\//, '').replace(/\/$/, '').split('/').pop();
        if (SYMBOL_PAGES.includes(clean)) return `href="/symbols/${clean}.html"`;
        if (LEGAL_PAGES.includes(clean)) return `href="/pages/${clean}.html"`;
        return `href="/${clean}.html"`;
    });
    content = content.replace(/href="\/index\.html"/g, 'href="/"');

    fs.writeFileSync(filepath, content, 'utf8');
}

console.log("🚀 Reverting site: Removing Preview Slider Globaly...");

const rootFiles = fs.readdirSync(process.cwd()).filter(f => f.endsWith('.html'));
rootFiles.forEach(f => {
    if (CORE_ROOT_PAGES.includes(f)) modernizePage(path.join(process.cwd(), f));
    else {
        if (fs.existsSync(path.join(process.cwd(), 'symbols', f)) || fs.existsSync(path.join(process.cwd(), 'pages', f))) {
            fs.unlinkSync(path.join(process.cwd(), f));
        } else modernizePage(path.join(process.cwd(), f));
    }
});

['symbols', 'pages'].forEach(dir => {
    const dirPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(dirPath)) return;
    fs.readdirSync(dirPath).filter(f => f.endsWith('.html')).forEach(f => {
        modernizePage(path.join(dirPath, f));
    });
});

console.log("\n✅ SUCCESS: Preview Slider removed from 70+ pages.");
