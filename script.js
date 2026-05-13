// ===== FANCY SYMBOLS - MAIN SCRIPT =====
document.documentElement.classList.add('js-ready');


// ===== CLIPBOARD BAR MANAGER =====
const ClipboardManager = {
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
        <span class="clipboard-title">Copied</span>
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
      <a href="${root}index.html"><span class="link-icon">🏠</span> Home</a>
      <a href="${root}all-symbols.html"><span class="link-icon">🚀</span> All Symbols</a>
      <a href="${root}font-generator.html"><span class="link-icon">🎀</span> Preppy Font Generator</a>
      <a href="${root}lenny-face.html"><span class="link-icon">( ͡° ͜ʖ ͡°)</span> Lenny Faces</a>
    </div>
  </div>
  
  <div class="sidebar-section">
    <div class="sidebar-title">TRENDING NOW</div>
    <div class="sidebar-links">
      ${populars.map(c => `<a href="${root}symbols/${c.f}.html"><span class="link-icon">${c.i}</span> ${c.n}</a>`).join('')}
    </div>
  </div>

  <div class="sidebar-section">
    <div class="sidebar-title">ALL CATEGORIES</div>
    <div class="sidebar-links">
      ${categories.map(c => `<a href="${root}symbols/${c.f}.html"><span class="link-icon">${c.i}</span> ${c.n}</a>`).join('')}
    </div>
  </div>

  <div class="sidebar-section">
    <div class="sidebar-title">SITE INFO</div>
    <div class="sidebar-links">
      <a href="${root}pages/privacy.html"><span class="link-icon">🛡️</span> Privacy Policy</a>
      <a href="${root}pages/terms.html"><span class="link-icon">📄</span> Terms of Service</a>
      <a href="${root}pages/contact.html"><span class="link-icon">✉️</span> Contact Us</a>
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
    if (href === currentPath || (href === '/index.html' && currentPath === '/') || (currentPath.includes(href) && href !== '/')) {
      link.classList.add('active');
    }
  });

  if (toggle) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('show');
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
const SYMBOL_SEARCH_INDEX = {
  "heart": ["❤️", "♡", "♥", "❣", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "💌", "❤️‍🔥", "❤️‍🩹", "❥", "ღ", "❦", "❧", "☙"],
  "star": ["⭐", "★", "☆", "✦", "✧", "⋆", "✶", "✴", "✹", "✨", "✡", "❂", "🌌", "🌃"],
  "music": ["🎵", "🎶", "♪", "♫", "🎼", "🎹", "🎸", "🎻", "🎺", "🎷", "🎧", "📻"],
  "currency": ["$", "€", "£", "¥", "₿", "₹", "₱", "₩", "₫", "₭", "₮", "₯", "₰", "₱", "₲", "₳", "₴", "₵", "₶", "₷", "₸", "₽", "₻", "₼", "₾", "₿"],
  "weather": ["☀", "☁", "🌧️", "⛈️", "❄️", "🌪️", "🌊", "🌈", "🌡️", "🌙", "☾", "✹"],
  "animal": ["🐾", "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐻‍❄️", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🐧", "🐦", "🐤", "🦆", "🦅", "🦉", "🦇", "🐺", "🐗", "🐴", "🦄", "🐝", "🪱", "🐛", "🦋", "🐌", "🐞", "🐜", "🪰", "🪲", "🪳", "🦟", "🦗", "🕷️", "🕸️", "🦂", "🐢", "🐍", "🦎", "🦖", "🦕", "🐙", "🦑", "🦐", "🦞", "🦀", "🐡", "🐠", "🐟", "🐬", "🐳", "🐋", "🦈", "🐊", "🐅", "🐆", "🦓", "🦍", "🦧", "🐘", "🦛", "🦏", "🐪", "🐫", "🦒", "🦘", "🦬", "🐃", "🐄", "🐎", "🐖", "🐏", "🐑", "🐐", "🦌", "🐕", "🐩", "🦮", "🐕‍🦺", "🐈", "🐈‍⬛", "🐓", "🦃", "🦚", "🦜", "🦢", "🦩", "🕊️", "🐇", "🦝", "🦨", " badger", "🦦", "🦥", "🐁", "🐀", "🐿️", "🦔"],
  "check": ["✔️", "✅", "☑", "✓", "✗", "✘", "✕", "✖", "✔"],
  "arrow": ["→", "←", "↑", "↓", "↔", "↕", "↖", "↗", "↘", "↙", "↚", "↛", "↜", "↝", "↞", "↟", "↠", "↡", "↢", "↣", "↤", "↥", "↦", "↧", "↨", "↩", "↪", "↫", "↬", "↭", "↮", "↯", "↰", "↱", "↲", "↳", "↴", "↵", "↶", "↷", "↸", "↹", "↺", "↻", "↼", "↽", "↾", "↿", "⇀", "⇁", "⇂", "⇃", "⇄", "⇅", "⇆", "⇇", "⇈", "⇉", "⇊", "⇋", "⇌", "⇍", "⇎", "⇏", "⇐", "⇑", "⇒", "⇓", "⇔", "⇕", "⇖", "⇗", "⇘", "⇙", "⇚", "⇛", "⇜", "⇝", "⇞", "⇟", "⇠", "⇡", "⇢", "⇣", "⇤", "⇥", "⇦", "⇧", "⇨", "⇩", "⇪", "⇫", "⇬", "⇭", "⇮", "⇯", "⇰", "⇱", "⇲", "⇳", "⇴", "⇵", "⇶", "⇷", "⇸", "⇹", "⇺", "⇻", "⇼", "⇽", "⇾", "⇿"],
  "math": ["+", "-", "×", "÷", "=", "≠", "≈", "∞", "√", "∑", "∆", "∏", "±", "≤", "≥", "∂", "∫", "¬", "∧", "∨", "∩", "∪", "⊂", "⊃", "⊆", "⊇", "∈", "∉", "∋", "∌", "∝", "∟", "∠", "∡", "∢", "∣", "∦", "∥", "∳", "∴", "∵", "∶", "∷", "∸", "∹", "∺", "∻", "∼", "∽", "≀", "≁", "≂", "≃", "≄", "≅", "≆", "≇", "≈", "≉", "≊", "≋", "≌", "≍", "≎", "≏", "≐", "≑", "≒", "≓", "≔", "≕", "≖", "≗", "≘", "≙", "≚", "≛", "≜", "≝", "≞", "≟", "≡", "≢", "≣", "≮", "≯", "≰", "≱", "≲", "≳", "≴", "≵", "≶", "≷", "≸", "≹", "≺", "≻", "≼", "≽", "≾", "≿", "⊀", "⊁", "⊂", "⊃", "⊄", "⊅", "⊆", "⊇", "⊈", "⊉", "⊊", "⊋", "⊌", "⊍", "⊎", "⊏", "⊐", "⊑", "⊒", "⊓", "⊔", "⊕", "⊖", "⊗", "⊘", "⊙", "⊚", "⊛", "⊜", "⊝", "⊞", "⊟", "⊠", "⊡", "⊢", "⊣", "⊤", "⊥", "⊦", "⊧", "⊨", "⊩", "⊪", "⊫", "⊬", "⊭", "⊮", "⊯", "⊰", "⊱", "⊲", "⊳", "⊴", "⊵", "⊶", "⊷", "⊸", "⊹", "⊺", "⊻", "⊼", "⊽", "⊾", "⊿", "⋀", "⋁", "⋂", "⋃", "⋄", "⋅", "⋆", "⋇", "⋈", "⋉", "⋊", "⋋", "⋌", "⋍", "⋎", "⋏", "⋐", "⋑", "⋒", "⋓", "⋔", "⋕", "⋖", "⋗", "⋘", "⋙", "⋚", "⋛", "⋜", "⋝", "⋞", "⋟", "⋠", "⋡", "⋢", "⋣", "⋤", "⋥", "⋦", "⋧", "⋨", "⋩", "⋪", "⋫", "⋬", "⋭", "⋮", "⋯", "⋰", "⋱", "⋲", "⋳", "⋴", "⋵", "⋶", "⋷", "⋸", "⋹", "⋺", "⋻", "⋼", "⋽", "⋾", "⋿"],
  "aesthetic": ["✧", "✦", "✨", "✮", "⋆", "⭒", "☾", "✹", "❀", "🌸", "🎀", "🧸", "☁️", "🌊", "🩰", "🦢", "🦋", "🥂", "🕯️", "🏛️", "🖋️", "📜"],
  "smiley": ["😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "😚", "😙", "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔", "🤐", "🤨", "😐", "😑", "😶", "😏", "😒", "🙄", "😬", "🤥", "😌", "😔", "😪", "🤤", "😴", "😷", "🤒", "🤕", "🤢", "🤮", "🥵", "🥶", "🥴", "😵", "🤯", "🤠", "🥳", "😎", "🤓", "🧐", "😕", "😟", "🙁", "☹", "😮", "😯", "😲", "😳", "🥺", "😦", "😧", "😨", "😰", "😥", "😢", "😭", "😱", "😖", "😣", "😞", "😓", "😩", "😫", "🥱", "😤", "😡", "😠", "🤬", "😈", "👿", "💀", "☠", "💩", "🤡", "👹", "👺", "👻", "👽", "👾", "🤖"]
};

function initSearch() {
  const searchBox = document.getElementById('searchBox');
  const resultsSection = document.getElementById('searchResultsSection');
  const resultsGrid = document.getElementById('searchResultsGrid');
  const mainSections = document.querySelectorAll('.main-content > .section-title, .main-content > div:not(.search-results-section), .main-content > section:not(.hero)');

  if (!searchBox || !resultsSection || !resultsGrid) return;

  searchBox.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    if (query.length > 0) {
      // Hide all standard sections
      mainSections.forEach(sec => sec.style.display = 'none');
      resultsSection.style.display = 'block';
      resultsGrid.innerHTML = '';

      // 1. Check dictionary for direct keyword match
      let results = [];
      for (const [key, icons] of Object.entries(SYMBOL_SEARCH_INDEX)) {
        if (key.includes(query) || query.includes(key)) {
          results = [...results, ...icons];
        }
      }

      // 2. Also check text content on the current page for symbols/combos
      const allItems = Array.from(document.querySelectorAll('.symbol-item, .combo-item, .lenny-item'));
      allItems.forEach(item => {
        if (item.textContent.toLowerCase().includes(query)) {
          const char = item.classList.contains('combo-item') ? item.querySelector('.combo-text').textContent : item.textContent;
          if (!results.includes(char)) results.push(char);
        }
      });

      // 3. Render Luxury Tiles
      if (results.length > 0) {
        // Remove duplicates
        const unique = [...new Set(results)].slice(0, 100);
        unique.forEach(char => {
          const div = document.createElement('div');
          div.className = 'symbol-item reveal';
          div.textContent = char;
          resultsGrid.appendChild(div);
        });
      } else {
        resultsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #64748b;">No symbols found for "${query}". Try "heart", "star", or "math".</p>`;
      }
    } else {
      // Restore Home Page
      resultsSection.style.display = 'none';
      mainSections.forEach(sec => sec.style.display = '');
    }
  });
}

