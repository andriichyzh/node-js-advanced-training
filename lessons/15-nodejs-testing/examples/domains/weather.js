'use strict';

class Weather {

    constructor(infrastructure, repositories) {
        this._logger = _.get(infrastructure, 'logger');

        this._weatherApiRepo = _.get(repositories, 'weatherApi');
        this._cacheRepo = _.get(repositories, 'cache');
    }

    getInfo(city, callback) {
        this._cacheRepo.getByCondition({ city: city }, (err, data) => {
            if (err) {
                return callback(err);
            }

            if (data) {
                return callback(null, data);
            }

            this._weatherApiRepo.getInfo(city, callback);
        });
    }

}

module.exports = Weather;