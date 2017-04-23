var gulp = require('gulp'),
    del = require("del"),
    pump = require('pump'),
    htmlmin = require('gulp-htmlmin'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    nunjucksRender = require('gulp-nunjucks-render'),
    uncss = require('gulp-uncss');

var paths = {
    html: "src/pages/*.html",
    sass: "src/static/sass/*.scss",
    js: "src/static/js/*.js",
    img: "src/static/img/*",
    dist: "build/",
    ftp: "/public_html"
};

var names = {
    js: "out.js",
    css: "out.css"
};

gulp.task("html", function () {
    return pump([
        gulp.src(paths.html),
        nunjucksRender({path: ['src/templates/']}),
        htmlmin({collapseWhitespace: true}),
        gulp.dest(paths.dist)
    ]);
});

gulp.task("sass", function () {
    var config = {
        includePaths: ['./bower_components/bulma/', './node_modules/font-awesome/scss']
    };

    return pump([
        gulp.src(paths.sass),
        sass(config),
        concat(names.css),
        uncss({html: ['src/**/*.html']}),
        cssnano(),
        gulp.dest(paths.dist)
    ]);
});

gulp.task("js", function () {
    return pump([
        gulp.src(paths.js),
        uglify({compress: {unused: false}}),
        concat(names.js),
        gulp.dest(paths.dist)
    ]);
});

gulp.task("img", function() {
   return pump([
       gulp.src(paths.img),
       imagemin(),
       gulp.dest(paths.dist + "/img")
   ]);
});

gulp.task("clean", function () {
    return del([paths.dist]);
});

gulp.task("watch", function () {
    gulp.watch(paths.html, ["html"]);
    gulp.watch(paths.sass, ["sass"]);
    gulp.watch(paths.js, ["js"]);
    gulp.watch(paths.img, ["img"]);
});

gulp.task("build", ["html", "sass", "js", "img"]);
gulp.task("default", ["clean", "build", "watch"]);
