
(function($) {

	function init() {
	    setTableAnun();
	}

	init();

	function setTableAnun() {
		var c1 = "auto",
			c2 = "auto",
			c3 = "auto",
			c4 = "auto";

		var w = $(".container").width();

		if(w > 600){
			c1 = parseInt( 0.2 * w );
			c2 = parseInt( 0.2 * w );
			c3 = parseInt( 0.4 * w );
			c4 = parseInt( 0.2 * w );
		}

		var jsGridParams = {
            width: "100%",
            sorting: true,
            paging: true,
            editing:false,
            autoload: true,
            pageSize: 10,
            pageButtonCount: 5,
            updateOnResize: true,
            noDataContent: "Ningún dato encontrado.",
            controller: dbAnun,

            pagerFormat: "Pag {first} {prev} {pages} {next} {last}    {pageIndex} de {pageCount}",
            pagePrevText: " < ",
		    pageNextText: " > ",
		    pageFirstText: " << ",
		    pageLastText: " >> ",

            fields: [
             	{ name: "Profesor", type: "text", align: "center", width: c1 },
             	{ name: "Titulo", type: "text", align: "center", width: c2 },
	            { name: "Contenido", type: "textarea", align: "center", width: c3 },
	            { name: "Fecha", type: "text", align: "center", width: c4 },
            	{ type: "control" }
            ]
        };

		$( window ).resize(function() {
			w = $(".container").width();
            console.log("resize_anun");

			if(w > 600){
				jsGridParams.fields[0].width = parseInt( 0.2 * w );
				jsGridParams.fields[1].width = parseInt( 0.2 * w );
				jsGridParams.fields[2].width = parseInt( 0.4 * w );
				jsGridParams.fields[3].width = parseInt( 0.2 * w );

			}
			else{
				jsGridParams.fields[0].width = "auto";
				jsGridParams.fields[1].width = "auto";
				jsGridParams.fields[2].width = "auto";
				jsGridParams.fields[3].width = "auto";
			}

			$("#jsGrid").jsGrid("destroy");
			$("#jsGrid").jsGrid(jsGridParams);
		});

		$("#jsGrid").jsGrid(jsGridParams);
	}

})(jQuery);