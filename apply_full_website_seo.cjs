const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

// Exclude these directories
const excludeDirs = ['node_modules', '.vscode', 'dist', '.git'];

// Map of standard categories in /symbols/ to their specific symbols for meta descriptions
const categorySymbolsMap = {
  zodiac: '♈ ♉ ♊',
  currency: '$ € £',
  math: '∑ ± √',
  weather: '☀️ 🌧 ❄️',
  hand: '✌️ ✍️ ✊',
  aesthetic: '✦ ┊ ೃ',
  star: '★ ⭐ ☆',
  heart: '♥ ❤ ♡',
  numbers: '① ❷ ⓷',
  animal: '🐱 🐶 🦊',
  music: '♪ ♫ ♬',
  circle: '○ 🔴 🔵',
  arrow: '→ ➜ ➔',
  bracket: '【 】 〔',
  cross: '† ✟ ✙',
  chess: '♚ ♛ ♞',
  card: '♠ ♥ ♦',
  flower: '✿ 🌸 🌹',
  sun: '☀️ ☼ ☀',
  moon: '☾ ☽ 🌙',
  infinity: '∞ ♾',
  numbers: '① ② ③',
  square: '■ □ ▢',
  triangle: '▲ ▼ ▵',
  line: '│ ┃ ─',
  corner: '╚ ╗ ╝',
  divider: '┊ ❃ ━',
  sparkle: '✨ ✦ ≛',
  house: '🏠 🏡',
  crown: '👑 ♕',
  diamond: '◆ ◇ ❖',
  office: '💼 📁 📝',
  award: '🏆 🏅 🥇',
  lock: '🔒 🔓 🔑',
  warning: '⚠️ 🛈 🚨',
  writing: '✍️ ✏️ ✒️',
  weapon: '⚔️ 🛡 🔫',
  transport: '🚗 🚲 ✈️',
  roman: 'Ⅳ Ⅸ Ⅻ',
  emoji: '🥰 😎 😜',
  fraction: '½ ¼ ¾',
  comparison: '≥ ≤ ≠',
  japanese: 'あ イ う',
  chinese: '愛 友 福',
  korean: 'ㅿ ㅂ ㄷ',
  bubble: 'ⓐ ⓑ ⓒ',
  cursive: '𝒜 ℬ 𝒞',
  german: 'ß ä ö',
  greek: 'Ω α β',
  punctuation: '! ? &',
  dice: '🎲 ⚀ ⚁',
  bullet: '• ◦ ∙',
  border: '╔ ╗ ╚',
  dot: '• ⊙ ◘',
  loading: '▓ ▒ ░',
  wave: '〰 🌊',
  religion: '✝ ☪ 🕉',
  upside: 'ʇ ɐ ɥ',
  english: '𝔄 𝔅 𝔍'
};

// Map of category symbols to simple display emoji for title tags
const categoryTitleSymbolMap = {
  zodiac: '♈',
  currency: '💵',
  math: '∑',
  weather: '☀️',
  hand: '✌️',
  aesthetic: '✧',
  star: '⭐',
  heart: '♥',
  numbers: '①',
  animal: '🐱',
  music: '♪',
  circle: '○',
  arrow: '→',
  bracket: '【',
  cross: '†',
  chess: '♚',
  card: '♠',
  flower: '🌸',
  sun: '☀️',
  moon: '☾',
  infinity: '∞',
  square: '■',
  triangle: '▲',
  line: '│',
  corner: '╚',
  divider: '┊',
  sparkle: '✨',
  house: '🏠',
  crown: '👑',
  diamond: '◆',
  office: '💼',
  award: '🏆',
  lock: '🔒',
  warning: '⚠️',
  writing: '✍️',
  weapon: '⚔️',
  transport: '🚗',
  roman: 'Ⅳ',
  emoji: '🥰',
  fraction: '½',
  comparison: '≥',
  japanese: 'あ',
  chinese: '愛',
  korean: 'ㅿ',
  bubble: 'ⓐ',
  cursive: '𝒜',
  german: 'ß',
  greek: 'Ω',
  punctuation: '!',
  dice: '🎲',
  bullet: '•',
  border: '╔',
  dot: '•',
  loading: '▓',
  wave: '〰',
  religion: '✝',
  upside: 'ʇ',
  english: '𝔄'
};

