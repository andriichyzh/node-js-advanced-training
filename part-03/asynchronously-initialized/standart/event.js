
'use strict';

var db = require('db');

module.exports = function findById(id, callback) {

    var runFind = function() {
        db.find({ id: id }, callback);
    };

    if (db.connected) {
        return runFind();
    }

    db.once('connected', runFind);
};

