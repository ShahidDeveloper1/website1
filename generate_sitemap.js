import fs from 'fs';
import path from 'path';

const DOMAIN = 'https://fancysymbols.com';

function generateSitemap() {
    let urls = [];
    const currentDate = new Date().toISOString().split('T')[0];

    function addUrl(loc, priority, changefreq = 'weekly') {
        urls.push(`  <url>\n    <loc>${loc}</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`);
    }

    function processDir(dir, prefix = '') {
        if (!fs.existsSync(dir)) return;
        const files = fs.readdirSync(dir);
        files.forEach(f => {
            const fullPath = path.join(dir, f);
            if (fs.statSync(fullPath).isDirectory()) {
                if (f === '.git' || f === 'node_modules') return;
                processDir(fullPath, prefix ? `${prefix}/${f}` : f);
            } else if (f.endsWith('.html')) {
                let cleanName = f.replace('.html', '');
                if (cleanName === 'index') cleanName = '';
                
                const urlPath = prefix ? `${prefix}/${cleanName}` : cleanName;
                const loc = `${DOMAIN}/${urlPath}`;
                
                // Priority logic
                let priority = '0.8';
                if (urlPath === '' || urlPath.endsWith('/')) priority = '1.0';
                else if (urlPath.includes('symbols/')) priority = '0.9';
                
                addUrl(loc.replace(/\/$/, ''), priority, urlPath === '' ? 'daily' : 'weekly');
            }
        });
    }

    // Process Root
    processDir(process.cwd());

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

    fs.writeFileSync('sitemap.xml', sitemapContent, 'utf8');
    console.log(`✅ Successfully generated sitemap.xml with ${urls.length} URLs.`);
}

generateSitemap();
