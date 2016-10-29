
(function($) {
    var popGenReport = 
        '<div id="dlEvalPopOver" class="row">'+
            '<button id="dlGeneralEvalReport" type="button" class="btn btn-primary" data-toggle="popover">'+
                '<i class="fa fa-file-excel-o fa-2x" aria-hidden="true"></i>'+
            '</button>'+
            '<button id="dlGeneralEvalReport" type="button" class="btn btn-primary" data-toggle="popover">'+
                '<i class="fa fa-file-pdf-o fa-2x" aria-hidden="true"></i>'+
            '</button>'+
        '</div>';

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

        $contPop = $('#dlEvalPopOver');
        $contPop.css('display', 'block');

        $('#dlGeneralEvalReport').popover({
            content:popGenReport,
            placement:'bottom',
            html:true,
            trigger:'focus'
        });

        $('#nomSelect').select2();

	    setTableEval();
	}

	mainInit();

	function setTableEval() {
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

            loadIndicator: {
                show: function() {
                },
                hide: function() {
                    console.log("loading started");

                    $e = $(".jsgrid-header-row > .jsgrid-header-cell:eq(3)");
                    $e.attr({
                        "data-toggle": 'tooltip',
                        "data-container": 'body',
                        "title": 'Tiempo de entrega'
                    });

                    $e = $(".jsgrid-header-row > .jsgrid-header-cell:eq(4)");
                    $e.attr({
                        "data-toggle": 'tooltip',
                        "data-container": 'body',
                        "title": 'Intentos'
                    });

                    $e = $(".jsgrid-header-row > .jsgrid-header-cell:eq(5)");
                    $e.attr({
                        "data-toggle": 'tooltip',
                        "data-container": 'body',
                        "title": 'Nota del Profesor'
                    });

                    $e = $(".jsgrid-header-row > .jsgrid-header-cell:eq(6)");
                    $e.attr({
                        "data-toggle": 'tooltip',
                        "data-container": 'body',
                        "title": 'Nota de la APP'
                    });

                    $e = $(".jsgrid-header-row > .jsgrid-header-cell:eq(7)");
                    $e.attr({
                        "data-toggle": 'tooltip',
                        "data-container": 'body',
                        "title": 'Nota Final'
                    });

                    $('[data-toggle="tooltip"]').tooltip();
                }
            },

            fields: [
             	{ name: "Practica", type: "text", align: "center", width: 180, title: "Nombre" },
	            { name: "Fecha", type: "text", align: "center", width: 70 },
                { name: "Estado", type: "checkbox", align: "center", width: 50 },
                { name: "Entrega", type: "text", align: "center", width: 30, title:"E" },
                { name: "Intentos", type: "text", align: "center", width: 30, title:"I" },
	            { name: "N_PROFESOR", type: "text", align: "center", width: 30, title:"P" },
	            { name: "N_APP", type: "text", align: "center", width: 30, title:"A" },
	            { name: "N_FINAL", type: "text", align: "center", width: 30, title:"F" },
            	{ type: "control" }
            ]
        });

    	$('input[name="daterange"]').daterangepicker();
	}

})(jQuery);