'use strict';


var b = new Buffer(50);
b.fill('h');

console.log(b);
console.log(b.toString());
console.log(b.toJSON());