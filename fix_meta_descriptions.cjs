const fs = require('fs');
const path = require('path');

const skip = new Set(['.git', 'node_modules', 'dist', 'images', '.vscode', 'es', 'fr']);

// Unique, SEO-optimized meta descriptions under 155 chars
// Format: action-oriented, includes primary keyword, unique per page
const symbolDescriptions = {
  'heart': 'Copy and paste heart symbols ❤ ♡ 💕 for Instagram bios, Discord, and social media. 60+ free heart text symbols with one-click copy.',
  'star': 'Copy and paste star symbols ★ ✦ ⋆ for bios, ratings, and decorations. 40+ free star text symbols with instant one-click copy.',
  'arrow': 'Copy and paste arrow symbols → ⇨ ➤ for lists, directions, and navigation. 80+ free arrow text symbols with one-click copy.',
  'flower': 'Copy and paste flower symbols ✿ ❀ 🌸 for aesthetic bios and posts. 35+ free floral text symbols with instant one-click copy.',
  'checkmark': 'Copy and paste check mark symbols ✔ ✓ ☑ ✅ for to-do lists and confirmations. 20+ free tick symbols with one-click copy.',
  'music': 'Copy and paste music symbols ♪ ♫ 🎵 for song lyrics and social media. 25+ free musical note symbols with one-click copy.',
  'zodiac': 'Copy and paste zodiac symbols ♈ ♉ ♊ for horoscope content and bios. All 12 astrological sign symbols with one-click copy.',
  'currency': 'Copy and paste currency symbols $ € £ ¥ ₿ for finance and business. 30+ free money symbols with instant one-click copy.',
  'math': 'Copy and paste math symbols ∑ ∞ π ± for academic and technical writing. 50+ free mathematical operators with one-click copy.',
  'weather': 'Copy and paste weather symbols ☀ ☁ ☂ ⚡ for forecasts and social media. 25+ free weather text symbols with one-click copy.',
  'hand': 'Copy and paste hand symbols ✌ 👋 🤞 for messages and social media. 30+ free hand gesture symbols with instant one-click copy.',
  'aesthetic': 'Copy and paste aesthetic symbols ✧ ⋆ ༄ for Instagram bios and Tumblr. 50+ free aesthetic text symbols with one-click copy.',
  'crown': 'Copy and paste crown symbols 👑 ♔ ♕ and diamond symbols for royal-themed bios. Free premium symbols with one-click copy.',
  'square': 'Copy and paste square symbols ■ □ ⬛ ▪ for designs and text art. 40+ free square block symbols with instant one-click copy.',
  'dot': 'Copy and paste dot symbols • ● ◉ ⦿ for bullet points and decorations. 50+ free dot and bullet text symbols with one-click copy.',
  'crypto': 'Copy and paste cryptocurrency symbols ₿ Ξ ₮ for crypto content and trading. 30+ free digital currency symbols with one-click copy.',
  'quotation': 'Copy and paste quotation marks « » „ " and punctuation symbols. 60+ free quote text symbols with instant one-click copy.',
  'diamond': 'Copy and paste diamond symbols ◆ ◇ 💎 for luxury-themed bios and designs. 30+ free diamond text symbols with one-click copy.',
  'house': 'Copy and paste house symbols 🏠 🏡 ⌂ for real estate and location posts. 20+ free building text symbols with one-click copy.',
  'old-english': 'Copy and paste Old English symbols 𝔄 𝔅 𝔇 for gothic-style text and bios. 50+ free medieval font symbols with one-click copy.',
  'upside-down': 'Copy and paste upside down text symbols ʇxǝʇ for fun messages and bios. 50+ free inverted letter symbols with one-click copy.',
  'moon': 'Copy and paste moon symbols ☾ 🌙 🌕 for night-themed bios and aesthetics. 20+ free lunar text symbols with one-click copy.',
  'sun': 'Copy and paste sun symbols ☀ ☼ 🌞 for summer and nature-themed posts. 20+ free solar text symbols with instant one-click copy.',
  'greek': 'Copy and paste Greek alphabet symbols Ω α β Σ for math and academic use. 48+ free Greek letter symbols with one-click copy.',
  'japanese': 'Copy and paste Japanese symbols あ カ 漢 for kawaii bios and Asian text. 80+ free hiragana and katakana symbols with one-click copy.',
  'korean': 'Copy and paste Korean symbols 한 글 for K-pop bios and Hangul text. 40+ free Korean character symbols with one-click copy.',
  'chinese': 'Copy and paste Chinese symbols 中 龍 福 for Asian-themed bios and posts. 50+ free Chinese character symbols with one-click copy.',
  'triangle': 'Copy and paste triangle symbols ▲ △ ▼ for designs and text art. 30+ free geometric triangle symbols with instant one-click copy.',
  'cross': 'Copy and paste cross symbols ✝ ☦ ✟ for religious content and bios. 20+ free cross and crucifix text symbols with one-click copy.',
  'numbers': 'Copy and paste number symbols ① ② ③ for lists and ordered content. 50+ free circled and styled number symbols with one-click copy.',
  'uparrow': 'Copy and paste up arrow symbols ↑ ⇧ ▲ for directions and navigation. 25+ free upward arrow text symbols with one-click copy.',
  'downarrow': 'Copy and paste down arrow symbols ↓ ⇩ ▼ for scroll cues and lists. 25+ free downward arrow text symbols with one-click copy.',
  'gender': 'Copy and paste gender symbols ♂ ♀ ⚥ for profiles and inclusive content. 15+ free gender identity text symbols with one-click copy.',
  'infinity': 'Copy and paste infinity symbols ∞ ♾ for love, math, and forever-themed bios. 10+ free infinity text symbols with one-click copy.',
  'medical': 'Copy and paste medical symbols ⚕ ☤ 🏥 for healthcare content and bios. 15+ free medical and health text symbols with one-click copy.',
  'chess': 'Copy and paste chess symbols ♚ ♛ ♜ ♞ for game content and strategy posts. 12+ free chess piece text symbols with one-click copy.',
  'religion': 'Copy and paste religion symbols ✝ ☪ ✡ ☯ for spiritual content and bios. 20+ free religious text symbols with instant one-click copy.',
  'copyright': 'Copy and paste copyright © trademark ™ and registered ® symbols. 15+ free legal text symbols for business with one-click copy.',
  'unit': 'Copy and paste unit symbols ℃ ℉ ㎏ for scientific and measurement text. 20+ free unit text symbols with instant one-click copy.',
  'card': 'Copy and paste card symbols ♠ ♥ ♦ ♣ for poker and card game content. 15+ free playing card text symbols with one-click copy.',
  'dice': 'Copy and paste dice symbols ⚀ ⚁ ⚂ 🎲 for gaming and tabletop content. 10+ free dice text symbols with instant one-click copy.',
  'transport': 'Copy and paste transport symbols 🚗 ✈ 🚂 for travel content and bios. 25+ free vehicle and travel text symbols with one-click copy.',
  'office': 'Copy and paste office symbols 💼 📎 📁 for business and work content. 20+ free office and workplace text symbols with one-click copy.',
  'award': 'Copy and paste award symbols 🏆 🥇 🎖 for achievement and contest posts. Free medal and trophy text symbols with one-click copy.',
  'lock': 'Copy and paste lock symbols 🔒 🔓 🔑 for security-themed content and bios. Free lock and key text symbols with instant one-click copy.',
  'warning': 'Copy and paste warning symbols ⚠ ⛔ ☠ for alerts and caution messages. 15+ free warning text symbols with instant one-click copy.',
  'writing': 'Copy and paste writing symbols ✍ ✎ ✏ for creative and literary content. 15+ free pen and writing text symbols with one-click copy.',
  'weapon': 'Copy and paste weapon symbols ⚔ 🗡 🏹 for gaming bios and fantasy content. 15+ free sword and weapon text symbols with one-click copy.',
  'roman': 'Copy and paste Roman numeral symbols Ⅰ Ⅱ Ⅲ Ⅳ for classic numbering. 20+ free Roman numeral text symbols with one-click copy.',
  'fraction': 'Copy and paste fraction symbols ½ ⅓ ¼ ⅛ for math and recipe content. 15+ free fraction text symbols with instant one-click copy.',
  'comparison': 'Copy and paste comparison symbols ≥ ≤ ≠ ≈ for math and data analysis. 20+ free comparison operator symbols with one-click copy.',
  'line': 'Copy and paste line symbols │ ─ ┃ for borders and text art designs. 30+ free line drawing text symbols with instant one-click copy.',
  'rectangle': 'Copy and paste rectangle symbols █ ▌ ▐ for text art and block designs. 20+ free rectangle block symbols with one-click copy.',
  'corner': 'Copy and paste corner symbols ╚ ╗ ╔ ╝ for box drawing and text art. 25+ free corner bracket text symbols with one-click copy.',
  'punctuation': 'Copy and paste punctuation symbols ¿ ¡ § ¶ for typography and writing. 30+ free punctuation mark symbols with one-click copy.',
  'bubble': 'Copy and paste bubble text symbols ⓐ ⓑ ⓒ for unique bios and usernames. 50+ free circled letter text symbols with one-click copy.',
  'cursive': 'Copy and paste cursive symbols 𝒜 𝒞 𝒟 for elegant bios and handwriting style. 50+ free script text symbols with one-click copy.',
  'german': 'Copy and paste German symbols ß Ä Ö Ü for umlauts and German text. 15+ free German alphabet text symbols with one-click copy.',
  'circle': 'Copy and paste circle symbols ○ ● ◉ ⊙ for designs and bullet points. 40+ free circular text symbols with instant one-click copy.',
  'emoji-faces': 'Copy and paste smiley face emoji symbols 😀 🥰 😎 for messages and posts. 60+ free emoticon text symbols with one-click copy.',
  'sparkle': 'Copy and paste sparkle symbols ✨ ✦ ❇ for glitter effects and aesthetic bios. 30+ free sparkle text symbols with one-click copy.',
  'wave': 'Copy and paste wave symbols 〰 ≋ ∿ for water themes and decorative text. 25+ free wave text symbols with instant one-click copy.',
  'divider': 'Copy and paste divider symbols ┊ ─ ═ for text separators and formatting. 30+ free divider text symbols with instant one-click copy.',
  'border': 'Copy and paste border symbols ╔ ═ ║ for box drawing and text frames. 40+ free border text symbols with instant one-click copy.',
  'loading': 'Copy and paste loading symbols ▓ ░ ▒ for progress bars and text art. 25+ free loading bar text symbols with one-click copy.',
  'bracket': 'Copy and paste bracket symbols 【 】 「」 for stylish text and formatting. 30+ free bracket text symbols with instant one-click copy.',
  'animal': 'Copy and paste animal symbols 🐱 🐶 🦊 for pet lovers and nature bios. 40+ free animal text symbols with instant one-click copy.',
};

