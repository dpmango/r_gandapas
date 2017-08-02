'use strict';


// var gulp        = require('gulp');
// var pug         = require('gulp-pug');
// var plumber     = require('gulp-plumber');
// var changed     = require('gulp-changed');
// var gulpif      = require('gulp-if');
// var frontMatter = require('gulp-front-matter');
// var config      = require('../config');
//


module.exports = function() {
  // $.function renderHtml(onlyChanged) {
  //   return gulp
  //     .src([config.src.templates + '/[^_]*.pug'])
  //     .pipe(plumber({ errorHandler: config.errorHandler }))
  //     .pipe(gulpif(onlyChanged, changed(config.dest.html, { extension: '.html' })))
  //     .pipe(frontMatter({ property: 'data' }))
  //     .pipe(pug({
  //       pretty: true
  //     }))
  //     .pipe(gulp.dest(config.dest.html));
  // }
  //
  // $.gulp.task('pug', function() {
  //   return renderHtml();
  // });
  //
  // $.gulp.task('pug:changed', function() {
  //   return renderHtml(true);
  // });
  // $.gulp.task('pug:watch', function() {
  //   gulp.watch(['./source/template/pages/' + '/**/_*.pug'], ['pug']);
  //   gulp.watch(['./source/template/pages/' + '/**/[^_]*.pug'], ['pug:changed']);
  // });

  $.gulp.task('pug', function() {
    return $.gulp.src('./source/template/pages/*.pug')
      .pipe($.gp.pug({ pretty: true }))
      .on('error', $.gp.notify.onError(function(error) {
        return {
          title: 'Pug',
          message:  error.message
        }
       }))
      .pipe($.gulp.dest($.config.root));
  });
};
