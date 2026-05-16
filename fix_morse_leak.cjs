const fs = require('fs');

let content = fs.readFileSync('morse-code.html', 'utf8');

// Remove the leaked code: everything between </footer> and the second <script> block
// The leaked code is: `\r\n    ).join('');\r\n  }\r\n\r\n  // ===== INIT =====\r\n  ...buildChart();\r\n  </script>\r\n
const before = content;

// Match the leaked fragment between </footer> and the second <script> that starts the Morse engine
content = content.replace(
  /(<\/footer>)\s*`\s*\)\.join\(''\);\s*\}\s*\/\/\s*=====\s*INIT\s*=====\s*document\.getElementById\('morseInput'\)\.addEventListener\('input',\s*translate\);\s*translate\(\);\s*buildChart\(\);\s*<\/script>\s*(<script>)/s,
  '$1\n\n$2'
);

if (content === before) {
  console.log('❌ Pattern not found - trying alternate approach');
  
  // Find the index of </footer> then find the next <script> and remove everything between
  const footerEnd = content.indexOf('</footer>', content.indexOf('footer-copy'));
  const nextScript = content.indexOf('<script>', footerEnd);
  
  if (footerEnd > 0 && nextScript > footerEnd) {
    const between = content.substring(footerEnd + 9, nextScript);
    console.log('Content between </footer> and <script>:');
    console.log(JSON.stringify(between.substring(0, 200)));
    
    // Remove the leaked JS code
    content = content.substring(0, footerEnd + 9) + '\n\n' + content.substring(nextScript);
    console.log('✅ Fixed using index-based approach');
  }
}

fs.writeFileSync('morse-code.html', content, 'utf8');
console.log('Done!');
