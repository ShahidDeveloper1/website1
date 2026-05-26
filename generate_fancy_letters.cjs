const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://www.fancysymbols.com';

const MAPS = {
  cursiveBold: { u:'𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩', l:'𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃' },
  cursive: { u:'𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵', l:'𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏' },
  fraktur: { u:'𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ', l:'𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷' },
  frakturBold: { u:'𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅', l:'𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟' },
  doubleStruck: { u:'𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ', l:'𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫' },
  fullwidth: { u:'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ', l:'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ' },
  smallCaps: { u:'ABCDEFGHIJKLMNOPQRSTUVWXYZ', l:'ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ' },
  circled: { u:'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ', l:'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ' },
  negCircled: { u:'🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩', l:'🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩' },
  squared: { u:'🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉', l:'🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉' },
  negSquared: { u:'🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉', l:'🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉' },
  superscript: { u:'ᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾQᴿˢᵀᵁⱽᵂˣʸᶻ', l:'ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖqʳˢᵗᵘᵛʷˣʸᶻ' },
};

const STYLE_NAMES = [
  ['Cursive Bold','cursiveBold'],['Cursive','cursive'],['Gothic','fraktur'],
  ['Bold Gothic','frakturBold'],['Double Struck','doubleStruck'],['Wide','fullwidth'],
  ['Small Caps','smallCaps'],['Bubble','circled'],['Dark Bubble','negCircled'],
  ['Squared','squared'],['Dark Squared','negSquared'],['Superscript','superscript'],
];

function getChar(map, letter) {
  const upper = Array.from(map.u);
  const lower = Array.from(map.l);
  const code = letter.charCodeAt(0);
  if (code >= 65 && code <= 90) return upper[code - 65] || letter;
  if (code >= 97 && code <= 122) return lower[code - 97] || letter;
  return letter;
}

function generateLetterPage(letter) {
  const upper = letter.toUpperCase();
  const lower = letter.toLowerCase();
  const slug = lower;

  const rows = STYLE_NAMES.map(([name, key]) => {
    const map = MAPS[key];
    const u = getChar(map, upper);
    const l = getChar(map, lower);
    return `      <div class="combo-item" onclick="copyL(this,'${u} ${l}')"><span class="combo-text"><span style="font-size:1.8rem">${u}</span> <span style="font-size:1.8rem">${l}</span> <span style="color:#94a3b8;font-size:.85rem;margin-left:.5rem">${name}</span></span><span class="combo-copy-btn">Copy</span></div>`;
  }).join('\n');

  // decorated versions
  const decorated = [
    `✦ ${getChar(MAPS.cursiveBold, upper)} ✦`,
    `꧁ ${getChar(MAPS.frakturBold, upper)} ꧂`,
    `🌸 ${getChar(MAPS.cursive, upper)} 🌸`,
    `★ ${getChar(MAPS.fullwidth, upper)} ★`,
    `♡ ${upper} ♡`,
    `「 ${getChar(MAPS.doubleStruck, upper)} 」`,
    `☾ ${getChar(MAPS.cursiveBold, lower)} ☽`,
    `✧ ${getChar(MAPS.fraktur, upper)} ✧`,
  ].map(d => {
    const escaped = d.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    return `      <div class="combo-item" onclick="copyL(this,'${d.replace(/'/g,"\\'")}')"><span class="combo-text" style="font-size:1.3rem">${escaped}</span><span class="combo-copy-btn">Copy</span></div>`;
  }).join('\n');

  const prevLetter = upper === 'A' ? 'Z' : String.fromCharCode(upper.charCodeAt(0) - 1);
  const nextLetter = upper === 'Z' ? 'A' : String.fromCharCode(upper.charCodeAt(0) + 1);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset='UTF-8'>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fancy Letter ${upper} — ${upper} in Cursive, Gothic, Bubble & 20+ Fonts | Fancy Text</title>
  <meta name="description" content="Copy fancy letter ${upper} in 20+ font styles — cursive ${getChar(MAPS.cursiveBold,upper)}, gothic ${getChar(MAPS.fraktur,upper)}, bubble ${getChar(MAPS.circled,upper)}, double-struck ${getChar(MAPS.doubleStruck,upper)}. Click to copy, paste anywhere.">
  <link rel='canonical' href='${DOMAIN}/letters/${slug}'>
  <meta property="og:type" content="website"><meta property="og:title" content="Fancy Letter ${upper} — Copy in 20+ Font Styles"><meta property="og:description" content="Copy fancy ${upper} in cursive, gothic, bubble, and 20+ styles."><meta property="og:image" content="${DOMAIN}/og-image.png">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/style.css?v=6.1"><link rel="icon" type="image/png" href="/favicon.png?v=6.1">
  <link rel="apple-touch-icon" href="/favicon.png?v=6.1">
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"${DOMAIN}"},{"@type":"ListItem","position":2,"name":"Fancy Letters","item":"${DOMAIN}/letters"},{"@type":"ListItem","position":3,"name":"Letter ${upper}","item":"${DOMAIN}/letters/${slug}"}]}</script>
</head>
<body>
<div class="particles"></div>
<header class="header"><div class="header-inner"><a href="/" class="logo"><img src="/favicon.png?v=6.1" alt="Fancy Text Logo" class="logo-img" width="32" height="32" style="border-radius:8px;"><span class="logo-text">Fancy Text</span></a><nav class="header-nav"><a href="/">Home</a><a href="/all-symbols.html">All Symbols</a><a href="/preppy-fonts.html"><span class="link-icon">🎀</span> Preppy Font Generator</a><a href="/cute-fonts.html">Cute Fonts</a><a href="/aesthetic-fonts.html">Aesthetic Fonts</a><a href="/lenny-face.html" class="nav-cta">Lenny Faces</a></nav><button class="menu-toggle" id="menuToggle" aria-label="Toggle navigation menu" aria-expanded="false"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></button></div></header>
<div class="sidebar-overlay" id="sidebarOverlay"></div><aside class="sidebar" id="sidebar"></aside>

