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
                $("#serverName").val(dt[5].value);
                $("#serverIp").val(dt[6].value);
                $("#deviceName").val(dt[7].value);
                $("#numLic").val(dt[3].value);
                $("#licenseState").val(getLicenseStateStr(dt[10].value));
            }
            
        }).fail(function(data) {
            console.log("ajax fail");
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
            case '3':
                stateStr = "Inactiva";
                break;
            case '4':
                stateStr = "Desactivada";
                break;
            case '5':
                stateStr = "Caducada";
                break;
            case '6':
                stateStr = "Aplicación no soportada";
                break;
            case '7':
                stateStr = "Límite alcanzado";
                break;
            default:
                break;
        }

        return stateStr;
    }

})(jQuery);