'use strict';

var fs = require('fs');

// I/O operation
fs.stat(__filename, function() {
    console.log(' - I/O operation');
});

// setTimeout 0
setTimeout(function() {
    console.log(' - setTimeout 0');
}, 0);

// setTimeout 25
setTimeout(function() {
    console.log(' - setTimeout 25');
}, 25);

// setImmediate
setImmediate(function() {
    console.log(' - setImmediate');
});

// process.nextTick
process.nextTick(function() {
    console.log(' - process.nextTick');
});

console.log(' - sync operation');
