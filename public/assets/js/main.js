(function($) {

	mainInit();
	sessionInit();

	function mainInit() {
		$body = $('body');

		if (skel.vars.IEVersion < 9)
			$(':last-child').addClass('last-child');

		$('form').placeholder();

		skel.on('+mobile -mobile', function() {
			$.prioritize(
				'.important\\28 mobile\\29',
				skel.breakpoint('mobile').active
			);
		});

		$('.scrolly').scrolly();

		var $nav_a = $('#nav a');

		$nav_a
			.scrolly()
			.on('click', function(e) {

				var t = $(this),
					href = t.attr('href');

				if (href[0] != '#')
					return;

				e.preventDefault();

				$nav_a
					.removeClass('active')
					.addClass('scrollzer-locked');

				t.addClass('active');

			});

		var ids = [];

		$nav_a.each(function() {

			var href = $(this).attr('href');

			if (href[0] != '#')
				return;

			ids.push(href.substring(1));

		});

		$.scrollzer(ids, { pad: 200, lastHack: true });

		$(
			'<div id="headerToggle">' +
				'<a id="panelToogleBtn" href="#header" class="toggle"></a>' +
			'</div>'
		)
		.appendTo($body);

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

		if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
			$('#headerToggle, #header, #main')
				.css('transition', 'none');
	}

	function sessionInit() {
		var session = $.cookie(SESSION_COOKIE);
		
		$('#nav-title').text(session.name);
		$('#nav-rol').text(session.rol_name);
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
			case ADM_ROL:
				$('#section').load('views/usuarios.html');
				$('#usrs-link').addClass('active');
				break;
			case SAD_ROL:
				$('#section').load('views/consultas.html');
				$('#cons-link').addClass('active');
				break;
			default:
				break;
		}

		$('#pract-link').off("click").on('click', function(event) {
			event.preventDefault();
			$('.nav-menu-li a').removeClass('active');
			$(this).addClass('active');

			$('#section').load('views/pract_lab.html');

			if($(window).width() < 961)
				$('#panelToogleBtn').trigger('click');
		});
		
		$('#cons-link').off("click").on('click', function(event) {
			event.preventDefault();
			$('.nav-menu-li a').removeClass('active');
			$(this).addClass('active');

			$('#section').load('views/consultas.html');

			if($(window).width() < 961)
				$('#panelToogleBtn').trigger('click');
		});
		
		$('#eval-link').off("click").on('click', function(event) {
			event.preventDefault();
			$('.nav-menu-li a').removeClass('active');
			$(this).addClass('active');

			$('#section').load('views/evaluacion.html');

			if($(window).width() < 961)
				$('#panelToogleBtn').trigger('click');
		});
		
		$('#rank-link').off("click").on('click', function(event) {
			event.preventDefault();
			$('.nav-menu-li a').removeClass('active');
			$(this).addClass('active');

			$('#section').load('views/ranking.html');

			if($(window).width() < 961)
				$('#panelToogleBtn').trigger('click');
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

			if($(window).width() < 961)
				$('#panelToogleBtn').trigger('click');
		});
		
		$('#mgrp-link').off("click").on('click', function(event) {
			event.preventDefault();
			$('.nav-menu-li a').removeClass('active');
			$(this).addClass('active');

			$('#section').load('views/mis_grupos.html');

			if($(window).width() < 961)
				$('#panelToogleBtn').trigger('click');
		});
		
		$('#grps-link').off("click").on('click', function(event) {
			event.preventDefault();
			$('.nav-menu-li a').removeClass('active');
			$(this).addClass('active');

			$('#section').load('views/grupos.html');

			if($(window).width() < 961)
				$('#panelToogleBtn').trigger('click');
		});
		
		$('#mtrs-link').off("click").on('click', function(event) {
			event.preventDefault();
			$('.nav-menu-li a').removeClass('active');
			$(this).addClass('active');

			$('#section').load('views/materias.html');

			if($(window).width() < 961)
				$('#panelToogleBtn').trigger('click');
		});
		
		$('#usrs-link').off("click").on('click', function(event) {
			event.preventDefault();
			$('.nav-menu-li a').removeClass('active');
			$(this).addClass('active');

			$('#section').load('views/usuarios.html');

			if($(window).width() < 961)
				$('#panelToogleBtn').trigger('click');
		});

		$('#labs-link').off("click").on('click', function(event) {
			event.preventDefault();
			$('.nav-menu-li a').removeClass('active');
			$(this).addClass('active');

			$('#section').load('views/laboratorios.html');

			if($(window).width() < 961)
				$('#panelToogleBtn').trigger('click');
		});

		$('#conf-link').off("click").on('click', function(event) {
			event.preventDefault();
			$('.nav-menu-li a').removeClass('active');
			$(this).addClass('active');

			$('#section').load('views/config.html');

			if($(window).width() < 961)
				$('#panelToogleBtn').trigger('click');
		});
		
		$('#serv-link').off("click").on('click', function(event) {
			event.preventDefault();
			$('.nav-menu-li a').removeClass('active');
			$(this).addClass('active');

			$('#section').load('views/servidor.html');

			if($(window).width() < 961)
				$('#panelToogleBtn').trigger('click');
		});
		
		$('#cses-link').off("click").on('click', function(event) {
			event.preventDefault();
			$.removeCookie(SESSION_COOKIE);
			location.reload();
		});	
	}

})(jQuery);