import gulp from "gulp";
import pug from "gulp-pug-3";
import imageMin from "gulp-imagemin";
import uglify from "gulp-uglify";
import { deleteAsync } from "del";

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
  return deleteAsync("public/img");
});
gulp.task("clean-html", async function () {
  return deleteAsync("public/page");
});
gulp.task("clean-js", async function () {
  return deleteAsync("public/js");
});
gulp.task("minifyjs", async function () {
  return gulp.src("src/js/**/*.js").pipe(uglify()).pipe(gulp.dest("public/js"));
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

gulp.task("build", gulp.series(["pug", "imageMin", "minifyjs", "copyVideo"]));
