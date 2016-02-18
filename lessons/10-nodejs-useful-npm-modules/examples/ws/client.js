'use strict';

const WebSocket = require('ws');

const ws = new WebSocket('ws://127.0.0.1:3005');

ws.on('message', function incoming(message) {
    console.log('Message from server:', message);
});

ws.on('open', function open() {
    setInterval(function() {
        const size = Math.random() * 1000;
        const data = new Buffer(size).fill(size);

        ws.send(data, { binary: true, mask: true });
    }, 500);
});
