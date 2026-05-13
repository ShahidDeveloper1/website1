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
function renderSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;
  const isSubdir = window.location.pathname.includes('/symbols/') || window.location.pathname.includes('/pages/');
  const root = isSubdir ? '../' : '';

  sidebar.innerHTML = `
  <div class="sidebar-section">
    <div class="sidebar-title">MAIN</div>
    <div class="sidebar-links">
      <a href="${root}index.html"><span class="link-icon">🏠</span> Home</a>
      <a href="${root}all-symbols.html"><span class="link-icon">🚀</span> All Symbols</a>
      <a href="${root}font-generator.html"><span class="link-icon">🎀</span> Preppy Font Generator</a>
      <a href="${root}lenny-face.html"><span class="link-icon">( ͡° ͜ʖ ͡°)</span> Lenny Faces</a>
    </div>
  </div>
  <div class="sidebar-section">
    <div class="sidebar-title">POPULAR SYMBOLS</div>
    <div class="sidebar-links">
      <a href="${root}symbols/heart.html"><span class="link-icon">❤️</span> Heart</a>
      <a href="${root}symbols/star.html"><span class="link-icon">⭐</span> Star</a>
      <a href="${root}symbols/arrow.html"><span class="link-icon">⇨</span> Arrow</a>
      <a href="${root}symbols/flower.html"><span class="link-icon">✿</span> Flower</a>
      <a href="${root}symbols/hand.html"><span class="link-icon">✌️</span> Hand</a>
      <a href="${root}symbols/checkmark.html"><span class="link-icon">✔️</span> Check Mark</a>
      <a href="${root}symbols/music.html"><span class="link-icon">🎵</span> Music</a>
      <a href="${root}symbols/emoji-faces.html"><span class="link-icon">🥰</span> Smiley Faces</a>
      <a href="${root}symbols/crown.html"><span class="link-icon">👑</span> Crown</a>
      <a href="${root}symbols/square.html"><span class="link-icon">⬛</span> Square</a>
      <a href="${root}symbols/dot.html"><span class="link-icon">•</span> Dot</a>
      <a href="${root}symbols/circle.html"><span class="link-icon">○</span> Circle</a>
      <a href="${root}symbols/loading.html"><span class="link-icon">▓</span> Loading</a>
      <a href="${root}symbols/wave.html"><span class="link-icon">〰</span> Wave</a>
      <a href="${root}symbols/bracket.html"><span class="link-icon">【</span> Bracket</a>
      <a href="${root}symbols/divider.html"><span class="link-icon">┊</span> Divider</a>
      <a href="${root}symbols/border.html"><span class="link-icon">╔</span> Border</a>
      <a href="${root}symbols/sparkle.html"><span class="link-icon">✨</span> Sparkle</a>
      <a href="${root}symbols/aesthetic.html"><span class="link-icon">✧</span> Aesthetic</a>
      <a href="${root}symbols/crypto.html"><span class="link-icon">₿</span> Crypto</a>
      <a href="${root}symbols/quotation.html"><span class="link-icon">❝</span> Quotation</a>
      <a href="${root}symbols/diamond.html"><span class="link-icon">◆</span> Diamond</a>
      <a href="${root}symbols/house.html"><span class="link-icon">🏠</span> House</a>
      <a href="${root}symbols/old-english.html"><span class="link-icon">𝔄</span> Old English</a>
      <a href="${root}symbols/upside-down.html"><span class="link-icon">ʇ</span> Upside Down</a>
      <a href="${root}symbols/cursive.html"><span class="link-icon">𝒜</span> Cursive</a>
      <a href="${root}symbols/bubble.html"><span class="link-icon">ⓐ</span> Bubble Text</a>
      <a href="${root}symbols/korean.html"><span class="link-icon">ㅿ</span> Korean Symbols</a>
      <a href="${root}symbols/japanese.html"><span class="link-icon">あ</span> Japanese Symbols</a>
      <a href="${root}symbols/chinese.html"><span class="link-icon">愛</span> Chinese Symbols</a>
      <a href="${root}symbols/german.html"><span class="link-icon">ß</span> German Symbols</a>
      <a href="${root}symbols/punctuation.html"><span class="link-icon">!</span> Punctuation Marks</a>
      <a href="${root}symbols/corner.html"><span class="link-icon">╚</span> Corner Symbols</a>
      <a href="${root}symbols/rectangle.html"><span class="link-icon">█</span> Rectangle Symbols</a>
      <a href="${root}symbols/triangle.html"><span class="link-icon">▲</span> Triangle Symbols</a>
      <a href="${root}symbols/line.html"><span class="link-icon">│</span> Line Symbols</a>
      <a href="${root}symbols/comparison.html"><span class="link-icon">≥</span> Comparison Symbols</a>
      <a href="${root}symbols/fraction.html"><span class="link-icon">½</span> Fraction Symbols</a>
      <a href="${root}symbols/greek.html"><span class="link-icon">Ω</span> Greek Symbols</a>
      <a href="${root}symbols/roman.html"><span class="link-icon">Ⅳ</span> Roman Numerals</a>
      <a href="${root}symbols/weapon.html"><span class="link-icon">⚔️</span> Weapon Symbols</a>
      <a href="${root}symbols/writing.html"><span class="link-icon">✍️</span> Writing Symbols</a>
      <a href="${root}symbols/warning.html"><span class="link-icon">⚠️</span> Warning Symbols</a>
      <a href="${root}symbols/lock.html"><span class="link-icon">🔒</span> Lock & Key Symbols</a>
      <a href="${root}symbols/award.html"><span class="link-icon">🏆</span> Award Symbols</a>
      <a href="${root}symbols/office.html"><span class="link-icon">💼</span> Office Symbols</a>
      <a href="${root}symbols/transport.html"><span class="link-icon">🚗</span> Transport Symbols</a>
      <a href="${root}symbols/dice.html"><span class="link-icon">🎲</span> Dice Symbols</a>
      <a href="${root}symbols/card.html"><span class="link-icon">♠</span> Card Symbols</a>
      <a href="${root}symbols/unit.html"><span class="link-icon">℃</span> Unit Symbols</a>
      <a href="${root}symbols/copyright.html"><span class="link-icon">©</span> Copyright & Legal</a>
      <a href="${root}symbols/religion.html"><span class="link-icon">✝</span> Religion Symbols</a>
      <a href="${root}symbols/bracket.html"><span class="link-icon">【</span> Bracket Symbols</a>
      <a href="${root}symbols/weather.html"><span class="link-icon">☀</span> Weather Symbols</a>
      <a href="${root}symbols/chess.html"><span class="link-icon">♚</span> Chess Symbols</a>
      <a href="${root}symbols/currency.html"><span class="link-icon">$</span> Currency Symbols</a>
      <a href="${root}symbols/medical.html"><span class="link-icon">⚕</span> Medical Symbols</a>
      <a href="${root}symbols/infinity.html"><span class="link-icon">∞</span> Infinity Symbols</a>
      <a href="${root}symbols/gender.html"><span class="link-icon">⚥</span> Gender Symbols</a>
      <a href="${root}symbols/downarrow.html"><span class="link-icon">↓</span> Down Arrow Symbols</a>
      <a href="${root}symbols/uparrow.html"><span class="link-icon">↑</span> Up Arrow Symbols</a>
      <a href="${root}symbols/arrow.html"><span class="link-icon">➶</span> Arrow Symbols</a>
      <a href="${root}symbols/numbers.html"><span class="link-icon">①</span> Number Symbols</a>
      <a href="${root}symbols/zodiac.html"><span class="link-icon">♈</span> Zodiac Symbols</a>
      <a href="${root}symbols/cross.html"><span class="link-icon">✝</span> Cross Symbols</a>
      <a href="${root}symbols/music.html"><span class="link-icon">♫</span> Music Symbols</a>
      <a href="${root}symbols/moon.html"><span class="link-icon">☾</span> Moon Symbols</a>
      <a href="${root}symbols/sun.html"><span class="link-icon">☀</span> Sun Symbols</a>
      <a href="${root}symbols/animal.html"><span class="link-icon">🐾</span> Animal Symbols</a>
    </div>
  </div>
  `;
}

