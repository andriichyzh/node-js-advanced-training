'use strict';

var fs = require('fs');

// I/O operation
fs.stat(__filename, function() {
    console.log('[1] I/O operation');
});

// setTimeout 0
setTimeout(function() {
    console.log('[2] setTimeout 0');
}, 0);

// setTimeout 25
setTimeout(function() {
    console.log('[3] setTimeout 25');
}, 25);

// setImmediate
setImmediate(function() {
    console.log('[4] setImmediate');
});

// process.nextTick
process.nextTick(function() {
    console.log('[5] process.nextTick');
});

console.log('[6] sync operation');
