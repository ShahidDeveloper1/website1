const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://fancysymbols.com';

// Top 100 most popular names (gender-neutral + popular male + female names)
const NAMES = [
  'Emma','Olivia','Sophia','Isabella','Mia','Charlotte','Amelia','Harper',
  'Evelyn','Abigail','Emily','Elizabeth','Sofia','Avery','Ella','Scarlett',
  'Grace','Chloe','Victoria','Riley','Aria','Lily','Aurora','Zoey',
  'Hannah','Layla','Nora','Luna','Stella','Hazel','Violet','Paisley',
  'Liam','Noah','Oliver','James','William','Benjamin','Lucas','Henry',
  'Alexander','Mason','Ethan','Daniel','Jacob','Logan','Jackson','Sebastian',
  'Jack','Aiden','Owen','Samuel','Ryan','Nathan','Caleb','Dylan',
  'Luke','Andrew','Gabriel','Anthony','Isaac','Jayden','Mateo','Leo',
  'Alex','Jordan','Taylor','Morgan','Avery','Casey','Drew','Sam',
  'Max','Charlie','Jamie','Quinn','Skyler','Kai','River','Phoenix',
  'Sarah','Jessica','Ashley','Amanda','Stephanie','Nicole','Jennifer','Rachel',
  'Megan','Lauren','Samantha','Alyssa','Kayla','Brianna','Hailey','Brooke',
  'Aaliyah','Savannah','Maria','Camila','Penelope','Madelyn','Elena','Naomi',
];

// Font maps (subset of aesthetic-fonts.js maps)
const MAPS = {
  cursiveBold: { upper:'𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩', lower:'𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃' },
  fraktur: { upper:'𝔄𝔅ℭ𝔇𝔈𝔉𝔊┋ℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ', lower:'𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷' },
  frakturBold: { upper:'𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅', lower:'𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟' },
  doubleStruck: { upper:'𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ', lower:'𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫' },
  fullwidth: { upper:'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ', lower:'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ' },
  smallCaps: { upper:'ABCDEFGHIJKLMNOPQRSTUVWXYZ', lower:'ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ' },
  circled: { upper:'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ', lower:'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ' },
  negSquared: { upper:'🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉', lower:'🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉' },
  cursive: { upper:'𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵', lower:'𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏' },
  superscript: { upper:'ᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾQᴿˢᵀᵁⱽᵂˣʸᶻ', lower:'ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖqʳˢᵗᵘᵛʷˣʸᶻ' },
};

function mapStr(str, mapObj) {
  const upperArr = Array.from(mapObj.upper);
  const lowerArr = Array.from(mapObj.lower);
  return Array.from(str).map(c => {
    const code = c.charCodeAt(0);
    if (code >= 65 && code <= 90) return upperArr[code - 65] || c;
    if (code >= 97 && code <= 122) return lowerArr[code - 97] || c;
    return c;
  }).join('');
}

function flipStr(str) {
  const flipMap = { a:'ɐ',b:'q',c:'ɔ',d:'p',e:'ǝ',f:'ɟ',g:'ƃ',h:'ɥ',i:'ᴉ',j:'ɾ',k:'ʞ',l:'l',m:'ɯ',n:'u',o:'o',p:'d',q:'b',r:'ɹ',s:'s',t:'ʇ',u:'n',v:'ʌ',w:'ʍ',x:'x',y:'ʎ',z:'z',
    A:'∀',B:'𐐒',C:'Ɔ',D:'ᗡ',E:'Ǝ',F:'Ⅎ',G:'⅁',H:'H',I:'I',J:'ſ',K:'⋊',L:'˥',M:'W',N:'N',O:'O',P:'Ԁ',Q:'Ό',R:'ᴚ',S:'S',T:'⊥',U:'∩',V:'Λ',W:'M',X:'Ｘ',Y:'⅄',Z:'Z' };
  return Array.from(str).map(c => flipMap[c] || c).reverse().join('');
}

function appendToChars(str, suffix) {
  return Array.from(str).map(c => c !== ' ' ? c + suffix : c).join('');
}

