var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync').create();
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');

gulp.task('browserify', function() {
  browserify('./src/index.js', { degug: true })
    .transform(babelify)
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dest'))
});

gulp.task('watch', function() {
  gulp.watch(['./src/**/*'], ['browserify'])
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch(['index.html','dest/**'], function() {
    browserSync.reload();
  });
});

gulp.task('default', ['browserify', 'watch', 'browser-sync']);
