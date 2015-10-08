'use strict';

module.exports = function(authModel) {
    var authController = {};

    authController.createToken = function(req, res, next) {
        authModel.createToken(req.body.username, req.body.password, function(err, result) {
            [...]
        });
    };

    authController.checkToken = function(req, res, next) {
        authModel.checkToken(req.query.token, function(err, result) {
            [...]
        });
    };

    return authController;
};
