'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var exec = require('child_process').exec;

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

gulp.task('sass', function () {
  return gulp.src('./assets/sass/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function () {
  gulp.watch('./assets/sass/*.scss', ['sass']);
  gulp.watch('./views/*.njk').on('change', browserSync.reload);
});

gulp.task('default', ['nodemon', 'browsersync', 'sass', 'watch']);