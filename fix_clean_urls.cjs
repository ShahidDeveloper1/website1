/**
 * Fix Internal 301 Redirects caused by .html extensions in links
 * 
 * Vercel's cleanUrls:true strips .html and 301-redirects .html URLs.
 * All internal links must use clean URLs (no .html) to avoid redirect chains.
 * 
 * This script removes .html from:
 * - href attributes (navigation, footer, category links, etc.)
 * - canonical link tags
 * - og:url and twitter:url meta tags
 * - Any other internal URL references
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
let totalFixed = 0;
let totalFiles = 0;

function getAllHtmlFiles(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (['node_modules', '.git', 'dist', 'es', 'fr'].includes(entry.name)) continue;
    if (entry.isDirectory()) {
      results = results.concat(getAllHtmlFiles(fullPath));
    } else if (entry.name.endsWith('.html') && !entry.name.startsWith('old')) {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = getAllHtmlFiles(ROOT);

for (const file of htmlFiles) {
  let html = fs.readFileSync(file, 'utf8');
  const original = html;

  // 1. Fix href="...something.html" for internal links (not external, not .css/.js)
  //    Match href="/path/to/page.html" or href="page.html" but NOT href="https://external..."
  //    Also match href='...' (single quotes)
  html = html.replace(/href=(["'])(\/[^"']*?)\.html\1/g, (match, quote, urlPath) => {
    // Don't touch non-HTML assets
    if (urlPath.endsWith('.css') || urlPath.endsWith('.js')) return match;
    // /index.html should become /
    if (urlPath === '/index') return `href=${quote}/${quote}`;
    return `href=${quote}${urlPath}${quote}`;
  });

  // 2. Fix relative hrefs like href="page.html" (no leading slash)
  html = html.replace(/href=(["'])([a-zA-Z][^"':\/]*?)\.html\1/g, (match, quote, urlPath) => {
    // Don't touch external links or assets
    if (urlPath.endsWith('.css') || urlPath.endsWith('.js')) return match;
    if (urlPath === 'index') return `href=${quote}/${quote}`;
    return `href=${quote}${urlPath}${quote}`;
  });

  // 3. Fix canonical URLs: href='https://www.fancysymbols.com/...something.html'
  html = html.replace(
    /href=(["'])(https:\/\/www\.fancysymbols\.com\/[^"']*?)\.html\1/g,
    (match, quote, url) => `href=${quote}${url}${quote}`
  );

  // 4. Fix og:url and twitter:url content attributes
  html = html.replace(
    /content=(["'])(https:\/\/www\.fancysymbols\.com\/[^"']*?)\.html\1/g,
    (match, quote, url) => `content=${quote}${url}${quote}`
  );

  // 5. Fix any remaining fancysymbols.com/*.html references in meta tags
  html = html.replace(
    /(https:\/\/www\.fancysymbols\.com\/[^"'\s>]*?)\.html/g,
    (match, url) => url
  );

  if (html !== original) {
    fs.writeFileSync(file, html);
    const changes = (original.match(/\.html/g) || []).length - (html.match(/\.html/g) || []).length;
    totalFixed += changes;
    totalFiles++;
    const relPath = path.relative(ROOT, file);
    console.log(`✅ ${relPath} — removed ${changes} .html refs`);
  }
}

console.log(`\n🎉 Done! Fixed ${totalFixed} .html references across ${totalFiles} files.`);
console.log('All internal links now use clean URLs (no .html extension).');
