'use strict';

var fs = require('fs');

fs.readFile(__dirname + '/../mocks/dest.txt', function(err, data) {

    console.log(err);
    console.log(data.length);
    console.log(data);
    console.log(data.toString());

});



//fs.stat(__dirname + '/../mocks/dest.txt', function(err, data) {
//
//    console.log(err);
//    console.log(data);
//
//});
