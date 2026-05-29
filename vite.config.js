import { defineConfig } from 'vite';
import { join } from 'path';
import { readFileSync, existsSync } from 'fs';

console.log('--- LOADING VITE.CONFIG.JS ---');

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true
  },
  plugins: [
    {
      name: 'clean-urls-rewrite',
      configureServer(server) {
        console.log('--- CONFIGURE SERVER EXECUTED ---');
        const cleanUrlMiddleware = (req, res, next) => {
          const url = req.url.split('?')[0];
          const accept = req.headers.accept || '';
          
          console.log(`[Vite] Request: ${req.url} | Accept: ${accept}`);

          // Rewrite clean URLs only for document/HTML requests
          if (accept.includes('text/html') && url !== '/' && !url.includes('.')) {
            // Strip language prefix to route to root template (e.g. /es/cute-fonts -> /cute-fonts)
            const langMatch = url.match(/^\/(hi|es|ru|fr|de|it|pt|bn|ja|ko|ms|pl|id|ar|bg|tr|sv)(?=\/|$)/);
            let cleanUrl = url;
            if (langMatch) {
              cleanUrl = url.substring(langMatch[0].length);
            }
            
            const targetPath = (cleanUrl === '' || cleanUrl === '/') ? '/index.html' : cleanUrl + '.html';
            const htmlFile = join(process.cwd(), targetPath);
            const exists = existsSync(htmlFile);

            console.log(`[Vite] Target: ${targetPath} | Exists: ${exists}`);

            if (exists) {
              console.log(`[Vite] Serving HTML directly: ${targetPath}`);
              res.writeHead(200, { 'Content-Type': 'text/html' });
              res.end(readFileSync(htmlFile, 'utf8'));
              return;
            }
          }
          next();
        };

        // Prepend to Vite's middleware stack so it runs before standard module resolution
        server.middlewares.stack.unshift({
          route: '',
          handle: cleanUrlMiddleware
        });
      }
    }
  ]
});
