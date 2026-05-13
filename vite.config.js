import { defineConfig } from 'vite';
import { join } from 'path';
import { readFileSync, existsSync } from 'fs';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url.split('?')[0];
        // If it's a "clean URL" (no extension and not root)
        if (url !== '/' && !url.includes('.')) {
          const htmlFile = join(process.cwd(), url + '.html');
          if (existsSync(htmlFile)) {
            req.url = url + '.html';
          }
        }
        next();
      });
    }
  }
});
