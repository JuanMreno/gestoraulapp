
(function($) {
	var loadIntervaId;

	$('.loginTitle').text(locale.page_title);
	$('#loginBtn').text(locale.login_1);
	$('#userInput').attr('placeholder', locale.user);
	$('#passInput').attr('placeholder', locale.pass);


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
						$('#loginBtn').text(locale.starting + '.');
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
									if(user.license != '0'){
										var licState = getLicenseStateStr(user.license);
										mns = locale.license_exp_1;
									}
									else{
										mns = locale.license_exp_2;
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
							$('#alertModalCont').text(locale.login_exp_1);
							$('#alertModal').modal('show');
							restartButton();
						}
					}
					else{
						$('#alertModalCont').text(locale.error_try_again);
						$('#alertModal').modal('show');
						restartButton();
					}
				})
				.error(function(e) {
					$('#alertModalCont').text(locale.error_try_again);
					$('#alertModal').modal('show');
					restartButton();
				});
			}
			else{
				$('#alertModalCont').text(locale.all_fields);
				$('#alertModal').modal('show');
				restartButton();
			}
		});
	}

	function restartButton() {
		$('#loginBtn').removeAttr("disabled");
		$('#loginBtn').text(locale.login_1);
		clearInterval(loadIntervaId);
	}

	function loginLoader() {
		$loginBtn = $('#loginBtn');

		switch($loginBtn.text().length){
			case 10:
				$loginBtn.text(locale.starting + "..");
				break;
			case 11:
				$loginBtn.text(locale.starting + "...");
				break;
			case 12:
				$loginBtn.text(locale.starting + "....");
				break;
			case 13:
				$loginBtn.text(locale.starting + ".");
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