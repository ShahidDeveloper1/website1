const fs = require('fs');

let content = fs.readFileSync('all-symbols.html', 'utf8');

// Replace <div class="section-title"> with <h2 class="section-title">
// and </div> that closes it with </h2>
// Pattern: <div class="section-title">...<span class="line"></span>\n      </div>
content = content.replace(/<div class="section-title">([\s\S]*?)<span class="line"><\/span>\s*\n?\s*<\/div>/g, 
  '<h2 class="section-title">$1<span class="line"></span></h2>');

// Also handle single-line section-title divs
content = content.replace(/<div class="section-title">([\s\S]*?)<span class="line"><\/span><\/div>/g,
  '<h2 class="section-title">$1<span class="line"></span></h2>');

// Update title to include Text Symbols keyword
content = content.replace(/<title>[^<]*<\/title>/, 
  '<title>All Text Symbols Copy and Paste | 1000+ Unicode Characters - FancySymbols</title>');

fs.writeFileSync('all-symbols.html', content, 'utf8');

// Count h2 tags
const h2s = content.match(/<h2/g);
console.log(`✅ all-symbols.html: ${h2s ? h2s.length : 0} H2 tags now present`);
