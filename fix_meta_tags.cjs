const fs = require('fs');
const path = require('path');

let replacedFiles = 0;

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        processDir(fullPath);
      }
    } else if (file.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const original = content;

      // Regular expressions to target specific areas where branding might appear
      // We want to avoid altering the URL domains (fancysymbols.com)
      
      // Lookarounds to find FancySymbols or fancysymbols or Fancy Symbols 
      // but ONLY if it is not immediately followed by .com or .net
      // Example targets: 
      // "FancySymbols" -> "TextSymbols"
      // "fancysymbols" -> "textsymbols" (unless .com)
      // "Fancy Symbols" -> "Text Symbols"

      content = content.replace(/Fancy\s?Symbols(?!\.com|\.net)/g, 'TextSymbols');
      content = content.replace(/Fancy\s?symbols(?!\.com|\.net)/g, 'TextSymbols');
      content = content.replace(/fancy\s?symbols(?!\.com|\.net)/gi, (match) => {
         if(match.toLowerCase() === 'fancysymbols' || match.toLowerCase() === 'fancy symbols') {
            // Check original casing
            if (match === 'fancysymbols') return 'textsymbols';
            if (match === 'FancySymbols') return 'TextSymbols';
            if (match === 'fancy symbols') return 'text symbols';
            if (match === 'Fancy Symbols') return 'Text Symbols';
            return 'TextSymbols';
         }
         return match;
      });

      // Special check to fix any botched "TextSymbols.com" or "Text Symbols.com" 
      // back to fancysymbols.com since domain didn't change
      content = content.replace(/TextSymbols\.com/gi, 'fancysymbols.com');
      content = content.replace(/textsymbols\.com/gi, 'fancysymbols.com');

      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        replacedFiles++;
      }
    }
  }
}

processDir('.');
console.log(`Successfully checked all HTML files. Rebranded text in ${replacedFiles} files.`);
