const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://fancysymbols.com';

// Platform-specific symbol packs — high-volume, low-competition keywords
const PLATFORMS = [
  {
    slug: 'instagram-symbols',
    title: 'Symbols for Instagram Bio — Copy Paste Aesthetic Symbols ✦',
    h1: 'Instagram Bio Symbols ✦',
    desc: 'Copy and paste the best symbols for your Instagram bio, captions & stories. Aesthetic, cute, and trendy Unicode symbols that make your profile stand out.',
    keyword: 'instagram symbols',
    intro: 'Make your Instagram profile pop with these hand-picked symbols. From aesthetic sparkles to cute hearts and trendy arrows — copy any symbol with one click and paste it directly into your Instagram bio, captions, or story text.',
    categories: [
      { name: 'Aesthetic', symbols: ['✦', '✧', '⋆', '✨', '⊹', '˚', '·', '⭒', '₊', '˚', '𖦹', '⟡', '✹', '✶', '❋', '❊', '❃', '❂', '❁', '✿'] },
      { name: 'Hearts', symbols: ['♡', '♥', '❤', '❥', '❣', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '❤️‍🔥', '❤️‍🩹', 'ღ', '❦', '❧', '☙', '♡'] },
      { name: 'Stars', symbols: ['⭐', '★', '☆', '✦', '✧', '⋆', '✶', '✴', '✹', '✨', '✡', '❂', '⭑', '⭒', '✪', '✯', '✰', '✵', '✷', '✸'] },
      { name: 'Arrows', symbols: ['→', '←', '↑', '↓', '↗', '↘', '➜', '➤', '➥', '➦', '⇢', '⇥', '⟶', '⟹', '►', '▸', '◂', '◃', '⊳', '⊲'] },
      { name: 'Dividers', symbols: ['┊', '┆', '║', '│', '┃', '╎', '╏', '┇', '┋', '╸', '─', '━', '═', '⸻', '—', '–', '·', '⋯', '…', '~'] },
      { name: 'Flowers', symbols: ['✿', '❀', '✾', '❁', '❃', '❋', '✽', '❊', '⚘', '⊹', '🌸', '🌺', '🌻', '🌷', '🌹', '💐', '🌼', '🏵️', '🌾', '🌿'] },
      { name: 'Sparkles & Magic', symbols: ['✨', '⭐', '🌟', '💫', '✧', '⊹', '˚', '·', '₊', '⭒', '✹', '✶', '❋', '❊', '⟡', '𖦹', '☽', '☾', '✩', '✰'] },
      { name: 'Brackets & Frames', symbols: ['【', '】', '「', '」', '『', '』', '〖', '〗', '〘', '〙', '⟨', '⟩', '⟪', '⟫', '⦗', '⦘', '⌈', '⌉', '⌊', '⌋'] }
    ]
  },
  {
    slug: 'discord-symbols',
    title: 'Discord Symbols — Copy Paste Special Characters & Text Art',
    h1: 'Discord Symbols & Characters',
    desc: 'Copy paste special symbols, text art, and fancy characters for Discord usernames, bios, channel names, and messages. Works everywhere in Discord.',
    keyword: 'discord symbols',
    intro: 'Level up your Discord presence with these special Unicode symbols. Perfect for usernames, server channel names, role dividers, and messages. Every symbol works in Discord without any bots or mods.',
    categories: [
      { name: 'Username Decorations', symbols: ['꧁', '꧂', '☬', '✞', '☠', '⚔', '卍', '☯', '♛', '♕', '❖', '✠', '☦', '⚜', '♚', '♜', '♝', '♞', '♟', '⚒'] },
      { name: 'Channel Dividers', symbols: ['┊', '╏', '│', '║', '┃', '·', '⋮', '⋯', '━', '─', '═', '▬', '▭', '▮', '▯', '◈', '◆', '◇', '◉', '◎'] },
      { name: 'Status Symbols', symbols: ['◉', '◎', '●', '○', '◌', '◯', '◕', '◔', '◑', '◐', '▣', '▢', '◧', '◨', '◩', '◪', '◫', '⬡', '⬢', '⬣'] },
      { name: 'Reactions', symbols: ['(╯°□°)╯', '¯\\_(ツ)_/¯', '( ͡° ͜ʖ ͡°)', '(☞ﾟ∀ﾟ)☞', 'ᕙ(⇀‸↼‶)ᕗ', '(ᵔᴥᵔ)', 'ʕ•ᴥ•ʔ', '(✿◠‿◠)', 'OwO', 'UwU'] },
      { name: 'Gaming', symbols: ['⚔️', '🛡️', '🗡️', '🏹', '🎮', '🕹️', '🎯', '🏆', '🥇', '🥈', '💎', '🔮', '⚡', '🔥', '💀', '☠', '👑', '🃏', '♠', '♣'] },
      { name: 'Aesthetic', symbols: ['✧', '⊹', '₊', '˚', '·', '⭒', '⟡', '☽', '☾', '✦', '⋆', '✶', '❋', '𖦹', '✹', '❃', '❂', '❁', '✿', '✾'] }
    ]
  },
  {
    slug: 'tiktok-symbols',
    title: 'TikTok Symbols — Aesthetic Copy Paste for Bio & Captions ✨',
    h1: 'TikTok Bio Symbols ✨',
    desc: 'Copy paste trendy symbols for your TikTok bio, username, and captions. Aesthetic, cute, and viral Unicode symbols that work on TikTok.',
    keyword: 'tiktok symbols',
    intro: 'Make your TikTok bio go viral with these trending symbols. From aesthetic sparkles to cute hearts — every symbol copies with one click and pastes directly into TikTok. TikTok allows up to 80 characters in bios, so pick your favorites!',
    categories: [
      { name: 'Trending', symbols: ['✦', '✧', '⋆', '✨', '⊹', '˚', '₊', '⭒', '·', '⟡', '𖦹', '☽', '☾', '✩', '✰', '✶', '❋', '✹', '❃', '❊'] },
      { name: 'Cute', symbols: ['♡', '♥', '❤', '🌸', '🌺', '🧸', '🎀', '🩰', '🦋', '🌈', '🍓', '🍒', '🍰', '🧁', '🍭', '🍬', '🎂', '🍪', '🌷', '💐'] },
      { name: 'Dark Aesthetic', symbols: ['☠', '💀', '🖤', '⛓', '🥀', '🔪', '🩸', '🕷', '🕸', '⚰', '🌑', '🌒', '🌘', '🦇', '👁', '🗝', '⚱', '🕯', '☾', '✞'] },
      { name: 'Bio Dividers', symbols: ['·', '•', '┊', '│', '║', '|', '⋆', '✧', '★', '☆', '◦', '○', '●', '◉', '◎', '⊹', '✦', '⊰', '⊱', '~'] },
      { name: 'Vibes', symbols: ['🧿', '🪬', '✨', '🌊', '🌅', '🌄', '🏖', '🌴', '🌙', '🔮', '🧘', '🌿', '🍃', '🦢', '🕊', '🪷', '🫧', '☁️', '🌸', '💫'] }
    ]
  },
  {
    slug: 'roblox-symbols',
    title: 'Roblox Symbols — Cool & Stylish Characters for Display Names ✰',
    h1: 'Roblox Symbols & Characters ✰',
    desc: 'Copy paste cool symbols that work in Roblox display names, chat, and bios. Tested & verified to work in Roblox 2026.',
    keyword: 'roblox symbols',
    intro: 'Find the best symbols that actually work in Roblox! Not all Unicode characters are supported by Roblox — we\'ve tested every symbol below and confirmed they display correctly in display names, chat, and experience descriptions.',
    categories: [
      { name: 'Verified Working', symbols: ['☆', '★', '✦', '✧', '♡', '♥', '→', '←', '↑', '↓', '✓', '✗', '●', '○', '◆', '◇', '■', '□', '▲', '▼'] },
      { name: 'Cool Names', symbols: ['꧁', '꧂', '☬', '⚔', '☯', '♛', '♕', '❖', '✠', '⚜', '★', '✰', '✩', '☠', '⚡', '♠', '♣', '♥', '♦', '✪'] },
      { name: 'Arrows', symbols: ['→', '←', '↑', '↓', '➜', '➤', '⟶', '⟹', '►', '▸', '◂', '◃', '⊳', '⊲', '↗', '↘', '↙', '↖', '⇢', '⇥'] },
      { name: 'Math & Technical', symbols: ['∞', '≠', '≈', '±', '÷', '×', '√', '∑', '∆', 'π', '°', '¹', '²', '³', '⁴', '⁵', '½', '¼', '¾', '%'] }
    ]
  }
];

