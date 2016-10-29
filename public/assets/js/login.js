
(function($) {
	var loadIntervaId;

	function loginInit() {
		$('button').click(function(event) {
			event.preventDefault();
			$(this).attr("disabled","true");

			$('#loginBtn').text('Iniciando.');
			loadIntervaId = setInterval(loginLoader, 400);
			setTimeout( function(){ 
					clearInterval(loadIntervaId);
					$.cookie(SESSION_COOKIE, {id:"1",name:"Oscar Moreno",rol:"pro-rol",rolName:"Profesor"});
					goToMain();
				}, 4000);

			//$('body').removeClass('in-login');
			//$('#cont').load('views/main.html');
		});
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