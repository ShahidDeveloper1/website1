const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

const startStr = '.header {\r\n  position: fixed;';
const endStr = '.sidebar-overlay {\r\n';

// Fallback to \n if \r\n not found
const start = css.indexOf(startStr) !== -1 ? css.indexOf(startStr) : css.indexOf('.header {\n  position: fixed;');
const end = css.indexOf(endStr) !== -1 ? css.indexOf(endStr) : css.indexOf('.sidebar-overlay {\n');

if (start !== -1 && end !== -1) {
  const newCSS = `.header {
  position: fixed;
  top: 0; left: 0; right: 0;
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.03);
  z-index: 1001;
  height: 76px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.header-inner {
  display: flex; height: 100%; align-items: center; justify-content: space-between; width: 100%; max-width: 1400px; margin: 0 auto;
}
.logo {
  display: flex; align-items: center; gap: 0.75rem; font-size: 1.6rem; font-weight: 800; font-family: 'Outfit', sans-serif;
  color: #0f172a;
  letter-spacing: -0.02em;
}
.header-nav {
  display: flex; align-items: center; gap: 0.25rem;
}
.header-nav a {
  padding: 0.5rem 1.1rem; 
  border-radius: 8px; 
  font-size: 0.95rem; 
  font-weight: 500; 
  color: #475569; 
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'Inter', sans-serif;
}
.header-nav a:hover {
  background-color: #f1f5f9; color: #0f172a;
}
.header-nav a.active {
  background: #f1f5f9; 
  color: #0f172a;
  font-weight: 600;
}
.header-nav a.nav-cta {
  background: #0f172a; 
  color: #ffffff !important;
  margin-left: 1rem;
  border-radius: 8px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
  padding: 0.6rem 1.4rem;
}
.header-nav a.nav-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.25);
  background: #1e293b;
}
.menu-toggle {
  display: none; font-size: 1.5rem; color: #0f172a; padding: 0.5rem; cursor: pointer; background: transparent; border: 0; border-radius: 8px; transition: background-color 0.2s;
}
.menu-toggle:hover {
  background-color: #f1f5f9;
}
`;
  fs.writeFileSync('style.css', css.substring(0, start) + newCSS + css.substring(end));
  console.log("Replaced successfully.");
} else {
  console.log("Could not find start or end string", start, end);
}
