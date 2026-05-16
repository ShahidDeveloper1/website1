const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');
if (!css.includes('.faq-item')) {
  const faq = `
.content-article a {
  color: #0d9488; text-decoration: underline; text-underline-offset: 2px; transition: color 0.2s;
}
.content-article a:hover {
  color: #064e3b;
}
.faq-item {
  background: #f8fffe; border: 1px solid rgba(13, 148, 136, 0.1); border-radius: 0.5rem; padding: 1.25rem; margin-bottom: 1rem; transition: border-color 0.2s;
}
.faq-item:hover {
  border-color: rgba(13, 148, 136, 0.3);
}
.faq-q {
  font-weight: 700; font-size: 1rem; color: #1e293b; margin-bottom: 0.5rem; font-family: 'Outfit', sans-serif;
}
.faq-a {
  color: #334155; font-size: 0.95rem; line-height: 1.7;
}
`;
  css = css.replace('.footer {', faq + '.footer {');
  fs.writeFileSync('style.css', css, 'utf8');
  console.log('FAQ CSS injected');
} else {
  console.log('FAQ CSS already present');
}
