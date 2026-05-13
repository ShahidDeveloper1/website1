// ===== FANCY SYMBOLS - MAIN SCRIPT =====

// ===== COPY TO CLIPBOARD =====
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('✓ Copied to clipboard!');
  }).catch(() => {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('✓ Copied to clipboard!');
  });
}

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

// ===== SIDEBAR TOGGLE =====
function initSidebar() {
  const toggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');

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

// ===== CLICK-TO-COPY EVENTS =====
function initCopyable() {
  // Symbol items
  document.querySelectorAll('.symbol-item').forEach(item => {
    item.addEventListener('click', () => {
      copyToClipboard(item.textContent.trim());
      item.classList.add('copied');
      setTimeout(() => item.classList.remove('copied'), 800);
    });
  });

  // Combo items
  document.querySelectorAll('.combo-item').forEach(item => {
    item.addEventListener('click', () => {
      const text = item.querySelector('.combo-text')?.textContent.trim() || item.textContent.trim();
      copyToClipboard(text);
    });
  });

  // Lenny items
  document.querySelectorAll('.lenny-item').forEach(item => {
    item.addEventListener('click', () => {
      copyToClipboard(item.textContent.trim());
      item.classList.add('copied');
      setTimeout(() => item.classList.remove('copied'), 800);
    });
  });

  // Flag items — copy the country name on click
  document.querySelectorAll('.flag-item').forEach(item => {
    item.addEventListener('click', () => {
      const name = item.querySelector('.flag-name')?.textContent.trim() || 'Flag';
      copyToClipboard(name);
      item.classList.add('copied');
      setTimeout(() => item.classList.remove('copied'), 800);
    });
  });
}

// ===== SEARCH FILTER =====
function initSearch() {
  const searchBox = document.getElementById('searchBox');
  if (!searchBox) return;

  searchBox.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    // Filter category cards
    document.querySelectorAll('.category-card').forEach(card => {
      const name = card.querySelector('.category-name')?.textContent.toLowerCase() || '';
      card.style.display = name.includes(query) || !query ? '' : 'none';
    });

    // Filter symbol items
    document.querySelectorAll('.symbol-item').forEach(item => {
      if (!query) { item.style.display = ''; return; }
      item.style.display = '';
    });

    // Filter combo items
    document.querySelectorAll('.combo-item').forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(query) || !query ? '' : 'none';
    });
  });
}

// ===== FONT GENERATOR =====
const fontMaps = {
  'Bold': Object.fromEntries([...'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'].map((c, i) => {
    if (i < 26) return [c, String.fromCodePoint(0x1D400 + i)];
    if (i < 52) return [c, String.fromCodePoint(0x1D41A + (i - 26))];
    return [c, String.fromCodePoint(0x1D7CE + (i - 52))];
  })),
  'Italic': Object.fromEntries([...'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'].map((c, i) => {
    if (i < 26) return [c, String.fromCodePoint(0x1D434 + i)];
    return [c, String.fromCodePoint(0x1D44E + (i - 26))];
  })),
  'Bold Italic': Object.fromEntries([...'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'].map((c, i) => {
    if (i < 26) return [c, String.fromCodePoint(0x1D468 + i)];
    return [c, String.fromCodePoint(0x1D482 + (i - 26))];
  })),
  'Script': Object.fromEntries([...'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'].map((c, i) => {
    if (i < 26) return [c, String.fromCodePoint(0x1D49C + i)];
    return [c, String.fromCodePoint(0x1D4B6 + (i - 26))];
  })),
  'Bold Script': Object.fromEntries([...'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'].map((c, i) => {
    if (i < 26) return [c, String.fromCodePoint(0x1D4D0 + i)];
    return [c, String.fromCodePoint(0x1D4EA + (i - 26))];
  })),
  'Fraktur': Object.fromEntries([...'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'].map((c, i) => {
    if (i < 26) return [c, String.fromCodePoint(0x1D504 + i)];
    return [c, String.fromCodePoint(0x1D51E + (i - 26))];
  })),
  'Double-Struck': Object.fromEntries([...'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'].map((c, i) => {
    if (i < 26) return [c, String.fromCodePoint(0x1D538 + i)];
    if (i < 52) return [c, String.fromCodePoint(0x1D552 + (i - 26))];
    return [c, String.fromCodePoint(0x1D7D8 + (i - 52))];
  })),
  'Sans-Serif': Object.fromEntries([...'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'].map((c, i) => {
    if (i < 26) return [c, String.fromCodePoint(0x1D5A0 + i)];
    if (i < 52) return [c, String.fromCodePoint(0x1D5BA + (i - 26))];
    return [c, String.fromCodePoint(0x1D7E2 + (i - 52))];
  })),
  'Sans Bold': Object.fromEntries([...'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'].map((c, i) => {
    if (i < 26) return [c, String.fromCodePoint(0x1D5D4 + i)];
    if (i < 52) return [c, String.fromCodePoint(0x1D5EE + (i - 26))];
    return [c, String.fromCodePoint(0x1D7EC + (i - 52))];
  })),
  'Monospace': Object.fromEntries([...'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'].map((c, i) => {
    if (i < 26) return [c, String.fromCodePoint(0x1D670 + i)];
    if (i < 52) return [c, String.fromCodePoint(0x1D68A + (i - 26))];
    return [c, String.fromCodePoint(0x1D7F6 + (i - 52))];
  })),
  'Circled': Object.fromEntries([...'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'].map((c, i) => {
    if (i < 26) return [c, String.fromCodePoint(0x24B6 + i)];
    return [c, String.fromCodePoint(0x24D0 + (i - 26))];
  })),
  'Squared': Object.fromEntries([...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].map((c, i) => [c, String.fromCodePoint(0x1F130 + i)])),
  'Fullwidth': Object.fromEntries([...'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'].map((c, i) => {
    if (i < 26) return [c, String.fromCodePoint(0xFF21 + i)];
    if (i < 52) return [c, String.fromCodePoint(0xFF41 + (i - 26))];
    return [c, String.fromCodePoint(0xFF10 + (i - 52))];
  })),
};

