'use strict';

var http = require('http');

//var server = http.createServer();

//server.listen(3000);

function Generator() {

    this.data = new Array(10e6).join('test');

    //this.calculateSize = function() {
    //    console.log(this.data.length);
    //};
    //
    //server.on('request', this.calculateSize.bind(this));
}

setInterval(function() {
    var data = new Generator();
    var memory = process.memoryUsage().heapUsed;
    console.log(' - Memory used', (memory / 1024 / 1024).toFixed(3), 'MB');

    //console.log('Event listeners:', server.listeners('request').length);
}, 250);
