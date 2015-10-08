'use strict';

var redis = require('redis');

module.exports = function(redisHost) {
    return redis.createClient({ host: redisHost });
};
