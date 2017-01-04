(function($) {
    var rankState;
    function init() {
        getParams();
    }

    $(document).ready(function() {
        $('.spanTitCont').text(locale.page_title_uc);
        $('.containerHeader').find('h1').text(locale.serv_title);

        $('label[for="nameSchool"]').text(locale.serv_label_1);
        $('label[for="country"]').text(locale.serv_label_2);
        $('label[for="city"]').text(locale.serv_label_3);
        $('label[for="serverName"]').text(locale.serv_label_4);
        $('label[for="serverIp"]').text(locale.serv_label_5);
        $('label[for="offlineExes"]').text(locale.serv_label_6);
        $('label[for="numLic"]').text(locale.serv_label_7);
        $('label[for="licenseState"]').text(locale.serv_label_8);

        $('#nameSchool').attr('placeholder',locale.serv_label_1);
        $('#country').attr('placeholder',locale.serv_label_2);
        $('#city').attr('placeholder',locale.serv_label_3);

    });

    init();

    function getParams() {
        var data = {
        };
        var jxData = utf8_to_b64( JSON.stringify(data) );
        $.ajax({
            url: CON_URL+"app/getParams",
            data:{data:jxData}
        }).done(function(data) {
            var res = $.parseJSON(b64_to_utf8(data));
            var dt = res.data;
            if(res.status == "true"){
                $("#nameSchool").val(dt[0].value);
                $("#country").val(dt[14].value);
                $("#city").val(dt[15].value);

                $("#serverName").val(dt[5].value);
                $("#serverIp").val(dt[6].value);
                $("#offlineExes").val(dt[11].value);
                $("#numLic").val(dt[3].value);
                $("#licenseState").val(getLicenseStateStr(dt[10].value));
            }
            
        }).fail(function(data) {
            console.log("ajax fail");
        });
    }

})(jQuery);