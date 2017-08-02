'use strict';

module.exports = function() {
  $.gulp.task('sprite:svg', function() {
    return $.gulp.src('./source/sprite/*.svg')
      .pipe($.gp.svgmin({
        js2svg: {
          pretty: true
        }
      }))
      .pipe($.gp.cheerio({
        run: function ($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
        },
        parserOptions: { xmlMode: true }
      }))
      .pipe($.gp.replace('&gt;', '>'))
      .pipe($.gp.svgSprite({
        mode: {
          symbol: {
            sprite: "../sprite.svg",
            render: {
				scss: {
					dest:'../../../../source/style/common/_sprite.scss',
					template:  "source/style/common/templates/_sprite_template.scss"
				}
			}
          }
        }
      }))
      .pipe($.gulp.dest($.config.root + '/assets/img'))
  })
};
