#!/usr/bin/env node
/**
 * index.js
 * Minimal Node HTTP server for the project root.
 * Usage: PORT=3000 node index.js
 */
const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Hello from exp-bureau-noord — index.js is working!\n');
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Not Found\n');
});

server.listen(PORT, () => {
  console.log(`index.js: server listening on http://localhost:${PORT} (pid ${process.pid})`);
});

function shutdown(signal) {
  console.log(`index.js: received ${signal}, closing server...`);
  server.close(() => {
    console.log('index.js: server closed.');
    process.exit(0);
  });

  // Force exit after 5s
  setTimeout(() => {
    console.error('index.js: force exit.');
    process.exit(1);
  }, 5000).unref();
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

module.exports = server;
