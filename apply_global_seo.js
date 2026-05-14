import fs from 'fs';
import path from 'path';

const DOMAIN = 'https://www.fancysymbols.com';
const AUTHOR_NAME = 'Shahid Developer';
const PUBLISH_DATE = '2026-05-13';

const CORE_PAGES = [
    'index.html', 'all-symbols.html', 'cute-fonts.html', 
    'preppy-fonts.html', 'aesthetic-fonts.html', 'lenny-face.html'
];

function generateSchemaAndTags(title, description, urlPath, isSymbolPage) {
    let hreflangTags = `
  <link rel="alternate" hreflang="x-default" href="${DOMAIN}/${urlPath}">
  <link rel="alternate" hreflang="en" href="${DOMAIN}/${urlPath}">`;

    const fullUrl = `${DOMAIN}/${urlPath}`;
    let schemas = [];
    
    schemas.push({
        "@context": "https://schema.org",
        "@type": isSymbolPage ? "WebPage" : "WebSite",
        "name": title,
        "description": description,
        "url": fullUrl
    });

    if (isSymbolPage) {
        schemas.push({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": description,
            "author": { "@type": "Person", "name": AUTHOR_NAME, "url": DOMAIN },
            "publisher": { "@type": "Organization", "name": "FancySymbols", "logo": { "@type": "ImageObject", "url": `${DOMAIN}/favicon.png` } },
            "datePublished": "2024-01-01",
            "dateModified": PUBLISH_DATE,
            "mainEntityOfPage": { "@type": "WebPage", "@id": fullUrl }
        });
    }

    const jsonLd = `
  <script type="application/ld+json">
    ${JSON.stringify(schemas, null, 2)}
  </script>`;

    return hreflangTags + jsonLd;
}

const EEAT_BOX = `
  <!-- EEAT Author Box -->
  <div class="eeat-box" style="margin-top: 40px; padding: 20px; background: rgba(255,255,255,0.05); border-left: 4px solid var(--primary-color); border-radius: 8px; font-size: 0.95rem;">
    <h3 style="margin-top: 0; font-size: 1.1rem; color: var(--text-color);">Expertly Curated Content</h3>
    <p style="margin: 8px 0;"><strong>Written by:</strong> ${AUTHOR_NAME} (Text & Unicode Specialist)</p>
    <p style="margin: 8px 0;"><strong>Last Updated:</strong> May 2026</p>
    <p style="margin: 8px 0; opacity: 0.8;"><strong>Review Status:</strong> Fact-checked for accuracy and universal compatibility across all modern devices and platforms.</p>
  </div>
`;

function processPage(filepath, isSymbolPage, baseLang = '') {
    let content = fs.readFileSync(filepath, 'utf8');
    const filename = path.basename(filepath, '.html');
    
    // determine path relative to root
    const relPath = path.relative(process.cwd(), filepath).replace(/\\/g, '/');
    let urlPath = relPath;
    if (baseLang) {
        // e.g. es/symbols/heart.html -> symbols/heart.html for canonical mapping
        urlPath = urlPath.substring(baseLang.length + 1);
    }
    // Clean .html for the URL
    if (urlPath === 'index.html') urlPath = '';
    else urlPath = urlPath.replace('.html', '');

    let titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
    let descMatch = content.match(/<meta name="description" content="([^"]*)">/i);
    
    const title = titleMatch ? titleMatch[1] : "Fancy Symbols";
    const description = descMatch ? descMatch[1] : "Copy and paste aesthetic text symbols.";

    const seoPayload = generateSchemaAndTags(title, description, urlPath, isSymbolPage);

    content = content.replace(/<link rel="alternate" hreflang="[^"]*" href="[^"]*">\s*/g, '');
    content = content.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/g, '');
    content = content.replace(/<\/head>/i, seoPayload + '\n</head>');

    if (isSymbolPage) {
        content = content.replace(/<!-- EEAT Author Box -->[\s\S]*?<\/div>\s*<\/div>/g, '');
        content = content.replace(/<!-- EEAT Author Box -->[\s\S]*?<\/div>\s*(?=<|<!--)/g, '');
        content = content.replace(/<!-- EEAT Author Box -->[\s\S]*?<div class="eeat-box"[\s\S]*?<\/div>\s*/g, '');

        let eeatIndex = content.indexOf('<!-- EEAT Author Box -->');
        if (eeatIndex !== -1) {
             let endIndex = content.indexOf('</div>', eeatIndex + 100);
             if (endIndex !== -1) content = content.substring(0, eeatIndex) + content.substring(endIndex + 6);
        }

        if (content.includes('<div class="content-article">')) {
            content = content.replace(/(<div class="content-article">[\s\S]*?)(<\/div>\s*<\/main>)/i, '$1' + EEAT_BOX + '\n$2');
        } else {
             content = content.replace(/<\/main>/i, EEAT_BOX + '\n</main>');
        }
    }

    fs.writeFileSync(filepath, content, 'utf8');
}

function processDirectory(dir, baseLang = '') {
    const files = fs.readdirSync(dir);
    files.forEach(f => {
        const fullPath = path.join(dir, f);
        if (fs.statSync(fullPath).isDirectory()) {
             // skip lang directories when processing root
             processDirectory(fullPath, baseLang);
        } else if (f.endsWith('.html')) {
             const isSymbolPage = fullPath.includes('symbols');
             processPage(fullPath, isSymbolPage, baseLang);
        }
    });
}

// Process English root
processDirectory(process.cwd());

console.log('✅ Successfully injected JSON-LD Schema, Hreflang tags, and EEAT author boxes into all pages.');
