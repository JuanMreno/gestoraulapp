
(function($) {

	function init() {
	    setSubjectsTable();
	}

	init();

    var subData = [];
	function setSubjectsTable() {
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
                    };
     
                    var jData = utf8_to_b64( JSON.stringify(data) );
                    $.ajax({
                        url: CON_URL+"subjects/getAll",
                        data:{data:jData}
                    }).done(function(data) {
                        var res = $.parseJSON(b64_to_utf8(data));

                        subData = dt;
                        var dt = res.data;
                        var dataFiltered = $.grep(dt, function(obj) {
                            return (!filter.name || obj.name.indexOf(filter.name) > -1)
                                && (filter.asignado === undefined || Boolean(obj.asignado) === filter.asignado);
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
                        d.resolve([]);
                        $("#jsGrid").jsGrid("render");
                    });

                    if(item.name == ""){
                        $('#alertModalCont').text("Todos los campos son necesarios.");
                        $('#alertModal').modal('show');
                        d.reject();
                    }
                    else{
                        var data = {
                            subId:item.id,
                            name:item.name
                        };
         
                        var jData = utf8_to_b64( JSON.stringify(data) );
                        $.ajax({
                            url: CON_URL+"subjects/edit",
                            data:{data:jData}
                        }).done(function(data) {
                            var res = $.parseJSON(b64_to_utf8(data));

                            if(res.status == "true")
                                d.resolve(item);
                            else{
                                if(res.data.state == "REPEATED"){
                                    $('#alertModalCont').text("La materia ya ha sido registrada.");
                                    $('#alertModal').modal('show');
                                }
                                else{
                                    $('#alertModalCont').text("Error al intentar registrar la materia.");
                                    $('#alertModal').modal('show');
                                }
                                d.reject();
                                //d.resolve(false);
                            }
                        }).fail(function(data) {
                            console.log("ajax fail");
                            item.asignado = (item.asignado == 0) ? 1 : 0;
                            $('#alertModalCont').text("Error al intentar registrar la materia.");
                            $('#alertModal').modal('show');
                            d.resolve(item);
                        });
                    }

                    return d.promise();
                },
                insertItem: function(item) {
                    item.date = moment().format("DD/MM/YYYY");
                    var d = $.Deferred();
                    var session = $.cookie(SESSION_COOKIE);

                    d.fail(function() {
                        d.resolve([]);
                        $("#jsGrid").jsGrid("render");
                    });

                    if(item.name == ""){
                        $('#alertModalCont').text("Todos los campos son necesarios.");
                        $('#alertModal').modal('show');
                        d.reject();
                    }
                    else{
                        var data = {
                            name:item.name
                        };
                        var jData = utf8_to_b64( JSON.stringify(data) );
                        $.ajax({
                            url: CON_URL+"subjects/insert",
                            data:{data:jData}
                        }).done(function(data) {
                            var res = $.parseJSON(b64_to_utf8(data));

                            if(res.status == "true")
                                d.resolve(item);
                            else{
                                if(res.data.state == "REPEATED"){
                                    $('#alertModalCont').text("La materia ya ha sido registrada.");
                                    $('#alertModal').modal('show');
                                }
                                else{
                                    $('#alertModalCont').text("Error al intentar registrar la materia.");
                                    $('#alertModal').modal('show');
                                }
                                d.reject();
                                //d.resolve(false);
                            }
                        }).fail(function(data) {
                            console.log("ajax fail");
                            $('#alertModalCont').text("Error al intentar registrar la materia.");
                            $('#alertModal').modal('show');
                            d.reject();
                        });
                    }

                    return d.promise();
                }
            },

            pagerFormat: "Pag {first} {prev} {pages} {next} {last}    {pageIndex} de {pageCount}",
            pagePrevText: " < ",
		    pageNextText: " > ",
		    pageFirstText: " << ",
		    pageLastText: " >> ",

            fields: [ 
                { name: "name", type: "text", align: "center", title: "Nombre", editing:true},
            	{ type: "control" }
            ]
        });
	}

})(jQuery);