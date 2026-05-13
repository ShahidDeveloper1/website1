const fs = require('fs');
const path = require('path');

function replaceFooter(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            if (['symbols', 'pages'].includes(file)) {
                replaceFooter(fullPath);
            }
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            const target = '<p class="footer-copy">© 2026 FancySymbols. Created with ❤️ for creators.</p>';
            const replacement = '<p class="footer-copy">© 2026 FancySymbols.</p>';
            if (content.includes(target)) {
                content = content.replace(target, replacement);
                fs.writeFileSync(fullPath, content, 'utf8');
            }
        }
    }
}

console.log('Updating footer text...');
replaceFooter(process.cwd());
console.log('Footer updated successfully.');