// ===== FONT GENERATOR =====
function initFontGenerator() {
  const input = document.getElementById('fontInput');
  const results = document.getElementById('fontResults');
  if (!input || !results) return;

  const fonts = [
    { name: 'Bold', map: {'a':'𝗮','b':'𝗯','c':'𝗰','d':'𝗱','e':'𝗲','f':'𝗳','g':'𝗴','h':'𝗵','i':'𝗶','j':'𝗷','k':'𝗸','l':'𝗹','m':'𝗺','n':'𝗻','o':'𝗼','p':'𝗽','q':'𝗾','r':'𝗿','s':'𝘀','t':'𝘁','u':'𝘂','v':'𝘃','w':'𝘄','x':'𝘅','y':'𝘆','z':'𝘇'} },
    { name: 'Italic', map: {'a':'𝘢','b':'𝘣','c':'𝘤','d':'𝘥','e':'𝘦','f':'𝘧','g':'𝘨','h':'𝘩','i':'𝘪','j':'𝘫','k':'𝘬','l':'𝘭','m':'𝘮','n':'𝘯','o':'𝘰','p':'𝘱','q':'𝘲','r':'𝘳','s':'𝘴','t':'𝘵','u':'𝘶','v':'𝘷','w':'𝘸','x':'𝘹','y':'𝘺','z':'𝘻'} }
  ];

  input.addEventListener('input', () => {
    const text = input.value || 'Preview';
    results.innerHTML = fonts.map(f => {
      const converted = [...text].map(c => f.map[c.toLowerCase()] || c).join('');
      return `
        <div class="font-result-item" onclick="copyToClipboard('${converted}')">
          <span class="font-style-name">${f.name}</span>
          <span class="font-preview">${converted}</span>
          <span class="font-copy-btn">Copy</span>
        </div>
      `;
    }).join('');
  });
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

// ===== INIT ALL =====
document.addEventListener('DOMContentLoaded', () => {
  ClipboardManager.init();
  initSidebar();
  initCopyable();
  initSearch();
  initFontGenerator();
  initRotatingLogo();
  initScrollReveal();
});
