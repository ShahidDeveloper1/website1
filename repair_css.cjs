const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf8');

// The file has .footer-desc {
// We want to add the footer classes right before it.

css = css.replace(
  /\.footer-desc \{/,
  `@media (max-width: 768px) {
  .font-card-preview { font-size: 1.2rem; }
  .font-category-title { font-size: 1.2rem; }
}

/* ===== MODERN FOOTER STYLES ===== */
.footer {
  background: transparent;
  color: #334155;
  padding: 5rem 1.5rem 2rem;
  font-family: 'Outfit', sans-serif;
  border-top: none;
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  margin-bottom: 4rem;
}

@media (max-width: 768px) {
  .footer { margin-left: 0 !important; }
}

.footer-brand .logo-text {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: block;
}

.footer-desc {`
);

fs.writeFileSync('style.css', css, 'utf8');
console.log('Fixed style.css syntax and restored footer CSS. Background set to transparent.');
