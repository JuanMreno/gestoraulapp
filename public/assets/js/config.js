
(function($) {
    var rankState;
    var licenseState;
    var ipServer;
    var macServer;
    var curLicense;

    function init() {
        getParams();

        $('#license').on('focus', function(event) {
            event.preventDefault();
            /* Act on the event */

            $modal = $('#licModal');
            $modal.off('shown.bs.modal');

            $modal.off('hidden.bs.modal').on('hidden.bs.modal', function(event) {
                event.preventDefault();
                getParams();
            });

            $labelState = $modal.find(".labelState");   

            if(licenseState == '0'){
                $labelState.removeClass('label-danger');
                $labelState.addClass("label").addClass('label-success');
                $labelState.text("Activa");
            }                    
            else{
                $labelState.removeClass('label-success');
                $labelState.addClass("label").addClass('label-danger');
                $labelState.text(getLicenseStateStr(licenseState));
            }

            $('#licenseVal').val("");
            $('#btnLic').on('click', function(event) {
                event.preventDefault();

                var license = $('#licenseVal').val();

                if(license == ""){
                    $('#alertModalCont').text("Todos los campos son necesarios.");
                    $('#alertModal').modal('show');
                    return;
                }

                //if(ipServer == null) return;

                var data = {
                    license:license,
                    macServer:macServer,
                    firstTime:'true'
                }

                var jData = utf8_to_b64( JSON.stringify(data) );
                $.ajax({
                    url: CON_URL+"license/activate",
                    data:{data:jData}
                })
                .done(function( data ) {
                    
                    var res = $.parseJSON(b64_to_utf8(data));

                    if(res.status == "true"){
                        var resCode = res.data.message_id;
                        var mns = "";

                        switch(resCode){
                            case 0:
                                mns = "Licencia validada con éxito.";
                                break;
                            case 1:
                                mns = "El número de licencia con el que se ha activado el producto es inválido. Por favor comuníquese con su proveedor.";
                                break;
                            case 2:
                                mns = "Su licencia aún no ha sido activada. Por favor comuníquese con su proveedor.";
                                break;
                            case 3:
                                mns = "Su licencia ha sido desactivada. Por favor comuníquese con su proveedor.";
                                break;
                            case 4:
                                mns = "Su licencia ha caducado. Por favor comuníquese con su proveedor.";
                                break;
                            case 5:
                                mns = "La licencia adquirida no permite ejecutar esta aplicación. Por favor comuníquese con su proveedor.";
                                break;
                            case 6:
                                mns = "Se ha excedido el número de activaciones permitidas por su licencia. Por favor comuníquese con su proveedor.";
                                break;
                            default:
                                mns = "La licencia no pudo ser validada.";
                                break;
                        }

                        $('#alertModalCont').text(mns);
                        $('#alertModal').modal('show');
                    }
                    else{
                        $('#alertModalCont').text("Opps, parece que algo ha fallado en la conexión a Internet o con los servidores CloudLabs. Presione el botón VALIDAR para intentarlo de nuevo o CANCELAR para cerrar la aplicación.");
                        $('#alertModal').modal('show');
                    }
                })
                .error(function(e) {
                    console.log("Error ajax.");
                    $('#alertModalCont').text("Opps, parece que algo ha fallado en la conexión a Internet o con los servidores CloudLabs. Presione el botón VALIDAR para intentarlo de nuevo o CANCELAR para cerrar la aplicación.");
                    $('#alertModal').modal('show');
                });


            });

            $modal.modal('show');
        });
    }

    init();

    $('#updateParams').off("click").on('click', function(event) {
        var nameSchool =$('#nameSchool').val();
        var country =$('#country').val();
        var city=$('#city').val();
        var license =$('#license').val();
        var ranking =rankState;

        console.log($('#ranking').bootstrapSwitch().state);
        if (nameSchool == "" || country == "" || city == "" || license == "") {
            $('#alertModalCont').text("Todos los valores deben ser configurados.");
            $('#alertModal').modal('show');
        } else {
            var data = {
                schoolName:nameSchool,
                country:country,
                city:city,
                license:license,
                rank:ranking
            };

            var jxData = utf8_to_b64( JSON.stringify(data) );
            $.ajax({
                url: CON_URL+"app/edit",
                data:{data:jxData}
            }).done(function(data) {
                var res = $.parseJSON(b64_to_utf8(data));
                var dt = res.data;
                if(res.status == "true"){
                    $('#alertModalCont').text("Información cargada con éxito.");
                    $('#alertModal').modal('show');
                    getParams();
                }
                else{
                    $('#alertModalCont').text("No se han podido guardar los datos.");
                    $('#alertModal').modal('show');
                }
                
            }).fail(function(data) {
                console.log("ajax fail");
            });
        }
    });

    function getParams() {
        var data = {};
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
                $("#license").val(dt[3].value);

                ipServer = dt[6].value;
                curLicense = dt[3].value;
                macServer = dt[12].value;
                licenseState = dt[10].value;

                $("#licenseState").val(getLicenseStateStr(licenseState));

                if (dt[4].value == 1) {
                    var xd = true;
                    rankState = true;
                } else {
                    var xd = false;
                    rankState = false;
                }
                $("#ranking").bootstrapSwitch({
                    offColor:"danger",
                    onColor:"success",
                    state:xd
                });
                $('#ranking').on('switchChange.bootstrapSwitch', function(event, state) {
                    rankState = state;
                });
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

})(jQuery);