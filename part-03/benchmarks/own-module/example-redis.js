'use strict';

var redis = require('redis');
var Benchmark = require('./benchmark');

var benchmark = new Benchmark({ times: 1000000, limit: 250 });


var client = redis.createClient();

client.on('error', function (err) {
    console.log('Error', err);
});

client.on('ready', function() {

    benchmark.loader(function(id, done) {
        client.set(id, 'test:' + id, done);
        //client.get(id, done);
    });

    benchmark.run(function(err) {
        console.log('Test finished');
        client.end();
    });

});
