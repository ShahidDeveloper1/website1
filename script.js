// ===== FANCY SYMBOLS - MAIN SCRIPT =====
document.documentElement.classList.add('js-ready');


// ===== CLIPBOARD BAR MANAGER =====
const ClipboardManager = window.ClipboardManager = {
  symbols: [],
  barEl: null,
  containerEl: null,

  init() {
    this.bar = document.getElementById('clipboard-bar');
    if (!this.bar) {
      this.bar = document.createElement('div');
      this.bar.id = 'clipboard-bar';
      document.body.appendChild(this.bar);
    }
    
    this.barEl = this.bar; 
    this.bar.innerHTML = `
      <div class="clipboard-content">
        <span class="clipboard-title">COPIED</span>
        <div class="clipboard-symbols" id="clipboard-symbols-container"></div>
      </div>
      <div class="clipboard-actions">
        <button class="clipboard-btn clipboard-clear-btn" onclick="ClipboardManager.clear()">Clear</button>
        <button class="clipboard-btn clipboard-copy-btn" onclick="ClipboardManager.copyAll()">Copy All</button>
      </div>
    `;
    this.containerEl = document.getElementById('clipboard-symbols-container');
  },

  add(symbol) {
    if (!symbol || symbol.length > 500) return;
    this.symbols.push(symbol);
    this.render();
    this.show();
  },

  clear() {
    this.symbols = [];
    this.render();
    this.barEl.classList.remove('show');
  },

  copyAll() {
    if (this.symbols.length === 0) return;
    const allText = this.symbols.join('');
    const performCopy = (text) => {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      showToast('✓ Copied ' + this.symbols.length + ' symbols!');
      document.body.removeChild(ta);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(allText).then(() => {
        showToast('✓ Copied ' + this.symbols.length + ' symbols!');
      }).catch(() => performCopy(allText));
    } else {
      performCopy(allText);
    }
  },

  render() {
    if (!this.containerEl) return;
    this.containerEl.innerHTML = '';
    this.symbols.forEach(sym => {
      const item = document.createElement('div');
      item.className = 'clipboard-symbol-item';
      item.textContent = sym;
      this.containerEl.appendChild(item);
    });
    this.containerEl.scrollLeft = this.containerEl.scrollWidth;
  },

  show() {
    if (this.symbols.length > 0 && this.barEl) {
      this.barEl.classList.add('show');
    }
  }
};

// ===== TOAST NOTIFICATIONS =====
let toastTimeout;
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  clearTimeout(toastTimeout);
  toast.classList.add('show');
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 1800);
}

// ===== COPY TO CLIPBOARD =====
function copyToClipboard(text, event) {
  ClipboardManager.add(text);
  
  // Luxury Burst Effect
  if (event) {
    const burst = document.createElement('div');
    burst.className = 'burst';
    burst.style.left = `${event.pageX}px`;
    burst.style.top = `${event.pageY}px`;
    document.body.appendChild(burst);
    setTimeout(() => burst.remove(), 600);
  }
  
  const performCopy = (val) => {
    const ta = document.createElement('textarea');
    ta.value = val;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('✓ Copied to clipboard!');
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('✓ Copied to clipboard!');
    }).catch(() => performCopy(text));
  } else {
    performCopy(text);
  }
}

