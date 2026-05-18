const fs = require('fs');
const path = require('path');

const searchContainer = `
      <div class="search-container" style="margin-top: 1.5rem;">
        <span class="search-icon">🔍</span>
        <input type="text" class="search-box" id="searchBox" placeholder="Search symbols, categories...">
      </div>`;

const searchResults = `
    <!-- SEARCH RESULTS SECTION (HIDDEN BY DEFAULT) -->
    <section id="searchResultsSection" class="search-results-section" style="display: none; margin-bottom: 3rem; margin-top: 2rem; max-width: 800px; margin-left: auto; margin-right: auto; padding: 0 1rem;">
      <div class="section-title">
        <span class="icon">🔍</span> Search Results
        <span class="line"></span>
      </div>
      <div id="searchResultsGrid" class="symbol-grid"></div>
    </section>
`;

function processDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const p = path.join(dir, file);
    if (fs.statSync(p).isDirectory() && file !== 'node_modules' && file !== '.git' && file !== 'dist') {
      processDir(p);
    } else if (file.endsWith('.html')) {
      let c = fs.readFileSync(p, 'utf8');
      
      // Skip files that already have the search box
      if (c.includes('id="searchBox"')) {
        return;
      }
      
      // We need to find the end of .page-header or .hero.
      // Usually it's something like:
      //   </div>
      // or 
      //   </section>
      // followed by other content.
      // We can use a regex to match the closing tag of the block containing 'page-header' or 'hero'.
      
      // For page-header:
      let modified = false;
      if (c.includes('class="page-header"')) {
          // Find <div class="page-header"> ... </div>
          c = c.replace(/(<div class="page-header"[^>]*>[\s\S]*?)<\/div>/, (match, p1) => {
              modified = true;
              return p1 + searchContainer + '\n    </div>\n' + searchResults;
          });
      } else if (c.includes('class="hero"')) {
          // Find <section class="hero" ...> ... </section>
          c = c.replace(/(<section class="hero"[^>]*>[\s\S]*?)<\/section>/, (match, p1) => {
              modified = true;
              return p1 + searchContainer + '\n    </section>\n' + searchResults;
          });
      }
      
      if (modified) {
          fs.writeFileSync(p, c);
      }
    }
  });
}

processDir('.');
console.log('Done injecting search bars!');
