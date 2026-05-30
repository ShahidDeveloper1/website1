const fs = require('fs');
const path = require('path');

const ROOT = 'c:\\Users\\USER\\OneDrive\\Desktop\\Fancysymbols.com';

function getHtmlFiles(dir, files = []) {
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    if (entry.startsWith('.') || entry === 'node_modules' || entry === 'dist' || entry === 'translations') continue;
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getHtmlFiles(fullPath, files);
    } else if (entry.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

const htmlFiles = getHtmlFiles(ROOT);
let updated = 0;

for (const filePath of htmlFiles) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  if (content.includes('v=6.7')) {
    content = content.replace(/v=6\.7/g, 'v=6.8');
    fs.writeFileSync(filePath, content, 'utf-8');
    updated++;
  }
}

console.log(`Cache busted: ${updated} / ${htmlFiles.length} files updated to v=6.8`);
