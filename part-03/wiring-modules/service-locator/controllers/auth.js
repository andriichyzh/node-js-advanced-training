
'use strict';

module.exports = function(serviceLocator) {
    var authController = {};

    var authModel = serviceLocator.get('authModel');

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
