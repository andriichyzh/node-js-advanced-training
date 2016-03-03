'use strict';

function BaseAccess() {
    this.url = 'api.abstract.com';
}

BaseAccess.prototype.send = function(message) {
    console.log('Sent message "%s" to server %s', message, this.url);
};


function AmazonAccess() {
    this.url = 'api.aws.com';
}

AmazonAccess.prototype = new BaseAccess();


var amazonAccess = new AmazonAccess();

amazonAccess.send('Hello, AWS!'); // Sent message "Hello, AWS!" to server api.aws.com
