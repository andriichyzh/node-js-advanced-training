'use strict';

const http = require('http');

const HTTP_PORT = 3000;

let count = 0;

const server = http.createServer((req, res) => {

    // Some wrong logic
    if (count > 5) {
        count.push('abc');
    }

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Count: ${count++}`);
});

server.listen(HTTP_PORT, () => {
    console.log(`Server running at http://localhost:${HTTP_PORT}/`);
});