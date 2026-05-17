const fs = require('fs');
const path = require('path');

// 1. Update style.css
const cssPath = 'style.css';
let css = fs.readFileSync(cssPath, 'utf8');

const newFooterCSS = `/* ===== PREMIUM SAAS FOOTER ===== */
.footer-saas {
  background: transparent;
  color: #475569;
  padding: 5rem 1.5rem 2rem;
  font-family: 'Inter', sans-serif;
  border-top: 1px solid rgba(13, 148, 136, 0.15);
  margin-top: 4rem;
}

.footer-saas-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-saas-top {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  margin-bottom: 4rem;
}

@media (min-width: 992px) {
  .footer-saas-top {
    flex-direction: row;
    justify-content: space-between;
  }
}

.footer-saas-brand {
  max-width: 320px;
}

.footer-saas-brand .logo {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  margin-bottom: 1.25rem;
}

.footer-saas-brand .logo-text {
  font-family: 'Outfit', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  color: #0d9488;
  letter-spacing: -0.02em;
}

.footer-saas-desc {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #475569;
}

.footer-saas-links {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  flex: 1;
  max-width: 800px;
}

@media (min-width: 768px) {
  .footer-saas-links {
    grid-template-columns: repeat(4, 1fr);
  }
}

.footer-saas-title {
  font-family: 'Outfit', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  color: #0d9488;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.footer-saas-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.footer-saas-col a {
  color: #475569;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.footer-saas-col a:hover {
  color: #0d9488;
  transform: translateX(2px);
  display: inline-block;
}

.footer-saas-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(13, 148, 136, 0.15);
}

@media (min-width: 768px) {
  .footer-saas-bottom {
    flex-direction: row;
    justify-content: space-between;
  }
}

.footer-saas-status {
  display: none; /* Hide if it still exists anywhere */
}

.footer-saas-copy {
  font-size: 0.85rem;
  color: #64748b;
}

.footer-saas-socials {
  display: flex;
  gap: 1rem;
}

.footer-saas-socials a {
  color: #64748b;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-saas-socials a:hover {
  color: #0d9488;
}`;

const startIdx = css.indexOf('/* ===== PREMIUM SAAS FOOTER ===== */');
const endIdx = css.indexOf('.page-up-btn {');

if (startIdx !== -1 && endIdx !== -1) {
  const before = css.substring(0, startIdx);
  const after = css.substring(endIdx);
  fs.writeFileSync(cssPath, before + newFooterCSS + '\n\n' + after, 'utf8');
}

// 2. Remove "All systems operational" from all HTML files
let filesModified = 0;

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        processDir(fullPath);
      }
    } else if (file.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      const regex = /<div class="footer-saas-status">[\s\S]*?<\/div>/i;
      if (regex.test(content)) {
        content = content.replace(regex, '');
        fs.writeFileSync(fullPath, content, 'utf8');
        filesModified++;
      }
    }
  }
}

processDir('.');
console.log(`Updated style.css for light theme and removed status div from ${filesModified} HTML files.`);
