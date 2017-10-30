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

  gulp.task('serve', [], _serve);

  function _serve () {
    let options = {
      logLevel:      'debug',
      logPrefix:     'Learning',
      logConnections: true,
      logFileChanges: true,
      notify:         true,
      online:         true,
      server: {
        baseDir:   path.resolve('src'),
        directory: false,
        routes: {
          "/vendor": path.resolve('node_modules')
        }
      }
    };

    bs.init(options);

    gulp.watch(path.normalize('src/**/*.{htm,html}'), bs.reload);
  }
})();
