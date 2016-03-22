'use strict';

const Config = require('../../../infrastructure/config');

describe('Config', function() {

    before(function() {
        this.config = new Config();
    });

    describe('interface', function() {

        it('should be instance of Config class', function() {
            this.config.should.be.an.instanceof(Config);
        });

        it('should have method #get()', function() {
            this.config.get.should.be.type('function');
        });

    });

    describe('#get()', function() {

        context('when parameter not present', function() {

            it('should throw an error', function() {
                (() => { this.config.get('123abc'); }).should.throw(Error);
            });

        });

        context('when parameter present', function() {

            before(function() {
                process.env.TEST_TEST = true;
            });

            before(function() {
                this.config = new Config();
            });

            it('should not throw an error', function() {
                this.config.get('test.test').should.not.throw();
            });

            it('should correct value', function() {
                this.config.get('test.test').should.be.equal('true');
            });

        });
    });
});

