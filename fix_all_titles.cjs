const fs = require('fs');
const path = require('path');

const skip = new Set(['.git', 'node_modules', 'dist', 'images', '.vscode', 'es', 'fr', 'names']);

// All titles optimized to under 60 chars
// Format: "[Name] Symbols Copy and Paste - FancySymbols" (shorter separator)
const titleMap = {
  // Symbol pages (use shorter format: drop "| Text Symbols")
  'symbols/quotation.html': 'Quotation Symbols Copy and Paste - FancySymbols',
  'symbols/copyright.html': 'Copyright Symbols Copy and Paste - FancySymbols',
  'symbols/crown.html': 'Crown Symbols Copy and Paste - FancySymbols',
  'symbols/crypto.html': 'Crypto Symbols Copy and Paste - FancySymbols',
  'symbols/emoji-faces.html': 'Smiley Face Symbols Copy and Paste - FancySymbols',
  'symbols/punctuation.html': 'Punctuation Symbols Copy and Paste - FancySymbols',
  'symbols/upside-down.html': 'Upside Down Text Copy and Paste - FancySymbols',
  'symbols/greek.html': 'Greek Symbols Copy and Paste - FancySymbols',
  'symbols/roman.html': 'Roman Numeral Symbols Copy and Paste - FancySymbols',
  'symbols/old-english.html': 'Old English Symbols Copy and Paste - FancySymbols',
  'symbols/award.html': 'Award Symbols Copy and Paste - FancySymbols',
  'symbols/comparison.html': 'Comparison Symbols Copy and Paste - FancySymbols',
  'symbols/checkmark.html': 'Check Mark Symbols Copy and Paste - FancySymbols',
  'symbols/downarrow.html': 'Down Arrow Symbols Copy and Paste - FancySymbols',
  'symbols/lock.html': 'Lock Symbols Copy and Paste - FancySymbols',
  'symbols/bubble.html': 'Bubble Text Symbols Copy and Paste - FancySymbols',
  'symbols/aesthetic.html': 'Aesthetic Symbols Copy and Paste - FancySymbols',
  'symbols/currency.html': 'Currency Symbols Copy and Paste - FancySymbols',
  'symbols/fraction.html': 'Fraction Symbols Copy and Paste - FancySymbols',
  'symbols/infinity.html': 'Infinity Symbols Copy and Paste - FancySymbols',
  'symbols/japanese.html': 'Japanese Symbols Copy and Paste - FancySymbols',
  'symbols/rectangle.html': 'Rectangle Symbols Copy and Paste - FancySymbols',
  'symbols/religion.html': 'Religion Symbols Copy and Paste - FancySymbols',
  'symbols/transport.html': 'Transport Symbols Copy and Paste - FancySymbols',
  'symbols/triangle.html': 'Triangle Symbols Copy and Paste - FancySymbols',
  'symbols/uparrow.html': 'Up Arrow Symbols Copy and Paste - FancySymbols',

  // Utility pages
  'index.html': 'Text Symbols Copy and Paste | 1000+ Symbols - FancySymbols',
  'all-symbols.html': 'All Symbols Copy and Paste | Unicode List - FancySymbols',
  'font-generator.html': 'Fancy Text Generator Copy and Paste - FancySymbols',
  'bold-text.html': 'Bold Text Generator Copy and Paste - FancySymbols',
  'small-text.html': 'Small Text Generator Copy and Paste - FancySymbols',
  'vaporwave-text.html': 'Vaporwave Text Generator Copy and Paste - FancySymbols',
  'character-counter.html': 'Character Counter Online Free - FancySymbols',
  'instagram-symbols.html': 'Instagram Symbols Copy and Paste - FancySymbols',
  'tiktok-symbols.html': 'TikTok Symbols Copy and Paste - FancySymbols',
  'roblox-symbols.html': 'Roblox Symbols Copy and Paste - FancySymbols',
  'text-repeater.html': 'Text Repeater Online Free - FancySymbols',
  'morse-code.html': 'Morse Code Translator Online Free - FancySymbols',
  'lenny-face.html': 'Lenny Face Copy and Paste - FancySymbols',
};

// Also fix letter pages
const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
letters.forEach(letter => {
  const L = letter.toUpperCase();
  titleMap[`letters/${letter}.html`] = `Fancy Letter ${L} Copy and Paste - FancySymbols`;
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
