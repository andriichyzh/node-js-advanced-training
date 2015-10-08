'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var redisFactory = require('./clients/redis');
var authModelFactory = require('./models/auth');
var authControllerFactory = require('./controllers/auth');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var client = redisFactory({ host: '8.8.8.8' });
var authModel = authModelFactory(client, 'SECRET:KEY!');
var authController = authControllerFactory(authModel);

app.post('/login', authController.createToken);
app.get('/user', authController.checkToken);

app.listen(3000, function() {
    console.log('Express server started');
});
