const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const excludeDirs = ['node_modules', '.vscode', 'dist', '.git', '.gemini'];

let stats = { total: 0, updated: 0, errors: [] };

// ============================================================
// PHASE 1: Brand replacements (ALL HTML files)
// ============================================================
function applyBrandReplacements(content, filePath) {
  let c = content;

  // --- Core brand name replacements (case-insensitive for safety, except when in URL/domain) ---
  c = c.replace(/TextSymbols/gi, 'Fancy Text');

  // --- Specific logo span replacements if case-insensitive missed it or generated wrong capitalization ---
  c = c.replace(
    /(<span class="logo-text">)TextSymbols(<\/span>)/g,
    '$1Fancy Text$2'
  );
  c = c.replace(
    /(<span class="logo-text highlight">)TextSymbols(<\/span>)/g,
    '$1Fancy Text$2'
  );

  // --- Specific copyright replacements to avoid double text ---
  c = c.replace(/© 2026 Fancy Text\./g, '© 2026 Fancy Text.');
  c = c.replace(/© 2026 TextSymbols\./gi, '© 2026 Fancy Text.');
  c = c.replace(/&copy; 2026 TextSymbols\./gi, '&copy; 2026 Fancy Text.');
  c = c.replace(/&copy; 2026 TextSymbols\. All rights reserved\./gi, '&copy; 2026 Fancy Text. All rights reserved.');

  // --- Meta keywords: replace "textsymbols" standalone keyword ---
  c = c.replace(
    /textsymbols, text symbols copy and paste/g,
    'fancy text, fancy text generator, fancy text copy and paste'
  );
  c = c.replace(
    /textsymbols/g,
    'fancy text'
  );

  // --- Fix duplicate brand bug in platform pages ---
  c = c.replace(
    / - Fancy Text ✦ Fancy Text/g,
    ' | Fancy Text'
  );
  c = c.replace(
    / - TextSymbols ✦ TextSymbols/g,
    ' | Fancy Text'
  );

  // --- Footer description ---
  c = c.replace(
    /Your ultimate premium destination for aesthetic symbols, cool fonts, and creative digital expression tools\. Elevate your online presence with one click\./g,
    'Your ultimate destination for fancy text, aesthetic symbols, cool fonts & creative digital expression tools. Copy and paste with one click.'
  );

  // --- "All tools on TextSymbols are free" in body text ---
  c = c.replace(/on TextSymbols/gi, 'on Fancy Text');
  c = c.replace(/from TextSymbols/gi, 'from Fancy Text');

  return c;
}

