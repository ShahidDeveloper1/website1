const fs = require('fs');
const path = require('path');

function titleCase(s) {
  return s.split(/[-_]/).map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
}

// Extract display name from H1 tag
function extractName(html) {
  const m = html.match(/<h1>([^<]+)<\/h1>/);
  if (m) return m[1].replace(/ Copy and Paste/i, '').replace(/ Symbols?/i, '').trim();
  return null;
}

// Unique "about" blurbs per category
const ABOUTS = {
  zodiac: 'Zodiac symbols represent the twelve astrological signs that have guided human culture for thousands of years. From Aries ♈ to Pisces ♓, each sign carries deep meaning in astrology, personality analysis, and horoscope readings. These celestial characters also include planetary glyphs for Mercury ☿, Venus ♀, Mars ♂, Jupiter ♃, Saturn ♄, and beyond.',
  currency: 'Currency symbols are essential characters used in financial communication worldwide. From the widely recognized dollar sign $ and euro € to the British pound £, Japanese yen ¥, and modern cryptocurrency symbols like Bitcoin ₿, these characters convey monetary values clearly across languages and borders.',
  math: 'Mathematical symbols form the universal language of science and computation. This collection includes operators like plus +, minus −, and multiplication ×, along with advanced notation such as integrals ∫, summation Σ, square roots √, and set theory symbols. These characters are indispensable for students, educators, and researchers.',
  weather: 'Weather symbols help communicate atmospheric conditions at a glance. This collection features sunshine ☀, clouds ☁, rain 🌧, snow ❄, thunderstorms ⛈, and temperature indicators. Meteorologists, content creators, and everyday users rely on these characters to share forecasts and describe conditions.',
  hand: 'Hand symbols and gesture emoji are among the most expressive characters in Unicode. From the classic peace sign ✌ and thumbs up 👍 to waving hands 👋, pointing fingers 👉, and the popular rock-on sign 🤘, these characters add personality and emotion to any digital conversation.',
  star: 'Star symbols are among the most popular decorative characters used online. Ranging from classic five-pointed stars ★ and outlined variants ☆ to elaborate sparkle marks ✦ ✧ and emoji stars ⭐ 🌟, these versatile characters add brilliance and visual appeal to any text.',
  flower: 'Flower symbols bring natural beauty to digital communication. This collection includes classic floral characters like ✿ ❀ ❁ alongside modern emoji blooms such as 🌸 🌹 🌻 🌺. These botanical characters are perfect for creating aesthetic bios, romantic messages, and nature-themed content.',
  checkmark: 'Check mark symbols serve as universal indicators of completion, approval, and verification. From simple ticks ✓ and bold checks ✔ to boxed variants ☑ and colorful emoji ✅, these characters are essential for to-do lists, status updates, and confirmation messages across platforms.',
  music: 'Music symbols capture the essence of sound in text form. This collection features notes ♪ ♫ ♬, the treble clef 𝄞, and various musical emoji 🎵 🎶 🎼. Musicians, DJs, playlist curators, and music lovers use these characters to express their passion for melody and rhythm.',
  crown: 'Crown and royal symbols represent power, achievement, and elegance. From the classic crown emoji 👑 to chess king ♔ and queen ♕ pieces, these regal characters are widely used in gaming usernames, social media bios, and anywhere you want to project authority and style.',
  house: 'House symbols represent home, shelter, and domestic life. This collection includes the classic house emoji 🏠, garden home 🏡, office buildings 🏢, and the traditional text house character ⌂. These symbols are useful for real estate content, location markers, and creative text designs.',
  bracket: 'Bracket symbols are decorative and functional text characters used for formatting, emphasis, and aesthetic design. From standard parentheses and square brackets to ornamental Asian brackets 【】「」and mathematical grouping symbols, these characters help organize and beautify text.',
  'emoji-faces': 'Smiley face emoji are the most widely used emotional expressions in digital communication. From happy grins 😀 and loving faces 🥰 to thoughtful looks 🤔 and cool shades 😎, these characters instantly convey tone, mood, and personality in messages and social media posts.',
  moon: 'Moon symbols capture the mystical beauty of Earth\'s celestial companion. This collection features crescent moons ☾ ☽, lunar phase emoji from new moon 🌑 through full moon 🌕, and decorative moon faces 🌛 🌜. These characters are favorites for aesthetic bios and nighttime-themed content.',
  sun: 'Sun symbols radiate warmth and energy in text form. From the classic sun sign ☀ and heraldic sun ☼ to emoji variants like 🌞 and decorative sunbursts ✺, these bright characters are perfect for weather updates, summer-themed posts, and adding a cheerful glow to any message.',
  greek: 'Greek alphabet symbols have shaped mathematics, science, and philosophy for millennia. From Alpha Α to Omega Ω, these letters appear in equations, fraternity names, scientific notation, and decorative text. This complete set includes both uppercase and lowercase Greek characters.',
  japanese: 'Japanese text symbols span three writing systems: Hiragana あ, Katakana カ, and Kanji 漢. These characters represent one of the world\'s most beautiful written traditions and are popular for aesthetic bios, cultural appreciation, and decorative text across social media platforms.',
  korean: 'Korean Hangul symbols represent one of the most scientifically designed writing systems in the world. Created in the 15th century by King Sejong, these characters combine consonants and vowels in elegant syllable blocks that are both functional and visually appealing for decorative text.',
  chinese: 'Chinese character symbols carry centuries of cultural meaning and artistic beauty. Popular characters like 愛 (love), 龍 (dragon), 福 (fortune), and 力 (strength) are widely used in tattoo designs, decorative art, social media bios, and cultural expressions around the world.',
  triangle: 'Triangle symbols are versatile geometric characters used in mathematics, design, and creative text art. From simple outlines △ and solid fills ▲ to directional pointers ▶ ◀ and specialized variants, these shapes serve both functional and decorative purposes in digital communication.',
  cross: 'Cross symbols hold deep religious and cultural significance across many traditions. This collection includes the Latin cross ✝, Orthodox cross ☦, Celtic cross, and decorative dagger symbols ✞ ♱. These characters are used in religious content, memorial tributes, and symbolic expressions.',
  uparrow: 'Up arrow symbols indicate upward direction, growth, and progress. From simple arrows ↑ and bold variants ⬆ to decorative styles ⇧ ⇑, these directional characters are commonly used in navigation, data visualization, instructions, and expressive social media content.',
  downarrow: 'Down arrow symbols represent downward direction, downloading, and scrolling. This collection features simple arrows ↓, bold variants ⬇, double arrows ⇓, and stylized designs. These characters are essential for navigation, document formatting, and visual communication.',
  gender: 'Gender symbols represent biological sex and gender identity through universally recognized signs. The male ♂, female ♀, and transgender ⚧ symbols originated from astronomical and alchemical notation. Today they serve important roles in scientific writing, social advocacy, and inclusive communication.',
  infinity: 'The infinity symbol ∞ represents endlessness, eternity, and limitless possibilities. Originally a mathematical concept introduced by John Wallis in 1655, this elegant character has become a popular motif in jewelry, tattoos, love messages, and philosophical expressions across cultures.',
  medical: 'Medical symbols represent healthcare, healing, and the life sciences. The Rod of Asclepius ⚕, caduceus ☤, red cross ✚, and hospital emoji 🏥 are recognized worldwide. These characters appear in health-related content, medical documents, and pharmaceutical communications.',
  chess: 'Chess piece symbols represent the classic strategy game that has captivated minds for over 1,500 years. From the king ♚ and queen ♛ to rooks ♜, bishops ♝, knights ♞, and pawns ♟, these Unicode characters let you diagram positions and discuss games in plain text.',
  religion: 'Religious symbols represent the diverse spiritual traditions practiced around the world. This collection includes the Christian cross ✝, Islamic crescent ☪, Star of David ✡, Buddhist wheel ☸, Hindu Om, and many other sacred characters used in worship and cultural expression.',
  copyright: 'Copyright and legal symbols protect intellectual property and communicate legal status. The copyright sign ©, registered trademark ®, trademark ™, and sound recording ℗ symbols are essential in publishing, branding, and legal documentation across all industries.',
  unit: 'Unit symbols represent standardized measurements used in science, engineering, and daily life. From temperature markers ℃ ℉ to degree signs ° and specialized notation, these characters ensure precise communication of quantities, dimensions, and scientific values.',
  card: 'Playing card suit symbols represent the four classic suits found in standard card decks worldwide. The spade ♠, heart ♥, diamond ♦, and club ♣ characters appear in gaming content, probability discussions, poker strategies, and decorative designs.',
  dice: 'Dice symbols display the six faces of a standard die as Unicode characters ⚀ ⚁ ⚂ ⚃ ⚄ ⚅. These characters are perfect for tabletop gaming discussions, probability content, random selection tools, and adding playful elements to messages and social media posts.',
  transport: 'Transport symbols represent vehicles and modes of travel from around the world. Cars 🚗, airplanes ✈, rockets 🚀, trains 🚂, and ships 🚢 are just a few of the characters available for travel content, navigation guides, and transportation-themed communications.',
  office: 'Office symbols represent the tools and objects found in modern workplaces. Briefcases 💼, charts 📊, folders 📁, printers 🖨, and clipboards 📋 help communicate business topics, project management updates, and professional content in a visually engaging way.',
  award: 'Award and medal symbols celebrate achievement, competition, and excellence. Trophies 🏆, gold medals 🥇, ribbons 🎖, and star badges 🏅 are popular in gaming profiles, competition announcements, leaderboards, and motivational content across social platforms.',
  lock: 'Lock and key symbols represent security, privacy, and access control. From locked padlocks 🔒 and unlocked variants 🔓 to ornate keys 🗝 and combination locks 🔐, these characters appear in cybersecurity content, privacy notices, and digital safety communications.',
  warning: 'Warning symbols alert viewers to danger, caution, and important notices. The universal warning sign ⚠, radiation symbol ☢, biohazard ☣, and prohibition sign ⛔ are critical characters used in safety documentation, hazard communication, and attention-grabbing social media posts.',
  writing: 'Writing symbols represent the tools of literacy and creative expression. Pens ✏, pencils 🖊, notebooks 📝, and the writing hand ✍ emoji celebrate the written word. These characters are popular among authors, students, journalists, and anyone passionate about putting thoughts on paper.',
  weapon: 'Weapon symbols represent arms and combat tools depicted as Unicode characters and emoji. Crossed swords ⚔, daggers 🗡, bows 🏹, and shields 🛡 are widely used in gaming communities, fantasy roleplay, historical discussions, and creative storytelling.',
  roman: 'Roman numeral symbols display the ancient numbering system used by the Roman Empire. Characters from Ⅰ through Ⅻ and beyond represent values that remain widely used today in clock faces, book chapters, film sequels, formal outlines, and architectural inscriptions.',
  fraction: 'Fraction symbols display common numerical fractions as single Unicode characters. Values like ½, ⅓, ¼, ⅛, and ⅔ are essential for recipes, measurements, mathematical notation, and technical documents where precise fractional representation improves readability.',
  comparison: 'Comparison symbols express mathematical relationships between values. Greater than >, less than <, not equal ≠, approximately equal ≈, and greater-or-equal ≥ operators are fundamental in equations, programming, data analysis, and academic writing.',
  line: 'Line symbols create visual separators, borders, and structural elements in plain text. Vertical bars │, horizontal rules ─, thick lines ┃, and double lines ═ are building blocks for ASCII art, text-based tables, terminal interfaces, and decorative text formatting.',
  rectangle: 'Rectangle and block symbols form solid geometric shapes in text. Full blocks █, half blocks ▄ ▀, and shade characters ░ ▒ ▓ are fundamental building blocks for ASCII art, progress bars, text-based graphics, and creative visual designs in plain text environments.',
  corner: 'Corner symbols are box-drawing characters that create frame edges and structural corners in text layouts. Characters like ╔ ╗ ╚ ╝ and their single-line variants ┌ ┐ └ ┘ are essential for building text borders, tables, and decorative frames in documents.',
  punctuation: 'Punctuation symbols go far beyond the standard period and comma. This collection includes inverted marks ¡ ¿ used in Spanish, the interrobang ‽, middle dots ·, and specialized typographic marks that add precision and flair to written communication across languages.',
  bubble: 'Bubble text symbols display letters inside circles, creating a distinctive rounded appearance. Characters like ⓐ ⓑ ⓒ through ⓩ transform ordinary text into eye-catching bubble letters perfect for usernames, bios, and creative text decorations on social media.',
  cursive: 'Cursive letter symbols reproduce elegant handwriting styles using Unicode mathematical characters. Script letters like 𝒜 𝒷 𝒸 provide a flowing, calligraphic appearance without requiring special fonts, making them ideal for aesthetic bios, invitations, and stylish text.',
  german: 'German text symbols include the unique characters of the German alphabet: umlauts Ä Ö Ü and the Eszett ß. These diacritical marks are essential for correct German spelling, and this page also includes German-style quotation marks „ " and the section sign §.',
  aesthetic: 'Aesthetic symbols are decorative Unicode characters chosen for their visual beauty and artistic appeal. Ornamental brackets ꧁꧂, celestial markers ༺༻, sparkle dots ✧, and elegant flourishes transform plain text into visually stunning compositions for social media profiles.',
  animal: 'Animal symbols and emoji bring the natural world into digital conversations. From paw prints 🐾 and butterflies 🦋 to cats 🐱, dogs 🐶, and exotic wildlife, these characters express love for animals, decorate bios, and add playful energy to messages.',
  arrow: 'Arrow symbols point the way in digital communication. This comprehensive collection covers every direction and style — from simple arrows → ← ↑ ↓ to double arrows ⇒, curved arrows ↩, and decorative pointers ➤ ➜ used in documents, presentations, and creative formatting.',
  border: 'Border symbols create decorative frames and enclosures using Unicode box-drawing characters. Double-line borders ╔═╗, single-line frames ┌─┐, and mixed styles let you build custom text borders for social media bios, code formatting, and artistic text layouts.',
  circle: 'Circle symbols encompass a wide range of round shapes in Unicode. From empty circles ○ and filled dots ● to bullseyes ◎, circled numbers ①②③, and ring shapes ◯, these geometric characters serve both decorative and functional roles in text communication.',
  crypto: 'Cryptocurrency symbols represent the digital currencies reshaping global finance. Bitcoin ₿, Ethereum Ξ, Litecoin Ł, and other token symbols are increasingly used in financial discussions, trading platforms, portfolio tracking, and digital economy communications.',
  diamond: 'Diamond symbols sparkle with geometric elegance in text form. From solid diamonds ◆ and outlines ◇ to the gem emoji 💎 and playing card diamond ♦, these characters add a touch of luxury and brilliance to usernames, bios, and decorative text.',
  divider: 'Divider symbols create elegant visual separations between sections of text. Vertical dots ┊, horizontal lines ═, ornamental breaks ─, and decorative bars ║ help organize content in social media bios, forum posts, and document formatting with style.',
  dot: 'Dot symbols range from tiny bullet points • to large filled circles ● and decorative middle dots ·. These versatile characters serve as list markers, text separators, decorative elements, and design components in bios, documents, and creative text layouts.',
  loading: 'Loading bar symbols let you create visual progress indicators using plain text characters. Shade blocks ░ ▒ ▓ and full blocks █ combine to form progress bars, status indicators, and creative text art that simulates loading animations and data visualization.',
  numbers: 'Number symbols extend far beyond standard digits. This collection includes circled numbers ①②③, subscript and superscript digits, Roman numerals Ⅰ Ⅱ Ⅲ, and specialized mathematical number forms that enhance documents, lists, and creative text formatting.',
  'old-english': 'Old English letter symbols reproduce the medieval blackletter typeface using Unicode mathematical Fraktur characters. Letters like 𝔄 𝔅 ℭ 𝔇 evoke Gothic manuscripts, medieval documents, and vintage aesthetics that remain popular in gaming tags, band names, and artistic text.',
  quotation: 'Quotation symbols go beyond standard quote marks to include decorative and international variants. Ornamental quotes ❝ ❞, guillemets « », single quotes ‹ ›, and Asian quotation marks 「」provide elegant alternatives for citations, emphasis, and multilingual text.',
  sparkle: 'Sparkle symbols add glitter and shimmer to digital text. Classic sparkles ✨, four-pointed stars ✦, diamond sparkles ❖, and decorative dots ⁺ ˚ create a magical atmosphere in social media bios, usernames, and aesthetic text compositions.',
  square: 'Square symbols provide solid geometric shapes for text formatting and design. From filled squares ⬛ ■ and outlined variants ◻ □ to small squares ▪ ▫ and button shapes, these characters are building blocks for text art, bullet points, and visual layouts.',
  'upside-down': 'Upside-down text symbols flip standard Latin letters to create reversed and inverted words. Characters like ʇxǝʇ uʍop ǝpᴉsdn turn your messages literally on their head, making them perfect for jokes, creative bios, pranks, and attention-grabbing social media posts.',
  wave: 'Wave symbols create flowing, undulating patterns in text. From the wavy dash 〰 and tilde ~ to mathematical wave functions ∿ and triple waves ≋, these characters evoke ocean waves, sound waves, and decorative flowing lines for creative text formatting.',
};

