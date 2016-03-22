'use strict';

var should = require('should');

should.Assertion.add(
    // the name of the custom assertion
    'ValidConfig',

    // the implementation of the custom assertion
    function() {
        // `this.params` defines what text is associated with the
        // pass/fail state of your custom assertion
        this.params = { operator: 'to be a valid config' };

        // `this.obj` refers to the object in the should.js chain upon
        // which the assertion will be applied. `foo` would be `this.obj`
        // in this example:
        //
        //     foo.should.be.a.String;
        //
        var config = this.obj;

        // the assertion itself, just as above
        should.exist(config);
        config.should.be.an.Object;
        (function() {
            JSON.stringify(config);
        }).should.not.throw();
        should.exist(config.name);
        config.name.should.be.a.String;
        should.exist(config.value);
        config.value.should.be.a.Number;
        should.exist(config.isSomething);
        config.isSomething.should.be.a.Boolean;
    },

    // is this a getter, meaning no function call?
    //
    //     foo.should.be.a.String         // getter
    //     foo.should.be.equal('string'); // not a getter
    //
    true
);
