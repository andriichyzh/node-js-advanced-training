'use strict';

const Config = require('./config');
const Logger = require('./logger');

const MongoClient = require('./mongodb');

class Infrastructure {

    constructor(options) {
        this.config = new Config();
        this.logger = new Logger();
        this.mongodb = null;

        this._mongoClient = new MongoClient({
            config: this.config,
            logger: this.logger
        });
    }

    init(callback) {
        this._mongoClient.init((err, db) => {
            if (err) {
                return callback(err);
            }

            this.mongodb = db;
            callback(null);
        });
    }

    term(callback) {
        this._mongoClient.term(callback);
    }

}

module.exports = Infrastructure;

