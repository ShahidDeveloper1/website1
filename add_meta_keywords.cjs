const fs = require('fs');
const path = require('path');

const skip = new Set(['.git', 'node_modules', 'dist', 'images', '.vscode', 'es', 'fr']);

let updated = 0;

function generateKeywords(fileName, dirName, titleMatch) {
    const baseName = fileName.replace('.html', '').replace(/-/g, ' ');
    
    let keywords = [];
    
    // Core keyword from user's primary strategy
    const core = 'textsymbols, text symbols copy and paste';
    
    if (dirName === 'symbols') {
        keywords = [
            `${baseName} symbols`,
            `${baseName} text symbols`,
            `copy and paste ${baseName} symbols`,
            `${baseName} emoji text`,
            `aesthetic ${baseName} symbols`,
            `cool ${baseName} symbols`,
            core
        ];
    } else if (dirName === 'letters') {
        keywords = [
            `fancy letter ${baseName}`,
            `letter ${baseName} symbols`,
            `cursive letter ${baseName}`,
            `aesthetic letter ${baseName}`,
            `copy and paste letter ${baseName}`,
            core
        ];
    } else if (dirName === 'names') {
        keywords = [
            `fancy name ${baseName}`,
            `${baseName} name style`,
            `${baseName} stylish text`,
            `${baseName} aesthetic name`,
            `copy and paste ${baseName}`,
            core
        ];
    } else {
        // Utility pages or index
        if (fileName === 'index.html' || fileName === 'all-symbols.html') {
            keywords = [
                'text symbols',
                'copy and paste symbols',
                'aesthetic symbols',
                'cool text symbols',
                'unicode characters',
                'emoji text',
                'discord symbols',
                'instagram symbols',
                core
            ];
        } else {
            // Extract from title or use basename
            const titleText = titleMatch ? titleMatch[1].split('|')[0].replace('Copy and Paste', '').replace('- FancySymbols', '').trim().toLowerCase() : baseName;
            keywords = [
                titleText,
                `${titleText} copy and paste`,
                `${titleText} online`,
                `free ${titleText}`,
                `aesthetic ${titleText}`,
                core
            ];
        }
    }
    
    // Join and deduplicate terms loosely
    return [...new Set(keywords.join(', ').split(', '))].join(', ').toLowerCase();
}

function walk(dir) {
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory() && !skip.has(file)) {
            walk(filePath);
        } else if (file.endsWith('.html') && !file.startsWith('old_')) {
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Skip if already has keywords
            if (content.includes('<meta name="keywords"')) return;
            
            const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
            const dirName = path.basename(dir);
            
            const keywords = generateKeywords(file, dirName, titleMatch);
            
            const keywordsTag = `\n    <meta name="keywords" content="${keywords}">`;
            
            // Inject after description
            if (content.includes('<meta name="description"')) {
                content = content.replace(/(<meta name="description"[^>]*>)/, `$1${keywordsTag}`);
                fs.writeFileSync(filePath, content, 'utf8');
                updated++;
                console.log(`✅ Added keywords to ${filePath}`);
            } else if (content.includes('<title>')) {
                // Fallback to inject after title
                content = content.replace(/(<title>[^<]*<\/title>)/, `$1${keywordsTag}`);
                fs.writeFileSync(filePath, content, 'utf8');
                updated++;
                console.log(`✅ Added keywords to ${filePath}`);
            }
        }
    });
}

walk('.');
console.log(`\n📊 Total pages injected with meta keywords: ${updated}`);
