'use strict';

var profiler = require('./profiler');

function getRandomArray(len) {
    var p = profiler('Generating a ' + len + ' items long array');

    p.start();

    var arr = [];
    for(var i = 0; i < len; i++) {
        arr.push(Math.random());
    }

    p.end();
}

getRandomArray(1e6);
console.log('Done');
