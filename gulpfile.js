const gulp = require('gulp');
var customizeBootstrap = require('gulp-customize-bootstrap');
var sass = require('gulp-sass');
const concat = require('gulp-concat');

gulp.task('default', ['compileBootstrap', 'lib']);

gulp.task('compileBootstrap', function() {
  return gulp
    .src('node_modules/bootstrap/scss/bootstrap.scss')
    .pipe(customizeBootstrap('./dev/styles/scss/*.scss'))
    .pipe(sass())
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('lib', () => {
  return gulp
    .src(['./node_modules/jquery/dist/jquery.min.js'])
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('./dist/js/'));
});
