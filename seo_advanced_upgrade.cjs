const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://fancysymbols.com';
const PUBLISH_DATE = '2026-05-14';

// ── Unique meta descriptions per page category ──
const META_DESCRIPTIONS = {
  'index': 'Copy and paste 1000+ text symbols instantly — hearts ❤, stars ★, arrows →, check marks ✔ and more. Free one-click copy tool for Instagram, TikTok, Discord and gaming.',
  'all-symbols': 'Browse our complete collection of 1000+ Unicode text symbols organized into 60+ categories. One-click copy and paste for every platform.',
  'cute-fonts': 'Transform your text into adorable cute font styles with decorations like flowers, hearts and sparkles. Free cute text generator for Instagram bios and TikTok.',
  'aesthetic-fonts': 'Generate 20+ aesthetic font styles instantly — cursive, bold italic, gothic, bubble text and more. Free aesthetic text generator for social media bios.',
  'preppy-fonts': 'Create trendy preppy font text with ribbons 🎀, bows and collegiate-style Unicode decorations. Free preppy text generator for Instagram and TikTok bios.',
  'lenny-face': 'Copy 500+ Lenny faces and kaomoji emoticons like ( ͡° ͜ʖ ͡°) for Discord, gaming, and messaging. Organized by mood — happy, sad, love, shrug and more.',
  // Symbol pages
  'heart': 'Copy and paste 50+ heart symbols ❤ ♡ 💕 💖 — classic, colorful, and decorative hearts for Instagram bios, love messages, and social media posts.',
  'star': 'Copy and paste 40+ star symbols ★ ✦ ⭐ ✧ — solid stars, outlined stars, and sparkle symbols for social media bios and text decorations.',
  'arrow': 'Copy and paste 60+ arrow symbols → ⇨ ➤ ↗ — directional arrows, curved arrows, and fancy arrow text for documents and social media.',
  'flower': 'Copy and paste 30+ flower symbols ✿ ❀ 🌸 ❁ — floral text decorations for aesthetic Instagram bios and creative messages.',
  'checkmark': 'Copy and paste 20+ check mark symbols ✔ ✓ ☑ ✅ — verification ticks and ballot checks for to-do lists and social media.',
  'moon': 'Copy and paste 15+ moon symbols ☾ 🌙 ☽ 🌑 — crescent moons, full moons, and lunar phases for aesthetic text decorations.',
  'music': 'Copy and paste 25+ music symbols ♪ ♫ 🎵 ♬ — musical notes, clefs, and sound symbols for playlists and social media.',
  'zodiac': 'Copy and paste all 12 zodiac symbols ♈ ♉ ♊ ♋ — astrological signs for Instagram bios and horoscope content.',
  'infinity': 'Copy and paste infinity symbols ∞ ♾ — mathematical infinity and forever symbols for love messages and social media bios.',
  'currency': 'Copy and paste 30+ currency symbols $ € £ ¥ ₿ — dollar, euro, pound, yen, bitcoin and more for financial documents.',
  'cross': 'Copy and paste 20+ cross symbols ✝ ☦ ✞ ♱ — religious crosses, decorative crosses, and dagger symbols.',
  'diamond': 'Copy and paste 15+ diamond symbols ◆ ♦ 💎 ◇ — solid diamonds, outlined diamonds, and gem symbols for text decorations.',
  'sparkle': 'Copy and paste 20+ sparkle symbols ✨ ✦ ⁺ ˚ — glitter, stars, and shine symbols for aesthetic Instagram bios.',
  'aesthetic': 'Copy and paste 50+ aesthetic symbols ✧ ꧁ ༺ ✦ — decorative Unicode characters for creating beautiful social media bios.',
  'circle': 'Copy and paste 30+ circle symbols ○ ● ◎ ◉ — filled circles, outlined circles, and dot symbols for text art.',
  'triangle': 'Copy and paste 20+ triangle symbols ▲ △ ▶ ◀ — directional triangles and geometric shapes for documents.',
  'crown': 'Copy and paste 10+ crown symbols 👑 ♔ ♕ 🤴 — king crowns, queen crowns, and royal symbols for usernames.',
  'weather': 'Copy and paste 25+ weather symbols ☀ ☁ ⛈ ❄ — sun, cloud, rain, snow, and temperature symbols for messages.',
  'emoji-faces': 'Copy and paste 50+ smiley face emoji 😀 🥰 😎 🤔 — expressive face emoticons organized by mood and emotion.',
  'wave': 'Copy and paste 15+ wave symbols 〰 ∿ ≋ — wavy lines, tilde marks, and ocean wave text decorations.',
  'divider': 'Copy and paste 30+ text divider symbols ┊ ═ ─ ║ — decorative line separators for aesthetic bio formatting.',
  'border': 'Copy and paste 25+ border symbols ╔ ╗ ║ ═ — box drawing characters for creating text borders and frames.',
  'dot': 'Copy and paste 20+ dot symbols • · ● ○ — bullet points, middle dots, and decorative dot text characters.',
  'loading': 'Copy and paste 15+ loading bar symbols ▓ ░ █ ▒ — progress bar characters for creative text art and gaming.',
  'quotation': 'Copy and paste 20+ quotation symbols ❝ ❞ « » — decorative quote marks and citation symbols for documents.',
  'line': 'Copy and paste 30+ line symbols │ ─ ┃ ━ — vertical lines, horizontal lines, and decorative line characters.',
  'numbers': 'Copy and paste 40+ number symbols ① ② ③ ⅰ — circled numbers, roman numerals, and subscript digits.',
  'animal': 'Copy and paste 40+ animal symbols 🐾 🦋 🐱 🐶 — pet paws, butterflies, and wildlife emoji for messages.',
  'sun': 'Copy and paste 15+ sun symbols ☀ ☼ 🌞 ✺ — sunshine, sunburst, and solar symbols for weather and decoration.',
  'greek': 'Copy and paste all Greek alphabet letters Α Β Γ Δ — uppercase and lowercase Greek symbols for math and science.',
  'roman': 'Copy and paste Roman numerals Ⅰ Ⅱ Ⅲ Ⅳ — classic Roman number symbols for dates, lists, and formal documents.',
  'chinese': 'Copy and paste 30+ Chinese characters 愛 龍 福 — common Hanzi symbols for love, luck, strength and wisdom.',
  'japanese': 'Copy and paste 40+ Japanese symbols あ カ 漢 — Hiragana, Katakana, and Kanji characters for text decorations.',
  'korean': 'Copy and paste 20+ Korean symbols ㅿ ㆍ ㅎ — Hangul characters and Korean text symbols for messaging.',
  'hand': 'Copy and paste 25+ hand symbols ✌ 👋 🤙 👍 — gesture emoji including peace sign, wave, and thumbs up.',
  'bubble': 'Copy and paste bubble text letters ⓐ ⓑ ⓒ — circled alphabet characters for unique social media usernames.',
  'cursive': 'Copy and paste cursive letters 𝒜 𝒷 𝒸 — elegant handwriting-style Unicode characters for bios and messages.',
  'old-english': 'Copy and paste Old English letters 𝔄 𝔅 ℭ — blackletter Gothic font symbols for medieval and vintage aesthetics.',
  'upside-down': 'Copy and paste upside down text ʇxǝʇ — flipped letters and reversed characters for fun messages and pranks.',
  'house': 'Copy and paste 10+ house symbols 🏠 🏡 🏘 ⌂ — home, building, and shelter emoji for real estate and decoration.',
  'fraction': 'Copy and paste fraction symbols ½ ⅓ ¼ ⅛ — mathematical fraction characters for recipes and documents.',
  'comparison': 'Copy and paste comparison symbols ≥ ≤ ≠ ≈ — mathematical inequality and equivalence operators.',
  'corner': 'Copy and paste corner symbols ╚ ╗ ┘ └ — box drawing corner characters for text frames and borders.',
  'bracket': 'Copy and paste bracket symbols 【 】 「 」 — decorative brackets and parentheses for text formatting.',
  'punctuation': 'Copy and paste punctuation symbols ¡ ¿ · — inverted marks, interrobangs, and special punctuation characters.',
  'religion': 'Copy and paste religious symbols ✝ ☪ ✡ ☸ — Christian, Islamic, Jewish, Buddhist, and Hindu symbols.',
  'copyright': 'Copy and paste copyright symbols © ® ™ ℗ — legal trademark, registered, and copyright notice characters.',
  'gender': 'Copy and paste gender symbols ♂ ♀ ⚧ ⚥ — male, female, transgender, and non-binary symbols.',
  'medical': 'Copy and paste medical symbols ⚕ ☤ ✚ 🏥 — caduceus, Rod of Asclepius, and healthcare symbols.',
  'chess': 'Copy and paste chess symbols ♚ ♛ ♜ ♝ — king, queen, rook, bishop, knight, and pawn pieces.',
  'card': 'Copy and paste card suit symbols ♠ ♥ ♦ ♣ — spade, heart, diamond, and club playing card symbols.',
  'dice': 'Copy and paste dice symbols ⚀ ⚁ ⚂ ⚃ — six-sided die faces for games and random selection.',
  'lock': 'Copy and paste lock symbols 🔒 🔓 🗝 🔐 — padlock, key, and security symbols for privacy content.',
  'warning': 'Copy and paste warning symbols ⚠ ☢ ☣ ⛔ — hazard, radiation, biohazard, and danger signs.',
  'writing': 'Copy and paste writing symbols ✍ ✏ 📝 🖊 — pen, pencil, and document emoji for note-taking content.',
  'weapon': 'Copy and paste weapon symbols ⚔ 🗡 🏹 🔫 — sword, bow, shield, and combat emoji for gaming.',
  'transport': 'Copy and paste transport symbols 🚗 ✈ 🚀 🚂 — car, plane, rocket, and vehicle emoji for travel content.',
  'office': 'Copy and paste office symbols 💼 📊 📁 🖨 — briefcase, chart, folder, and workplace emoji.',
  'award': 'Copy and paste award symbols 🏆 🥇 🎖 🏅 — trophy, medal, and ribbon emoji for achievements.',
  'crypto': 'Copy and paste cryptocurrency symbols ₿ Ξ Ł ₮ — Bitcoin, Ethereum, Litecoin, and altcoin symbols.',
  'square': 'Copy and paste square symbols ⬛ ◻ ▪ ▫ — filled squares, outlined squares, and block characters.',
  'rectangle': 'Copy and paste rectangle symbols █ ▄ ▀ ▐ — block elements and rectangular shapes for text art.',
  'german': 'Copy and paste German symbols ß Ä Ö Ü — umlauts, eszett, and special German alphabet characters.',
};

