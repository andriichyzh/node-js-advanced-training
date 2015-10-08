'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var authController = require('./controllers/auth');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/login', authController.createToken);
app.get('/user', authController.checkToken);

app.listen(3000, function() {
    console.log('Express server started');
});
