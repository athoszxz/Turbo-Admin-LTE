var gulp = require('gulp');
var clean = require('gulp-clean');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var nunjucks = require('gulp-nunjucks-html');
var less = require('gulp-less');
var watch = require('gulp-watch');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

const PROJECT_NAME = 'turbolte';

gulp.task('clean', function () {
    return gulp.src(['dist/app','dist/assets/css/turbolte.css'])
        .pipe(clean());
});

gulp.task('serve', ['nunjucks','compile-less'], function () {

    browserSync.init({
        open: 'external',
        server: {
            baseDir: 'dist',
            index: 'index.html'
        }
    });

    gulp.watch("build/app/*/*.html", ['nunjucks']);
    gulp.watch("build/assets/css/less/*.less", ['compile-less']);
    gulp.watch("dist/*").on('change', reload);
});

gulp.task('nunjucks', function () {

    return gulp.src(['build/app/pages/*.html'])
        .pipe(nunjucks({
            searchPaths: ['build/app/templates']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('compile-less', function () {
    gulp.src('build/assets/css/less/turbolte.less')
        .pipe(less())
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/assets/css'));
});

gulp.task('default', ['serve']);

