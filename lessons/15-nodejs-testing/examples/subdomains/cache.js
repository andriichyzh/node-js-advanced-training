'use strict';

const _ = require('lodash');

const COLLECTION_NAME = 'cache';

class Cache {

    constructor(infrastructure) {
        this._logger = _.get(infrastructure, 'logger');
        this._collection = _.get(infrastructure, 'mongodb').collection(COLLECTION_NAME);
    }

    addOne(doc, callback) {
        this._logger.debug({ doc: doc }, 'Add one item to cache');
        this._collection.insertOne(doc, function(err, res) {
            if (err) {
                return callback(err);
            }

            callback(null, res.ops[0]);
        });
    }

    getById(id, callback) {
        this._logger.debug({ id: id }, 'Get one item from cache by id');
        this._collection.findOne({ _id: id }, callback);
    }

    getByCondition(cond, callback) {
        this._logger.debug(cond, 'Get one item from cache by conditions');
        this._collection.findOne(cond, callback);
    }

}

module.exports = Cache;