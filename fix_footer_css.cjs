const fs = require('fs');

const cssPath = 'style.css';
let css = fs.readFileSync(cssPath, 'utf8');

// The new CSS
const newFooterCSS = `/* ===== PREMIUM SAAS FOOTER ===== */
.footer-saas {
  background: #09090b;
  color: #a1a1aa;
  padding: 5rem 1.5rem 2rem;
  font-family: 'Inter', sans-serif;
  border-top: 1px solid #27272a;
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
  color: #ffffff;
  letter-spacing: -0.02em;
}

.footer-saas-desc {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #a1a1aa;
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
  font-weight: 600;
  color: #ffffff;
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
  color: #a1a1aa;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.footer-saas-col a:hover {
  color: #ffffff;
  transform: translateX(2px);
  display: inline-block;
}

.footer-saas-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding-top: 2rem;
  border-top: 1px solid #27272a;
}

@media (min-width: 768px) {
  .footer-saas-bottom {
    flex-direction: row;
    justify-content: space-between;
  }
}

.footer-saas-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #d4d4d8;
  font-weight: 500;
}

.status-dot {
  width: 8px;
  height: 8px;
  background-color: #22c55e;
  border-radius: 50%;
  box-shadow: 0 0 0 rgba(34, 197, 94, 0.4);
  animation: pulse-green 2s infinite;
}

@keyframes pulse-green {
  0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
  70% { box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
  100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
}

.footer-saas-copy {
  font-size: 0.85rem;
  color: #71717a;
}

.footer-saas-socials {
  display: flex;
  gap: 1rem;
}

.footer-saas-socials a {
  color: #71717a;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-saas-socials a:hover {
  color: #ffffff;
}`;

// I need to carefully rip out anything between 
// /* ===== PREMIUM SAAS FOOTER ===== */ and /* ===== PREMIUM CONTENT ARTICLE ===== */
// EXCEPT for .page-up-btn styles which I should preserve if possible, but actually I can just recreate them.

const pageUpBtnCSS = `
.page-up-btn {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 1.2rem;
  background: #ffffff;
  border: 1px solid rgba(13, 148, 136, 0.15);
  border-radius: 999px;
  color: #0d9488;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(13, 148, 136, 0.05);
}

.page-up-btn:hover {
  transform: translateY(-3px);
  background: #0d9488;
  color: #ffffff;
  border-color: #0d9488;
  box-shadow: 0 8px 20px rgba(13, 148, 136, 0.2);
}

.page-up-icon {
  font-size: 1.1rem;
}
`;

// Find the indices
const startIdx = css.indexOf('/* ===== PREMIUM SAAS FOOTER ===== */');
const endIdx = css.indexOf('/* ===== PREMIUM CONTENT ARTICLE ===== */');

if (startIdx !== -1 && endIdx !== -1) {
  const before = css.substring(0, startIdx);
  const after = css.substring(endIdx);
  
  const finalCSS = before + newFooterCSS + '\n\n' + pageUpBtnCSS + '\n\n' + after;
  fs.writeFileSync(cssPath, finalCSS, 'utf8');
  console.log("Successfully replaced footer CSS in style.css");
} else {
  console.log("Could not find the markers in style.css");
}
