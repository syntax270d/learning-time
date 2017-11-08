/**
 * gulpfile.js
 *
 * @author Alex Lane
 * @description Used to automate tasks to make development easier.
 */
// jshint esversion:6
(function () {
  'use strict';

  const fs   = require('fs');
  const path = require('path');
  const gulp = require('gulp');
  const bs   = require('browser-sync');

  gulp.task('clean', [], _clean);
  gulp.task('serve', [], _serve);
  gulp.task('sass',  [], _sass);

  function _clean() {
    const del = require('del');

    return del([
      path.join(__dirname, 'src/css'),
    ]);
  }

  function _serve() {
    let options = {
      server: {
        baseDir:   path.resolve('src'),
        directory: false,
        routes: {
          "/vendor": path.resolve('node_modules')
        },
      },
      logLevel:      'warn',
      logPrefix:     'Learning',
      logConnections: true,
      logFileChanges: true,
      notify:         true,
      online:         true,
    };

    bs.init(options);

    gulp.watch(
      path.join(__dirname + '/src/**/*.html'),
      [], bs.reload
    );

    gulp.watch(
      path.join(__dirname + '/src/scss/**/*.scss'),
      ['sass'], bs.reload
    )
  }

  function _sass() {
    const print = require('gulp-print');
    const sass  = require('gulp-sass');

    let glob = path.join(__dirname, 'src', 'sass', 'style.scss');

    gulp.src(glob)
      // Log files
      .pipe(print())

      // Run SASS preprocessor
      .pipe(sass().on('error', sass.logError))

      // Save to src/css/style.css
      .pipe(gulp.dest(path.join(__dirname, 'src', 'css')))
  }
})();
