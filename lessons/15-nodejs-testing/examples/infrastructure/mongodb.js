'use strict';

const Client = require('mongodb').MongoClient;
const _ = require('lodash');

class MongoClient {

    constructor(options) {
        this._config = _.get(options, 'config');
        this._url = this._config.get('service.mongodb.url');
        this._db = null;
    }

    init(callback) {
        Client.connect(this._url, function(err, db) {
            if (err) {
                return callback(err);
            }

            this._db = db;

            callback(null, this._db);
        });
    }

    term(callback) {
        if (!this._db) {
            return setImmediate(callback, null);
        }

        this._db.close(callback);
    }
}

module.exports = MongoClient;
