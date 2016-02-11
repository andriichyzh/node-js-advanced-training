'use strict';


const EventEmitter = require('events');
const util = require('util');


function MyEmitter() {
    EventEmitter.call(this);
}

util.inherits(MyEmitter, EventEmitter);

const myEmitter = new MyEmitter();

myEmitter.on('event', function(a, b) {
    console.log(a, b, this instanceof MyEmitter);
});

myEmitter.emit('event', 'a', 'b');