// Font styles to show for each name
const STYLES = [
  { name: 'Cursive Bold', fn: s => mapStr(s, MAPS.cursiveBold) },
  { name: 'Cursive', fn: s => mapStr(s, MAPS.cursive) },
  { name: 'Gothic / Old English', fn: s => mapStr(s, MAPS.fraktur) },
  { name: 'Bold Gothic', fn: s => mapStr(s, MAPS.frakturBold) },
  { name: 'Double Struck', fn: s => mapStr(s, MAPS.doubleStruck) },
  { name: 'Wide Text', fn: s => mapStr(s, MAPS.fullwidth) },
  { name: 'Small Caps', fn: s => mapStr(s, MAPS.smallCaps) },
  { name: 'Bubble Text', fn: s => mapStr(s, MAPS.circled) },
  { name: 'Squared', fn: s => mapStr(s, MAPS.negSquared) },
  { name: 'Superscript', fn: s => mapStr(s, MAPS.superscript) },
  { name: 'Underlined', fn: s => appendToChars(s, '\u0332') },
  { name: 'Strikethrough', fn: s => appendToChars(s, '\u0336') },
  { name: 'Upside Down', fn: s => flipStr(s) },
  { name: 'Spaced Out', fn: s => Array.from(s).join(' ') },
  { name: 'Dotted', fn: s => Array.from(s).join('•') },
  { name: '꧁ Decorated ꧂', fn: s => `꧁ ${mapStr(s, MAPS.frakturBold)} ꧂` },
  { name: '✨ Sparkle ✨', fn: s => `✨ ${mapStr(s, MAPS.cursiveBold)} ✨` },
  { name: '♡ Heart ♡', fn: s => `♡ ${s} ♡` },
  { name: '★ Star ★', fn: s => `★ ${mapStr(s, MAPS.fullwidth)} ★` },
  { name: '🌸 Cute 🌸', fn: s => `🌸 ${mapStr(s, MAPS.cursive)} 🌸` },
];

