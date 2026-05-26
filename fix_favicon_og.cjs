/**
 * Fix Favicon & OG Image Consistency Across All Pages
 * 
 * Issues found:
 * 1. 129 pages have og:image as "https://fancysymbols.com/og-image.png" (missing www.)
 *    → Should be "https://www.fancysymbols.com/og-image.png"
 * 2. Some name pages have preload hints pointing to old v5.2 versions
 *    → Should match the actual stylesheet version v6.1
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

function getAllHtmlFiles(dir) {
  const results = [];
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (['node_modules', '.git', 'dist'].includes(item)) continue;
    if (item.startsWith('old_') || item.endsWith('.tmp')) continue;
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (['names', 'symbols', 'letters', 'pages', 'es', 'fr'].includes(item) || dir !== ROOT) {
        results.push(...getAllHtmlFiles(fullPath));
      }
    } else if (item.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = getAllHtmlFiles(ROOT);
let ogFixed = 0;
let preloadFixed = 0;

for (const file of htmlFiles) {
  let content = fs.readFileSync(file, 'utf-8');
  let changed = false;

  // Fix 1: og:image and twitter:image missing www.
  // "https://fancysymbols.com/og-image.png" → "https://www.fancysymbols.com/og-image.png"
  if (content.includes('content="https://fancysymbols.com/og-image.png"')) {
    content = content.replace(
      /content="https:\/\/fancysymbols\.com\/og-image\.png"/g,
      'content="https://www.fancysymbols.com/og-image.png"'
    );
    ogFixed++;
    changed = true;
  }

  // Fix 2: Preload hints pointing to old versions (v5.2, v5.0, etc.)
  // Match any v5.x preload and update to v6.1 to match the actual stylesheet link
  const preloadPattern = /(<link rel="preload" href="\/style\.css\?v=)\d+\.\d+(" as="style">)/g;
  if (preloadPattern.test(content)) {
    content = content.replace(preloadPattern, '$16.1$2');
    changed = true;
    preloadFixed++;
  }
  
  const preloadScriptPattern = /(<link rel="preload" href="\/script\.js\?v=)\d+\.\d+(" as="script">)/g;
  if (preloadScriptPattern.test(content)) {
    content = content.replace(preloadScriptPattern, '$16.1$2');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content);
  }
}

console.log(`✅ Fixed og:image URL (added www.) in ${ogFixed} files`);
console.log(`✅ Fixed preload version hints in ${preloadFixed} files`);
console.log(`\n📊 Total HTML files scanned: ${htmlFiles.length}`);
