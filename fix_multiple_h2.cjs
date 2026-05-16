const fs = require('fs');
const path = require('path');

const skip = new Set(['.git', 'node_modules', 'dist', 'images', '.vscode', 'es', 'fr']);
let updated = 0;

function fixMultipleH2(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find all H2 tags
  const h2Regex = /<h2([\s>])/gi;
  const h2CloseRegex = /<\/h2>/gi;
  
  let h2Count = 0;
  const h2Positions = [];
  
  let match;
  while ((match = h2Regex.exec(content)) !== null) {
    h2Count++;
    h2Positions.push({ index: match.index, type: 'open' });
  }
  
  if (h2Count <= 1) return false; // No fix needed
  
  // Keep the FIRST H2, convert all subsequent H2 → H3
  let firstFound = false;
  
  // Replace opening tags: <h2> or <h2 style="...">
  content = content.replace(/<h2([\s>])/gi, (match, after) => {
    if (!firstFound) {
      firstFound = true;
      return match; // Keep the first one
    }
    return `<h3${after}`; // Convert subsequent ones
  });
  
  // Replace closing tags: </h2> → </h3> for all but the first
  let closeCount = 0;
  content = content.replace(/<\/h2>/gi, () => {
    closeCount++;
    if (closeCount === 1) return '</h2>'; // Keep first closing
    return '</h3>';
  });
  
  fs.writeFileSync(filePath, content, 'utf8');
  return true;
}

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
        if (fixMultipleH2(filePath)) {
          updated++;
          console.log(`✅ Fixed ${h2s.length} H2s → 1 H2 + ${h2s.length - 1} H3s in ${filePath}`);
        }
      }
    }
  });
}

walk('.');
console.log(`\n📊 Total pages fixed: ${updated}`);
