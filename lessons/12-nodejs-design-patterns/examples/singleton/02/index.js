'use strict';

const counterA = require('./counter');
const counterB = require('./counter');

counterA.inc();
counterB.inc();
counterA.inc();
counterB.inc();
counterA.inc();

require('./folder');
