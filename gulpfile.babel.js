import gulp from 'gulp'
import browserify from 'browserify'
import babelify from 'babelify'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import uglify from 'gulp-uglify'
let browserSync = require('browser-sync').create();

gulp.task('browserify', () => {
  browserify('./src/index.js', { degug: true })
    .transform(babelify)
    .bundle()
    .on("error", err => { console.log("Error : " + err.message); })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dest'))
});

gulp.task('watch', () => {
  gulp.watch(['./src/**/*'], ['browserify'])
});

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch(['index.html','dest/**'], () => {
    browserSync.reload();
  });
});

gulp.task('default', ['browserify', 'watch', 'browser-sync']);
