
var SESSION_COOKIE = "session";
var PRO_ROL = 'pro-rol';
var EST_ROL = 'est-rol';
var ADM_ROL = 'adm-rol';
var SAD_ROL = 'sad-rol';
var CON_URL = "http://"+window.location.hostname+":3000/";
var RANKING_WEB = "http://ranking.indesap.com/";

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
		//$.cookie(SESSION_COOKIE, {id:"1",name:"Oscar Moreno",rol:"pro-rol",rolName:"Profesor"});
		var sesion = $.cookie(SESSION_COOKIE);

		// Disable animations/transitions until the page has loaded.
		$body.addClass('is-loading');

		$window.on('load', function() {
			$body.removeClass('is-loading');

			if(sesion == undefined){
				gToLogin();
			}
			else{
				validateLogin();
			}
			//$('#cont').load('views/main.html',mainInit);
		});
	});
})(jQuery);

function validateLogin() {
	var sesion = $.cookie(SESSION_COOKIE);

	var data = {
		user:sesion.user,
		pass:sesion.pass
	}

	var jData = utf8_to_b64( JSON.stringify(data) );
	$.ajax({
		url: CON_URL+"login",
		data:{data:jData}
	})
	.done(function( data ) {
		
		var res = $.parseJSON(b64_to_utf8(data));
		
		if(res.status == "true"){
			if(res.data.length == 1){
				var user = res.data[0];

				if( user.license != '0' ){
					gToLogin();
					return;
				}

				if(user.rol != SAD_ROL && user.rol != ADM_ROL){
					if( user.license != '0' || parseInt(user.offlineAttempts) <= 0 ){
						gToLogin();
						return;
					}
				}

				gToMain();
			}
			else{
				gToLogin();
			}
		}
		else{
			gToLogin();
		}
	})
	.error(function(e) {
		console.log("Error ajax.");
		gToLogin();
	});
}

function getLicenseStateStr(licenseState){
    var stateStr = "-";
    switch(licenseState){
        case '0':
            stateStr = "Activa";
            break;
        case '1':
            stateStr = "Inválida";
            break;
        case '2':
            stateStr = "Inactiva";
            break;
        case '3':
            stateStr = "Desactivada";
            break;
        case '4':
            stateStr = "Caducada";
            break;
        case '5':
            stateStr = "Aplicación no soportada";
            break;
        case '6':
            stateStr = "Límite alcanzado";
            break;
        default:
            break;
    }

    return stateStr;
}

function gToMain() {
	$('body').removeClass('in-login');
	$('#cont').load('views/main.html');
}

function gToLogin() {
	$.removeCookie(SESSION_COOKIE);
	$('#cont').load('views/login.html');
}

function utf8_to_b64( str ) {
  return window.btoa(unescape(encodeURIComponent( str )));
}

function b64_to_utf8( str ) {
  return decodeURIComponent(escape(window.atob( str )));
}