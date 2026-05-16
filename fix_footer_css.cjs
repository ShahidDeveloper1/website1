const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');
if (!css.includes('.footer-col-title')) {
  const s = `.footer-col-title {
  font-size: 0.95rem; font-weight: 700; color: #1e293b; margin-bottom: 0.75rem; font-family: 'Outfit', sans-serif;
}
`;
  css = css.replace('.footer-copy {', s + '.footer-copy {');
  fs.writeFileSync('style.css', css, 'utf8');
  console.log('Added .footer-col-title CSS');
} else {
  console.log('Already exists');
}
