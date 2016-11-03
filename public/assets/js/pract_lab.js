
(function($) {
	var aData = [];
    var popGenReport = 
        '<div id="dlEvalPopOver" class="row" style="padding:4px 10px 4px 10px">'+
            '<button id="dlExcelReport" type="button" class="btn btn-primary" data-toggle="popover" style="margin-left:5px">'+
                '<i class="fa fa-file-excel-o fa-2x" aria-hidden="true"></i>'+
            '</button>'+
            '<button id="dlGeneralConsReport" type="button" class="btn btn-primary" data-toggle="popover" style="margin-right:5px">'+
                '<i class="fa fa-file-pdf-o fa-2x" aria-hidden="true"></i>'+
            '</button>'+
        '</div>';

	init();

	function init() {
		$('#uploadFileInput').click();
		$('#practLabFchas').daterangepicker({
            locale: {
              format: 'DD-MM-YYYY'
            },
            startDate: moment().format('DD/MM/YYYY'),
            endDate: moment().add(3, 'months').format('DD/MM/YYYY')
        });

        $('#practLabFchas').on('apply.daterangepicker', function(ev, picker) {
            var subjectId = $("#subjectsDropDown").attr('data-sel-id'); 
            setPracLabTable(subjectId); 
        });

        $('#downloadGeneralReport').popover({
            content:popGenReport,
            placement:'bottom',
            html:true,
            trigger:'focus'
        });

        $('#downloadGeneralReport').off('click').on('shown.bs.popover', function () {
            setDownLoadBtns();
        });

        setSubjectsDropDown();
        setPracLabTable();
	}

	function setSubjectsDropDown() {
        $dropDown = $("#subjectsDropDown");
        $dropDownMenu = $dropDown.children('.dropdown-menu').first();
        $dropDownMenu.html("");

        var session = $.cookie(SESSION_COOKIE);

        var data = {
            userId:session.id
        };

        var jData = utf8_to_b64( JSON.stringify(data) );
        $.ajax({
            url: CON_URL+"subjects/getByUserId",
            data:{data:jData}
        }).done(function(data) {
            var res = $.parseJSON(b64_to_utf8(data));

            if(res.data.length == 0){
                //setTableAnun('-1');
                $dropDown.children('button').text('Ninguna')
                return;
            }
            else{
                //setTableAnun(res.data[0].user_group_id);
                $dropDown.children('button').html(res.data[0].name + '  <span class="caret"></span>');
                $dropDown.attr('data-sel-id', res.data[0].id);
            }

            res.data.forEach(function(e,i) {
                $newRow = $('<li><a class="subjectSelElem" data-id="' + e.id + '" href="#">' + e.name + '</a></li>')
                $dropDownMenu.append($newRow);
            });

            $dropDown.find('.subjectSelElem').each(function(index, el) {
                $(el).off("click").on('click', function(event) {
                    event.preventDefault();
                    $this = $(this);
                    //setTableAnun($this.attr('data-id'));
                    $dropDown.children('button').html($this.text() + '  <span class="caret"></span>');
                    $dropDown.attr('data-sel-id', $this.attr('data-id'));

                    var subjectId = $("#subjectsDropDown").attr('data-sel-id'); 
                    setPracLabTable(subjectId); 
                });

            });

            var subjectId = $("#subjectsDropDown").attr('data-sel-id'); 
            setPracLabTable(subjectId);                
        }).fail(function(data) {
            console.log("ajax fail");
        });
    }

    var aData;
    function setPracLabTable(subjectId) {
    	var drp = $('#practLabFchas').data('daterangepicker');
        var fIni = drp.startDate.format('YYYY/MM/DD');
        var fFin = drp.endDate.format('YYYY/MM/DD');
    	$("#jsGrid").jsGrid({
                width: "100%",
                filtering: true,
                sorting: true,
                paging: true,
                editing: false,
                autoload: true,
                pageSize: 10,
                pageButtonCount: 5,
                noDataContent: "Ningún dato encontrado.",
                controller: {
	                loadData: function(filter) {
	                    var d = $.Deferred();
	                    var session = $.cookie(SESSION_COOKIE);

	                    var data = {
	                    	user_id:session.id,
	                        subject_id:subjectId,
	                        fIni:fIni,
	                        fFin:fFin
	                    };
	     
	                    var jData = utf8_to_b64( JSON.stringify(data) );
	                    $.ajax({
	                        url: CON_URL+"evaluation/getStudentsLabsByGroSub",
	                        data:{data:jData}
	                    }).done(function(data) {
	                        var res = $.parseJSON(b64_to_utf8(data));

	                        var dt = res.data;
	                        var dataFiltered = $.grep(dt, function(obj) {
	                            return (!filter.lab_name || obj.lab_name.indexOf(filter.lab_name) > -1)
	                                && (!filter.delivery_date || obj.delivery_date.indexOf(filter.delivery_date) > -1)
	                                && (filter.lab_state === undefined || Boolean(obj.lab_state) === filter.lab_state)
	                                && (!filter.lab_delivery_time || obj.lab_delivery_time.indexOf(filter.lab_delivery_time) > -1)
	                                && (!filter.lab_attempts || obj.lab_attempts.indexOf(filter.lab_attempts) > -1)
	                                && (!filter.lab_teacher_score || obj.lab_teacher_score.indexOf(filter.lab_teacher_score) > -1)
	                                && (!filter.lab_app_score || obj.lab_app_score.indexOf(filter.lab_app_score) > -1)
	                                && (!filter.lab_final_score || obj.lab_final_score.indexOf(filter.lab_final_score) > -1);
	                        });

	                        aData = dataFiltered;
	                        d.resolve(dataFiltered);

	                    }).fail(function(data) {
	                        console.log("ajax fail");
	                        d.resolve([]);
	                    });

	                    return d.promise();
	                }
	            },

                rowClick: function(obj) {
                	$modal = $('#practInfoModal');
                	$modal.off('shown.bs.modal');
                	var item = obj.item;

                	$labelState = $modal.find(".labelState");
                	$modal.find('.modal-title').text(item.lab_name);

                	if(item.lab_state == "1"){
	                	$labelState.removeClass('label-danger');
                		$labelState.addClass("label").addClass('label-success');
                		$labelState.text('Entregado');
	                	$modal.find('#fEntrega').val(item.delivery_date);
	                	$modal.find('#tEntrega').val(item.lab_delivery_time);
	                	$modal.find('#nProfesor').val(item.lab_teacher_score);
	                	$modal.find('#nApp').val(item.lab_app_score);
	                	$modal.find('#nFinal').val(item.lab_app_score);
	                	$modal.find('#obsrv').val(item.lab_comments);
	                	$modal.find('#nIntent').val(item.lab_attempts);
                	}
                	else{
	                	$labelState.removeClass('label-success');
                		$labelState.addClass("label").addClass('label-danger');
                		$labelState.text('Pendiente');
                	}

                	$('#btnDownL').off('click').on('click', function(event) {
                		event.preventDefault();
                		$.fileDownload('/docs/report.pdf');
                	});

                	$('#btnUpload').off('click').on('click', function(event) {
                		event.preventDefault();
                		console.log($('#uploadFileInput'))
                		$('#uploadFileInput').click();
                	});

            		$modal.modal('show');
            		$modal.on('shown.bs.modal', function (e) {
						console.log(item);

						$('#uploadPrcFile').fileinput({
                            language: 'es',
                            allowedFileExtensions : ['pdf', 'xlsx','xls'],
                            previewFileIcon: ""
                        });
					});
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
	                        "title": 'Nota de Laboratorio'
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
	                { name: "lab_name", type: "text", align: "center", width: 160, title: "Nombre" },
	                { name: "delivery_date", type: "text", align: "center", width: 70, title: "Fecha" },
	                { name: "lab_state", type: "checkbox", align: "center", width: 50, title: "Entregado" },
	                { name: "lab_delivery_time", type: "text", align: "center", width: 50, title:"E" },
	                { name: "lab_attempts", type: "text", align: "center", width: 30, title:"I" },
	                { name: "lab_teacher_score", type: "text", align: "center", width: 30, title:"P" },
	                { name: "lab_app_score", type: "text", align: "center", width: 30, title:"L" },
	                { name: "lab_final_score", type: "text", align: "center", width: 30, title:"F" },
	                { type: "control" }
	            ]
            });
    }

    function setDownLoadBtns(){
		$('#dlGeneralConsReport').off('click').on('click', function(event) {
	    	event.preventDefault();

	    	var session = $.cookie(SESSION_COOKIE);
	    	var subject = $("#subjectsDropDown").children('button').text();
	    	
	    	var data = {
	    		name:session.name + ' ' + session.last_name,
	    		date:moment().format("DD-MM-YYYY"),
	    		subject:subject,
	    		rows:aData
	    	}
	    	
    	 	const pdfConst = new PdfMakeConstructor(session.name + '_' + session.last_name + "_report.pdf");
    	 	pdfConst.makeStudentReport(data);
	    });

	    $('#dlExcelReport').off('click').on('click', function(event) {
            event.preventDefault();
            var session = $.cookie(SESSION_COOKIE);

            if(aData.length == 0){
                return;
            }

            var drp = $('#practLabFchas').data('daterangepicker');
            var fIni = drp.startDate.format('YYYY/MM/DD');
            var fFin = drp.endDate.format('YYYY/MM/DD');
            var subject = $("#subjectsDropDown").children('button').text();

            var data = {
                subject:subject,
                fIni:fIni,
                fFin:fFin,
                stuName:session.name + ' ' + session.last_name,
                rows:aData
            }

            $.fileDownload(CON_URL+"reports/getStudent?data=" + JSON.stringify(data));
        });
	}

})(jQuery);