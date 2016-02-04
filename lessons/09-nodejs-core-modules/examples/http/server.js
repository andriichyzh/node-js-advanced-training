'use strict';

var http = require('http');

var usage = require('usage');

var pid = process.pid;

var server = http.createServer(function(req, res) {

//    console.log('Got new request', req.method, req.url);
//    console.log('Got headers', JSON.stringify(req.headers, null, 4));

    res.end(JSON.stringify({ status: 'OK' }));
});

server.listen(3000, function() {
    console.log('Server started');
});

setInterval(function() {
    usage.lookup(pid, function(err, result) {
        console.log(' - CPU:', result);
    });
}, 1000);