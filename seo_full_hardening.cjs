const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://www.fancysymbols.com';

// ── Related symbol groups for internal linking ──
const RELATED_MAP = {
  'heart': ['star', 'sparkle', 'flower', 'aesthetic', 'diamond'],
  'star': ['sparkle', 'heart', 'moon', 'sun', 'crown'],
  'arrow': ['uparrow', 'downarrow', 'line', 'triangle', 'comparison'],
  'flower': ['heart', 'sparkle', 'aesthetic', 'crown', 'diamond'],
  'checkmark': ['cross', 'arrow', 'circle', 'square', 'comparison'],
  'moon': ['star', 'sun', 'weather', 'zodiac', 'sparkle'],
  'music': ['emoji-faces', 'hand', 'heart', 'star', 'sparkle'],
  'zodiac': ['moon', 'star', 'sun', 'greek', 'religion'],
  'infinity': ['heart', 'math', 'comparison', 'star', 'sparkle'],
  'currency': ['crypto', 'numbers', 'comparison', 'fraction', 'copyright'],
  'cross': ['religion', 'checkmark', 'star', 'crown', 'diamond'],
  'diamond': ['crown', 'heart', 'sparkle', 'star', 'flower'],
  'sparkle': ['star', 'heart', 'aesthetic', 'flower', 'diamond'],
  'aesthetic': ['sparkle', 'heart', 'flower', 'divider', 'border'],
  'circle': ['dot', 'square', 'triangle', 'loading', 'rectangle'],
  'triangle': ['arrow', 'square', 'circle', 'corner', 'diamond'],
  'crown': ['diamond', 'star', 'award', 'heart', 'sparkle'],
  'weather': ['sun', 'moon', 'star', 'wave', 'flower'],
  'emoji-faces': ['hand', 'heart', 'music', 'animal', 'sparkle'],
  'wave': ['line', 'divider', 'border', 'dot', 'loading'],
  'divider': ['line', 'border', 'dot', 'wave', 'corner'],
  'border': ['corner', 'line', 'divider', 'bracket', 'square'],
  'dot': ['circle', 'line', 'divider', 'loading', 'sparkle'],
  'loading': ['dot', 'line', 'square', 'circle', 'wave'],
  'quotation': ['bracket', 'punctuation', 'writing', 'cursive', 'copyright'],
  'line': ['divider', 'border', 'corner', 'dot', 'wave'],
  'numbers': ['fraction', 'roman', 'comparison', 'currency', 'math'],
  'animal': ['emoji-faces', 'hand', 'flower', 'heart', 'star'],
  'sun': ['moon', 'weather', 'star', 'flower', 'sparkle'],
  'greek': ['roman', 'math', 'cursive', 'old-english', 'german'],
  'roman': ['numbers', 'greek', 'fraction', 'old-english', 'cursive'],
  'chinese': ['japanese', 'korean', 'cursive', 'old-english', 'religion'],
  'japanese': ['chinese', 'korean', 'cursive', 'emoji-faces', 'flower'],
  'korean': ['chinese', 'japanese', 'bubble', 'cursive', 'hand'],
  'hand': ['emoji-faces', 'animal', 'heart', 'music', 'writing'],
  'bubble': ['cursive', 'old-english', 'upside-down', 'circle', 'bracket'],
  'cursive': ['old-english', 'bubble', 'upside-down', 'greek', 'writing'],
  'old-english': ['cursive', 'greek', 'roman', 'bubble', 'german'],
  'upside-down': ['bubble', 'cursive', 'old-english', 'bracket', 'punctuation'],
  'house': ['office', 'transport', 'lock', 'writing', 'award'],
  'fraction': ['numbers', 'comparison', 'roman', 'currency', 'math'],
  'comparison': ['fraction', 'numbers', 'arrow', 'checkmark', 'math'],
  'corner': ['border', 'line', 'bracket', 'square', 'rectangle'],
  'bracket': ['corner', 'quotation', 'punctuation', 'border', 'line'],
  'punctuation': ['quotation', 'bracket', 'writing', 'copyright', 'comparison'],
  'religion': ['cross', 'zodiac', 'crown', 'star', 'chinese'],
  'copyright': ['currency', 'punctuation', 'office', 'writing', 'bracket'],
  'gender': ['medical', 'religion', 'zodiac', 'hand', 'heart'],
  'medical': ['gender', 'cross', 'warning', 'office', 'lock'],
  'chess': ['card', 'dice', 'crown', 'diamond', 'award'],
  'card': ['chess', 'dice', 'diamond', 'heart', 'crown'],
  'dice': ['chess', 'card', 'numbers', 'loading', 'circle'],
  'lock': ['warning', 'office', 'weapon', 'house', 'writing'],
  'warning': ['lock', 'medical', 'cross', 'office', 'weapon'],
  'writing': ['office', 'punctuation', 'copyright', 'hand', 'quotation'],
  'weapon': ['lock', 'warning', 'chess', 'crown', 'cross'],
  'transport': ['house', 'office', 'arrow', 'award', 'weather'],
  'office': ['writing', 'house', 'copyright', 'transport', 'lock'],
  'award': ['crown', 'star', 'chess', 'diamond', 'medal'],
  'crypto': ['currency', 'numbers', 'comparison', 'lock', 'diamond'],
  'square': ['rectangle', 'circle', 'triangle', 'border', 'corner'],
  'rectangle': ['square', 'border', 'line', 'loading', 'corner'],
  'german': ['greek', 'roman', 'old-english', 'cursive', 'punctuation'],
  'uparrow': ['downarrow', 'arrow', 'triangle', 'line', 'comparison'],
  'downarrow': ['uparrow', 'arrow', 'triangle', 'line', 'comparison'],
  'math': ['comparison', 'fraction', 'numbers', 'greek', 'infinity'],
  'unit': ['comparison', 'numbers', 'fraction', 'currency', 'weather'],
};

