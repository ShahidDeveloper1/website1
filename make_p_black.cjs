const fs = require('fs');

const cssPath = 'style.css';
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Add global `p { color: #000000; }`
if (!css.includes('p { color: #000000; }')) {
  css = css.replace(
    'a { text-decoration: none; color: inherit; }',
    'a { text-decoration: none; color: inherit; }\np { color: #000000; }'
  );
}

// 2. Modify specific paragraph styles that explicitly set a color
css = css.replace(/\.content-article p \{ font-size: 1\.02rem; color: #[0-9a-fA-F]+;/g, '.content-article p { font-size: 1.02rem; color: #000000;');
css = css.replace(/\.step-item p \{ font-size: 0\.88rem; color: #[0-9a-fA-F]+;/g, '.step-item p { font-size: 0.88rem; color: #000000;');

// Also handle the .page-header p
// Let's use a regex to find all `.something p { ... color: #...; }` and replace the color with #000000 if we want to be aggressive.
// Or just find `.page-header p {` and update it.
css = css.replace(/(\.page-header p\s*\{[^}]*?)color:\s*#[0-9a-fA-F]+;/g, '$1color: #000000;');

// Save it back
fs.writeFileSync(cssPath, css, 'utf8');
console.log('Successfully updated paragraph text colors to pure black.');
