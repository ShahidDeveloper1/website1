import fs from 'fs';
import path from 'path';

const DOMAIN = 'https://www.fancysymbols.com';
const LANGS = ['hi', 'es', 'ru', 'fr', 'de', 'it', 'pt', 'bn', 'ja', 'ko', 'ms', 'pl', 'id', 'ar', 'bg', 'tr', 'sv'];

// Files to exclude from sitemap (old/deprecated/duplicate content)
const EXCLUDED_FILES = new Set([
    'old_morse_code.html',
    'old_small_text.html',
    'old-preppy-fonts.html.tmp'
]);

// Directories to skip entirely
const EXCLUDED_DIRS = new Set([
    '.git', 'node_modules', 'dist', '.vscode', 'images',
    ...LANGS
]);

function generateSitemap() {
    let englishUrls = [];
    const currentDate = new Date().toISOString().split('T')[0];

    function processDir(dir, prefix = '') {
        if (!fs.existsSync(dir)) return;
        const files = fs.readdirSync(dir);
        files.forEach(f => {
            const fullPath = path.join(dir, f);
            if (fs.statSync(fullPath).isDirectory()) {
                if (EXCLUDED_DIRS.has(f)) return;
                processDir(fullPath, prefix ? `${prefix}/${f}` : f);
            } else if (f.endsWith('.html') && !EXCLUDED_FILES.has(f)) {
                let cleanName = f.replace('.html', '');
                if (cleanName === 'index') cleanName = '';
                
                const urlPath = prefix ? `${prefix}/${cleanName}` : cleanName;
                englishUrls.push(urlPath);
            }
        });
    }

    // Process Root directory for English pages
    processDir(process.cwd());

    // --- Generate main sitemap (English + xhtml:link alternates) ---
    let mainUrls = [];
    englishUrls.forEach(urlPath => {
        const loc = urlPath ? `${DOMAIN}/${urlPath}` : `${DOMAIN}/`;

        // Priority logic
        let priority = '0.8';
        if (!urlPath || urlPath.endsWith('/')) priority = '1.0';
        else if (urlPath.includes('symbols/')) priority = '0.9';
        else if (urlPath.includes('pages/')) priority = '0.5';
        else if (urlPath.includes('letters/')) priority = '0.7';
        else if (urlPath.includes('names/')) priority = '0.7';

        const changefreq = !urlPath ? 'daily' : 'weekly';

        // Build xhtml:link alternates for this URL
        const enLoc = urlPath ? `${DOMAIN}/${urlPath}` : `${DOMAIN}/`;
        let alternates = '';
        alternates += `    <xhtml:link rel="alternate" hreflang="en" href="${enLoc}"/>\n`;
        alternates += `    <xhtml:link rel="alternate" hreflang="x-default" href="${enLoc}"/>\n`;
        LANGS.forEach(lang => {
            const langLoc = urlPath ? `${DOMAIN}/${lang}/${urlPath}` : `${DOMAIN}/${lang}`;
            alternates += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${langLoc}"/>\n`;
        });

        mainUrls.push(`  <url>\n    <loc>${loc.replace(/\/$/, '')}</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n${alternates}  </url>`);
    });

    const mainSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${mainUrls.join('\n')}
</urlset>`;

    fs.writeFileSync('sitemap.xml', mainSitemap, 'utf8');
    console.log(`✅ Generated sitemap.xml with ${mainUrls.length} English URLs (with hreflang alternates).`);

    // --- Generate per-language sitemaps ---
    LANGS.forEach(lang => {
        let langUrls = [];
        englishUrls.forEach(urlPath => {
            const langLoc = urlPath ? `${DOMAIN}/${lang}/${urlPath}` : `${DOMAIN}/${lang}`;

            let priority = '0.7';
            if (!urlPath) priority = '0.9';
            else if (urlPath.includes('symbols/')) priority = '0.8';
            else if (urlPath.includes('names/')) priority = '0.6';
            else if (urlPath.includes('letters/')) priority = '0.6';

            const changefreq = !urlPath ? 'daily' : 'weekly';

            // Build xhtml:link alternates
            const enLoc = urlPath ? `${DOMAIN}/${urlPath}` : `${DOMAIN}/`;
            let alternates = '';
            alternates += `    <xhtml:link rel="alternate" hreflang="en" href="${enLoc}"/>\n`;
            alternates += `    <xhtml:link rel="alternate" hreflang="x-default" href="${enLoc}"/>\n`;
            LANGS.forEach(l => {
                const lLoc = urlPath ? `${DOMAIN}/${l}/${urlPath}` : `${DOMAIN}/${l}`;
                alternates += `    <xhtml:link rel="alternate" hreflang="${l}" href="${lLoc}"/>\n`;
            });

            langUrls.push(`  <url>\n    <loc>${langLoc}</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n${alternates}  </url>`);
        });

        const langSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${langUrls.join('\n')}
</urlset>`;

        fs.writeFileSync(`sitemap-${lang}.xml`, langSitemap, 'utf8');
    });

    console.log(`✅ Generated ${LANGS.length} localized sitemaps (sitemap-{lang}.xml).`);

    // --- Generate sitemap index ---
    let sitemapEntries = [];
    sitemapEntries.push(`  <sitemap>\n    <loc>${DOMAIN}/sitemap.xml</loc>\n    <lastmod>${currentDate}</lastmod>\n  </sitemap>`);
    LANGS.forEach(lang => {
        sitemapEntries.push(`  <sitemap>\n    <loc>${DOMAIN}/sitemap-${lang}.xml</loc>\n    <lastmod>${currentDate}</lastmod>\n  </sitemap>`);
    });

    const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.join('\n')}
</sitemapindex>`;

    fs.writeFileSync('sitemap-index.xml', sitemapIndex, 'utf8');
    console.log(`✅ Generated sitemap-index.xml with ${sitemapEntries.length} sitemaps.`);
}

generateSitemap();
