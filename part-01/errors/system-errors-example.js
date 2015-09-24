'use strict';

var http = require('http');

var server1 = http.createServer();
var server2 = http.createServer();

//server2.on('error', function(err) {
//    console.log(err);
//});

//process.on('uncaughtException', function(err) {
//    console.log(err);
//});

server1.listen(3000);
server2.listen(3000);
