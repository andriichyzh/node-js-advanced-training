'use strict';

var util = require('util');
var EventEmitter = require('events');

function CustomEventEmitter() {
    EventEmitter.call(this);
    this.init();
}

util.inherits(CustomEventEmitter, EventEmitter);

CustomEventEmitter.prototype.init = function() {
    setTimeout(function() {
        this.emit('init');
    }.bind(this), 500);

    setInterval(function() {
        this.emit('time', new Date().toISOString());
    }.bind(this), 1000);
};




var custom = new CustomEventEmitter();

custom.on('time', function(time) {
    console.log('Current time', time);
});

custom.once('init', function() {
    console.log('Custom started');
});
