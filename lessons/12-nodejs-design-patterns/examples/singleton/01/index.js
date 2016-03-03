'use strict';

const counterA = require('./counter');
const counterB = require('./counter');

counterA();
counterB();
counterA();
counterB();
counterA();

require('./folder');
