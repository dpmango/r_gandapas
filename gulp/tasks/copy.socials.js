'use strict';

module.exports = function() {
  $.gulp.task('copy:socials', function() {
    return $.gulp.src('./source/js/socials.js', { since: $.gulp.lastRun('copy:socials') })
      .pipe($.gulp.dest($.config.root + '/assets/js'));
  });
};