// ===== SIDEBAR NAVIGATION =====
function renderSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;
  const isSubdir = window.location.pathname.includes('/pages/') || window.location.pathname.includes('/symbols/');
  const root = isSubdir ? '../' : '';

  const categories = [
    { n: 'Aesthetic', f: 'aesthetic', i: '✧' },
    { n: 'Animal', f: 'animal', i: '🐾' },
    { n: 'Arrow', f: 'arrow', i: '➶' },
    { n: 'Award', f: 'award', i: '🏆' },
    { n: 'Border', f: 'border', i: '╔' },
    { n: 'Bracket', f: 'bracket', i: '【' },
    { n: 'Bubble', f: 'bubble', i: 'ⓐ' },
    { n: 'Card', f: 'card', i: '♠' },
    { n: 'Check Mark', f: 'checkmark', i: '✔️' },
    { n: 'Chess', f: 'chess', i: '♚' },
    { n: 'Chinese', f: 'chinese', i: '愛' },
    { n: 'Circle', f: 'circle', i: '○' },
    { n: 'Comparison', f: 'comparison', i: '≥' },
    { n: 'Copyright', f: 'copyright', i: '©' },
    { n: 'Corner', f: 'corner', i: '╚' },
    { n: 'Cross', f: 'cross', i: '✝' },
    { n: 'Crown', f: 'crown', i: '👑' },
    { n: 'Crypto', f: 'crypto', i: '₿' },
    { n: 'Currency', f: 'currency', i: '$' },
    { n: 'Cursive', f: 'cursive', i: '𝒜' },
    { n: 'Diamond', f: 'diamond', i: '◆' },
    { n: 'Dice', f: 'dice', i: '🎲' },
    { n: 'Divider', f: 'divider', i: '┊' },
    { n: 'Dot', f: 'dot', i: '•' },
    { n: 'Down Arrow', f: 'downarrow', i: '↓' },
    { n: 'Smiley Face', f: 'emoji-faces', i: '🥰' },
    { n: 'Flower', f: 'flower', i: '✿' },
    { n: 'Fraction', f: 'fraction', i: '½' },
    { n: 'Gender', f: 'gender', i: '⚥' },
    { n: 'German', f: 'german', i: 'ß' },
    { n: 'Greek', f: 'greek', i: 'Ω' },
    { n: 'Hand', f: 'hand', i: '✌️' },
    { n: 'Heart', f: 'heart', i: '❤️' },
    { n: 'House', f: 'house', i: '🏠' },
    { n: 'Infinity', f: 'infinity', i: '∞' },
    { n: 'Japanese', f: 'japanese', i: 'あ' },
    { n: 'Korean', f: 'korean', i: 'ㅿ' },
    { n: 'Line', f: 'line', i: '│' },
    { n: 'Loading', f: 'loading', i: '▓' },
    { n: 'Lock', f: 'lock', i: '🔒' },
    { n: 'Math', f: 'math', i: '∑' },
    { n: 'Medical', f: 'medical', i: '⚕' },
    { n: 'Moon', f: 'moon', i: '☾' },
    { n: 'Music', f: 'music', i: '🎵' },
    { n: 'Numbers', f: 'numbers', i: '①' },
    { n: 'Office', f: 'office', i: '💼' },
    { n: 'Old English', f: 'old-english', i: '𝔄' },
    { n: 'Punctuation', f: 'punctuation', i: '!' },
    { n: 'Quotation', f: 'quotation', i: '❝' },
    { n: 'Rectangle', f: 'rectangle', i: '█' },
    { n: 'Religion', f: 'religion', i: '✝' },
    { n: 'Roman Numerals', f: 'roman', i: 'Ⅳ' },
    { n: 'Sparkle', f: 'sparkle', i: '✨' },
    { n: 'Square', f: 'square', i: '⬛' },
    { n: 'Star', f: 'star', i: '⭐' },
    { n: 'Sun', f: 'sun', i: '☀' },
    { n: 'Transport', f: 'transport', i: '🚗' },
    { n: 'Triangle', f: 'triangle', i: '▲' },
    { n: 'Unit', f: 'unit', i: '℃' },
    { n: 'Up Arrow', f: 'uparrow', i: '↑' },
    { n: 'Upside Down', f: 'upside-down', i: 'ʇ' },
    { n: 'Warning', f: 'warning', i: '⚠️' },
    { n: 'Wave', f: 'wave', i: '〰' },
    { n: 'Weapon', f: 'weapon', i: '⚔️' },
    { n: 'Weather', f: 'weather', i: '🌤' },
    { n: 'Writing', f: 'writing', i: '✍️' },
    { n: 'Zodiac', f: 'zodiac', i: '♈' }
  ];

  const popularSet = new Set(['heart', 'star', 'aesthetic', 'hand', 'arrow', 'zodiac', 'currency', 'math', 'emoji-faces']);
  const populars = categories.filter(c => popularSet.has(c.f));

  sidebar.innerHTML = `
  <div class="sidebar-section">
    <div class="sidebar-title">NAVIGATION</div>
    <div class="sidebar-links">
      <a href="${root || '/'}"><span class="link-icon">🏠</span> Home</a>
      <a href="${root}all-symbols"><span class="link-icon">🚀</span> All Symbols</a>
      <a href="${root}cute-fonts"><span class="link-icon">🌸</span> Cute Fonts</a>
      <a href="${root}aesthetic-fonts"><span class="link-icon">✨</span> Aesthetic Fonts</a>
      <a href="${root}preppy-fonts"><span class="link-icon">🎀</span> Preppy Font Generator</a>
      <a href="${root}font-generator"><span class="link-icon">𝕱</span> Fancy Text Generator</a>
      <a href="${root}lenny-face"><span class="link-icon">( ͡° ͜ʖ ͡°)</span> Lenny Faces</a>
    </div>
  </div>

  <div class="sidebar-section">
    <div class="sidebar-title">SYMBOLS FOR</div>
    <div class="sidebar-links">
      <a href="${root}instagram-symbols"><span class="link-icon">📸</span> Instagram Symbols</a>
      <a href="${root}discord-symbols"><span class="link-icon">🎮</span> Discord Symbols</a>
      <a href="${root}tiktok-symbols"><span class="link-icon">🎵</span> TikTok Symbols</a>
      <a href="${root}roblox-symbols"><span class="link-icon">🎲</span> Roblox Symbols</a>
    </div>
  </div>

  <div class="sidebar-section">
    <div class="sidebar-title">TEXT TOOLS</div>
    <div class="sidebar-links">
      <a href="${root}bio-generator"><span class="link-icon">📝</span> Bio Generator</a>
      <a href="${root}username-generator"><span class="link-icon">✧</span> Username Generator</a>
      <a href="${root}character-counter"><span class="link-icon">📊</span> Character Counter</a>
      <a href="${root}strikethrough-text"><span class="link-icon">━</span> Strikethrough Text</a>
      <a href="${root}emoticons"><span class="link-icon">😊</span> Emoticons & Kaomoji</a>
      <a href="${root}invisible-character"><span class="link-icon">👻</span> Invisible Character</a>
      <a href="${root}blank-space"><span class="link-icon">📋</span> Blank Space</a>
      <a href="${root}bullet-point"><span class="link-icon">•</span> Bullet Points</a>
      <a href="${root}free-fire-name"><span class="link-icon">🔥</span> Free Fire Names</a>
      <a href="${root}zalgo-text"><span class="link-icon">Z̷</span> Zalgo Text</a>
      <a href="${root}text-repeater"><span class="link-icon">🔁</span> Text Repeater</a>
      <a href="${root}small-text"><span class="link-icon">ᵗ</span> Small Text</a>
      <a href="${root}bold-text"><span class="link-icon">𝗕</span> Bold Text</a>
      <a href="${root}morse-code"><span class="link-icon">·-</span> Morse Code</a>
      <a href="${root}cursive-text"><span class="link-icon">𝒞</span> Cursive Text</a>
      <a href="${root}upside-down-text"><span class="link-icon">ʇ</span> Upside Down Text</a>
      <a href="${root}vaporwave-text"><span class="link-icon">Ｖ</span> Vaporwave Text</a>
      <a href="${root}bubble-text"><span class="link-icon">ⓑ</span> Bubble Text</a>
      <a href="${root}gothic-text"><span class="link-icon">𝔊</span> Gothic Text</a>
    </div>
  </div>
  
  <div class="sidebar-section">
    <div class="sidebar-title">TRENDING NOW</div>
    <div class="sidebar-links">
      ${populars.map(c => `<a href="${root}symbols/${c.f}"><span class="link-icon">${c.i}</span> ${c.n}</a>`).join('')}
    </div>
  </div>

  <div class="sidebar-section">
    <div class="sidebar-title">ALL CATEGORIES</div>
    <div class="sidebar-links">
      ${categories.map(c => `<a href="${root}symbols/${c.f}"><span class="link-icon">${c.i}</span> ${c.n}</a>`).join('')}
    </div>
  </div>

  <div class="sidebar-section">
    <div class="sidebar-title">SITE INFO</div>
    <div class="sidebar-links">
      <a href="${root}pages/privacy"><span class="link-icon">🛡️</span> Privacy Policy</a>
      <a href="${root}pages/terms"><span class="link-icon">📄</span> Terms of Service</a>
    </div>
  </div>
  `;
}

function initSidebar() {
  renderSidebar();
  const toggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  
  // Highlight active link
  const currentPath = window.location.pathname;
  const links = document.querySelectorAll('.sidebar-links a');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (href === '/' && currentPath === '/') || (currentPath.includes(href) && href !== '/')) {
      link.classList.add('active');
    }
  });

  if (toggle) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('show');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('show');
    });
  }
}

// ===== CLICK-TO-COPY LOGIC =====
function initCopyable() {
  document.addEventListener('click', (e) => {
    const target = e.target.closest('.symbol-item, .lenny-item, .combo-item');
    if (!target) return;
    
    let text = target.textContent.trim();
    if (target.classList.contains('combo-item')) {
      text = target.querySelector('.combo-text')?.textContent.trim() || text;
    }
    
    copyToClipboard(text, e);
    target.classList.add('copied');
    setTimeout(() => target.classList.remove('copied'), 800);
  });
}

