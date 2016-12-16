
(function($) {
	var loadIntervaId;

	function loginInit() {
		$('#loginBtn').click(function(event) {
			event.preventDefault();
			$(this).attr("disabled","true");

			var user = $('#userInput').val();
			var pass = $('#passInput').val();

			if(user != "" && pass != ""){
				var data = {
					user:user,
					pass:calcMD5(pass)
				}

				var jData = utf8_to_b64( JSON.stringify(data) );
				$.ajax({
					url: CON_URL+"login",
					data:{data:jData},
					beforeSend: function( xhr ) {
						$('#loginBtn').text('Iniciando.');
						loadIntervaId = setInterval(loginLoader, 400);
					}
				})
				.done(function( data ) {
					
					var res = $.parseJSON(b64_to_utf8(data));
					
					if(res.status == "true"){
						if(res.data.length == 1){
							var user = res.data[0];
							clearInterval(loadIntervaId);

							if(user.rol != SAD_ROL && user.rol != ADM_ROL){
								if( user.license != '0' || parseInt(user.offlineAttempts) <= 0 ){

									var mns = "";
									if(parseInt(user.offlineAttempts) <= 0){
										mns = "Parece que ha pasado mucho tiempo desde la última vez que la licencia fue verificada. \
												Es necesario conectar el equipo servidor del profesor a Internet y reiniciar la aplicación \
												Gestor de aula CloudLabs.";
									}
									else{
										var licState = getLicenseStateStr(user.license);
										mns = "Hay un problema con la licencia del gestor de aula, por favor comuníquese con el proveedor.";
									}

									$('#alertModalCont').text(mns);
									$('#alertModal').modal('show');
									restartButton();
									return;
								}
							}

							console.log(user);

							user.pass = calcMD5(pass);
							console.log(user);
							$.cookie(SESSION_COOKIE, user);
							goToMain();
						}
						else{
							$('#alertModalCont').text("Nombre o Usuario inválido, intenta de nuevo.");
							$('#alertModal').modal('show');
							restartButton();
						}
					}
					else{
						$('#alertModalCont').text("Nombre o Usuario inválido, intenta de nuevo.");
						$('#alertModal').modal('show');
						restartButton();
					}
				})
				.error(function(e) {
					console.log("Error ajax.");
					restartButton();
				});
			}
			else{
				$('#alertModalCont').text("Todos los campos son requeridos.");
				$('#alertModal').modal('show');
				restartButton();
			}
		});
	}

	function restartButton() {
		$('#loginBtn').removeAttr("disabled");
		$('#loginBtn').text('Iniciar Sesión');
		clearInterval(loadIntervaId);
	}

	function loginLoader() {
		$loginBtn = $('#loginBtn');

		switch($loginBtn.text().length){
			case 10:
				$loginBtn.text("Iniciando..");
				break;
			case 11:
				$loginBtn.text("Iniciando...");
				break;
			case 12:
				$loginBtn.text("Iniciando....");
				break;
			case 13:
				$loginBtn.text("Iniciando.");
				break;
			default:
				break;
		}
	}

	function goToMain(){
		$('body').removeClass('in-login');
		$('#cont').load('views/main.html');
	}

	loginInit();

	console.log($(window).width());   // returns width of browser viewport
	console.log($(window).height());   // returns height of browser viewport
	
	console.log($(document).width());
	console.log($(document).height()); // returns height of HTML document
	//goToMain();
})(jQuery);