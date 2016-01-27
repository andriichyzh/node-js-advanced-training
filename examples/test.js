'use strict';

// ES6
var delay = callback => {
    setTimeout(callback, 200);
};

// ES5
var delay = function(callback) {
    setTimeout(callback, 200);
};


console.log(delay(function(err) {

    console.log(err);

}));