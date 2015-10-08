'use strict';

var db = require('../clients/redis');

var tokenSecret = 'SECRET:KEY!';

exports.createToken = function(username, password, callback) {
    [...]
    db.set(token, function(err) {
        [...]
    });
};

exports.checkToken = function(token, callback) {
    [...]
    db.get(token, function(err, user) {
        [...]
    });
};
