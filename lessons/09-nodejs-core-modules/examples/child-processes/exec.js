'use strict';

var exec = require('child_process').exec;

var child = exec('cat /etc/hosts');

child.on('error', function (err) {
    console.log('Failed to start child process.', err);
});

child.stdout.on('data', function (data) {
    console.log('stdout: ', data);
});

child.stderr.on('data', function (data) {
    console.log('stderr: ', data);
});

child.on('close', function (code) {
    console.log('child process exited with code ' + code);
});



//exec('cat /etc/hosts', function(err, stdout, stderr) {
//    if (err) {
//        return console.log('Failed to start child process.', err);
//    }
//
//    console.log('stdout: ', stdout);
//    console.log('stderr: ', stderr);
//});
