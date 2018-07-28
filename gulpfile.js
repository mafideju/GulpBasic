const gulp = require('gulp');
const customizeBootstrap = require('gulp-customize-bootstrap');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const jsmin = require('gulp-jsmin');
const rename = require('gulp-rename');
const uglifycss = require('gulp-uglifycss');
const imagemin = require('gulp-imagemin');

gulp.task('default', ['compileBootstrap', 'lib', 'js', 'img']);

gulp.task('watch', function() {
  gulp.watch('./dev/styles/**/*', ['compileBootstrap']);
  gulp.watch('./dev/app/**/*', ['js']);
});

gulp.task('compileBootstrap', function() {
  return gulp
    .src('node_modules/bootstrap/scss/bootstrap.scss')
    .pipe(customizeBootstrap('./dev/styles/scss/*.scss'))
    .pipe(sass())
    .pipe(uglifycss())
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('lib', () => {
  return gulp
    .src([
      './node_modules/jquery/dist/jquery.min.js',
      './node_modules/angular/angular.min.js'
    ])
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('js', () => {
  return gulp
    .src(['./dev/app/app.js', './dev/app/controllers.js'])
    .pipe(concat('app.js'))
    .pipe(jsmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('img', () => {
  return gulp
    .src('./dev/img/*')
    .pipe(imagemin({ optimizationLevel: 10 }))
    .pipe(gulp.dest('./dist/img'));
});
