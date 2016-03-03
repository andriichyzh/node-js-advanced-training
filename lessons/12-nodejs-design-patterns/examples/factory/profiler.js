'use strict';

class Profiler {
    constructor(label) {
        this.label = label;
        this.lastTime = null;
    }

    start() {
        this.lastTime = process.hrtime();
    }

    end() {
        var diff = process.hrtime(this.lastTime);
        var millis = (diff[0] * 1e9 + diff[1]) / 1e6;
        console.log('Timer "%s" took %d ms', this.label, millis);
    }
}

module.exports = function(label) {
    if (process.env.NODE_ENV === 'development') {
        return new Profiler(label);

    } else if (process.env.NODE_ENV === 'production') {
        return {
            start: function() {},
            end: function() {}
        }

    } else {
        throw new Error('Must set NODE_ENV');
    }
};
