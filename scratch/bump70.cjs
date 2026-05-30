const fs = require('fs');
const path = require('path');
const ROOT = 'c:\\Users\\USER\\OneDrive\\Desktop\\Fancysymbols.com';
function getHtmlFiles(dir, files = []) {
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    if (entry.startsWith('.') || entry === 'node_modules' || entry === 'dist' || entry === 'translations' || entry === 'scratch') continue;
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) getHtmlFiles(fullPath, files);
    else if (entry.endsWith('.html')) files.push(fullPath);
  }
  return files;
}
const htmlFiles = getHtmlFiles(ROOT);
let updated = 0;
for (const f of htmlFiles) {
  let c = fs.readFileSync(f, 'utf-8');
  if (c.includes('v=6.9')) { c = c.replace(/v=6\.9/g, 'v=7.0'); fs.writeFileSync(f, c, 'utf-8'); updated++; }
}
console.log(`Cache busted: ${updated}/${htmlFiles.length} files → v=7.0`);
