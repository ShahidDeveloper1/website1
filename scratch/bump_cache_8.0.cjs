const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const excludeDirs = ['node_modules', '.vscode', 'dist', '.git', 'scratch'];

function processHTMLFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace style.css?v=X.Y
  const cssRegex = /style\.css\?v=[0-9.]+/g;
  content = content.replace(cssRegex, 'style.css?v=8.0');

  // Replace script.js?v=X.Y
  const jsRegex = /script\.js\?v=[0-9.]+/g;
  content = content.replace(jsRegex, 'script.js?v=8.0');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

function traverseDirectory(dir) {
  const files = fs.readdirSync(dir);
  let updatedCount = 0;
  for (let file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (!excludeDirs.includes(file)) {
        updatedCount += traverseDirectory(fullPath);
      }
    } else if (file.endsWith('.html')) {
      if (processHTMLFile(fullPath)) {
        updatedCount++;
      }
    }
  }
  return updatedCount;
}

console.log('Initiating site-wide CSS & JS version alignment to v=8.0...');
const totalUpdated = traverseDirectory(rootDir);
console.log(`Successfully aligned and cache-busted files on ${totalUpdated} pages.`);
