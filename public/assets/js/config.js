
(function($) {
    var rankState;
    var licenseState;
    var ipServer;
    var curLicense;

    function init() {
        getParams();

        $('#license').on('focus', function(event) {
            event.preventDefault();
            /* Act on the event */

            $modal = $('#licModal');
            $modal.off('shown.bs.modal');

            $labelState = $modal.find(".labelState");   

            if(licenseState == '1'){
                $labelState.removeClass('label-danger');
                $labelState.addClass("label").addClass('label-success');
                $labelState.text("Activa");
            }                    
            else{
                $labelState.removeClass('label-success');
                $labelState.addClass("label").addClass('label-danger');
                $labelState.text("Caducada");
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

                if(license == curLicense){
                    $('#alertModalCont').text("Esta es la licencia actual.");
                    $('#alertModal').modal('show');
                    return;
                }

                //if(ipServer == null) return;

                var data = {
                    license:license,
                    serverIp:ipServer,
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
                        if(res.license_status == "true"){
                            $('#alertModalCont').text("Licencia validada con éxito.");
                            $('#alertModal').modal('show');
                        }
                        else{
                            var errorCode = res.data.message_id;
                            var mns = "";

                            switch(errorCode){
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
                $("#license").val(dt[3].value);

                ipServer = dt[6].value;
                licenseState = dt[10].value;
                curLicense = dt[3].value;

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

})(jQuery);