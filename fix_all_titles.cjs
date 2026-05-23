const fs = require('fs');
const path = require('path');

const skip = new Set(['.git', 'node_modules', 'dist', 'images', '.vscode', 'es', 'fr', 'names']);

// All titles optimized to under 60 chars
// Format: "[Name] Symbols Copy and Paste - Fancy Text" (shorter separator)
const titleMap = {
  // Symbol pages (use shorter format: drop "| Text Symbols")
  'symbols/quotation.html': 'Quotation Symbols Copy and Paste - Fancy Text',
  'symbols/copyright.html': 'Copyright Symbols Copy and Paste - Fancy Text',
  'symbols/crown.html': 'Crown Symbols Copy and Paste - Fancy Text',
  'symbols/crypto.html': 'Crypto Symbols Copy and Paste - Fancy Text',
  'symbols/emoji-faces.html': 'Smiley Face Symbols Copy and Paste - Fancy Text',
  'symbols/punctuation.html': 'Punctuation Symbols Copy and Paste - Fancy Text',
  'symbols/upside-down.html': 'Upside Down Text Copy and Paste - Fancy Text',
  'symbols/greek.html': 'Greek Symbols Copy and Paste - Fancy Text',
  'symbols/roman.html': 'Roman Numeral Symbols Copy and Paste - Fancy Text',
  'symbols/old-english.html': 'Old English Symbols Copy and Paste - Fancy Text',
  'symbols/award.html': 'Award Symbols Copy and Paste - Fancy Text',
  'symbols/comparison.html': 'Comparison Symbols Copy and Paste - Fancy Text',
  'symbols/checkmark.html': 'Check Mark Symbols Copy and Paste - Fancy Text',
  'symbols/downarrow.html': 'Down Arrow Symbols Copy and Paste - Fancy Text',
  'symbols/lock.html': 'Lock Symbols Copy and Paste - Fancy Text',
  'symbols/bubble.html': 'Bubble Text Symbols Copy and Paste - Fancy Text',
  'symbols/aesthetic.html': 'Aesthetic Symbols Copy and Paste - Fancy Text',
  'symbols/currency.html': 'Currency Symbols Copy and Paste - Fancy Text',
  'symbols/fraction.html': 'Fraction Symbols Copy and Paste - Fancy Text',
  'symbols/infinity.html': 'Infinity Symbols Copy and Paste - Fancy Text',
  'symbols/japanese.html': 'Japanese Symbols Copy and Paste - Fancy Text',
  'symbols/rectangle.html': 'Rectangle Symbols Copy and Paste - Fancy Text',
  'symbols/religion.html': 'Religion Symbols Copy and Paste - Fancy Text',
  'symbols/transport.html': 'Transport Symbols Copy and Paste - Fancy Text',
  'symbols/triangle.html': 'Triangle Symbols Copy and Paste - Fancy Text',
  'symbols/uparrow.html': 'Up Arrow Symbols Copy and Paste - Fancy Text',

  // Utility pages
  'index.html': 'Fancy Text Generator ✦ Copy and Paste Cool Fonts & Symbols',
  'all-symbols.html': 'All Symbols Copy and Paste | Unicode List - Fancy Text',
  'font-generator.html': 'Fancy Text Generator Copy and Paste - Fancy Text',
  'bold-text.html': 'Bold Text Generator Copy and Paste - Fancy Text',
  'small-text.html': 'Small Text Generator Copy and Paste - Fancy Text',
  'vaporwave-text.html': 'Vaporwave Text Generator Copy and Paste - Fancy Text',
  'character-counter.html': 'Character Counter Online Free - Fancy Text',
  'instagram-symbols.html': 'Instagram Symbols Copy and Paste - Fancy Text',
  'tiktok-symbols.html': 'TikTok Symbols Copy and Paste - Fancy Text',
  'roblox-symbols.html': 'Roblox Symbols Copy and Paste - Fancy Text',
  'text-repeater.html': 'Text Repeater Online Free - Fancy Text',
  'morse-code.html': 'Morse Code Translator Online Free - Fancy Text',
  'lenny-face.html': 'Lenny Face Copy and Paste - Fancy Text',
};

// Also fix letter pages
const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
letters.forEach(letter => {
  const L = letter.toUpperCase();
  titleMap[`letters/${letter}.html`] = `Fancy Letter ${L} Copy and Paste - Fancy Text`;
});

let updated = 0;
let alreadyGood = 0;

Object.entries(titleMap).forEach(([file, newTitle]) => {
  try {
    let content = fs.readFileSync(file, 'utf8');
    const oldMatch = content.match(/<title>([^<]*)<\/title>/);
    if (!oldMatch) return;
    
    const oldTitle = oldMatch[1];
    
    if (newTitle.length > 60) {
      console.log(`❌ STILL TOO LONG: ${file} (${newTitle.length}): ${newTitle}`);
      return;
    }
    
    if (oldTitle === newTitle) {
      alreadyGood++;
      return;
    }
    
    content = content.replace(/<title>[^<]*<\/title>/, `<title>${newTitle}</title>`);
    fs.writeFileSync(file, content, 'utf8');
    updated++;
    console.log(`✅ ${file} (${newTitle.length} chars)`);
  } catch (e) {
    // File doesn't exist, skip
  }
});

console.log(`\n📊 Updated: ${updated} | Already good: ${alreadyGood}`);
