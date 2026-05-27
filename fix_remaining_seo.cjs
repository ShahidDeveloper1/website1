/**
 * Fix remaining SEO issues:
 * 1. Truncated titles (cursive-text, gothic-text)
 * 2. LaTeX in letter descriptions (d, q, v)
 * 3. Generic symbol descriptions with wrong placeholder symbols
 * 4. "text symbols" references in body content of index.html
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
let fixed = 0;

// ---- Fix truncated titles ----
function fixFile(file, replacements) {
  const filePath = path.join(ROOT, file);
  if (!fs.existsSync(filePath)) return;
  let html = fs.readFileSync(filePath, 'utf8');
  let original = html;
  for (const [search, replace] of replacements) {
    html = html.split(search).join(replace);
  }
  if (html !== original) {
    fs.writeFileSync(filePath, html, 'utf8');
    fixed++;
    console.log(`  ✅ ${file}`);
  }
}

console.log('🔧 Fixing remaining SEO issues...\n');

// 1. Truncated titles
fixFile('cursive-text.html', [
  ['Copy and Paste Handwri</title>', 'Copy and Paste Handwriting Fonts</title>'],
  ['Copy and Paste Handwri"', 'Copy and Paste Handwriting Fonts"'],
]);

fixFile('gothic-text.html', [
  ['Copy and Paste Blacklette</title>', 'Copy and Paste Blackletter Fonts</title>'],
  ['Copy and Paste Blacklette"', 'Copy and Paste Blackletter Fonts"'],
]);

// 2. LaTeX in letter descriptions
fixFile('letters/d.html', [
  ['mathbb{D}', '𝔻'],
  ['mathbb{d}', '𝕕'],
]);

fixFile('letters/q.html', [
  ['mathbb{Q}', 'ℚ'],
  ['mathbb{q}', '𝕢'],
]);

fixFile('letters/v.html', [
  ['mathbb{V}', '𝕍'],
  ['mathbb{v}', '𝕧'],
]);

// 3. Generic symbol descriptions using ✦ ★ ❤ instead of relevant symbols
const symbolDescFixes = {
  'symbols/checkmark.html': {
    old: 'Copy checkmark symbols copy and paste instantly — ✦ ★ ❤',
    new: 'Copy checkmark symbols copy and paste instantly — ✔ ✓ ☑'
  },
  'symbols/copyright.html': {
    old: 'Copy copyright symbols copy and paste instantly — ✦ ★ ❤',
    new: 'Copy copyright symbols copy and paste instantly — © ® ™'
  },
  'symbols/crypto.html': {
    old: 'Copy crypto symbols copy and paste instantly — ✦ ★ ❤',
    new: 'Copy crypto symbols copy and paste instantly — ₿ Ξ ₮'
  },
  'symbols/downarrow.html': {
    old: 'Copy downarrow symbols copy and paste instantly — ✦ ★ ❤',
    new: 'Copy down arrow symbols copy and paste instantly — ↓ ⬇ ⇩'
  },
  'symbols/emoji-faces.html': {
    old: 'Copy emoji-faces symbols copy and paste instantly — ✦ ★ ❤',
    new: 'Copy emoji faces and smiley symbols instantly — 😊 🥰 😎'
  },
  'symbols/gender.html': {
    old: 'Copy gender symbols copy and paste instantly — ✦ ★ ❤',
    new: 'Copy gender symbols copy and paste instantly — ♂ ♀ ⚥'
  },
  'symbols/medal.html': {
    old: 'Copy medal symbols copy and paste instantly — ✦ ★ ❤',
    new: 'Copy medal and award symbols copy and paste instantly — 🏅 🥇 🏆'
  },
  'symbols/medical.html': {
    old: 'Copy medical symbols copy and paste instantly — ✦ ★ ❤',
    new: 'Copy medical symbols copy and paste instantly — ⚕ ☤ ✚'
  },
  'symbols/old-english.html': {
    old: 'Copy old-english symbols copy and paste instantly — ✦ ★ ❤',
    new: 'Copy Old English font letters copy and paste instantly — 𝔄 𝔅 ℭ'
  },
  'symbols/uparrow.html': {
    old: 'Copy uparrow symbols copy and paste instantly — ✦ ★ ❤',
    new: 'Copy up arrow symbols copy and paste instantly — ↑ ⬆ ⇧'
  },
  'symbols/lock.html': {
    old: 'Copy lock symbols copy and paste instantly — ✦ ★ ❤',
    new: 'Copy lock and key symbols copy and paste instantly — 🔒 🔓 🔑'
  },
  'symbols/dice.html': {
    old: 'Copy dice symbols copy and paste instantly — ✦ ★ ❤',
    new: 'Copy dice symbols copy and paste instantly — ⚀ ⚁ ⚂'
  },
  'symbols/warning.html': {
    old: 'Copy warning symbols copy and paste instantly — ✦ ★ ❤',
    new: 'Copy warning symbols copy and paste instantly — ⚠ ⛔ ☢'
  },
  'symbols/writing.html': {
    old: 'Copy writing symbols copy and paste instantly — ✦ ★ ❤',
    new: 'Copy writing symbols copy and paste instantly — ✍ ✏ 📝'
  },
  'symbols/award.html': {
    old: 'Copy award symbols copy and paste instantly — ✦ ★ ❤',
    new: 'Copy award and trophy symbols copy and paste instantly — 🏆 🥇 🎖'
  },
  'symbols/chess.html': {
    old: 'Copy chess symbols copy and paste instantly — ✦ ★ ❤',
    new: 'Copy chess symbols copy and paste instantly — ♔ ♕ ♖'
  },
  'symbols/infinity.html': {
    old: 'Copy infinity symbols copy and paste instantly — ✦ ★ ❤',
    new: 'Copy infinity symbols copy and paste instantly — ∞ ♾ ⧜'
  },
  'symbols/house.html': {
    old: 'Copy house symbols copy and paste instantly — ✦ ★ ❤',
    new: 'Copy house and home symbols copy and paste instantly — 🏠 🏡 🏘'
  },
  'symbols/religion.html': {
    old: 'Copy religion symbols copy and paste instantly — ✦ ★ ❤',
    new: 'Copy religion symbols copy and paste instantly — ✝ ☪ ✡'
  },
  'symbols/transport.html': {
    old: 'Copy transport symbols copy and paste instantly — ✦ ★ ❤',
    new: 'Copy transport symbols copy and paste instantly — 🚗 ✈ 🚀'
  },
  'symbols/office.html': {
    old: 'Copy office symbols copy and paste instantly — ✦ ★ ❤',
    new: 'Copy office symbols copy and paste instantly — 💼 📁 📋'
  },
  'symbols/card.html': {
    old: 'Copy card symbols copy and paste instantly — ✦ ★ ❤',
    new: 'Copy playing card symbols copy and paste instantly — ♠ ♣ ♥'
  },
  'symbols/unit.html': {
    old: 'Copy unit symbols copy and paste instantly — ✦ ★ ❤',
    new: 'Copy unit symbols copy and paste instantly — ℃ ℉ ㎡'
  },
  'symbols/fraction.html': {
    old: 'Copy fraction symbols copy and paste instantly — ✦ ★ ❤',
    new: 'Copy fraction symbols copy and paste instantly — ½ ⅓ ¼'
  },
  'symbols/comparison.html': {
    old: 'Copy comparison symbols copy and paste instantly — ✦ ★ ❤',
    new: 'Copy comparison symbols copy and paste instantly — ≥ ≤ ≠'
  },
  'symbols/roman.html': {
    old: 'Copy roman symbols copy and paste instantly — ✦ ★ ❤',
    new: 'Copy Roman numeral symbols copy and paste instantly — Ⅰ Ⅱ Ⅲ'
  },
  'symbols/weapon.html': {
    old: 'Copy weapon symbols copy and paste instantly — ✦ ★ ❤',
    new: 'Copy weapon symbols copy and paste instantly — ⚔ 🗡 🏹'
  },
  'symbols/cross.html': {
    old: 'Copy cross symbols copy and paste instantly — ✦ ★ ❤',
    new: 'Copy cross symbols copy and paste instantly — ✝ ☦ ✞'
  },
};

for (const [file, fix] of Object.entries(symbolDescFixes)) {
  fixFile(file, [[fix.old, fix.new]]);
}

// 4. Fix "text symbols" in index.html body content (table header already done by first script)
// Fix remaining body content references to reduce "text symbols" association
fixFile('index.html', [
  // In the comparison table row
  ['<th>Text Symbols</th>', '<th>Fancy Symbols</th>'],
  // FAQ and body content - be careful to only change where appropriate
  ['What are text symbols?', 'What are fancy symbols?'],
  ['text symbols are special', 'fancy symbols are special'],
  ['the most popular text symbols', 'the most popular fancy symbols'],
  ['Text symbols are Unicode', 'Fancy symbols are Unicode'],
  ['between text symbols and emoji', 'between fancy symbols and emoji'],
  ['How to use text symbols', 'How to use fancy symbols'],
  ['text symbols work on', 'fancy symbols work on'],
  ['>text symbols<', '>fancy symbols<'],
]);

// 5. Also fix the bullet-point.html "bullet text symbols" reference
fixFile('bullet-point.html', [
  ['bullet text symbols', 'bullet point symbols'],
]);

console.log(`\n✅ Remaining fixes complete! Files modified: ${fixed}`);
