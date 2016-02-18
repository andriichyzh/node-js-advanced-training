'use strict';

var ProgressBar = require('progress');

var bar = new ProgressBar('DEMO :bar :percent :etas', { total: 50 });

var timer = setInterval(function () {

    bar.tick();

    if (bar.complete) {
        console.log('\ncomplete\n');
        clearInterval(timer);
    }
}, 100);

