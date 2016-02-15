'use strict';

'use strict';

const fs = require('fs');
const crypto = require('crypto');

const readable = fs.createReadStream(__dirname + '/../mocks/pic.png');

const md5Sum = crypto.createHash('md5');

readable.on('error', function(err) {
    console.log('Error', err);
});

readable.on('data', function(data) {
    md5Sum.update(data);
});

readable.on('end', function() {
    let md5 = md5Sum.digest('hex');
    console.log('MD5:', md5);
});

