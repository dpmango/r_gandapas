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
