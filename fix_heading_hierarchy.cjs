const fs = require('fs');
const path = require('path');

const SKIP_DIRS = new Set(['.git', 'node_modules', 'dist', 'es', 'fr', 'images', '.vscode']);

function processFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  let changed = false;

  // Replace <h4 class="footer-col-title">...</h4> with <div class="footer-col-title">...</div>
  const regex = /<h4 class="footer-col-title">([\s\S]*?)<\/h4>/g;
  if (regex.test(content)) {
    content = content.replace(/<h4 class="footer-col-title">([\s\S]*?)<\/h4>/g, '<div class="footer-col-title">$1</div>');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filepath, content, 'utf8');
  }
  return changed;
}

function walkDir(dir) {
  let count = 0;
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (!SKIP_DIRS.has(entry)) count += walkDir(full);
    } else if (entry.endsWith('.html')) {
      if (processFile(full)) {
        count++;
      }
    }
  }
  return count;
}

console.log('🔧 Fixing H2 Non-Sequential — footer <h4> → <div>\n');
const count = walkDir(process.cwd());
console.log(`✅ Fixed ${count} files`);
