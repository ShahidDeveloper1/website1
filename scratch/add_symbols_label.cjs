const fs = require('fs');
const path = require('path');

const translationsDir = path.join(__dirname, '..', 'translations');

const labels = {
  ar: "رموز",
  bg: "символи",
  bn: "প্রতীক",
  de: "Symbole",
  es: "símbolos",
  fr: "symboles",
  hi: "प्रतीक",
  id: "simbol",
  it: "simboli",
  ja: "記号",
  ko: "기호",
  ms: "simbol",
  pl: "symboli",
  pt: "símbolos",
  ru: "символов",
  sv: "symboler",
  tr: "sembol"
};

for (const [lang, label] of Object.entries(labels)) {
  const filePath = path.join(translationsDir, `${lang}.json`);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    data.cat_symbols_label = label;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Added cat_symbols_label to ${lang}.json`);
  }
}
