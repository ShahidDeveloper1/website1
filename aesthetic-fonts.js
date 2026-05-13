// character maps
const MAPS = {
  fraktur: {
    upper: '𝔄𝔅ℭ𝔇𝔈𝔉𝔊┋ℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ',
    lower: '𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷'
  },
  frakturBold: {
    upper: '𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅',
    lower: '𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟'
  },
  cursive: {
    upper: '𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵',
    lower: '𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏'
  },
  cursiveBold: {
    upper: '𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩',
    lower: '𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃'
  },
  doubleStruck: {
    upper: '𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ',
    lower: '𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫'
  },
  fullwidth: {
    upper: 'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ',
    lower: 'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ'
  },
  smallCaps: {
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower: 'ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ'
  },
  circled: {
    upper: 'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ',
    lower: 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ'
  },
  negativeCircled: {
    upper: '🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩',
    lower: '🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩'
  },
  squared: {
    upper: '🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉',
    lower: '🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉'
  },
  negativeSquared: {
    upper: '🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉',
    lower: '🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉'
  },
  superscript: {
    upper: 'ᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾQᴿˢᵀᵁⱽᵂˣʸᶻ',
    lower: 'ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖqʳˢᵗᵘᵛʷˣʸᶻ'
  },
  flipped: {
    upper: '∀𐐒ƆᗡƎℲ⅁H Iſ⋊˥WNOԀΌᴚS⊥∩ΛMＸ⅄Z',
    lower: 'ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz'
  },
  reversed: {
    upper: 'A𐐒ƆᗡƎꟻGHIJK⅃MᴎOꟼQЯꙄTUVWXYZ',
    lower: 'ɒdɔbɘᎸǫʜiꞁʞlmnpqɿꙅƚuvwxyƹ'
  },
  asian1: {
    upper: '丹乃匚刀モ下厶廾工ＪＫㄥ爪れ口ㄗＱ尺Ｓ匕ＵＶＷメㄚ乙',
    lower: '丹乃匚刀モ下厶廾工ＪＫㄥ爪れ口ㄗＱ尺Ｓ匕ＵＶＷメㄚ乙'
  },
  asian2: {
    upper: '卂乃匚刀乇千Ꮆ卄丨丿Ҝㄥ爪几ㄖ卩Ɋ尺丂ㄒㄩᐯ山乂ㄚ乙',
    lower: '卂乃匚刀乇千Ꮆ卄丨丿Ҝㄥ爪几ㄖ卩Ɋ尺丂ㄒㄩᐯ山乂ㄚ乙'
  },
  russian: {
    upper: 'ДБCDEFGHЇJЌLMNФPQRSTЦVШXYZ',
    lower: 'дбcdэfghїjќlmnфpqrstцvшxyz'
  },
  fantasy1: {
    upper: 'HΞLLØW',
    lower: 'hєllow'
  },
  fantasy2: {
    upper: 'HΣLLӨW',
    lower: 'hєllσw'
  },
  fantasy3: {
    upper: 'HЄLLOШ',
    lower: 'hєllow'
  }
};

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function mapStr(str, mapObj) {
  if(!mapObj) return str;
  const upperArr = Array.from(mapObj.upper);
  const lowerArr = Array.from(mapObj.lower);
  return Array.from(str).map(c => {
    let code = c.charCodeAt(0);
    if(code >= 65 && code <= 90) return upperArr[code - 65] || c;
    if(code >= 97 && code <= 122) return lowerArr[code - 97] || c;
    return c;
  }).join('');
}

function flipStr(str) {
  const upperArr = Array.from(MAPS.flipped.upper);
  const lowerArr = Array.from(MAPS.flipped.lower);
  return Array.from(str).map(c => {
    let code = c.charCodeAt(0);
    if(code >= 65 && code <= 90) return upperArr[code - 65] || c;
    if(code >= 97 && code <= 122) return lowerArr[code - 97] || c;
    return c;
  }).reverse().join('');
}

function reverseStr(str) {
  const upperArr = Array.from(MAPS.reversed.upper);
  const lowerArr = Array.from(MAPS.reversed.lower);
  return Array.from(str).map(c => {
    let code = c.charCodeAt(0);
    if(code >= 65 && code <= 90) return upperArr[code - 65] || c;
    if(code >= 97 && code <= 122) return lowerArr[code - 97] || c;
    return c;
  }).reverse().join('');
}

