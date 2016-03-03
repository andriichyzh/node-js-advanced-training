'use strict';

var fs = require('fs');

const proxy = require('./proxy');

var writable = fs.createWriteStream('./test.txt');

var writableProxy = proxy(writable);

writableProxy.write('First chunk');
writableProxy.write('Second chunk');
writable.write('This is not logged');
writableProxy.end();