// Special page descriptions
const specialDescriptions = {
  'index': 'Copy and paste 1000+ text symbols for Instagram, Discord, TikTok, and gaming. Hearts ❤, stars ★, arrows →, and more. Free one-click copy!',
  'font-generator': 'Free fancy text generator — convert plain text into 20+ stylish Unicode fonts. Bold, italic, cursive, and gothic styles. One-click copy!',
  'preppy-fonts': 'Free preppy font generator — create trendy, collegiate-style text for Instagram and TikTok bios. One-click copy and paste!',
  'cute-fonts': 'Free cute font generator — create kawaii and adorable text styles for bios and messages. One-click copy and paste cute fonts!',
  'aesthetic-fonts': 'Free aesthetic font generator — convert text into 20+ vaporwave and artistic Unicode styles for bios. One-click copy and paste!',
  'lenny-face': 'Copy and paste 500+ Lenny faces and kaomoji ( ͡° ͜ʖ ͡°) for messaging, Discord, and social media. Free one-click copy!',
  'all-symbols': 'Browse 1000+ Unicode text symbols organized in 60+ categories. Hearts, stars, arrows, math, and more. Free one-click copy and paste!',
  'emoticons': 'Copy and paste 300+ text emoticons and kaomoji for chat, Discord, and social media. Free one-click copy emoticon faces!',
  'invisible-character': 'Copy invisible characters and blank text for usernames, bios, and spacing tricks. Zero-width and empty character with one-click copy!',
  'strikethrough-text': 'Free strikethrough text generator — create s̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶ text for social media and messaging. One-click copy and paste!',
  'bold-text': 'Free bold text generator — convert plain text into 𝗯𝗼𝗹𝗱 Unicode styles for bios and posts. One-click copy and paste!',
  'bubble-text': 'Free bubble text generator — convert text into ⓑⓤⓑⓑⓛⓔ circled letters for bios and usernames. One-click copy and paste!',
  'morse-code': 'Free Morse code translator — convert text to dots and dashes ·· −· instantly. One-click copy and paste Morse code!',
  'small-text': 'Free small text generator — create ˢᵐᵃˡˡ superscript and tiny text for bios and comments. One-click copy and paste!',
  'cursive-text': 'Free cursive text generator — convert text into 𝒸𝓊𝓇𝓈𝒾𝓋𝑒 elegant script for bios and posts. One-click copy and paste!',
  'gothic-text': 'Free gothic text generator — convert text into 𝔤𝔬𝔱𝔥𝔦𝔠 old English blackletter font. One-click copy and paste!',
  'vaporwave-text': 'Free vaporwave text generator — convert text into ｗｉｄｅ ｔｅｘｔ full-width aesthetic style. One-click copy and paste!',
  'zalgo-text': 'Free Zalgo text generator — create ẑ̴̡a̵̗l̵̰g̶̣o̴̺ glitchy cursed text for creepy effects. One-click copy and paste!',
  'text-repeater': 'Free text repeater tool — repeat any text or emoji multiple times instantly. Customizable count with one-click copy!',
  'username-generator': 'Free username generator — create unique stylish usernames with symbols for gaming and social media. One-click copy!',
  'free-fire-name': 'Free Fire name generator — create stylish gaming names with cool symbols ꧁⚔꧂ for Free Fire. One-click copy!',
  'bio-generator': 'Free bio generator — create aesthetic Instagram, TikTok, and social media bios with symbols. One-click copy and paste!',
  'bullet-point': 'Copy and paste bullet point symbols • ◦ ▸ ‣ for formatted lists and documents. Free bullet text symbols with one-click copy!',
  'blank-space': 'Copy blank space characters and invisible text for usernames, formatting, and spacing. Free empty characters with one-click copy!',
  'character-counter': 'Free character counter tool — count characters, words, and sentences in your text. Real-time counting for social media bios!',
};

