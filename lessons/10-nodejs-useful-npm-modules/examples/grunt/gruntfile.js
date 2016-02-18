'use strict';

var grunt = require('grunt');

grunt.initConfig({
    jshint: {
        options: {
            jshintrc: true,
            reporter: require('jshint-stylish')
        },
        target: ['index.js']
    }
});

grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.registerTask('default', ['jshint']);