const PAGE_DISPLAY_NAMES = {
  'heart': '❤️ Heart', 'star': '⭐ Star', 'arrow': '➤ Arrow', 'flower': '✿ Flower',
  'checkmark': '✔ Check Mark', 'moon': '☾ Moon', 'music': '♪ Music', 'zodiac': '♈ Zodiac',
  'infinity': '∞ Infinity', 'currency': '$ Currency', 'cross': '✝ Cross', 'diamond': '◆ Diamond',
  'sparkle': '✨ Sparkle', 'aesthetic': '✧ Aesthetic', 'circle': '○ Circle', 'triangle': '▲ Triangle',
  'crown': '👑 Crown', 'weather': '☀ Weather', 'emoji-faces': '🥰 Emoji', 'wave': '〰 Wave',
  'divider': '┊ Divider', 'border': '╔ Border', 'dot': '• Dot', 'loading': '▓ Loading',
  'quotation': '❝ Quotation', 'line': '│ Line', 'numbers': '① Numbers', 'animal': '🐾 Animal',
  'sun': '☀ Sun', 'greek': 'Ω Greek', 'roman': 'Ⅳ Roman', 'chinese': '愛 Chinese',
  'japanese': 'あ Japanese', 'korean': 'ㅿ Korean', 'hand': '✌ Hand', 'bubble': 'ⓐ Bubble',
  'cursive': '𝒜 Cursive', 'old-english': '𝔄 Old English', 'upside-down': 'ʇ Upside Down',
  'house': '🏠 House', 'fraction': '½ Fraction', 'comparison': '≥ Comparison', 'corner': '╚ Corner',
  'bracket': '【 Bracket', 'punctuation': '¡ Punctuation', 'religion': '✝ Religion',
  'copyright': '© Copyright', 'gender': '⚥ Gender', 'medical': '⚕ Medical', 'chess': '♚ Chess',
  'card': '♠ Card', 'dice': '🎲 Dice', 'lock': '🔒 Lock', 'warning': '⚠ Warning',
  'writing': '✍ Writing', 'weapon': '⚔ Weapon', 'transport': '🚗 Transport', 'office': '💼 Office',
  'award': '🏆 Award', 'crypto': '₿ Crypto', 'square': '⬛ Square', 'rectangle': '█ Rectangle',
  'german': 'ß German', 'uparrow': '↑ Up Arrow', 'downarrow': '↓ Down Arrow',
  'math': '∑ Math', 'unit': '℃ Unit',
};

