'use strict';

var redis = require('redis');

module.exports = function(options) {
    return redis.createClient(options);
};
