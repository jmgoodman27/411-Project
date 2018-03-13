'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();

gulp.task('nodemon', function () {
  nodemon({
    script: 'app.js',
    ext: 'js njk',
    env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('browsersync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy : 'http://localhost:3000',
    files : ['public/**/*.*'],
    browser : 'google chrome',
    port : 7000,
    reloadDelay: 1000,
    open: false
  });
});

gulp.task('default', ['nodemon', 'browsersync']);
