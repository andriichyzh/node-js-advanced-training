'use strict';

module.exports = function(db, tokenSecret) {
    var authModel = {};

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

