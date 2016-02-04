'use strict';

var http = require('http');
var redis = require('redis');
var uuid = require('uuid');

var client = redis.createClient();

var server = http.createServer(function(req, res) {
    var id = uuid.v4();

    client.set(id, 'test:' + id, function(err, result) {
        res.end(JSON.stringify({ status: result }));
    });

});

server.listen(3000, function() {
    console.log('Server started', 3000);
});
