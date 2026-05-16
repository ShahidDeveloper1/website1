const fs = require('fs');
const path = require('path');

const skip = new Set(['.git', 'node_modules', 'dist', 'images', '.vscode', 'es', 'fr']);

let count = 0;

function walk(dir) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory() && !skip.has(file)) {
      walk(filePath);
    } else if (file.endsWith('.html') && !file.startsWith('old_')) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Replace <h4> tags inside step-item div with <h3>
      // Because the structure is:
      // <div class="step-item">
      //   <h4>Find a Symbol</h4>
      const regex = /(<div class="step-item">\s*)<h4>(.*?)<\/h4>/g;
      
      if (regex.test(content)) {
        content = content.replace(regex, '$1<h3>$2</h3>');
        fs.writeFileSync(filePath, content, 'utf8');
        count++;
        console.log(`Updated H4 to H3 in: ${filePath}`);
      }
    }
  });
}

walk('.');
console.log(`Total files updated: ${count}`);
