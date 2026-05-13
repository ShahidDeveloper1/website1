import fs from 'fs';
import path from 'path';

const DOMAIN = 'https://fancysymbols.com';
const AUTHOR_NAME = 'Shahid Developer';
const PUBLISH_DATE = '2026-05-13';

const CORE_PAGES = [
    'index.html', 'all-symbols.html', 'cute-fonts.html', 
    'preppy-fonts.html', 'aesthetic-fonts.html', 'lenny-face.html'
];

function generateSchemaAndTags(title, description, url, isSymbolPage) {
    const hreflangTags = `
  <link rel="alternate" hreflang="x-default" href="${url}">
  <link rel="alternate" hreflang="en" href="${url}">`;

    let schemas = [];
    
    // 1. WebSite / WebPage Schema
    schemas.push({
        "@context": "https://schema.org",
        "@type": isSymbolPage ? "WebPage" : "WebSite",
        "name": title,
        "description": description,
        "url": url
    });

    // 2. Article & Person Schema (for EEAT on Symbol Pages)
    if (isSymbolPage) {
        schemas.push({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": description,
            "author": {
                "@type": "Person",
                "name": AUTHOR_NAME,
                "url": DOMAIN
            },
            "publisher": {
                "@type": "Organization",
                "name": "FancySymbols",
                "logo": {
                    "@type": "ImageObject",
                    "url": `${DOMAIN}/favicon.png`
                }
            },
            "datePublished": "2024-01-01",
            "dateModified": PUBLISH_DATE,
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": url
            }
        });
    } else if (url.includes('font-generator') || url.includes('fonts')) {
        // SoftwareApplication schema for tools
        schemas.push({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": title,
            "operatingSystem": "All",
            "applicationCategory": "UtilitiesApplication",
            "offers": {
                "@type": "Offer",
                "price": "0.00",
                "priceCurrency": "USD"
            }
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

function processPage(filepath, isSymbolPage) {
    let content = fs.readFileSync(filepath, 'utf8');
    const filename = path.basename(filepath, '.html');
    const folder = isSymbolPage ? 'symbols' : (filepath.includes('pages') ? 'pages' : '');
    
    // Extract title and description
    let titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
    let descMatch = content.match(/<meta name="description" content="([^"]*)">/i);
    
    const title = titleMatch ? titleMatch[1] : "Fancy Symbols";
    const description = descMatch ? descMatch[1] : "Copy and paste aesthetic text symbols.";

    const cleanUrlPath = folder ? `${folder}/${filename}` : (filename === 'index' ? '' : filename);
    const fullUrl = `${DOMAIN}/${cleanUrlPath}`;

    // Generate SEO payload
    const seoPayload = generateSchemaAndTags(title, description, fullUrl, isSymbolPage);

    // 1. Inject JSON-LD & Hreflang
    // Remove old schema or hreflang to prevent duplicates if script is run multiple times
    content = content.replace(/<link rel="alternate" hreflang="[^"]*" href="[^"]*">\s*/g, '');
    content = content.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/g, '');
    
    // Inject right before </head>
    content = content.replace(/<\/head>/i, seoPayload + '\n</head>');

    // 2. Inject EEAT Box (Only for symbol content pages)
    if (isSymbolPage) {
        // Remove existing EEAT box if present
        content = content.replace(/<!-- EEAT Author Box -->[\s\S]*?<\/div>\s*<\/div>/g, '');
        content = content.replace(/<!-- EEAT Author Box -->[\s\S]*?<\/div>\s*(?=<|<!--)/g, ''); // Alternative regex
        content = content.replace(/<!-- EEAT Author Box -->[\s\S]*?<div class="eeat-box"[\s\S]*?<\/div>\s*/g, '');

        // Simple string replacement to remove it entirely just in case
        let eeatIndex = content.indexOf('<!-- EEAT Author Box -->');
        if (eeatIndex !== -1) {
             let endIndex = content.indexOf('</div>', eeatIndex + 100);
             if (endIndex !== -1) {
                 content = content.substring(0, eeatIndex) + content.substring(endIndex + 6);
             }
        }

        // Inject right before the closing div of content-article, or at the end of content-article
        if (content.includes('<div class="content-article">')) {
            // Find the end of content-article
            content = content.replace(/(<div class="content-article">[\s\S]*?)(<\/div>\s*<\/main>)/i, '$1' + EEAT_BOX + '\n$2');
        } else {
             // Fallback
             content = content.replace(/<\/main>/i, EEAT_BOX + '\n</main>');
        }
    }

    fs.writeFileSync(filepath, content, 'utf8');
}

// 1. Process Root Pages
const rootFiles = fs.readdirSync(process.cwd()).filter(f => f.endsWith('.html'));
rootFiles.forEach(f => {
    if (CORE_PAGES.includes(f)) {
        processPage(path.join(process.cwd(), f), false);
    }
});

// 2. Process Symbol Pages
const symbolsDir = path.join(process.cwd(), 'symbols');
if (fs.existsSync(symbolsDir)) {
    const symbolFiles = fs.readdirSync(symbolsDir).filter(f => f.endsWith('.html'));
    symbolFiles.forEach(f => {
        processPage(path.join(symbolsDir, f), true);
    });
}

// 3. Process Legal Pages
const pagesDir = path.join(process.cwd(), 'pages');
if (fs.existsSync(pagesDir)) {
    const pagesFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));
    pagesFiles.forEach(f => {
        processPage(path.join(pagesDir, f), false);
    });
}

console.log('✅ Successfully injected JSON-LD Schema, Hreflang tags, and EEAT author boxes into all pages.');
