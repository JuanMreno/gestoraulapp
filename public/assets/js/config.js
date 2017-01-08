
(function($) {
    var rankState;
    var licenseState;
    var ipServer;
    var macServer;
    var curLicense;

    var countriesData = [];
    var citiesData = [];

    $(document).ready(function() {
        $('.spanTitCont').text(locale.page_title_uc);
        $('.containerHeader').find('h1').text(locale.confg_title);

        $('#updateParams').text(locale.save);
        $('#licInfoLabel').text(locale.confg_label_8);
        $('.newLicLabel').text(locale.confg_label_9);
        $('#btnLic').text(locale.confg_label_10);
        $('#closeBtn').text(locale.close);

        $('label[for="nameSchool"]').text(locale.confg_label_1);
        $('#nameSchool').attr('placeholder', locale.confg_label_1);

        $('label[for="country"]').text(locale.confg_label_2);

        $('label[for="city"]').text(locale.confg_label_3);

        $('label[for="servName"]').text(locale.confg_label_4);
        $('#servName').attr('placeholder', locale.confg_label_4);

        $('label[for="license"]').text(locale.confg_label_5);

        $('label[for="licenseState"]').text(locale.confg_label_6);

        $('label[for="ranking"]').text(locale.confg_label_7);
    });

    function init() {
        getCities();

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
                    $('#alertModalCont').text(locale.all_fields);
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
                                mns = locale.success_msg_2;
                                break;
                            case 1:
                                mns = locale.license_state_msg_1;
                                break;
                            case 2:
                                mns = locale.license_state_msg_2;
                                break;
                            case 3:
                                mns = locale.license_state_msg_3;
                                break;
                            case 4:
                                mns = locale.license_state_msg_4;
                                break;
                            case 5:
                                mns = locale.license_state_msg_5;
                                break;
                            case 6:
                                mns = locale.license_state_msg_6;
                                break;
                            default:
                                mns = locale.license_state_msg_error;
                                break;
                        }

                        $('#alertModalCont').text(mns);
                        $('#alertModal').modal('show');
                    }
                    else{
                        $('#alertModalCont').text(locale.error_license);
                        $('#alertModal').modal('show');
                    }
                })
                .error(function(e) {
                    console.log("Error ajax.");
                    $('#alertModalCont').text(locale.error_license);
                    $('#alertModal').modal('show');
                });


            });

            $modal.modal('show');
        });

        $('#countrySelect').html("");
        $('#countrySelect').select2({
          data: [],
          placeholder: locale.none_data
        });  

        $('#citySelect').html("");
        $('#citySelect').select2({
          data: [],
          placeholder: locale.none_data
        });  
    }

    init();

    $('#updateParams').off("click").on('click', function(event) {
        var nameSchool =$('#nameSchool').val();
        var country =$('#countrySelect').val();
        var city=$('#citySelect').val();
        var license =$('#license').val();
        var servName =$('#servName').val();
        var ranking =rankState;

        console.log($('#ranking').bootstrapSwitch().state);
        if (nameSchool == "" || country == "" || city == "" || servName == "") {
            $('#alertModalCont').text(locale.error_user_7);
            $('#alertModal').modal('show');
        } else {
            var data = {
                schoolName:nameSchool,
                country:country,
                city:city,
                license:license,
                rank:ranking,
                servName:servName
            };

            var jxData = utf8_to_b64( JSON.stringify(data) );
            $.ajax({
                url: CON_URL+"app/edit",
                data:{data:jxData}
            }).done(function(data) {
                var res = $.parseJSON(b64_to_utf8(data));
                var dt = res.data;
                if(res.status == "true"){
                    $('#alertModalCont').text(locale.success_msg_1);
                    $('#alertModal').modal('show');
                    getParams();
                }
                else{
                    $('#alertModalCont').text(locale.error_try_again);
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
            console.log(dt);
            if(res.status == "true"){
                $("#nameSchool").val(dt[0].value);
                $("#license").val(dt[3].value);

                if(dt[5].value != null)
                    $("#servName").val(dt[5].value);

                if(dt[1].value == null || dt[1].value == ''){
                    $('#countrySelect').val(-1).trigger('change');
                }
                else{
                    $('#countrySelect').val(dt[1].value).trigger('change');

                    var cdata = {
                        countryId:dt[1].value,
                    };
                    var jxData = utf8_to_b64( JSON.stringify(cdata) );
                    $.ajax({
                        url: CON_URL+"cities/getCities",
                        data:{data:jxData}
                    }).done(function(dataCount) {
                        var res = $.parseJSON(b64_to_utf8(dataCount));
                                                
                        if(res.status == "true"){
                            $('#citySelect').select2({
                                placeholder: {
                                    id: -1,
                                    text: locale.sel
                                },
                                data: res.data
                            }); 
                            citiesData = res.data;

                            if(dt[2].value == null || dt[2].value == '')
                                $('#citySelect').val(-1).trigger('change');
                            else
                                $('#citySelect').val(dt[2].value).trigger('change');
                        }
                        
                    }).fail(function(data) {
                        console.log("ajax fail");
                    });
                }

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

    function getCities() {
        var jxData = utf8_to_b64( JSON.stringify({}) );
        $.ajax({
            url: CON_URL+"cities/getCountries",
            data:{data:jxData}
        }).done(function(data) {
            var res = $.parseJSON(b64_to_utf8(data));
            var dt = res.data;
            console.log(res);
            if(res.status == "true"){
                $('#countrySelect').select2({
                    placeholder: {
                        id: -1,
                        text: locale.sel
                    },
                    data: res.data
                });  
                countriesData = res.data;

                $("#countrySelect").on("select2:select", function (e) { 
                    var cdata = {
                        countryId:e.params.data.id,
                    };
                    var jxData = utf8_to_b64( JSON.stringify(cdata) );
                    $.ajax({
                        url: CON_URL+"cities/getCities",
                        data:{data:jxData}
                    }).done(function(dataCount) {
                        var res = $.parseJSON(b64_to_utf8(dataCount));

                        if(res.status == "true"){
                            $('#citySelect').select2({
                                placeholder: {
                                    id: -1,
                                    text: locale.sel
                                },
                                data: res.data
                            }); 
                            citiesData = res.data;

                            $('#citySelect').val(-1).trigger('change');
                            /*
                            if(dt[2].value == null || dt[2].value == '')
                                $('#citySelect').val(-1).trigger('change');
                            else
                                $('#citySelect').val(dt[2].value).trigger('change');
                            */
                        }
                    }).fail(function(data) {
                        console.log("ajax fail");
                    });
                });

                getParams(); 
            }
            
        }).fail(function(data) {
            console.log("ajax fail");
        });
    }

    function getLicenseStateStr(licenseState){
        var stateStr = "-";
        switch(licenseState){
            case '0':
                stateStr = locale.license_state_0;
                break;
            case '1':
                stateStr = locale.license_state_1;
                break;
            case '2':
                stateStr = locale.license_state_2;
                break;
            case '3':
                stateStr = locale.license_state_3;
                break;
            case '4':
                stateStr = locale.license_state_4;
                break;
            case '5':
                stateStr = locale.license_state_5;
                break;
            case '6':
                stateStr = locale.license_state_6;
                break;
            default:
                break;
        }

        return stateStr;
    }

})(jQuery);