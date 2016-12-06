
(function($) {
    var rankState;
    function init() {
        getParams();
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