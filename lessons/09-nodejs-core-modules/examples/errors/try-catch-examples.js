'use strict';

var fs = require('fs');

process.on('uncaughtException', function(err) {
    console.log('Uncaught exception', err);
});


/**
 * Async
 */

try {

    fs.readFile('/temp', function(err) {
        if (err) {
            throw err;
        }
    });

} catch(err) {
    console.log('Try..catch error', err);
}


/**
 * Sync
 */

//try {
//
//    var file = fs.readFileSync('/temp');
//
//} catch(err) {
//    console.log('Try..catch error', err);
//}