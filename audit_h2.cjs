const fs = require('fs');
const path = require('path');

const skip = new Set(['.git', 'node_modules', 'dist', 'images', '.vscode', 'es', 'fr']);

function walk(dir) {
  fs.readdirSync(dir).forEach(entry => {
    const filePath = path.join(dir, entry);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory() && !skip.has(entry)) {
      walk(filePath);
    } else if (entry.endsWith('.html') && !entry.startsWith('old_')) {
      const content = fs.readFileSync(filePath, 'utf8');
      const h2s = content.match(/<h2[\s>]/gi);
      if (h2s && h2s.length > 1) {
        console.log(`${h2s.length} H2s | ${filePath}`);
        // Show context of each H2
        const lines = content.split('\n');
        lines.forEach((line, i) => {
          if (/<h2[\s>]/i.test(line)) {
            console.log(`  Line ${i+1}: ${line.trim().substring(0, 120)}`);
          }
        });
      }
    }
  });
}

walk('.');
