var gulp = require('gulp'),
    del = require("del"),
    pump = require('pump'),
    htmlmin = require('gulp-htmlmin'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    nunjucksRender = require('gulp-nunjucks-render');

var paths = {
    html: "src/*.html",
    sass: "src/static/sass/*.scss",
    js: "src/static/js/*.js",
    dist: "build"
};

var names = {
    js: "out.js",
    css: "out.css"
};

gulp.task("html", function () {
    return pump([
        gulp.src(paths.html),
        nunjucksRender({ path: ['src/']}),
        htmlmin({collapseWhitespace: true}),
        gulp.dest(paths.dist)
    ]);
});

gulp.task("sass", function () {
    var config = {
        includePaths: ['./bower_components/bulma/', './node_modules/font-awesome/scss'],
        outputStyle: 'compressed'
    };

    return pump([
        gulp.src(paths.sass),
        sass(config),
        concat(names.css),
        gulp.dest(paths.dist)
    ]);
});

gulp.task("js", function () {
    return pump([
        gulp.src(paths.js),
        uglify(),
        concat(names.js),
        gulp.dest(paths.dist)
    ]);
});

gulp.task("clean", function () {
    return del([paths.dist]);
});

gulp.task("watch", function () {
    gulp.watch(paths.html, ["html"]);
    gulp.watch(paths.sass, ["sass"]);
    gulp.watch(paths.js, ["js"]);
});

gulp.task("default", ["clean", "html", "sass", "js", "watch"]);
