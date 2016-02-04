'use strict';

function fibonacci(n) {
    var num;

    if (n >= 2) {
        num = fibonacci(n - 1) + fibonacci(n - 2);
    } else {
        num = n
    }

    return num;
}

var index = 0;

function calculate() {
    var start = process.hrtime();

    var data = fibonacci(index++);

    var elapsed = process.hrtime(start);

    process.send({
        index: index,
        result: data,
        time: (elapsed[0] * 1000) + (elapsed[1] / 1e6)
    });

    setImmediate(calculate);
}

calculate();
