'use strict';

var http = require('http');

function pingUsers(id, callback) {
    var options = {
        hostname: '127.0.0.1',
        port: 3000,
        path: '/users/' + id,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    var request = http.request(options);

    request.once('error', function(err) {
        return callback(err);
    });

    request.once('response', function(res) {
        return callback(null, res);
    });

    request.end();
}

setInterval(function() {
    var id = Math.random().toString();

    pingUsers(id, function(err, res) {
        if (err) {
            return console.log('Got error: ' + err);
        }

        console.log('Got response: ' + res.statusCode);
    });
}, 1000);
