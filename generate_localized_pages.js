import fs from 'fs';
import path from 'path';

const DOMAIN = 'https://www.fancysymbols.com';
const LANGS = ['hi', 'es', 'ru', 'fr', 'de', 'it', 'pt', 'bn', 'ja', 'ko', 'ms', 'pl', 'id', 'ar', 'bg', 'tr', 'sv'];
const EXCLUDED_DIRS = new Set([
  '.git', 'node_modules', 'dist', '.vscode', 'images', 'translations',
  ...LANGS
]);

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (!EXCLUDED_DIRS.has(file)) {
        getFiles(fullPath, fileList);
      }
    } else if (file.endsWith('.html')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function run() {
  console.log('🚀 Generating localized subdirectories and canonical updates...');
  
  // 1. Clean existing localized folders first
  LANGS.forEach(lang => {
    fs.rmSync(lang, { recursive: true, force: true });
  });

  const htmlFiles = getFiles(process.cwd());
  let processedCount = 0;

  htmlFiles.forEach(filepath => {
    const relPath = path.relative(process.cwd(), filepath).replace(/\\/g, '/');
    let urlPath = relPath;
    
    // Clean .html for the URL
    if (urlPath === 'index.html') {
      urlPath = '';
    } else {
      urlPath = urlPath.replace('.html', '');
    }

    const content = fs.readFileSync(filepath, 'utf8');

    LANGS.forEach(lang => {
      // Create destination directory structure
      const targetRelPath = `${lang}/${relPath}`;
      const targetDir = path.dirname(targetRelPath);
      
      fs.mkdirSync(targetDir, { recursive: true });

      // Determine clean URL paths
      const baseEnglishUrl = urlPath ? `${DOMAIN}/${urlPath}` : DOMAIN;
      const targetLocalizedUrl = urlPath ? `${DOMAIN}/${lang}/${urlPath}` : `${DOMAIN}/${lang}`;

      let modifiedContent = content;

      // 1. Rewrite <link rel="canonical"> tag
      modifiedContent = modifiedContent.replace(
        new RegExp(`<link\\s+rel=["']canonical["']\\s+href=["']${baseEnglishUrl}["']\\s*/?>`, 'gi'),
        `<link rel="canonical" href="${targetLocalizedUrl}">`
      );

      // 2. Rewrite <meta property="og:url"> tag
      modifiedContent = modifiedContent.replace(
        new RegExp(`<meta\\s+property=["']og:url["']\\s+content=["']${baseEnglishUrl}["']\\s*/?>`, 'gi'),
        `<meta property="og:url" content="${targetLocalizedUrl}">`
      );

      // 3. Rewrite <meta name="twitter:url"> tag
      modifiedContent = modifiedContent.replace(
        new RegExp(`<meta\\s+name=["']twitter:url["']\\s+content=["']${baseEnglishUrl}["']\\s*/?>`, 'gi'),
        `<meta name="twitter:url" content="${targetLocalizedUrl}">`
      );

      // 4. Rewrite JSON-LD Schema URLs ("url" and "@id")
      modifiedContent = modifiedContent.replace(
        new RegExp(`"url"\\s*:\\s*"${baseEnglishUrl}"`, 'g'),
        `"url": "${targetLocalizedUrl}"`
      );
      modifiedContent = modifiedContent.replace(
        new RegExp(`"@id"\\s*:\\s*"${baseEnglishUrl}"`, 'g'),
        `"@id": "${targetLocalizedUrl}"`
      );

      fs.writeFileSync(targetRelPath, modifiedContent, 'utf8');
      processedCount++;
    });
  });

  console.log(`✅ Successfully generated ${processedCount} localized HTML files across ${LANGS.length} languages.`);
}

run();