// Map of custom titles and descriptions for individual tool files
const toolPageMap = {
  'aesthetic-fonts.html': {
    title: 'Aesthetic Fonts Copy and Paste ✧ 100+ Fancy Text Generators',
    desc: 'Get aesthetic fonts copy and paste — 𝓪e𝓼𝓽𝓱𝓮𝓽𝓲𝓬 ✧ ⓐⓔⓢⓣⓗⓔⓣⓘⓒ. Fancy text generators & keyboard styles. One click copy. Works everywhere. No app needed!'
  },
  'cute-fonts.html': {
    title: 'Cute Fonts Copy and Paste 🌸 100+ Aesthetic Text Generators',
    desc: 'Browse cute fonts copy and paste styles — 𝓬𝓾𝓽𝓮 🌸 𝕔𝕦𝕥𝕖. Preppy text generators & aesthetic letter designs. One click copy. Works everywhere. No app needed!'
  },
  'preppy-fonts.html': {
    title: 'Preppy Fonts Copy and Paste 🎀 100+ Cute & Aesthetic Styles',
    desc: 'Get preppy fonts copy and paste instantly — 𝓅𝓇ℯ𝓅𝓅𝓎 🎀 🄿🅁🄴🄿🄿🅈. Cute preppy letter styles & text. One click copy. Works everywhere. No app needed!'
  },
  'lenny-face.html': {
    title: 'Lenny Faces Copy and Paste ( ͡° ͜ʖ ͡°) 1000+ Cool Text Faces',
    desc: 'Copy lenny faces instantly — ( ͡° ͜ʖ ͡°) ¯\\_(ツ)_/¯. Huge list of cute Japanese kaomoji & anime text faces. One click copy. Works everywhere. No app needed!'
  },
  'small-text.html': {
    title: 'Small Text Generator ˢᵐᵃˡˡ Copy and Paste Tiny Fonts',
    desc: 'Get small text generator output instantly — ˢᵐᵃˡˡ 🅂🄼🄰🄼🄻. Tiny text, subscript, superscript, & miniature fonts. One click copy. Works everywhere. No app needed!'
  },
  'bold-text.html': {
    title: 'Bold Text Generator 𝐛𝐨𝐥𝐝 Copy and Paste Heavy Fonts',
    desc: 'Get bold text generator output instantly — 𝐛𝐨𝐥𝐝 𝕓𝕠𝕝𝕕 𝖇𝖔𝖑𝖉. Heavy fancy fonts, thick lettering & dark text styles. One click copy. Works everywhere. No app needed!'
  },
  'cursive-text.html': {
    title: 'Cursive Text Generator 𝓬𝓾𝓻𝓼𝓲𝓿𝓮 Copy and Paste Handwriting',
    desc: 'Get cursive text generator output instantly — 𝓬𝓾𝓻𝓼𝓲𝓿𝓮 𝒸𝓊𝓇𝓈𝒾𝓋ℯ. Beautiful handwriting fonts, script text & italic. One click copy. Works everywhere. No app needed!'
  },
  'bubble-text.html': {
    title: 'Bubble Text Generator ⓑⓤⓑⓑⓛⓔ Copy and Paste Circle Fonts',
    desc: 'Get bubble text generator output instantly — ⓑⓤⓑⓑⓛⓔ 🄱🅄🄱🄱🄿🄿. Circle fonts, rounded characters & ring letters. One click copy. Works everywhere. No app needed!'
  },
  'vaporwave-text.html': {
    title: 'Vaporwave Text Generator ｗｉｄｅ Copy and Paste Aesthetic',
    desc: 'Get vaporwave text generator output instantly — ｗｉｄｅ 🅆🄸🄳🄴. Fullwidth aesthetic font, spaced letters & text styles. One click copy. Works everywhere. No app needed!'
  },
  'zalgo-text.html': {
    title: 'Zalgo Text Generator 𝔷𝔞𝔩𝔤𝔬 Copy and Paste Glitch Fonts',
    desc: 'Get zalgo text generator output instantly — z̸a̸l̸g̸o̸ 𝔷𝔞𝔩𝔤𝔬. Glitched fonts, creepy text styles & void letters. One click copy. Works everywhere. No app needed!'
  },
  'blank-space.html': {
    title: 'Blank Space Copy and Paste ㅤ Invisible Text & Characters',
    desc: 'Copy blank space characters instantly — ㅤ ⠀⠀. Copy invisible letters, blank lines, and empty spaces for names and bios. One click copy. No app needed!'
  },
  'invisible-character.html': {
    title: 'Invisible Character Copy Paste ㅤ Blank Space Generator',
    desc: 'Copy invisible character space instantly — ㅤ ⠀⠀. Generate empty strings and blank spaces for nicknames or WhatsApp. One click copy. No app needed!'
  },
  'all-symbols.html': {
    title: 'All Symbols Copy and Paste ✦ 1000+ Text Symbols & Emojis',
    desc: 'Browse all symbols copy and paste directories — ✦ ★ ❤. Comprehensive list of aesthetic icons, arrows, stars & letters. One click copy. No app needed!'
  },
  'text-repeater.html': {
    title: 'Text Repeater Copy and Paste 🔁 Multiplier Generator Tool',
    desc: 'Browse text repeater multiplier tools — 🔁 🚀. Instantly multiply words, symbols, and sentences 10,000 times. One click copy. Works everywhere. No app needed!'
  },
  'bio-generator.html': {
    title: 'Aesthetic Bio Generator ✎ Cute Copy & Paste Profiles',
    desc: 'Create aesthetic bios instantly — ✎ ✦. Copy custom social media profile descriptions, preppy designs & symbols. One click copy. No app needed!'
  },
  'font-generator.html': {
    title: 'Fancy Text Generator 𝔣𝔞𝔫𝔠𝔶 Copy and Paste Cool Styles',
    desc: 'Get fancy text generator output instantly — 𝔣𝔞𝔫𝔠𝔶 𝒻𝒶𝓃𝒸𝓎. Custom cursive text, aesthetic bold fonts & symbols. One click copy. Works everywhere. No app needed!'
  },
  'bullet-point.html': {
    title: 'Bullet Point Symbols Copy Paste • Aesthetic List Markers',
    desc: 'Copy bullet point symbols instantly — • ⁃ ‣. Clean list markers, bullet text symbols, and structural layout ticks. One click copy. Works everywhere. No app needed!'
  },
  'character-counter.html': {
    title: 'Character Counter Online 🔢 Live Word & Letter Tracker',
    desc: 'Count characters and words instantly — 🔢 📝. Real-time letter counting, paragraph tracking & text analysis. One click copy. Works everywhere. No app needed!'
  },
  'bold-text.html': {
    title: 'Bold Text Generator 𝐛𝐨𝐥𝐝 Copy and Paste Heavy Fonts',
    desc: 'Get bold text generator output instantly — 𝐛𝐨𝐥𝐝 𝕓𝕠𝕝𝕕 𝖇𝖔𝖑𝖉. Heavy fancy fonts, thick lettering & dark text styles. One click copy. Works everywhere. No app needed!'
  },
  'username-generator.html': {
    title: 'Aesthetic Username Generator 🌟 Cute Copy & Paste Names',
    desc: 'Find aesthetic usernames instantly — 🌟 ✦. Copy cute preppy gaming handles, Instagram nicknames & symbols. One click copy. Works everywhere. No app needed!'
  },
  'strikethrough-text.html': {
    title: 'Strikethrough Text Generator s̶t̶r̶i̶k̶e̶ Copy & Paste Fonts',
    desc: 'Get strikethrough text generator output instantly — s̶t̶r̶i̶k̶e̶ ̶s̶. Crossed out lettering, line through text & symbols. One click copy. No app needed!'
  },
  'upside-down-text.html': {
    title: 'Upside Down Text Generator uʍop Copy and Paste Flip Fonts',
    desc: 'Get upside down text generator output instantly — uʍop ʇxǝʇ. Flipped letters, backward typography & mirrored fonts. One click copy. No app needed!'
  },
  'emoticons.html': {
    title: 'Japanese Emoticons Copy and Paste ✿ 1000+ Cute Kaomojis',
    desc: 'Copy Japanese emoticons instantly — ✿ (◡‿◡✿) (•‿•). Gigantic list of cute text emojis, action kaomojis & anime faces. One click copy. No app needed!'
  },
  'gothic-text.html': {
    title: 'Gothic Text Generator 𝔤𝔬𝔱𝔥𝔦𝔠 Copy and Paste Blackletter',
    desc: 'Get gothic text generator output instantly — 𝔤𝔬𝔱𝔥𝔦𝔠 𝖌𝖔𝖙𝖍𝖎𝖈. Dark blackletter fonts, medieval writing & aesthetic letters. One click copy. No app needed!'
  },
  'morse-code.html': {
    title: 'Morse Code Translator ▄▄▄ Copy and Paste Audio Tool',
    desc: 'Translate morse code instantly — ••• ─── •••. Convert standard text to morse signals, decode signals & symbols. One click copy. Works everywhere. No app needed!'
  }
};

