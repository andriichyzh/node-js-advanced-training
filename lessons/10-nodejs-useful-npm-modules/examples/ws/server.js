'use strict';

const WebSocketServer = require('ws').Server;

const wss = new WebSocketServer({ port: 3005 });

wss.on('connection', function connection(ws) {

    ws.on('message', function incoming(message) {
        console.log('received:', message);
        ws.send(`Receive data: ${message.length} bytes`);
    });

});

