'use strict';

var spawn = require('child_process').spawn;
var child = spawn('ps', ['aux']);

child.on('error', function (err) {
    console.log('Failed to start child process.', err);
});

child.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
});

child.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
});

child.on('close', function (code) {
    console.log('child process exited with code ' + code);
});
