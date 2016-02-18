'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var notify = require('gulp-notify');
var growl = require('gulp-notify-growl');


gulp.task('default', function () {
    gulp.src('index.js')
        .pipe(jshint('.jshintrc')) // See http://jshint.com/docs/options/
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
        .pipe(notify({
            title: 'JSHint',
            message: 'JSHint Passed. Let it fly!'
        }));
});