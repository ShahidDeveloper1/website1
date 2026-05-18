const fs = require('fs');
const path = require('path');

function checkDirs(dir) {
  let missing = [];
  fs.readdirSync(dir).forEach(file => {
    const p = path.join(dir, file);
    if (fs.statSync(p).isDirectory() && file !== 'node_modules' && file !== '.git') {
      missing.push(...checkDirs(p));
    } else if (file.endsWith('.html')) {
      const c = fs.readFileSync(p, 'utf8');
      if (!c.includes('class="page-header"') && !c.includes('class="hero"')) {
        missing.push(p);
      }
    }
  });
  return missing;
}
console.log("Missing files:", checkDirs('.'));