// Special transforms
const specialFonts = {
  'Upside Down': (text) => {
    const map = {'a':'ɐ','b':'q','c':'ɔ','d':'p','e':'ǝ','f':'ɟ','g':'ƃ','h':'ɥ','i':'ᴉ','j':'ɾ','k':'ʞ','l':'l','m':'ɯ','n':'u','o':'o','p':'d','q':'b','r':'ɹ','s':'s','t':'ʇ','u':'n','v':'ʌ','w':'ʍ','x':'x','y':'ʎ','z':'z',
    'A':'∀','B':'ꓭ','C':'Ɔ','D':'ꓷ','E':'Ǝ','F':'Ⅎ','G':'⅁','H':'H','I':'I','J':'ſ','K':'ꓘ','L':'˥','M':'W','N':'N','O':'O','P':'Ԁ','Q':'Q','R':'ꓤ','S':'S','T':'⊥','U':'∩','V':'Λ','W':'M','X':'X','Y':'⅄','Z':'Z',
    '1':'Ɩ','2':'ꇛ','3':'Ɛ','4':'ㄣ','5':'ϛ','6':'9','7':'Ɫ','8':'8','9':'6','0':'0',
    '.':'˙',',':'\'','\'':',','?':'¿','!':'¡','(':')',')':'(','[':']',']':'[','{':'}','}':'{','<':'>','>':'<','&':'⅋','_':'‾'};
    return [...text].map(c => map[c] || c).reverse().join('');
  },
  'Strikethrough': (text) => [...text].map(c => c + '\u0336').join(''),
  'Underline': (text) => [...text].map(c => c + '\u0332').join(''),
  'Wavy': (text) => {
    return [...text].map((c, i) => i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()).join('');
  },
  'Sparkles': (text) => '✨ ' + text + ' ✨',
  'Stars': (text) => '★彡 ' + text + ' 彡★',
  'Hearts': (text) => '♡ ' + [...text].join(' ') + ' ♡',
  'Brackets Fancy': (text) => '『' + text + '』',
  'Gothic Frame': (text) => '꧁༺ ' + text + ' ༻꧂',
};

function convertFont(text, fontName) {
  if (specialFonts[fontName]) {
    return specialFonts[fontName](text);
  }
  const map = fontMaps[fontName];
  if (!map) return text;
  return [...text].map(c => map[c] || c).join('');
}

