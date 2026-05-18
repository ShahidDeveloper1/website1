const fs = require('fs');
const path = require('path');

const namesDir = path.join(__dirname, 'names');

function getCapitalizedName(filename) {
  const base = path.basename(filename, '.html');
  return base.charAt(0).toUpperCase() + base.slice(1);
}

fs.readdir(namesDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach(file => {
    if (!file.endsWith('.html')) return;

    const filePath = path.join(namesDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Skip if already injected
    if (content.includes('id="fontInput"')) {
      console.log(`Skipping (already injected): ${file}`);
      return;
    }

    const name = getCapitalizedName(file);

    // Find the combo-grid section
    const comboGridStart = content.indexOf('<div class="combo-grid">');
    if (comboGridStart === -1) {
      console.log(`Warning: No combo-grid found in ${file}`);
      return;
    }

    // Find the matching closing </div> for the combo-grid
    // We can search for the next </div> after the start of combo-grid, but we must account for nested divs inside combo-items.
    // However, in names files, each combo-item has no nested divs, only span elements:
    // <div class="combo-item"><span class="combo-text">...</span><span class="combo-label">...</span><span class="combo-copy-btn">Copy</span></div>
    // So all </div> inside the combo-grid are immediately closed. The closing </div> for the combo-grid itself is the one followed by the next section or footer.
    // Let's find the closing </div> of the combo-grid properly by tracking opening and closing tags.
    
    let depth = 0;
    let index = comboGridStart;
    let comboGridEnd = -1;

    while (index < content.length) {
      const nextOpen = content.indexOf('<div', index);
      const nextClose = content.indexOf('</div>', index);

      if (nextClose === -1) break;

      if (nextOpen !== -1 && nextOpen < nextClose) {
        depth++;
        index = nextOpen + 4;
      } else {
        depth--;
        if (depth === 0) {
          comboGridEnd = nextClose + 6; // Include the closing </div>
          break;
        }
        index = nextClose + 6;
      }
    }

    if (comboGridEnd === -1) {
      console.log(`Warning: Could not parse end of combo-grid in ${file}`);
      return;
    }

    const originalComboGrid = content.slice(comboGridStart, comboGridEnd);

    const replacement = `
    <div class="font-gen-container">
      <div class="font-input-area">
        <input type="text" class="font-input" id="fontInput" placeholder="Type your text here..." value="${name}" autofocus>
      </div>
      <div class="font-results" id="fontResults">
        ${originalComboGrid}
      </div>
    </div>
    `;

    const newContent = content.slice(0, comboGridStart) + replacement + content.slice(comboGridEnd);
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`Successfully injected font generator into ${file}`);
  });
});
