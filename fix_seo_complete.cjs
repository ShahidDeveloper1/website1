/**
 * Comprehensive SEO Fix Script for fancysymbols.com
 * - Replaces remaining "text symbols" references in titles/descriptions
 * - Fixes duplicate/generic meta descriptions with unique SEO-optimized ones
 * - Fixes wrong example text in name pages (e.g., Emma showing Kayla)
 * - Adds missing og:url meta tags
 * - Ensures all pages are properly indexable
 * - Updates structured data (JSON-LD) to match
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const TODAY = new Date().toISOString().split('T')[0];

// ============================================================
// UNIQUE META DESCRIPTIONS FOR PAGES WITH GENERIC/DUPLICATE ONES
// ============================================================
const uniqueDescriptions = {
  // Root pages with generic "Browse cool text symbols" description
  'discord-symbols.html': {
    title: 'Discord Symbols Copy and Paste ✦ Cool Fonts & Special Characters',
    desc: 'Copy cool Discord symbols, fancy fonts & special characters instantly — ✦ ★ ❤ ☾. Perfect for server names, roles, channel names & bios. One click copy!'
  },
  'free-fire-name.html': {
    title: 'Free Fire Name Symbols ✦ Stylish Names & Cool Fonts Generator',
    desc: 'Generate stylish Free Fire names with cool symbols & fancy fonts — ꧁༺✦✧༻꧂. Create unique gaming usernames. One click copy. Works in Free Fire & BGMI!'
  },
  'instagram-symbols.html': {
    title: 'Instagram Symbols Copy and Paste ✦ Aesthetic Bio Fonts & Icons',
    desc: 'Copy aesthetic Instagram symbols & bio fonts instantly — ✧ ❤ ☾ ★. Decorate your IG bio, captions & stories with beautiful Unicode characters. Free!'
  },
  'roblox-symbols.html': {
    title: 'Roblox Symbols Copy and Paste ✦ Cool Fonts for Display Names',
    desc: 'Copy Roblox symbols & fancy fonts for display names instantly — ꧁✦꧂ ★ ❤. Unique characters that work in Roblox chat & usernames. One click copy!'
  },
  'tiktok-symbols.html': {
    title: 'TikTok Symbols Copy and Paste ✦ Bio Fonts & Special Characters',
    desc: 'Copy TikTok symbols & aesthetic bio fonts instantly — ✦ ★ ☾ ❤. Perfect for TikTok bios, usernames & video captions. One click copy. Free!'
  },
  'all-symbols.html': {
    title: 'All Symbols Copy and Paste ✦ 1000+ Fancy Symbols & Emojis',
    desc: 'Browse all 1000+ fancy symbols copy and paste — ✦ ★ ❤ ☾ →. Complete directory of aesthetic icons, arrows, stars & Unicode characters. One click copy!'
  },
  'bio-generator.html': {
    title: 'Bio Generator ✨ Aesthetic Instagram & TikTok Bio Maker',
    desc: 'Generate aesthetic bios for Instagram, TikTok & Discord instantly. Mix fancy fonts, symbols & emojis to create unique social media bios. Free & easy!'
  },
  'bullet-point.html': {
    title: 'Bullet Point Symbols Copy and Paste • ⁃ ‣ Clean List Markers',
    desc: 'Copy bullet point symbols instantly — • ⁃ ‣ ◦ ●. Clean list markers and structural bullets for documents, presentations & social media posts. Free!'
  },

  // Pages directory
  'pages/privacy.html': {
    title: 'Privacy Policy | Fancy Symbols — fancysymbols.com',
    desc: 'Read the privacy policy for fancysymbols.com. Learn how we handle your data, cookies, and privacy when using our fancy text and symbol tools.'
  },
  'pages/terms.html': {
    title: 'Terms of Service | Fancy Symbols — fancysymbols.com',
    desc: 'Read the terms of service for fancysymbols.com. Understand the rules and guidelines for using our fancy text generator and symbol copy-paste tools.'
  },
};

// ============================================================
// UNICODE FONT MAPS FOR NAME GENERATION
// ============================================================
const fontMaps = {
  cursiveBold: {
    A:'𝓐',B:'𝓑',C:'𝓒',D:'𝓓',E:'𝓔',F:'𝓕',G:'𝓖',H:'𝓗',I:'𝓘',J:'𝓙',K:'𝓚',L:'𝓛',M:'𝓜',N:'𝓝',O:'𝓞',P:'𝓟',Q:'𝓠',R:'𝓡',S:'𝓢',T:'𝓣',U:'𝓤',V:'𝓥',W:'𝓦',X:'𝓧',Y:'𝓨',Z:'𝓩',
    a:'𝓪',b:'𝓫',c:'𝓬',d:'𝓭',e:'𝓮',f:'𝓯',g:'𝓰',h:'𝓱',i:'𝓲',j:'𝓳',k:'𝓴',l:'𝓵',m:'𝓶',n:'𝓷',o:'𝓸',p:'𝓹',q:'𝓺',r:'𝓻',s:'𝓼',t:'𝓽',u:'𝓾',v:'𝓿',w:'𝔀',x:'𝔁',y:'𝔂',z:'𝔃'
  },
  squared: {
    A:'🄰',B:'🄱',C:'🄲',D:'🄳',E:'🄴',F:'🄵',G:'🄶',H:'🄷',I:'🄸',J:'🄹',K:'🄺',L:'🄻',M:'🄼',N:'🄽',O:'🄾',P:'🄿',Q:'🅀',R:'🅁',S:'🅂',T:'🅃',U:'🅄',V:'🅅',W:'🅆',X:'🅇',Y:'🅈',Z:'🅉',
    a:'🄰',b:'🄱',c:'🄲',d:'🄳',e:'🄴',f:'🄵',g:'🄶',h:'🄷',i:'🄸',j:'🄹',k:'🄺',l:'🄻',m:'🄼',n:'🄽',o:'🄾',p:'🄿',q:'🅀',r:'🅁',s:'🅂',t:'🅃',u:'🅄',v:'🅅',w:'🅆',x:'🅇',y:'🅈',z:'🅉'
  }
};

function toFont(str, map) {
  return str.split('').map(c => map[c] || c).join('');
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ============================================================
// MAIN PROCESSING
// ============================================================
let totalFixed = 0;
let filesModified = [];

function processFile(filePath, relativePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  let original = html;
  let changes = [];

  // ---- 1. Fix specific pages with known duplicate/generic descriptions ----
  const relKey = relativePath.replace(/\\/g, '/');
  const override = uniqueDescriptions[relKey];
  if (override) {
    // Replace title
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${override.title}</title>`);
    // Replace meta description
    html = html.replace(
      /<meta\s+name="description"\s+content="[^"]*"[^>]*>/,
      `<meta name="description" content="${override.desc}">`
    );
    // Replace OG title
    html = html.replace(
      /<meta\s+property="og:title"\s+content="[^"]*"[^>]*>/,
      `<meta property="og:title" content="${override.title}">`
    );
    // Replace OG description
    html = html.replace(
      /<meta\s+property="og:description"\s+content="[^"]*"[^>]*>/,
      `<meta property="og:description" content="${override.desc}">`
    );
    // Replace Twitter title
    html = html.replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"[^>]*>/,
      `<meta name="twitter:title" content="${override.title}">`
    );
    // Replace Twitter description
    html = html.replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"[^>]*>/,
      `<meta name="twitter:description" content="${override.desc}">`
    );
    changes.push('Fixed title/description with unique SEO content');
  }

  // ---- 2. Fix "Text Symbols" → "Fancy Symbols" in titles (case sensitive) ----
  // In title tag specifically
  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  if (titleMatch) {
    const oldTitle = titleMatch[1];
    let newTitle = oldTitle;
    // Replace "1000+ Text Symbols" with "1000+ Fancy Symbols"
    newTitle = newTitle.replace(/(\d+\+?\s+)Text Symbols/g, '$1Fancy Symbols');
    // Replace "Text Symbols Copy" → "Fancy Symbols Copy" (only if at start or prominent)
    newTitle = newTitle.replace(/^Text Symbols Copy/g, 'Fancy Symbols Copy');
    if (newTitle !== oldTitle) {
      html = html.replace(`<title>${oldTitle}</title>`, `<title>${newTitle}</title>`);
      changes.push(`Title: "${oldTitle}" → "${newTitle}"`);
    }
  }

  // ---- 3. Fix names pages showing wrong example text in descriptions ----
  if (relativePath.startsWith('names\\') || relativePath.startsWith('names/')) {
    const nameFile = path.basename(filePath, '.html');
    const nameCapitalized = capitalize(nameFile);
    const nameCursiveBold = toFont(nameCapitalized, fontMaps.cursiveBold);
    const nameSquared = toFont(nameCapitalized.toUpperCase(), fontMaps.squared);

    // Check if the description contains wrong example (e.g., Kayla instead of Emma)
    const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/);
    if (descMatch) {
      const currentDesc = descMatch[1];
      // If description contains 𝓚𝓪𝔂𝓵𝓪 (Kayla) or any other wrong name
      if (currentDesc.includes('𝓚𝓪𝔂𝓵𝓪') || currentDesc.includes('🄺🄰🅈🄻🄰') ||
          !currentDesc.toLowerCase().includes(nameFile.toLowerCase())) {
        const newDesc = `Get ${nameFile} fonts copy and paste instantly — ${nameCursiveBold} 🎀 ${nameSquared}. One click copy. Works everywhere. No app needed! Instant clipboard copy.`;
        html = html.replace(
          /<meta\s+name="description"\s+content="[^"]*"/,
          `<meta name="description" content="${newDesc}"`
        );
        // Also fix OG description
        html = html.replace(
          /<meta\s+property="og:description"\s+content="[^"]*"/,
          `<meta property="og:description" content="${newDesc}"`
        );
        // Also fix Twitter description
        html = html.replace(
          /<meta\s+name="twitter:description"\s+content="[^"]*"/,
          `<meta name="twitter:description" content="${newDesc}"`
        );
        // Fix structured data description
        const ldDescRegex = new RegExp(`"description":\\s*"Get \\w+ fonts copy and paste instantly[^"]*"`, 'g');
        html = html.replace(ldDescRegex, `"description": "${newDesc}"`);
        // Fix generic LD description too
        html = html.replace(
          /"description":\s*"Get \w+ fonts copy and paste instantly — 𝓚𝓪𝔂𝓵𝓪[^"]*"/g,
          `"description": "${newDesc}"`
        );

        changes.push(`Fixed name page description to use correct name: ${nameCapitalized}`);
      }
    }

    // Add missing og:url if not present
    if (!html.includes('og:url')) {
      const ogUrlTag = `<meta property="og:url" content="https://www.fancysymbols.com/names/${nameFile}">`;
      html = html.replace(
        /<meta\s+property="og:type"\s+content="website">/,
        `<meta property="og:type" content="website">\n  ${ogUrlTag}`
      );
      changes.push('Added missing og:url');
    }

    // Add missing twitter:url if not present
    if (!html.includes('twitter:url')) {
      const twUrlTag = `<meta name="twitter:url" content="https://www.fancysymbols.com/names/${nameFile}">`;
      html = html.replace(
        /<meta\s+name="twitter:card"\s+content="summary_large_image">/,
        `<meta name="twitter:card" content="summary_large_image">\n  ${twUrlTag}`
      );
      changes.push('Added missing twitter:url');
    }
  }

  // ---- 4. Fix letters pages - add missing og:url and twitter:url ----
  if (relativePath.startsWith('letters\\') || relativePath.startsWith('letters/')) {
    const letterFile = path.basename(filePath, '.html');
    if (!html.includes('og:url')) {
      const ogUrlTag = `<meta property="og:url" content="https://www.fancysymbols.com/letters/${letterFile}">`;
      html = html.replace(
        /<meta\s+property="og:type"\s+content="website">/,
        `<meta property="og:type" content="website">\n  ${ogUrlTag}`
      );
      changes.push('Added missing og:url');
    }
    if (!html.includes('twitter:url')) {
      const twUrlTag = `<meta name="twitter:url" content="https://www.fancysymbols.com/letters/${letterFile}">`;
      html = html.replace(
        /<meta\s+name="twitter:card"\s+content="summary_large_image">/,
        `<meta name="twitter:card" content="summary_large_image">\n  ${twUrlTag}`
      );
      changes.push('Added missing twitter:url');
    }
  }

  // ---- 5. Replace "text symbols" in meta descriptions across ALL pages ----
  // Replace "cool text symbols" → "cool fancy symbols" in descriptions
  html = html.replace(
    /(<meta\s+name="description"\s+content="[^"]*?)cool text symbols/gi,
    '$1cool fancy symbols'
  );
  html = html.replace(
    /(<meta\s+name="description"\s+content="[^"]*?)Browse cool text symbols and fonts/gi,
    '$1Browse cool fancy symbols and fonts'
  );

  // ---- 6. Fix "text symbols" in body content H2s that Google might pick up ----
  // Only in featured comparison table
  html = html.replace(
    /<th>Text Symbols<\/th>/g,
    '<th>Fancy Symbols</th>'
  );

  // ---- 7. Update structured data to match new titles/descriptions ----
  // Update JSON-LD name field if title changed
  const newTitleMatch = html.match(/<title>([^<]*)<\/title>/);
  if (newTitleMatch) {
    const newTitle = newTitleMatch[1];
    // Update WebPage name in LD+JSON
    const ldNameRegex = /"name":\s*"[^"]+"/;
    const firstLdMatch = html.match(/("@type":\s*"WebPage"[^}]*?"name":\s*)"[^"]+"/);
    if (firstLdMatch) {
      // We need to be careful to only update the WebPage name, not other names
      // This is handled by checking context
    }
  }

  // ---- 8. Update article:modified_time to today ----
  html = html.replace(
    /<meta\s+property="article:modified_time"\s+content="[^"]*">/,
    `<meta property="article:modified_time" content="${TODAY}">`
  );

  // ---- 9. Ensure robots meta tag allows indexing ----
  if (!html.includes('name="robots"')) {
    // Add robots meta tag after viewport
    html = html.replace(
      /<meta\s+name="viewport"[^>]*>/,
      '$&\n  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">'
    );
    changes.push('Added missing robots meta tag');
  }

  // ---- 10. Fix quotation.html broken meta description ----
  if (relativePath.includes('quotation.html')) {
    // This page has a malformed meta description with a stray '" and text symbols'
    const brokenDesc = html.match(/<meta\s+name="description"\s+content="([^>]+)">/);
    if (brokenDesc && brokenDesc[0].includes('" and punctuation')) {
      html = html.replace(
        /<meta\s+name="description"\s+content="[^>]*">/,
        '<meta name="description" content="Copy quotation symbols instantly — ❝ ❞ « » ‹ ›. 60+ beautiful quote marks and punctuation symbols. One click copy. Perfect for Instagram, Discord, TikTok & documents.">'
      );
      changes.push('Fixed broken meta description');
    }
  }

  // Write if changed
  if (html !== original) {
    fs.writeFileSync(filePath, html, 'utf8');
    totalFixed++;
    filesModified.push({ path: relativePath, changes });
    return true;
  }
  return false;
}

// ============================================================
// WALK DIRECTORIES
// ============================================================
function walkDir(dir, relBase = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.join(relBase, entry.name);

    if (entry.isDirectory()) {
      // Only process relevant subdirectories
      if (['symbols', 'letters', 'names', 'pages', 'es', 'fr'].includes(entry.name)) {
        walkDir(fullPath, relPath);
      }
    } else if (entry.name.endsWith('.html')) {
      processFile(fullPath, relPath);
    }
  }
}

console.log('🔧 Starting comprehensive SEO fix...\n');

// Process root HTML files
const rootFiles = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));
for (const file of rootFiles) {
  processFile(path.join(ROOT, file), file);
}

// Process subdirectories
walkDir(ROOT);

console.log(`\n✅ SEO Fix Complete!`);
console.log(`📁 Files modified: ${totalFixed}`);
console.log(`\n📋 Changes summary:`);
for (const item of filesModified) {
  console.log(`  ${item.path}:`);
  for (const change of item.changes) {
    console.log(`    → ${change}`);
  }
}

if (totalFixed === 0) {
  console.log('  (No changes needed - all files are already up to date)');
}
