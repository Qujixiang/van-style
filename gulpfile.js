const gulp = require('gulp');
const { series, parallel, watch } = require('gulp');
const gulpClean = require('gulp-clean');
const less = require('gulp-less');

function remove(blobs) {
  gulp.src(blobs, {
    read: false
  }).pipe(gulpClean());
}

function clean(cb) {
  gulp.src('./dist/css/**/*', { read: false })
    .pipe(gulpClean());
    cb();
}

function lessc(cb) {
  remove('./dist/css/**/*');
  gulp.src('./src/less/index.less')
    .pipe(less())
    .pipe(gulp.dest('./dist/css/'));
  cb();
}

function build(cb) {
  lessc(cb);
  cb();
}

function watcher() {
  watch(['./src/less/**/*.less'], lessc);
}

exports.watch = watcher;
exports.default = series(clean, build);