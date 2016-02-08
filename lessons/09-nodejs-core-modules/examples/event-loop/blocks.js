'use strict';

var mode = process.argv[2];

var steps = 0;

console.time('Total time');

function run() {
    steps++;

    for (var i = 0, max = 1e7; i < max; i++) {
        Math.pow(Math.random(), Math.random());
    }

    if (steps === 10) {
        console.timeEnd('Total time');
        return;
    }

    switch(mode) {
        case 'blocked':
            run();
            break;

        case 'nexttick':
            process.nextTick(run);
            break;

        case 'setimmediate':
            setImmediate(run);
            break;

        case 'settimeout':
            setTimeout(run, 10);
            break;
    }
}

function checkIsBlocked() {
    var delay = 10;
    var start = process.hrtime();

    setTimeout(function() {
        var elapsed = process.hrtime(start);
        var time = (elapsed[0] * 1000) + (elapsed[1] / 1e6);

        console.log("I took %s ms! Expected to take %s ms!", time.toFixed(2), delay);
    }, delay);
}


checkIsBlocked();
run();