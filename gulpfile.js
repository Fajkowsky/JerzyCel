var gulp = require('gulp'),
  del = require("del"),
  pump = require('pump'),
  htmlmin = require('gulp-htmlmin'),
  sass = require('gulp-sass'),
  uglify = require('gulp-uglify'),
  cssnano = require('gulp-cssnano'),
  imagemin = require('gulp-imagemin'),
  concat = require('gulp-concat'),
  nunjucksRender = require('gulp-nunjucks-render');

var paths = {
  html: "src/pages/*.html",
  sass: "src/static/sass/*.scss",
  js: "src/static/js/*.js",
  img: "src/static/img/*",
  pdf: "src/static/pdf/*",
  dist: "build/"
};

var names = {
  js: "out.js",
  css: "out.css"
};

gulp.task("html", function (cb) {
  pump([
    gulp.src(paths.html),
    nunjucksRender({path: ['src/templates/']}),
    htmlmin({collapseWhitespace: true}),
    gulp.dest(paths.dist)
  ], cb);
});

gulp.task("sass", function (cb) {
  var config = {
    includePaths: ['./bower_components/bulma/', './node_modules/font-awesome/scss']
  };

  pump([
    gulp.src(paths.sass),
    sass(config),
    concat(names.css),
    cssnano(),
    gulp.dest(paths.dist)
  ], cb);
});

gulp.task("js", function (cb) {
  pump([
    gulp.src(paths.js),
    uglify({compress: {unused: false}}),
    concat(names.js),
    gulp.dest(paths.dist)
  ], cb);
});

gulp.task("img", function (cb) {
  pump([
    gulp.src(paths.img),
    imagemin(),
    gulp.dest(paths.dist + "/img")
  ], cb);
});

gulp.task("icons", function (cb) {
  pump([
    gulp.src("./node_modules/font-awesome/fonts/**.*"),
    gulp.dest(paths.dist + "/fonts")
  ], cb)
});

gulp.task("pdf", function (cb) {
  pump([
    gulp.src(paths.pdf),
    gulp.dest(paths.dist + "/pdf")
  ], cb)
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

gulp.task("build", ["html", "sass", "js", "img", "icons", "pdf"]);
gulp.task("default", ["clean", "build", "watch"]);
