'use strict';

var fs = require('fs');

var data = fs.readFileSync(__dirname + '/../mocks/dest.txt');

console.log(data.length);
console.log(data);
console.log(data.toString());




//var stat = fs.statSync(__dirname + '/../mocks/dest.txt');
//
//console.log(stat);

