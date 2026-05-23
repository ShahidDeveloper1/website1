const fs = require('fs');
const path = require('path');

const skip = new Set(['.git', 'node_modules', 'dist', 'images', '.vscode', 'es', 'fr', 'names']);

// Standardized titles: "[Name] Symbols Copy and Paste - Fancy Text"
// Target: 40-60 chars (Google displays ~55-60)
const titleFixes = {
  // Symbol pages with bad titles
  'symbols/card.html': 'Card Symbols Copy and Paste - Fancy Text',
  'symbols/cross.html': 'Cross Symbols Copy and Paste - Fancy Text',
  'symbols/crown.html': 'Crown & Diamond Symbols Copy and Paste - Fancy Text',
  'symbols/award.html': 'Award & Medal Symbols Copy and Paste - Fancy Text',
  
  // Utility pages - short titles
  'font-generator.html': 'Fancy Text Generator | Copy and Paste Stylish Fonts - Fancy Text',
  'text-repeater.html': 'Text Repeater Tool | Repeat Text and Emoji Online - Fancy Text',
  'bold-text.html': 'Bold Text Generator | Copy and Paste Bold Font - Fancy Text',
  'small-text.html': 'Small Text Generator | Tiny Superscript Text Copy Paste - Fancy Text',
  'vaporwave-text.html': 'Vaporwave Text Generator | Wide Aesthetic Text - Fancy Text',
  'blank-space.html': 'Blank Space Copy and Paste | Empty Characters - Fancy Text',
  'character-counter.html': 'Character Counter | Count Words and Letters Online - Fancy Text',
  'instagram-symbols.html': 'Instagram Bio Symbols Copy and Paste - Fancy Text',
  'tiktok-symbols.html': 'TikTok Bio Symbols Copy and Paste - Fancy Text',
  'roblox-symbols.html': 'Roblox Symbols Copy and Paste - Fancy Text',
};

let updated = 0;

Object.entries(titleFixes).forEach(([file, newTitle]) => {
  try {
    let content = fs.readFileSync(file, 'utf8');
    const oldTitle = content.match(/<title>([^<]*)<\/title>/);
    if (oldTitle) {
      content = content.replace(/<title>[^<]*<\/title>/, `<title>${newTitle}</title>`);
      fs.writeFileSync(file, content, 'utf8');
      updated++;
      console.log(`✅ ${file} (${newTitle.length} chars): "${oldTitle[1]}" → "${newTitle}"`);
    }
  } catch (e) {
    console.log(`⚠️  ${file}: ${e.message}`);
  }
});

console.log(`\n📊 Total titles fixed: ${updated}`);
