'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var container = require('./libs/container')();

container.factory('redis', require('./clients/redis'));
container.factory('authModel', require('./models/auth'));
container.factory('authController', require('./controllers/auth'));

container.register('redisHost', '8.8.8.8');
container.register('tokenSecret', 'SECRET:KEY!');

var authController = container.get('authController');


app.post('/login', authController.createToken);
app.get('/user', authController.checkToken);

app.listen(3000, function() {
    console.log('Express server started');
});
