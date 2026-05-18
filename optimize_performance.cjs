const fs = require('fs');
const path = require('path');

const NEW_VERSION = 'v=6.0';

function processDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const p = path.join(dir, file);
    if (fs.statSync(p).isDirectory() && file !== 'node_modules' && file !== '.git') {
      processDir(p);
    } else if (file.endsWith('.html')) {
      let c = fs.readFileSync(p, 'utf8');
      
      // 1. Update style.css preload and link
      c = c.replace(/<link rel="preload" href="\/style\.css\?v=[^"]+" as="style">/g, `<link rel="preload" href="/style.css?${NEW_VERSION}" as="style">`);
      c = c.replace(/<link rel="stylesheet" href="\/style\.css\?v=[^"]+">/g, `<link rel="stylesheet" href="/style.css?${NEW_VERSION}">`);

      // 2. Update script.js preload
      c = c.replace(/<link rel="preload" href="\/script\.js\?v=[^"]+" as="script">/g, `<link rel="preload" href="/script.js?${NEW_VERSION}" as="script">`);
      
      // 3. Update script.js tag at the bottom and add 'defer'
      // It might already have defer or not, handle both
      c = c.replace(/<script (defer )?src="\/script\.js\?v=[^"]+"><\/script>/g, `<script defer src="/script.js?${NEW_VERSION}"></script>`);
      // If it lacked 'defer ' before, match without it
      c = c.replace(/<script src="\/script\.js\?v=[^"]+"><\/script>/g, `<script defer src="/script.js?${NEW_VERSION}"></script>`);

      fs.writeFileSync(p, c);
    }
  });
}

processDir('.');
console.log(`Updated all HTML files to CSS/JS version ${NEW_VERSION} and added defer to scripts!`);
