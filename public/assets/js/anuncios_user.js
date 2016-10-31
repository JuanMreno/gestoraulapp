
(function($) {

	function init() {
        setTableAnun()
	}

	init();

	function setTableAnun() {
		$("#jsGrid").jsGrid({
            width: "100%",
            filtering: true,
            sorting: true,
            paging: true,
            autoload: true,
            confirmDeleting: false,
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
                        url: CON_URL+"messages/getByUserId",
                        data:{data:jData}
                    }).done(function(data) {
                        var res = $.parseJSON(b64_to_utf8(data));

                        var dt = res.data;
                        var dataFiltered = $.grep(dt, function(obj) {
                            return (!filter.title || obj.title.indexOf(filter.title) > -1)
                                && (!filter.content || obj.content.indexOf(filter.content) > -1)
                                && (!filter.date || obj.date.indexOf(filter.date) > -1);
                        });

                        d.resolve(dataFiltered);
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

            fields: [
             	{ name: "title", type: "text", align: "center", width: 250, filtering: true, inserting:true, editing: true, title:"Título" },
	            { name: "content", type: "text", align: "center", width: 400, filtering: true, inserting:true, editing: true, title:"Contenido" },
	            { name: "date", type: "text", align: "center", width: 100, filtering: true, inserting:false, editing: false, title:"Fecha" },
            	{ type: "control" }
            ]
        });
	}

})(jQuery);