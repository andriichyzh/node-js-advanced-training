'use strict';

var http = require('http');

var server = http.createServer();

server.on('request', function(req) {
    console.log('new request', req.method, req.url);
});

server.listen(3000, function() {
    console.log('Server started');
});