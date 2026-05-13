import fs from 'fs';
import path from 'path';

const DOMAIN = 'https://fancysymbols.com';

const CORE_PAGES = [
    'index.html', 'all-symbols.html', 'cute-fonts.html', 
    'preppy-fonts.html', 'aesthetic-fonts.html', 'lenny-face.html'
];

function generateSitemap() {
    let urls = [];
    const currentDate = new Date().toISOString().split('T')[0];

    // Root core pages
    const rootFiles = fs.readdirSync(process.cwd()).filter(f => f.endsWith('.html'));
    rootFiles.forEach(f => {
        if (CORE_PAGES.includes(f)) {
            const loc = f === 'index.html' ? `${DOMAIN}/` : `${DOMAIN}/${f.replace('.html', '')}`;
            const priority = f === 'index.html' ? '1.0' : '0.8';
            urls.push(`  <url>\n    <loc>${loc}</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>${priority}</priority>\n  </url>`);
        }
    });

    // Subdirectory pages
    ['symbols', 'pages'].forEach(dir => {
        const dirPath = path.join(process.cwd(), dir);
        if (fs.existsSync(dirPath)) {
            const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.html'));
            files.forEach(f => {
                const cleanName = f.replace('.html', '');
                const loc = `${DOMAIN}/${dir}/${cleanName}`;
                const priority = dir === 'symbols' ? '0.9' : '0.6';
                urls.push(`  <url>\n    <loc>${loc}</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`);
            });
        }
    });

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

    fs.writeFileSync('sitemap.xml', sitemapContent, 'utf8');
    console.log(`✅ Successfully generated sitemap.xml with ${urls.length} URLs.`);
}

generateSitemap();
