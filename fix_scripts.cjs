const fs = require('fs');
const filesToFix = [
  'blank-space.html', 'bold-text.html', 'bullet-point.html', 
  'emoticons.html', 'free-fire-name.html', 'invisible-character.html', 
  'morse-code.html', 'small-text.html', 'strikethrough-text.html', 
  'cursive-text.html', 'bubble-text.html', 'vaporwave-text.html'
];
for (const f of filesToFix) {
  if (!fs.existsSync(f)) continue;
  let html = fs.readFileSync(f, 'utf8');
  if (!html.includes('script.js')) {
    html = html.replace('</body>', '<script src="/script.js?v=5.6"></script>\n</body>');
    fs.writeFileSync(f, html, 'utf8');
    console.log('Added script.js to ' + f);
  }
}