// ============================================================
// PHASE 2: Homepage-specific keyword changes (index.html ONLY)
// ============================================================
function applyHomepageChanges(content) {
  let c = content;

  // --- Title tag ---
  c = c.replace(
    /<title>Text Symbols Copy and Paste ✦ 1000\+ Cool Special Glyphs<\/title>/g,
    '<title>Fancy Text Generator ✦ Copy and Paste Cool Fonts & Symbols</title>'
  );

  // --- OG title ---
  c = c.replace(
    /content="Text Symbols Copy and Paste ✦ 1000\+ Cool Special Glyphs"/g,
    'content="Fancy Text Generator ✦ Copy and Paste Cool Fonts & Symbols"'
  );

  // --- Meta description ---
  c = c.replace(
    /content="Copy text symbols instantly — ✦ ★ ❤ ✿\. Browse cute emojis, cool aesthetic characters & fonts\. One click copy\. Works everywhere\. No app needed!"/g,
    'content="Generate fancy text instantly — 𝒻𝒶𝓃𝒸𝓎 ✦ ★ ❤. Browse 1000+ cool fonts, aesthetic symbols & fancy letters. One click copy. Works everywhere. No app needed!"'
  );

  // --- Schema.org name and headline ---
  c = c.replace(
    /"name": "Text Symbols Copy and Paste ✦ 1000\+ Cool Special Glyphs"/g,
    '"name": "Fancy Text Generator ✦ Copy and Paste Cool Fonts & Symbols"'
  );
  c = c.replace(
    /"headline": "Text Symbols Copy and Paste ✦ 1000\+ Cool Special Glyphs"/g,
    '"headline": "Fancy Text Generator ✦ Copy and Paste Cool Fonts & Symbols"'
  );
  c = c.replace(
    /"description": "Copy text symbols instantly — ✦ ★ ❤ ✿\. Browse cute emojis, cool aesthetic characters & fonts\. One click copy\. Works everywhere\. No app needed!"/g,
    '"description": "Generate fancy text instantly — 𝒻𝒶𝓃𝒸𝓎 ✦ ★ ❤. Browse 1000+ cool fonts, aesthetic symbols & fancy letters. One click copy. Works everywhere. No app needed!"'
  );

  // --- Meta keywords ---
  c = c.replace(
    /content="text symbols, copy and paste symbols, aesthetic symbols, cool text symbols, unicode characters, emoji text, discord symbols, instagram symbols, fancy text, fancy text generator, fancy text copy and paste"/g,
    'content="fancy text, fancy text generator, fancy text copy and paste, copy and paste symbols, aesthetic symbols, cool text symbols, unicode characters, emoji text, discord symbols, instagram symbols"'
  );
  // Fallback if the first replacement already happened or pattern is slightly different
  c = c.replace(
    /content="text symbols, copy and paste symbols, aesthetic symbols, cool text symbols, unicode characters, emoji text, discord symbols, instagram symbols, textsymbols, text symbols copy and paste"/g,
    'content="fancy text, fancy text generator, fancy text copy and paste, copy and paste symbols, aesthetic symbols, cool text symbols, unicode characters, emoji text, discord symbols, instagram symbols"'
  );

  // --- H1 hero ---
  c = c.replace(
    /<span class="gradient-text">Text Symbols<\/span> Copy and Paste/g,
    '<span class="gradient-text">Fancy Text</span> Generator Copy and Paste'
  );

  // --- Hero subtitle ---
  c = c.replace(
    /1000\+ cool symbols, aesthetic text, text fonts & Lenny faces\. Click any symbol to copy instantly!/g,
    '1000+ cool fonts, aesthetic symbols, fancy letters & Lenny faces. Type or click to copy instantly!'
  );

  // --- Article headings ---
  const headingReplacements = [
    ['What Are Text Symbols?', 'What Is Fancy Text?'],
    ['How to Copy and Paste Text Symbols', 'How to Copy and Paste Fancy Text'],
    ['Types of Text Symbols Available', 'Types of Fancy Text Available'],
    ['Where to Use Text Symbols', 'Where to Use Fancy Text'],
    ['Text Symbols vs. Emoji vs. ASCII Art', 'Fancy Text vs. Emoji vs. ASCII Art'],
    ['Unicode Characters and How Text Symbols Work', 'Unicode Characters and How Fancy Text Works'],
    ['Text Symbols for Social Media Bios', 'Fancy Text for Social Media Bios'],
    ['Text Symbols for Gaming Profiles', 'Fancy Text for Gaming Profiles'],
    ['Text Symbols for Business and Professional Use', 'Fancy Text for Business and Professional Use'],
    ['Keyboard Shortcuts for Common Text Symbols', 'Keyboard Shortcuts for Common Fancy Text'],
    ['Frequently Asked Questions About Text Symbols', 'Frequently Asked Questions About Fancy Text'],
    ['Text Symbols Copy and Paste — Summary', 'Fancy Text Copy and Paste — Summary'],
  ];

  for (const [from, to] of headingReplacements) {
    c = c.replaceAll(from, to);
  }

  // --- Body text: contextual replacements for homepage article content ---
  const bodyReplacements = [
    ['Text symbols are Unicode characters', 'Fancy text uses Unicode characters'],
    ['Text symbols represent a usable subset', 'Fancy text represents a usable subset'],
    ['To copy text symbols from this page', 'To copy fancy text from this page'],
    ['copy text symbols', 'copy fancy text'],
    ['text symbols work in', 'fancy text works in'],
    ['Text symbols work in', 'Fancy text works in'],
    ['text symbols also work as', 'fancy text also works as'],
    ['Text symbols serve functional roles', 'Fancy text serves functional roles'],
    ['text symbols are free', 'fancy text characters are free'],
    ['Do text symbols work on all devices?', 'Does fancy text work on all devices?'],
    ['Are text symbols free to use?', 'Is fancy text free to use?'],
    ['all text symbols are free', 'all fancy text is free'],
    ['text symbols do not directly affect', 'fancy text does not directly affect'],
    ['text symbols and fonts', 'fancy text and fonts'],
    ['1,000+ text symbols organized into', '1,000+ fancy text styles organized into'],
    ['Yes, text symbols work on all modern devices', 'Yes, fancy text works on all modern devices'],
    ['Yes, all text symbols are free.', 'Yes, all fancy text is free.'],
    ['Text symbols are monochrome Unicode glyphs', 'Fancy text uses monochrome Unicode glyphs'],
    ['Yes, Instagram supports Unicode text symbols', 'Yes, Instagram supports Unicode fancy text'],
    ['The 10 most copied text symbols', 'The 10 most popular fancy text characters'],
    ['Yes, YouTube supports most Unicode text symbols', 'Yes, YouTube supports most Unicode fancy text'],
  ];

  for (const [from, to] of bodyReplacements) {
    c = c.replaceAll(from, to);
  }

  // --- FAQ answers: remaining "text symbols" in FAQ context ---
  c = c.replace(/Standard text symbols display/g, 'Standard fancy text characters display');

  return c;
}

