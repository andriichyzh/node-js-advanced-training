'use strict';

let int;

process.on('SIGTERM',function () {
    console.log('received SIGTERM');

    clearInterval(int);

    setTimeout(function () {
        console.log('Exiting after some time.');
        process.exit(0);
    }, 1000);
});

int = setInterval(function (){
    console.log('Heartbeat');
}, 100);
