
(function($) {

	function init() {
        var session = $.cookie(SESSION_COOKIE);

        if(session.rol != EST_ROL){
            $('#mRankBar').hide();
        }
	    setRankTable();
	}

	init();

	function setRankTable() {
		$("#jsGrid").jsGrid({
            width: "100%",
            filtering: true,
            sorting: true,
            paging: true,
            editting: true,
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
                        userId:session.id
                    };
     
                    var jData = utf8_to_b64( JSON.stringify(data) );
                    $.ajax({
                        url: CON_URL+"ranking/getByUser",
                        data:{data:jData}
                    }).done(function(data) {
                        var res = $.parseJSON(b64_to_utf8(data));

                        var dt = res.data;
                        var dataFiltered = $.grep(dt, function(obj) {
                            return (!filter.rank || obj.rank.indexOf(filter.rank) > -1)
                                && (!filter.name || obj.name.indexOf(filter.name) > -1);
                        });

                        d.resolve(dataFiltered);

                        res.data.forEach(function(e,i,a) {
                            if(e.user_id == session.id){
                                $('#userRank').text(e.rank);
                            }
                        });
                    }).fail(function(data) {
                        console.log("ajax fail");
                        d.resolve([]);
                    });

                    return d.promise();
                }
            },

            pagerFormat: "Pag {first} {prev} {pages} {next} {last}    {pageIndex} de {pageCount}",
            pagePrevText: " < ",
		    pageNextText: " > ",
		    pageFirstText: " << ",
		    pageLastText: " >> ",
            loadIndicator: {
                show: function() {
                },
                hide: function() {
                    $e = $(".jsgrid-header-row > .jsgrid-header-cell:eq(4)");
                    $e.attr({
                        "data-toggle": 'tooltip',
                        "data-container": 'body',
                        "title": 'Puntaje por calificaciones'
                    });

                    $e = $(".jsgrid-header-row > .jsgrid-header-cell:eq(5)");
                    $e.attr({
                        "data-toggle": 'tooltip',
                        "data-container": 'body',
                        "title": 'Puntaje por prácticas entregadas'
                    });

                    $e = $(".jsgrid-header-row > .jsgrid-header-cell:eq(6)");
                    $e.attr({
                        "data-toggle": 'tooltip',
                        "data-container": 'body',
                        "title": 'Puntaje por tiempos de entrega'
                    });

                    $e = $(".jsgrid-header-row > .jsgrid-header-cell:eq(7)");
                    $e.attr({
                        "data-toggle": 'tooltip',
                        "data-container": 'body',
                        "title": 'Puntaje total'
                    });

                    $('[data-toggle="tooltip"]').tooltip();
                }
            },

            fields: [
             	{ name: "rank", type: "text", align: "center", width: 30, title: "#" },
             	{ name: "name", type: "text", align: "center", width: 250, title: "Nombre" },
	            { name: "lab_qual_score", type: "text", align: "center", filtering: false, width: 30, title:"P" },
	            { name: "lab_num_score", type: "text", align: "center", filtering: false, width: 30, title:"A" },
	            { name: "tab_t_wasted_score", type: "text", align: "center", filtering: false, width: 30, title:"F" },
	            { name: "total_score", type: "text", align: "center", filtering: false, width: 30, title:"T" },
            	{ type: "control" }
            ]
        });
	}

})(jQuery);