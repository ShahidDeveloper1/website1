const fs = require('fs');
const path = require('path');

const newFooterHTML = `
<!-- FOOTER -->
<footer class="footer-saas">
  <div class="footer-saas-inner">
    <div class="footer-saas-top">
      <div class="footer-saas-brand">
        <a href="/" class="logo" style="text-decoration:none; color:inherit; display:flex; align-items:center; gap:10px;">
          <img src="/favicon.png?v=5.8" alt="Fancy Text Logo" class="logo-img" width="32" height="32" style="border-radius:8px;">
          <span class="logo-text highlight">Fancy Text</span>
        </a>
        <p class="footer-saas-desc">Your ultimate premium destination for aesthetic symbols, cool fonts, and creative digital expression tools. Elevate your online presence with one click.</p>
      </div>
      
      <div class="footer-saas-links">
        <div class="footer-saas-col">
          <div class="footer-saas-title">Generators</div>
          <ul>
            <li><a href="/all-symbols">All Symbols</a></li>
            <li><a href="/aesthetic-fonts">Aesthetic Fonts</a></li>
            <li><a href="/preppy-fonts">Preppy Fonts</a></li>
            <li><a href="/cute-fonts">Cute Fonts</a></li>
            <li><a href="/font-generator">Fancy Text</a></li>
            <li><a href="/lenny-face">Lenny Faces</a></li>
          </ul>
        </div>

        <div class="footer-saas-col">
          <div class="footer-saas-title">Top Categories</div>
          <ul>
            <li><a href="/symbols/heart">Heart Symbols</a></li>
            <li><a href="/symbols/star">Star Symbols</a></li>
            <li><a href="/symbols/aesthetic">Aesthetic Symbols</a></li>
            <li><a href="/symbols/arrow">Arrow Symbols</a></li>
            <li><a href="/symbols/flower">Flower Symbols</a></li>
            <li><a href="/symbols/checkmark">Check Marks</a></li>
          </ul>
        </div>

        <div class="footer-saas-col">
          <div class="footer-saas-title">Discover</div>
          <ul>
            <li><a href="/symbols/emoji-faces">Emoji Faces</a></li>
            <li><a href="/symbols/math">Math Symbols</a></li>
            <li><a href="/symbols/japanese">Japanese Symbols</a></li>
            <li><a href="/symbols/korean">Korean Symbols</a></li>
            <li><a href="/symbols/music">Music Symbols</a></li>
            <li><a href="/symbols/cross">Cross Symbols</a></li>
          </ul>
        </div>

        <div class="footer-saas-col">
          <div class="footer-saas-title">Company</div>
          <ul>
            <li><a href="/pages/privacy">Privacy Policy</a></li>
            <li><a href="/pages/terms">Terms of Service</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="footer-saas-bottom">
      <div class="footer-saas-status">
        <span class="status-dot"></span> All systems operational
      </div>
      <div class="footer-saas-copy">
        &copy; 2026 Fancy Text. All rights reserved.
      </div>
      <div class="footer-saas-socials">
        <a href="#" aria-label="Twitter">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
        </a>
        <a href="#" aria-label="GitHub">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
        </a>
        <a href="#" aria-label="Discord">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 22V12h6v10M2 10.5C2 7.5 4.5 5 7.5 5h9C19.5 5 22 7.5 22 10.5v8.5a3 3 0 0 1-3 3h-2v-5H7v5H5a3 3 0 0 1-3-3v-8.5z"></path></svg>
        </a>
      </div>
    </div>
  </div>
  <div id="clipboard-bar"></div>
</footer>`;

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
      let originalContent = content;

      // Bump style.css and favicon version string to ?v=5.8 for speed/cache optimization
      content = content.replace(/style\.css\?v=5\.\d+/g, 'style.css?v=5.8');
      content = content.replace(/favicon\.png\?v=5\.\d+/g, 'favicon.png?v=5.8');

      // Replace old footer block
      // We look for <footer class="footer">...</footer>
      const footerRegex = /<footer\s+class="footer"[^>]*>[\s\S]*?<\/footer>/i;
      
      if (footerRegex.test(content)) {
        content = content.replace(footerRegex, newFooterHTML.trim());
      } else {
        // Fallback for morse-code.html where it might be slightly different or already matched
        // Actually, morse-code.html was matching `<footer class="footer" style="margin-top:3rem;">` which IS caught by the regex above!
      }

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        filesModified++;
      }
    }
  }
}

processDir('.');
console.log(`Injected 10B SaaS Footer into ${filesModified} HTML files.`);
