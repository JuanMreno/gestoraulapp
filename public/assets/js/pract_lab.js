
(function($) {

	init();

	function init() {

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
                controller: db,

                rowClick: function(obj) {
                	$modal.off('shown.bs.modal');
                	var item = obj.item;

                	$labelState = $modal.find(".labelState");
                	$modal.find('.modal-title').text(item.Practica);

                	if(item.Estado){
	                	$labelState.removeClass('label-danger');
                		$labelState.addClass("label").addClass('label-success');
                		$labelState.text('Entregado');
	                	$modal.find('#fEntrega').val(item.Fecha);
	                	$modal.find('#tEntrega').val(item.Entrega + " Días");
	                	$modal.find('#nProfesor').val(item.N_PROFESOR);
	                	$modal.find('#nApp').val(item.N_APP);
	                	$modal.find('#nFinal').val(item.N_FINAL);
	                	$modal.find('#obsrv').val(item.OBSRV);
                	}
                	else{
	                	$labelState.removeClass('label-success');
                		$labelState.addClass("label").addClass('label-danger');
                		$labelState.text('Pendiente');
                	}

            		$modal.modal('show');
            		$modal.on('shown.bs.modal', function (e) {
						console.log(item);
					});
                },

                pagerFormat: "Pag {first} {prev} {pages} {next} {last}    {pageIndex} de {pageCount}",
                pagePrevText: " < ",
			    pageNextText: " > ",
			    pageFirstText: " << ",
			    pageLastText: " >> ",

                fields: [
                 	{ name: "Practica", type: "text", align: "center", width: 250, title: "Práctica" },
		            { name: "Unidad", type: "text", align: "center", width: 150 },
		            { name: "Estado", type: "checkbox", align: "center", width: 100 },
		            { name: "Fecha", type: "text", align: "center", width: 100 },
	            	{ type: "control" }
                ]
            });

	    $dateFchas = $('#practLabFchas');
	    $dateFchas.daterangepicker({
    		locale: {
				format: 'DD-MM-YYYY'
			},
			startDate: moment().format('DD/MM/YYYY'),
			endDate: moment().add(30,"days").format('DD/MM/YYYY'),
			opens: "left"
		});

	    $('#downloadGeneralReport').on('click', function(event) {
	    	event.preventDefault();

	    	var data = {
	    		name:"Juan Camilo Moreno",
	    		date:'2016-01-01',
	    		group:"11-A",
	    		subject:"Matemáticas",
	    		rows:db.clients
	    	}
	    	
    	 	const pdfConst = new PdfMakeConstructor("juan_report.pdf");
    	 	pdfConst.makeStudentReport(data);
	    });
	}

})(jQuery);