function generatePage(platform) {
  const symbolGrid = platform.categories.map(cat => `
    <div style="margin-bottom:2rem;">
      <h2 style="font-size:1.3rem; font-weight:700; margin-bottom:0.75rem; color:#0f172a;">${cat.name}</h2>
      <div class="symbol-grid">
        ${cat.symbols.map(s => `<div class="symbol-item" onclick="copyToClipboard('${s.replace(/'/g, "\\'")}', event)">${s}</div>`).join('\n        ')}
      </div>
    </div>
  `).join('\n');

  const faqItems = [
    { q: `How do I copy ${platform.keyword}?`, a: `Simply click on any symbol above and it will be automatically copied to your clipboard. Then paste it wherever you want using Ctrl+V (or Cmd+V on Mac).` },
    { q: `Do these symbols work on ${platform.keyword.split(' ')[0]}?`, a: `Yes! All symbols on this page have been tested and verified to work on ${platform.keyword.split(' ')[0]}. They are standard Unicode characters supported by modern platforms.` },
    { q: `Are these symbols free to use?`, a: `Absolutely! All symbols are part of the Unicode standard and are completely free to use anywhere, with no attribution required.` },
    { q: `Can I use multiple symbols together?`, a: `Yes! You can combine any symbols together to create unique looks. Use our clipboard bar at the bottom to collect multiple symbols before copying them all at once.` }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset='UTF-8'>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${platform.title}</title>
  <meta name="description" content="${platform.desc}">
  <meta name="keywords" content="${platform.keyword}, copy paste symbols, special characters, unicode symbols">
  <link rel="canonical" href="${DOMAIN}/${platform.slug}">
  <meta property="og:title" content="${platform.title}">
  <meta property="og:description" content="${platform.desc}">
  <meta property="og:url" content="${DOMAIN}/${platform.slug}">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="favicon.png" type="image/png">
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css?v=5.4">
  <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>
</head>
<body>
  <header class="header">
    <div class="header-inner">
      <a href="index.html" class="logo"><img src="favicon.png" alt="FancySymbols" width="32" height="32"> FancySymbols</a>
      <nav class="header-nav">
        <a href="index.html">Home</a>
        <a href="all-symbols.html">All Symbols</a>
        <a href="aesthetic-fonts.html">Aesthetic</a>
        <a href="cute-fonts.html">Cute</a>
        <a href="lenny-face.html" class="cta-btn">Lenny Faces</a>
      </nav>
      <button class="menu-toggle" id="menuToggle" aria-label="Open navigation menu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
      </button>
    </div>
  </header>
  <aside class="sidebar" id="sidebar"></aside>
  <div class="sidebar-overlay" id="sidebarOverlay"></div>

  <main class="main-content" style="padding-top: 6rem;">
    <section class="hero" style="text-align:center; padding: 2rem 1rem;">
      <h1 style="font-size:2.2rem; font-weight:800; margin-bottom:0.5rem;">${platform.h1}</h1>
      <p style="color:#64748b; max-width:600px; margin:0 auto 1.5rem;">${platform.intro}</p>
    </section>

    <div style="max-width:800px; margin:0 auto; padding:0 1rem;">
      ${symbolGrid}
    </div>

    <section style="max-width:700px; margin:3rem auto; padding:0 1rem;">
      <h2 style="font-size:1.5rem; font-weight:700; margin-bottom:1rem;">Frequently Asked Questions</h2>
      ${faqItems.map(f => `
      <div class="faq-item">
        <div class="faq-q">${f.q}</div>
        <div class="faq-a">${f.a}</div>
      </div>`).join('\n')}
    </section>

    <footer class="footer">
      <div class="footer-bottom">
        <p class="footer-copy">&copy; 2026 FancySymbols.</p>
      </div>
    </footer>
  </main>

  <div id="toast" class="toast"></div>
  <script src="script.js?v=5.4"></script>
</body>
</html>`;
}

// Generate all platform pages
PLATFORMS.forEach(platform => {
  const filePath = path.join(__dirname, `${platform.slug}.html`);
  fs.writeFileSync(filePath, generatePage(platform));
  console.log(`✅ Generated: ${platform.slug}.html`);
});

console.log(`\n🎯 Total platform pages generated: ${PLATFORMS.length}`);
