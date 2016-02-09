'use strict';

var util = require('util');

/**
 * Custom error
 * @param message
 * @param status
 * @constructor
 */
function CustomError(message, status) {
    this.message = message;
    this.status = status;
    this.level = 'info';

    //Error.stackTraceLimit = 1;
    //Error.captureStackTrace(this);
    //Error.captureStackTrace(this, CustomError);
}

util.inherits(CustomError, Error);

//CustomError.prototype.name = 'CustomError';


/**
 * Get some path
 * @param callback
 */
function getPath(callback) {
    setTimeout(function() {

        callback(new CustomError('Not found', 404));

    }, 200);
}

getPath(function(err) {
    console.log(err);
    console.log(err.stack);
});