// Dynamic Generator functions to generate tags matching exact guidelines
function generateTitle(primaryKeyword, symbol, suffix) {
  // 1. Primary keyword FIRST
  // 2. Keep under 60 characters
  // 3. Add 1 relevant symbol
  let title = `${primaryKeyword} ${symbol} ${suffix}`.trim();
  if (title.length > 60) {
    title = `${primaryKeyword} ${symbol} Styles`;
  }
  if (title.length > 60) {
    title = `${primaryKeyword} ${symbol}`;
  }
  if (title.length > 60) {
    title = title.substring(0, 60).trim();
  }
  return title;
}

function generateDescription(verb, primaryKeyword, symbols, suffixText) {
  // 1. Start with an action verb (Copy, Get, Find, Browse)
  // 2. Include primary keyword naturally
  // 3. Mention 2–3 specific symbol examples using actual symbols
  // 4. Include "click to copy" or "one click copy"
  // 5. Add "No app needed" or "works everywhere" for credibility
  // 6. Keep between 140–155 characters
  
  let base = `${verb} ${primaryKeyword} instantly — ${symbols}. `;
  let core = `${base}${suffixText}`;
  
  if (core.length > 155) {
    // Trim down the suffix
    core = `${base}One click copy. Works everywhere. No app needed!`;
  }
  if (core.length > 155) {
    core = `${base}One click copy. No app needed!`;
  }
  
  // Pad if too short to reach 140 chars minimum
  if (core.length < 140) {
    let fillers = [
      ' Elevate your social media bios & gaming tags today.',
      ' Perfect for Instagram, Discord, TikTok, & gaming.',
      ' Enhance your profile layouts & design elements.',
      ' Instant clipboard copy.'
    ];
    for (let filler of fillers) {
      if (core.length + filler.length <= 155) {
        core += filler;
      }
    }
  }
  
  // Hard limit clamp to stay in 140-155 characters range
  if (core.length > 155) {
    core = core.substring(0, 151) + '...';
  }
  if (core.length < 140) {
    // Force pad to 140
    core = core.padEnd(140, ' ');
  }
  return core;
}

