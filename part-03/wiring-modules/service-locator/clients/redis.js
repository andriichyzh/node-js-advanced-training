'use strict';

var redis = require('redis');

module.exports = function(serviceLocator) {
    var redisHost = serviceLocator.get('redisHost');

    return redis.createClient({ host: redisHost });
};
