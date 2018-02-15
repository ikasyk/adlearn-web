'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const image = require('gulp-image');
const merge = require('merge-stream');

const RESOURCES_PATH = 'src/main/resources';

gulp.task('styles', () => {
    let scssStream = gulp.src(RESOURCES_PATH + '/styles/css/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(concat('sass-files.scss'));

    let cssStream = gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
        .pipe(concat('css-files.css'));

    return merge(scssStream, cssStream)
        .pipe(concat('main.css'))
        .pipe(gulp.dest(RESOURCES_PATH + '/static/built/'));
});

gulp.task('images', () => {
    return gulp.src(RESOURCES_PATH + '/styles/images/**')
        .pipe(image())
        .pipe(gulp.dest(RESOURCES_PATH + '/static/built/images/'));
});

gulp.task('default', ['styles', 'images']);