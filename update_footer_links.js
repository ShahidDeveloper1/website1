import fs from 'fs';
import path from 'path';

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
  console.log('🚀 Updating global footers with /letters and /names links...');
  const htmlFiles = getFiles(process.cwd());
  let updatedCount = 0;

  htmlFiles.forEach(filepath => {
    let content = fs.readFileSync(filepath, 'utf8');
    const originalContent = content;

    // Replace footer link
    const target = '<li><a href="/lenny-face">Lenny Faces</a></li>';
    const replacement = `<li><a href="/lenny-face">Lenny Faces</a></li>\n            <li><a href="/letters">A-Z Letters</a></li>\n            <li><a href="/names">Fancy Names</a></li>`;

    if (content.includes(target)) {
      content = content.replace(target, replacement);
    }

    if (content !== originalContent) {
      fs.writeFileSync(filepath, content, 'utf8');
      updatedCount++;
    }
  });

  console.log(`✅ Successfully updated footer in ${updatedCount} files.`);
}

run();
