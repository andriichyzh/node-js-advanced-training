'use strict';

class Counter {
    constructor() {
        this._count = 0;
    }

    inc() {
        console.log('Count:', ++this._count);
    }
}

module.exports = new Counter();