// ===== SEARCH FILTER =====
// ===== SMART GLOBAL SEARCH =====
const CATEGORY_SYMBOLS = {
  aesthetic: ["✧", "✦", "✨", "≛", "ೃ", "࿔", "࿐", "🪐", "🧸", "🩰", "🦢", "🕯️", "🥂", "🎬"],
  animal: ["🐾", "🐱", "🐶", "🦊", "🦁", "🐯", "🐼", "🐻", "🐨", "🐰", "🐭", "🐹", "🐸", "🐔", "🦄", "🐝", "🦋", "🐙", "🐬", "🐳"],
  arrow: ["→", "←", "↑", "↓", "↔", "↕", "↖", "↗", "↘", "↙", "↚", "↛", "↞", "↠", "↢", "↣", "↩", "↪", "↫", "↬", "↯", "➔", "➜", "➤"],
  award: ["🏆", "🏅", "🥇", "🥈", "🥉", "👑", "✨", "⭐", "🎖️", "🎫", "🎬"],
  border: ["╔", "╗", "╚", "╝", "═", "║", "╠", "╣", "╦", "╩", "╬", "╒", "╓", "╕", "╖", "╘", "╙", "╛", "╜", "╞", "╟"],
  bracket: ["【", "】", "〔", "〕", "《", "》", "「", "」", "『", "』", "【", "】", "〖", "〗", "（", "）", "［", "］", "｛", "｝"],
  bubble: ["ⓐ", "ⓑ", "ⓒ", "ⓓ", "ⓔ", "ⓕ", "ⓖ", "ⓗ", "ⓘ", "ⓙ", "ⓚ", "ⓛ", "ⓜ", "ⓝ", "ⓞ", "ⓟ", "ⓠ", "ⓡ", "ⓢ", "ⓣ", "ⓤ", "ⓥ", "ⓦ", "ⓧ", "ⓨ", "ⓩ"],
  card: ["♠", "♥", "♦", "♣", "♤", "♡", "♢", "♧", "🃏", "🀄", "🎴"],
  checkmark: ["✔️", "✅", "☑", "✓", "✔", "✗", "✘", "✕", "✖"],
  chess: ["♚", "♛", "♜", "♝", "♞", "♟", "♔", "♕", "♖", "♗", "♘", "♙"],
  chinese: ["愛", "友", "福", "吉", "和", "康", "美", "忍", "勇", "力", "心", "龍", "虎", "鳳", "生", "死", "陰", "陽"],
  circle: ["○", "●", "🔴", "🔵", "⚫", "⚪", "🔘", "⊙", "⊚", "⊕", "⊖", "⊗", "⊘"],
  comparison: ["≥", "≤", "≠", "≈", "≡", "≒", "≓", "≣", "≮", "≯", "≰", "≱", "≲", "≳", "≴", "≵"],
  copyright: ["©", "®", "™", "℠", "℗", "🄫", "🄬"],
  corner: ["╚", "╗", "╝", "╔", "╘", "╙", "╛", "╜", "╞", "╟", "╠", "╣", "╦", "╩", "╬"],
  cross: ["†", "✟", "✙", "✞", "✟", "✠", "✝", "☨", "☦", "☩", "☫", "☬", "✝️"],
  crown: ["👑", "♕", "♔", "♛", "♚", "🃎", "🃚"],
  crypto: ["₿", "Ξ", "₳", "🪙", "💳", "💰", "💵", "💸"],
  currency: ["$", "€", "£", "¥", "₿", "₹", "₱", "₩", "₫", "₭", "₮", "₯", "₰", "₲", "₳", "₴", "₵", "₸", "₽"],
  cursive: ["𝒜", "ℬ", "𝒞", "𝒯", "𝒰", "𝒱", "𝒲", "𝒳", "𝒴", "𝒵", "as", "bs", "cs", "ds", "es", "fs", "gs", "hs", "is", "js"],
  diamond: ["◆", "◇", "❖", "💎", "🔸", "🔹", "🔶", "🔷", "💠", "⬖", "⬗"],
  dice: ["🎲", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"],
  divider: ["┊", "❃", "━", "═", "─", "───", "━━━━", "┈┈┈┈", "╌╌╌╌"],
  dot: ["•", "⊙", "◘", "◦", "∙", "☉", "⁕", "·", "․", "‥", "…"],
  downarrow: ["↓", "▼", "⬇️", "🔽", "↯", "↴", "↳", "↧", "⇓", "⇩", "👇"],
  "emoji-faces": ["😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🥰", "😍", "🤩", "😘", "😎", "🤓", "🥺", "😭", "😡", "😈", "💀"],
  flower: ["✿", "🌸", "🌹", "🌺", "🌻", "🌼", "💮", "🏵️", "🌷", "🌱", "🌿", "🌾", "🍃", "🍂", "🍁", "🍀", "☘️", "🌲", "🌳"],
  fraction: ["½", "¼", "¾", "⅓", "⅔", "⅕", "⅖", "⅗", "⅘", "⅙", "⅚", "⅛", "⅜", "⅝", "⅞", "⅟"],
  gender: ["⚥", "♀", "♂", "⚧", "⚢", "⚣", "⚤", "⚦", "⚧", "⚨", "⚩", "⚪", "⚫", "🟪", "🟦", "🟥"],
  german: ["ß", "ä", "ö", "ü", "Ä", "Ö", "Ü"],
  greek: ["Ω", "α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι", "κ", "λ", "μ", "ν", "ξ", "ο", "π", "ρ", "σ", "τ", "υ", "φ", "χ", "ψ", "ω"],
  hand: ["✌️", "✍️", "✊", "✋", "👉", "👈", "👆", "👇", "🖕", "👍", "👎", "👊", "🤛", "🤜", "👏", "🙌", "👐", "🤲", "🤝", "🙏"],
  heart: ["❤️", "♡", "♥", "❣", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "💌", "❤️‍🔥", "❤️‍🩹", "❥", "ღ", "❦", "❧", "☙"],
  house: ["🏠", "🏡", "🏢", "🏫", "🏰", "🏯", "⛩️", "⛪", "🏩", "🏨"],
  infinity: ["∞", "♾"],
  japanese: ["あ", "イ", "う", "え", "お", "か", "き", "く", "け", "こ", "さ", "し", "す", "せ", "そ", "の", "に", "は", "を", "ん"],
  korean: ["ㅿ", "ㅂ", "ㄷ", "ㄱ", "ㄴ", "ㅁ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"],
  line: ["│", "┃", "─", "━", "┄", "┅", "┆", "┇", "┈", "┉", "┊", "┋"],
  loading: ["▓", "▒", "░", "█", "▄", "▀", "▌", "▐", "▰", "▱", "▲", "△", "🔌", "🔋"],
  lock: ["🔒", "🔓", "🔑", "🗝", "🔐", "🔏", "🛡️", "👮", "🧱"],
  math: ["+", "-", "×", "÷", "=", "≠", "≈", "∞", "√", "∑", "∆", "∏", "±", "≤", "≥", "∂", "∫", "¬", "▲", "▼", "∠", "⊥"],
  medical: ["⚕", "⚕", "➕", "🏥", "🚑", "🩺", "💊", "💉", "🩸", "🩹", "🧬", "🧪", "🌡️", "😷"],
  moon: ["☾", "☽", "🌙", "🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"],
  music: ["🎵", "🎶", "♪", "♫", "🎼", "🎹", "🎸", "🎻", "🎺", "🎷", "🎧", "📻"],
  numbers: ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩", "❶", "❷", "❸", "❹", "❺", "❻", "❼", "❽", "❾", "❿"],
  office: ["💼", "📁", "📝", "📂", "🗂", "📊", "📈", "📉", "📄", "📃", "📅", "📆", "📐", "📏", "📎"],
  "old-english": ["🔤", "𝔄", "𝔅", "𝔍", "𝔎", "𝔏", "𝔐", "𝔑", "𝔒", "𝔓", "𝔔", "𝔕", "𝔖", "𝔗", "𝔘", "𝔙", "𝔚", "𝔛", "𝔜"],
  punctuation: ["!", "?", "&", "@", "#", "$", "%", "^", "*", "(", ")", "_", "+", "-", "=", "[", "]"],
  quotation: ["❝", "❞", "“", "”", "‘", "’", "«", "»", "‹", "›"],
  rectangle: ["█", "▄", "▀", "▌", "▐", "▬", "▭", "▮", "▯", "▰", "▱"],
  religion: ["✝", "☪", "🕉", "☸", "✡", "⛪", "🕌", "🛕", "🕍", "⛩️", "🕊️"],
  roman: ["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ", "Ⅵ", "Ⅶ", "Ⅷ", "Ⅸ", "Ⅹ", "Ⅺ", "Ⅻ", "Ⅼ", "Ⅽ", "Ⅾ", "Ⅿ"],
  sparkle: ["✨", "✦", "≛", "❇", "❈", "❊", "❉", "❋", "✺", "✹", "✸", "✷", "✶", "✴", "✵", "🌠", "🌟", "⭐"],
  square: ["■", "□", "▢", "▣", "▤", "▥", "▦", "▧", "▨", "▩", "▪", "▫"],
  star: ["★", "⭐", "☆", "✦", "✧", "⋆", "✶", "✴", "✹", "✨", "✡", "❂", "🌌", "🌠", "🌟", "☄️", "✪", "✫", "✬", "✭", "✮", "✯", "✰"],
  sun: ["☀️", "☼", "☀", "☉", "🌞", "🌅", "🌄", "🏜️", "🔆", "🌡️"],
  transport: ["🚗", "🚲", "✈️", "🚢", "🚆", "🚁", "🚀", "🛸", "🛵", "🏍️"],
  triangle: ["▲", "▼", "▵", "▿", "◄", "►", "◀", "▶", "▲", "▼", "◤", "◥", "◣", "◢"],
  unit: ["℃", "℉", "°", "‰", "‱", "㏜", "㏉", "㏈", "㏕", "㎡", "㎥", "㎞"],
  uparrow: ["↑", "▲", "⬆️", "🔼", "⇪", "⇫", "⇬", "⇭", "⇮", "⇯", "👆"],
  "upside-down": ["ʇ", "ɐ", "ɥ", "ɔ", "ɟ", "ƃ", "ᴉ", "ɾ", "ʞ", "l", "ɯ", "u", "o", "d", "b", "ɹ", "s", "ʇ", "n", "ʌ", "ʍ", "x", "ʎ", "z"],
  warning: ["⚠️", "🛈", "🚨", "⛔", "🚫", "❌", "🚫", "⚡"],
  wave: ["〰", "🌊", "♒", "∽", "≈", "≋", "∿"],
  weapon: ["⚔️", "🛡", "🔫", "🏹", "🔪", "🗡", "bomb"],
  weather: ["🌤", "☀️", "🌧", "❄️", "⚡", "☁️", "⛈", "🌪", "💧", "💦", "☔"],
  writing: ["✍️", "✏️", "✒️", "📝", "🗒", "🖍", "🖌️", "🎨", "📚"],
  zodiac: ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓", "☉", "☽", "☿", "♀", "♂"]
};

const SEARCH_ALIASES = {
  "zodiac": "zodiac", "horoscope": "zodiac", "astrology": "zodiac", "aries": "zodiac", "taurus": "zodiac", "gemini": "zodiac", "cancer": "zodiac", "leo": "zodiac", "virgo": "zodiac", "libra": "zodiac", "scorpio": "zodiac", "sagittarius": "zodiac", "capricorn": "zodiac", "aquarius": "zodiac", "pisces": "zodiac",
  "heart": "heart", "hearts": "heart", "love": "heart", "romance": "heart", "romantic": "heart", "valentines": "heart", "like": "heart",
  "star": "star", "stars": "star", "sparkle": "sparkle", "sparkles": "sparkle", "shine": "star", "shiny": "star", "space": "star", "galaxy": "star", "planet": "star",
  "sun": "sun", "solar": "sun", "day": "sun", "moon": "moon", "lunar": "moon", "night": "moon", "weather": "weather", "rain": "weather", "cloud": "weather", "clouds": "weather", "snow": "weather", "wind": "weather", "temp": "weather", "storm": "weather", "sky": "weather",
  "cross": "cross", "christian": "cross", "religion": "religion", "jesus": "cross", "god": "cross", "church": "religion", "mosque": "religion", "temple": "religion",
  "flower": "flower", "flowers": "flower", "rose": "flower", "sakura": "flower", "plant": "flower", "leaf": "flower", "leaves": "flower", "tree": "flower", "garden": "flower",
  "crown": "crown", "king": "crown", "queen": "crown", "royal": "crown", "royalty": "crown",
  "chess": "chess", "rook": "chess", "knight": "chess", "bishop": "chess", "pawn": "chess",
  "card": "card", "cards": "card", "spade": "card", "spades": "card", "club": "card", "clubs": "card", "diamond": "diamond", "diamonds": "diamond", "poker": "card", "casino": "card",
  "checkmark": "checkmark", "check": "checkmark", "tick": "checkmark", "yes": "checkmark", "correct": "checkmark", "ok": "checkmark", "approve": "checkmark", "done": "checkmark",
  "warning": "warning", "caution": "warning", "danger": "warning", "alert": "warning", "error": "warning", "info": "warning",
  "arrow": "arrow", "arrows": "arrow", "direction": "arrow", "pointer": "arrow", "left": "arrow", "right": "arrow", "up": "uparrow", "down": "downarrow",
  "math": "math", "mathematics": "math", "plus": "math", "minus": "math", "equal": "math", "divide": "math", "multiply": "math", "sum": "math", "fraction": "fraction", "fractions": "fraction", "percent": "fraction",
  "number": "numbers", "numbers": "numbers", "digit": "numbers", "digits": "numbers", "roman": "roman", "numerals": "roman",
  "money": "currency", "cash": "currency", "dollar": "currency", "euro": "currency", "pound": "currency", "yen": "currency", "crypto": "crypto", "bitcoin": "crypto", "currency": "currency",
  "animal": "animal", "animals": "animal", "paw": "animal", "dog": "animal", "cat": "animal", "fox": "animal", "pet": "animal", "pets": "animal",
  "music": "music", "song": "music", "songs": "music", "note": "music", "notes": "music", "melody": "music", "sound": "music", "audio": "music", "sing": "music",
  "bullet": "dot", "point": "dot", "dots": "dot", "pointy": "dot", "list": "dot",
  "bracket": "bracket", "brackets": "bracket", "parenthesis": "bracket", "parentheses": "bracket",
  "line": "line", "lines": "line", "border": "border", "borders": "border", "corner": "corner", "corners": "corner", "divider": "divider", "dividers": "divider",
  "smiley": "emoji-faces", "smileys": "emoji-faces", "emoji": "emoji-faces", "emojis": "emoji-faces", "face": "emoji-faces", "faces": "emoji-faces", "happy": "emoji-faces", "laugh": "emoji-faces",
  "dice": "dice", "game": "dice", "roll": "dice", "play": "dice", "boardgame": "dice",
  "loading": "loading", "progress": "loading", "block": "rectangle", "blocks": "rectangle", "rectangle": "rectangle", "square": "square", "triangle": "triangle", "circle": "circle",
  "house": "house", "home": "house", "building": "house", "office": "office", "work": "office", "job": "office",
  "award": "award", "trophy": "award", "medal": "award", "winner": "award", "first": "award",
  "lock": "lock", "key": "lock", "secure": "lock", "security": "lock", "private": "lock", "safety": "lock",
  "weapon": "weapon", "sword": "weapon", "swords": "weapon", "gun": "weapon", "guns": "weapon", "shield": "weapon", "fight": "weapon", "battle": "weapon",
  "transport": "transport", "car": "transport", "cars": "transport", "plane": "transport", "flight": "transport", "ship": "transport", "travel": "transport",
  "medical": "medical", "doctor": "medical", "hospital": "medical", "health": "medical", "medicine": "medical",
  "writing": "writing", "write": "writing", "pencil": "writing", "pen": "writing", "book": "writing", "read": "writing"
};

function initSearch() {
  const searchBox = document.getElementById('searchBox');
  if (!searchBox) return;

  let resultsSection = document.getElementById('searchResultsSection');
  let resultsGrid = document.getElementById('searchResultsGrid');

  // Dynamically self-heal and inject search results container if missing on the page (e.g. all-symbols.html)
  if (!resultsSection || !resultsGrid) {
    resultsSection = document.createElement('section');
    resultsSection.id = 'searchResultsSection';
    resultsSection.className = 'search-results-section';
    resultsSection.style.display = 'none';
    resultsSection.style.marginBottom = '3rem';
    
    resultsSection.innerHTML = `
      <div class="section-title">
        <span class="icon">🔍</span> Search Results
        <span class="line"></span>
      </div>
      <div id="searchResultsGrid" class="symbol-grid"></div>
    `;
    
    const searchContainer = searchBox.closest('.search-container');
    if (searchContainer) {
      searchContainer.parentNode.insertBefore(resultsSection, searchContainer.nextSibling);
      resultsGrid = document.getElementById('searchResultsGrid');
    }
  }

  const mainContent = document.querySelector('.main-content');
  if (!mainContent || !resultsSection || !resultsGrid) return;

  // Generic selector: hide all children of .main-content except the search bar, header, and search results
  const siblingsToHide = Array.from(mainContent.children).filter(el => {
    return !el.classList.contains('page-header') && 
           !el.classList.contains('search-container') && 
           !el.classList.contains('hero') && 
           !el.classList.contains('back-link') &&
           el.id !== 'searchResultsSection';
  });

  searchBox.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    if (query.length > 0) {
      siblingsToHide.forEach(sec => sec.style.display = 'none');
      resultsSection.style.display = 'block';
      resultsGrid.innerHTML = '';

      let results = [];

      // 1. Stage 1: Smart Keyword Aliases & Category lookup
      const matchedCategories = new Set();
      for (const [kw, catKey] of Object.entries(SEARCH_ALIASES)) {
        if (kw === query || (query.length >= 3 && (kw.includes(query) || query.includes(kw)))) {
          matchedCategories.add(catKey);
        }
      }

      matchedCategories.forEach(catKey => {
        const symbols = CATEGORY_SYMBOLS[catKey];
        if (symbols) {
          results = [...results, ...symbols];
        }
      });

      // 2. Stage 2: Direct Category Key substring match
      for (const [key, icons] of Object.entries(CATEGORY_SYMBOLS)) {
        if (key.includes(query) || query.includes(key)) {
          results = [...results, ...icons];
        }
      }

      // 3. Stage 3: Section Title matching on current page (e.g. all-symbols.html)
      const sections = Array.from(document.querySelectorAll('.main-content > .section-title, .main-content > h2, .main-content > h3'));
      sections.forEach(sec => {
        if (sec.textContent.toLowerCase().includes(query)) {
          let next = sec.nextElementSibling;
          while (next && !next.classList.contains('symbol-grid') && !next.classList.contains('combo-grid') && !next.classList.contains('section-title')) {
            next = next.nextElementSibling;
          }
          if (next && (next.classList.contains('symbol-grid') || next.classList.contains('combo-grid'))) {
            const items = next.querySelectorAll('.symbol-item, .combo-item, .lenny-item');
            items.forEach(item => {
              const char = item.classList.contains('combo-item') ? (item.querySelector('.combo-text')?.textContent || item.textContent) : item.textContent;
              if (!results.includes(char)) results.push(char.trim());
            });
          }
        }
      });

      // 4. Stage 4: Individual symbol/combo substring match
      const allItems = Array.from(document.querySelectorAll('.symbol-item, .combo-item, .lenny-item'));
      allItems.forEach(item => {
        if (item.textContent.toLowerCase().includes(query)) {
          const char = item.classList.contains('combo-item') ? (item.querySelector('.combo-text')?.textContent || item.textContent) : item.textContent;
          if (!results.includes(char)) results.push(char.trim());
        }
      });

      // 5. Render results as luxury, animated tiles
      if (results.length > 0) {
        const unique = [...new Set(results)].slice(0, 150);
        unique.forEach(char => {
          const div = document.createElement('div');
          div.className = 'symbol-item reveal';
          div.textContent = char;
          resultsGrid.appendChild(div);
        });
      } else {
        resultsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #64748b;">No symbols found for "${query}". Try "heart", "star", "flower", or "checkmark".</p>`;
      }
    } else {
      resultsSection.style.display = 'none';
      siblingsToHide.forEach(sec => sec.style.display = '');
    }
  });
}

