; (function () {

	'use strict';



	// iPad and iPod detection	
	var isiPad = function () {
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function () {
		return (
			(navigator.platform.indexOf("iPhone") != -1) ||
			(navigator.platform.indexOf("iPod") != -1)
		);
	};

	var fullHeight = function () {
		if (!isiPad() || !isiPhone()) {
			$('.js-fullheight-home').css('height', $(window).height() - $('.fh5co-main-nav').height());
			$(window).resize(function () {
				$('.js-fullheight-home').css('height', $(window).height() - $('.fh5co-main-nav').height());
			})
		}
	};

	// Loading page
	var loaderPage = function () {
		$(".fh5co-loader").fadeOut("slow");
	};

	var fh5coTabs = function () {
		// $('.fh5co-tabs-container').
		$('.fh5co-tabs li a').click(function (event) {
			event.preventDefault();
			var $this = $(this),
				tab = $this.data('tab');
			$('.fh5co-tabs li').removeClass('active');
			$this.closest('li').addClass('active');
			$this.closest('.fh5co-tabs-container').find('.fh5co-tab-content').removeClass('active');
			$this.closest('.fh5co-tabs-container').find('.fh5co-tab-content[data-tab-content="' + tab + '"]').addClass('active bounceInLeft');
			setTimeout(function () {
				$this.closest('.fh5co-tabs-container').find('.fh5co-tab-content[data-tab-content="' + tab + '"]').removeClass('bounceInLeft');
			}, 1000);
		});
	}

	var gridAutoHeight = function () {
		if (!isiPhone() || !isiPad()) {
			$('.fh5co-grid-item').css('height', $('.fh5co-2col-inner').outerHeight() / 2);
		}
		$(window).resize(function () {
			if (!isiPhone() && !isiPad()) {
				$('.fh5co-grid-item').css('height', $('.fh5co-2col-inner').outerHeight() / 2);
			}
		});
	}

	var sliderSayings = function () {
		$('#fh5co-sayings .flexslider').flexslider({
			animation: "slide",
			slideshowSpeed: 5000,
			directionNav: false,
			controlNav: true,
			smoothHeight: true,
			reverse: true
		});
	}

	var offcanvasMenu = function () {
		$('body').prepend('<div id="fh5co-offcanvas" />');
		$('body').prepend('<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle"><i></i></a>');

		$('.fh5co-main-nav .fh5co-menu-1 a, .fh5co-main-nav .fh5co-menu-2 a').each(function () {

			var $this = $(this);

			$('#fh5co-offcanvas').append($this.clone());

		});
		// $('#fh5co-offcanvas').append
	};

	var mainMenuSticky = function () {

		var sticky = $('.js-sticky');

		sticky.css('height', sticky.height());
		$(window).resize(function () {
			sticky.css('height', sticky.height());
		});

		var $section = $('.fh5co-main-nav');

		$section.waypoint(function (direction) {

			if (direction === 'down') {

				$section.css({
					'position': 'fixed',
					'top': 0,
					'width': '100%',
					'z-index': 99999
				}).addClass('fh5co-shadow');;

			}

		}, {
				offset: '0px'
			});

		$('.js-sticky').waypoint(function (direction) {
			if (direction === 'up') {
				$section.attr('style', '').removeClass('fh5co-shadow');
			}
		}, {
				offset: function () { return -$(this.element).height() + 69; }
			});

	};

	// Parallax
	var parallax = function () {

		// $(window).stellar();
		if (!isiPhone() || isiPad()) {
			$(window).stellar({ horizontalScrolling: false });
		}

	};


	// Burger Menu
	var burgerMenu = function () {

		$('body').on('click', '.js-fh5co-nav-toggle', function (event) {

			var $this = $(this);

			if ($('body').hasClass('offcanvas-visible')) {
				$('body').removeClass('offcanvas-visible fh5co-overflow');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-visible fh5co-overflow');
				$this.addClass('active');
			}

			event.preventDefault();

		});

	};

	var scrolledWindow = function () {

		$(window).scroll(function () {

			var scrollPos = $(this).scrollTop();


			if ($('body').hasClass('offcanvas-visible')) {
				$('body').removeClass('offcanvas-visible');
				$('.js-fh5co-nav-toggle').removeClass('active');
			}

		});

		$(window).resize(function () {
			if ($('body').hasClass('offcanvas-visible')) {
				$('body').removeClass('offcanvas-visible');
				$('.js-fh5co-nav-toggle').removeClass('active');
			}
		});

	};

	// Click outside of offcanvass
	var mobileMenuOutsideClick = function () {

		$(document).click(function (e) {
			var container = $("#fh5co-offcanvas, .js-fh5co-nav-toggle");
			if (!container.is(e.target) && container.has(e.target).length === 0) {

				if ($('body').hasClass('offcanvas-visible')) {

					$('body').removeClass('offcanvas-visible');
					$('.js-fh5co-nav-toggle').removeClass('active');

				}


			}
		});

	};

	var goToTop = function () {

		$('.js-gotop').on('click', function (event) {

			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');

			return false;
		});

		$(window).scroll(function () {

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});

	};


	// Page Nav
	var clickMenu = function () {
		var topVal = ($(window).width() < 769) ? 0 : 58;

		$(window).resize(function () {
			topVal = ($(window).width() < 769) ? 0 : 58;
		});
		$('.fh5co-main-nav a:not([class="external"]), #fh5co-offcanvas a:not([class="external"])').click(function (event) {
			var section = $(this).data('nav-section');

			if ($('div[data-section="' + section + '"]').length) {

				$('html, body').animate({
					scrollTop: $('div[data-section="' + section + '"]').offset().top - topVal
				}, 500, 'easeInOutExpo');

			}

			event.preventDefault();

			// return false;
		});


	};

	// Reflect scrolling in navigation
	var navActive = function (section) {

		$('.fh5co-main-nav a[data-nav-section], #fh5co-offcanvas a[data-nav-section]').removeClass('active');
		$('.fh5co-main-nav, #fh5co-offcanvas').find('a[data-nav-section="' + section + '"]').addClass('active');

	};

	var navigationSection = function () {

		var $section = $('div[data-section]');

		$section.waypoint(function (direction) {
			if (direction === 'down') {
				navActive($(this.element).data('section'));
			}

		}, {
				offset: '150px'
			});

		$section.waypoint(function (direction) {
			if (direction === 'up') {
				navActive($(this.element).data('section'));
			}
		}, {
				offset: function () { return -$(this.element).height() + 155; }
			});

	};





	// Document on load.
	$(function () {

		fullHeight();
		loaderPage();
		fh5coTabs();
		gridAutoHeight();

		// sliderMain();
		// sliderSayings();
		offcanvasMenu();
		mainMenuSticky();
		parallax();
		burgerMenu();
		scrolledWindow();
		mobileMenuOutsideClick();
		clickMenu();
		navigationSection();
		goToTop();

	});


}());



function validEmail(email) { // see:
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
}
// get all data in form and return object
function getFormData() {
  var elements = document.getElementById("gform").elements; // all form elements
  var fields = Object.keys(elements).map(function(k) {
    if(elements[k].name !== undefined) {
      return elements[k].name;
    // special case for Edge's html collection
    }else if(elements[k].length > 0){
      return elements[k].item(0).name;
    }
  }).filter(function(item, pos, self) {
    return self.indexOf(item) == pos && item;
  });
  var data = {};
  fields.forEach(function(k){
    data[k] = elements[k].value;
    if(elements[k].type === "checkbox"){
      data[k] = elements[k].checked;
    // special case for Edge's html collection
    }else if(elements[k].length){
      for(var i = 0; i < elements[k].length; i++){
        if(elements[k].item(i).checked){
          data[k] = elements[k].item(i).value;
        }
      }
    }
  });
  console.log(data);
  return data;
}

function handleFormSubmit(event) {  // handles form submit withtout any jquery
  event.preventDefault();           // we are submitting via xhr below
  var data = getFormData();         // get the values submitted in the form
  if( !validEmail(data.email) ) {   // if email is not valid show error
    alert("Email inválido! Corrija seu e-mail e tente novamente.")
    return false;
  } else {
    var url = event.target.action;  //
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    // xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        console.log( xhr.status, xhr.statusText )
        console.log(xhr.responseText);
        document.getElementById('gform').style.display = 'none'; // hide form
        document.getElementById('thanks').style.display = 'block';
        return;
    };
    // url encode form data for sending as post data
    var encoded = Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&')
    xhr.send(encoded);
  }
}
function loaded() {
  console.log('contact form submission handler loaded successfully');
  // bind to the submit event of our form
  var form = document.getElementById('gform');
  form.addEventListener("submit", handleFormSubmit, false);
};
document.addEventListener('DOMContentLoaded', loaded, false);