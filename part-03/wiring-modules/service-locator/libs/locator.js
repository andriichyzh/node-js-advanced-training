'use strict';

module.exports = function() {
    var dependencies = {};
    var factories = {};
    var serviceLocator = {};

    serviceLocator.factory = function(name, factory) {
        factories[name] = factory;
    };

    serviceLocator.register = function(name, instance) {
        dependencies[name] = instance;
    };

    serviceLocator.get = function(name) {
        if (!dependencies[name]) {

            if (factories[name]) {
                var factory = factories[name];
                dependencies[name] = factory(serviceLocator);
            }

            if(!dependencies[name]) {
                throw new Error('Cannot find module: ' + name);
            }
        }

        return dependencies[name];
    };

    return serviceLocator;
};