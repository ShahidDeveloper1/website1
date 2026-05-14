// Fix script: Remove dead Contact Us link and duplicate script.js loads
const fs = require('fs');
const path = require('path');

function findHtmlFiles(dir) {
  let results = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.name === 'node_modules' || item.name === '.git' || item.name === 'dist') continue;
    if (item.isDirectory()) {
      results = results.concat(findHtmlFiles(fullPath));
    } else if (item.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const root = __dirname;
const files = findHtmlFiles(root);
let totalFixed = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf-8');
  let changed = false;
  const orig = content;

  // 1. Remove Contact Us link line
  const contactPatterns = [
    /\s*<li><a href="\/pages\/contact\.html">Contact Us<\/a><\/li>\s*/g,
    /\s*<li><a href="\.\.\/pages\/contact\.html">Contact Us<\/a><\/li>\s*/g,
  ];
  for (const p of contactPatterns) {
    if (p.test(content)) {
      content = content.replace(p, '\n');
      changed = true;
    }
  }

  // 2. Remove duplicate script.js loads - keep only one, use v=5.6
  // Find all script.js script tags
  const scriptPattern = /<script src="[^"]*script\.js\?v=[^"]*"><\/script>/g;
  const matches = content.match(scriptPattern);
  if (matches && matches.length > 1) {
    // Remove all script.js tags
    content = content.replace(scriptPattern, '');
    // Add back one single script tag before </body> or at the point of first removal
    // Find </body> or </script> at end
    const insertPoint = content.lastIndexOf('</body>');
    if (insertPoint !== -1) {
      content = content.slice(0, insertPoint) + '<script src="/script.js?v=5.6"></script>\n' + content.slice(insertPoint);
    }
    changed = true;
  } else if (matches && matches.length === 1) {
    // Normalize version to 5.6
    const normalized = content.replace(/<script src="([^"]*?)script\.js\?v=[^"]*"><\/script>/, (m, prefix) => {
      return `<script src="${prefix}script.js?v=5.6"></script>`;
    });
    if (normalized !== content) {
      content = normalized;
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf-8');
    totalFixed++;
    console.log(`Fixed: ${path.relative(root, file)}`);
  }
}

console.log(`\nDone! Fixed ${totalFixed} files.`);
