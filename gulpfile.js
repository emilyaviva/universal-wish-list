'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var mocha = require('gulp-mocha');
var exit = require('gulp-exit');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('sass', function() {
  gulp.src('./app/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('sass:watch', function() {
  gulp.watch('./app/sass/**/*.scss', ['sass']);
});

gulp.task('browserify', function() {
  var b = browserify();
  b.transform(reactify); // use the reactify transform
  b.add('./app/js/app.jsx');
  return b.bundle()
    .pipe(source('./bundle.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('browserify:watch', function() {
  gulp.watch('./app/js/**/*.jsx', ['browserify']);
});

gulp.task('copy:images', function() {
  return gulp.src('./app/img/**/*')
    .pipe(gulp.dest('./public/img/'));
});

gulp.task('copy', function() {
  var opts = {
    conditionals: true,
    spare: true
  };
  return gulp.src('./app/**/*.html')
    .pipe(gulp.dest('./public/'));
});

gulp.task('copy:watch', function() {
  gulp.watch('./app/**/*.html', ["copy"]);
});

gulp.task('test', function() {
  return gulp.src('./test/mocha-tests/*.js')
    .pipe(mocha())
    .pipe(exit());
});

gulp.task('lint', function() {
  return gulp
    .src(['app/**/*.js', 'app/**/*.jsx', 'models/**/*.js', 'routes/**/*.js', 'middlewares/**/*.js', 'test/**/*.js', './*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('build', ['copy', 'copy:images', 'browserify', 'sass', 'copy:watch', 'browserify:watch', 'sass:watch']);

gulp.task('default', ['build']);
