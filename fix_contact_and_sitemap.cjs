/**
 * SEO Cleanup Script
 * 1. Remove "Contact Us" <li> from all HTML footers (links to "#" = bad for SEO)
 * 2. Remove the /pages/contact redirect from vercel.json
 * 3. Regenerate sitemap.xml with ALL pages properly listed + today's date
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const TODAY = new Date().toISOString().split('T')[0]; // e.g. 2026-05-26

// ── 1. REMOVE "Contact Us" FROM ALL HTML FILES ──────────────────────

function removeContactFromHTML() {
  const htmlFiles = getAllHtmlFiles(ROOT);
  let modified = 0;

  for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Match the Contact Us <li> line (various formats)
    const patterns = [
      /\s*<li><a href="#">Contact Us<\/a><\/li>\s*\r?\n?/g,
      /\s*<li><a href="#"\s*>Contact Us<\/a><\/li>\s*\r?\n?/g,
    ];

    let changed = false;
    for (const pattern of patterns) {
      if (pattern.test(content)) {
        content = content.replace(pattern, '\n');
        changed = true;
      }
    }

    if (changed) {
      fs.writeFileSync(file, content);
      modified++;
    }
  }

  console.log(`✅ Removed "Contact Us" from ${modified} HTML files`);
}

function getAllHtmlFiles(dir) {
  const results = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    if (item === 'node_modules' || item === '.git' || item === 'dist' || item === 'old_morse_code.html' || item === 'old_small_text.html' || item.endsWith('.tmp')) continue;
    
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Only go into known content directories
      if (['names', 'symbols', 'letters', 'pages', 'es', 'fr'].includes(item) || dir !== ROOT) {
        results.push(...getAllHtmlFiles(fullPath));
      }
    } else if (item.endsWith('.html')) {
      results.push(fullPath);
    }
  }

  return results;
}

// ── 2. REMOVE /pages/contact REDIRECT FROM vercel.json ───────────────

function removeContactRedirect() {
  const vercelPath = path.join(ROOT, 'vercel.json');
  const vercel = JSON.parse(fs.readFileSync(vercelPath, 'utf-8'));

  const before = vercel.redirects.length;
  vercel.redirects = vercel.redirects.filter(r => r.source !== '/pages/contact');
  const after = vercel.redirects.length;

  fs.writeFileSync(vercelPath, JSON.stringify(vercel, null, 2) + '\n');
  console.log(`✅ Removed ${before - after} contact redirect(s) from vercel.json`);
}

// ── 3. REGENERATE COMPLETE SITEMAP.XML ────────────────────────────────

function regenerateSitemap() {
  const BASE = 'https://www.fancysymbols.com';
  const urls = [];

  // Helper to add URL
  function addUrl(loc, priority, changefreq = 'weekly') {
    urls.push({ loc, priority, changefreq });
  }

  // ─ Homepage ─
  addUrl(BASE, '1.0', 'daily');

  // ─ Root-level tool/generator pages ─
  const rootPages = fs.readdirSync(ROOT)
    .filter(f => f.endsWith('.html') && !f.startsWith('old_') && !f.endsWith('.tmp'))
    .map(f => f.replace('.html', ''))
    .sort();

  for (const page of rootPages) {
    addUrl(`${BASE}/${page}`, '0.8');
  }

  // ─ Letters ─
  const lettersDir = path.join(ROOT, 'letters');
  if (fs.existsSync(lettersDir)) {
    const letters = fs.readdirSync(lettersDir)
      .filter(f => f.endsWith('.html'))
      .map(f => f.replace('.html', ''))
      .sort();

    for (const letter of letters) {
      addUrl(`${BASE}/letters/${letter}`, '0.7');
    }
  }

  // ─ Names ─
  const namesDir = path.join(ROOT, 'names');
  if (fs.existsSync(namesDir)) {
    const names = fs.readdirSync(namesDir)
      .filter(f => f.endsWith('.html'))
      .map(f => f.replace('.html', ''))
      .sort();

    for (const name of names) {
      addUrl(`${BASE}/names/${name}`, '0.7');
    }
  }

  // ─ Legal pages ─
  const pagesDir = path.join(ROOT, 'pages');
  if (fs.existsSync(pagesDir)) {
    const legal = fs.readdirSync(pagesDir)
      .filter(f => f.endsWith('.html'))
      .map(f => f.replace('.html', ''))
      .sort();

    for (const page of legal) {
      addUrl(`${BASE}/pages/${page}`, '0.5');
    }
  }

  // ─ Symbols ─
  const symbolsDir = path.join(ROOT, 'symbols');
  if (fs.existsSync(symbolsDir)) {
    const symbols = fs.readdirSync(symbolsDir)
      .filter(f => f.endsWith('.html'))
      .map(f => f.replace('.html', ''))
      .sort();

    for (const symbol of symbols) {
      addUrl(`${BASE}/symbols/${symbol}`, '0.9');
    }
  }

  // ─ Build XML ─
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const url of urls) {
    xml += `  <url>\n`;
    xml += `    <loc>${url.loc}</loc>\n`;
    xml += `    <lastmod>${TODAY}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;

  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), xml);
  console.log(`✅ Regenerated sitemap.xml with ${urls.length} URLs (dated ${TODAY})`);

  // Print summary
  const rootCount = rootPages.length;
  const letterCount = fs.existsSync(lettersDir) ? fs.readdirSync(lettersDir).filter(f => f.endsWith('.html')).length : 0;
  const nameCount = fs.existsSync(namesDir) ? fs.readdirSync(namesDir).filter(f => f.endsWith('.html')).length : 0;
  const symbolCount = fs.existsSync(symbolsDir) ? fs.readdirSync(symbolsDir).filter(f => f.endsWith('.html')).length : 0;
  const legalCount = fs.existsSync(pagesDir) ? fs.readdirSync(pagesDir).filter(f => f.endsWith('.html')).length : 0;

  console.log(`\n📊 Sitemap Breakdown:`);
  console.log(`   Homepage:      1`);
  console.log(`   Tool pages:    ${rootCount}`);
  console.log(`   Letters:       ${letterCount}`);
  console.log(`   Names:         ${nameCount}`);
  console.log(`   Symbols:       ${symbolCount}`);
  console.log(`   Legal pages:   ${legalCount}`);
  console.log(`   ─────────────────`);
  console.log(`   TOTAL:         ${urls.length}`);
}

// ── RUN ALL ──────────────────────────────────────────────────────────

console.log('🔧 Starting SEO cleanup...\n');
removeContactFromHTML();
removeContactRedirect();
regenerateSitemap();
console.log('\n✨ All done! Your site is now fully indexable.');
