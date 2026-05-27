/**
 * Fix remaining JSON-LD structured data that still has old descriptions
 * Also fixes "Browse cool text symbols" in JSON-LD descriptions
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
let totalFixed = 0;

// Pages and their new descriptions for JSON-LD
const jsonLdFixes = {
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
};

const pageFixes = {
  'pages/privacy.html': {
    title: 'Privacy Policy | Fancy Symbols — fancysymbols.com',
    desc: 'Read the privacy policy for fancysymbols.com. Learn how we handle your data, cookies, and privacy when using our fancy text and symbol tools.'
  },
  'pages/terms.html': {
    title: 'Terms of Service | Fancy Symbols — fancysymbols.com',
    desc: 'Read the terms of service for fancysymbols.com. Understand the rules and guidelines for using our fancy text generator and symbol copy-paste tools.'
  },
};

function fixJsonLd(filePath, relPath) {
  let html = fs.readFileSync(filePath, 'utf8');
  let original = html;

  const relKey = relPath.replace(/\\/g, '/');
  const fix = jsonLdFixes[relKey] || pageFixes[relKey];

  if (fix) {
    // Replace ALL occurrences of old generic description in JSON-LD
    html = html.replace(
      /Browse cool text symbols and fonts instantly — ✦ ★ ❤\. One click copy\. Works everywhere\. No app needed! Elevate your social media bios & gaming tags today\./g,
      fix.desc
    );

    // Also update the JSON-LD "name" and "headline" fields
    // Match WebPage name
    const oldTitlePatterns = [
      'Discord Symbols — Copy and Paste Special Characters',
      'Free Fire Name Generator — Stylish Gaming Symbols',
      'Instagram Symbols Copy and Paste — Aesthetic Bio Characters',
      'Roblox Symbols — Copy and Paste Special Characters',
      'TikTok Symbols Copy and Paste — Bio Characters & Fonts',
      'All Symbols Copy and Paste ✦ 1000+ Text Symbols & Emojis',
    ];

    // Generic approach: update all ld+json blocks
    try {
      // Find all script type="application/ld+json" blocks
      const ldRegex = /<script\s+type="application\/ld\+json"\s*>([\s\S]*?)<\/script>/g;
      let match;
      while ((match = ldRegex.exec(html)) !== null) {
        let ldContent = match[1];
        let newLdContent = ldContent;

        // Replace description
        newLdContent = newLdContent.replace(
          /Browse cool text symbols and fonts instantly[^"]+/g,
          fix.desc
        );

        if (newLdContent !== ldContent) {
          html = html.replace(ldContent, newLdContent);
        }
      }
    } catch (e) {}
  }

  // For ALL files: replace any remaining "cool text symbols" in JSON-LD
  html = html.replace(
    /"Browse cool text symbols/g,
    '"Browse cool fancy symbols'
  );

  // Replace "text symbols" in JSON-LD descriptions when it appears as a standalone phrase
  html = html.replace(
    /1000\+ Text Symbols/g,
    '1000+ Fancy Symbols'
  );

  if (html !== original) {
    fs.writeFileSync(filePath, html, 'utf8');
    totalFixed++;
    console.log(`  ✅ ${relPath}`);
    return true;
  }
  return false;
}

console.log('🔧 Fixing JSON-LD structured data...\n');

// Process root HTML files
const rootFiles = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));
for (const file of rootFiles) {
  fixJsonLd(path.join(ROOT, file), file);
}

// Process subdirectories
function walkDir(dir, relBase = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.join(relBase, entry.name);
    if (entry.isDirectory() && ['symbols', 'letters', 'names', 'pages'].includes(entry.name)) {
      walkDir(fullPath, relPath);
    } else if (entry.name.endsWith('.html')) {
      fixJsonLd(fullPath, relPath);
    }
  }
}

walkDir(ROOT);

console.log(`\n✅ JSON-LD Fix Complete! Files modified: ${totalFixed}`);
