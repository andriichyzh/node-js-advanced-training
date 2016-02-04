'use strict';

const Console = require('console').Console;
const fs = require('fs');

const output = fs.createWriteStream(__dirname + '/custom-logger-stdout.log');
const errorOutput = fs.createWriteStream(__dirname + '/custom-logger-stderr.log');

const logger = new Console(output, errorOutput);

logger.info('New request', { params: { id: '12345' } });
logger.error('Failed', { params: { id: '12345' } });

