const fs = require('fs');
const path = require('path');

const symbolsDir = path.join(__dirname, 'symbols');

const gridHtml = `
  <!-- CATEGORY NAVIGATION -->
  <div class="section-title">Browse More Symbols <span class="line"></span></div>
  <div class="quick-links-grid">
    <a href="/symbols/heart.html" class="quick-link-btn" title="Heart Symbols"><span>❤️</span> Heart</a>
    <a href="/symbols/checkmark.html" class="quick-link-btn" title="Check Mark Symbols"><span>✔️</span> Check Mark</a>
    <a href="/symbols/animal.html" class="quick-link-btn" title="Animal Symbols"><span>🐾</span> Animal</a>
    <a href="/symbols/star.html" class="quick-link-btn" title="Star Symbols"><span>⭐</span> Star</a>
    <a href="/symbols/sun.html" class="quick-link-btn" title="Sun Symbols"><span>☀</span> Sun</a>
    <a href="/symbols/moon.html" class="quick-link-btn" title="Moon Symbols"><span>☾</span> Moon</a>
    <a href="/symbols/music.html" class="quick-link-btn" title="Music Symbols"><span>🎵</span> Music</a>
    <a href="/symbols/cross.html" class="quick-link-btn" title="Cross Symbols"><span>✝</span> Cross</a>
    <a href="/symbols/zodiac.html" class="quick-link-btn" title="Zodiac Symbols"><span>♈</span> Zodiac</a>
    <a href="/symbols/numbers.html" class="quick-link-btn" title="Number Symbols"><span>①</span> Numbers</a>
    <a href="/symbols/arrow.html" class="quick-link-btn" title="Arrow Symbols"><span>⇨</span> Arrow</a>
    <a href="/symbols/uparrow.html" class="quick-link-btn" title="Up Arrow Symbols"><span>↑</span> Up Arrow</a>
    <a href="/symbols/downarrow.html" class="quick-link-btn" title="Down Arrow Symbols"><span>↓</span> Down Arrow</a>
    <a href="/symbols/flower.html" class="quick-link-btn" title="Flower Symbols"><span>✿</span> Flower</a>
    <a href="/symbols/gender.html" class="quick-link-btn" title="Gender Symbols"><span>⚥</span> Gender</a>
    <a href="/symbols/infinity.html" class="quick-link-btn" title="Infinity Symbols"><span>∞</span> Infinity</a>
    <a href="/symbols/medical.html" class="quick-link-btn" title="Medical Symbols"><span>⚕</span> Medical</a>
    <a href="/symbols/currency.html" class="quick-link-btn" title="Currency Symbols"><span>$</span> Currency</a>
    <a href="/symbols/chess.html" class="quick-link-btn" title="Chess Symbols"><span>♚</span> Chess</a>
    <a href="/symbols/weather.html" class="quick-link-btn" title="Weather Symbols"><span>☀</span> Weather</a>
    <a href="/symbols/bracket.html" class="quick-link-btn" title="Bracket Symbols"><span>【</span> Bracket</a>
    <a href="/symbols/religion.html" class="quick-link-btn" title="Religion Symbols"><span>✝</span> Religion</a>
    <a href="/symbols/copyright.html" class="quick-link-btn" title="Copyright & Legal Symbols"><span>©</span> Copyright</a>
    <a href="/symbols/unit.html" class="quick-link-btn" title="Unit Symbols"><span>℃</span> Unit</a>
    <a href="/symbols/card.html" class="quick-link-btn" title="Card Symbols"><span>♠</span> Card Symbol</a>
    <a href="/symbols/dice.html" class="quick-link-btn" title="Dice Symbols"><span>🎲</span> Dice</a>
    <a href="/symbols/transport.html" class="quick-link-btn" title="Transport Symbols"><span>🚗</span> Transport</a>
    <a href="/symbols/office.html" class="quick-link-btn" title="Office Symbols"><span>💼</span> Office</a>
    <a href="/symbols/award.html" class="quick-link-btn" title="Award Symbols"><span>🏆</span> Trophy Medals</a>
    <a href="/symbols/lock.html" class="quick-link-btn" title="Lock & Key Symbols"><span>🔒</span> Lock and Key</a>
    <a href="/symbols/warning.html" class="quick-link-btn" title="Warning Symbols"><span>⚠️</span> Warning</a>
    <a href="/symbols/writing.html" class="quick-link-btn" title="Writing Symbols"><span>✍️</span> Writing</a>
    <a href="/symbols/weapon.html" class="quick-link-btn" title="Weapon Symbols"><span>⚔️</span> Weapon</a>
    <a href="/symbols/roman.html" class="quick-link-btn" title="Roman Numerals"><span>Ⅳ</span> Roman Numerals</a>
    <a href="/symbols/greek.html" class="quick-link-btn" title="Greek Symbols"><span>Ω</span> Greek Alphabet</a>
    <a href="/symbols/emoji-faces.html" class="quick-link-btn" title="Smiley Faces"><span>🥰</span> Smiley Face</a>
    <a href="/symbols/fraction.html" class="quick-link-btn" title="Fraction Symbols"><span>½</span> Fraction</a>
    <a href="/symbols/comparison.html" class="quick-link-btn" title="Comparison Symbols"><span>≥</span> Comparison</a>
    <a href="/symbols/line.html" class="quick-link-btn" title="Line Symbols"><span>│</span> Line</a>
    <a href="/symbols/circle.html" class="quick-link-btn" title="Circle Symbols"><span>○</span> Circle</a>
    <a href="/symbols/triangle.html" class="quick-link-btn" title="Triangle Symbols"><span>▲</span> Triangle</a>
    <a href="/symbols/square.html" class="quick-link-btn" title="Square Symbols"><span>⬛</span> Square</a>
    <a href="/symbols/rectangle.html" class="quick-link-btn" title="Rectangle Symbols"><span>█</span> Rectangle</a>
    <a href="/symbols/corner.html" class="quick-link-btn" title="Corner Symbols"><span>╚</span> Corner</a>
    <a href="/symbols/punctuation.html" class="quick-link-btn" title="Punctuation Marks"><span>!</span> Punctuation</a>
    <a href="/symbols/chinese.html" class="quick-link-btn" title="Chinese Symbols"><span>愛</span> Chinese</a>
    <a href="/symbols/japanese.html" class="quick-link-btn" title="Japanese Symbols"><span>あ</span> Japanese</a>
    <a href="/symbols/korean.html" class="quick-link-btn" title="Korean Symbols"><span>ㅿ</span> Korean</a>
    <a href="/symbols/hand.html" class="quick-link-btn" title="Hand Symbols"><span>✌️</span> Hand</a>
    <a href="/symbols/bubble.html" class="quick-link-btn" title="Bubble Text"><span>ⓐ</span> Bubble Text</a>
    <a href="/symbols/cursive.html" class="quick-link-btn" title="Cursive Font"><span>𝒜</span> Cursive Letter</a>
    <a href="/symbols/upside-down.html" class="quick-link-btn" title="Upside Down Text"><span>ʇ</span> Upside Down</a>
    <a href="/symbols/old-english.html" class="quick-link-btn" title="Old English Font"><span>𝔄</span> Old English</a>
    <a href="/symbols/house.html" class="quick-link-btn" title="House Symbols"><span>🏠</span> House</a>
    <a href="/symbols/crown.html" class="quick-link-btn" title="Crown Symbols"><span>👑</span> Crown</a>
    <a href="/symbols/diamond.html" class="quick-link-btn" title="Diamond Symbols"><span>◆</span> Diamond</a>
    <a href="/symbols/quotation.html" class="quick-link-btn" title="Quotation Symbols"><span>❝</span> Quotation Mark</a>
    <a href="/symbols/crypto.html" class="quick-link-btn" title="Crypto Symbols"><span>₿</span> Cryptocurrency</a>
    <a href="/symbols/loading.html" class="quick-link-btn" title="Loading Symbols"><span>▓</span> Loading</a>
    <a href="/symbols/wave.html" class="quick-link-btn" title="Wave Symbols"><span>〰</span> Wave</a>
    <a href="/symbols/divider.html" class="quick-link-btn" title="Divider Symbols"><span>┊</span> Divider</a>
    <a href="/symbols/border.html" class="quick-link-btn" title="Border Symbols"><span>╔</span> Border</a>
    <a href="/symbols/sparkle.html" class="quick-link-btn" title="Sparkle Symbols"><span>✨</span> Sparkle</a>
    <a href="/symbols/aesthetic.html" class="quick-link-btn" title="Aesthetic Symbols"><span>✧</span> Aesthetic</a>
    <a href="/symbols/dot.html" class="quick-link-btn" title="Dot Symbols"><span>•</span> Dot</a>
    <a href="/symbols/german.html" class="quick-link-btn" title="German Symbols"><span>ß</span> German</a>
  </div>`;

const files = fs.readdirSync(symbolsDir).filter(f => f.endsWith('.html'));

let updatedCount = 0;

files.forEach(file => {
    const filePath = path.join(symbolsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Remove any existing category grids / quick links grids to avoid duplicates
    // We match the "CATEGORY NAVIGATION" comment or "Browse More Symbols" section and the following grid.
    content = content.replace(/<!-- CATEGORY NAVIGATION -->\s*/g, '');
    content = content.replace(/<div class="section-title">Browse More Symbols\s*<span class="line"><\/span><\/div>\s*<div class="quick-links-grid">[\s\S]*?<\/div>\s*/gi, '');

    // 2. Inject the new grid right before the <div class="content-article">
    if (content.includes('<div class="content-article">')) {
        content = content.replace(
            /(<\/div>\s*)(<div class="content-article">)/, 
            '$1' + gridHtml + '\n$2'
        );
    } else {
        // Fallback: insert right before </main>
        content = content.replace('</main>', gridHtml + '\n</main>');
    }

    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
});

console.log(`Successfully injected category grid into ${updatedCount} symbol pages.`);
