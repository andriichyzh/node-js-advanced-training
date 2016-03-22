'use strict';

const Infrastructure = require('./infrastructure');

const CacheRepo = require('./repositories/cache');
const WeatherApi = require('./repositories/weather-api');


const infrastructure = new Infrastructure();

let startService = function(err) {
    if (err) {
        infrastructure.logger.error({ error: err }, 'Error on service starting');
        throw err;
    }

    const cacheRepo = new CacheRepo(infrastructure);
    const weatherApi = new WeatherApi(infrastructure);


};

infrastructure.init(startService);