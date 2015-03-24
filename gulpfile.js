var gulp = require('gulp'),
    jasmine = require('gulp-jasmine'),
    babel = require('gulp-babel'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat');

gulp.task('dev:scripts', function() {
    gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('update-model.js'))
        .pipe(gulp.dest('dist/node'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/browser'));
});

 
gulp.task('dev:test', function () {
    return gulp.src('spec/test.js')
        .pipe(jasmine());
});

gulp.task('default', ['dev:scripts', 'dev:test']);
