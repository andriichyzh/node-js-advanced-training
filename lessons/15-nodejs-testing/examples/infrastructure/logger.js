
'use strict';

const _ = require('lodash');

const LEVEL_ERROR = 1;
const LEVEL_INFO = 2;

class Logger {

    constructor(logLevel) {}

    error(params, message) {
        this._log(LEVEL_ERROR, params, message);
    }

    info(params, message) {
        this._log(LEVEL_INFO, params, message);
    }

    debug(params, message) {
        this._log(LEVEL_INFO, params, message);
    }

    _log(level, params, message) {
        let time = new Date().toISOString();
        let log = JSON.stringify(params);

        if (level === LEVEL_ERROR) {
            return console.error(time, log, message);
        }

        console.log(time, log, message);
    }
}

module.exports = Logger;
