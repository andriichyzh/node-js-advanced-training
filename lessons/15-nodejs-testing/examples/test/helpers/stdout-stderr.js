'use strict';

function hookWriteStream(stream, callback) {
    var oldWrite = stream.write;

    stream.write = (function(write) {
        return function(string, encoding, fd) {
            write.apply(stream, arguments);
            callback(string, encoding, fd);
        };
    })(stream.write);

    return function() {
        stream.write = oldWrite;
    };
}

module.exports = hookWriteStream;
