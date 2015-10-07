'use strict';

var Benchmark = require('./benchmark');

var benchmark = new Benchmark({ times: 100000, limit: 500 });

benchmark.loader(function(id, done) {
    setTimeout(done, 50);
});

benchmark.run(function(err) {
    console.log('Test finished');
});