// ============================================================
// MAIN PROCESSOR
// ============================================================
function processFile(filePath) {
  try {
    const original = fs.readFileSync(filePath, 'utf8');
    let updated = applyBrandReplacements(original, filePath);

    const baseName = path.basename(filePath);
    const relPath = path.relative(rootDir, filePath).replace(/\\/g, '/');

    // Apply homepage-specific changes
    if (baseName === 'index.html' && !relPath.includes('/')) {
      updated = applyHomepageChanges(updated);
    }

    if (updated !== original) {
      fs.writeFileSync(filePath, updated, 'utf8');
      stats.updated++;
      console.log(`  ✅ Updated: ${relPath}`);
    }
    stats.total++;
  } catch (err) {
    stats.errors.push({ file: filePath, error: err.message });
    console.error(`  ❌ Error: ${filePath} - ${err.message}`);
  }
}

function traverseDirectory(dir) {
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (!excludeDirs.includes(entry)) {
        traverseDirectory(fullPath);
      }
    } else if (entry.endsWith('.html')) {
      processFile(fullPath);
    }
  }
}

// ============================================================
// PHASE 3: Update CJS/JS build scripts
// ============================================================
function updateBuildScripts() {
  console.log('\n📜 Updating build scripts...');

  const scriptReplacements = [
    {
      file: 'apply_full_website_seo.cjs',
      replacements: [
        ["'Text Symbols Copy and Paste ✦ 1000+ Cool Special Glyphs'", "'Fancy Text Generator ✦ Copy and Paste Cool Fonts & Symbols'"],
        ["'Copy text symbols instantly — ✦ ★ ❤ ✿. Browse cute emojis, cool aesthetic characters & fonts. One click copy. Works everywhere. No app needed!'", "'Generate fancy text instantly — 𝒻𝒶𝓃𝒸𝓎 ✦ ★ ❤. Browse 1000+ cool fonts, aesthetic symbols & fancy letters. One click copy. Works everywhere. No app needed!'"],
        ["'TextSymbols'", "'Fancy Text'"],
        ["'FancySymbols'", "'Fancy Text'"],
      ]
    },
    {
      file: 'apply_global_seo.js',
      replacements: [
        ['"TextSymbols"', '"Fancy Text"'],
        ['"Text Symbols"', '"Fancy Text"'],
        ["'TextSymbols'", "'Fancy Text'"],
        ["'Text Symbols'", "'Fancy Text'"],
      ]
    },
    {
      file: 'seo_content_engine.cjs',
      replacements: [
        ['FancySymbols', 'Fancy Text'],
        ['TextSymbols', 'Fancy Text'],
        ['| Text Symbols - Fancy Text', '| Fancy Text'],
        ['| Text Symbols - FancySymbols', '| Fancy Text'],
      ]
    },
    {
      file: 'fix_all_titles.cjs',
      replacements: [
        ['FancySymbols', 'Fancy Text'],
        ['TextSymbols', 'Fancy Text'],
        ["'index.html': 'Text Symbols Copy and Paste | 1000+ Symbols - Fancy Text'", "'index.html': 'Fancy Text Generator ✦ Copy and Paste Cool Fonts & Symbols'"],
      ]
    },
    {
      file: 'fix_short_titles.cjs',
      replacements: [
        ['FancySymbols', 'Fancy Text'],
        ['TextSymbols', 'Fancy Text'],
        [' | Text Symbols - Fancy Text', ' - Fancy Text'],
        [' | Gaming Text Symbols - Fancy Text', ' - Fancy Text'],
      ]
    },
    {
      file: 'apply_favicon_and_css_version.cjs',
      replacements: [
        ['alt="TextSymbols Logo"', 'alt="Fancy Text Logo"'],
      ]
    },
    {
      file: 'generate_fancy_letters.cjs',
      replacements: [
        ['alt="TextSymbols Logo"', 'alt="Fancy Text Logo"'],
        ['TextSymbols', 'Fancy Text'],
        ['FancySymbols', 'Fancy Text'],
      ]
    },
    {
      file: 'generate_fancy_names.cjs',
      replacements: [
        ['alt="TextSymbols Logo"', 'alt="Fancy Text Logo"'],
        ['TextSymbols', 'Fancy Text'],
        ['FancySymbols', 'Fancy Text'],
      ]
    },
    {
      file: 'inject_saas_footer.cjs',
      replacements: [
        ['alt="TextSymbols Logo"', 'alt="Fancy Text Logo"'],
        ['TextSymbols', 'Fancy Text'],
        ['FancySymbols', 'Fancy Text'],
      ]
    },
  ];

  for (const script of scriptReplacements) {
    const filePath = path.join(rootDir, script.file);
    if (!fs.existsSync(filePath)) {
      console.log(`  ⏭️  Skipped (not found): ${script.file}`);
      continue;
    }
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    for (const [from, to] of script.replacements) {
      if (content.includes(from)) {
        content = content.replaceAll(from, to);
        changed = true;
      }
    }
    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`  ✅ Updated: ${script.file}`);
    } else {
      console.log(`  ⏭️  No changes needed: ${script.file}`);
    }
  }
}

