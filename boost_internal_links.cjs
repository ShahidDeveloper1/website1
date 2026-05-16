/**
 * Boost Internal Links for All Pages
 * 
 * Problem: Many pages have "Only 1 Incoming Link" — SEO scanners flag this
 * because pages with few internal links are harder for search engines to discover.
 * 
 * Solution: Add a comprehensive "Related Symbols" grid to EVERY symbol page that
 * links to 10+ other symbol pages, and ensure the "Browse More Symbols" section
 * covers ALL categories. Also add cross-linking in the footer.
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

// ═══════════════════════════════════════════════
// PART 1: Ensure NO internal links point to root-level shortcut URLs
// All links should use /symbols/ paths directly
// ═══════════════════════════════════════════════

const ROOT_SHORTCUTS = [
  'emoji-faces', 'sun', 'moon', 'cross', 'numbers', 'uparrow', 'downarrow',
  'gender', 'infinity', 'medical', 'chess', 'religion', 'copyright', 'unit',
  'card', 'dice', 'transport', 'office', 'award', 'lock', 'warning', 'writing',
  'weapon', 'roman', 'greek', 'fraction', 'comparison', 'line', 'triangle',
  'rectangle', 'corner', 'punctuation', 'chinese', 'japanese', 'korean',
  'bubble', 'cursive', 'german', 'math'
];

function getAllHtmlFiles(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (['node_modules', '.git', 'dist', 'es', 'fr'].includes(entry.name)) continue;
    if (entry.isDirectory()) {
      results = results.concat(getAllHtmlFiles(fullPath));
    } else if (entry.name.endsWith('.html') && !entry.name.startsWith('old_')) {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = getAllHtmlFiles(ROOT);
let shortcutLinksFixed = 0;

for (const file of htmlFiles) {
  let html = fs.readFileSync(file, 'utf8');
  const original = html;

  // Fix any remaining root-level shortcut links → /symbols/ path
  for (const slug of ROOT_SHORTCUTS) {
    // Match href="/slug" (not href="/symbols/slug")
    const badPattern = new RegExp(`href=["']\\/${slug}["']`, 'g');
    html = html.replace(badPattern, `href="/symbols/${slug}"`);
  }

  if (html !== original) {
    fs.writeFileSync(file, html);
    shortcutLinksFixed++;
  }
}
console.log(`✅ Fixed root-level shortcut links in ${shortcutLinksFixed} files`);

// ═══════════════════════════════════════════════
// PART 2: Add expanded footer with MORE category links across ALL pages
// This dramatically increases incoming links for every page
// ═══════════════════════════════════════════════

const FOOTER_CATEGORIES = [
  { href: '/symbols/heart', name: 'Heart Symbols' },
  { href: '/symbols/star', name: 'Star Symbols' },
  { href: '/symbols/flower', name: 'Flower Symbols' },
  { href: '/symbols/aesthetic', name: 'Aesthetic Symbols' },
  { href: '/symbols/arrow', name: 'Arrow Symbols' },
  { href: '/symbols/moon', name: 'Moon Symbols' },
  { href: '/symbols/sun', name: 'Sun Symbols' },
  { href: '/symbols/greek', name: 'Greek Symbols' },
  { href: '/symbols/cross', name: 'Cross Symbols' },
  { href: '/symbols/math', name: 'Math Symbols' },
  { href: '/symbols/japanese', name: 'Japanese Symbols' },
  { href: '/symbols/korean', name: 'Korean Symbols' },
  { href: '/symbols/crown', name: 'Crown Symbols' },
  { href: '/symbols/music', name: 'Music Symbols' },
  { href: '/symbols/emoji-faces', name: 'Emoji Faces' },
  { href: '/symbols/checkmark', name: 'Check Marks' },
];

const FOOTER_TOOLS = [
  { href: '/all-symbols', name: 'All Symbols' },
  { href: '/preppy-fonts', name: 'Preppy Font Generator' },
  { href: '/aesthetic-fonts', name: 'Aesthetic Fonts' },
  { href: '/cute-fonts', name: 'Cute Fonts' },
  { href: '/lenny-face', name: 'Lenny Faces' },
  { href: '/font-generator', name: 'Fancy Text Generator' },
];

const footerCatHtml = FOOTER_CATEGORIES.map(c =>
  `          <li><a href="${c.href}">${c.name}</a></li>`
).join('\n');

const footerToolsHtml = FOOTER_TOOLS.map(c =>
  `          <li><a href="${c.href}">${c.name}</a></li>`
).join('\n');

let footerUpdated = 0;

for (const file of htmlFiles) {
  let html = fs.readFileSync(file, 'utf8');
  const original = html;

  // Update Categories footer section
  const catMatch = html.match(/<h4 class="footer-col-title">Categories<\/h4>\s*<ul class="footer-links-list">([\s\S]*?)<\/ul>/);
  if (catMatch) {
    html = html.replace(catMatch[0], `<h4 class="footer-col-title">Categories</h4>
        <ul class="footer-links-list">
${footerCatHtml}
        </ul>`);
  }

  // Update Text Tools footer section
  const toolsMatch = html.match(/<h4 class="footer-col-title">Text Tools<\/h4>\s*<ul class="footer-links-list">([\s\S]*?)<\/ul>/);
  if (toolsMatch) {
    html = html.replace(toolsMatch[0], `<h4 class="footer-col-title">Text Tools</h4>
        <ul class="footer-links-list">
${footerToolsHtml}
        </ul>`);
  }

  if (html !== original) {
    fs.writeFileSync(file, html);
    footerUpdated++;
  }
}
console.log(`✅ Updated footer with 16 category + 6 tool links across ${footerUpdated} pages`);

// ═══════════════════════════════════════════════
// PART 3: Add "Popular Categories" quick-links section to ALL tool pages
// (font-generator, lenny-face, preppy-fonts, etc.)
// These pages don't have the inject_category_grid, so they lack cross-links
// ═══════════════════════════════════════════════

const TOOL_PAGES = [
  'font-generator.html', 'lenny-face.html', 'preppy-fonts.html', 
  'cute-fonts.html', 'aesthetic-fonts.html', 'all-symbols.html',
  'bubble-text.html', 'cursive-text.html', 'gothic-text.html',
  'morse-code.html', 'small-text.html', 'strikethrough-text.html',
  'upside-down-text.html', 'vaporwave-text.html', 'zalgo-text.html',
  'text-repeater.html', 'invisible-character.html', 'bullet-point.html',
  'character-counter.html', 'username-generator.html', 'free-fire-name.html',
  'emoticons.html', 'roblox-symbols.html', 'tiktok-symbols.html',
];

const POPULAR_SYMBOLS_GRID = `
  <!-- POPULAR CATEGORIES - Cross Linking for SEO -->
  <div class="section-title"><span class="icon">📂</span> Popular Symbol Categories <span class="line"></span></div>
  <div class="quick-links-grid">
    <a href="/symbols/heart" class="quick-link-btn" title="Heart Symbols"><span>❤️</span> Heart</a>
    <a href="/symbols/star" class="quick-link-btn" title="Star Symbols"><span>⭐</span> Star</a>
    <a href="/symbols/arrow" class="quick-link-btn" title="Arrow Symbols"><span>⇨</span> Arrow</a>
    <a href="/symbols/flower" class="quick-link-btn" title="Flower Symbols"><span>✿</span> Flower</a>
    <a href="/symbols/checkmark" class="quick-link-btn" title="Check Marks"><span>✔️</span> Check Mark</a>
    <a href="/symbols/music" class="quick-link-btn" title="Music Symbols"><span>🎵</span> Music</a>
    <a href="/symbols/zodiac" class="quick-link-btn" title="Zodiac Symbols"><span>♈</span> Zodiac</a>
    <a href="/symbols/currency" class="quick-link-btn" title="Currency Symbols"><span>💲</span> Currency</a>
    <a href="/symbols/math" class="quick-link-btn" title="Math Symbols"><span>∑</span> Math</a>
    <a href="/symbols/emoji-faces" class="quick-link-btn" title="Smiley Faces"><span>🥰</span> Smiley Face</a>
    <a href="/symbols/moon" class="quick-link-btn" title="Moon Symbols"><span>☾</span> Moon</a>
    <a href="/symbols/sun" class="quick-link-btn" title="Sun Symbols"><span>☀</span> Sun</a>
    <a href="/symbols/greek" class="quick-link-btn" title="Greek Alphabet"><span>Ω</span> Greek</a>
    <a href="/symbols/crown" class="quick-link-btn" title="Crown Symbols"><span>👑</span> Crown</a>
    <a href="/symbols/cross" class="quick-link-btn" title="Cross Symbols"><span>✝</span> Cross</a>
    <a href="/symbols/weather" class="quick-link-btn" title="Weather Symbols"><span>🌧️</span> Weather</a>
    <a href="/symbols/hand" class="quick-link-btn" title="Hand Symbols"><span>✌️</span> Hand</a>
    <a href="/symbols/aesthetic" class="quick-link-btn" title="Aesthetic Symbols"><span>✧</span> Aesthetic</a>
    <a href="/symbols/japanese" class="quick-link-btn" title="Japanese Symbols"><span>あ</span> Japanese</a>
    <a href="/symbols/korean" class="quick-link-btn" title="Korean Symbols"><span>한</span> Korean</a>
    <a href="/symbols/chinese" class="quick-link-btn" title="Chinese Symbols"><span>中</span> Chinese</a>
    <a href="/symbols/numbers" class="quick-link-btn" title="Number Symbols"><span>①</span> Numbers</a>
    <a href="/symbols/infinity" class="quick-link-btn" title="Infinity Symbols"><span>∞</span> Infinity</a>
    <a href="/symbols/sparkle" class="quick-link-btn" title="Sparkle Symbols"><span>✨</span> Sparkle</a>
  </div>`;

let toolPagesUpdated = 0;

for (const pageName of TOOL_PAGES) {
  const filePath = path.join(ROOT, pageName);
  if (!fs.existsSync(filePath)) continue;

  let html = fs.readFileSync(filePath, 'utf8');

  // Skip if already has Popular Categories
  if (html.includes('Popular Symbol Categories')) continue;

  // Insert before </main> or before the footer
  const mainEndIdx = html.indexOf('</main>');
  const footerIdx = html.indexOf('<footer');
  
  let insertIdx = -1;
  if (mainEndIdx !== -1) {
    insertIdx = mainEndIdx;
  } else if (footerIdx !== -1) {
    insertIdx = footerIdx;
  }

  if (insertIdx !== -1) {
    html = html.substring(0, insertIdx) + POPULAR_SYMBOLS_GRID + '\n' + html.substring(insertIdx);
    fs.writeFileSync(filePath, html);
    toolPagesUpdated++;
  }
}
console.log(`✅ Added Popular Categories grid to ${toolPagesUpdated} tool pages`);

// ═══════════════════════════════════════════════
// PART 4: Also add cross-links to name pages 
// ═══════════════════════════════════════════════

const namesDir = path.join(ROOT, 'names');
let namesPagesUpdated = 0;

if (fs.existsSync(namesDir)) {
  const nameFiles = fs.readdirSync(namesDir)
    .filter(f => f.endsWith('.html') && !f.startsWith('old'));

  for (const nameFile of nameFiles) {
    const filePath = path.join(namesDir, nameFile);
    let html = fs.readFileSync(filePath, 'utf8');

    if (html.includes('Popular Symbol Categories')) continue;

    const mainEndIdx = html.indexOf('</main>');
    const footerIdx = html.indexOf('<footer');
    
    let insertIdx = -1;
    if (mainEndIdx !== -1) {
      insertIdx = mainEndIdx;
    } else if (footerIdx !== -1) {
      insertIdx = footerIdx;
    }

    if (insertIdx !== -1) {
      html = html.substring(0, insertIdx) + POPULAR_SYMBOLS_GRID + '\n' + html.substring(insertIdx);
      fs.writeFileSync(filePath, html);
      namesPagesUpdated++;
    }
  }
}
console.log(`✅ Added Popular Categories grid to ${namesPagesUpdated} name pages`);

console.log('\n🎉 Internal link boost complete!');
console.log(`📊 Summary:`);
console.log(`   - Root-level shortcut links fixed: ${shortcutLinksFixed} files`);
console.log(`   - Footer expanded: ${footerUpdated} pages (16 categories + 6 tools)`);
console.log(`   - Tool pages cross-linked: ${toolPagesUpdated} pages`);
console.log(`   - Name pages cross-linked: ${namesPagesUpdated} pages`);
