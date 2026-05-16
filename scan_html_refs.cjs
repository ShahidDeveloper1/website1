// Scan for remaining .html in href/content attributes
const fs = require('fs');
const path = require('path');
let total = 0;
function scan(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
    const full = path.join(dir, entry.name);
    if (['node_modules', '.git', 'dist', 'es', 'fr'].includes(entry.name)) return;
    if (entry.isDirectory()) return scan(full);
    if (!entry.name.endsWith('.html') || entry.name.startsWith('old_')) return;
    const html = fs.readFileSync(full, 'utf8');
    // Find href or content attributes still containing .html (but not .css or .js)
    const matches = html.match(/(?:href|content)=["'][^"']*fancysymbols\.com[^"']*\.html["']/g);
    const hrefMatches = html.match(/href=["']\/[^"']*\.html["']/g);
    const allMatches = [...(matches || []), ...(hrefMatches || [])];
    if (allMatches.length > 0) {
      const rel = path.relative('.', full);
      console.log(`${rel}: ${allMatches.length} .html refs remaining`);
      allMatches.forEach(m => console.log(`   ${m}`));
      total += allMatches.length;
    }
  });
}
scan('.');
console.log(`\nTotal remaining .html refs: ${total}`);
