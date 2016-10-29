(function($) {

	mainInit();
	sessionInit();

	function mainInit() {
		$body = $('body');
		// CSS polyfills (IE<9).
		if (skel.vars.IEVersion < 9)
			$(':last-child').addClass('last-child');

		// Fix: Placeholder polyfill.
		$('form').placeholder();

		// Prioritize "important" elements on mobile.
		skel.on('+mobile -mobile', function() {
			$.prioritize(
				'.important\\28 mobile\\29',
				skel.breakpoint('mobile').active
			);
		});

		// Scrolly links.
		$('.scrolly').scrolly();

		// Nav.
		var $nav_a = $('#nav a');

		// Scrolly-fy links.
		$nav_a
			.scrolly()
			.on('click', function(e) {

				var t = $(this),
					href = t.attr('href');

				if (href[0] != '#')
					return;

				e.preventDefault();

				// Clear active and lock scrollzer until scrolling has stopped
				$nav_a
					.removeClass('active')
					.addClass('scrollzer-locked');

				// Set this link to active
				t.addClass('active');

			});

		// Initialize scrollzer.
		var ids = [];

		$nav_a.each(function() {

			var href = $(this).attr('href');

			if (href[0] != '#')
				return;

			ids.push(href.substring(1));

		});

		$.scrollzer(ids, { pad: 200, lastHack: true });

		// Header (narrower + mobile).

		// Toggle.
		$(
			'<div id="headerToggle">' +
				'<a href="#header" class="toggle"></a>' +
			'</div>'
		)
			.appendTo($body);

		// Header.
		$('#header')
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'left',
				target: $body,
				visibleClass: 'header-visible'
			});

		// Fix: Remove transitions on WP<10 (poor/buggy performance).
		if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
			$('#headerToggle, #header, #main')
				.css('transition', 'none');
	}

	function sessionInit() {
		var session = $.cookie(SESSION_COOKIE);
		
		$('#nav-title').text(session.name);
		$('#nav-rol').text(session.rolName);
		$('.'+session.rol).show();

		switch(session.rol){
			case PRO_ROL:
				$('#section').load('views/consultas.html');
				$('#cons-link').addClass('active');
				break;
			case EST_ROL:
				$('#section').load('views/pract_lab.html');
				$('#pract-link').addClass('active');
				break;
			default:
				break;
		}

		$('#pract-link').off("click").on('click', function(event) {
			event.preventDefault();
			$('.nav-menu-li a').removeClass('active');
			$(this).addClass('active');

			$('#section').load('views/pract_lab.html');
		});
		
		$('#cons-link').off("click").on('click', function(event) {
			event.preventDefault();
			$('.nav-menu-li a').removeClass('active');
			$(this).addClass('active');

			$('#section').load('views/consultas.html');
		});
		
		$('#eval-link').off("click").on('click', function(event) {
			event.preventDefault();
			$('.nav-menu-li a').removeClass('active');
			$(this).addClass('active');

			$('#section').load('views/evaluacion.html');
		});
		
		$('#rank-link').off("click").on('click', function(event) {
			event.preventDefault();
			$('.nav-menu-li a').removeClass('active');
			$(this).addClass('active');

			$('#section').load('views/ranking.html');
		});
		
		$('#anun-link').off("click").on('click', function(event) {
			event.preventDefault();
			$('.nav-menu-li a').removeClass('active');
			$(this).addClass('active');

			if(session.rol == PRO_ROL){
				$('#section').load('views/anuncios_admin.html');
			}
			else if(session.rol == EST_ROL){
				$('#section').load('views/anuncios_user.html');
			}
		});
		
		$('#cses-link').off("click").on('click', function(event) {
			event.preventDefault();
			$.removeCookie(SESSION_COOKIE);
			location.reload();
		});	
	}

})(jQuery);