function titleCase(str) {
  return str.split(/[-_]/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// ── Build Related Symbols HTML block ──
function buildRelatedLinks(slug) {
  const related = RELATED_MAP[slug];
  if (!related) return '';

  const links = related.map(r => {
    const display = PAGE_DISPLAY_NAMES[r] || titleCase(r);
    return `      <a href="/symbols/${r}" class="quick-link-btn" title="${titleCase(r)} Symbols"><span>${display.split(' ')[0]}</span> ${display.split(' ').slice(1).join(' ')} Symbols</a>`;
  }).join('\n');

  return `
    <!-- RELATED SYMBOLS - Internal Linking -->
    <div class="section-title">Related Symbols <span class="line"></span></div>
    <div class="quick-links-grid">
${links}
    </div>`;
}

// ── Build preload hints ──
function buildPreloadHints() {
  return `  <link rel="preload" href="/style.css?v=8.0" as="style">
  <link rel="preload" href="/script.js?v=8.0" as="script">
  <link rel="dns-prefetch" href="https://fonts.googleapis.com">
  <link rel="dns-prefetch" href="https://fonts.gstatic.com">`;
}

// ── Process each HTML file ──
function processFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  const slug = path.basename(filepath, '.html');
  const rel = path.relative(process.cwd(), filepath).replace(/\\/g, '/');
  const isSymbolPage = rel.startsWith('symbols/');
  let changes = [];

  // 1. ADD PRELOAD HINTS (if not already present)
  if (!content.includes('rel="preload"')) {
    const preload = buildPreloadHints();
    content = content.replace(
      /<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">/,
      preload + '\n  <link rel="preconnect" href="https://fonts.googleapis.com">'
    );
    changes.push('preload');
  }

  // 1.5 ADD GOOGLE SITE VERIFICATION
  if (!content.includes('google-site-verification')) {
    content = content.replace(
      /<\/head>/i,
      `  <meta name="google-site-verification" content="OvJ6uQVDw0PgIWerWJ88MgLeEMs_hutUY-J1xTOiGBY" />\n</head>`
    );
    changes.push('gsc');
  }

  // 2. ADD LANG ATTRIBUTE (ensure html tag has lang="en")
  if (content.includes('<html>')) {
    content = content.replace('<html>', '<html lang="en">');
    changes.push('lang');
  }

  // 3. ADD ARIA LABELS to interactive elements
  if (!content.includes('aria-label="Toggle menu"')) {
    content = content.replace(
      /<button class="menu-toggle" id="menuToggle">/g,
      '<button class="menu-toggle" id="menuToggle" aria-label="Toggle navigation menu" aria-expanded="false">'
    );
    changes.push('aria');
  }

  // 4. ADD RELATED SYMBOLS (internal linking) for symbol pages
  if (isSymbolPage && RELATED_MAP[slug]) {
    // Remove old related sections if re-running
    content = content.replace(/\s*<!-- RELATED SYMBOLS - Internal Linking -->[\s\S]*?<\/div>\s*(?=<div class="content-article"|<\/main|<!-- CATEGORY)/g, '\n');

    const relatedBlock = buildRelatedLinks(slug);
    // Insert before content-article or before </main>
    if (content.includes('<div class="content-article">')) {
      content = content.replace(
        '<div class="content-article">',
        relatedBlock + '\n<div class="content-article">'
      );
    } else if (content.includes('<!-- CATEGORY NAVIGATION -->')) {
      content = content.replace(
        '<!-- CATEGORY NAVIGATION -->',
        relatedBlock + '\n  <!-- CATEGORY NAVIGATION -->'
      );
    }
    changes.push(`related(${RELATED_MAP[slug].length})`);
  }

  // 5. ADD noopener noreferrer to external links
  content = content.replace(
    /(<a\s+[^>]*href="https?:\/\/[^"]*"[^>]*)(?!.*rel=)(>)/g,
    '$1 rel="noopener noreferrer" target="_blank"$2'
  );

  // 6. ADD STRUCTURED DATA - ItemList for symbol grids (only for symbol pages)
  if (isSymbolPage && !content.includes('"@type": "ItemList"')) {
    const symbolItems = [];
    const symbolRegex = /<div class="symbol-item">([^<]+)<\/div>/g;
    let match;
    let pos = 1;
    while ((match = symbolRegex.exec(content)) !== null && pos <= 20) {
      symbolItems.push({
        "@type": "ListItem",
        "position": pos,
        "name": match[1].trim(),
        "url": `${DOMAIN}/symbols/${slug}`
      });
      pos++;
    }
    if (symbolItems.length > 0) {
      const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": `${titleCase(slug)} Symbols`,
        "numberOfItems": symbolItems.length,
        "itemListElement": symbolItems
      };
      const schemaTag = `  <script type="application/ld+json">\n${JSON.stringify(itemListSchema, null, 2)}\n  </script>`;
      content = content.replace(/<\/head>/i, `${schemaTag}\n</head>`);
      changes.push(`itemList(${symbolItems.length})`);
    }
  }

  // 7. ADD "dateModified" META TAG for freshness signals
  if (!content.includes('article:modified_time')) {
    const today = new Date().toISOString().split('T')[0];
    content = content.replace(
      /<\/head>/i,
      `  <meta property="article:modified_time" content="${today}">\n</head>`
    );
    changes.push('date');
  }

  fs.writeFileSync(filepath, content, 'utf8');
  return changes;
}

// ── Run ──
console.log('🚀 Full SEO Hardening: Internal Links + ItemList + Preload + Accessibility + Security\n');

let stats = { files: 0, related: 0, itemLists: 0 };
const SKIP_DIRS = new Set(['.git', 'node_modules', 'dist', 'es', 'fr', 'images', '.vscode']);

function walkDir(dir) {
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (!SKIP_DIRS.has(entry)) walkDir(full);
    } else if (entry.endsWith('.html')) {
      const changes = processFile(full);
      stats.files++;
      if (changes.some(c => c.startsWith('related'))) stats.related++;
      if (changes.some(c => c.startsWith('itemList'))) stats.itemLists++;
      const rel = path.relative(process.cwd(), full).replace(/\\/g, '/');
      console.log(`  ✅ ${rel} — [${changes.join(', ')}]`);
    }
  }
}

walkDir(process.cwd());

console.log(`\n✅ COMPLETE: ${stats.files} pages hardened`);
console.log(`   🔗 ${stats.related} pages with Related Symbols internal links`);
console.log(`   📋 ${stats.itemLists} ItemList schemas injected`);
console.log(`   ⚡ Preload hints, ARIA labels, and date signals added globally`);
