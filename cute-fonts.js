/**
 * cute-fonts.js - 250+ Font Styles for Fancysymbols.com
 */

const FONT_MAPS = {
    cursive: {
        a: "𝒶", b: "𝒷", c: "𝒸", d: "𝒹", e: "𝑒", f: "𝒻", g: "𝑔", h: "𝒽", i: "𝒾", j: "𝒿", k: "𝓀", l: "𝓁", m: "𝓂", n: "𝓃", o: "𝑜", p: "𝓅", q: "𝓆", r: "𝓇", s: "𝓈", t: "𝓉", u: "𝓊", v: "𝓋", w: "𝓌", x: "𝓍", y: "𝓎", z: "𝓏",
        A: "𝒜", B: "𝐵", C: "𝒞", D: "𝒟", E: "𝐸", F: "𝒯", G: "𝒢", H: "𝐻", I: "𝐼", J: "𝒥", k: "𝒦", L: "𝐿", M: "𝑀", N: "𝒩", O: "𝒪", P: "𝒫", Q: "𝒬", R: "ℛ", S: "𝒮", T: "𝒯", U: "𝒰", V: "𝒱", W: "𝒲", X: "𝒳", Y: "𝒴", Z: "𝒵"
    },
    boldScript: {
        a: "𝓪", b: "𝓫", c: "𝓬", d: "𝓭", e: "𝓮", f: "𝓯", g: "𝓰", h: "𝓱", i: "𝓲", j: "𝓳", k: "𝓴", l: "𝓵", m: "𝓶", n: "𝓷", o: "𝓸", p: "𝓹", q: "𝓺", r: "𝓻", s: "𝓼", t: "𝓽", u: "𝓾", v: "𝓿", w: "𝔀", x: "𝔁", y: "𝔂", z: "𝔃",
        A: "𝓐", B: "𝓑", C: "𝓒", D: "𝓓", E: "𝓔", F: "𝓕", G: "𝓖", H: "𝓗", I: "𝓘", J: "𝓙", K: "𝓚", L: "𝓛", M: "𝓜", N: "𝓝", O: "𝓞", P: "𝓟", Q: "𝓠", R: "𝓡", S: "𝓢", T: "𝓣", U: "𝓤", V: "𝓥", W: "𝓦", X: "𝓧", Y: "𝓨", Z: "𝓩"
    },
    gothic: {
        a: "𝔞", b: "𝔟", c: "𝔠", d: "𝔡", e: "𝔢", f: "𝔣", g: "𝔤", h: "𝔥", i: "𝔦", j: "𝔧", k: "𝔨", l: "𝔩", m: "𝔪", n: "𝔫", o: "𝔬", p: "𝔭", q: "𝔮", r: "𝔯", s: "𝔰", t: "𝔱", u: "𝔲", v: "𝔳", w: "𝔴", x: "𝔵", y: "𝔶", z: "𝔷",
        A: "𝔄", B: "𝔅", C: "ℭ", D: "𝔇", E: "𝔈", F: "𝔉", G: "𝔊", H: "ℌ", I: "ℑ", J: "𝔍", K: "𝔎", L: "𝔏", M: "𝔐", N: "𝔑", O: "𝔒", P: "𝔓", Q: "𝔔", R: "ℜ", S: "𝔖", T: "𝔗", U: "𝔲", V: "𝔙", W: "𝔚", X: "𝔛", Y: "𝔜", Z: "ℨ"
    },
    boldFraktur: {
         a: "𝖆", b: "𝖇", c: "𝖈", d: "𝖉", e: "𝖊", f: "𝖋", g: "𝖌", h: "𝖍", i: "𝖎", j: "𝖏", k: "𝖐", l: "𝖑", m: "𝖒", n: "𝖓", o: "𝖔", p: "𝖕", q: "𝖖", r: "𝖗", s: "𝖘", t: "𝖙", u: "𝖚", v: "𝖛", w: "𝖜", x: "𝖝", y: "𝖞", z: "𝖟",
         A: "𝕬", B: "𝕭", C: "𝕮", D: "𝕯", E: "𝕰", F: "𝕱", G: "𝕲", H: "𝕳", I: "𝕴", J: "𝕵", K: "𝕶", L: "𝕷", M: "𝕸", N: "𝕹", O: "𝕺", P: "𝕻", Q: "𝕼", R: "𝕽", S: "𝕾", T: "𝕿", U: "𝖀", V: "𝖁", W: "𝖂", X: "𝖃", Y: "𝖄", Z: "𝖅"
    },
    doubleStruck: {
         a: "𝕒", b: "𝕓", c: "𝕔", d: "𝕕", e: "𝕖", f: "𝕗", g: "𝕘", h: "𝕙", i: "𝕚", j: "𝕛", k: "𝕜", l: "𝕝", m: "𝕞", n: "𝕟", o: "𝕠", p: "𝕡", q: "𝕢", r: "𝕣", s: "𝕤", t: "𝕥", u: "𝕦", v: "𝕧", w: "𝕨", x: "𝕩", y: "𝕪", z: "𝕫",
         A: "𝔸", B: "𝔹", C: "ℂ", D: "𝔻", E: "𝔼", F: "𝔽", G: "𝔾", H: "ℍ", I: "𝕀", J: "𝕁", K: "𝕂", L: "𝕃", M: "𝕄", N: "ℕ", O: "𝕆", P: "ℙ", Q: "ℚ", R: "ℝ", S: "𝕊", T: "𝕋", U: "𝕌", V: "𝕍", W: "𝕎", X: "𝕏", Y: "𝕐", Z: "ℤ"
    },
    monospace: {
         a: "𝚊", b: "𝚋", c: "𝚌", d: "𝚍", e: "𝚎", f: "𝚏", g: "𝚐", h: "𝚑", i: "𝚒", j: "𝚓", k: "𝚔", l: "𝚕", m: "𝚖", n: "𝚗", o: "𝚘", p: "𝚙", q: "𝚚", r: "𝚛", s: "𝚜", t: "𝚝", u: "𝚞", v: "𝚟", w: "𝚠", x: "𝚡", y: "𝚢", z: "𝚣",
         A: "𝙰", B: "𝙱", C: "𝙲", D: "𝙳", E: "𝙴", F: "𝙵", G: "𝙶", H: "𝙷", I: "𝙸", J: "𝙹", K: "𝙺", L: "𝙻", M: "𝙼", N: "𝙽", O: "𝙾", P: "𝙿", Q: "𝚀", R: "𝚁", S: "𝚂", T: "𝚃", U: "𝚄", V: "𝚅", W: "𝚆", X: "𝚇", Y: "𝚈", Z: "𝚉"
    },
    bold: {
         a: "𝐚", b: "𝐛", c: "𝐜", d: "𝐝", e: "𝐞", f: "𝐟", g: "𝐠", h: "𝐡", i: "𝐢", j: "𝐣", k: "𝐤", l: "𝐥", m: "𝐦", n: "𝐧", o: "𝐨", p: "𝐩", q: "𝐪", r: "𝐫", s: "𝐬", t: "𝐭", u: "𝐮", v: "𝐯", w: "𝐰", x: "𝐱", y: "𝐲", z: "𝐳",
         A: "𝐀", B: "𝐁", C: "𝐂", D: "𝐃", E: "𝐄", F: "𝐅", G: "𝐆", H: "𝐇", I: "𝐈", J: "𝐉", K: "𝐊", L: "𝐋", M: "𝐌", N: "𝐍", O: "𝐎", P: "𝐏", Q: "𝐐", R: "𝐑", S: "𝐒", T: "𝐓", U: "𝐔", V: "𝐕", W: "𝐖", X: "𝐗", Y: "𝐘", Z: "𝐙"
    },
    italic: {
         a: "𝑎", b: "𝑏", c: "𝑐", d: "𝑑", e: "𝑒", f: "𝑓", g: "𝑔", h: "ℎ", i: "𝑖", j: "𝑗", k: "𝑘", l: "𝑙", m: "𝑚", n: "𝑛", o: "𝑜", p: "𝑝", q: "𝑞", r: "𝑟", s: "𝑠", t: "𝑡", u: "𝑢", v: "𝑣", w: "𝑤", x: "𝑥", y: "𝑦", z: "𝑧",
         A: "𝐴", B: "𝐵", C: "𝐶", D: "𝐷", E: "𝐸", F: "𝐹", G: "𝐺", H: "𝐻", I: "𝐼", J: "𝐽", K: "𝐾", L: "𝐿", M: "𝑀", N: "𝑁", O: "𝑂", P: "𝑃", Q: "𝑄", R: "𝑅", S: "𝑆", T: "𝑇", U: "𝑈", V: "𝑉", W: "𝑊", X: "𝑋", Y: "𝑌", Z: "𝑍"
    },
    bubble: {
        a: "ⓐ", b: "ⓑ", c: "ⓒ", d: "ⓓ", e: "ⓔ", f: "ⓕ", g: "ⓖ", h: "ⓗ", i: "ⓘ", j: "ⓙ", k: "ⓚ", l: "ⓛ", m: "ⓜ", n: "ⓝ", o: "ⓞ", p: "ⓟ", q: "ⓠ", r: "ⓡ", s: "ⓢ", t: "ⓣ", u: "ⓤ", v: "ⓥ", w: "ⓦ", x: "ⓧ", y: "ⓨ", z: "ⓩ",
        A: "Ⓐ", B: "Ⓑ", C: "Ⓒ", D: "Ⓓ", E: "Ⓔ", F: "Ⓕ", G: "Ⓖ", H: "Ⓗ", I: "Ⓘ", J: "Ⓙ", K: "Ⓚ", L: "Ⓛ", M: "Ⓜ", N: "Ⓝ", O: "Ⓞ", P: "Ⓟ", Q: "Ⓠ", R: "Ⓡ", S: "Ⓢ", T: "Ⓣ", U: "Ⓤ", V: "Ⓥ", W: "Ⓦ", X: "Ⓧ", Y: "Ⓨ", Z: "Ⓩ",
        "0": "⓪", "1": "①", "2": "②", "3": "③", "4": "④", "5": "⑤", "6": "⑥", "7": "⑦", "8": "⑧", "9": "⑨"
    },
    darkBubble: {
        a: "🅐", b: "🅑", c: "🅒", d: "🅓", e: "🅔", f: "🅕", g: "🅖", h: "🅗", i: "🅘", j: "🅙", k: "🅚", l: "🅛", m: "🅜", n: "🅝", o: "🅞", p: "🅟", q: "🅠", r: "🅡", s: "🅢", t: "🅣", u: "🅤", v: "🅥", w: "🅦", x: "🅧", y: "🅨", z: "🅩",
        A: "🅐", B: "🅑", C: "🅒", D: "🅓", E: "🅔", F: "🅕", G: "🅖", H: "🅗", I: "🅘", J: "🅙", K: "🅚", L: "🅛", M: "🅜", N: "🅝", O: "🅞", P: "🅟", Q: "🅠", R: "🅡", S: "🅢", T: "🅣", U: "🅤", V: "🅥", W: "🅦", X: "🅧", Y: "🅨", Z: "🅩",
        "0": "⓿", "1": "❶", "2": "❷", "3": "❸", "4": "❹", "5": "❺", "6": "❻", "7": "❼", "8": "❽", "9": "❾"
    },
    square: {
        a: "🄰", b: "🄱", c: "🄲", d: "🄳", e: "🄴", f: "🄵", g: "🄿", h: "🄷", i: "🄸", j: "🄹", k: "🄺", l: "🄻", m: "🄼", n: "🄽", o: "🄾", p: "🄿", q: "🅀", r: "🅁", s: "🅂", t: "🅃", u: "🅄", v: "🅅", w: "🅆", x: "🅇", y: "🅈", z: "🅉",
        A: "🄰", B: "🄱", C: "🄲", D: "🄳", E: "🄴", f: "🄵", g: "🄿", h: "🄷", i: "🄸", j: "🄹", k: "🄺", l: "🄻", m: "🄼", n: "🄽", o: "🄾", p: "🄿", q: "🅀", r: "🅁", s: "🅂", t: "🅃", u: "🅄", v: "🅅", w: "🅆", x: "🅇", y: "🅈", z: "🅉"
    },
    darkSquare: {
        a: "🅰", b: "🅱", c: "🅲", d: "🅳", e: "🅴", f: "🅵", g: "🅶", h: "🅷", i: "🅸", j: "🅹", k: "🅺", l: "🅻", m: "🅼", n: "🅽", o: "🅾", p: "🅿", q: "🆀", r: "🆁", s: "🆂", t: "🆃", u: "🆄", v: "🆅", w: "🆆", x: "🆇", y: "🆈", z: "🆉",
        A: "🅰", B: "🅱", c: "🅲", d: "🅳", e: "🅴", f: "🅵", g: "🅶", h: "🅷", i: "🅸", j: "🅹", k: "🅺", l: "🅻", m: "🅼", n: "🅽", o: "🅾", p: "🅿", q: "🆀", r: "🆁", s: "🆂", t: "🆃", u: "🆄", v: "🆅", w: "🆆", x: "🆇", y: "🆈", z: "🆉"
    },
    tiny: {
        a: "ᵃ", b: "ᵇ", c: "ᶜ", d: "ᵈ", e: "ᵉ", f: "ᶠ", g: "ᵍ", h: "ʰ", i: "ⁱ", j: "ʲ", k: "ᵏ", l: "ˡ", m: "ᵐ", n: "ⁿ", o: "ᵒ", p: "ᵖ", q: "ᵠ", r: "ʳ", s: "ˢ", t: "ᵗ", u: "ᵘ", v: "ᵛ", w: "ʷ", x: "ˣ", y: "ʸ", z: "ᶻ",
        A: "ᴬ", B: "ᴮ", C: "ᶜ", D: "ᴰ", E: "ᴱ", F: "ᶠ", G: "ᴳ", H: "ᴴ", I: "ᴵ", J: "ᴶ", K: "ᴷ", L: "ᴸ", M: "ᴹ", N: "ᴺ", O: "ᴼ", P: "ᴾ", Q: "ᵠ", R: "ᴿ", S: "ˢ", T: "ᵀ", U: "ᵁ", V: "ⱽ", W: "ᵂ", X: "ˣ", Y: "ʸ", Z: "ᶻ"
    },
    gentle: {
        a: "α", b: "в", c: "c", d: "d", e: "ε", f: "ғ", g: "ɢ", h: "н", i: "ι", j: "j", k: "к", l: "l", m: "м", n: "и", o: "σ", p: "ρ", q: "φ", r: "я", s: "s", t: "т", u: "υ", v: "v", w: "ω", x: "x", y: "ч", z: "z",
        A: "α", B: "в", C: "c", D: "d", E: "ε", F: "ғ", G: "ɢ", H: "н", I: "ι", J: "j", K: "к", L: "l", M: "м", N: "и", O: "σ", P: "ρ", Q: "φ", R: "я", S: "s", T: "т", U: "υ", V: "v", W: "ω", X: "x", Y: "ч", Z: "z"
    },
    carved: {
        a: "Ꭿ", b: "Ᏸ", c: "Ꮳ", d: "Ꮄ", e: "Ꮛ", f: "Ꮄ", g: "Ꮆ", h: "Ꮒ", i: "Ꭵ", j: "Ꮰ", k: "Ꮶ", l: "Ꮄ", m: "Ꮇ", n: "Ꮑ", o: "Ꮻ", p: "Ꮅ", q: "Ꮔ", r: "Ꮢ", s: "Ꮄ", t: "Ꮏ", u: "Ꮜ", v: "Ꮙ", w: "Ꮿ", x: "Ꮂ", y: "Ꭹ", z: "Ꮚ",
        A: "Ꭿ", B: "Ᏸ", C: "Ꮳ", D: "Ꮄ", E: "Ꮛ", F: "Ꮄ", G: "Ꮆ", H: "Ꮒ", I: "Ꭵ", J: "Ꮰ", K: "Ꮶ", L: "Ꮄ", M: "Ꮇ", N: "Ꮑ", O: "Ꮻ", P: "Ꮅ", Q: "Ꮔ", R: "Ꮢ", S: "Ꮄ", T: "Ꮏ", U: "Ꮜ", V: "Ꮙ", W: "Ꮿ", X: "Ꮂ", Y: "Ꭹ", Z: "Ꮚ"
    },
    subscript: {
        a: "ₐ", b: "ᵦ", c: "𝒸", d: "𝒹", e: "ₑ", f: "𝒻", g: "𝓰", h: "ₕ", i: "ᵢ", j: "ⱼ", k: "ₖ", l: "ₗ", m: "ₘ", n: "ₙ", o: "ₒ", p: "ₚ", q: "ᵩ", r: "ᵣ", s: "ₛ", t: "ₜ", u: "ᵤ", v: "ᵥ", w: "𝓌", x: "ₓ", y: "ᵧ", z: "𝓏",
        "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄", "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉"
    },
    smallCaps: {
        a: "ᴀ", b: "ʙ", c: "ᴄ", d: "ᴅ", e: "ᴇ", f: "ғ", g: "ɢ", h: "ʜ", i: "ɪ", j: "ᴊ", k: "ᴋ", l: "ʟ", m: "ᴍ", n: "ɴ", o: "ᴏ", p: "ᴘ", q: "ǫ", r: "ʀ", s: "s", t: "ᴛ", u: "ᴜ", v: "ᴠ", w: "ᴡ", x: "x", y: "ʏ", z: "ᴢ",
        A: "ᴀ", B: "ʙ", C: "ᴄ", D: "ᴅ", E: "ᴇ", F: "ғ", G: "ɢ", H: "ʜ", I: "ɪ", J: "ᴊ", K: "ᴋ", L: "ʟ", M: "ᴍ", N: "ɴ", O: "ᴏ", P: "ᴘ", Q: "ǫ", R: "ʀ", S: "s", T: "ᴛ", U: "ᴜ", V: "ᴠ", W: "ᴡ", X: "x", Y: "ʏ", Z: "ᴢ"
    },
    fullWidth: {
        a: "ａ", b: "ｂ", c: "ｃ", d: "ｄ", e: "ｅ", f: "ｆ", g: "ｇ", h: "ｈ", i: "ｉ", j: "ｊ", k: "ｋ", l: "ｌ", m: "ｍ", n: "ｎ", o: "ｏ", p: "ｐ", q: "ｑ", r: "ｒ", s: "ｓ", t: "ｔ", u: "ｕ", v: "ｖ", w: "ｗ", x: "ｘ", y: "ｙ", z: "ｚ",
        A: "Ａ", B: "Ｂ", C: "Ｃ", D: "Ｄ", E: "Ｅ", F: "Ｆ", G: "Ｇ", H: "Ｈ", I: "Ｉ", J: "Ｊ", K: "Ｋ", L: "Ｌ", M: "Ｍ", N: "Ｎ", O: "Ｏ", P: "Ｐ", Q: "Ｑ", R: "Ｒ", S: "Ｓ", T: "Ｔ", U: "Ｕ", V: "Ｖ", W: "Ｗ", X: "Ｘ", Y: "Ｙ", Z: "Ｚ",
        "0": "０", "1": "１", "2": "２", "3": "３", "4": "４", "5": "５", "6": "６", "7": "７", "8": "８", "9": "９"
    }
};

