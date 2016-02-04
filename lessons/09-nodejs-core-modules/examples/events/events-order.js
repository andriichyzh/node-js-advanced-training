'use strict';

var http = require('http');

var server = http.createServer();

server.on('error', function(err) {
    console.log('error', err);
});

server.on('request', function() {
    console.log('new request 1');
});

server.on('request', function() {
    console.log('new request 2');
});

server.on('request', function() {
    console.log('new request 3');
});

server.listen(3000, function() {
    console.log('Server started');
});