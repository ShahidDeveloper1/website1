const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const excludeDirs = ['node_modules', '.vscode', 'dist', '.git'];

function processHTMLFile(filePath) {
  let fileContent = fs.readFileSync(filePath, 'utf8');
  let originalContent = fileContent;

  // 1. Update/Add Favicon with cache-bust ?v=6.1
  // If <link rel="icon" type="image/png" href="..."> exists, replace it
  const relIconRegex = /<link rel="icon"[^>]*href="[^"]*"[^>]*>/g;
  const relIconMatch = fileContent.match(relIconRegex);
  if (relIconMatch) {
    fileContent = fileContent.replace(relIconRegex, '<link rel="icon" type="image/png" href="/favicon.png?v=6.1">');
  } else {
    // If not found, inject in head
    fileContent = fileContent.replace(/<\/head>/, '  <link rel="icon" type="image/png" href="/favicon.png?v=6.1">\n</head>');
  }

  // 2. Ensure apple-touch-icon is present for Apple devices (iOS/Safari)
  if (!fileContent.includes('rel="apple-touch-icon"')) {
    // Inject right after favicon icon link
    fileContent = fileContent.replace(
      'href="/favicon.png?v=6.1">',
      'href="/favicon.png?v=6.1">\n  <link rel="apple-touch-icon" href="/favicon.png?v=6.1">'
    );
  } else {
    const appleIconRegex = /<link rel="apple-touch-icon"[^>]*href="[^"]*"[^>]*>/g;
    fileContent = fileContent.replace(appleIconRegex, '<link rel="apple-touch-icon" href="/favicon.png?v=6.1">');
  }

  // 3. Update style.css cache-bust version to v=6.1
  const cssRegex = /<link rel="stylesheet" href="\/style\.css[^"]*"/g;
  fileContent = fileContent.replace(cssRegex, '<link rel="stylesheet" href="/style.css?v=6.1"');

  // 4. Update logo images in header and footer to use /favicon.png?v=6.1
  // Match both relative and absolute logo images
  const logoImgRegex = /<img[^>]*class="logo-img"[^>]*>/g;
  fileContent = fileContent.replace(logoImgRegex, (match) => {
    // Reconstruct the logo image to be perfectly absolute, cache-busted, and robust
    // Ensure height/width 32 are set for desktop & responsive layout
    return '<img src="/favicon.png?v=6.1" alt="Fancy Text Logo" class="logo-img" width="32" height="32" style="border-radius:8px;">';
  });

  // 5. Update any fallback logo img tags that might not have class="logo-img" but point to favicon.png
  const fallbackLogoRegex = /<img src="\/favicon\.png[^"]*" alt="Fancy Text Logo" class="logo-img" width="32" height="32" style="border-radius:8px;">/g;
  
  if (fileContent !== originalContent) {
    fs.writeFileSync(filePath, fileContent, 'utf8');
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

console.log('Initiating site-wide logo and stylesheet version alignment (v=6.1)...');
const totalUpdated = traverseDirectory(rootDir);
console.log(`Successfully aligned and cache-busted logo/styles on ${totalUpdated} pages.`);
