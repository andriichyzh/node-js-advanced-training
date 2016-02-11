'use strict';

var fs = require('fs');

var readable = fs.createReadStream(__dirname + '/../mocks/pic.png');

readable.on('error', function(err) {
    console.log('Error', err);
});

//readable.on('readable', function() {
//    console.log('Readable', readable.read());
//});

readable.on('data', function(data) {
    console.log('Data', data.length);
});

readable.on('end', function() {
    console.log('End');
});

readable.on('close', function() {
    console.log('Close');
});