<div class="page-wrapper"><main class="main-content">
  <div class="page-header"><h1>Fancy Letter ${upper} — Copy Paste ✨</h1><p>Copy the letter ${upper} in 20+ stylish font variations. Click any style to copy instantly.</p></div>

  <div style="display:flex;justify-content:space-between;margin-bottom:1rem"><a href="/letters/${prevLetter.toLowerCase()}" class="category-pill">← Letter ${prevLetter}</a><a href="/letters/${nextLetter.toLowerCase()}" class="category-pill">Letter ${nextLetter} →</a></div>

  <div class="section-title"><span class="icon">🔤</span> Letter ${upper} — All Font Styles <span class="line"></span></div>
  <div class="combo-grid">
${rows}
  </div>

  <div class="section-title"><span class="icon">✨</span> Decorated ${upper} <span class="line"></span></div>
  <div class="combo-grid">
${decorated}
  </div>

  <div class="content-article">
    <h2>Fancy Letter ${upper} for Social Media</h2>
    <p><b>This page shows the letter "${upper}" in 20+ Unicode font styles</b> — including cursive (${getChar(MAPS.cursiveBold,upper)}), gothic (${getChar(MAPS.fraktur,upper)}), double-struck (${getChar(MAPS.doubleStruck,upper)}), bubble (${getChar(MAPS.circled,upper)}), and more. Each character is pure Unicode text that copies and pastes into any text field — Instagram bios, Discord usernames, Twitter posts, and documents.</p>

    <h3>Browse All Letters</h3>
    <div class="category-pills">${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(l => `<a href="/letters/${l.toLowerCase()}" class="category-pill">${l}</a>`).join('')}</div>

    <h3>Font Generator Tools</h3>
    <div class="category-pills"><a href="/aesthetic-fonts.html" class="category-pill">✨ Aesthetic Fonts</a><a href="/cute-fonts.html" class="category-pill">🌸 Cute Fonts</a><a href="/username-generator.html" class="category-pill">✧ Username Gen</a><a href="/" class="category-pill">🏠 Home</a></div>
  </div>
</main></div>

<footer class="footer"><div class="footer-inner"><div class="footer-bottom"><p class="footer-copy">© 2026 Fancy Text.</p></div></div></footer>
<script>function copyL(el,t){const b=el.querySelector('.combo-copy-btn');navigator.clipboard.writeText(t).then(()=>{if(b){b.textContent='Copied!';b.style.background='#0d9488';b.style.color='#fff';}setTimeout(()=>{if(b){b.textContent='Copy';b.style.background='';b.style.color='';}},1500);});}</script>
<script defer src="/script.js?v=6.0"></script>
</body></html>`;
}

// Generate all 26 letter pages
console.log('🔤 Generating Fancy Letter Pages...\n');
const dir = path.join(process.cwd(), 'letters');
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

for (let i = 0; i < 26; i++) {
  const letter = String.fromCharCode(65 + i);
  const slug = letter.toLowerCase();
  fs.writeFileSync(path.join(dir, `${slug}.html`), generateLetterPage(letter), 'utf8');
  console.log(`  ✅ letters/${slug}.html`);
}

console.log(`\n✅ Generated 26 fancy letter pages in /letters/`);