// ===== FONT GENERATOR =====
function initFontGenerator() {
  const input = document.getElementById('fontInput');
  const results = document.getElementById('fontResults');
  if (!input || !results) return;

  const fontMaps = {
    bold: { 
      'a':'𝗮','b':'𝗯','c':'𝗰','d':'𝗱','e':'𝗲','f':'𝗳','g':'𝗴','h':'𝗵','i':'𝗶','j':'𝗷','k':'𝗸','l':'𝗹','m':'𝗺','n':'𝗻','o':'𝗼','p':'𝗽','q':'𝗾','r':'𝗿','s':'𝘀','t':'𝘁','u':'𝘂','v':'𝘃','w':'𝘄','x':'𝘅','y':'𝘆','z':'𝘇',
      'A':'𝗔','B':'𝗕','C':'𝗖','D':'𝗗','E':'𝗘','F':'𝗙','G':'𝗚','H':'𝗛','I':'𝗜','J':'𝗝','K':'𝗞','L':'𝗟','M':'𝗠','N':'𝗡','O':'𝗢','P':'𝗣','Q':'𝗤','R':'𝗥','S':'𝗦','T':'𝗧','U':'𝗨','V':'𝗩','W':'𝗪','X':'𝗫','Y':'𝗬','Z':'𝗭' 
    },
    italic: { 
      'a':'𝘢','b':'𝘣','c':'𝘤','d':'𝘥','e':'𝘦','f':'𝘧','g':'𝘨','h':'𝘩','i':'𝘪','j':'𝘫','k':'𝘬','l':'𝘭','m':'𝘮','n':'𝘯','o':'𝘰','p':'𝘱','q':'𝘲','r':'𝘳','s':'𝘴','t':'𝘵','u':'𝘶','v':'𝘷','w':'𝘸','x':'𝘹','y':'𝘺', 'z':'𝘻',
      'A':'𝘈','B':'𝘉','C':'𝘊','D':'𝘋','E':'𝘌','F':'𝘍','G':'𝘎','H':'𝘏','I':'𝘐','J':'𝘑','K':'𝘒','L':'𝘓','M':'𝘔','N':'𝘕', 'O':'𝘖','P':'𝘗','Q':'𝘘','R':'𝘙','S':'𝘚','T':'𝘛','U':'𝘜','V':'𝘝','W':'𝘞','X':'𝘟','Y':'𝘠','Z':'𝘡' 
    },
    gothic: { 
      'a':'𝔞','b':'𝔟','c':'𝔠','d':'𝔡','e':'𝔢','f':'𝔣','g':'𝔤','h':'𝔥','i':'𝔦', 'j':'𝔧','k':'𝔨', 'l':'𝔩','m':'𝔪','n':'𝔫','o':'𝔬','p':'𝔭','q':'𝔮','r':'𝔯','s':'𝔰','t':'𝔱','u':'𝔲','v':'𝔳','w':'𝔴','x':'𝔵','y':'𝔶','z':'𝔷',
      'A':'𝔄','B':'𝔅','C':'ℭ','D':'𝔇','E':'𝔈','F':'𝔉','G':'𝔊','H':'ℌ','I':'ℑ', 'J':'𝔍','K':'𝔎', 'L':'𝔏','M':'𝔐','N':'𝔑','O':'𝔒','P':'𝔓','Q':'𝔔','R':'ℜ','S':'𝔖','T':'𝔗','U':'𝔘','V':'𝔙','W':'𝔚','X':'𝔛','Y':'𝔜','Z':'ℨ' 
    },
    cursive: { 
      'a':'𝒶','b':'𝒷','c':'𝒸', 'd':'𝒹', 'e':'𝑒','f':'𝒻','g':'𝑔','h':'𝒽','i':'𝒾','j':'𝒿','k':'𝓀','l':'𝓁','m':'𝓂', 'n':'𝓃','o':'𝑜','p':'𝓅','q':'𝓆','r':'𝓇','s':'𝓈','t':'𝓉','u':'𝓊', 'v':'𝓋','w':'𝓌','x':'𝓍','y':'𝓎','z':'𝓏',
      'A':'𝒜','B':'ℬ','C':'𝒞', 'D':'𝒟', 'E':'ℰ','F':'ℱ','G':'𝒢','H':'ℋ','I':'ℐ','J':'𝒿','K':'𝒦','L':'ℒ','M':'ℳ', 'N':'𝒩','O':'𝒪','P':'𝒫','Q':'𝒬','R':'ℛ','S':'𝒮','T':'𝒯','U':'𝒰', 'V':'𝒱','W':'𝒲','X':'𝒳','Y':'𝒴','Z':'𝒵' 
    },
    doubleStruck: { 
      'a':'𝕒','b':'𝕓','c':'𝕔','d':'𝕕','e':'𝕖','f':'𝕗','g':'𝕘','h':'𝕙','i':'𝕚','j':'𝕛','k':'𝕜','l':'𝕝','m':'𝕞','n':'𝕟','o':'𝕠','p':'𝕡','q':'𝕢','r':'𝕣','s':'𝕤', 't':'𝕥','u':'𝕦','v':'𝕧','w':'𝕨','x':'𝕩','y':'𝕪','z':'𝕫',
      'A':'𝔸','B':'𝔹','C':'ℂ','D':'𝔻','E':'𝔼','F':'𝔽','G':'𝔾','H':'ℍ','I':'𝕀','J':'𝕁','K':'𝕂','L':'𝕃','M':'𝕄','N':'ℕ','O':'𝕆','P':'ℙ','Q':'ℚ','R':'ℝ','S':'𝕊', 'T':'𝕋','U':'𝕌','V':'𝕍','W':'𝕎','X':'𝕏', 'Y':'𝕐','Z':'ℤ' 
    },
    bubble: { 
      'a':'ⓐ','b':'ⓑ','c':'ⓒ','d':'ⓓ','e':'ⓔ','f':'ⓕ','g':'ⓖ','h':'ⓗ','i':'ⓘ','j':'ⓙ','k':'ⓚ','l':'ⓛ','m':'ⓜ','n':'ⓝ','o':'ⓞ','p':'ⓟ','q':'ⓠ','r':'ⓡ','s':'ⓢ', 't':'ⓣ','u':'ⓤ','v':'ⓥ','w':'ⓦ','x':'ⓧ','y':'ⓨ','z':'ⓩ',
      'A':'Ⓐ','B':'Ⓑ','C':'Ⓒ','D':'Ⓓ','E':'Ⓔ','F':'Ⓕ','G':'Ⓖ','H':'Ⓗ','I':'Ⓘ','J':'Ⓙ','K':'Ⓚ','L':'Ⓛ','M':'Ⓜ','N':'Ⓝ','O':'Ⓞ','P':'Ⓟ','Q':'Ⓠ','R':'Ⓡ','S':'Ⓢ', 'T':'Ⓣ','U':'Ⓤ','V':'Ⓥ','W':'Ⓦ','X':'Ⓧ','Y':'Ⓨ','Z':'Ⓩ'
    },
    darkBubble: { 
      'a':'🅐','b':'🅑','c':'🅒','d':'🅓','e':'🅔','f':'🅕','g':'🅖','h':'🅗','i':'🅘','j':'🅙','k':'🅚','l':'🅛','m':'🅜','n':'🅝','o':'🅞','p':'🅟','q':'🅠','r':'🅡','s':'🅢', 't':'🅣','u':'🅤','v':'🅥','w':'🅦','x':'🅧','y':'🅨','z':'🅩',
      'A':'🅐','B':'🅑','C':'🅒','D':'🅓','E':'🅔','F':'🅕','G':'🅖','H':'🅗','I':'🅘','J':'🅙','K':'🅚','L':'🅛','M':'🅜','N':'🅝','O':'🅞','P':'🅟','Q':'🅠','R':'🅡','S':'🅢', 'T':'🅣','U':'🅤','V':'🅥','W':'🅦','X':'🅧','Y':'🅨','Z':'🅩'
    },
    square: { 
      'a':'🄰','b':'🄱','c':'🄲','d':'🄳','e':'🄴','f':'🄵','g':'🄶','h':'🄷','i':'🄸','j':'🄹','k':'🄺','l':'🄻','m':'🄼','n':'🄽','o':'🄾','p':'🄿','q':'🅀','r':'🅁','s':'🅂','t':'🅃','u':'🅄','v':'🅅','w':'🅆','x':'🅇','y':'🅈','z':'🅉',
      'A':'🄰','B':'🄱','C':'🄲','D':'🄳','E':'🄴','F':'🄵', 'G':'🄶','H':'🄷','I':'🄸','J':'🄹','K':'🄺','L':'🄻','M':'🄼','N':'🄽','O':'🄾','P':'🄿','Q':'🅀','R':'🅁','S':'🅂','T':'🅃','U':'🅄','V':'🅅','W':'🅆','X':'🅇','Y':'🅈','Z':'🅉'
    },
    monospace: { 
      'a':'𝚊','b':'𝚋','c':'𝚌','d':'𝚍', 'e':'𝚎', 'f':'𝚏','g':'𝚐','h':'𝚑','i':'𝚒','j':'𝚓','k':'𝚔','l':'𝚕','m':'𝚖','n':'𝚗','o':'𝚘','p':'𝚙','q':'𝚚','r':'𝚛','s':'𝚜','t':'𝚝','u':'𝚞','v':'𝚟','w':'𝚠','x':'𝚡','y':'𝚢','z':'𝚣',
      'A':'𝙰','B':'𝙱','C':'𝙲','D':'𝙳', 'E':'𝙴', 'F':'𝙵','G':'𝙶','H':'𝙷','I':'𝙸','J':'𝙹','K':'𝙺','L':'𝙻','M':'𝙼','N':'𝙽','O':'𝙾','P':'𝙿','Q':'𝚀','R':'𝚁','S':'𝚂','T':'𝚃','U':'𝚄','V':'𝚅','W':'𝚆','X':'𝚇','Y':'𝚈','Z':'𝚉'
    },
    tiny: { 
      'a':'ᵃ','b':'ᵇ','c':'ᶜ','d':'ᵈ','e':'ᵉ','f':'ᶠ','g':'ᵍ','h':'ʰ','i':'ⁱ','j':'ʲ','k':'ᵏ','l':'ˡ','m':'ᵐ','n':'ⁿ', 'o':'ᵒ','p':'ᵖ','q':'ᵠ','r':'ʳ', 's':'ˢ','t':'ᵗ','u':'ᵘ','v':'ᵛ','w':'ʷ','x':'ˣ','y':'ʸ','z':'ᶻ',
      'A':'ᴬ','B':'ᴮ','C':'ᶜ','D':'ᴰ','E':'ᴱ','F':'ᶠ','G':'ᴳ','H':'ᴴ','I':'ᴵ','J':'ᴶ','K':'ᴷ','L':'ᴸ','M':'ᴹ','N':'ᴺ', 'O':'ᴼ','P':'ᴾ','Q':'ᵠ','R':'ᴿ', 'S':'ˢ','T':'ᵀ','U':'ᵁ','V':'ⱽ','W':'ᵂ','X':'ˣ','Y':'ʸ','Z':'ᶻ'
    },
    subscript: { 
      'a':'ₐ','b':'ᵦ','c':'𝒸','d':'𝒹','e':'ₑ','f':'𝒻','g':'𝓰','h':'ₕ','i':'ᵢ','j':'ⱼ','k':'ₖ','l':'ₗ','m':'ₘ','n':'ₙ','o':'ₒ','p':'ₚ','q':'ᵩ','r':'ᵣ','s':'ₛ','t':'ₜ','u':'ᵤ','v':'ᵥ','w':'𝓌','x':'ₓ','y':'ᵧ','z':'𝓏' 
    },
    gentle: { 
      'a':'α','b':'в','c':'c','d':'d','e':'ε','f':'ғ','g':'ɢ','h':'н','i':'ι','j':'j','k':'к','l':'l','m':'м','n':'и','o':'σ','p':'ρ','q':'φ','r':'я','s':'s','t':'т','u':'υ','v':'v','w':'ω','x':'x','y':'ч','z':'z',
      'A':'α','B':'в','C':'c','D':'d','E':'ε','F':'ғ','G':'ɢ','H':'н','I':'ι','J':'j', 'K':'к','L':'l','M':'м','N':'и','O':'σ','P':'ρ','Q':'φ','R':'я','S':'s','T':'т','U':'υ','V':'v','W':'ω','X':'x','Y':'ч','Z':'z'
    },
    eastern: { 
      'a':'タ','b':'乃','c':'匚','d':'刀','e':'乇','f':'下','g':'厶','h':'卄','i':'工', 'j':'丁','k':'长','l':'し','m':'爪','n':'冂','o':'口', 'p':'卩','q':'匚','r':'尺', 's':'丂','t':'ㄒ','u':'凵','v':'リ','w':'山','x':'メ', 'y':'ㄚ','z':'乙',
      'A':'タ','B':'乃','C':'匚','D':'刀','E':'乇','F':'下','G':'厶','H':'卄','I':'工', 'J':'丁','K':'长','L':'し','M':'爪','N':'冂','O':'口', 'P':'卩','Q':'匚','R':'尺', 'S':'丂','T':'ㄒ','U':'凵','V':'リ','W':'山','X':'メ', 'Y':'ㄚ','Z':'乙'
    },
    upsideDown: { 
      'a':'ɐ','b':'q','c':'ɔ','d':'p','e':'ǝ','f':'ɟ','g':'ƃ', 'h':'ɥ','i':'ᴉ','j':'ɾ','k':'ʞ','l':'l','m':'ɯ','n':'u','o':'o','p':'d','q':'b','r':'ɹ','s':'s','t':'ʇ','u':'n','v':'ʌ','w':'ʍ','x':'x','y':'ʎ','z':'z',
      'A':'∀','B':'𐐒','C':'Ɔ','D':'◖','E':'Ǝ','F':'Ⅎ','G':'⅁','H':'H','I':'I','J':'Ր','K':'ʞ','L':'˥','M':'W','N':'N','O':'O','P':'Ԁ','Q':'Ό','R':'ᴚ','S':'S','T':'⊥','U':'∩','V':'Λ','W':'M','X':'X','Y':'⅄','Z':'Z'
    },
    mirror: { 
      'a':'ɒ','b':'d','c':'ɔ','d':'b','e':'ɘ','f':'ʇ','g':'ϱ','h':'ʜ','i':'i', 'j':'ꞁ','k':'ʞ','l':'l','m':'m','n':'ᴎ','o':'o','p':'q','q':'p','r':'ɿ','s':'ꙅ','t':'ƚ','u':'υ','v':'v','w':'w','x':'x','y':'ʏ','z':'ƹ',
      'A':'A','B':'ᙏ','C':'Ɔ','D':'ᗡ','E':'Ǝ','F':'ꟻ','G':'Ꭾ','H':'H','I':'I', 'J':'Ꞁ','K':'⋊','L':'⅃','M':'M','N':'И','O':'O','P':'¶','Q':'Ϙ','R':'Я','S':'Ꙅ','T':'T','U':'U','V':'V','W':'W','X':'X','Y':'Y','Z':'Ƹ'
    }
  };

  const transform = (text, map) => [...text].map(c => map[c] || map[c.toLowerCase()] || map[c.toUpperCase()] || c).join('');
  const wrap = (text, pre, suf, charPre = '', charSuf = '') => pre + [...text].map(c => charPre + c + charSuf).join('') + suf;

  const fonts = [
    { name: 'Gothic Font', f: (t) => transform(t, fontMaps.gothic) },
    { name: 'Cursive Font', f: (t) => transform(t, fontMaps.cursive) },
    { name: 'Double Struck', f: (t) => transform(t, fontMaps.doubleStruck) },
    { name: 'Bubble Font', f: (t) => transform(t, fontMaps.bubble) },
    { name: 'Dark Bubble Font', f: (t) => transform(t, fontMaps.darkBubble) },
    { name: 'Square Font', f: (t) => transform(t, fontMaps.square) },
    { name: 'Bold Font', f: (t) => transform(t, fontMaps.bold) },
    { name: 'Italic Font', f: (t) => transform(t, fontMaps.italic) },
    { name: 'Monospace Font', f: (t) => transform(t, fontMaps.monospace) },
    { name: 'Upside Down', f: (t) => transform(t, fontMaps.upsideDown) },
    { name: 'Mirror Font', f: (t) => transform(t, fontMaps.mirror) },
    { name: 'Refined Font', f: (t) => transform(t, fontMaps.gentle) },
    { name: 'Eastern Font', f: (t) => transform(t, fontMaps.eastern) },
    { name: 'Reverse Font', f: (t) => [...t].reverse().join('') },

    // Wrapped & Framed Categories
    { name: 'Square Box', f: (t) => wrap(t.toUpperCase(), '', '', '[', ']') },
    { name: 'Circle Box', f: (t) => wrap(t.toLowerCase(), '', '', '⒜', '').replace(/⒜/g, c => fontMaps.bubble[c] || c) },
    { name: 'Sharp', f: (t) => wrap(t, '', '', '<', '>') },
    { name: 'Enclosed', f: (t) => wrap(t, '', '', '⌈', '⌋') },
    { name: 'Pointed', f: (t) => wrap(t, '', '', '➹', '➷') },
    { name: 'Lunar', f: (t) => wrap(t, '', '', '☾', '☽') },
    { name: 'Boxed', f: (t) => wrap(t, '', '', '[', ']') },
    { name: 'Arrowed Bound', f: (t) => wrap(t, '', '', '⟨', '⟩') },
    { name: 'Soft Curves', f: (t) => wrap(t, '', '', '⊂', '⊃') },
    { name: 'Triple Beam', f: (t) => wrap(t, '', '', '⫷', '⫸') },
    { name: 'Tri-Framed', f: (t) => wrap(t, '', '', '≪', '≫') },
    { name: 'Bold Edge', f: (t) => wrap(t, '', '', '【', '】') },
    { name: 'Corner Glow', f: (t) => wrap(t, '', '', '「', '」') },
    { name: 'Soft Angles', f: (t) => wrap(t, '', '', '〖', '〗') },
    { name: 'Looped', f: (t) => wrap(t, '', '', '', 'ꪶ') },

    // Special Overlays & Accents
    { name: 'Crowned Text', f: (t) => [...t].map(c => c + '\u030A').join('') },
    { name: 'Z Lines', f: (t) => [...t].map(c => c + '\u0316').join('') },
    { name: 'Pointed Accent', f: (t) => [...t].map(c => c + '\u0302').join('') },
    { name: 'Wavy Accent', f: (t) => [...t].map(c => c + '\u0303').join('') },
    { name: 'Glyph Cap', f: (t) => [...t].map(c => c + '\u030C').join('') },
    { name: 'Short Mark', f: (t) => [...t].map(c => c + '\u0301').join('') },
    { name: 'Spotted Text', f: (t) => [...t].map(c => c + '\u0307').join('') },
    { name: 'Under Curve', f: (t) => [...t].map(c => c + '\u0330').join('') },
    { name: 'Wave Under', f: (t) => [...t].map(c => c + '\u0330').join('') },
    { name: 'Wave Top', f: (t) => [...t].map(c => c + '\u0334').join('') },
    { name: 'Straight Waves', f: (t) => [...t].map(c => c + '\u0330').join('') },
    { name: 'Cloud Curve', f: (t) => [...t].map(c => c + '\u0302').join('') },
    { name: 'ZigGlitch', f: (t) => [...t].map(c => c + '\u0300').join('') },
    { name: 'Focused', f: (t) => [...t].map(c => c + '\u0308').join('') },
    { name: 'Strikethrough', f: (t) => [...t].map(c => c + '\u0336').join('') },
    { name: 'Overline', f: (t) => [...t].map(c => c + '\u0305').join('') },
    { name: 'Slash Overlay', f: (t) => [...t].map(c => c + '\u0338').join('') },
    { name: 'Wave Overlay', f: (t) => [...t].map(c => c + '\u0334').join('') },

    // Preppy & Decorative
    { name: 'Radiance', f: (t) => '╰----☆ ' + t + ' ☆----╯' },
    { name: 'Star Burst', f: (t) => '⋆·˚ ༘ ✦ ' + t + ' ✦ ˚ ༘⋆' },
    { name: 'Moonlight', f: (t) => '✦⁺₊☆☽ ' + t + ' ☾☆₊⁺✦' },
    { name: 'Shining Touch', f: (t) => '(¯`★.¸ ' + t + ' ¸.·´¯)' },
    { name: 'Floral Enchantment', f: (t) => '>❀< ' + t + ' >❀<' },
    { name: 'Starry Path', f: (t) => '>✫▷ ' + t + ' ◁✫<' },
    { name: 'Glow Line', f: (t) => '╰----☆ ' + t + ' ☆----╯' },
    { name: 'Glam', f: (t) => '✧ ' + t + ' ✧' },
    { name: 'Star Shine', f: (t) => '⋆｡˚⊹ ' + t + ' ⊹˚｡⋆' },
    { name: 'Glitter', f: (t) => '—|[⬦]| ' + t + ' |[⬦]|—' },
    { name: 'Galaxy', f: (t) => '⋆⭒☆⭒⋆ ' + t + ' ⋆⭒☆⭒⋆' },
    { name: 'Fitness', f: (t) => '║█ ' + t + ' █║' },
    { name: 'Royal Border', f: (t) => '•◇• ' + t + ' •◇•' },
    { name: 'Flower Frame', f: (t) => '~•✿•~ ' + t + ' ~•✿•~' },
    { name: 'Block Line', f: (t) => '▆▇██ ' + t + ' ██▇▆' },
    { name: 'Bars Around', f: (t) => '▂▃▅▆█ ' + t + ' █▆▅▃▂' },
    { name: 'Elegant Stars', f: (t) => '✦..·´¨`*·.¸ ' + t + ' ¸.·*¨`´·..✦' },
    { name: 'Shiny', f: (t) => '~〝✧✦..· ' + t + ' ·..✦✧〞~' },
    { name: 'Night Stars', f: (t) => '★.·´¨`*·.¸ ' + t + ' ¸.·*¨`´·..★' },

    // SET 6: Aesthetic & Textural
    { name: 'Flow', f: (t) => '✧•.⁓⁓⁓⁓⁓⁓⁓⁓⁓•✧ ' + t + ' ✧•.⁓⁓⁓⁓⁓⁓⁓⁓⁓•✧' },
    { name: 'Flowered', f: (t) => '.:*´¨`*:. ⚘ ' + t + ' ⚘ .:*´¨`*:.' },
    { name: 'Cosmic Sparkle', f: (t) => '✧･ﾟ: *✧･ﾟ: ' + t + ' :･ﾟ✧*:･ﾟ✧' },
    { name: 'Blocky', f: (t) => '▇ ▆ ▅ ▄ ▃ ' + t + ' ▃ ▄ ▅ ▆ ▇' },
    { name: 'Shadow', f: (t) => '✦ ✧ ✦ ' + t + ' ✦ ✧ ✦' },
    { name: 'Graceful Script', f: (t) => '҉*◦˚*◦҉‧. ' + t + ' .҉◦*˚◦*҉' },
    { name: 'Midnight Sparkles', f: (t) => '★.·:*:·.★ ' + t + ' ★.·:*:·.★' },
    { name: 'Struck Charm', f: (t) => '—=☆☆=— ' + t + ' —=☆☆=—' },
    { name: 'Boldly Crafted', f: (t) => '└───────────> ' + t + ' <' }
  ];

  function renderFonts() {
    const text = input.value || 'Hello World';
    results.innerHTML = fonts.map(f => {
      const converted = f.f(text);
      const displayHtml = converted.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const safeEscape = converted.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '&quot;');
      return `
        <div class="font-result-item" onclick="copyToClipboard('${safeEscape}')">
          <span class="font-style-name">${f.name}</span>
          <span class="font-preview">${displayHtml}</span>
          <span class="font-copy-btn">Copy</span>
        </div>
      `;
    }).join('');
  }

  input.addEventListener('input', renderFonts);
  renderFonts(); // Initial population
}

// ===== ROTATING LOGO =====
function initRotatingLogo() {
  const heroSymbol = document.getElementById('heroSymbol');
  if (!heroSymbol) return;
  const symbols = ['✦', '❤️', '✔️', '🐾', '⭐', '☀', '☾', '🎵', '✝', '♈', '∞', '✨'];
  let i = 0;
  setInterval(() => {
    i = (i + 1) % symbols.length;
    heroSymbol.textContent = symbols[i];
  }, 3000);
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const items = document.querySelectorAll('.symbol-item, .combo-item, .lenny-item, .category-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  items.forEach(item => observer.observe(item));
}

// ===== FAQ ACCORDION =====
function initFaqAccordion() {
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
}

// ===== INIT ALL =====
document.addEventListener('DOMContentLoaded', () => {
  ClipboardManager.init();
  initSidebar();
  initCopyable();
  initSearch();
  initFontGenerator();
  initRotatingLogo();
  initScrollReveal();
  initFaqAccordion();
});
