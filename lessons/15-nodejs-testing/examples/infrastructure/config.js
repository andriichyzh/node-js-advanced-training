'use strict';

const _ = require('lodash');

class Config {

    constructor() {
        this._envs = _.reduce(process.env, function(map, val, key) {
            let name = _.replace(key, '_', '.');
                name = _.toLower(name);

            return map.set(name, val);
        }, new Map());
    }

    get(key) {
        if (!this._envs.has(key)) {
            throw new Error(`Configuration parameter [${key}] not found. Please, check!`);
        }

        return this._envs.get(key);
    }
}

module.exports = Config;