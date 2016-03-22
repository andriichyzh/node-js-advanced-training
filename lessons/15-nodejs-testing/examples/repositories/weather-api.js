'use strict';

// See http://openweathermap.org/current

const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'b1b15e88fa797225412429c1c50c122a';

class WeatherApi {

    constructor(infrastructure) {
        this._logger = _.get(infrastructure, 'logger');
        this._request = _.get(infrastructure, 'request').createClient(BASE_URL);
    }

    getByCity(city, callback) {
        let query = '/?q=' + city + '&appid=' + API_KEY;
        this._logger.debug({ query: query }, 'New request to Weather API');
        this._request.get(query, callback);
    }

}

module.exports = WeatherApi;