function processHTMLFile(filePath) {
  const relPath = path.relative(rootDir, filePath).replace(/\\/g, '/');
  const baseName = path.basename(filePath);
  let fileContent = fs.readFileSync(filePath, 'utf8');
  
  let title = '';
  let desc = '';
  
  // Determine page type and keywords
  if (baseName === 'index.html') {
    title = 'Fancy Text Generator ✦ Copy and Paste Cool Fonts & Symbols';
    desc = 'Generate fancy text instantly — 𝒻𝒶𝓃𝒸𝓎 ✦ ★ ❤. Browse 1000+ cool fonts, aesthetic symbols & fancy letters. One click copy. Works everywhere. No app needed!';
  } else if (toolPageMap[baseName]) {
    title = toolPageMap[baseName].title;
    desc = toolPageMap[baseName].desc;
  } else if (relPath.startsWith('symbols/')) {
    const category = baseName.replace('.html', '').toLowerCase();
    const symbols = categorySymbolsMap[category] || '✦ ★ ❤';
    const keyword = `${category} symbols copy and paste`;
    const symbolChar = categoryTitleSymbolMap[category] || '✦';
    title = generateTitle(
      category.charAt(0).toUpperCase() + category.slice(1) + ' Symbols Copy and Paste',
      symbolChar,
      '100+ Best Text Glyphs'
    );
    desc = generateDescription(
      'Copy',
      keyword,
      symbols,
      `Astrological glyphs, horoscope content & decorative characters. One click copy. Works everywhere. No app needed!`
    );
  } else if (relPath.startsWith('letters/')) {
    const letter = baseName.replace('.html', '').toUpperCase();
    const keyword = `letter ${letter} fonts copy and paste`;
    title = generateTitle(
      `Letter ${letter} Fonts Copy and Paste`,
      '🅂',
      '100+ Cute & Fancy Styles'
    );
    // Custom fancy letter samples for each page
    let letterSamples = `${letter} 𝔖 🅂`;
    if (letter === 'A') letterSamples = '𝓐 𝔄 Ⓐ 𝔸';
    else if (letter === 'B') letterSamples = '𝓑 𝔅 Ⓑ 𝔹';
    else if (letter === 'C') letterSamples = '𝓒 𝔆 Ⓒ ℂ';
    else if (letter === 'D') letterSamples = '𝓓 𝔇 Ⓓ mathbb{D}';
    else if (letter === 'E') letterSamples = '𝓔 𝔈 Ⓔ 𝔼';
    else if (letter === 'F') letterSamples = '𝓕 𝔉 Ⓕ 𝔽';
    else if (letter === 'G') letterSamples = '𝓖 𝔊 Ⓖ 𝔾';
    else if (letter === 'H') letterSamples = '𝓗 𝔋 Ⓗ ℍ';
    else if (letter === 'I') letterSamples = '𝓘 𝔌 Ⓘ 𝕀';
    else if (letter === 'J') letterSamples = '𝓙 𝔍 Ⓙ 𝕁';
    else if (letter === 'K') letterSamples = '𝓚 𝔎 Ⓚ 𝕂';
    else if (letter === 'L') letterSamples = '𝓛 𝔏 Ⓛ 𝕃';
    else if (letter === 'M') letterSamples = '𝓜 𝔐 Ⓜ 𝕄';
    else if (letter === 'N') letterSamples = '𝓝 𝔑 Ⓝ ℕ';
    else if (letter === 'O') letterSamples = '𝓞 𝔒 Ⓞ 𝕆';
    else if (letter === 'P') letterSamples = '𝓟 𝔓 Ⓟ ℙ';
    else if (letter === 'Q') letterSamples = '𝓠 𝔔 Ⓠ mathbb{Q}';
    else if (letter === 'R') letterSamples = '𝓡 𝔖 Ⓡ ℝ';
    else if (letter === 'S') letterSamples = '𝓢 𝔖 Ⓢ 𝕊';
    else if (letter === 'T') letterSamples = '𝓣 𝔗 Ⓣ 𝕋';
    else if (letter === 'U') letterSamples = '𝓤 𝔘 Ⓤ 𝕌';
    else if (letter === 'V') letterSamples = '𝓥 𝔙 Ⓥ mathbb{V}';
    else if (letter === 'W') letterSamples = '𝓦 𝔚 Ⓦ 𝕎';
    else if (letter === 'X') letterSamples = '𝓧 𝔛 Ⓧ 𝕏';
    else if (letter === 'Y') letterSamples = '𝓨 𝔜 Ⓨ 𝕐';
    else if (letter === 'Z') letterSamples = '𝓩 𝔝 Ⓩ ℤ';
    
    desc = generateDescription(
      'Copy',
      keyword,
      letterSamples,
      `Stylish handwriting, script cursive text, circle letters & gothic characters. One click copy. Works everywhere. No app needed!`
    );
  } else if (relPath.startsWith('names/')) {
    const name = baseName.replace('.html', '');
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    const keyword = `${capitalizedName} fonts copy and paste`.toLowerCase();
    title = generateTitle(
      `${capitalizedName} Fonts Copy and Paste`,
      '🎀',
      '100+ Cute & Fancy Styles'
    );
    // Custom fancy name samples
    const fancySamples = `𝓚𝓪𝔂𝓵𝓪 🎀 🄺🄰🅈🄻🄰`.replace(/Kayla|kayla/g, capitalizedName);
    desc = generateDescription(
      'Get',
      keyword,
      fancySamples,
      `Aesthetic cursive naming styles, cute preppy texts, gothic and bubble letters. One click copy. Works everywhere. No app needed!`
    );
  } else {
    // Catch all for any other page, use title fallback
    const titleMatch = fileContent.match(/<title>([^<]+)<\/title>/);
    const existingTitle = titleMatch ? titleMatch[1] : 'Fancy Text';
    title = generateTitle(
      existingTitle.split('|')[0].split('—')[0].trim(),
      '✦',
      'Fancy Text'
    );
    desc = generateDescription(
      'Browse',
      'cool text symbols and fonts',
      '✦ ★ ❤',
      'Aesthetic symbols, fancy text generators, kaomoji faces, preppy letters. One click copy. Works everywhere. No app needed!'
    );
  }

  // Double check and validate counts
  title = title.substring(0, 60).trim();
  if (desc.length < 140 || desc.length > 155) {
    // Secondary safety correction
    desc = desc.trim();
    if (desc.length > 155) {
      desc = desc.substring(0, 151) + '...';
    }
    if (desc.length < 140) {
      desc = desc.padEnd(140, ' ');
    }
  }

  // Update HTML content
  let updatedContent = fileContent;

  // 1. Update Title Tag
  updatedContent = updatedContent.replace(/<title>[^<]+<\/title>/g, `<title>${title}</title>`);

  // 2. Update Meta Description Tag
  if (updatedContent.includes('<meta name="description"')) {
    updatedContent = updatedContent.replace(/<meta name="description" content="[^"]*"/g, `<meta name="description" content="${desc}"`);
  } else {
    // Inject right after title
    updatedContent = updatedContent.replace(/<\/title>/, `</title>\n  <meta name="description" content="${desc}">`);
  }

  // 3. Update OpenGraph Title & Description
  updatedContent = updatedContent.replace(/<meta property="og:title" content="[^"]*"/g, `<meta property="og:title" content="${title}"`);
  updatedContent = updatedContent.replace(/<meta property="og:description" content="[^"]*"/g, `<meta property="og:description" content="${desc}"`);

  // 4. Update Twitter Title & Description
  updatedContent = updatedContent.replace(/<meta name="twitter:title" content="[^"]*"/g, `<meta name="twitter:title" content="${title}"`);
  updatedContent = updatedContent.replace(/<meta name="twitter:description" content="[^"]*"/g, `<meta name="twitter:description" content="${desc}"`);

  // Write changes back to file if content changed
  if (updatedContent !== fileContent) {
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    return true;
  }
  return false;
}

function traverseDirectory(dir) {
  const files = fs.readdirSync(dir);
  let updatedCount = 0;
  for (let file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (!excludeDirs.includes(file)) {
        updatedCount += traverseDirectory(fullPath);
      }
    } else if (file.endsWith('.html')) {
      if (processHTMLFile(fullPath)) {
        updatedCount++;
      }
    }
  }
  return updatedCount;
}

console.log('Starting full website SEO optimization...');
const totalUpdated = traverseDirectory(rootDir);
console.log(`SEO Optimization complete! Updated Title Tags and Meta Descriptions on ${totalUpdated} pages.`);
