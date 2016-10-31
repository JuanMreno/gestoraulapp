
(function($) {
	var loadIntervaId;

	function loginInit() {
		$('button').click(function(event) {
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
							$.cookie(SESSION_COOKIE, user);
							goToMain();
						}
						else{
							alert("Nombre o Usuario inválido, intenta de nuevo.");
							restartButton();
						}
					}
					else{
						alert("Nombre o Usuario inválido, intenta de nuevo.");
						restartButton();
					}
					//alert("Nombre o Usuario inválido, intenta de nuevo.")
					//clearInterval(loadIntervaId);
					//$.cookie(SESSION_COOKIE, {id:"1",name:"Oscar Moreno",rol:"pro-rol",rolName:"Profesor"});
					//goToMain();
				})
				.error(function(e) {
					console.log("Error ajax.");
					restartButton();
				});
			}
			else{
				alert("Todos los campos son requeridos.");
				restartButton();
			}
			//$('body').removeClass('in-login');
			//$('#cont').load('views/main.html');
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
		$('#cont').load('views/main.html',function(){

		});
	}

	loginInit();
	//goToMain();
})(jQuery);