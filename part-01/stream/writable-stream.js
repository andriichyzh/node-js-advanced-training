'use strict';

var fs = require('fs');
var os = require('os');

var writable = fs.createWriteStream(__dirname + '/../mocks/dest.txt');

writable.on('error', function(err) {
    console.log('Error', err);
});

writable.on('drain', function() {
    console.log('Drain');
});

writable.on('finish', function() {
    console.error('All writes are now complete');
});

for (var i = 0; i < 10; i++) {
    var data = JSON.stringify(process.memoryUsage()) + os.EOL;
    writable.write(data);
}

writable.end();
console.log('Call end');
