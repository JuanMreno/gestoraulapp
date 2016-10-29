
(function($) {

	function init() {
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
            controller: dbEst,

            pagerFormat: "Pag {first} {prev} {pages} {next} {last}    {pageIndex} de {pageCount}",
            pagePrevText: " < ",
		    pageNextText: " > ",
		    pageFirstText: " << ",
		    pageLastText: " >> ",

            fields: [
             	{ name: "Id", type: "text", align: "center", width: 30, title: "#" },
             	{ name: "Estudiante", type: "text", align: "center", width: 250, title: "Nombre" },
	            { name: "Fecha", type: "text", align: "center", width: 90 },
	            { name: "Estado", type: "checkbox", align: "center", width: 50 },
	            { name: "N_PROFESOR", type: "text", align: "center", width: 30, title:"P" },
	            { name: "N_APP", type: "text", align: "center", width: 30, title:"A" },
	            { name: "N_FINAL", type: "text", align: "center", width: 30, title:"F" },
	            { name: "N_FINAL", type: "text", align: "center", width: 30, title:"T" },
            	{ type: "control" }
            ]
        });
	}

})(jQuery);