const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();

// compole scss into css
function style() {
  // 1- Where is my scss - File
  return (
    gulp
      .src("./scss/**/*.scss")

      // 2- Pass that file through scss compiler
      .pipe(sass())

      //   3- Where do i have to save this file
      .pipe(gulp.dest("./css"))

      //4- Stream changes to all Browser
      .pipe(browserSync.stream())
  );
}

// Watch files and reload browser on change
function watch() {
  browserSync.init({
    server: {
      baseDir: "./", // Serve from root directory
    },
  });

  gulp.watch("./scss/**/*.scss", style); // Watch SCSS
  gulp.watch("./*.html").on("change", browserSync.reload); // Watch HTML
  gulp.watch("./js/**/*.js").on("change", browserSync.reload); // Watch JS
}

// Export tasks
exports.watch = watch;
exports.style = style;
