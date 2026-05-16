const fs = require('fs');
const path = require('path');

const skip = new Set(['.git', 'node_modules', 'dist', 'images', '.vscode', 'es', 'fr', 'names']);

let updated = 0;

function walk(dir) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !skip.has(file)) {
      walk(filePath);
    } else if (file.endsWith('.html') && !file.startsWith('old_')) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Look for the logo img tag that lacks width/height
      const regex = /<img\s+src="\/favicon\.png[^"]*"\s+alt="[^"]*"\s+class="logo-img"\s*\/?>/g;
      
      if (regex.test(content)) {
        content = content.replace(regex, (match) => {
          // If it already has width/height, skip
          if (match.includes('width=') || match.includes('height=')) return match;
          
          // Inject width and height
          return match.replace('class="logo-img"', 'class="logo-img" width="32" height="32"');
        });
        
        fs.writeFileSync(filePath, content, 'utf8');
        updated++;
        console.log(`✅ Fixed dimensions in: ${filePath}`);
      }
    }
  });
}

walk('.');
console.log(`\n📊 Total files updated: ${updated}`);
