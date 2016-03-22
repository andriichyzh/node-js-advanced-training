'use strict';

const Logger = require('../../../infrastructure/logger');

let hookWriteStream = require('../../helpers/stdout-stderr');

describe('Logger', function() {

    before(function() {
        this.logger = new Logger();
    });

    describe('interface', function() {

        it('should be instance of Config class', function() {
            this.logger.should.be.an.instanceof(Logger);
        });

        it('should have method #error()', function() {
            this.logger.error.should.be.type('function');
        });

        it('should have method #info()', function() {
            this.logger.info.should.be.type('function');
        });

        it('should have method #debug()', function() {
            this.logger.debug.should.be.type('function');
        });

    });

    describe('#error()', function() {

        afterEach(function() {
            this.unhookStderr();
        });

        it('should write message to stderr', function(done) {
            this.unhookStderr = hookWriteStream(process.stderr, function(line) {
                line.should.be.type('string');
                line.should.match(/Operation failed/);

                done();
            });

            this.logger.error({ status: 'failed' }, 'Operation failed');
        });

    });

    describe('#info()', function() {

        afterEach(function() {
            this.unhookStdout();
        });

        it('should write message to stdout', function(done) {
            this.unhookStdout = hookWriteStream(process.stdout, function(line) {
                line.should.be.type('string');
                line.should.match(/DB connected/);

                done();
            });

            this.logger.info({ status: 'ok' }, 'DB connected');
        });

    });
});

