const fs = require('fs');
const path = require('path');

const skip = new Set(['.git', 'node_modules', 'dist', 'images', '.vscode']);
let updated = 0;
let totalReplacements = 0;

function walk(dir) {
  fs.readdirSync(dir).forEach(entry => {
    const filePath = path.join(dir, entry);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory() && !skip.has(entry)) {
      walk(filePath);
    } else if ((entry.endsWith('.html') || entry.endsWith('.css') || entry.endsWith('.js')) && !entry.startsWith('old_')) {
      let content = fs.readFileSync(filePath, 'utf8');
      const original = content;

      // Count replacements
      let count = 0;

      // Replace all variations of FancySymbols (case-sensitive matches)
      // 1. "FancySymbols" → "TextSymbols"
      const r1 = (content.match(/FancySymbols/g) || []).length;
      content = content.replace(/FancySymbols/g, 'TextSymbols');
      count += r1;

      // 2. "fancysymbols" → "textsymbols" (lowercase, e.g. in URLs we keep domain as-is)
      // BUT skip domain references like fancysymbols.com - those must stay!
      // Only replace fancysymbols when NOT followed by .com
      const r2 = (content.match(/fancysymbols(?!\.com)/gi) || []).length;
      content = content.replace(/fancysymbols(?!\.com)/gi, (match) => {
        if (match === 'FancySymbols') return 'TextSymbols';
        if (match === 'fancysymbols') return 'textsymbols';
        if (match === 'Fancysymbols') return 'Textsymbols';
        return 'TextSymbols';
      });
      // Note: r2 already counted above, but FancySymbols was already replaced
      // so this mainly catches lowercase variants

      // 3. "Fancy Symbols" (with space) → "Text Symbols"
      const r3 = (content.match(/Fancy Symbols/g) || []).length;
      content = content.replace(/Fancy Symbols/g, 'Text Symbols');
      count += r3;

      if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        updated++;
        totalReplacements += count;
        console.log(`✅ ${filePath} (${count} replacements)`);
      }
    }
  });
}

walk('.');
console.log(`\n📊 Total files updated: ${updated}`);
console.log(`📊 Total replacements: ${totalReplacements}`);