function generateNamePage(name) {
  const slug = name.toLowerCase();
  const styles = STYLES.map(st => {
    const result = st.fn(name);
    const escaped = result.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    return `      <div class="combo-item"><span class="combo-text">${escaped}</span><span class="combo-label" style="font-size:0.75rem;color:#94a3b8;margin-left:auto;">${st.name}</span><span class="combo-copy-btn">Copy</span></div>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset='UTF-8'>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} in Fancy Text — Stylish Fonts Copy Paste | TextSymbols</title>
  <meta name="description" content="${name} in 20+ fancy font styles — cursive, gothic, bubble, bold, decorated. Copy and paste ${name} in aesthetic fonts for Instagram, TikTok, Discord bios.">
  <link rel='canonical' href='${DOMAIN}/names/${slug}'>
  <meta property="og:type" content="website">
  <meta property="og:title" content="${name} in Fancy Text — Stylish Fonts Copy Paste">
  <meta property="og:description" content="${name} in 20+ fancy font styles — cursive, gothic, bubble, bold, decorated. Copy and paste for social media.">
  <meta property="og:image" content="${DOMAIN}/og-image.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${name} in Fancy Text — Stylish Fonts Copy Paste">
  <meta name="twitter:description" content="${name} in 20+ fancy font styles for Instagram, TikTok, Discord bios.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/style.css?v=5.2">
  <link rel="icon" type="image/png" href="/favicon.png">
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"${DOMAIN}"},{"@type":"ListItem","position":2,"name":"Fancy Names","item":"${DOMAIN}/names"},{"@type":"ListItem","position":3,"name":"${name}","item":"${DOMAIN}/names/${slug}"}]}
  </script>
</head>
<body>
<div class="particles"></div>
<header class="header">
  <div class="header-inner">
    <a href="/" class="logo"><img src="/favicon.png" alt="TextSymbols Logo" class="logo-img"><span class="logo-text">TextSymbols</span></a>
    <nav class="header-nav">
      <a href="/">Home</a>
      <a href="/all-symbols.html">All Symbols</a>
      <a href="/preppy-fonts.html"><span class="link-icon">🎀</span> Preppy Font Generator</a>
      <a href="/cute-fonts.html">Cute Fonts</a>
      <a href="/aesthetic-fonts.html">Aesthetic Fonts</a>
      <a href="/lenny-face.html" class="nav-cta">Lenny Faces</a>
    </nav>
    <button class="menu-toggle" id="menuToggle" aria-label="Toggle navigation menu" aria-expanded="false"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></button>
  </div>
</header>
<div class="sidebar-overlay" id="sidebarOverlay"></div>
<aside class="sidebar" id="sidebar"></aside>

<div class="page-wrapper">
  <main class="main-content">
    <div class="page-header">
      <h1>${name} in Fancy Text ✨</h1>
      <p>Copy ${name} in 20+ stylish font variations. Click any style to copy instantly.</p>
    </div>

    <div class="section-title"><span class="icon">✨</span> ${name} — All Font Styles <span class="line"></span></div>
    <div class="combo-grid">
${styles}
    </div>

    <div class="content-article">
      <h2>${name} in Aesthetic Fonts for Social Media</h2>
      <p><b>Looking for "${name}" written in stylish, aesthetic fonts?</b> This page provides 20+ unique Unicode font variations of the name ${name} that you can copy and paste directly into Instagram bios, TikTok profiles, Discord usernames, Twitter/X handles, and any text field. Each style is pure Unicode text — not an image — so it works everywhere.</p>

      <h2>Most Popular Styles for ${name}</h2>
      <p>The most copied font styles for names on social media are <strong>Cursive Bold</strong> (${STYLES[0].fn(name)}), <strong>Gothic</strong> (${STYLES[2].fn(name)}), and <strong>Decorated</strong> (${STYLES[15].fn(name)}). Cursive bold is the #1 choice for Instagram bios, while gothic is popular for gaming usernames.</p>

      <h2>Where to Use Fancy ${name} Text</h2>
      <div class="use-case-grid">
        <div class="use-case-card"><span class="use-case-icon">📸</span><div class="use-case-title">Instagram Bio</div><p class="use-case-desc">Paste ${STYLES[0].fn(name)} into your 150-character Instagram bio.</p></div>
        <div class="use-case-card"><span class="use-case-icon">🎮</span><div class="use-case-title">Gaming Username</div><p class="use-case-desc">Use ${STYLES[3].fn(name)} for an epic gaming name.</p></div>
        <div class="use-case-card"><span class="use-case-icon">💬</span><div class="use-case-title">Discord Profile</div><p class="use-case-desc">Stand out with ${STYLES[4].fn(name)} in your Discord about section.</p></div>
      </div>

      <h3>Try More Names</h3>
      <div class="category-pills">
        <a href="/aesthetic-fonts.html" class="category-pill">✨ Aesthetic Font Generator</a>
        <a href="/bio-generator.html" class="category-pill">📝 Bio Generator</a>
        <a href="/cute-fonts.html" class="category-pill">🌸 Cute Fonts</a>
        <a href="/preppy-fonts.html" class="category-pill">🎀 Preppy Fonts</a>
      </div>
    </div>
  </main>
</div>

<footer class="footer">
  <div class="footer-inner">
    <div class="footer-grid">
      <div class="footer-brand"><span class="logo-text highlight">TextSymbols</span><p class="footer-desc">Your premium destination for aesthetic symbols, cute fonts, and creative text tools.</p></div>
      <div><h4 class="footer-col-title">Text Tools</h4><ul class="footer-links-list"><li><a href="/all-symbols.html">All Symbols</a></li><li><a href="/aesthetic-fonts.html">Aesthetic Fonts</a></li><li><a href="/bio-generator.html">Bio Generator</a></li><li><a href="/invisible-character.html">Invisible Character</a></li></ul></div>
      <div><h4 class="footer-col-title">Categories</h4><ul class="footer-links-list"><li><a href="/symbols/heart.html">Heart Symbols</a></li><li><a href="/symbols/star.html">Star Symbols</a></li><li><a href="/symbols/sparkle.html">Sparkle Symbols</a></li></ul></div>
      <div><h4 class="footer-col-title">Company</h4><ul class="footer-links-list"><li><a href="/pages/privacy.html">Privacy Policy</a></li><li><a href="/pages/terms.html">Terms of Service</a></li></ul></div>
    </div>
    <div class="footer-bottom"><p class="footer-copy">© 2026 FancySymbols.</p></div>
  </div>
</footer>
<script src="/script.js?v=5.2"></script>
</body>
</html>`;
}

// ── Generate all pages ──
console.log('🚀 Generating Fancy Name Pages...\n');

const namesDir = path.join(process.cwd(), 'names');
if (!fs.existsSync(namesDir)) fs.mkdirSync(namesDir);

const uniqueNames = [...new Set(NAMES)];
uniqueNames.forEach(name => {
  const slug = name.toLowerCase();
  const filepath = path.join(namesDir, `${slug}.html`);
  const html = generateNamePage(name);
  fs.writeFileSync(filepath, html, 'utf8');
  console.log(`  ✅ names/${slug}.html`);
});

console.log(`\n✅ Generated ${uniqueNames.length} fancy name pages in /names/`);
