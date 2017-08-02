'use strict';

module.exports = function() {
  $.gulp.task('copy:audio', function() {
    return $.gulp.src('./source/mp3/**/*.*', { since: $.gulp.lastRun('copy:image') })
      .pipe($.gulp.dest($.config.root + '/assets/audio'));
  });
};
