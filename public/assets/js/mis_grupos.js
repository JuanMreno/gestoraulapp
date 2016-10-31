
(function($) {

	function init() {
	    setGroupsTable();
	}

	init();

	function setGroupsTable() {
		$("#jsGrid").jsGrid({
            width: "100%",
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
                    console.log(filter);
                    var d = $.Deferred();
                    var session = $.cookie(SESSION_COOKIE);

                    var data = {
                        userId:session.id
                    };
     
                    var jData = utf8_to_b64( JSON.stringify(data) );
                    $.ajax({
                        url: CON_URL+"groups/getAll",
                        data:{data:jData}
                    }).done(function(data) {
                        var res = $.parseJSON(b64_to_utf8(data));

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

                    var data = {
                        userId:session.id,
                        groupId:item.id,
                        asignado:item.asignado
                    };
     
                    var jData = utf8_to_b64( JSON.stringify(data) );
                    $.ajax({
                        url: CON_URL+"groups/asignUser",
                        data:{data:jData}
                    }).done(function(data) {
                        //var res = $.parseJSON(b64_to_utf8(data));
                        //console.log(res);
                        d.resolve(item);
                    }).fail(function(data) {
                        console.log("ajax fail");
                        item.asignado = (item.asignado == 0) ? 1 : 0;
                        d.resolve(item);
                    });
     
                    return d.promise();
                }
            },

            pagerFormat: "Pag {first} {prev} {pages} {next} {last}    {pageIndex} de {pageCount}",
            pagePrevText: " < ",
		    pageNextText: " > ",
		    pageFirstText: " << ",
		    pageLastText: " >> ",

            fields: [ 
                { name: "name", type: "text", align: "center", title: "Nombre", editing:false },
                { name: "asignado", type: "checkbox", align: "center", title: "Asignado" },
            	{ type: "control" }
            ]
        });
	}

})(jQuery);