
(function($) {

	function init() {
	    $('#tipoDropdown-profesores').off('click').on('click', function(event) {
            event.preventDefault();

            $('#tipoDropdown').html('Profesores  ' + '<span class="caret"></span>');
            $("#tipoDropdown").attr('data-sel-id','3'); 
            setUsersTable();
        });

        $('#tipoDropdown-estudiantes').off('click').on('click', function(event) {
            event.preventDefault();

            $('#tipoDropdown').html('Estudiantes  ' + '<span class="caret"></span>');
            $("#tipoDropdown").attr('data-sel-id','4'); 
            setUsersTable();  
        });

        $('#tipoDropdown').html('Profesores  ' + '<span class="caret"></span>');
        $("#tipoDropdown").attr('data-sel-id','3'); 
        setUsersTable();
	}

	init();

	function setUsersTable() {
        var rolId = $("#tipoDropdown").attr('data-sel-id'); 
        console.log(rolId);
		$("#jsGrid").jsGrid({
            width: "100%",
            inserting:true,
            filtering: true,
            sorting: true,
            paging: true,
            editing: true,
            autoload: true,
            pageSize: 10,
            pageButtonCount: 5,
            noDataContent: "Ningún dato encontrado.",
            loadMessage: "Cargando...",
            controller: {
                loadData: function(filter) {
                    var d = $.Deferred();
                    var session = $.cookie(SESSION_COOKIE);

                    var data = {
                        rolId:rolId
                    };
     
                    var jData = utf8_to_b64( JSON.stringify(data) );
                    $.ajax({
                        url: CON_URL+"users/getAll",
                        data:{data:jData}
                    }).done(function(data) {
                        var res = $.parseJSON(b64_to_utf8(data));

                        var dt = res.data;
                        var dataFiltered = $.grep(dt, function(obj) {
                            return (!filter.name || obj.name.indexOf(filter.name) > -1)
                                && (!filter.last_name || obj.last_name.indexOf(filter.last_name) > -1);
                        });

                        d.resolve(dataFiltered);
                    }).fail(function(data) {
                        console.log("ajax fail");
                        d.resolve([]);
                    });

                    return d.promise();
                },
                updateItem: function(item) {
                    var d = $.Deferred();
                    var session = $.cookie(SESSION_COOKIE);

                    d.fail(function() {
                        return null;
                        $("#jsGrid").jsGrid("render");
                    });

                    var data = {
                        id:item.id,
                        name:item.name,
                        last_name:item.last_name
                    };
     
                    var jData = utf8_to_b64( JSON.stringify(data) );
                    $.ajax({
                        url: CON_URL+"users/edit",
                        data:{data:jData}
                    }).done(function(data) {
                        var res = $.parseJSON(b64_to_utf8(data));
                        //console.log(res);
                        if(res.status == "true")
                            d.resolve(item);
                        else{
                            if(res.data.state == "REPEATED"){
                                alert("El usuario ya ha sido registrado.");
                            }
                            else{
                                alert("Error al intentar realizar el registro.");
                            }
                            d.reject();
                            //d.resolve(false);
                        }
                    }).fail(function(data) {
                        console.log("ajax fail");
                        alert("Error al intentar realizar el registro.");
                        d.reject();
                    });
     
                    return d.promise();
                },
                insertItem: function(item) {
                    item.date = moment().format("DD/MM/YYYY");
                    var d = $.Deferred();
                    var session = $.cookie(SESSION_COOKIE);

                    d.fail(function() {
                        return null;
                        $("#jsGrid").jsGrid("render");
                    });

                    var data = {
                        name:item.name,
                        last_name:item.last_name,
                        rolId:rolId
                    };
                    var jData = utf8_to_b64( JSON.stringify(data) );
                    $.ajax({
                        url: CON_URL+"users/insert",
                        data:{data:jData}
                    }).done(function(data) {
                        var res = $.parseJSON(b64_to_utf8(data));

                        if(res.status == "true")
                            d.resolve(item);
                        else{
                            if(res.data.state == "REPEATED"){
                                alert("El usuario ya ha sido registrado.");
                            }
                            else{
                                alert("Error al intentar realizar el registro.");
                            }
                            d.reject();
                            //d.resolve(false);
                        }
                    }).fail(function(data) {
                        console.log("ajax fail");
                        alert("Error al intentar realizar el registro.");
                        d.reject();
                    });

                    return d.promise();
                }
            },
            rowClick:function(obj) {
                console.log(obj.item);
            },

            pagerFormat: "Pag {first} {prev} {pages} {next} {last}    {pageIndex} de {pageCount}",
            pagePrevText: " < ",
		    pageNextText: " > ",
		    pageFirstText: " << ",
		    pageLastText: " >> ",

            fields: [ 
                { name: "name", type: "text", align: "center", title: "Nombre", editing:true },
                { name: "last_name", type: "text", align: "center", title: "Apellido", editing:true },
            	{ type: "control" }
            ]
        });
	}

})(jQuery);