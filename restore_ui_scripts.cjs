const fs = require('fs');
const cp = require('child_process');

const filesToRestore = [
  'blank-space.html',
  'bold-text.html',
  'bullet-point.html',
  'emoticons.html',
  'free-fire-name.html',
  'invisible-character.html',
  'morse-code.html',
  'small-text.html',
  'strikethrough-text.html',
  'cursive-text.html',
  'bubble-text.html',
  'vaporwave-text.html'
];

for (const f of filesToRestore) {
  if (!fs.existsSync(f)) continue;
  try {
    const oldHtml = cp.execSync('git show b30ebba6180a5b143b36ae3210e861a555f149fe:' + f).toString();
    let newHtml = fs.readFileSync(f, 'utf8');
    
    const oldStylesMatch = oldHtml.match(/<style[^>]*>[\s\S]*?<\/style>/gi);
    const newStylesMatch = newHtml.match(/<style[^>]*>[\s\S]*?<\/style>/gi);
    
    if (oldStylesMatch && (!newStylesMatch || newStylesMatch.length < oldStylesMatch.length)) {
        const styleToInject = oldStylesMatch.join('\n');
        newHtml = newHtml.replace('</head>', '\n' + styleToInject + '\n</head>');
        console.log('Restored style for ' + f);
    }
    
    const oldScriptsMatch = (oldHtml.match(/<script(?![^>]*src=)[^>]*>[\s\S]*?<\/script>/gi) || []).filter(s => !s.includes('application/ld+json'));
    const newScriptsMatch = (newHtml.match(/<script(?![^>]*src=)[^>]*>[\s\S]*?<\/script>/gi) || []).filter(s => !s.includes('application/ld+json'));
    
    if (oldScriptsMatch.length > 0 && newScriptsMatch.length === 0) {
        const scriptsToInject = oldScriptsMatch.join('\n');
        // Find the script.js tag
        const splitText = '<script src="/script.js';
        const parts = newHtml.split(splitText);
        if (parts.length > 1) {
            newHtml = parts[0] + scriptsToInject + '\n' + splitText + parts[1];
        } else {
            newHtml = newHtml.replace('</body>', scriptsToInject + '\n</body>');
        }
        console.log('Restored scripts for ' + f);
    }
    
    fs.writeFileSync(f, newHtml, 'utf8');
  } catch (err) {
    console.error('Error processing ' + f + ': ' + err.message);
  }
}
console.log('Done restoring UI/UX components!');