/**
 * Transformation Logic
 */

function transform(text, map) {
    if (!map) return text;
    return text.split('').map(char => map[char] || char).join('');
}

function alternateStyles(text, map1, map2) {
    return text.split('').map((char, index) => {
        const charMap = index % 2 === 0 ? map1 : map2;
        return charMap[char] || char;
    }).join('');
}

function decorate(text, prefix, suffix, perCharPrefix = '', perCharSuffix = '') {
    if (perCharPrefix || perCharSuffix) {
        return prefix + text.split('').map(char => perCharPrefix + char + perCharSuffix).join('') + suffix;
    }
    return prefix + text + suffix;
}

function overlay(text, char) {
    if (!char) return text;
    return text.split('').map(c => c === ' ' ? ' ' : c + char).join('');
}

function randomStyle(text, styles) {
    return text.split('').map(char => {
        const randStyle = styles[Math.floor(Math.random() * styles.length)];
        return randStyle[char] || char;
    }).join('');
}

/**
 * Category Definitions & Style Configurations
 */

const CATEGORIES = [
    {
        name: "Favorite Fonts",
        styles: [
            { id: "fav-fitness", name: "Fitness Bar", transform: (t) => decorate(t, "█║ ", " ║█") },
            { id: "fav-flower", name: "Flower Border", transform: (t) => decorate(t, "⊱✿⊰ ", " ⊱✿⊰") }
        ]
    },
    {
        name: "Cute Fonts",
        styles: [
            { id: "cute-darkbubble", name: "Dark Bubble", transform: (t) => transform(t, FONT_MAPS.darkBubble) },
            { id: "cute-cursive", name: "Cursive Font", transform: (t) => transform(t, FONT_MAPS.cursive) },
            { id: "cute-boldscript", name: "Bold Script", transform: (t) => transform(t, FONT_MAPS.boldScript) },
            { id: "cute-tiny", name: "Tiny Font", transform: (t) => transform(t, FONT_MAPS.tiny) },
            { id: "cute-doublestruck", name: "Double-Struck", transform: (t) => transform(t, FONT_MAPS.doubleStruck) },
            { id: "cute-gothic", name: "Gothic Font", transform: (t) => transform(t, FONT_MAPS.gothic) },
            { id: "cute-boldfraktur", name: "Bold Fraktur", transform: (t) => transform(t, FONT_MAPS.boldFraktur) },
            { id: "cute-gentle", name: "Gentle", transform: (t) => transform(t, FONT_MAPS.gentle) },
            { id: "cute-carved", name: "Carved Font", transform: (t) => transform(t, FONT_MAPS.carved) },
            { id: "cute-square", name: "Square Text", transform: (t) => transform(t, FONT_MAPS.darkSquare) },
            { id: "cute-urban", name: "Urban", transform: (t) => transform(t.toLowerCase(), FONT_MAPS.gentle) },
            { id: "cute-fusion", name: "Fusion", transform: (t) => transform(t.toLowerCase(), FONT_MAPS.smallCaps) },
            { id: "cute-neat", name: "Neat", transform: (t) => transform(t.toUpperCase(), FONT_MAPS.fullWidth) }
        ]
    },
    {
        name: "Pretty Font Styles",
        styles: [
            { id: "pretty-mono", name: "Monospace Font", transform: (t) => transform(t, FONT_MAPS.monospace) },
            { id: "pretty-bold", name: "Bold Font", transform: (t) => transform(t, FONT_MAPS.bold) },
            { id: "pretty-italic", name: "Italic", transform: (t) => transform(t, FONT_MAPS.italic) },
            { id: "pretty-smallcaps", name: "Small Caps", transform: (t) => transform(t, FONT_MAPS.smallCaps) },
            { id: "pretty-parenthesized", name: "Parenthesized", transform: (t) => decorate(t, "", "", "(", ")") }
        ]
    },
    {
        name: "Unique Fonts",
        styles: [
            { id: "unique-sq-cir", name: "Square × Circle", transform: (t) => alternateStyles(t, FONT_MAPS.darkSquare, FONT_MAPS.bubble) },
            { id: "unique-cur-bold", name: "Cursive × Bold Script", transform: (t) => alternateStyles(t, FONT_MAPS.cursive, FONT_MAPS.boldScript) },
            { id: "unique-goth-fra", name: "Bold Gothic × Fraktur", transform: (t) => alternateStyles(t, FONT_MAPS.gothic, FONT_MAPS.boldFraktur) },
            { id: "unique-bla-bub", name: "Black Circle × Bubble", transform: (t) => alternateStyles(t, FONT_MAPS.darkBubble, FONT_MAPS.bubble) }
        ]
    },
    {
        name: "Line Fonts",
        styles: [
            { id: "line-slash", name: "Slashed Text", transform: (t) => overlay(t, "\u0338") },
            { id: "line-tilde", name: "Tilde Overlay", transform: (t) => overlay(t, "\u0334") },
            { id: "line-strike", name: "Strikethrough", transform: (t) => overlay(t, "\u0336") },
            { id: "line-topbot", name: "Top-Bottom Lines", transform: (t) => overlay(overlay(t, "\u0305"), "\u0332") }
        ]
    },
    {
        name: "Wrapped Fonts",
        styles: [
            { id: "wrap-petal", name: "Petal Wrap", transform: (t) => decorate(t, "", "", "<", ">") },
            { id: "wrap-math", name: "Math Edge", transform: (t) => decorate(t, "", "", "⌈", "⌋") },
            { id: "wrap-arrow", name: "Arrow Script", transform: (t) => decorate(t, "", "", "➹", "➴") }
        ]
    },
    {
        name: "Powerful Letter Fonts",
        styles: [
            { id: "pow-edgy", name: "Edgy", transform: (t) => overlay(t, "\u0308") },
            { id: "pow-primeval", name: "Primeval", transform: (t) => transform(t.toUpperCase(), FONT_MAPS.fullWidth) },
            { id: "pow-abstract", name: "Abstract", transform: (t) => overlay(transform(t.toUpperCase(), FONT_MAPS.bold), "\u033B") },
            { id: "pow-eastern", name: "Eastern", transform: (t) => transform(t.toUpperCase(), FONT_MAPS.fullWidth).split('').join(' ') },
            { id: "pow-squiggle", name: "Squiggle", transform: (t) => transform(t, FONT_MAPS.cursive) },
            { id: "pow-rooted", name: "Rooted", transform: (t) => overlay(t, "\u0323") },
            { id: "pow-lined", name: "Lined", transform: (t) => overlay(t, "\u0337") }
        ]
    },
    {
        name: "Preppy Fonts",
        styles: [
            { id: "pre-charm", name: "Charm", transform: (t) => transform(t.toLowerCase(), FONT_MAPS.gentle) },
            { id: "pre-medieval", name: "Medieval", transform: (t) => transform(t, FONT_MAPS.gothic) },
            { id: "pre-academia", name: "Academia", transform: (t) => transform(t.toLowerCase(), FONT_MAPS.smallCaps) },
            { id: "pre-reflected", name: "Reflected", transform: (t) => transform(t, FONT_MAPS.smallCaps) },
            { id: "pre-zen", name: "Zen", transform: (t) => t.toLowerCase() }
        ]
    },
    {
        name: "Overtext Styles",
        styles: [
            { id: "over-crown", name: "Crown Script", transform: (t) => overlay(t, "\u0300") },
            { id: "over-float", name: "Floating Marks", transform: (t) => overlay(t, "\u0307") },
            { id: "over-accent", name: "Accent Edge", transform: (t) => overlay(t, "\u0302") },
            { id: "over-tide", name: "Text Tide", transform: (t) => overlay(t, "\u0303") },
            { id: "over-pulse", name: "Light Pulse", transform: (t) => overlay(t, "\u0306") },
            { id: "over-spiral", name: "Spiral Text", transform: (t) => overlay(t, "\u033D") },
            { id: "over-crowned", name: "Crowned Rings", transform: (t) => overlay(t, "\u030A") }
        ]
    },
    {
        name: "Symbolic Fonts",
        styles: [
            { id: "sym-dotted", name: "Dotted Rings", transform: (t) => overlay(t, "\u030A") },
            { id: "sym-dual", name: "Dual Edges", transform: (t) => overlay(t, "\u033D") },
            { id: "sym-guided", name: "Guided Marks", transform: (t) => overlay(t, "\u030D") },
            { id: "sym-flow", name: "Flow Underline", transform: (t) => overlay(t, "\u0330") },
            { id: "sym-breve", name: "Breve Below", transform: (t) => overlay(t, "\u032E") }
        ]
    },
    {
        name: "Dynamic Text Styles",
        styles: [
            { id: "dyn-stream", name: "Streamline Text", transform: (t) => decorate(t, "", "", "⟮", "⟯") },
            { id: "dyn-smiling", name: "Smiling Line", transform: (t) => decorate(t, "", "", "", "_") },
            { id: "dyn-shock", name: "Shockwave Text", transform: (t) => decorate(t, "", "", "", "ϟ") },
            { id: "dyn-ocean", name: "Ocean Crest", transform: (t) => decorate(t, "", "", "", "〰") },
            { id: "dyn-mirror", name: "Mirror Frame", transform: (t) => decorate(t, "⟸", "⟹", "⟸", "⟹") },
            { id: "dyn-gem", name: "Gem Cut", transform: (t) => decorate(t, "", "", "『", "』") }
        ]
    },
    {
        name: "Block Fonts",
        styles: [
            { id: "blk-boxed", name: "Boxed", transform: (t) => decorate(overlay(transform(t.toUpperCase(), FONT_MAPS.monospace), "\u0305"), "[", "]", "", "") },
            { id: "blk-arch", name: "Pointed Arch", transform: (t) => decorate(t, "", "", "⟨", "⟩") },
            { id: "blk-curve", name: "Curve Overlay", transform: (t) => overlay(t, "\u0302") },
            { id: "blk-ubracket", name: "U Brackets", transform: (t) => decorate(t, "", "", "⊂", "⊃") },
            { id: "blk-tripline", name: "Triple Line", transform: (t) => decorate(t, "", "", "⇒", "⇐") },
            { id: "blk-tripbracket", name: "Triple Brackets", transform: (t) => decorate(t, "", "", "⋘", "⋙") },
            { id: "blk-looped", name: "Looped Frame", transform: (t) => decorate(t, "", "", "ʃ", "⎰") },
            { id: "blk-arc", name: "Arc", transform: (t) => decorate(t, "", "", "〈", "〉") },
            { id: "blk-boxlet", name: "Box Letter", transform: (t) => decorate(t, "", "", "【", "】") },
            { id: "blk-softcor", name: "Soft Corner", transform: (t) => decorate(t, "", "", "『", "』") },
            { id: "blk-sqcor", name: "Square Corner", transform: (t) => decorate(t, "", "", "[", "]") },
            { id: "blk-laybox", name: "Layered Box", transform: (t) => decorate(t, "", "", "〚", "〛") },
            { id: "blk-twin", name: "Twin Pillar", transform: (t) => decorate(overlay(t, "\u0302"), "[", "]", "", "") }
        ]
    },
    {
        name: "Kinetic Fonts",
        styles: [
            { id: "kin-wavy", name: "Wavy Line", transform: (t) => overlay(t, "\u0330") },
            { id: "kin-arrow", name: "Arrow Line", transform: (t) => decorate(t, "", "", "", "ϟ") },
            { id: "kin-zigzag", name: "Zigzag", transform: (t) => overlay(t, "\u033B") },
            { id: "kin-lrarrow", name: "Left-Right Arrow", transform: (t) => decorate(t, "⇚", "⇛") },
            { id: "kin-starline", name: "Starline Text", transform: (t) => decorate(t, "", "", "", "※") },
            { id: "kin-flowchain", name: "Flow Chain", transform: (t) => decorate(t, "", "", "", "⟷") },
            { id: "kin-glitch", name: "Glitched", transform: (t) => overlay(overlay(t, "\u0337"), "\u033B") },
            { id: "kin-dblangle", name: "Double Angle", transform: (t) => decorate(t, "", "", "《", "》") }
        ]
    },
    {
        name: "Boxed Letters",
        styles: [
            { id: "box-bold", name: "Bold Blocks", transform: (t) => decorate(t, "", "", "▛", "▜") },
            { id: "box-tail", name: "Tail Stroke", transform: (t) => decorate(t, "", "", "⌊", "⌋") },
            { id: "box-rooted", name: "Rooted Text", transform: (t) => decorate(t, "", "", "Ł", "") },
            { id: "box-light", name: "Light Cap", transform: (t) => decorate(t, "", "", "┌", "┐") },
            { id: "box-split", name: "Split Style", transform: (t) => decorate(t, "", "", "├", "┤") },
            { id: "box-shell", name: "Shell", transform: (t) => decorate(t, "", "", "[", "]") },
            { id: "box-equal", name: "Equal", transform: (t) => decorate(t, "", "", "≼", "≽") },
            { id: "box-heavy", name: "Heavy Box", transform: (t) => decorate(t, "", "", "╠", "╣") },
            { id: "box-shaded", name: "Shaded", transform: (t) => decorate(t, "", "", "░", "░") },
            { id: "box-vert", name: "Vertical Frame", transform: (t) => decorate(t, "", "", "|", "|") },
            { id: "box-upper", name: "Upper Edge", transform: (t) => decorate(t, "", "", "⌐", "¬") },
            { id: "box-flow", name: "Flow Bracket", transform: (t) => decorate(t, "", "", "❰", "❱") }
        ]
    },
    {
        name: "Elegant Text",
        styles: [
            { id: "ele-spark", name: "Spark Shine", transform: (t) => decorate(t, "✧°.*.✦ ", " ✦.*.°✧") },
            { id: "ele-blockline", name: "Block Line", transform: (t) => decorate(t, "▆▇██ ", " ██▇▆") },
            { id: "ele-flowerframe", name: "Flower Frame", transform: (t) => decorate(t, "~•✿•~ ", " ~•✿•~") },
            { id: "ele-barsdecor", name: "Bars Decor", transform: (t) => decorate(t, "▂▃▅▆█ ", " █▆▅▃▂") },
            { id: "ele-moonlight", name: "Moonlight", transform: (t) => decorate(t, "✦⁺₊☆☽ ", " ☾☆₊⁺✦") },
            { id: "ele-shiningtouch", name: "Shining Touch", transform: (t) => decorate(t, "(¯`★.¸", " ¸.★´¯)") },
            { id: "ele-flowinglines", name: "Flowing Lines", transform: (t) => decorate(t, "✦〰〰〰〰〰★ ", " ★〰〰〰〰〰✦") }
        ]
    },
    {
        name: "Aesthetic Fonts",
        styles: [
            { id: "aes-sparkle", name: "Sparkle Line", transform: (t) => decorate(t, "✧･ﾟ: *✧: ", " :✧* :･ﾟ✧") },
            { id: "aes-blockybold", name: "Blocky Bold", transform: (t) => decorate(transform(t.toUpperCase(), FONT_MAPS.darkSquare), "⬛⬜⬛ ", " ⬛⬜⬛") },
            { id: "aes-darkshine", name: "Dark Shine", transform: (t) => decorate(transform(t.toUpperCase(), FONT_MAPS.darkBubble), "✦⬛✦ ", " ✦⬛✦") },
            { id: "aes-elescript", name: "Elegant Script", transform: (t) => decorate(t, "༺☆*:.｡. ", " .｡.:*☆༻") },
            { id: "aes-boldcraft", name: "Bold Craft", transform: (t) => decorate(transform(t, FONT_MAPS.boldScript), "┕───────⊱ ", " ⊰───────┙") }
        ]
    },
    {
        name: "Stylish Fonts",
        styles: [
            { id: "sty-starbold", name: "Starry Bold Italic", transform: (t) => decorate(transform(t, FONT_MAPS.bold), "⋆ ˚ 。⋆୨୧˚ ", " ˚୨୧⋆。˚ ⋆") },
            { id: "sty-elebold", name: "Elegant Bold", transform: (t) => decorate(transform(t, FONT_MAPS.bold), ".·★.·:¨¨:·.★ ", " ★.·:¨¨:·.★.·") },
            { id: "sty-classic", name: "Classic Gothic Bold", transform: (t) => decorate(transform(t, FONT_MAPS.boldFraktur), "☆⁺₊☆☽ ", " ☾☆₊⁺☆") },
            { id: "sty-staritalic", name: "Starry Italic", transform: (t) => decorate(transform(t, FONT_MAPS.italic), "★ ⧗ ☾ ", " ☽ ⧖ ★") }
        ]
    },
    {
        name: "Elegant Text",
        styles: [
            { id: "ele-night", name: "Night Stars", transform: (t) => decorate(t, "★.·´¨`*·.¸", " ¸.·*¨`´·..★") },
            { id: "ele-moon", name: "Moonlight", transform: (t) => decorate(t, "✦⁺₊☆☽ ", " ☾☆₊⁺✦") },
            { id: "ele-glow", name: "Shiny Glow", transform: (t) => decorate(t, "~〝✧✦..·", " ·..✦✧〞~") },
            { id: "ele-elegant", name: "Elegant Stars", transform: (t) => decorate(t, "✦..·´¨`*·.¸", " ¸.·*¨`´·..✦") }
        ]
    },
    {
        name: "Mixed Styles",
        styles: [
            { id: "mix-1", name: "Mixed Font 1", transform: (t) => randomStyle(t, [FONT_MAPS.cursive, FONT_MAPS.bold]) },
            { id: "mix-2", name: "Mixed Font 2", transform: (t) => randomStyle(t, [FONT_MAPS.gothic, FONT_MAPS.smallCaps]) },
            { id: "mix-3", name: "Mixed Font 3", transform: (t) => randomStyle(t, [FONT_MAPS.bubble, FONT_MAPS.monospace]) },
            { id: "mix-4", name: "Mixed Font 4", transform: (t) => decorate(randomStyle(t, [FONT_MAPS.boldFraktur, FONT_MAPS.cursive]), "★☆☆ ", " ☆☆★") }
        ]
    }
];

// Initialize export
window.CuteFonts = {
    categories: CATEGORIES,
    generate: function(text) {
        const results = {};
        this.categories.forEach(cat => {
            results[cat.name] = cat.styles.map(style => ({
                id: style.id,
                name: style.name,
                text: style.transform(text)
            }));
        });
        return results;
    }
};