function buildArticle(slug, name) {
  const lname = name.toLowerCase();
  const about = ABOUTS[slug] || `${name} symbols are a popular collection of Unicode characters that add visual interest and meaning to digital text. These special characters have been part of the Unicode standard for years and are widely supported across all modern devices, operating systems, and applications.`;

  let html = `<div class="content-article">
    <h2>About ${name} Text Symbols</h2>
    <p>${about}</p>
    <p>On Fancy Text, we provide a carefully curated collection of ${lname} text symbols that you can copy and paste anywhere. These Unicode characters are part of the universal text standard, which means they work on every device and platform without installing any fonts or apps. Whether you are on an iPhone, Android, Windows PC, or Mac, these ${lname} text symbols will display correctly every time.</p>

    <h2>How to Copy and Paste ${name} Symbols</h2>
    <p>Using ${lname} text symbols from Fancy Text is simple and fast. Browse through the collection above and click or tap on any symbol you want to use. The character is instantly copied to your clipboard. Then open the app or website where you want to use it — Instagram, TikTok, Twitter, Discord, WhatsApp, Facebook, or any text field — and paste it with Ctrl+V on desktop or long-press and paste on mobile devices.</p>
    <p>You can combine multiple symbols to create unique designs. Try mixing ${lname} characters with other text symbols from our <a href="/all-symbols">complete symbols collection</a> to build eye-catching bios, usernames, and messages that stand out from the crowd.</p>

    <h2>Where to Use ${name} Symbols</h2>
    <ul>
      <li>Instagram bios, captions, and story text</li>
      <li>TikTok usernames and video descriptions</li>
      <li>Twitter/X posts and display names</li>
      <li>Discord server names, roles, and status messages</li>
      <li>Gaming profiles, clan tags, and in-game chat</li>
      <li>WhatsApp, Telegram, and iMessage conversations</li>
      <li>Email signatures, documents, and presentations</li>
    </ul>

    <h2>Frequently Asked Questions</h2>
    <div class="faq-item">
      <div class="faq-q">How do I copy ${lname} symbols on mobile?</div>
      <div class="faq-a">Simply tap any ${lname} symbol on this page and it is automatically copied to your clipboard. Then open any app and long-press in the text field to paste. This works on both iPhone and Android devices without any additional apps.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Do ${lname} text symbols work on all platforms?</div>
      <div class="faq-a">Yes. All ${lname} symbols on Fancy Text are standard Unicode characters supported by every major platform including Instagram, TikTok, Twitter, Facebook, Discord, WhatsApp, and all modern web browsers and operating systems.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Can I use these ${lname} symbols in my Instagram bio?</div>
      <div class="faq-a">Absolutely. These ${lname} text symbols are perfect for Instagram bios. Copy any symbol from this page, open Instagram, edit your profile, and paste the symbol directly into your bio to add a creative, eye-catching touch.</div>
    </div>

    <p>Explore our full library of <a href="/all-symbols">text symbols</a>, <a href="/font-generator">fancy text generators</a>, and <a href="/aesthetic-fonts">aesthetic font tools</a> to take your online presence to the next level. Every symbol on Fancy Text is free to use with no sign-up required.</p>
  </div>`;
  return html;
}

