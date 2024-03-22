import gulp from "gulp";
import pug from "gulp-pug-3";
import imageMin from "gulp-imagemin";
import uglify from "gulp-uglify";
import { deleteAsync } from "del";

// gulp.task("pug", function () {
//   return gulp
//     .src("src/page/**/*.pug")
//     .pipe(pug().on("error", pug.logError))
//     .pipe(gulp.dest("public/page"));
// });

// gulp.task("sass", function () {
//   return gulp
//     .src("src/scss/**/*.scss")
//     .pipe(sass().on("error", sass.logError))
//     .pipe(gulp.dest("public/css"));
// });
// gulp.task("minifyjs", function () {
//   return gulp
//     .src("src/js/**/*.js")
//     .pipe(
//       uglify().on("error", function (err) {
//         console.error(err.toString());
//         this.emit("end");
//       })
//     )
//     .pipe(gulp.dest("public/js"));
// });
// gulp.task("imagemin", function () {
//   return gulp
//     .src("src/img/**/*")
//     .pipe(
//       imagemin().on("error", function (err) {
//         console.error(err.toString());
//         this.emit("end");
//       })
//     )
//     .pipe(gulp.dest("public/img"));
// });
// gulp.task("copyVideo", function () {
//   return gulp.src("src/video/**/*").pipe(gulp.dest("public/video"));
// });

// gulp.task("watch", function () {
//   gulp.watch("src/page/**/*.pug", gulp.series("pug"));
//   gulp.watch("src/scss/**/*.scss", gulp.series("sass"));
//   gulp.watch("src/js/**/*.js", gulp.series("minifyjs"));
//   gulp.watch("src/img/**/*", gulp.series("imagemin"));
//   gulp.watch("src/video/**/*", gulp.series("copyVideo"));
// });

// Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted fix lỗi của gulp bằng cái này được nè
// var gulp = require('gulp');
// const pug = require('gulp-pug-3');
// const imageMin = require('gulp-imagemin');//npm install --save-dev gulp-imagemin@7.1.0
// const del = require('del');// npm install del --save-dev
// //biên dịch pug thành thành html
// var uglify = require('gulp-uglify');//tối ưu hóa js

gulp.task("pug", function () {
  return gulp
    .src("src/page/**/*.pug")
    .pipe(pug())
    .pipe(gulp.dest("public/page"));
});

gulp.task("imageMin", function () {
  return gulp.src("src/img/*").pipe(imageMin()).pipe(gulp.dest("public/img"));
});

gulp.task("clean-img", async function () {
  return deleteAsync("public/img/*");
});
gulp.task("clean-html", async function () {
  return deleteAsync("public/page");
});
gulp.task("clean-js", async function () {
  return deleteAsync("public/js/*");
});
gulp.task("minifyjs", async function () {
  return gulp.src("src/js/*.js").pipe(uglify()).pipe(gulp.dest("public/js"));
});
gulp.task("clean-video", async function () {
  return deleteAsync("public/video/*");
});
gulp.task("copyVideo", async function () {
  return gulp.src("src/video/*").pipe(gulp.dest("public/video"));
});

gulp.task(
  "watch",
  gulp.series(["pug", "imageMin"], async function () {
    gulp.watch(["src/page/**/*.pug"], gulp.series("clean-html", "pug"));
    gulp.watch(
      ["src/scss/component/**/*.scss"],
      gulp.series("clean-html", "pug")
    );

    gulp.watch(["src/img/**/*"], gulp.series("imageMin"));
    gulp.watch(["src/page/**/*.pug"], gulp.series("imageMin"));
    gulp.watch(["src/**/*.js"], gulp.series("imageMin"));

    gulp.watch(["src/img/**/*"], gulp.series("clean-js", "minifyjs"));
    gulp.watch(["src/page/**/*.pug"], gulp.series("clean-js", "minifyjs"));
    gulp.watch(["src/**/*.js"], gulp.series("clean-js", "minifyjs"));
    gulp.watch(["src/js/**/*.js"], gulp.series("clean-js", "minifyjs"));

    gulp.watch(["src/video/**/*"], gulp.series("clean-video", "copyVideo"));
    gulp.watch(["src/img/**/*"], gulp.series("clean-video", "copyVideo"));
    gulp.watch(["src/page/**/*.pug"], gulp.series("clean-video", "copyVideo"));
    gulp.watch(["src/**/*.js"], gulp.series("clean-video", "copyVideo"));
  })
);
