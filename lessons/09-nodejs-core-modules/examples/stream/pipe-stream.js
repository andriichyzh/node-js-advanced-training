'use strict';

var fs = require('fs');

var readable = fs.createReadStream(__dirname + '/../mocks/pic.png');
var writable = fs.createWriteStream(__dirname + '/../mocks/new.png');

readable.on('error', function(err) {
    console.log('Error readable', err);
});

writable.on('error', function(err) {
    console.log('Error writable', err);
});

writable.on('finish', function() {
    console.error('All writes are now complete');
});

readable.pipe(writable);
