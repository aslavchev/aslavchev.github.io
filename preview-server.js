#!/usr/bin/env node

/**
 * Preview server that matches GitHub Pages subdirectory behavior
 * Serves out/ folder at /aslavchev-portfolio-website/ path
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
const BASE_PATH = '/aslavchev-portfolio-website';
const OUT_DIR = path.join(__dirname, 'out');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  let filePath = req.url;

  // Remove base path from URL
  if (filePath.startsWith(BASE_PATH)) {
    filePath = filePath.substring(BASE_PATH.length);
  } else {
    // Redirect root to base path
    if (filePath === '/' || filePath === '') {
      res.writeHead(302, { Location: BASE_PATH + '/' });
      res.end();
      return;
    }
  }

  // Default to index.html
  if (filePath === '/' || filePath === '') {
    filePath = '/index.html';
  }

  // Remove query strings
  filePath = filePath.split('?')[0];

  // Build full path
  const fullPath = path.join(OUT_DIR, filePath);

  // Security check - prevent directory traversal
  if (!fullPath.startsWith(OUT_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  // Serve file
  fs.readFile(fullPath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Try index.html for SPA routing
        fs.readFile(path.join(OUT_DIR, 'index.html'), (err2, data2) => {
          if (err2) {
            res.writeHead(404);
            res.end('404 Not Found');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data2);
          }
        });
      } else {
        res.writeHead(500);
        res.end('Internal Server Error');
      }
      return;
    }

    const ext = path.extname(fullPath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`\n🎨 Preview server running!`);
  console.log(`\n   Local:   http://localhost:${PORT}${BASE_PATH}/`);
  console.log(`\n   This matches GitHub Pages deployment exactly.\n`);
});
