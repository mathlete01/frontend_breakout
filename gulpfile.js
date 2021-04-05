var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var sass = require("gulp-sass");
var del = require("del");
var useref = require("gulp-useref");
var cache = require("gulp-cache");
var uglify = require("gulp-uglify");
var gulpIf = require("gulp-if");
var cssnano = require("gulp-cssnano");
var imagemin = require("gulp-imagemin");
// Compile sass into CSS & auto-inject into browsers
gulp.task("sass", async function () {
  return await gulp
    .src(["app/scss/*.scss", "app/css/*.css"])
    .pipe(sass())
    .pipe(gulp.dest("app/css"))
    .pipe(gulpIf("*.css", cssnano()))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

gulp.task("js", async function () {
  return await gulp
    .src("app/*.js")
    .pipe(gulpIf("*.js", uglify()))
    .pipe(gulp.dest("dist/"));
});

// Static Server + watching scss/html files
gulp.task(
  "serve",
  gulp.series("sass", function () {
    browserSync.init({
      server: "./app/",
     port:80
    });

    gulp.watch("app/scss/*.scss", gulp.series("sass"));
    gulp.watch("app/*.html").on("change", browserSync.reload);
  })
);

//images

gulp.task("images", async function () {
  return await gulp
    .src("app/images/**/*.+(png|jpg|jpeg|gif|svg)")
    .pipe(
      cache(
        imagemin({
          interlaced: true,
        })
      )
    )
    .pipe(gulp.dest("dist/images"));
});

// Delete The build folder
gulp.task("clean", async function (done) {
  await del.sync("dist");
  done();
});

// Use ref

gulp.task("useref", async function () {
  return await gulp
    .src("app/*.html")
    .pipe(useref())
    .pipe(gulpIf("*.js", uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf("*.css", cssnano()))
    .pipe(gulp.dest("dist"));
});

// Build The outcome

gulp.task(
  "build",
  gulp.series("clean", "sass", "js", "useref", "images", function (done) {
    done();
  })
);

gulp.task("default", gulp.series("serve"));
