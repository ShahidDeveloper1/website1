const fs = require('fs');
const path = require('path');

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
      if (content.includes('style.css?v=5.6')) {
        content = content.replace(/style\.css\?v=5\.6/g, 'style.css?v=5.7');
        fs.writeFileSync(fullPath, content, 'utf8');
      }
    }
  }
}

processDir('.');
console.log('Bumped style.css version to v=5.7 to bust cache.');