// ── Readable names for breadcrumbs ──
const PAGE_NAMES = {
  'index': 'Home',
  'all-symbols': 'All Symbols',
  'cute-fonts': 'Cute Font Generator',
  'aesthetic-fonts': 'Aesthetic Font Generator',
  'preppy-fonts': 'Preppy Font Generator',
  'lenny-face': 'Lenny Faces',
};

function titleCase(str) {
  return str.split(/[-_]/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function getPageName(slug) {
  return PAGE_NAMES[slug] || META_DESCRIPTIONS[slug] ? titleCase(slug) + ' Symbols' : titleCase(slug);
}

// ── Build BreadcrumbList JSON-LD ──
function buildBreadcrumb(filepath) {
  const rel = path.relative(process.cwd(), filepath).replace(/\\/g, '/');
  const items = [{ name: 'Home', url: DOMAIN }];

  if (rel.startsWith('symbols/')) {
    const slug = path.basename(rel, '.html');
    items.push({ name: 'Symbols', url: `${DOMAIN}/all-symbols` });
    items.push({ name: titleCase(slug) + ' Symbols', url: `${DOMAIN}/symbols/${slug}` });
  } else if (rel.startsWith('pages/')) {
    const slug = path.basename(rel, '.html');
    items.push({ name: titleCase(slug), url: `${DOMAIN}/pages/${slug}` });
  } else {
    const slug = path.basename(rel, '.html');
    if (slug !== 'index') {
      items.push({ name: getPageName(slug), url: `${DOMAIN}/${slug}` });
    }
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

// ── Extract FAQ pairs from HTML ──
function extractFAQs(html) {
  const faqs = [];
  const regex = /<div class="faq-item">\s*<div class="faq-q">([\s\S]*?)<\/div>\s*<div class="faq-a">([\s\S]*?)<\/div>\s*<\/div>/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const question = match[1].replace(/<[^>]+>/g, '').trim();
    let answer = match[2].replace(/<[^>]+>/g, '').trim();
    faqs.push({ question, answer });
  }
  return faqs;
}

function buildFAQSchema(faqs) {
  if (faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// ── Main processor ──
function processFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  const rel = path.relative(process.cwd(), filepath).replace(/\\/g, '/');
  const slug = path.basename(filepath, '.html');

  // 1. UPDATE META DESCRIPTION with unique one
  const uniqueDesc = META_DESCRIPTIONS[slug];
  if (uniqueDesc) {
    content = content.replace(
      /<meta name="description" content="[^"]*">/i,
      `<meta name="description" content="${uniqueDesc}">`
    );
    // Also update OG and Twitter descriptions
    content = content.replace(
      /<meta property="og:description" content="[^"]*">/i,
      `<meta property="og:description" content="${uniqueDesc}">`
    );
    content = content.replace(
      /<meta name="twitter:description" content="[^"]*">/i,
      `<meta name="twitter:description" content="${uniqueDesc}">`
    );
  }

  // 2. REMOVE old schemas (we'll rebuild them)
  content = content.replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/g, '\n');

  // 3. BUILD new schemas
  const schemas = [];

  // Breadcrumb schema
  schemas.push(buildBreadcrumb(filepath));

  // FAQ schema (if page has FAQs)
  const faqs = extractFAQs(content);
  const faqSchema = buildFAQSchema(faqs);
  if (faqSchema) schemas.push(faqSchema);

  // WebSite / Article schema
  const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].replace(' - TextSymbols', '') : 'FancySymbols';
  const descMatch = content.match(/<meta name="description" content="([^"]*)"/i);
  const desc = descMatch ? descMatch[1] : '';

  const isSymbolPage = rel.startsWith('symbols/');
  const urlPath = slug === 'index' ? '' : rel.replace('.html', '');

  if (isSymbolPage) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": title,
      "description": desc,
      "author": { "@type": "Organization", "name": "FancySymbols", "url": DOMAIN },
      "publisher": { "@type": "Organization", "name": "FancySymbols", "logo": { "@type": "ImageObject", "url": `${DOMAIN}/favicon.png` } },
      "datePublished": "2024-01-01",
      "dateModified": PUBLISH_DATE,
      "mainEntityOfPage": { "@type": "WebPage", "@id": `${DOMAIN}/${urlPath}` }
    });
  } else if (slug === 'index') {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "FancySymbols — TextSymbols",
      "description": desc,
      "url": DOMAIN,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${DOMAIN}/all-symbols?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    });
  } else {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": title,
      "description": desc,
      "url": `${DOMAIN}/${urlPath}`
    });
  }

  // 4. INJECT all schemas before </head>
  const schemaBlock = schemas.map(s =>
    `  <script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n  </script>`
  ).join('\n');

  content = content.replace(/<\/head>/i, `${schemaBlock}\n</head>`);

  fs.writeFileSync(filepath, content, 'utf8');
  return { faqs: faqs.length, breadcrumb: true, uniqueDesc: !!uniqueDesc };
}

// ── Run ──
console.log('🚀 Advanced SEO Upgrade: FAQ Schema + Breadcrumbs + Unique Meta Descriptions\n');

let stats = { files: 0, faqs: 0, descriptions: 0 };

const SKIP_DIRS = new Set(['.git', 'node_modules', 'dist', 'es', 'fr', 'images', '.vscode']);

function walkDir(dir) {
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (!SKIP_DIRS.has(entry)) walkDir(full);
    } else if (entry.endsWith('.html')) {
      const result = processFile(full);
      stats.files++;
      stats.faqs += result.faqs;
      if (result.uniqueDesc) stats.descriptions++;
      const rel = path.relative(process.cwd(), full).replace(/\\/g, '/');
      console.log(`  ✅ ${rel} — ${result.faqs} FAQs, breadcrumb ✓${result.uniqueDesc ? ', unique desc ✓' : ''}`);
    }
  }
}

walkDir(process.cwd());

console.log(`\n✅ COMPLETE: ${stats.files} pages upgraded`);
console.log(`   📋 ${stats.faqs} FAQ items wrapped in FAQPage schema`);
console.log(`   🧭 ${stats.files} breadcrumb schemas injected`);
console.log(`   📝 ${stats.descriptions} unique meta descriptions applied`);