function initFontGenerator() {
  const input = document.getElementById('fontInput');
  const results = document.getElementById('fontResults');
  if (!input || !results) return;

  const preppyDecorations = [
    { prefix: '·.¸¸.·´¯ ', suffix: ' ¯´·.¸¸.·' },
    { prefix: '꒰ ', suffix: ' ꒱' },
    { prefix: '🎀 ', suffix: ' 🎀' },
    { prefix: '˚ ༘♡ ', suffix: ' ˚ ༘♡' },
    { prefix: '🧸 ', suffix: ' 🧸' },
    { prefix: '🪐 ', suffix: ' 🪐' },
    { prefix: '☕️ ', suffix: ' ☕️' },
    { prefix: '🥂 ', suffix: ' 🥂' },
    { prefix: '🍒 ', suffix: ' 🍒' },
    { prefix: '🍓 ', suffix: ' 🍓' },
    { prefix: '🦋 ', suffix: ' 🦋' },
    { prefix: '☁️ ', suffix: ' ☁️' },
    { prefix: '🧁 ', suffix: ' 🧁' },
    { prefix: '🌸 ', suffix: ' 🌸' },
    { prefix: '✨ ', suffix: ' ✨' },
    { prefix: '🤍 ', suffix: ' 🤍' },
    { prefix: '🩰 ', suffix: ' 🩰' },
    { prefix: '🐚 ', suffix: ' 🐚' },
    { prefix: '👼 ', suffix: ' 👼' },
    { prefix: '💒 ', suffix: ' 💒' },
    { prefix: '🏩 ', suffix: ' 🏩' },
    { prefix: '💌 ', suffix: ' 💌' },
    { prefix: '🕯️ ', suffix: ' 🕯️' },
    { prefix: '🎀💖 ', suffix: ' 💖🎀' },
    { prefix: '✨🌸 ', suffix: ' 🌸✨' },
    { prefix: '🩰🐚 ', suffix: ' 🐚🩰' },
    { prefix: '🍒🍓 ', suffix: ' 🍓🍒' },
    { prefix: '🧁🌸 ', suffix: ' 🌸🧁' },
    { prefix: '🎀👼 ', suffix: ' 👼🎀' },
    { prefix: '✨🤍 ', suffix: ' 🤍✨' },
    { prefix: '🦢 ', suffix: ' 🦢' },
    { prefix: '🫧 ', suffix: ' 🫧' },
    { prefix: '🥥 ', suffix: ' 🥥' },
    { prefix: '🍄 ', suffix: ' 🍄' },
    { prefix: '🌼 ', suffix: ' 🌼' },
    { prefix: '🦖 ', suffix: ' 🦖' },
    { prefix: '🦕 ', suffix: ' 🦕' },
    { prefix: '🌵 ', suffix: ' 🌵' },
    { prefix: '🍀 ', suffix: ' 🍀' },
    { prefix: '👒 ', suffix: ' 👒' },
    { prefix: '👑 ', suffix: ' 👑' },
    { prefix: '🔮 ', suffix: ' 🔮' }
  ];

  const baseFonts = ['Monospace', 'Double-Struck', 'Italic', 'Script', 'Sans-Serif', 'Circled'];

  function render() {
    const text = input.value || 'Hello World';
    let html = '';

    // Generate Preppy Decorated versions
    // Dynamic duplicate filter guarantee
    const uniqueDecorations = preppyDecorations.filter((item, index, self) =>
      index === self.findIndex(t => t.prefix === item.prefix && t.suffix === item.suffix)
    );

    uniqueDecorations.forEach(dec => {
      baseFonts.forEach(font => {
        const textToConvert = [...text].map(c => fontMaps[font]?.[c] || c).join('');
        const converted = dec.prefix + textToConvert + dec.suffix;
        html += `
          <div class="font-result-item" onclick="copyToClipboard('${converted.replace(/'/g, "\\'")}')">
            <span class="font-style-name">${font} ${dec.prefix.trim()}</span>
            <span class="font-preview">${converted}</span>
            <span class="font-copy-btn">Copy</span>
          </div>
        `;
      });
    });

    // Pure base fonts for preppy look
    baseFonts.forEach(font => {
      const converted = [...text].map(c => fontMaps[font]?.[c] || c).join('');
      html += `
        <div class="font-result-item" onclick="copyToClipboard('${converted.replace(/'/g, "\\'")}')">
          <span class="font-style-name">${font}</span>
          <span class="font-preview">${converted}</span>
          <span class="font-copy-btn">Copy</span>
        </div>
      `;
    });

    results.innerHTML = html;
  }

  input.addEventListener('input', render);
  render();
}

// ===== PARTICLES BACKGROUND =====
function initParticles() {
  const container = document.querySelector('.particles');
  if (!container) return;

  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (10 + Math.random() * 20) + 's';
    p.style.animationDelay = -(Math.random() * 20) + 's';
    p.style.width = p.style.height = (2 + Math.random() * 3) + 'px';
    const colors = ['#8b5cf6', '#ec4899', '#3b82f6', '#06b6d4'];
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    container.appendChild(p);
  }
}

// ===== HIGHLIGHT ACTIVE SIDEBAR LINK =====
function highlightActiveSidebarLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.sidebar-links a').forEach(link => {
    const href = link.getAttribute('href')?.split('/').pop();
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initCopyable();
  initSearch();
  initFontGenerator();
  initParticles();
  highlightActiveSidebarLink();
});
