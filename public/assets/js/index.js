
var SESSION_COOKIE = "session";
var PRO_ROL = 'pro-rol';
var EST_ROL = 'est-rol';
var ADM_ROL = 'adm-rol';
var SAD_ROL = 'sad-rol';;

(function($) {

	skel.breakpoints({
		wide: '(min-width: 961px) and (max-width: 1880px)',
		normal: '(min-width: 961px) and (max-width: 1620px)',
		narrow: '(min-width: 961px) and (max-width: 1320px)',
		narrower: '(max-width: 960px)',
		mobile: '(max-width: 736px)'
	});

	$(function() {
		var	$window = $(window),
			$body = $('body');

		$.cookie.json = true;

		//$.cookie(SESSION_COOKIE, {id:"1",name:"Juan Camilo",rol:"est-rol",rolName:"Estudiante"});
		$.cookie(SESSION_COOKIE, {id:"1",name:"Oscar Moreno",rol:"pro-rol",rolName:"Profesor"});
		var sesion = $.cookie(SESSION_COOKIE);

		// Disable animations/transitions until the page has loaded.
		$body.addClass('is-loading');

		$window.on('load', function() {
			$body.removeClass('is-loading');

			if(sesion == undefined){
				$('#cont').load('views/login.html');
			}
			else{
				$('body').removeClass('in-login');
				$('#cont').load('views/main.html',function(){

				});
			}
			//$('#cont').load('views/main.html',mainInit);
		});
	});
})(jQuery);