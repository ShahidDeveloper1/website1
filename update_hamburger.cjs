const fs = require('fs');
const path = require('path');

function walk(dir) {
  let files = fs.readdirSync(dir);
  files.forEach(f => {
    let full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      walk(full);
    } else if (full.endsWith('.html')) {
      let content = fs.readFileSync(full, 'utf8');
      if (content.includes('<button class="menu-toggle" id="menuToggle">☰</button>')) {
        let newContent = content.replace(
          '<button class="menu-toggle" id="menuToggle">☰</button>',
          '<button class="menu-toggle" id="menuToggle"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></button>'
        );
        fs.writeFileSync(full, newContent);
      }
    }
  });
}

walk('.');
console.log('Replaced hamburger icons in all HTML files');
