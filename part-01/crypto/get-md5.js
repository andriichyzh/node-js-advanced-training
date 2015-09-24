'use strict';

'use strict';

var fs = require('fs');
var crypto = require('crypto');

var readable = fs.createReadStream(__dirname + '/../mocks/pic.png');

var md5Sum = crypto.createHash('md5');

readable.on('error', function(err) {
    console.log('Error', err);
});

readable.on('data', function(data) {
    md5Sum.update(data);
});

readable.on('end', function() {
    var md5 = md5Sum.digest('hex');
    console.log('MD5:', md5);
});

