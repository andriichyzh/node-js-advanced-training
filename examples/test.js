'use strict';

var set = new Set();

set.add('001');
set.add('002');
set.add('003');
set.add('003');
set.add('002');
set.add('001');

console.log(set.size); // 3

console.log(set.has('001')); // true

set.delete('001');

console.log(set.has('001')); // false

console.log(set.size); // 2

set.clear();

console.log(set.size); // 0
