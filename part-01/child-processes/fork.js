'use strict';

var fork = require('child_process').fork;

var child = fork(__dirname + '/_fibonacci.js');

child.on('error', function (err) {
    console.log('Failed to start child process.', err);
});

child.on('message', function (data) {
    console.log('Results:', data);
});

var timer = setInterval(function() {
    console.log(' >>> Master process heartbeat:', new Date().toISOString());
}, 1000);

timer.unref();
