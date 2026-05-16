// Fix old-english.html - the only file still containing .html refs
const fs = require('fs');
let html = fs.readFileSync('symbols/old-english.html', 'utf8');
const before = (html.match(/\.html/g) || []).length;

// Remove .html before quotes (catches href="...html" and content="...html" etc)
html = html.replace(/\.html(?=['"])/g, '');

fs.writeFileSync('symbols/old-english.html', html);
const after = (html.match(/\.html/g) || []).length;
console.log(`Fixed ${before - after} .html refs in old-english.html (${before} → ${after} remaining)`);
