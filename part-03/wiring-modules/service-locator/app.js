'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var locator = require('./libs/locator')();

locator.factory('redis', require('./clients/redis'));
locator.factory('authModel', require('./models/auth'));
locator.factory('authController', require('./controllers/auth'));

locator.register('redisHost', '8.8.8.8');
locator.register('tokenSecret', 'SECRET:KEY!');

var authController = locator.get('authController');


app.post('/login', authController.createToken);
app.get('/user', authController.checkToken);

app.listen(3000, function() {
    console.log('Express server started');
});
