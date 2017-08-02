// UTILITIES
// set dalay on scroll event
(function($) {
  var uniqueCntr = 0;
  $.fn.scrolled = function (waitTime, fn) {
    if (typeof waitTime === "function") {
        fn = waitTime;
        waitTime = 50;
    }
    var tag = "scrollTimer" + uniqueCntr++;
    this.scroll(function () {
        var self = $(this);
        var timer = self.data(tag);
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            self.removeData(tag);
            fn.call(self[0]);
        }, waitTime);
        self.data(tag, timer);
    });
  }
})(jQuery);


// set dalay on resize event
(function($) {
  var uniqueCntr = 0;
  $.fn.resized = function (waitTime, fn) {
    if (typeof waitTime === "function") {
        fn = waitTime;
        waitTime = 50;
    }
    var tag = "scrollTimer" + uniqueCntr++;
    this.resize(function () {
        var self = $(this);
        var timer = self.data(tag);
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            self.removeData(tag);
            fn.call(self[0]);
        }, waitTime);
        self.data(tag, timer);
    });
  }
})(jQuery);

// READY FUNCTION

$(document).on('ready', function(){
	// common elements
  const _window = $(window);
  const _document = $(document);

  function isRetinaDisplay() {
    if (window.matchMedia) {
        var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
        return (mq && mq.matches || (window.devicePixelRatio > 1));
    }
  }
  // isRetinaDisplay()

  var mobileDevice = isMobile();
  // detect mobile devices
  function isMobile(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      return true
    } else {
      return false
    }
  }

	// Prevent # behavior
	$('[href="#"]').click(function(e) {
		e.preventDefault();
	});

	// Smoth scroll
	$('a[href^="#section"]').click( function() {
        var el = $(this).attr('href');
        $('body, html').animate({
            scrollTop: $(el).offset().top}, 1000);
        return false;
	});

	// SET ACTIVE CLASS IN HEADER
  // * could be removed in production and server side rendering
  // user .active for li instead
  $('.mnu__list li').each(function (i, val) {
    if ($(val).find('a').attr('href') == window.location.pathname.split('/').pop()) {
      $(val).addClass('active');
    } else {
      $(val).removeClass('active');
    }
  });

	//Скрипты для элементов которые скрываются или появляются при клике
	(function(){
		var closeBtn = $('.close__link'),
				mnuBtn = $('.mnu__for-mobile'),
				closeMnu = $('.close__btn'),
				blogMnu = $('.search__mnu-link'),
				user = $('.account__user-link'),
				userMnu = user.closest('.info__top-item');

		closeMnu.on('click', function(e){
			e.preventDefault();

			$('.mnu').removeClass('active');
			mnuBtn.fadeIn();
		});
		mnuBtn.on('click', function(e){
			e.preventDefault();

			var $this = $(this);

			$('.mnu').addClass('active');
			$this.fadeOut(100);
		})
		toggleActive(user, userMnu);
		toggleActive(blogMnu, $('.blog__main-right'), blogMnu);
		toggleActive(closeBtn, $('.header'), $('.bg__pic'));

		function toggleActive(elem, block, block2){
			elem.on('click', function(e){
				e.preventDefault();

				if(block){
					block.toggleClass('active');
				}
				if(block2){
					block2.toggleClass('active');
				}
			})
		}
	}());

  $(document).mouseup(function (e) {
    var container = new Array();
    container.push($('.user-item'));

    $.each(container, function(key, value) {
        if (!$(value).is(e.target) && $(value).has(e.target).length === 0) {
            $(value).closest('.info__top-item').removeClass('active');
        }
    });
  });

	//табы
	(function(){
		var tabElem = $('.search__form-link'),
				monthElem = $('.search__inner-link');

		monthElem.on('click', function(e){
			e.preventDefault();

			var $this = $(this),
					item = $this.closest('.search__inner-item');

			item.toggleClass('active')
			.siblings().removeClass('active');
		});

		tabElem.on('click', function(e){
			e.preventDefault();

			var $this = $(this),
					item = $this.closest('.search__form-item');

			if(!item.hasClass('active')){
				item.addClass('active')
				.siblings().removeClass('active');
			}else{
				item.removeClass('active');
			}
		})
	}());

	//Подключение слайдера
	(function(){
		var schedule = $('.schedule__list');
		var screenW = screen.width;

		if(screenW > 768){
			schedule.slick({
			  slidesToShow: 4,
			  slidesToScroll: 1,
			  prevArrow: $('.slider__arrow-left'),
			  nextArrow: $('.slider__arrow-right'),
			  autoplay: true,
			  autoplaySpeed: 2000
			});
		}else if(screenW <= 768 && screenW > 470){
			schedule.slick({
			  slidesToShow: 3,
			  slidesToScroll: 1,
			  arrows: false,
			  dots: true,
			  prevArrow: $('.slider__arrow-left'),
			  nextArrow: $('.slider__arrow-right'),
			  autoplay: true,
			  autoplaySpeed: 2000
			});
		}else if (screenW <= 470){
			schedule.slick({
			  slidesToShow: 1,
			  slidesToScroll: 1,
			  arrows: false,
			  dots: true,
			  prevArrow: $('.slider__arrow-left'),
			  nextArrow: $('.slider__arrow-right'),
			  autoplay: true,
			  autoplaySpeed: 2000
			});
		}
		if(screenW <= 607){
			$('.trainings__list').slick({
			  slidesToShow: 1,
			  slidesToScroll: 1,
			  arrows: false,
			  dots: true,
			  prevArrow: $('.slider__arrow-left'),
			  nextArrow: $('.slider__arrow-right'),
			  autoplay: true,
			  autoplaySpeed: 2000
			});
		}
	}());
	(function(){
		var screenW = screen.width;
		if(screenW <= 480){
			var shopList = $('.shop__list'),
					facts = $('.map__list');

			// addSlider(facts);
			addSlider(shopList);
		}
		function addSlider(item){
			item.slick({
			  dots: true,
			  arrows: false,
			  infinite: true,
			  speed: 500,
			  fade: true,
			  cssEase: 'linear'
			});
		}
	}());

  strLength('.training__item-title' , 55);

  function strLength(str, length){
      $(str).each(function(){
          var review_full = jQuery(this).html();
          var review = review_full;
          if( review.length > length )
          {
              review = review.substring(0, length);
              jQuery(this).text( review + '...' );
          }

      });
  }

  (function(){
      if(window.innerWidth <= 480) {
          $('.trainings__list').slick({
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
              //autoplay: true,
              autoplaySpeed: 2000,
              dots: true,
          });
	}

  }());


  // HOMEPAGE MOBILE SLDIERS

  // MAP SLIDER
  var _mapSlickMobile = $('.map__list');
  var mapSlickMobileOptions = {
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    mobileFirst: true,
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 480,
        settings: "unslick"
      }
    ]
  }
  if ( _window.width() < 480 ){
    _mapSlickMobile.slick(mapSlickMobileOptions);
  }


  _window.resized(300, function(e){
    if ( _window.width() > 480 ) {
      if (_mapSlickMobile.hasClass('slick-initialized')) {
        _mapSlickMobile.slick('unslick');
      }
      return
    }
    if (!_mapSlickMobile.hasClass('slick-initialized')) {
      return _mapSlickMobile.slick(mapSlickMobileOptions);
    }
  });

  // HOMEPAGE SHOP SLIDER
  var _videoCoursesSlickMobile = $('.js-slickVideoCourses');
  var _booksSlickMobile = $('.js-slickBooks');
  var _audioSlickMobile = $('.js-slickAudio');

  var homeShopSlickMobileOptions = {
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    mobileFirst: true,
    adaptiveHeight: false,
    responsive: [
      // {
      //   breakpoint: 480,
      //   settings: {
      //     slidesToShow: 2,
      //     slidesToScroll: 2
      //   }
      // },
      {
        breakpoint: 768,
        settings: "unslick"
      },
    ]
  }

  _videoCoursesSlickMobile.slick(homeShopSlickMobileOptions);
  _booksSlickMobile.slick(homeShopSlickMobileOptions);
  _audioSlickMobile.slick(homeShopSlickMobileOptions);


  _window.resized(300, function(e){
    if ( _window.width() > 768 ) {
      if (_booksSlickMobile.hasClass('slick-initialized')) {
        _booksSlickMobile.slick('unslick');
      }
      if (_videoCoursesSlickMobile.hasClass('slick-initialized')) {
        _videoCoursesSlickMobile.slick('unslick');
      }
      if (_audioSlickMobile.hasClass('slick-initialized')) {
        _audioSlickMobile.slick('unslick');
      }
      return
    }
    if (!_videoCoursesSlickMobile.hasClass('slick-initialized')) {
      _videoCoursesSlickMobile.slick(homeShopSlickMobileOptions);
    }
    if (!_booksSlickMobile.hasClass('slick-initialized')) {
      _booksSlickMobile.slick(homeShopSlickMobileOptions);
    }
    if (!_audioSlickMobile.hasClass('slick-initialized')) {
      _audioSlickMobile.slick(homeShopSlickMobileOptions);
    }
  });



  // MODALS
  $(function() {
      $.cartonbox();
  });

  $('.modal-close').on('click', function(){
    $('.cartonbox-close').click();
    $('.cartonbox-close').hide();
  });

  // toggler
  var savedText
  $('.js-showMore__toggler').on('click', function(){
    $(this).prev().find('.js-showMore__hidden').slideToggle();
    $(this).prev().toggleClass('active');
    if ( $(this).text() == 'Подробнее' ) {
      $(this).text('Скрыть')
    } else {
      (this).text('Подробнее')
    }
  });

  // UI NUMBER
  $('.ui-num-input span').on('click', function(e){
    var element = $(this).parent().find('input');
    var currentValue = parseInt($(this).parent().find('input').val()) || 0;

    if( $(this).is('.ui-num-input-minus') ){
      if(currentValue <= 1){
        return false;
      }else{
        element.val( currentValue - 1 );
      }
    } else{
      if(currentValue >= 10){
        return false;
      } else{
        element.val( currentValue + 1 );
      }
    }
  });

});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFVUSUxJVElFU1xyXG4vLyBzZXQgZGFsYXkgb24gc2Nyb2xsIGV2ZW50XHJcbihmdW5jdGlvbigkKSB7XHJcbiAgdmFyIHVuaXF1ZUNudHIgPSAwO1xyXG4gICQuZm4uc2Nyb2xsZWQgPSBmdW5jdGlvbiAod2FpdFRpbWUsIGZuKSB7XHJcbiAgICBpZiAodHlwZW9mIHdhaXRUaW1lID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICBmbiA9IHdhaXRUaW1lO1xyXG4gICAgICAgIHdhaXRUaW1lID0gNTA7XHJcbiAgICB9XHJcbiAgICB2YXIgdGFnID0gXCJzY3JvbGxUaW1lclwiICsgdW5pcXVlQ250cisrO1xyXG4gICAgdGhpcy5zY3JvbGwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gJCh0aGlzKTtcclxuICAgICAgICB2YXIgdGltZXIgPSBzZWxmLmRhdGEodGFnKTtcclxuICAgICAgICBpZiAodGltZXIpIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2VsZi5yZW1vdmVEYXRhKHRhZyk7XHJcbiAgICAgICAgICAgIGZuLmNhbGwoc2VsZlswXSk7XHJcbiAgICAgICAgfSwgd2FpdFRpbWUpO1xyXG4gICAgICAgIHNlbGYuZGF0YSh0YWcsIHRpbWVyKTtcclxuICAgIH0pO1xyXG4gIH1cclxufSkoalF1ZXJ5KTtcclxuXHJcblxyXG4vLyBzZXQgZGFsYXkgb24gcmVzaXplIGV2ZW50XHJcbihmdW5jdGlvbigkKSB7XHJcbiAgdmFyIHVuaXF1ZUNudHIgPSAwO1xyXG4gICQuZm4ucmVzaXplZCA9IGZ1bmN0aW9uICh3YWl0VGltZSwgZm4pIHtcclxuICAgIGlmICh0eXBlb2Ygd2FpdFRpbWUgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIGZuID0gd2FpdFRpbWU7XHJcbiAgICAgICAgd2FpdFRpbWUgPSA1MDtcclxuICAgIH1cclxuICAgIHZhciB0YWcgPSBcInNjcm9sbFRpbWVyXCIgKyB1bmlxdWVDbnRyKys7XHJcbiAgICB0aGlzLnJlc2l6ZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSAkKHRoaXMpO1xyXG4gICAgICAgIHZhciB0aW1lciA9IHNlbGYuZGF0YSh0YWcpO1xyXG4gICAgICAgIGlmICh0aW1lcikge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzZWxmLnJlbW92ZURhdGEodGFnKTtcclxuICAgICAgICAgICAgZm4uY2FsbChzZWxmWzBdKTtcclxuICAgICAgICB9LCB3YWl0VGltZSk7XHJcbiAgICAgICAgc2VsZi5kYXRhKHRhZywgdGltZXIpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59KShqUXVlcnkpO1xyXG5cclxuLy8gUkVBRFkgRlVOQ1RJT05cclxuXHJcbiQoZG9jdW1lbnQpLm9uKCdyZWFkeScsIGZ1bmN0aW9uKCl7XHJcblx0Ly8gY29tbW9uIGVsZW1lbnRzXHJcbiAgY29uc3QgX3dpbmRvdyA9ICQod2luZG93KTtcclxuICBjb25zdCBfZG9jdW1lbnQgPSAkKGRvY3VtZW50KTtcclxuXHJcbiAgZnVuY3Rpb24gaXNSZXRpbmFEaXNwbGF5KCkge1xyXG4gICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKSB7XHJcbiAgICAgICAgdmFyIG1xID0gd2luZG93Lm1hdGNoTWVkaWEoXCJvbmx5IHNjcmVlbiBhbmQgKG1pbi0tbW96LWRldmljZS1waXhlbC1yYXRpbzogMS4zKSwgb25seSBzY3JlZW4gYW5kICgtby1taW4tZGV2aWNlLXBpeGVsLXJhdGlvOiAyLjYvMiksIG9ubHkgc2NyZWVuIGFuZCAoLXdlYmtpdC1taW4tZGV2aWNlLXBpeGVsLXJhdGlvOiAxLjMpLCBvbmx5IHNjcmVlbiAgYW5kIChtaW4tZGV2aWNlLXBpeGVsLXJhdGlvOiAxLjMpLCBvbmx5IHNjcmVlbiBhbmQgKG1pbi1yZXNvbHV0aW9uOiAxLjNkcHB4KVwiKTtcclxuICAgICAgICByZXR1cm4gKG1xICYmIG1xLm1hdGNoZXMgfHwgKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvID4gMSkpO1xyXG4gICAgfVxyXG4gIH1cclxuICAvLyBpc1JldGluYURpc3BsYXkoKVxyXG5cclxuICB2YXIgbW9iaWxlRGV2aWNlID0gaXNNb2JpbGUoKTtcclxuICAvLyBkZXRlY3QgbW9iaWxlIGRldmljZXNcclxuICBmdW5jdGlvbiBpc01vYmlsZSgpe1xyXG4gICAgaWYoIC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeXxJRU1vYmlsZXxPcGVyYSBNaW5pL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSApIHtcclxuICAgICAgcmV0dXJuIHRydWVcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG4gIH1cclxuXHJcblx0Ly8gUHJldmVudCAjIGJlaGF2aW9yXHJcblx0JCgnW2hyZWY9XCIjXCJdJykuY2xpY2soZnVuY3Rpb24oZSkge1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdH0pO1xyXG5cclxuXHQvLyBTbW90aCBzY3JvbGxcclxuXHQkKCdhW2hyZWZePVwiI3NlY3Rpb25cIl0nKS5jbGljayggZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGVsID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XHJcbiAgICAgICAgJCgnYm9keSwgaHRtbCcpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICBzY3JvbGxUb3A6ICQoZWwpLm9mZnNldCgpLnRvcH0sIDEwMDApO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuXHR9KTtcclxuXHJcblx0Ly8gU0VUIEFDVElWRSBDTEFTUyBJTiBIRUFERVJcclxuICAvLyAqIGNvdWxkIGJlIHJlbW92ZWQgaW4gcHJvZHVjdGlvbiBhbmQgc2VydmVyIHNpZGUgcmVuZGVyaW5nXHJcbiAgLy8gdXNlciAuYWN0aXZlIGZvciBsaSBpbnN0ZWFkXHJcbiAgJCgnLm1udV9fbGlzdCBsaScpLmVhY2goZnVuY3Rpb24gKGksIHZhbCkge1xyXG4gICAgaWYgKCQodmFsKS5maW5kKCdhJykuYXR0cignaHJlZicpID09IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpLnBvcCgpKSB7XHJcbiAgICAgICQodmFsKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkKHZhbCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuXHQvL9Ch0LrRgNC40L/RgtGLINC00LvRjyDRjdC70LXQvNC10L3RgtC+0LIg0LrQvtGC0L7RgNGL0LUg0YHQutGA0YvQstCw0Y7RgtGB0Y8g0LjQu9C4INC/0L7Rj9Cy0LvRj9GO0YLRgdGPINC/0YDQuCDQutC70LjQutC1XHJcblx0KGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgY2xvc2VCdG4gPSAkKCcuY2xvc2VfX2xpbmsnKSxcclxuXHRcdFx0XHRtbnVCdG4gPSAkKCcubW51X19mb3ItbW9iaWxlJyksXHJcblx0XHRcdFx0Y2xvc2VNbnUgPSAkKCcuY2xvc2VfX2J0bicpLFxyXG5cdFx0XHRcdGJsb2dNbnUgPSAkKCcuc2VhcmNoX19tbnUtbGluaycpLFxyXG5cdFx0XHRcdHVzZXIgPSAkKCcuYWNjb3VudF9fdXNlci1saW5rJyksXHJcblx0XHRcdFx0dXNlck1udSA9IHVzZXIuY2xvc2VzdCgnLmluZm9fX3RvcC1pdGVtJyk7XHJcblxyXG5cdFx0Y2xvc2VNbnUub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdCQoJy5tbnUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdG1udUJ0bi5mYWRlSW4oKTtcclxuXHRcdH0pO1xyXG5cdFx0bW51QnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG5cclxuXHRcdFx0JCgnLm1udScpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0JHRoaXMuZmFkZU91dCgxMDApO1xyXG5cdFx0fSlcclxuXHRcdHRvZ2dsZUFjdGl2ZSh1c2VyLCB1c2VyTW51KTtcclxuXHRcdHRvZ2dsZUFjdGl2ZShibG9nTW51LCAkKCcuYmxvZ19fbWFpbi1yaWdodCcpLCBibG9nTW51KTtcclxuXHRcdHRvZ2dsZUFjdGl2ZShjbG9zZUJ0biwgJCgnLmhlYWRlcicpLCAkKCcuYmdfX3BpYycpKTtcclxuXHJcblx0XHRmdW5jdGlvbiB0b2dnbGVBY3RpdmUoZWxlbSwgYmxvY2ssIGJsb2NrMil7XHJcblx0XHRcdGVsZW0ub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0XHRpZihibG9jayl7XHJcblx0XHRcdFx0XHRibG9jay50b2dnbGVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmKGJsb2NrMil7XHJcblx0XHRcdFx0XHRibG9jazIudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHR9KCkpO1xyXG5cclxuICAkKGRvY3VtZW50KS5tb3VzZXVwKGZ1bmN0aW9uIChlKSB7XHJcbiAgICB2YXIgY29udGFpbmVyID0gbmV3IEFycmF5KCk7XHJcbiAgICBjb250YWluZXIucHVzaCgkKCcudXNlci1pdGVtJykpO1xyXG5cclxuICAgICQuZWFjaChjb250YWluZXIsIGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcclxuICAgICAgICBpZiAoISQodmFsdWUpLmlzKGUudGFyZ2V0KSAmJiAkKHZhbHVlKS5oYXMoZS50YXJnZXQpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAkKHZhbHVlKS5jbG9zZXN0KCcuaW5mb19fdG9wLWl0ZW0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcblxyXG5cdC8v0YLQsNCx0YtcclxuXHQoZnVuY3Rpb24oKXtcclxuXHRcdHZhciB0YWJFbGVtID0gJCgnLnNlYXJjaF9fZm9ybS1saW5rJyksXHJcblx0XHRcdFx0bW9udGhFbGVtID0gJCgnLnNlYXJjaF9faW5uZXItbGluaycpO1xyXG5cclxuXHRcdG1vbnRoRWxlbS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKSxcclxuXHRcdFx0XHRcdGl0ZW0gPSAkdGhpcy5jbG9zZXN0KCcuc2VhcmNoX19pbm5lci1pdGVtJyk7XHJcblxyXG5cdFx0XHRpdGVtLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKVxyXG5cdFx0XHQuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHR0YWJFbGVtLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpLFxyXG5cdFx0XHRcdFx0aXRlbSA9ICR0aGlzLmNsb3Nlc3QoJy5zZWFyY2hfX2Zvcm0taXRlbScpO1xyXG5cclxuXHRcdFx0aWYoIWl0ZW0uaGFzQ2xhc3MoJ2FjdGl2ZScpKXtcclxuXHRcdFx0XHRpdGVtLmFkZENsYXNzKCdhY3RpdmUnKVxyXG5cdFx0XHRcdC5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0aXRlbS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fSgpKTtcclxuXHJcblx0Ly/Qn9C+0LTQutC70Y7Rh9C10L3QuNC1INGB0LvQsNC50LTQtdGA0LBcclxuXHQoZnVuY3Rpb24oKXtcclxuXHRcdHZhciBzY2hlZHVsZSA9ICQoJy5zY2hlZHVsZV9fbGlzdCcpO1xyXG5cdFx0dmFyIHNjcmVlblcgPSBzY3JlZW4ud2lkdGg7XHJcblxyXG5cdFx0aWYoc2NyZWVuVyA+IDc2OCl7XHJcblx0XHRcdHNjaGVkdWxlLnNsaWNrKHtcclxuXHRcdFx0ICBzbGlkZXNUb1Nob3c6IDQsXHJcblx0XHRcdCAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcblx0XHRcdCAgcHJldkFycm93OiAkKCcuc2xpZGVyX19hcnJvdy1sZWZ0JyksXHJcblx0XHRcdCAgbmV4dEFycm93OiAkKCcuc2xpZGVyX19hcnJvdy1yaWdodCcpLFxyXG5cdFx0XHQgIGF1dG9wbGF5OiB0cnVlLFxyXG5cdFx0XHQgIGF1dG9wbGF5U3BlZWQ6IDIwMDBcclxuXHRcdFx0fSk7XHJcblx0XHR9ZWxzZSBpZihzY3JlZW5XIDw9IDc2OCAmJiBzY3JlZW5XID4gNDcwKXtcclxuXHRcdFx0c2NoZWR1bGUuc2xpY2soe1xyXG5cdFx0XHQgIHNsaWRlc1RvU2hvdzogMyxcclxuXHRcdFx0ICBzbGlkZXNUb1Njcm9sbDogMSxcclxuXHRcdFx0ICBhcnJvd3M6IGZhbHNlLFxyXG5cdFx0XHQgIGRvdHM6IHRydWUsXHJcblx0XHRcdCAgcHJldkFycm93OiAkKCcuc2xpZGVyX19hcnJvdy1sZWZ0JyksXHJcblx0XHRcdCAgbmV4dEFycm93OiAkKCcuc2xpZGVyX19hcnJvdy1yaWdodCcpLFxyXG5cdFx0XHQgIGF1dG9wbGF5OiB0cnVlLFxyXG5cdFx0XHQgIGF1dG9wbGF5U3BlZWQ6IDIwMDBcclxuXHRcdFx0fSk7XHJcblx0XHR9ZWxzZSBpZiAoc2NyZWVuVyA8PSA0NzApe1xyXG5cdFx0XHRzY2hlZHVsZS5zbGljayh7XHJcblx0XHRcdCAgc2xpZGVzVG9TaG93OiAxLFxyXG5cdFx0XHQgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cdFx0XHQgIGFycm93czogZmFsc2UsXHJcblx0XHRcdCAgZG90czogdHJ1ZSxcclxuXHRcdFx0ICBwcmV2QXJyb3c6ICQoJy5zbGlkZXJfX2Fycm93LWxlZnQnKSxcclxuXHRcdFx0ICBuZXh0QXJyb3c6ICQoJy5zbGlkZXJfX2Fycm93LXJpZ2h0JyksXHJcblx0XHRcdCAgYXV0b3BsYXk6IHRydWUsXHJcblx0XHRcdCAgYXV0b3BsYXlTcGVlZDogMjAwMFxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRcdGlmKHNjcmVlblcgPD0gNjA3KXtcclxuXHRcdFx0JCgnLnRyYWluaW5nc19fbGlzdCcpLnNsaWNrKHtcclxuXHRcdFx0ICBzbGlkZXNUb1Nob3c6IDEsXHJcblx0XHRcdCAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcblx0XHRcdCAgYXJyb3dzOiBmYWxzZSxcclxuXHRcdFx0ICBkb3RzOiB0cnVlLFxyXG5cdFx0XHQgIHByZXZBcnJvdzogJCgnLnNsaWRlcl9fYXJyb3ctbGVmdCcpLFxyXG5cdFx0XHQgIG5leHRBcnJvdzogJCgnLnNsaWRlcl9fYXJyb3ctcmlnaHQnKSxcclxuXHRcdFx0ICBhdXRvcGxheTogdHJ1ZSxcclxuXHRcdFx0ICBhdXRvcGxheVNwZWVkOiAyMDAwXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH0oKSk7XHJcblx0KGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgc2NyZWVuVyA9IHNjcmVlbi53aWR0aDtcclxuXHRcdGlmKHNjcmVlblcgPD0gNDgwKXtcclxuXHRcdFx0dmFyIHNob3BMaXN0ID0gJCgnLnNob3BfX2xpc3QnKSxcclxuXHRcdFx0XHRcdGZhY3RzID0gJCgnLm1hcF9fbGlzdCcpO1xyXG5cclxuXHRcdFx0Ly8gYWRkU2xpZGVyKGZhY3RzKTtcclxuXHRcdFx0YWRkU2xpZGVyKHNob3BMaXN0KTtcclxuXHRcdH1cclxuXHRcdGZ1bmN0aW9uIGFkZFNsaWRlcihpdGVtKXtcclxuXHRcdFx0aXRlbS5zbGljayh7XHJcblx0XHRcdCAgZG90czogdHJ1ZSxcclxuXHRcdFx0ICBhcnJvd3M6IGZhbHNlLFxyXG5cdFx0XHQgIGluZmluaXRlOiB0cnVlLFxyXG5cdFx0XHQgIHNwZWVkOiA1MDAsXHJcblx0XHRcdCAgZmFkZTogdHJ1ZSxcclxuXHRcdFx0ICBjc3NFYXNlOiAnbGluZWFyJ1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9KCkpO1xyXG5cclxuICBzdHJMZW5ndGgoJy50cmFpbmluZ19faXRlbS10aXRsZScgLCA1NSk7XHJcblxyXG4gIGZ1bmN0aW9uIHN0ckxlbmd0aChzdHIsIGxlbmd0aCl7XHJcbiAgICAgICQoc3RyKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICB2YXIgcmV2aWV3X2Z1bGwgPSBqUXVlcnkodGhpcykuaHRtbCgpO1xyXG4gICAgICAgICAgdmFyIHJldmlldyA9IHJldmlld19mdWxsO1xyXG4gICAgICAgICAgaWYoIHJldmlldy5sZW5ndGggPiBsZW5ndGggKVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHJldmlldyA9IHJldmlldy5zdWJzdHJpbmcoMCwgbGVuZ3RoKTtcclxuICAgICAgICAgICAgICBqUXVlcnkodGhpcykudGV4dCggcmV2aWV3ICsgJy4uLicgKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgKGZ1bmN0aW9uKCl7XHJcbiAgICAgIGlmKHdpbmRvdy5pbm5lcldpZHRoIDw9IDQ4MCkge1xyXG4gICAgICAgICAgJCgnLnRyYWluaW5nc19fbGlzdCcpLnNsaWNrKHtcclxuICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAvL2F1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDIwMDAsXHJcbiAgICAgICAgICAgICAgZG90czogdHJ1ZSxcclxuICAgICAgICAgIH0pO1xyXG5cdH1cclxuXHJcbiAgfSgpKTtcclxuXHJcblxyXG4gIC8vIEhPTUVQQUdFIE1PQklMRSBTTERJRVJTXHJcblxyXG4gIC8vIE1BUCBTTElERVJcclxuICB2YXIgX21hcFNsaWNrTW9iaWxlID0gJCgnLm1hcF9fbGlzdCcpO1xyXG4gIHZhciBtYXBTbGlja01vYmlsZU9wdGlvbnMgPSB7XHJcbiAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgYXJyb3dzOiBmYWxzZSxcclxuICAgIGRvdHM6IHRydWUsXHJcbiAgICBtb2JpbGVGaXJzdDogdHJ1ZSxcclxuICAgIGFkYXB0aXZlSGVpZ2h0OiBmYWxzZSxcclxuICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAge1xyXG4gICAgICAgIGJyZWFrcG9pbnQ6IDQ4MCxcclxuICAgICAgICBzZXR0aW5nczogXCJ1bnNsaWNrXCJcclxuICAgICAgfVxyXG4gICAgXVxyXG4gIH1cclxuICBpZiAoIF93aW5kb3cud2lkdGgoKSA8IDQ4MCApe1xyXG4gICAgX21hcFNsaWNrTW9iaWxlLnNsaWNrKG1hcFNsaWNrTW9iaWxlT3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuXHJcbiAgX3dpbmRvdy5yZXNpemVkKDMwMCwgZnVuY3Rpb24oZSl7XHJcbiAgICBpZiAoIF93aW5kb3cud2lkdGgoKSA+IDQ4MCApIHtcclxuICAgICAgaWYgKF9tYXBTbGlja01vYmlsZS5oYXNDbGFzcygnc2xpY2staW5pdGlhbGl6ZWQnKSkge1xyXG4gICAgICAgIF9tYXBTbGlja01vYmlsZS5zbGljaygndW5zbGljaycpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgaWYgKCFfbWFwU2xpY2tNb2JpbGUuaGFzQ2xhc3MoJ3NsaWNrLWluaXRpYWxpemVkJykpIHtcclxuICAgICAgcmV0dXJuIF9tYXBTbGlja01vYmlsZS5zbGljayhtYXBTbGlja01vYmlsZU9wdGlvbnMpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyBIT01FUEFHRSBTSE9QIFNMSURFUlxyXG4gIHZhciBfdmlkZW9Db3Vyc2VzU2xpY2tNb2JpbGUgPSAkKCcuanMtc2xpY2tWaWRlb0NvdXJzZXMnKTtcclxuICB2YXIgX2Jvb2tzU2xpY2tNb2JpbGUgPSAkKCcuanMtc2xpY2tCb29rcycpO1xyXG4gIHZhciBfYXVkaW9TbGlja01vYmlsZSA9ICQoJy5qcy1zbGlja0F1ZGlvJyk7XHJcblxyXG4gIHZhciBob21lU2hvcFNsaWNrTW9iaWxlT3B0aW9ucyA9IHtcclxuICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcclxuICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgYXJyb3dzOiBmYWxzZSxcclxuICAgIGRvdHM6IHRydWUsXHJcbiAgICBtb2JpbGVGaXJzdDogdHJ1ZSxcclxuICAgIGFkYXB0aXZlSGVpZ2h0OiBmYWxzZSxcclxuICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgLy8ge1xyXG4gICAgICAvLyAgIGJyZWFrcG9pbnQ6IDQ4MCxcclxuICAgICAgLy8gICBzZXR0aW5nczoge1xyXG4gICAgICAvLyAgICAgc2xpZGVzVG9TaG93OiAyLFxyXG4gICAgICAvLyAgICAgc2xpZGVzVG9TY3JvbGw6IDJcclxuICAgICAgLy8gICB9XHJcbiAgICAgIC8vIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBicmVha3BvaW50OiA3NjgsXHJcbiAgICAgICAgc2V0dGluZ3M6IFwidW5zbGlja1wiXHJcbiAgICAgIH0sXHJcbiAgICBdXHJcbiAgfVxyXG5cclxuICBfdmlkZW9Db3Vyc2VzU2xpY2tNb2JpbGUuc2xpY2soaG9tZVNob3BTbGlja01vYmlsZU9wdGlvbnMpO1xyXG4gIF9ib29rc1NsaWNrTW9iaWxlLnNsaWNrKGhvbWVTaG9wU2xpY2tNb2JpbGVPcHRpb25zKTtcclxuICBfYXVkaW9TbGlja01vYmlsZS5zbGljayhob21lU2hvcFNsaWNrTW9iaWxlT3B0aW9ucyk7XHJcblxyXG5cclxuICBfd2luZG93LnJlc2l6ZWQoMzAwLCBmdW5jdGlvbihlKXtcclxuICAgIGlmICggX3dpbmRvdy53aWR0aCgpID4gNzY4ICkge1xyXG4gICAgICBpZiAoX2Jvb2tzU2xpY2tNb2JpbGUuaGFzQ2xhc3MoJ3NsaWNrLWluaXRpYWxpemVkJykpIHtcclxuICAgICAgICBfYm9va3NTbGlja01vYmlsZS5zbGljaygndW5zbGljaycpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChfdmlkZW9Db3Vyc2VzU2xpY2tNb2JpbGUuaGFzQ2xhc3MoJ3NsaWNrLWluaXRpYWxpemVkJykpIHtcclxuICAgICAgICBfdmlkZW9Db3Vyc2VzU2xpY2tNb2JpbGUuc2xpY2soJ3Vuc2xpY2snKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoX2F1ZGlvU2xpY2tNb2JpbGUuaGFzQ2xhc3MoJ3NsaWNrLWluaXRpYWxpemVkJykpIHtcclxuICAgICAgICBfYXVkaW9TbGlja01vYmlsZS5zbGljaygndW5zbGljaycpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgaWYgKCFfdmlkZW9Db3Vyc2VzU2xpY2tNb2JpbGUuaGFzQ2xhc3MoJ3NsaWNrLWluaXRpYWxpemVkJykpIHtcclxuICAgICAgX3ZpZGVvQ291cnNlc1NsaWNrTW9iaWxlLnNsaWNrKGhvbWVTaG9wU2xpY2tNb2JpbGVPcHRpb25zKTtcclxuICAgIH1cclxuICAgIGlmICghX2Jvb2tzU2xpY2tNb2JpbGUuaGFzQ2xhc3MoJ3NsaWNrLWluaXRpYWxpemVkJykpIHtcclxuICAgICAgX2Jvb2tzU2xpY2tNb2JpbGUuc2xpY2soaG9tZVNob3BTbGlja01vYmlsZU9wdGlvbnMpO1xyXG4gICAgfVxyXG4gICAgaWYgKCFfYXVkaW9TbGlja01vYmlsZS5oYXNDbGFzcygnc2xpY2staW5pdGlhbGl6ZWQnKSkge1xyXG4gICAgICBfYXVkaW9TbGlja01vYmlsZS5zbGljayhob21lU2hvcFNsaWNrTW9iaWxlT3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG5cclxuXHJcbiAgLy8gTU9EQUxTXHJcbiAgJChmdW5jdGlvbigpIHtcclxuICAgICAgJC5jYXJ0b25ib3goKTtcclxuICB9KTtcclxuXHJcbiAgJCgnLm1vZGFsLWNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICQoJy5jYXJ0b25ib3gtY2xvc2UnKS5jbGljaygpO1xyXG4gICAgJCgnLmNhcnRvbmJveC1jbG9zZScpLmhpZGUoKTtcclxuICB9KTtcclxuXHJcbiAgLy8gdG9nZ2xlclxyXG4gIHZhciBzYXZlZFRleHRcclxuICAkKCcuanMtc2hvd01vcmVfX3RvZ2dsZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgJCh0aGlzKS5wcmV2KCkuZmluZCgnLmpzLXNob3dNb3JlX19oaWRkZW4nKS5zbGlkZVRvZ2dsZSgpO1xyXG4gICAgJCh0aGlzKS5wcmV2KCkudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgaWYgKCAkKHRoaXMpLnRleHQoKSA9PSAn0J/QvtC00YDQvtCx0L3QtdC1JyApIHtcclxuICAgICAgJCh0aGlzKS50ZXh0KCfQodC60YDRi9GC0YwnKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgKHRoaXMpLnRleHQoJ9Cf0L7QtNGA0L7QsdC90LXQtScpXHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vIFVJIE5VTUJFUlxyXG4gICQoJy51aS1udW0taW5wdXQgc3BhbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgdmFyIGVsZW1lbnQgPSAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2lucHV0Jyk7XHJcbiAgICB2YXIgY3VycmVudFZhbHVlID0gcGFyc2VJbnQoJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdpbnB1dCcpLnZhbCgpKSB8fCAwO1xyXG5cclxuICAgIGlmKCAkKHRoaXMpLmlzKCcudWktbnVtLWlucHV0LW1pbnVzJykgKXtcclxuICAgICAgaWYoY3VycmVudFZhbHVlIDw9IDEpe1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgZWxlbWVudC52YWwoIGN1cnJlbnRWYWx1ZSAtIDEgKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNle1xyXG4gICAgICBpZihjdXJyZW50VmFsdWUgPj0gMTApe1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfSBlbHNle1xyXG4gICAgICAgIGVsZW1lbnQudmFsKCBjdXJyZW50VmFsdWUgKyAxICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuXHJcbn0pO1xyXG4iXX0=
