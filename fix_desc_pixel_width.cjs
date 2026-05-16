const fs = require('fs');
const path = require('path');

const skip = new Set(['.git', 'node_modules', 'dist', 'images', '.vscode', 'es', 'fr']);
const MAX_LEN = 135; // Under 920px pixel width safely
let updated = 0;

function shortenDesc(filePath, fileName, dirName) {
  const baseName = fileName.replace('.html', '').replace(/-/g, ' ');
  const capName = baseName.replace(/\b\w/g, c => c.toUpperCase());

  if (dirName === 'names') {
    return `${capName} in fancy fonts — cursive, gothic, bubble & bold styles. Copy and paste for Instagram, TikTok & Discord bios.`;
  }

  if (dirName === 'letters') {
    const letter = baseName.toUpperCase();
    return `Fancy letter ${letter} in cursive, gothic, bubble & bold fonts. Copy and paste stylish ${letter} for bios and social media.`;
  }

  // Specific overrides for utility and other pages
  const overrides = {
    'pages/privacy.html': 'Read our privacy policy. Learn how FancySymbols handles your data and protects your information.',
    'pages/terms.html': 'Terms of use for FancySymbols. Read our terms and conditions for using our text symbol tools.',
    'roblox-symbols.html': 'Copy and paste Roblox symbols and characters for your gaming name and bio. Cool text symbols for Roblox.',
    'tiktok-symbols.html': 'Copy and paste TikTok bio symbols and aesthetic text. Make your TikTok profile stand out.',
    'upside-down-text.html': 'Flip your text upside down instantly. Free upside down text generator with one-click copy and paste.',
    'aesthetic-fonts.html': 'Generate aesthetic fonts and stylish text. Copy and paste fancy Unicode fonts for social media bios.',
    'cute-fonts.html': 'Generate cute fonts with symbols. Copy and paste adorable text styles for Instagram and TikTok bios.',
    'preppy-fonts.html': 'Generate preppy fonts with ribbons and bows. Copy and paste cute preppy text for social media bios.',
    'font-generator.html': 'Free fancy text generator with 20+ stylish Unicode fonts. Copy and paste cool text for bios and posts.',
    'bio-generator.html': 'Generate aesthetic bios for Instagram, TikTok and Discord. Copy and paste stylish bio templates.',
    'bold-text.html': 'Convert text to bold Unicode font instantly. Free bold text generator with one-click copy and paste.',
    'small-text.html': 'Convert text to tiny superscript Unicode text. Free small text generator with one-click copy paste.',
    'vaporwave-text.html': 'Convert text to wide vaporwave aesthetic font. Free generator with one-click copy and paste.',
    'morse-code.html': 'Translate text to Morse code and Morse to text instantly. Free online Morse code translator tool.',
    'text-repeater.html': 'Repeat any text or emoji multiple times instantly. Free online text repeater with one-click copy.',
    'character-counter.html': 'Count characters, words, sentences and paragraphs in your text. Free online character counter tool.',
    'blank-space.html': 'Copy invisible blank space characters for social media bios. Empty text and whitespace characters.',
    'invisible-character.html': 'Copy invisible characters and empty text for usernames and bios. Zero-width and blank characters.',
    'cursive-text.html': 'Convert text to cursive handwriting font. Free cursive text generator with one-click copy paste.',
    'gothic-text.html': 'Convert text to gothic blackletter font. Free gothic text generator with one-click copy and paste.',
    'bubble-text.html': 'Convert text to bubble letter font. Free bubble text generator with one-click copy and paste.',
    'strikethrough-text.html': 'Add strikethrough to your text instantly. Free strikethrough text generator with one-click copy.',
    'zalgo-text.html': 'Generate creepy glitchy zalgo text. Free zalgo text generator with one-click copy and paste.',
    'bullet-point.html': 'Copy and paste bullet point symbols for lists. Dots, arrows, stars and decorative bullet characters.',
    'lenny-face.html': 'Copy and paste Lenny faces and kaomoji emoticons. Huge collection of text faces for messaging.',
    'emoticons.html': 'Copy and paste Japanese emoticons and kaomoji. Huge collection of cute text faces and expressions.',
    'free-fire-name.html': 'Generate stylish Free Fire names with cool symbols. Copy and paste gaming nicknames instantly.',
    'username-generator.html': 'Generate unique aesthetic usernames for gaming and social media. Copy and paste stylish nicknames.',
    'discord-symbols.html': 'Copy and paste Discord symbols and special characters. Cool text symbols for your Discord profile.',
    'instagram-symbols.html': 'Copy and paste Instagram bio symbols and aesthetic text. Make your IG profile stand out with symbols.',
    'all-symbols.html': 'Browse 1000+ Unicode text symbols organized by category. Copy and paste symbols with one click.',
    'index.html': 'Copy and paste 1000+ text symbols for Instagram, Discord and TikTok. Hearts, stars, arrows and more.',
  };

  const normalized = filePath.replace(/\\/g, '/');
  for (const [key, desc] of Object.entries(overrides)) {
    if (normalized.endsWith(key)) return desc;
  }

  return null; // No override needed
}

function walk(dir) {
  fs.readdirSync(dir).forEach(entry => {
    const filePath = path.join(dir, entry);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory() && !skip.has(entry)) {
      walk(filePath);
    } else if (entry.endsWith('.html') && !entry.startsWith('old_')) {
      let content = fs.readFileSync(filePath, 'utf8');
      const match = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/);
      if (!match) return;

      const currentDesc = match[1];
      if (currentDesc.length <= MAX_LEN) return; // Already short enough

      const dirName = path.basename(dir);
      const newDesc = shortenDesc(filePath, entry, dirName);
      if (!newDesc) return;

      if (newDesc.length > MAX_LEN) {
        console.log(`⚠️  STILL TOO LONG (${newDesc.length}): ${filePath}`);
        return;
      }

      content = content.replace(
        /<meta\s+name=["']description["']\s+content=["'][^"']*["']/,
        `<meta name="description" content="${newDesc}"`
      );
      fs.writeFileSync(filePath, content, 'utf8');
      updated++;
      console.log(`✅ ${filePath} (${newDesc.length} chars)`);
    }
  });
}

walk('.');
console.log(`\n📊 Total descriptions shortened: ${updated}`);
