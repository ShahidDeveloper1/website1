const fs = require('fs');
const path = require('path');

const skip = new Set(['.git', 'node_modules', 'dist', 'images', '.vscode', 'es', 'fr']);
let over = 0;

function walk(dir) {
  fs.readdirSync(dir).forEach(entry => {
    const filePath = path.join(dir, entry);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory() && !skip.has(entry)) {
      walk(filePath);
    } else if (entry.endsWith('.html') && !entry.startsWith('old_')) {
      const content = fs.readFileSync(filePath, 'utf8');
      const match = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/);
      if (match) {
        const desc = match[1];
        if (desc.length > 140) {
          over++;
          console.log(`${desc.length} chars | ${filePath} | ${desc}`);
        }
      }
    }
  });
}

walk('.');
console.log(`\nTotal over 140 chars: ${over}`);
