'use strict';

module.exports = function(serviceLocator) {
    var authModel = {};

    var db = serviceLocator.get('redis');
    var tokenSecret = serviceLocator.get('tokenSecret');

    authModel.createToken = function(username, password, callback) {
        [...]
        db.set(token, function(err) {
            [...]
        });
    };

    authModel.checkToken = function(token, callback) {
        [...]
        db.get(token, function(err, user) {
            [...]
        });
    };

    return authModel;
};

