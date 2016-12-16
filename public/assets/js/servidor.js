(function($) {
    var rankState;
    function init() {
        getParams();
    }

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
                $("#country").val(dt[1].value);
                $("#city").val(dt[2].value);

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