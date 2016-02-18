'use strict';

const INTERVAL = 1000;

setInterval(() => {
    console.log(`Current timestamp: ${Date.now()} - Interval: ${INTERVAL}`);
}, INTERVAL);

