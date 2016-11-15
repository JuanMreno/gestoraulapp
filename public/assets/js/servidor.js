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
            url: CON_URL+"app/getParamsFix",
            data:{data:jxData}
        }).done(function(data) {
            var res = $.parseJSON(b64_to_utf8(data));
            var dt = res.data;
            if(res.status == "true"){
                $("#serverName").val(dt[0].value);
                $("#serverIp").val(dt[1].value);
                $("#licensePeriod").val(dt[2].value);
                $("#deviceName").val(dt[3].value);
                $("#numUsers").val(dt[4].value);
            }
            
        }).fail(function(data) {
            console.log("ajax fail");
        });
    }

})(jQuery);