const fs = require('fs');
const path = require('path');

function processDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const p = path.join(dir, file);
    if (fs.statSync(p).isDirectory() && file !== 'node_modules' && file !== '.git') {
      processDir(p);
    } else if (file.endsWith('.html')) {
      let c = fs.readFileSync(p, 'utf8');

      // Skip if already deferred
      if (!c.includes('onload="this.onload=null;this.rel=\'stylesheet\'"')) {
          // Google Fonts
          c = c.replace(/<link href="https:\/\/fonts\.googleapis\.com\/css2\?[^"]+" rel="stylesheet">/g, 
            match => {
              let href = match.match(/href="([^"]+)"/)[1];
              return `<link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'">\n  <noscript><link rel="stylesheet" href="${href}"></noscript>`;
            }
          );
    
          // style.css
          c = c.replace(/<link rel="stylesheet" href="\/style\.css\?v=[^"]+">/g, 
            match => {
              let href = match.match(/href="([^"]+)"/)[1];
              return `<link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'">\n  <noscript><link rel="stylesheet" href="${href}"></noscript>`;
            }
          );
    
          fs.writeFileSync(p, c);
      }
    }
  });
}

processDir('.');
console.log('Successfully deferred CSS files to fix PageSpeed warnings!');