function processFile(filepath) {
  const slug = path.basename(filepath, '.html');
  let content = fs.readFileSync(filepath, 'utf8');

  // Extract name from H1
  const h1Match = content.match(/<h1>([^<]+)<\/h1>/);
  if (!h1Match) return false;
  let name = h1Match[1].replace(/\s*Copy and Paste\s*/i, '').replace(/\s*Symbols?\s*$/i, '').trim();
  if (!name) name = titleCase(slug);

  // Build new article
  const newArticle = buildArticle(slug, name);

  // Replace old content-article (handle multi-line)
  const articleStart = content.indexOf('<div class="content-article">');
  if (articleStart !== -1) {
    // Find matching closing div
    let depth = 0, i = articleStart;
    for (; i < content.length; i++) {
      if (content.substring(i, i+4) === '<div') depth++;
      if (content.substring(i, i+6) === '</div>') {
        depth--;
        if (depth === 0) { i += 6; break; }
      }
    }
    content = content.substring(0, articleStart) + newArticle + content.substring(i);
  } else {
    // Insert before </main>
    content = content.replace(/<\/main>/, newArticle + '\n</main>');
  }

  // Update title
  const newTitle = `${name} Symbols Copy and Paste | Fancy Text`;
  content = content.replace(/<title>[^<]*<\/title>/, `<title>${newTitle}</title>`);

  fs.writeFileSync(filepath, content, 'utf8');

  // Count words
  const textOnly = newArticle.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return textOnly.split(' ').length;
}

// ── Run ──
console.log('🚀 SEO Content Engine — Adding 300+ word articles to all symbol pages\n');

const symbolsDir = path.join(__dirname, 'symbols');
const files = fs.readdirSync(symbolsDir).filter(f => f.endsWith('.html'));
let total = 0, minWords = Infinity;

for (const file of files) {
  const wc = processFile(path.join(symbolsDir, file));
  if (wc) {
    const slug = path.basename(file, '.html');
    console.log(`  ✅ ${slug} — ${wc} words`);
    total++;
    if (wc < minWords) minWords = wc;
  }
}

console.log(`\n✅ ${total} symbol pages updated (min ${minWords} words per page)`);