function mapDiacritic(str, vMap) {
  return Array.from(str).map(c => vMap[c.toLowerCase()] || c).join('');
}

function appendToChars(str, charSuffix) {
  return Array.from(str).map(c => c !== ' ' ? c + charSuffix : c).join('');
}

const AESTHETIC_CATEGORIES = [
  {
    name: "Popular Fonts",
    styles: [
      { id: 'fraktur', transform: s => mapStr(s, MAPS.fraktur) },
      { id: 'frakturBold', transform: s => mapStr(s, MAPS.frakturBold) },
      { id: 'cursive', transform: s => mapStr(s, MAPS.cursive) },
      { id: 'cursiveBold', transform: s => mapStr(s, MAPS.cursiveBold) },
      { id: 'doubleStruck', transform: s => mapStr(s, MAPS.doubleStruck) },
      { id: 'fullwidth', transform: s => mapStr(s, MAPS.fullwidth) },
      { id: 'smallCaps', transform: s => mapStr(s, MAPS.smallCaps) },
      { id: 'fullwidthCaps', transform: s => mapStr(s.toUpperCase(), MAPS.fullwidth) },
      { id: 'circled', transform: s => mapStr(s, MAPS.circled) },
      { id: 'negCircled', transform: s => mapStr(s, MAPS.negativeCircled) },
      { id: 'negSquared', transform: s => mapStr(s, MAPS.negativeSquared) },
      { id: 'squared', transform: s => mapStr(s, MAPS.squared) },
      { id: 'aesSlash', transform: s => s.replace(/o/gi, 'Ø').replace(/e/gi, 'Ξ') }
    ]
  },
  {
    name: "Small",
    styles: [
      { id: 'smallCaps2', transform: s => mapStr(s, MAPS.smallCaps).toUpperCase() },
      { id: 'superscript', transform: s => mapStr(s, MAPS.superscript) }
    ]
  },
  {
    name: "Flip & Mirror",
    styles: [
      { id: 'upsidedown', transform: s => flipStr(s) },
      { id: 'reversed', transform: s => reverseStr(s) }
    ]
  },
  {
    name: "Fantasy",
    styles: [
      { id: 'f1', transform: s => s.replace(/e/gi, 'є') },
      { id: 'f2', transform: s => s.replace(/e/gi, 'ε').replace(/o/gi, 'σ').replace(/w/gi, 'ω') },
      { id: 'f3', transform: s => s.replace(/e/gi, 'ɛ').replace(/o/gi, 'օ').replace(/w/gi, 'ա') },
      { id: 'f4', transform: s => s.replace(/l/g, 'ℓ').replace(/o/g, 'σ') }
    ]
  },
  {
    name: "Fantasy Bold",
    styles: [
      { id: 'fb1', transform: s => s.toUpperCase().replace(/E/g, 'Є').replace(/O/g, 'Ф') },
      { id: 'fb2', transform: s => s.toUpperCase().replace(/E/g, 'Σ').replace(/O/g, 'Θ') },
      { id: 'fb3', transform: s => s.toUpperCase().replace(/E/g, 'Ξ').replace(/L/g, 'L') }
    ]
  },
  {
    name: "Russian",
    styles: [
      { id: 'r1', transform: s => mapStr(s, MAPS.russian) },
      { id: 'r2', transform: s => mapStr(s, MAPS.russian).replace(/l/gi, 'л') }
    ]
  },
  {
    name: "Asian",
    styles: [
      { id: 'a1', transform: s => mapStr(s, MAPS.asian1) },
      { id: 'a2', transform: s => mapStr(s, MAPS.asian2) }
    ]
  },
  {
    name: "Squiggle",
    styles: [
      { id: 'sq1', transform: s => appendToChars(s, '\u032C') },
      { id: 'sq2', transform: s => appendToChars(s, '\u0330') },
      { id: 'sq3', transform: s => appendToChars(s, '\u0353') }
    ]
  },
  {
    name: "Crowned",
    styles: [
      { id: 'cr1', transform: s => mapDiacritic(s, {'a':'à','e':'è','i':'ì','o':'ò','u':'ù'}) },
      { id: 'cr2', transform: s => mapDiacritic(s, {'a':'â','e':'ê','i':'î','o':'ô','u':'û'}) },
      { id: 'cr3', transform: s => mapDiacritic(s, {'a':'á','e':'é','i':'í','o':'ó','u':'ú'}) }
    ]
  },
  {
    name: "Lines",
    styles: [
      { id: 'l1', transform: s => appendToChars(s, '\u0332') }, // Underline
      { id: 'l2', transform: s => appendToChars(s, '\u0333') }, // Double underline
      { id: 'l3', transform: s => appendToChars(s, '\u0336') }  // Strikethrough
    ]
  },
  {
    name: "Decorated Lines",
    styles: [
      { id: 'dl1', transform: s => `☄. *. ⋆ ${appendToChars(s, '\u0332')} ⋆. *. ☄` },
      { id: 'dl2', transform: s => `┏━━━━━━ ${appendToChars(s, '\u0332')} ━━━━━━┓` }
    ]
  },
  {
    name: "Decorated Asian",
    styles: [
      { id: 'da1', transform: s => `▰▰ 💣 ${mapStr(s, MAPS.asian1)} 💣 ▰▰` },
      { id: 'da2', transform: s => `╰╰✧ALPHA✧╯╯ ${mapStr(s, MAPS.asian2)} ╰╰✧ALPHA✧╯╯` }
    ]
  },
  {
    name: "Decorated Crowned",
    styles: [
      { id: 'dc1', transform: s => `୧(•̀ㅁ•́)૭ ${mapDiacritic(s, {'a':'á','e':'é','i':'í','o':'ó','u':'ú'})} ୧(ᵕ_ᵕ)૭` },
      { id: 'dc2', transform: s => `⚔️ ${mapDiacritic(s, {'a':'â','e':'ê','i':'î','o':'ô','u':'û'})} ⚔️` }
    ]
  },
  {
    name: "Gun",
    styles: [
      { id: 'gun1', transform: s => `💣▄︻デ══━一 ${s.replace(/o/gi, 'Ø').replace(/e/gi, 'Ξ')}` },
      { id: 'gun2', transform: s => `🔫══━一 ${s.replace(/l/g, 'l').replace(/o/g, '©')}` },
      { id: 'gun3', transform: s => `▄︻̷̿┻̿═━一 💥 /${Array.from(s).join('7/')}/ 💥` },
      { id: 'gun4', transform: s => `━╤デ╦︻ 💥 ${s} 💥` },
      { id: 'gun5', transform: s => `💥 ︻デ══━一 ${s} ━一══デ︻ 💥` },
      { id: 'gun6', transform: s => `=͟͟͞͞=͟͟͞͞ ︻╦̵̵͇̿̿̿̿ ╤── ${s} ─╤ ╦̵̵͇̿̿̿̿︻ ==͟͟͞͞=͟͟͞͞` }
    ]
  },
  {
    name: "Star Decorated",
    styles: [
      { id: 'star1', transform: s => `✳✳✳ ${s.replace(/l/g, 'ℓ').replace(/o/g, 'σ')} ✳✳✳` },
      { id: 'star2', transform: s => `★★★ ${s.toUpperCase()} ★★★` },
      { id: 'star3', transform: s => `《★》 ${s.toUpperCase().replace(/E/g, 'Σ').replace(/O/g, 'Θ')} 《★》` },
      { id: 'star4', transform: s => `ミ★ ${s.toUpperCase().replace(/O/g, 'Ø').replace(/E/g, 'Ξ')} ★彡` },
      { id: 'star5', transform: s => `★☆☆ ${s.toUpperCase().replace(/O/g, 'Ѻ').replace(/E/g, 'Ӭ')} ☆☆★` },
      { id: 'star6', transform: s => `☆☆☆ ${s} ☆☆☆` }
    ]
  },
  {
    name: "Cute",
    styles: [
      { id: 'cute1', transform: s => `🥰😍 ${s} 😍🥰` },
      { id: 'cute2', transform: s => `❀❁ ${mapDiacritic(s.toUpperCase(), {'A':'Â','E':'Ê','I':'Î','O':'Ô','U':'Û', 'H':'Ĥ', 'L':'Ĺ', 'W':'Ŵ'})} ❁❀` },
      { id: 'cute3', transform: s => `🧁🎀 ${s.toUpperCase()} 🎀🧁` },
      { id: 'cute4', transform: s => `🌸🌷 ${Array.from(s).join(' ')} 🌷🌸` },
      { id: 'cute5', transform: s => `🐾🌈 ${mapStr(s, MAPS.circled)} 🌈🐾` },
      { id: 'cute6', transform: s => `🍰🍒 ${mapStr(s, MAPS.negativeSquared)} 🍒🍰` },
      { id: 'cute7', transform: s => `🌺🌸 ${flipStr(s)} 🌸🌺` },
      { id: 'cute8', transform: s => `😻🐶 ${s.toUpperCase().replace(/O/g, 'Ø').replace(/E/g, 'Ɇ')} 🐶😻` }
    ]
  },
  {
    name: "Joiner",
    styles: [
      { id: 'join1', transform: s => Array.from(s).join('░') + '░' },
      { id: 'join2', transform: s => '≈' + Array.from(s).join('≈') + '≈' },
      { id: 'join3', transform: s => Array.from(s).join('⍣') },
      { id: 'join4', transform: s => Array.from(s).join('•|•') },
      { id: 'join5', transform: s => Array.from(s).join('▪') },
      { id: 'join6', transform: s => Array.from(s).join('\\') },
      { id: 'join7', transform: s => `/${Array.from(s).join('7/')}/w7` },
      { id: 'join8', transform: s => Array.from(s).join('|') },
      { id: 'join9', transform: s => Array.from(s).join('→') },
      { id: 'join10', transform: s => Array.from(s).join('•⊙•') },
      { id: 'join11', transform: s => Array.from(s).join('⁕') },
      { id: 'join12', transform: s => '〜' + Array.from(s).join('〜') + '〜' },
      { id: 'join13', transform: s => '↳' + Array.from(s).join('↳') + '↵' },
      { id: 'join14', transform: s => Array.from(s).join('\\/') },
      { id: 'join15', transform: s => Array.from(s).join('┆') },
      { id: 'join16', transform: s => Array.from(s).join('♥') }
    ]
  },
  {
    name: "Boxed",
    styles: [
      { id: 'box1', transform: s => Array.from(s).map(c => `╠${c}╣`).join('') },
      { id: 'box2', transform: s => Array.from(s).map(c => `[${c}]`).join('') },
      { id: 'box3', transform: s => Array.from(s).map(c => `【${c}】`).join('') },
      { id: 'box4', transform: s => Array.from(s).map(c => `〚${mapDiacritic(c, {'a':'á','e':'é','i':'í','o':'ó','u':'ú'})}〛`).join('') },
      { id: 'box5', transform: s => Array.from(s).map(c => `〈${c}〉`).join('') },
      { id: 'box6', transform: s => Array.from(s).map(c => `⌜${c}⌟`).join('') },
      { id: 'box7', transform: s => Array.from(s).map(c => `『${c}』`).join('') },
      { id: 'box8', transform: s => Array.from(s).map(c => `[${mapDiacritic(c, {'a':'â','e':'ê','i':'î','o':'ô','u':'û'})}]`).join('') },
      { id: 'box9', transform: s => Array.from(s).map(c => `〚${c}〛`).join('') },
      { id: 'box10', transform: s => Array.from(s).map(c => `<${c}>`).join('') }
    ]
  },
  {
    name: "Random",
    styles: [
      { id: 'rand1', transform: s => `⚚${s}⚚` },
      { id: 'rand2', transform: s => `♛ 〚${s}〛 ♛` },
      { id: 'rand3', transform: s => `▓▒░${s}░▒▓` },
      { id: 'rand4', transform: s => `⚔ GOD MODE ⚔ ⓗⓔⓛⓛⓞⓦ` },
      { id: 'rand5', transform: s => `((✦ROYAL✦)) ${Array.from(s).join('|')}` },
      { id: 'rand6', transform: s => `⍣ ${Array.from(s).join('|')} ⍣` },
      { id: 'rand7', transform: s => `☣☣ ${s} ☣☣` },
      { id: 'rand8', transform: s => `✧✧ /h7/e7/l7/l7/o7/w7 ✧✧` },
      { id: 'rand9', transform: s => `✦ KING ${s.toUpperCase().replace(/E/g, 'Ξ').replace(/O/g, 'Ø')} KING ✦` },
      { id: 'rand10', transform: s => `♡(●_●)♡ ${s.replace(/l/g, 'l,')} ♡(●_●)♡` },
      { id: 'rand11', transform: s => `(≧◡≦) ♡ ĥêlćơw` },
      { id: 'rand12', transform: s => `(•́₃•̀) ${s}` },
      { id: 'rand13', transform: s => `▬ι════ 💥 Ĥ[e]łÎ①W 💥 ════ι▬` }
    ]
  },
  {
    name: "Mega Random",
    styles: [
      { id: 'mega1', transform: s => `[[[ ⚜ [ ${s} ] ⚜ ]]]` },
      { id: 'mega2', transform: s => `( . • _ • . ) ${mapStr(s.toUpperCase(), MAPS.circled)}` },
      { id: 'mega3', transform: s => `🚀 🔴 ħƓⱠⱠØѠ 🔴 🚀` },
      { id: 'mega4', transform: s => `▰▰ ${s.toUpperCase().replace(/E/g, 'Є').replace(/L/g, 'Լ').replace(/O/g, 'Ơ')} ▰▰` },
      { id: 'mega5', transform: s => `꧁༒ ${s.toUpperCase().replace(/E/g, 'Ɇ').replace(/L/g, 'Ⱡ').replace(/O/g, 'Ø')} ༒꧂` },
      { id: 'mega6', transform: s => `(づ￣ ³￣)づ ${s.toUpperCase()}` },
      { id: 'mega7', transform: s => `【☆】 ${s.replace(/e/g, 'є').replace(/o/g, 'σ')} 【☆】` },
      { id: 'mega8', transform: s => `☠️ ${s.toUpperCase().replace(/E/g, 'Ɇ').replace(/L/g, 'Ⱡ').replace(/O/g, 'Ø')} ☠️` },
      { id: 'mega9', transform: s => `«-(¯\`v´¯)-« ${s.replace(/e/g, 'є').replace(/o/g, 'σ')} »-(¯\`v´¯)-»` },
      { id: 'mega10', transform: s => `✧◌•. ${Array.from(s).join(' ')} .•◌✧` },
      { id: 'mega11', transform: s => `(๑>◡<๑) ${s.toUpperCase()} ♡` },
      { id: 'mega12', transform: s => `✧･ﾟ: *✧･ﾟ:* ${Array.from(s).join(' ')} *:･ﾟ✧*:･ﾟ✧` },
      { id: 'mega13', transform: s => `(灬º‿º灬)♡ ${s}` },
      { id: 'mega14', transform: s => `☆ 👁️ ${Array.from(s).join(' | ')} 👁️ ☆` },
      { id: 'mega15', transform: s => `≪ ${Array.from(s.toUpperCase().replace(/E/g, 'Є').replace(/L/g, 'Լ').replace(/O/g, '⊙')).join(' ')} ≫` },
      { id: 'mega16', transform: s => `✨ ${s} ✨` },
      { id: 'mega17', transform: s => `*•.¸♡ ${s} ♡¸.•*` }
    ]
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const inputEl = document.getElementById('aestheticInput');
  const resultsEl = document.getElementById('aestheticResults');

  function renderCards(text) {
    if(!text) text = "hellow";
    
    let html = '';
    AESTHETIC_CATEGORIES.forEach(cat => {
      html += `<h2 class="aesthetic-section-title">${cat.name}</h2>`;
      html += `<div class="aesthetic-grid">`;
      cat.styles.forEach(style => {
        let transformed = style.transform(text);
        let count = transformed.length;
        
        let displayHtml = transformed.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        let safeEscape = transformed.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '&quot;');
        
        html += `
          <div class="aesthetic-pill" onclick="copyAestheticText(this, '${safeEscape}')">
            <div class="aesthetic-pill-left">${count} chars</div>
            <div class="aesthetic-pill-center">${displayHtml}</div>
            <div class="aesthetic-pill-right">
              <button class="aesthetic-icon">🪄</button>
              <button class="aesthetic-icon">📋</button>
              <button class="aesthetic-icon">➔</button>
            </div>
            <div class="copy-toast">Copied!</div>
          </div>
        `;
      });
      html += `</div>`;
    });
    resultsEl.innerHTML = html;
  }

  inputEl.addEventListener('input', (e) => {
    renderCards(e.target.value);
  });

  // initial render
  renderCards('hellow');
});

window.copyAestheticText = function(cardEl, text) {
  navigator.clipboard.writeText(text).then(() => {
    cardEl.classList.add('copied');
    setTimeout(() => {
      cardEl.classList.remove('copied');
    }, 1500);
  });
};
