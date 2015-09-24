'use strict';

var execFile = require('child_process').execFile;

var child = execFile(__dirname + '/_users.sh');

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



//execFile(__dirname + '/_users.sh', function(err, stdout, stderr) {
//    if (err) {
//        return console.log('Failed to start child process.', err);
//    }
//
//    console.log('stdout: ', stdout);
//    console.log('stderr: ', stderr);
//});