let updatedCount = 0;
let errors = [];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const basename = path.basename(filePath, '.html');
  const dirName = path.dirname(filePath);
  
  // Determine the correct description
  let newDesc = null;
  
  if (dirName.endsWith('symbols')) {
    newDesc = symbolDescriptions[basename];
  } else {
    newDesc = specialDescriptions[basename];
  }
  
  if (!newDesc) return;
  
  // Validate length
  if (newDesc.length > 155) {
    errors.push(`${filePath}: Description too long (${newDesc.length} chars): ${newDesc}`);
    return;
  }
  
  // Replace existing meta description
  const metaRegex = /<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/i;
  
  if (metaRegex.test(content)) {
    content = content.replace(metaRegex, `<meta name="description" content="${newDesc}">`);
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
    console.log(`✅ ${filePath} (${newDesc.length} chars)`);
  } else {
    console.log(`⚠️  No meta description found: ${filePath}`);
  }
}

function walk(dir) {
  fs.readdirSync(dir).forEach(entry => {
    const filePath = path.join(dir, entry);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory() && !skip.has(entry)) {
      walk(filePath);
    } else if (entry.endsWith('.html') && !entry.startsWith('old_')) {
      processFile(filePath);
    }
  });
}

walk('.');

console.log(`\n📊 Total files updated: ${updatedCount}`);

if (errors.length > 0) {
  console.log('\n❌ ERRORS (descriptions over 155 chars):');
  errors.forEach(e => console.log(e));
}
