'use strict';

function createDelay(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(delay + 100);
        }, delay);
    });
}

function* taskExample() {

    let firstTime = yield createDelay(1000);

    console.log(Date.now(), firstTime);

    let secondTime = yield createDelay(firstTime);

    console.log(Date.now(), secondTime);

    return secondTime * 10;
}

function runner(generator, yieldValue) {
    let next = generator.next(yieldValue);

    if (!next.done) {
        next.value.then(
            result => runner(generator, result),
            err => generator.throw(err)
        );
    } else {
        console.log(next.value);
    }
}

runner(taskExample());