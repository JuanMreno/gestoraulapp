
(function($) {

	function mainInit() {
		$('#tipoDropdown-practica').on('click', function(event) {
			event.preventDefault();

			setTableConsPrac();
			$('#tipoDropdown').text('Practica');
		});;

		$('#tipoDropdown-estudiante').on('click', function(event) {
			event.preventDefault();

			setTableConsEst();
			$('#tipoDropdown').text('Estudiante');
		});;

	    setTableConsPrac();
	}

	mainInit();

	function setTableConsPrac() {
		$("#jsGrid").jsGrid({
            width: "100%",
            filtering: true,
            sorting: true,
            paging: true,
            editting: true,
            autoload: true,
            pageSize: 5,
            pageButtonCount: 5,
            noDataContent: "Ningún dato encontrado.",
            controller: dbEst,

            pagerFormat: "Pag {first} {prev} {pages} {next} {last}    {pageIndex} de {pageCount}",
            pagePrevText: " < ",
		    pageNextText: " > ",
		    pageFirstText: " << ",
		    pageLastText: " >> ",

            fields: [
             	{ name: "Practica", type: "text", align: "center", width: 250, title: "Nombre" },
	            { name: "Fecha", type: "text", align: "center", width: 90 },
	            { name: "Estado", type: "checkbox", align: "center", width: 60 },
	            { name: "N_PROFESOR", type: "text", align: "center", width: 30, title:"P" },
	            { name: "N_APP", type: "text", align: "center", width: 30, title:"A" },
	            { name: "N_FINAL", type: "text", align: "center", width: 30, title:"F" },
            	{ type: "control" }
            ]
        });

    	$('input[name="daterange"]').daterangepicker();
	}

	function setTableConsEst() {
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

            rowClick: function(obj) {
            },

            pagerFormat: "Pag {first} {prev} {pages} {next} {last}    {pageIndex} de {pageCount}",
            pagePrevText: " < ",
		    pageNextText: " > ",
		    pageFirstText: " << ",
		    pageLastText: " >> ",

            fields: [
             	{ name: "Estudiante", type: "text", align: "center", width: 250, title: "Nombre" },
	            { name: "Fecha", type: "text", align: "center", width: 90 },
	            { name: "Estado", type: "checkbox", align: "center", width: 60 },
	            { name: "N_PROFESOR", type: "text", align: "center", width: 30, title:"P" },
	            { name: "N_APP", type: "text", align: "center", width: 30, title:"A" },
	            { name: "N_FINAL", type: "text", align: "center", width: 30, title:"F" },
            	{ type: "control" }
            ]
        });

    	$('input[name="daterange"]').daterangepicker();
	}

})(jQuery);