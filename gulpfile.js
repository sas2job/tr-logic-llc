"use strict";

var gulp = require("gulp");
var server = require("browser-sync").create();
var plumber = require("gulp-plumber");

var pug = require('gulp-pug');

var stylus = require('gulp-stylus');
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssmin = require("gulp-csso");

var jsmin = require("gulp-uglyfly");

var run = require("run-sequence");
var rename = require("gulp-rename");
var del = require("del");

gulp.task("html", function buildHTML() {
  return gulp.src("*.pug")
    .pipe(plumber())
    .pipe(pug())
    .pipe(gulp.dest("build"))
    .pipe(server.stream());
});

gulp.task("style", function () {
	return gulp.src("styl/style.styl")
    .pipe(plumber())
		.pipe(stylus())
    .pipe(postcss([ autoprefixer() ]))
		.pipe(gulp.dest("build/css"))
    .pipe(cssmin())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("script", function () {
	return gulp.src("js/**/*.js")
    .pipe(plumber())
    .pipe(jsmin())
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest("build/js"))
    .pipe(server.stream());
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("serve", function() {
  server.init({
    server: "build/"
  });

  gulp.watch("*.pug", ["html"]);
  gulp.watch("styl/**/*.styl", ["style"]);
  gulp.watch("js/**/*.js", ["script"]);
});

gulp.task("build", function (done) {
  run(
      "clean",
      "html",
      "style",
      "script",
      done
  );
});
