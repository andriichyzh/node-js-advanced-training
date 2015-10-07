'use strict';

var async = require('neo-async');
var _ = require('lodash');

var DEFAULT_TIMES = 100;
var DEFAULT_LIMIT = 5;
var DEFAULT_STEP = 0.05;

function Benchmark(options) {
    this._times = _.get(options, 'times', DEFAULT_TIMES);
    this._limit = _.get(options, 'limit', DEFAULT_LIMIT);
    this._step = this._times * DEFAULT_STEP;

    this._capacity = 0;
    this._progress = 0;
    this._count = 0;
    this._time = 0;
}

Benchmark.prototype.loader = function(loader) {
    var self = this;

    this._loader = function(index, callback) {
        var start = new Date();

        loader(index, function(err) {
            self._time += new Date() - start;
            self._progress++;
            self._count++;

            if (self._count % self._step === 0) {
                self._showStatistics();
            }

            callback(err);
        });
    };
};

Benchmark.prototype._showStatistics = function() {

    var message = '[%s] - %d operations - Capacity: %d RPS - Time (avg): %d ms';
    var time = (this._time / this._count).toFixed(3);

    console.log(message, new Date().toISOString(), this._count, this._capacity, time);
};

Benchmark.prototype._countCapacity = function() {

    var countRPS = function() {
        this._capacity = this._progress;
        this._progress = 0;
    };

    return setInterval(countRPS.bind(this), 1000).unref();
};

Benchmark.prototype.run = function(done) {
    var statistics = this._countCapacity();
    var start = new Date();

    async.timesLimit(this._times, this._limit, this._loader, function(err) {
        clearInterval(statistics);
        console.log('\n>>> Total time: %d ms', new Date() - start);
        done(err);
    });
};

module.exports = Benchmark;
