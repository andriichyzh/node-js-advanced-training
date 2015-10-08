
'use strict';

// Module app.js
var db = require('db');

var findByIdFactory = require('./db/findById');

db.on('connected', function() {
    var findById = findByIdFactory(db);
});


// Module db/findById.js
module.exports = function(db) {
    return function(id, callback) {
        db.findById({ id: id }, callback);
    }
};

