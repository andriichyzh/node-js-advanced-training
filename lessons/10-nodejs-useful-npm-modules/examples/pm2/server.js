'use strict';

const http = require('http');

const PID = process.pid;
const HTTP_PORT = 3000;

let count = 0;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`PID: ${PID} - Count: ${count++}\n`);
});

server.listen(HTTP_PORT, () => {
    console.log(`Server running at http://localhost:${HTTP_PORT}/`);
});