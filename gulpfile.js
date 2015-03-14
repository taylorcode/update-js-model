var gulp = require('gulp'),
    babel = require('gulp-babel'),
    babelify = require('babelify'),
    sourcemaps = require('gulp-sourcemaps'),
    browserify = require('browserify'),
    concat = require('gulp-concat'),
    source = require('vinyl-source-stream');

gulp.task('dev:scripts', function() {
    gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('update-model.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/node'));
});

gulp.task('dev:modules', function() {
    browserify({
        entries: './dist/node/update-model.js',
        debug: true,
    })
    .transform(babelify)
    .bundle()
    .pipe(source('update-model.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/browser'));
});

gulp.task('default', ['dev:scripts', 'dev:modules']);