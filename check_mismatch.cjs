const fs = require('fs');
const path = require('path');
let mismatched = 0;
let missingDefer = 0;

function processDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const p = path.join(dir, file);
    if (fs.statSync(p).isDirectory() && file !== 'node_modules' && file !== '.git') {
      processDir(p);
    } else if (file.endsWith('.html')) {
      const c = fs.readFileSync(p, 'utf8');
      const preloadMatch = c.match(/<link rel="preload" href="\/script\.js\?v=([^"]+)"/);
      const scriptMatch = c.match(/<script src="\/script\.js\?v=([^"]+)"><\/script>/);
      
      if (preloadMatch && scriptMatch && preloadMatch[1] !== scriptMatch[1]) {
        mismatched++;
      }
      if (scriptMatch && !c.match(/<script[^>]+defer[^>]*src="\/script\.js/)) {
        missingDefer++;
      }
    }
  });
}

processDir('.');
console.log('Mismatched script versions:', mismatched);
console.log('Missing defer attribute:', missingDefer);