function initSidebar() {
  renderSidebar();

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
// All symbols organized by category for search results
const SYMBOL_CATEGORIES = [
  { name: 'Heart Symbols', icon: '❤️', href: 'symbols/heart.html', symbols: ['❤','♥','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💗','💓','💞','💕','💝','❣','💔','❤️‍🔥','💟','♡','🫀','♥️','💖','💘','💑','🫶','❤️‍🩹','🩷','🩶','🩵'] },
  { name: 'Star Symbols', icon: '⭐', href: 'symbols/star.html', symbols: ['★','☆','✦','✧','✨','⭐','🌟','💫','⚡','✵','✶','✷','✸','✹','✺','✻','✼','❋','✽','✾','✿','❀','❁','✱','✲','✳','❇','❈','❊','✙'] },
  { name: 'Arrow Symbols', icon: '→', href: 'symbols/arrow.html', symbols: ['→','←','↑','↓','↔','↕','➜','➡','⬅','⬆','⬇','⟶','⟵','➤','➢','➣','➥','➦','⇒','⇐','⇑','⇓','⇔','⇕','↩','↪','↰','↱','⤴','⤵'] },
  { name: 'Flower Symbols', icon: '🌸', href: 'symbols/flower.html', symbols: ['🌸','🌺','🌻','🌹','🌷','💐','🌼','🪷','🏵','✿','❀','❁','✾','✽','⚘','꧁','☸','❃','✤','✥','✦','꣸','⁂','※','⊛','⊕','⊗','⊘','⊙','⊚'] },
  { name: 'Check Marks', icon: '✓', href: 'symbols/checkmark.html', symbols: ['✓','✔','☑','✅','❎','☐','☒','✗','✘','❌','✖','✕','⊠','⊡','⊟','⊞','☓','✙','✚','✛','✜','✝','✞','✟','☩','☨','☧','☦','⛊','⛉'] },
  { name: 'Music Symbols', icon: '♪', href: 'symbols/music.html', symbols: ['♪','♫','♬','♭','♮','♯','𝅗𝅥','𝅘𝅥𝅮','𝅘𝅥𝅯','𝅘𝅥𝅰','𝅘𝅥𝅱','𝅘𝅥𝅲','🎵','🎶','🎼','🎤','🎧','🎹','🎸','🎺','🎻','🥁','🪘','🎷','🪗','🪕','🎙','🎚','🎛','📻','🔊'] },
  { name: 'Currency Symbols', icon: '💰', href: 'symbols/currency.html', symbols: ['$','€','£','¥','₹','₿','¢','₩','₪','₫','฿','₱','₦','₡','₲','₵','₸','₼','₾','₺','₻','₽','₿','㎖','＄','￠','￡','￥','￦','元'] },
  { name: 'Math Symbols', icon: '∑', href: 'symbols/math.html', symbols: ['∑','∫','√','∞','≈','≠','≤','≥','±','×','÷','∂','∇','∀','∃','∈','∉','⊂','⊃','∩','∪','∅','∧','∨','⊕','⊗','⊥','∥','∡','∟'] },
  { name: 'Crown & Diamond', icon: '👑', href: 'symbols/crown.html', symbols: ['👑','💎','♛','♕','♚','♔','🏆','🎖','🥇','🥈','🥉','🏅','🎗','💍','💠','🔷','🔹','◇','◆','⬥','⬦','♦','♦️','🃏','🎴','🀄','🎰','🎲','🎯'] },
  { name: 'Weather Symbols', icon: '🌤', href: 'symbols/weather.html', symbols: ['☀','🌤','⛅','🌥','☁','🌦','🌧','⛈','🌩','🌨','❄','🌪','🌫','🌬','🌀','🌈','🌂','☂','☔','⛱','⚡','🌊','🌋','⛰','🏔','🗻','🌁','🌃','🌆','🌇'] },
  { name: 'Zodiac Signs', icon: '♈', href: 'symbols/zodiac.html', symbols: ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','⛎','🔯','✡','☯','☮','✝','☪','🕉','⚛','🛐','🔱','⚜','🏵','🎌','🎏','🎐','🪬','🧿'] },
  { name: 'Aesthetic Symbols', icon: '✧', href: 'symbols/aesthetic.html', symbols: ['✧','·','°','•','○','●','◉','◎','◌','◍','◐','◑','◒','◓','◔','◕','◖','◗','◘','◙','◚','◛','◜','◝','◞','◟','◠','◡','◢','◣'] },
  { name: 'Hand Symbols', icon: '✌️', href: 'symbols/hand.html', symbols: ['👋','🤚','🖐','✋','🖖','👌','🤌','🤏','✌','🤞','🤟','🤘','🤙','👈','👉','👆','🖕','👇','☝','👍','👎','✊','👊','🤛','🤜','🤝','🙌','👐','🤲','🙏'] },
  { name: 'Smiley Faces', icon: '😊', href: 'symbols/emoji-faces.html', symbols: ['😀','😁','😂','🤣','😃','😄','😅','😆','😉','😊','😋','😎','😍','🤩','😘','😗','😙','😚','🙂','🤗','🤭','🤫','🤔','🤐','🤨','😐','😑','😶','😏','😒'] },
  { name: 'Square Symbols', icon: '⬛', href: 'symbols/square.html', symbols: ['■','□','▢','▣','⬚','⧠','▪','▫','▬','█','⊞','⊟','⊠','⊡','❏','❐','❑','❒','◧','','◨','◩','◪','◫','▱','▰','░','▒','▓','▤','▥','▦','▧','▨','▩'] },
  { name: "Dot Symbols", icon: "•", href: "symbols/dot.html", symbols: ["•","·","∙","⋅","●","○","◉","◎","⊙","⊚","°","º","…","⋮","⋯","∴","∵","∷","⚫","⚪","🔴","🔵","🟠","🟡","🟢","🟣","🟤","💠","⁝","⁞"] },
  { name: "Circle Symbols", icon: "○", href: "symbols/circle.html", symbols: ["○","●","◯","◉","◎","⊙","⊚","⊛","◌","◍","◐","◑","◒","◓","◔","◕","◖","◗","⊕","⊖","⊗","⊘","①","②","③","④","⑤","⑥","⑦","⑧"] },
  { name: "Loading Symbols", icon: "▓", href: "symbols/loading.html", symbols: ["█","▓","▒","░","▰","▱","■","□","▪","▫","◼","◻","◾","◽","⬛","⬜","⌛","⏳","🔄","↻","↺","⟳"] },
  { name: "Wave Symbols", icon: "〰", href: "symbols/wave.html", symbols: ["~","〰","﹏","🌊","≈","≋","≌","∽","∾","∿","≀","≁","≂","≃","≄","≅"] },
  { name: "Bracket Symbols", icon: "【", href: "symbols/bracket.html", symbols: ["『","』","「","」","【","】","〔","〕","︵","︶","︷","︸","︹","︺","︻","︼","︽","︾","︿","﹀","﹁","﹂","﹃","﹄","(",")","<",">","{","}","〘","〙","〚","〛","〖","〗","«","»","《","》","〈","〉","❨","❩","❪","❫","❬","❭","❮","❯","❰","❱","❲","❳","❴","❵"] },
  { name: "Divider Symbols", icon: "┊", href: "symbols/divider.html", symbols: ["┊","┋","┆","┇","│","┃","─","━","╭","╮","╰","╯","═","║","╔","╗","╚","╝","╌","╍","┈","┉","┄","┅","⋆","〰","➶","｡","˚","☁","✧","૪","➵","✩","◛","❁","۪","ུ","ཻ","͎","♡","⁺"] },
  { name: "Border Symbols", icon: "╔", href: "symbols/border.html", symbols: ["┌","┐","└","┘","┏","┓","┗","┛","╔","╗","╚","╝","╭","╮","╰","╯","├","┤","┬","┴","┼","┣","┫","┳","┻","╋","╠","╣","╦","╩","╬","═","║","━","┃","─","│"] },
  { name: "Sparkle Symbols", icon: "✨", href: "symbols/sparkle.html", symbols: ["✨","❇","❈","❅","❆","❄","⋆","✦","✧","✵","✶","✷","✸","✹","✺","✻","✼","✽","✾","✿","❀","❁","❂","❃","✣","✤","✥","🌟","💫","☄","ﾟ","｡","*"] },
  { name: "Aesthetic Symbols", icon: "✧", href: "symbols/aesthetic.html", symbols: ["✧","✦","⋆","˚","·","⁺","✩","☽","☾","☯","☮","✿","❀","ꕤ","ꕥ","𖧷","𖤐","᯽","⚘","✾","❃","❋","✺","✻","✼","❊","☘","༄","༅","༆","꒰","꒱","꒦","꒷","ᵎ","⌇","ˊ","ˋ","˗","˖","ılı","lıllılı","■","□","▶︎","◁◁","𝚰𝚰","▷▷","↻","▓"] },
  { name: "Crypto Symbols", icon: "₿", href: "symbols/crypto.html", symbols: ["₿","Ξ","₮","₳","✕","◎","●","Ð","◈","Ł","Ƀ","O","∞","ξ","ɱ","ꜩ","ɨ","ɛ","M","ⓩ","Ӿ","Ʀ","§","¤","₣","₢","₰","₱","฿","₡","₥","₦","₧","₨","₩","₪","₫"] },
  { name: "Quotation Symbols", icon: "❝", href: "symbols/quotation.html", symbols: ["«","‹","»","›","„","“","‟","”","❝","❞","❮","❯","〝","〞","〟","＂","″","‚","‘","‛","’","❜","❛","\"","'",".","-","—","_","=","•","▸","·","··","…","?","¿",";",":","!","¡","#","%","&","*",",","@","、","。","≈","^","ˇ","´","`","˔","˕","˖","˗","˘","˙","˚","˛","~","˝","ˠ","l","~","❗️","❓","❌"] },
  { name: "Diamond Symbols", icon: "◆", href: "symbols/diamond.html", symbols: ["⋄","◆","◇","◈","◊","♦","⟐","⬦","⧫","⬙","⬘","⬗","⬖","◧","◨","◩","◪","❖","✧","✦","⯁","⯂","⯃","⯄","💎","💍","💠","🔸","🔹","🔶","🔷","💮"] },
  { name: "House Symbols", icon: "🏠", href: "symbols/house.html", symbols: ["⌂","🏠","🏘️","🏚️","🏡","🛖","🏰","🏯","⛺","🏢","🏣","🏤","🏥","🏦","🏨","🏩","🏪","🏫","🏬","🏭","🏛️","⛪","🕌","🕍","🛕","🕋","⛩️","🏙️","🏗️"] },
  { name: "Old English Font", icon: "𝔄", href: "symbols/old-english.html", symbols: ["𝔄","𝔅","ℭ","𝔇","𝔈","𝔉","𝔊","ℌ","ℑ","𝔍","𝔎","𝔏","𝔐","𝔑","𝔒","𝔓","𝔔","ℜ","𝔖","𝔗","𝔘","𝔙","𝔚","𝔛","𝔜","ℨ","𝔞","𝔟","𝔠","𝔡","𝔢","𝔣","𝔤","𝔥","𝔦","𝔧","𝔨","𝔩","𝔪","𝔫","𝔬","𝔭","𝔮","𝔯","𝔰","𝔱","𝔲","𝔳","𝔴","𝔵","𝔶","𝔷"] },
  { name: "Upside Down Text", icon: "ʇ", href: "symbols/upside-down.html", symbols: ["∀","𐐒","Ɔ","ᗡ","Ǝ","Ⅎ","⅁","H","I","ſ","⋊","˥","W","N","O","Ԁ","Ὁ","ᴚ","S","⊥","∩","Ʌ","M","X","⅄","Z","ɐ","q","ɔ","p","ǝ","ɟ","ƃ","ɥ","ᴉ","ɾ","ʞ","l","ɯ","u","o","d","b","ɹ","s","ʇ","n","ʌ","ʍ","x","ʎ","z"] },
  { name: "Cursive Font", icon: "𝒜", href: "symbols/cursive.html", symbols: ["𝒜","ℬ","𝒞","𝒟","ℰ","ℱ","𝒢","ℋ","ℐ","𝒥","𝒦","ℒ","ℳ","𝒩","𝒪","𝒫","𝒬","ℛ","𝒮","𝒯","𝒰","𝒱","𝒲","𝒳","𝒴","𝒵","𝒶","𝒷","𝒸","𝒹","ℯ","𝒻","ℊ","𝒽","𝒾","𝒿","𝓀","𝓁","𝓂","𝓃","ℴ","𝓅","𝓆","𝓇","𝓈","𝓉","𝓊","𝓋","𝓌","𝓍","𝓎","𝓏"] },
  { name: "Bubble Text", icon: "ⓐ", href: "symbols/bubble.html", symbols: ["🅐","🅑","🅒","🅓","🅔","🅕","🅖","🅗","🅘","🅙","🅚","🅛","🅜","🅝","🅞","🅟","🅠","🅡","🅢","🅣","🅤","🅥","🅦","🅧","🅨","🅩","Ⓐ","Ⓑ","Ⓒ","Ⓓ","Ⓔ","Ⓕ","Ⓖ","Ⓗ","Ⓘ","Ⓙ","Ⓚ","Ⓛ","Ⓜ","Ⓝ","Ⓞ","Ⓟ","Ⓠ","Ⓡ","Ⓢ","Ⓣ","Ⓤ","Ⓥ","Ⓦ","Ⓧ","Ⓨ","Ⓩ","ⓐ","ⓑ","ⓒ","ⓓ","ⓔ","ⓕ","ⓖ","ⓗ","ⓘ","ⓙ","ⓚ","ⓛ","ⓜ","ⓝ","ⓞ","ⓟ","ⓠ","ⓡ","ⓢ","ⓣ","ⓤ","ⓥ","ⓦ","ⓧ","ⓨ","ⓩ"] },
  { name: "Korean Symbols", icon: "ㅿ", href: "symbols/korean.html", symbols: ["ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄸ","ㄹ","ㄺ","ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ","ㅃ","ㅄ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ","ㅏ","ㅐ","ㅑ","ㅒ","ㅓ","ㅔ","ㅕ","ㅖ","ㅗ","ㅘ","ㅙ","ㅚ","ㅛ","ㅜ","ㅝ","ㅞ","ㅟ","ㅠ","ㅡ","ㅢ","ㅣ","ㅿ","ㆁ","ㆆ","ㆀ","ㅸ","ㆄ"] },
  { name: "Japanese Symbols", icon: "あ", href: "symbols/japanese.html", symbols: ["あ","ぁ","い","ぃ","う","ぅ","え","ぇ","お","ぉ","か","が","き","ぎ","く","ぐ","け","げ","こ","ご","さ","ざ","し","じ","す","ず","せ","ぜ","そ","ぞ","た","だ","ち","ぢ","つ","っ","づ","て","で","と","ど","な","に","ぬ","ね","の","は","ば","ぱ","ひ","び","ぴ","ふ","ぶ","ぷ","へ","べ","ぺ","ほ","ぼ","ぽ","ま","み","む","め","も","や","ゃ","ゆ","ゅ","よ","ょ","ら","り","る","れ","ろ","わ","ゎ","ゐ","ゑ","を","ん","ゔ","ゕ","ゖ","゛","゜","ゝ","ゞ","ゟ","ア","ァ","イ","ィ","ウ","ゥ","エ","ェ","オ","ォ","カ","ガ","キ","ギ","ク","グ","ケ","ゲ","コ","ゴ","サ","ザ","シ","ジ","ス","ズ","セ","ゼ","ソ","ゾ","タ","ダ","チ","ヂ","ツ","ッ","ヅ","テ","デ","ト","ド","ナ","ニ","ヌ","ネ","ノ","ハ","バ","パ","ヒ","ビ","ピ","フ","ブ","プ","ヘ","ベ","ペ","ホ","ボ","ポ","マ","ミ","ム","メ","モ","ヤ","ャ","ユ","ュ","ヨ","ョ","ラ","リ","ル","レ","ロ","ワ","ヮ","ヰ","ヱ","ヲ","ン","ヴ","ヵ","ヶ","・","ー","ヽ","ヾ","ヿ"] },
  { name: "Chinese Symbols", icon: "愛", href: "symbols/chinese.html", symbols: ["愛","㊊","㊋","㊌","㊍","㊎","㊏","㊐","㊑","㊒","㊓","㊔","㊕","㊖","㊗","㊘","㊙","㊚","㊛","㊜","㊝","㊞","㊟","㊠","㊡","㊢","㊣","㊤","㊥","㊦","㊧","㊨","㊩","㊪","㊫","㊬","㊭","福","運","和","平","美","命","力","心","夢","光","神","星","花","鳥","風","月","金","木","水","火","土","天","空","海","冬"] },
  { name: "German Symbols", icon: "ß", href: "symbols/german.html", symbols: ["Ä","ä","Ö","ö","Ü","ü","ß","ẞ","„","“","‚","‘","«","»","‹","›","€","§"] },
  { name: "Punctuation Marks", icon: "!", href: "symbols/punctuation.html", symbols: ["«","‹","»","›","„","“","”","\"",",","❝","❞","❮","❯","〝","〞","〟","〃","'","‛","‘","’","❜",".","-","–","—","=","•","▸","‥","...","·","′","″","‴","‵","?","ʕ","∧","∨","^","ˇ","⁻","´","\\",":","⍩",")","(","₊","₋","+","◡","∘","،","~","ɣ","|","¿",";","!","#","%","&","*","@","、","。","≈","❗","❓","❌"] },
  { name: "Corner Symbols", icon: "╚", href: "symbols/corner.html", symbols: ["┌","┐","└","┘","╭","╮","╰","╯","┍","┎","┏","┑","┒","┓","┕","┖","┗","┙","┚","┛","╔","╗","╚","╝","╒","╓","╕","╖","╘","╙","╛","╜","═","║","╞","╟","╠","╡","╢","╣","╤","╥","╦","╧","╨","╩","╪","╫","╬","├","┝","┞","┟","┠","┡","┢","┣","┤","┥","┦","┧","┨","┩","┪","┫","┬","┭","┮","┯","┰","┱","┲","┳","┴","┵","┶","┷","┸","┹","┺","┻","┼","┽","┾","┿","╀","╁","╂","╃","╄","╅","╆","╇","╈","╉","╊","╋"] },
  { name: "Rectangle Symbols", icon: "█", href: "symbols/rectangle.html", symbols: [" ","▂","▃","▄","▅","▆","▇","█","▉","▊","▋","▌","▍","▎","▏","▐","▔","▕","░","▒","▓","▖","▗","▘","▙","▚","▛","▜","▝","▞","▟","▬","▭","▮","▯","▰","▱"] },
  { name: "Square Symbols", icon: "■", href: "symbols/square.html", symbols: ["■","□","▢","▣","⬚","⧠","▪","▫","⬝","◼","◻","◾","◽","⬛","⬜","❑","❒","🔳","🔲","▬","█","⊞","⊟","⊠","⊡","回","⎔","⌑","⛾","⛋","▤","▥","▦","▧","▨","▩","◧","◨","◩","◪","◫","◰","◱","◲","◳","◴","◵","◶","◷","░","▒","▓","🟥","🟦","🟧","🟨","🟩","🟪","🟫"] },
  { name: "Triangle Symbols", icon: "▲", href: "symbols/triangle.html", symbols: ["▲","△","▼","▽","▶","▷","◀","◁","▴","▵","▾","▿","▸","▹","◂","◃","◄","∇","⊿","◬","◭","◮","◿","◺","◢","◣","◥","◤","⍋","⍒","⍿","⎊","🔺","🔻","🔼","🔽","⏪","⏩","📐","⚠️","⃤"] },
  { name: "Line Symbols", icon: "│", href: "symbols/line.html", symbols: ["|","│","┃","║","┆","┇","┊","┋","╎","╏","╵","╷","╹","╻","⎸","⎹","-","─","━","═","_","¯","╴","╶","╸","╺","╼","╾","┄","┅","┈","┉","╌","╍","≡","☰","☱","☲","☳","☴","☵","☶","☷","/","\\","╱","╲","⧹","⧸","⟋","⟍","~","〰","﹏","﹌","﹋","◡","◠","╭","╮","╯","╰","✕","╳"] },
  { name: "Circle Symbols", icon: "○", href: "symbols/circle.html", symbols: ["○","◌","☮","◍","●","◐","◑","◒","◓","◔","◕","◖","◗","◉","◚","◛","◜","◝","◞","◟","◠","◡","◯","◴","◵","◶","◷","⊙","◦","✪","❂","❍","⚲","ⵁ","◎","⍥","⍜","⍟","⍠","⍡","⍢","⍣","⍤","🔴","🟠","🟡","🟢","🔵","🟣","🟤","⚫","⚪","🔘","⭕","⊕","⊖","⊗","⊘","∅","⊚","⊛","⊜","⊝","⦸","⦹","⦺","⦻","∘","∙","①","②","③","④","⑤","⑥","⑦","⑧","⑨","⑩","Ⓐ","Ⓑ","Ⓒ","Ⓓ","Ⓔ","Ⓕ","Ⓖ","Ⓗ","Ⓘ","Ⓙ","Ⓚ","Ⓛ","Ⓜ","Ⓝ","Ⓞ","Ⓟ","Ⓠ","Ⓡ","Ⓢ","Ⓣ"] },
  { name: "Comparison Symbols", icon: "≥", href: "symbols/comparison.html", symbols: [">","<","≥","≤","≧","≦","≨","≩","≮","≯","≰","≱","⋚","⋛","≪","≫","⋘","⋙","⪡","⪢","⪦","⪧","⪨","⪩","⪪","⪫","⪬","⪭","⪮","⪯","⪰","⪱","=","≠","≈","≉","≃","≄","≅","≇","≊","≋","∾","∿","≂","≆","≌","≍","≎","≏","≚","≛","≡","≢","≐","≑","≒","≓","≔","≕","≖","≗","≘","≙","≜","≝","≞","≟","⊜"] },
  { name: "Fraction Symbols", icon: "½", href: "symbols/fraction.html", symbols: ["¼","½","¾","⅐","⅑","⅒","⅓","⅔","⅕","⅖","⅗","⅘","⅙","⅚","⅛","⅜","⅝","⅞","⅟","⁄","↉"] },
  { name: "Greek Symbols", icon: "Ω", href: "symbols/greek.html", symbols: ["Α","Β","Γ","Δ","Ε","Ζ","Η","Θ","Ι","Κ","Λ","Μ","Ν","Ξ","Ο","Π","Ρ","Σ","Τ","Υ","Φ","Χ","Ψ","Ω","α","β","γ","δ","ε","ζ","η","θ","ι","κ","λ","μ","ν","ξ","ο","π","ρ","σ","ς","τ","υ","φ","χ","ψ","ω"] },
  { name: "Roman Numerals", icon: "Ⅳ", href: "symbols/roman.html", symbols: ["Ⅰ","Ⅱ","Ⅲ","Ⅳ","Ⅴ","Ⅵ","Ⅶ","Ⅷ","Ⅸ","Ⅹ","Ⅺ","Ⅻ","Ⅼ","Ⅽ","Ⅾ","Ⅿ","ⅰ","ⅱ","ⅲ","ⅳ","ⅴ","ⅵ","ⅶ","ⅷ","ⅸ","ⅹ","ⅺ","ⅻ","ⅼ","ⅽ","ⅾ","ⅿ","ↀ","ↁ","ↂ","Ↄ","ↄ","ↅ","ↆ","ↇ","ↈ"] },
  { name: "Weapon Symbols", icon: "⚔️", href: "symbols/weapon.html", symbols: ["⚔️","🗡️","🏹","🛡️","🔱","💣","🧨","🔫","💥","🔥","🔪","🍴","✂️","🧷","⛓️","☠️","💀","☣️","☢️","⚠️"] },
  { name: "Writing Symbols", icon: "✍️", href: "symbols/writing.html", symbols: ["⊙","✏️","✎","✐","✑","✒️","🖋️","🖊️","🖌️","🖍️","✍️","📝","📋","🗒️","📅"] },
  { name: "Warning Symbols", icon: "⚠️", href: "symbols/warning.html", symbols: ["⚠","⚠️","☢","☢️","☣","☣️","🚸","🚫","🔞","📵","🚳","🚭","🚯","🚱","🚷","⛔"] },
  { name: "Lock & Key Symbols", icon: "🔒", href: "symbols/lock.html", symbols: ["🔒","🔓","🔏","🔐","🔑","🗝️"] },
  { name: "Award Symbols", icon: "🏆", href: "symbols/award.html", symbols: ["🏆","🏅","🥇","🥈","🥉","🎖️"] },
  { name: "Office Symbols", icon: "💼", href: "symbols/office.html", symbols: ["⌚","⌛","⌕","☎","☏","✆","⌨","💻","🖥️","📠","📟","📴","✁","✂","✃","✄","✍️","✏️","✎","✐","✑","✒️","📋","📌","📍","📎","📏","💼","📁","📂","📅","📆","📇","📈","📉","📊","📝","📃","📜","📄","📰","📑","📓","📕","📖","📗","📘","📙","📚","📔","📒","🔖","✉","📧","📨","📩","📤","📥","📦","📫","📪","📮"] },
  { name: "Transport Symbols", icon: "🚗", href: "symbols/transport.html", symbols: ["🚂","🚃","🚄","🚅","🚆","🚇","🚈","🚉","🚊","🚌","🚍","🚎","🚐","🚑","🚒","🚓","🚔","🚕","🚗","🚘","🚙","🏎️","🚚","🚛","🚜","🏍️","🛵","🦽","🦼"] },
  { name: "Dice Symbols", icon: "🎲", href: "symbols/dice.html", symbols: ["⚀","⚁","⚂","⚃","⚄","⚅","🎲"] },
  { name: "Card Symbols", icon: "♠", href: "symbols/card.html", symbols: ["♤","♠","♧","♣","♡","♥","♢","♦","⚀","⚁","⚂","⚃","⚄","⚅","🎲"] },
  { name: "Unit Symbols", icon: "℃", href: "symbols/unit.html", symbols: ["°","℃","℉","ϟ","㎎","㎏","㎜","㎝","㎞","㎡","㏄","KM","㏑","㏒","㏕","lb","㎐","Ω","㏐","psi","㏅","Φ","dz"] },
  { name: "Copyright & Legal Symbols", icon: "©", href: "symbols/copyright.html", symbols: ["©","®","™","℠","℗","§","¶","℡","‱","‰","№","℀","℁","℅","℆","A/S","☊","☎","☏","⌨","✁","✂","✃","✄","⌕","✇","✈","✉","✎","✏","✐","✑","✒","✌️","☝️","☞","☛","☟","☜","☚","✍️"] },
  { name: "Religion Symbols", icon: "✝", href: "symbols/religion.html", symbols: ["☸","✚","✛","✜","✝","ॐ","✞","✟","†","☥","☪","☩","☦","☨","☧","♁","♆","☬","✡","ﷲ"] },
  { name: "Bracket Symbols", icon: "【", href: "symbols/bracket.html", symbols: ["{","}","(",")","[","]","<",">","「","」","『","』","【","】","〔","〕","〖","〗","〘","〙","〚","〛","《","》","⟨","⟩","«","»","‹","›","︵","︶","︷","︸","︹","︺","︻","︼","︽","︾","︿","﹀","﹁","﹂","﹃","﹄","﹉","﹊","﹋","﹌","﹍","﹎","﹏","〰","〃","〆","々","〄","〇","〓","〡","〢","〣","〤","〥","〦","〧","〨","〩","〝","〞","〟","〾","㊣","〒"] },
  { name: "Weather Symbols", icon: "☀", href: "symbols/weather.html", symbols: ["☉","☼","☀","❅","❆","❄","ϟ","☁","༄","☇","☈","♨","☂","☄","〰","⛅","🌦","🌧","⛈","🌩","🌪","🌫","🌤","🌨","⚡","🌀","💨","🌬","🌡","💧","🌊","🔥","🥶","☔","🌂","🌈","☃","⛄","⛷","🏂","⛰","🌌","🏙"] },
  { name: "Chess Symbols", icon: "♚", href: "symbols/chess.html", symbols: ["♔","♕","♖","♗","♘","♙","♚","♛","♜","♝","♞","♟","👑","🤴","👸","♤","♠","♧","♣","♡","♥","♢","♦"] },
  { name: "Currency Symbols", icon: "$", href: "symbols/currency.html", symbols: ["$","€","£","¥","₩","₹","₽","₺","฿","₱","¢","¤","֏","؋","৳","៛","₡","₢","₣","₤","₦","₪","₫","₭","₮","₲","₴","₵","₸","₼","₾","₿","Ξ","Ł","Rs","Rp","kr","Ft","zł","R$","C$","HK$","د.إ","﷼"] },
  { name: "Medical Symbols", icon: "⚕", href: "symbols/medical.html", symbols: ["💉","👩‍⚕️","👨‍⚕️","🥼","🏥","🩺","💊","⛑","☣","♀","♂","⚕","🤰","🤱","🦠","🦴","🧪","🧫","🧬","🧴"] },
  { name: "Infinity Symbols", icon: "∞", href: "symbols/infinity.html", symbols: ["∞","♾","⧜","⧝","⧞","⧟","∝","ꚙ","Ꚙ","⚭","⚯","⚮"] },
  { name: "Gender Symbols", icon: "⚥", href: "symbols/gender.html", symbols: ["♀","♂","⚲","⚢","⚣","⚤","⚥","⚦","⚧","⚨","⚩","👩","👨","🧑","👭","👬","👫"] },
  { name: "Down Arrow Symbols", icon: "↓", href: "symbols/downarrow.html", symbols: ["↓","⬇","⇩","⏬","🔽","👇","↧","⇊","⇟","↘","↙","⇘","⇙","⤡","⤢","↕","⇕","⇅","⥯","⥮","↵","↳","↴","⤵","↯","↲","↶","↷","⇃","⇂","⤓","⤋","⤈","⥥","⥧"] },
  { name: "Up Arrow Symbols", icon: "↑", href: "symbols/uparrow.html", symbols: ["↑","⬆","⇧","⇑","⇡","↟","↥","⇈","🔼","👆","↗","↖","⇗","⇖","↕","⇕","⇅","⥯","⥮","↰","↱","⤴","⤊","⤉","⥣","⥦","⇪"] },
  { name: "Arrow Symbols", icon: "➶", href: "symbols/arrow.html", symbols: ["←","↑","→","↓","↔","↕","↖","↗","↘","↙","↚","↛","↜","↝","↞","↟","↠","↡","↢","↣","↤","↥","↦","↧","↨","↩","↪","↫","↬","↭","↮","↯","↰","↱","↲","↳","↴","↵","↶","↷","↸","↹","↺","↻","↼","↽","↾","↿","⇀","⇁","⇂","⇃","⇄","⇅","⇆","⇇","⇈","⇉","⇊","⇋","⇌","⇍","⇎","⇏","⇐","⇑","⇒","⇓","⇔","⇕","⇖","⇗","⇘","⇙","⇚","⇛","⇜","⇝","⇞","⇟","⇠","⇡","⇢","⇣","⇤","⇥","⇦","⇧","⇨","⇩","⇪","⇫","⇬","⇭","⇮","⇯","➲","➳","➴","➵","➶","➷","➸","➹","➺","➻","➼","➽","🏹","💘","💌","🔙","🔚","🔛","🔜","🔝"] },
  { name: "Number Symbols", icon: "①", href: "symbols/numbers.html", symbols: ["Ⅰ","Ⅱ","Ⅲ","Ⅳ","Ⅴ","Ⅵ","Ⅶ","Ⅷ","Ⅸ","Ⅹ","Ⅺ","Ⅻ","Ⅼ","Ⅽ","Ⅾ","Ⅿ","ⅰ","ⅱ","ⅲ","ⅳ","ⅴ","ⅵ","ⅶ","ⅷ","ⅸ","ⅹ","ⅺ","ⅻ","ⅼ","ⅽ","ⅾ","ⅿ","ↀ","ↁ","ↂ","⓪","①","②","③","④","⑤","⑥","⑦","⑧","⑨","⑩","⑪","⑫","⑬","⑭","⑮","⑯","⑰","⑱","⑲","⑳","⓿","❶","❷","❸","❹","❺","❻","❼","❽","❾","❿","⓫","⓬","⓭","⓮","⓯","⓰","⓱","⓲","⓳","⓴","⑴","⑵","⑶","⑷","⑸","⑹","⑺","⑻","⑼","⑽","⒈","⒉","⒊","⒋","⒌","⒍","⒎","⒏","⒐","⒑","⁰","¹","²","³","⁴","⁵","⁶","⁷","⁸","⁹","₀","₁","₂","₃","₄","₅","₆","₇","₈","₉","½","⅓","⅔","¼","¾","⅕","⅖","⅗","⅘","⅙","⅚","⅛","⅜","⅝","⅞"] },
  { name: "Zodiac Symbols", icon: "♈", href: "symbols/zodiac.html", symbols: ["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓","☿","♀","⊕","♁","♂","♃","♄","♅","♆","♇","⚳","☄","☉","☼","☀","☽","☾","🌑","🌒","🌓","🌔","🌕","🌖","🌗","🌘","🌙","🌛","🌜","🌝","🌞","⭐","🌟","✨"] },
  { name: "Cross Symbols", icon: "✝", href: "symbols/cross.html", symbols: ["+","✛","✜","†","✞","✟","✝","☥","✙","☦","☨","☩","♁","☒","⁜","✠","✕","❎","❌","✖","✗","✘","×","χ","𝒳","⨉","±","∓"] },
  { name: "Music Symbols", icon: "♫", href: "symbols/music.html", symbols: ["♩","♪","♫","♬","♭","♮","♯","𝄞","🄢","🄡","🄪","🄫","🎵","🎶","🎼","🔊","🔉","🔈","🔇","📯","🔔","🔕","🎹","🎻","🎷","🎸","🎺","🥁","🎤","🎙","🎧","📻","🎚","🎛","📼","🪕"] },
  { name: "Moon Symbols", icon: "☾", href: "symbols/moon.html", symbols: ["🌑","🌒","🌓","🌔","🌕","🌖","🌗","🌘","🌙","🌚","🌝","🌛","🌜","☾","☽","☪","⭐","🌟","✨","☄","🌠","🌌","💫"] },
  { name: "Sun Symbols", icon: "☀", href: "symbols/sun.html", symbols: ["☀","☼","🌞","☀️","🌤","⛅","🌥","🌦","🔆","🔅","🎇","❂","🌣","🌅","🌄","🌇","🌆","🏜","🏖","⛱"] },
  { name: "Animal Symbols", icon: "🐾", href: "symbols/animal.html", symbols: ["🐵","🐒","🦍","🦧","🐶","🐕","🦮","🐕‍🦺","🐩","🐺","🦊","🦝","🐱","🐈","🐈‍⬛","🦁","🐯","🐅","🐆","🐴","🐎","🦄","🦓","🦌","🦬","🐮","🐂","🐃","🐄","🐷","🐖","🐗","🐽","🐏","🐑","🐐","🐪","🐫","🦙","🦒","🐘","🦣","🦏","🦛","🐭","🐁","🐀","🐹","🐰","🐇","🐿️","🦫","🦔","🦇","🐻","🐻‍❄️","🐨","🐼","🦥","🦦","🦨","🦘","🦡","🐾","💩","🦃","🐔","🐓","🐣","🐤","🐥","🐦","🐧","🕊️","🦅","🦆","🦢","🦉","🦤","🪶","🦩","🦚","🦜","🐊","🐢","🦎","🐍","🐉","🐲","🦕","🦖","🐳","🐋","🐬","🦭","🐟","🐠","🐡","🦈","🐙","🐚","🪸","🪼","🐌","🦋","🐛","🐜","🐝","🪲","🐞","🦗","🪳","🕷️","🕸️","🦂","🦟","🪰","🪱","🦠","𓃒","𓃓","𓃔","𓃕","𓃖","𓃗","𓃘","𓃙","𓃚","𓃛","𓃜","𓃝","𓃞","𓃟","𓃠","𓃡","𓃢","𓃣","𓃤","𓃥","𓃦","𓃧","𓃨","𓃩","𓃪","𓃫","𓃬","𓃭","𓃮","𓃯","𓃰","𓃱","𓃲","𓃳","𓃴","𓃵","𓃶","𓃷","𓃸","𓃹","𓃺","𓃻","𓃼","𓃽","𓃾","𓃿","𓅀","𓅁","𓅂","𓅃","𓅄","𓅅","𓅆","𓅇","𓅈","𓅉","𓅊","𓅋","𓅌","𓅍","𓅎","𓅏","𓅐","𓅑","𓅒","𓅓","𓅔","𓅕","𓅖","𓅗","𓅘","𓅙","𓅚","𓅛","𓅜","𓅝","𓅞","𓅟","𓅠","𓅡","𓅢","𓅣","𓅤","𓅥","𓅦","𓅧","𓅨","𓅩","𓅪","𓅫","𓅬","𓅭","𓅮","𓅯","𓅰","𓅱","𓅲","𓅳","𓅴","𓅵","𓅶","𓅷","𓅸","𓅹","𓅺","𓅻","𓅼","𓅽","𓅾","𓅿","𓆀","𓆁","𓆂","𓆃","𓆄","𓆅","𓆆","𓆇","𓆈","𓆉","𓆊","𓆋","𓆌","𓆍","𓆎","𓆏","𓆐","𓆑","𓆒","𓆓","𓆔","𓆕","𓆖","𓆗","𓆘","𓆙","𓆚","𓆛","𓆜","𓆝","𓆞","𓆟","𓆠","𓆡","𓆢","𓆣","𓆤","𓆥","𓆦","𓆧","𓆨"] }
];

function initSearch() {
  const searchBox = document.getElementById('searchBox');
  if (!searchBox) return;

  // Find the main content area sections to show/hide during search
  const mainContent = document.querySelector('.main-content');
  if (!mainContent) return;

  // Create a dedicated search results container
  let searchResultsContainer = document.getElementById('searchResults');
  if (!searchResultsContainer) {
    searchResultsContainer = document.createElement('div');
    searchResultsContainer.id = 'searchResults';
    searchResultsContainer.style.display = 'none';
    // Insert right after the hero section
    const hero = mainContent.querySelector('.hero');
    if (hero) hero.after(searchResultsContainer);
    else mainContent.prepend(searchResultsContainer);
  }

  // Collect all existing page sections to hide during search
  const allSections = () => mainContent.querySelectorAll(':scope > *:not(#searchResults):not(.hero)');

  searchBox.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    if (!query) {
      // Restore normal view
      searchResultsContainer.style.display = 'none';
      allSections().forEach(el => el.style.display = '');
      return;
    }

    // Hide normal page content, show search results
    allSections().forEach(el => el.style.display = 'none');
    searchResultsContainer.style.display = '';

    // Find matching categories (by name or individual symbol text)
    const matched = SYMBOL_CATEGORIES.filter(cat =>
      cat.name.toLowerCase().includes(query) ||
      cat.symbols.some(s => s.toLowerCase().includes(query))
    );

    if (matched.length === 0) {
      searchResultsContainer.innerHTML = `
        <div style="text-align:center;padding:60px 20px;color:#9ca3af;">
          <div style="font-size:3rem;margin-bottom:12px;">🔍</div>
          <p style="font-size:1.1rem;font-weight:600;">No results for "<em>${query}</em>"</p>
          <p style="font-size:0.9rem;margin-top:6px;">Try searching: heart, star, arrow, flower…</p>
        </div>`;
      return;
    }

    let html = `<p style="font-size:0.85rem;color:#9ca3af;margin-bottom:20px;">
      ${matched.length} categor${matched.length === 1 ? 'y' : 'ies'} found for "<strong>${query}</strong>"
    </p>`;

    matched.forEach(cat => {
      // Filter symbols that match the query (or show all if category name matched)
      const categoryNameMatch = cat.name.toLowerCase().includes(query);
      const visibleSymbols = categoryNameMatch
        ? cat.symbols
        : cat.symbols.filter(s => s.toLowerCase().includes(query));

      html += `
        <div class="section-title" style="margin-top:20px;">
          <span class="icon">${cat.icon}</span>
          <a href="${cat.href}" style="color:inherit;hover:color:#0d9488;">${cat.name}</a>
          <span class="line"></span>
          <a href="${cat.href}" style="font-size:0.78rem;color:#0d9488;font-weight:500;white-space:nowrap;">View all →</a>
        </div>
        <div class="symbol-grid" style="margin-bottom:24px;">
          ${visibleSymbols.map(s => `
            <div class="symbol-item" onclick="copyToClipboard('${s.replace(/'/g,"\\'")}'); this.classList.add('copied'); setTimeout(()=>this.classList.remove('copied'),800);">
              ${s}
            </div>`).join('')}
        </div>`;
    });

    searchResultsContainer.innerHTML = html;
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
  'Brackets Text': (text) => '『' + text + '』',
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

  const baseFonts = Object.keys(fontMaps);

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

// ===== QUICK LINKS GRID (INTERNAL LINKING ON ALL PAGES) =====
function renderQuickLinks() {
  const mainContent = document.querySelector('.main-content');
  if (!mainContent) return;

  const isSubdir = window.location.pathname.includes('/symbols/') || window.location.pathname.includes('/pages/');
  const root = isSubdir ? '../' : '';
  const sym = isSubdir ? '' : 'symbols/';

  const links = [
    { href: `${sym}heart.html`, icon: '❤️', label: 'Heart' },
    { href: `${sym}checkmark.html`, icon: '✔️', label: 'Check Mark' },
    { href: `${sym}animal.html`, icon: '🐾', label: 'Text Animal Symbols' },
    { href: `${sym}star.html`, icon: '⭐', label: 'Star' },
    { href: `${sym}sun.html`, icon: '☀', label: 'Sun' },
    { href: `${sym}moon.html`, icon: '☾', label: 'Moon' },
    { href: `${sym}music.html`, icon: '🎵', label: 'Music' },
    { href: `${sym}cross.html`, icon: '✝', label: 'Cross' },
    { href: `${sym}zodiac.html`, icon: '♈', label: 'Zodiac' },
    { href: `${sym}numbers.html`, icon: '①', label: 'Numbers' },
    { href: `${sym}arrow.html`, icon: '⇨', label: 'Arrow' },
    { href: `${sym}uparrow.html`, icon: '↑', label: 'Up Arrow' },
    { href: `${sym}downarrow.html`, icon: '↓', label: 'Down Arrow' },
    { href: `${sym}flower.html`, icon: '✿', label: 'Flower' },
    { href: `${sym}gender.html`, icon: '⚥', label: 'Gender' },
    { href: `${sym}infinity.html`, icon: '∞', label: 'Infinity' },
    { href: `${sym}medical.html`, icon: '⚕', label: 'Medical' },
    { href: `${sym}currency.html`, icon: '$', label: 'Currency' },
    { href: `${sym}chess.html`, icon: '♚', label: 'Chess' },
    { href: `${sym}weather.html`, icon: '☀', label: 'Weather' },
    { href: `${sym}bracket.html`, icon: '【', label: 'Bracket' },
    { href: `${sym}religion.html`, icon: '✝', label: 'Religion' },
    { href: `${sym}copyright.html`, icon: '©', label: 'Copyright, Trademark' },
    { href: `${sym}unit.html`, icon: '℃', label: 'Unit' },
    { href: `${sym}card.html`, icon: '♠', label: 'Card Symbol' },
    { href: `${sym}dice.html`, icon: '🎲', label: 'Dice' },
    { href: `${sym}transport.html`, icon: '🚗', label: 'Transport' },
    { href: `${sym}office.html`, icon: '💼', label: 'Office' },
    { href: `${sym}award.html`, icon: '🏆', label: 'Trophy Medals' },
    { href: `${sym}lock.html`, icon: '🔒', label: 'Lock and Key' },
    { href: `${sym}warning.html`, icon: '⚠️', label: 'Warning' },
    { href: `${sym}writing.html`, icon: '✍️', label: 'Writing' },
    { href: `${sym}weapon.html`, icon: '⚔️', label: 'Weapon' },
    { href: `${sym}roman.html`, icon: 'Ⅳ', label: 'Roman Numerals' },
    { href: `${sym}greek.html`, icon: 'Ω', label: 'Greek alphabet' },
    { href: `${sym}emoji-faces.html`, icon: '🥰', label: 'Smiley Face' },
    { href: `${sym}fraction.html`, icon: '½', label: 'Fraction' },
    { href: `${sym}comparison.html`, icon: '≥', label: 'Comparison' },
    { href: `${sym}line.html`, icon: '│', label: 'Line' },
    { href: `${sym}circle.html`, icon: '○', label: 'Circle' },
    { href: `${sym}triangle.html`, icon: '▲', label: 'Triangle' },
    { href: `${sym}square.html`, icon: '⬛', label: 'Square' },
    { href: `${sym}rectangle.html`, icon: '█', label: 'Rectangle' },
    { href: `${sym}corner.html`, icon: '╚', label: 'Corner' },
    { href: `${sym}punctuation.html`, icon: '!', label: 'Punctuation' },
    { href: `${sym}chinese.html`, icon: '愛', label: 'Chinese' },
    { href: `${sym}japanese.html`, icon: 'あ', label: 'Japanese' },
    { href: `${sym}korean.html`, icon: 'ㅿ', label: 'Korean' },
    { href: `${sym}hand.html`, icon: '✌️', label: 'Hand' },
    { href: `${sym}bubble.html`, icon: 'ⓐ', label: 'Bubble Text' },
    { href: `${sym}cursive.html`, icon: '𝒜', label: 'Cursive Letter' },
    { href: `${sym}upside-down.html`, icon: 'ʇ', label: 'Upside Down Text' },
    { href: `${sym}old-english.html`, icon: '𝔄', label: 'Old Enlish Text' },
    { href: `${sym}house.html`, icon: '🏠', label: 'House' },
    { href: `${sym}crown.html`, icon: '👑', label: 'Crown' },
    { href: `${sym}diamond.html`, icon: '◆', label: 'Daimond' },
    { href: `${sym}quotation.html`, icon: '❝', label: 'Quotation Mark' },
    { href: `${sym}crypto.html`, icon: '₿', label: 'Cryptocurrency' },
    { href: `${sym}loading.html`, icon: '▓', label: 'Loading' },
    { href: `${sym}wave.html`, icon: '〰', label: 'Wave' },
    { href: `${sym}divider.html`, icon: '┊', label: 'Divider' },
    { href: `${sym}border.html`, icon: '╔', label: 'Border' },
    { href: `${sym}sparkle.html`, icon: '✨', label: 'Sparkle' },
    { href: `${sym}aesthetic.html`, icon: '✧', label: 'Aesthetic' },
    { href: `${sym}dot.html`, icon: '•', label: 'Dot' },
    { href: `${sym}german.html`, icon: 'ß', label: 'German' },
    { href: `${sym}pi.html`, icon: 'π', label: 'PI Symbol' },
    { href: `${sym}bullet.html`, icon: '•̈', label: 'Bullet Point' },
  ];

  // Skip if quick-links-grid already exists on the page (e.g. hardcoded in HTML)
  if (mainContent.querySelector('.quick-links-grid')) return;

  const grid = document.createElement('div');
  grid.className = 'quick-links-grid';
  links.forEach(l => {
    const a = document.createElement('a');
    a.href = l.href;
    a.className = 'quick-link-btn';
    a.title = l.label;
    a.innerHTML = `<span>${l.icon}</span> ${l.label}`;
    grid.appendChild(a);
  });

  // Insert before the content-article, or before footer area
  const article = mainContent.querySelector('.content-article');
  if (article) {
    mainContent.insertBefore(grid, article);
  } else {
    mainContent.appendChild(grid);
  }
}

// ===== ROTATING HERO SYMBOL =====
function initRotatingLogo() {
  const heroSymbol = document.getElementById('heroSymbol');
  if (!heroSymbol) return;

  const symbols = [
    '✦', '❤️', '✔️', '🐾', '⭐', '☀', '☾', '🎵', '✝', '♈',
    '①', '⇨', '↑', '↓', '✿', '⚥', '∞', '⚕', '$', '♚',
    '☀', '【', '✝', '©', '℃', '♠', '🎲', '🚗', '💼', '🏆',
    '🔒', '⚠️', '✍️', '⚔️', 'Ⅳ', 'Ω', '🥰', '½', '≥',
    '│', '○', '▲', '⬛', '█', '╚', '!', '愛', 'あ', 'ㅿ',
    '✌️', 'ⓐ', '𝒜', 'ʇ', '𝔄', '🏠', '👑', '◆', '❝', '₿',
    '▓', '〰', '┊', '╔', '✨', '✧', '•', 'ß', 'π'
  ];

  let index = 0;

  setInterval(() => {
    index = (index + 1) % symbols.length;
    heroSymbol.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    heroSymbol.style.opacity = '0';
    heroSymbol.style.transform = 'translateY(-8px) scale(0.8)';

    setTimeout(() => {
      heroSymbol.textContent = symbols[index];
      heroSymbol.style.opacity = '1';
      heroSymbol.style.transform = 'translateY(0) scale(1)';
    }, 400);
  }, 7000);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initCopyable();
  initSearch();
  initFontGenerator();
  initParticles();
  highlightActiveSidebarLink();
  renderQuickLinks();
  initRotatingLogo();
});
