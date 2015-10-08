'use strict';

var authModel = require('../models/auth');

exports.createToken = function(req, res, next) {
    authModel.createToken(req.body.username, req.body.password, function(err, result) {
        [...]
    });
};

exports.checkToken = function(req, res, next) {
    authModel.checkToken(req.query.token, function(err, result) {
        [...]
    });
};