// ============================================================
// PHASE 4: Update robots.txt
// ============================================================
function updateRobotsTxt() {
  console.log('\n🤖 Updating robots.txt...');
  const robotsPath = path.join(rootDir, 'robots.txt');
  if (fs.existsSync(robotsPath)) {
    let content = fs.readFileSync(robotsPath, 'utf8');
    content = content.replace('# FancySymbols Robots.txt', '# Fancy Text Robots.txt');
    content = content.replace('FancySymbols', 'Fancy Text');
    fs.writeFileSync(robotsPath, content, 'utf8');
    console.log('  ✅ Updated: robots.txt');
  }
}

// ============================================================
// PHASE 5: Update content.md primary keyword
// ============================================================
function updateContentMd() {
  console.log('\n📝 Updating content.md...');
  const contentPath = path.join(rootDir, 'content.md');
  if (fs.existsSync(contentPath)) {
    let content = fs.readFileSync(contentPath, 'utf8');
    content = content.replace('"text symbols"', '"fancy text"');
    content = content.replace('text symbols', 'fancy text');
    content = content.replace('TextSymbols', 'Fancy Text');
    content = content.replace('FancySymbols', 'Fancy Text');
    fs.writeFileSync(contentPath, content, 'utf8');
    console.log('  ✅ Updated: content.md');
  }
}

// ============================================================
// RUN
// ============================================================
console.log('🚀 Starting keyword migration: "Text Symbols" → "Fancy Text"');
console.log('='.repeat(60));

console.log('\n📄 Phase 1 & 2: Updating all HTML files...');
traverseDirectory(rootDir);

console.log('\n' + '='.repeat(60));
updateBuildScripts();
updateRobotsTxt();
updateContentMd();

console.log('\n' + '='.repeat(60));
console.log(`\n✨ Migration Complete!`);
console.log(`   Total files scanned: ${stats.total}`);
console.log(`   Files updated: ${stats.updated}`);
console.log(`   Errors: ${stats.errors.length}`);
if (stats.errors.length > 0) {
  console.log('\n❌ Errors:');
  stats.errors.forEach(e => console.log(`   ${e.file}: ${e.error}`));
}
console.log('\n💡 Next steps:');
console.log('   1. Run: grep -r "TextSymbols" *.html --include="*.html" (should return 0)');
console.log('   2. Open index.html in browser to verify');
console.log('   3. Deploy to production');
