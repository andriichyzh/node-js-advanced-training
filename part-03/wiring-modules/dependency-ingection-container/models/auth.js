'use strict';

module.exports = function(redis, tokenSecret) {
    var authModel = {};

    authModel.createToken = function(username, password, callback) {
        [...]
        redis.set(token, function(err) {
            [...]
        });
    };

    authModel.checkToken = function(token, callback) {
        [...]
        redis.get(token, function(err, user) {
            [...]
        });
    };

    return authModel;
};

