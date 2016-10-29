
(function($) {

	function init() {
	    setTableAnun();
	}

	init();

	function setTableAnun() {
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
            controller: dbAnun,

            pagerFormat: "Pag {first} {prev} {pages} {next} {last}    {pageIndex} de {pageCount}",
            pagePrevText: " < ",
		    pageNextText: " > ",
		    pageFirstText: " << ",
		    pageLastText: " >> ",

            fields: [
             	{ name: "Titulo", type: "text", align: "center", width: 250, editing: true },
	            { name: "Contenido", type: "textarea", align: "center", width: 400, editing: true },
	            { name: "Fecha", type: "text", align: "center", width: 100, editing: false },
            	{ type: "control" }
            ]
        });
	}

})(jQuery);