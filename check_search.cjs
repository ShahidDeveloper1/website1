const fs = require('fs');
const path = require('path');

function checkSearchBox(dir) {
  let hasBox = [];
  fs.readdirSync(dir).forEach(file => {
    const p = path.join(dir, file);
    if (fs.statSync(p).isDirectory() && file !== 'node_modules' && file !== '.git') {
      hasBox.push(...checkSearchBox(p));
    } else if (file.endsWith('.html')) {
      const c = fs.readFileSync(p, 'utf8');
      if (c.includes('id="searchBox"')) {
        hasBox.push(p);
      }
    }
  });
  return hasBox;
}
console.log("Files with searchBox:", checkSearchBox('.'));
