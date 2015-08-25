'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

gulp.task('sass', function() {
  gulp.src(['./app/sass/**/*.scss', './app/sass/**/*.css'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('sass:watch', function() {
  gulp.watch(['./app/sass/**/*.scss', './app/sass/**/*.css'], ['sass']);
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

gulp.task('copy', function() {
  var opts = {
    conditionals: true,
    spare: true
  };
  return gulp.src('./app/**/*.html')
    .pipe(gulp.dest('./public/'));
});

gulp.task('copyLib', function() {
  var opts = {
    conditionals: true,
    spare: true
  };
  return gulp.src('./app/lib/*')
    .pipe(gulp.dest('./public/lib'));
});

gulp.task('copy:watch', function() {
  gulp.watch('./app/**/*.html', ['copy']);
});

gulp.task('copyLib:watch', function() {
  gulp.watch('./app/lib/*', ['copyLib']);
});

gulp.task('build', ['copy', 'copyLib', 'browserify', 'sass', 'copy:watch',
    'browserify:watch', 'sass:watch', 'copyLib:watch']);

gulp.task('default', ['build']);
