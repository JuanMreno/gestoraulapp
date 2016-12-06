
(function($) {
    var valSelected;
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

	function mainInit() {
		$('#tipoDropdown-practica').off('click').on('click', function(event) {
			event.preventDefault();

			$('#tipoDropdown').html('Practica  ' + '<span class="caret"></span>');

            var subjectId = $("#subjectsDropDown").attr('data-sel-id'); 
            setLabsDropDown(subjectId);
		});;

		$('#tipoDropdown-estudiante').off('click').on('click', function(event) {
			event.preventDefault();

			$('#tipoDropdown').html('Estudiante  ' + '<span class="caret"></span>');
            var groupId = $("#groupsDropDown").attr('data-sel-id'); 
            setStudentsDropDown(groupId);  
		});;

        $contPop = $('#dlEvalPopOver');
        $contPop.css('display', 'block');

        $('#dlGeneralEvalReport').popover({
            content:popGenReport,
            placement:'bottom',
            html:true,
            trigger:'focus'
        });

        $('#dlGeneralEvalReport').off('click').on('shown.bs.popover', function () {
            setDownLoadBtns();
        });

        $('#nomSelect').select2();

        $('#evalDatePicker').daterangepicker({
            autoApply: true,
            locale: {
              format: 'DD-MM-YYYY'
            },
            dateLimit: {
                "months": 12
            },
            startDate: moment().format('DD/MM/YYYY'),
            endDate: moment().add(3, 'months').format('DD/MM/YYYY')
        });
        $('#evalDatePicker').attr('disabled',true);

        $('#evalDatePicker').on('apply.daterangepicker', function(ev, picker) {

            var nomSel = $('#nomSelect').attr('data-type'); 

            if(nomSel == 'est'){
                var subjectId = $("#subjectsDropDown").attr('data-sel-id');
                var stuId = $('#nomSelect').attr('data-sel-id');

                setTableEval( stuId, subjectId);
            }
            else{
                var labId = $('#nomSelect').attr('data-sel-id');
                var groupId = $("#groupsDropDown").attr('data-sel-id');
                
                setTableEst(groupId, labId);
            }

        });

        $('#dateFilterBtn').off('click').on('click', function(event) {
            event.preventDefault();

            if($(this).hasClass('fa-square-o')){
                $(this).toggleClass( 'fa-square-o', false );
                $(this).toggleClass( 'fa-check-square-o', true );
                $('#evalDatePicker').prop('disabled', false);
            }
            else{
                $(this).toggleClass( 'fa-check-square-o', false );
                $(this).toggleClass( 'fa-square-o', true );
                $('#evalDatePicker').prop('disabled', true);
            }

            var nomSel = $('#nomSelect').attr('data-type');

            if(nomSel == 'est'){
                var subjectId = $("#subjectsDropDown").attr('data-sel-id');
                var stuId = $('#nomSelect').attr('data-sel-id');

                setTableEval( stuId, subjectId);
            }
            else{
                var labId = $('#nomSelect').attr('data-sel-id');
                var groupId = $("#groupsDropDown").attr('data-sel-id');
                
                setTableEst(groupId, labId);
            }
        });

        setGroupsDropDown();
	}

	mainInit();

    function setGroupsDropDown() {
        $dropDown = $("#groupsDropDown");
        $dropDownMenu = $dropDown.children('.dropdown-menu').first();
        $dropDownMenu.html("");

        var session = $.cookie(SESSION_COOKIE);

        var data = {
            userId:session.id
        };

        var jData = utf8_to_b64( JSON.stringify(data) );
        $.ajax({
            url: CON_URL+"groups/getGroupsByUser",
            data:{data:jData}
        }).done(function(data) {
            var res = $.parseJSON(b64_to_utf8(data));

            if(res.data.length == 0){
                //setTableAnun('-1');
                $dropDown.children('button').text('Ninguno')
                return;
            }
            else{
                //setTableAnun(res.data[0].user_group_id);
                $dropDown.children('button').html(res.data[0].name + '  <span class="caret"></span>');
                $dropDown.attr('data-sel-id', res.data[0].group_id);
                $dropDown.attr('data-sel-ug-id', res.data[0].user_group_id);
            }

            res.data.forEach(function(e,i) {
                $aNewRow = $('<a class="userGroupSelElem" href="#">' + e.name + '</a>');
                $aNewRow.attr('data-id', e.group_id);
                $aNewRow.attr('data-ug-id', e.user_group_id);

                $aNewRow.off("click").on('click', function(event) {
                    event.preventDefault();
                    $this = $(this);
                    //setTableAnun($this.attr('data-id'));

                    $("#groupsDropDown").children('button').html($this.text() + '  <span class="caret"></span>');
                    $("#groupsDropDown").attr('data-sel-id', $this.attr('data-id'));
                    $("#groupsDropDown").attr('data-sel-ug-id', $this.attr('data-ug-id'));

                    setSubjectsDropDown();
                });

                $newRow = $('<li></li>').append($aNewRow);
                $dropDownMenu.append($newRow);
            });

            setSubjectsDropDown();
        }).fail(function(data) {
            console.log("ajax fail");
        });
    }

    function setSubjectsDropDown() {
        $dropDown = $("#subjectsDropDown");
        $dropDownMenu = $dropDown.children('.dropdown-menu').first();
        $dropDownMenu.html("");

        var groupId = $("#groupsDropDown").attr('data-sel-id');        
        var session = $.cookie(SESSION_COOKIE);

        var data = {
            userId:session.id,
            groupId:groupId
        };

        var jData = utf8_to_b64( JSON.stringify(data) );
        $.ajax({
            url: CON_URL+"subjects/getByGroup",
            data:{data:jData}
        }).done(function(data) {
            var res = $.parseJSON(b64_to_utf8(data));

            if(res.data.length == 0){
                //setTableAnun('-1');
                $dropDown.children('button').text('Ninguna');
                $dropDown.attr('data-sel-id', -1);

                $('#nomSelect').html("");
                $('#nomSelect').select2({
                  data: [],
                  placeholder: 'Sin estudiantes'
                });  

                $("#jsGrid").jsGrid("destroy");
                return;
            }
            else{
                //setTableAnun(res.data[0].user_group_id);
                $dropDown.children('button').html(res.data[0].name + '  <span class="caret"></span>');
                $dropDown.attr('data-sel-id', res.data[0].id);
            }

            console.log("continuo");
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

                    var nomSel = $('#nomSelect').attr('data-type');
                    if(nomSel == 'est'){
                        var groupId = $("#groupsDropDown").attr('data-sel-id'); 
                        setStudentsDropDown(groupId);                
                    }
                    else{
                        var subjectId = $("#subjectsDropDown").attr('data-sel-id'); 
                        setLabsDropDown(subjectId);
                    }
                });

            });

            var nomSel = $('#nomSelect').attr('data-type');

            if(nomSel == 'est'){
                var groupId = $("#groupsDropDown").attr('data-sel-id'); 
                setStudentsDropDown(groupId);                
            }
            else{
                var subjectId = $("#subjectsDropDown").attr('data-sel-id'); 
                setLabsDropDown(subjectId);
            }
        }).fail(function(data) {
            console.log("ajax fail");
        });
    }

    function setStudentsDropDown(groupId) {

        var session = $.cookie(SESSION_COOKIE);

        var data = {
            groupId:groupId
        };

        var jData = utf8_to_b64( JSON.stringify(data) );
        $.ajax({
            url: CON_URL+"students/getByGroup",
            data:{data:jData}
        }).done(function(data) {
            var res = $.parseJSON(b64_to_utf8(data));

            $('#nomSelect').html("");
            $('#nomSelect').attr('data-type', 'est');;
            
            if(res.data.length == 0){
                $('#nomSelect').select2({
                  data: res.data,
                  placeholder: 'Sin estudiantes'
                });  

                $("#jsGrid").jsGrid("destroy");
            }
            else{
                var subjectId = $("#subjectsDropDown").attr('data-sel-id');

                setTableEval( res.data[0].id, subjectId);
                $('#nomSelect').attr('data-sel-id', res.data[0].id);
                $('#nomSelect').select2({
                  data: res.data
                });  
                valSelected = res.data[0].text;

                $('#nomSelect').off('select2:select').on('select2:select', function(event) {
                    event.preventDefault();
                    /* Act on the event */
                    
                    $('#nomSelect').attr('data-sel-id', event.params.data.id);
                    setTableEval( event.params.data.id, subjectId);
                    valSelected = event.params.data.text;
                });
            }
            
            $('#nomSelect').trigger('change');
            $('#nomSelect').trigger('change.select2');
        }).fail(function(data) {
            console.log("ajax fail");
        });
    }

    function setLabsDropDown(subjectId) {

        var session = $.cookie(SESSION_COOKIE);

        var data = {
            subjectId:subjectId
        };

        var jData = utf8_to_b64( JSON.stringify(data) );
        $.ajax({
            url: CON_URL+"laboratories/getBySubId",
            data:{data:jData}
        }).done(function(data) {
            var res = $.parseJSON(b64_to_utf8(data));

            $('#nomSelect').html("");
            $('#nomSelect').attr('data-type', 'lab');;
            
            if(res.data.length == 0){
                $('#nomSelect').select2({
                  data: res.data,
                  placeholder: 'Sin prácticas'
                });

                $("#jsGrid").jsGrid("destroy");
            }
            else{
                var groupId = $("#groupsDropDown").attr('data-sel-id');
                setTableEst(groupId, res.data[0].id);
                $('#nomSelect').attr('data-sel-id', res.data[0].id);
                $('#nomSelect').select2({
                  data: res.data
                });  
                valSelected = res.data[0].text;

                $('#nomSelect').off('select2:select').on('select2:select', function(event) {
                    event.preventDefault();
                    /* Act on the event */
                    
                    $('#nomSelect').attr('data-sel-id', event.params.data.id);
                    var groupId = $("#groupsDropDown").attr('data-sel-id');

                    setTableEst(groupId, event.params.data.id);
                    valSelected = event.params.data.text;
                });
            }
            
            $('#nomSelect').trigger('change');
            $('#nomSelect').trigger('change.select2');
        }).fail(function(data) {
            console.log("ajax fail");
        });
    }

    function setTableEval(user_id, subject_id) {
        var fIni = 'null';
        var fFin = 'null';

        if(!$('#evalDatePicker').prop('disabled')){
            var drp = $('#evalDatePicker').data('daterangepicker');
            fIni = drp.startDate.format('YYYY/MM/DD');
            fFin = drp.endDate.format('YYYY/MM/DD');
        }

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
            controller: {
                loadData: function(filter) {
                    var d = $.Deferred();
                    var session = $.cookie(SESSION_COOKIE);

                    var data = {
                        user_id:user_id,
                        subject_id:subject_id,
                        fIni:fIni,
                        fFin:fFin
                    };
     
                    var jData = utf8_to_b64( JSON.stringify(data) );
                    $.ajax({
                        url: CON_URL+"evaluation/getLabsByGroSubEst",
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

                        d.resolve(dataFiltered);

                        aData = dataFiltered;
                        setAvanceProm(dt);
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

                $('#aBtnDownL').show();

                $modal.find('#cUnidad').val(item.less_name);
                if(item.lab_state == "1"){
                    $labelState.removeClass('label-danger');
                    $labelState.addClass("label").addClass('label-success');
                    $labelState.text('Entregado');
                    $modal.find('#fEntrega').val(item.delivery_date);
                    $modal.find('#tEntrega').val(item.lab_delivery_time);
                    $modal.find('#nProfesor').val(item.lab_teacher_score);
                    $modal.find('#nApp').val(item.lab_app_score);
                    $modal.find('#nFinal').val(item.lab_final_score);
                    $modal.find('#obsrv').val(item.lab_comments);
                    $modal.find('#numInten').val(item.lab_attempts);
                }
                else{
                    $labelState.removeClass('label-success');
                    $labelState.addClass("label").addClass('label-danger');
                    $labelState.text('Pendiente');
                }

                if(item.lab_users_id == null){
                    $('#aBtnDownL').hide();
                }
                else{
                    $('#aBtnDownL').attr('href', item.lab_report_url);
                }

                $('#btnSave').off('click').on('click', function(event) {
                    event.preventDefault();
                    
                    var data = {
                        id:item.lab_users_id,
                        comments:$modal.find('#obsrv').val(),
                        teacher_score:$modal.find('#nProfesor').val()
                    }

                    var jData = utf8_to_b64( JSON.stringify(data) );
                    $.ajax({
                        url: CON_URL+"evaluation/updateLaboratory",
                        data:{data:jData}
                    }).done(function(data) {
                        var res = $.parseJSON(b64_to_utf8(data));

                        if(res.status == "true"){
                            $("#jsGrid").jsGrid("render");
                            $modal.modal('toggle');
                        }
                        else{
                            $('#alertModalCont').text("La información no pudo ser actualizada.");
                            $('#alertModal').modal('show');
                        }
                    }).fail(function(data) {
                        console.log("ajax fail");
                        $('#alertModalCont').text("La información no pudo ser actualizada.");
                        $('#alertModal').modal('show');
                    });
                });

                $modal.modal('show');
                $modal.on('shown.bs.modal', function (e) {
                    //console.log(item);
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
                    $e = $(".jsgrid-header-row > .jsgrid-header-cell:eq(2)");
                    $e.attr({
                        "data-toggle": 'tooltip',
                        "data-container": 'body',
                        "title": 'Entregado/Sin entregar'
                    });

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
                        "title": 'Nota del profesor'
                    });

                    $e = $(".jsgrid-header-row > .jsgrid-header-cell:eq(6)");
                    $e.attr({
                        "data-toggle": 'tooltip',
                        "data-container": 'body',
                        "title": 'Nota de laboratorio'
                    });

                    $e = $(".jsgrid-header-row > .jsgrid-header-cell:eq(7)");
                    $e.attr({
                        "data-toggle": 'tooltip',
                        "data-container": 'body',
                        "title": 'Nota final'
                    });

                    $('[data-toggle="tooltip"]').tooltip();
                }
            },

            fields: [
                { name: "lab_name", type: "text", align: "center", width: 170, title: "Nombre" },
                { name: "delivery_date", type: "text", align: "center", width: 60, title: "Fecha" },
                { name: "lab_state", type: "checkbox", align: "center", width: 50, title: "Entr" },
                { name: "lab_delivery_time", type: "text", align: "center", width: 50, title:"T" },
                { name: "lab_attempts", type: "text", align: "center", width: 30, title:"I" },
                { name: "lab_teacher_score", type: "text", align: "center", width: 30, title:"P" },
                { name: "lab_app_score", type: "text", align: "center", width: 30, title:"L" },
                { name: "lab_final_score", type: "text", align: "center", width: 30, title:"F" },
                { type: "control" }
            ]
        });
    }

    function setTableEst(groupId, labId) {
        var fIni = 'null';
        var fFin = 'null';

        if(!$('#evalDatePicker').prop('disabled')){
            var drp = $('#evalDatePicker').data('daterangepicker');
            fIni = drp.startDate.format('YYYY/MM/DD');
            fFin = drp.endDate.format('YYYY/MM/DD');
        }

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
            controller: {
                loadData: function(filter) {
                    var d = $.Deferred();
                    var session = $.cookie(SESSION_COOKIE);

                    var data = {
                        groupId:groupId,
                        labId:labId,
                        fIni:fIni,
                        fFin:fFin
                    };
     
                    var jData = utf8_to_b64( JSON.stringify(data) );
                    $.ajax({
                        url: CON_URL+"students/getByLabId",
                        data:{data:jData}
                    }).done(function(data) {
                        var res = $.parseJSON(b64_to_utf8(data));

                        var dt = res.data;

                        var dataFiltered = $.grep(dt, function(obj) {
                            return (!filter.user_name || obj.user_name.indexOf(filter.lab_name) > -1)
                                && (filter.lab_state === undefined || Boolean(obj.lab_state) === filter.lab_state)
                                && (!filter.delivery_date || obj.delivery_date.indexOf(filter.delivery_date) > -1)
                                && (!filter.lab_delivery_time || obj.lab_delivery_time.indexOf(filter.lab_delivery_time) > -1)
                                && (!filter.lab_attempts || obj.lab_attempts.indexOf(filter.lab_attempts) > -1)
                                && (!filter.lab_teacher_score || obj.lab_teacher_score.indexOf(filter.lab_teacher_score) > -1)
                                && (!filter.lab_app_score || obj.lab_app_score.indexOf(filter.lab_app_score) > -1)
                                && (!filter.lab_final_score || obj.lab_final_score.indexOf(filter.lab_final_score) > -1);
                        });

                        d.resolve(dataFiltered);

                        aData = dataFiltered;
                        setAvanceProm(dt);
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
                console.log(item)

                $labelState = $modal.find(".labelState");
                $modal.find('.modal-title').text(item.lab_name);

                $('#aBtnDownL').show();

                $modal.find('#cUnidad').val(item.less_name);
                if(item.lab_state == "1"){
                    $labelState.removeClass('label-danger');
                    $labelState.addClass("label").addClass('label-success');
                    $labelState.text('Entregado');
                    $modal.find('#fEntrega').val(item.delivery_date);
                    $modal.find('#tEntrega').val(item.lab_delivery_time + " Días");
                    $modal.find('#nProfesor').val(item.lab_teacher_score);
                    $modal.find('#nApp').val(item.lab_app_score);
                    $modal.find('#nFinal').val(item.lab_final_score);
                    $modal.find('#obsrv').val(item.lab_comments);
                    $modal.find('#numInten').val(item.lab_attempts);
                }
                else{
                    $labelState.removeClass('label-success');
                    $labelState.addClass("label").addClass('label-danger');
                    $labelState.text('Pendiente');
                }

                if(item.lab_users_id == null || item.lab_users_id == ""){
                    $('#aBtnDownL').hide();
                }
                else{
                    $('#aBtnDownL').attr('href', item.lab_report_url);
                }

                $('#btnSave').off('click').on('click', function(event) {
                    event.preventDefault();
                    
                    var data = {
                        id:item.lab_users_id,
                        comments:$modal.find('#obsrv').val(),
                        teacher_score:$modal.find('#nProfesor').val()
                    }

                    var jData = utf8_to_b64( JSON.stringify(data) );
                    $.ajax({
                        url: CON_URL+"evaluation/updateLaboratory",
                        data:{data:jData}
                    }).done(function(data) {
                        var res = $.parseJSON(b64_to_utf8(data));

                        if(res.status == "true"){
                            $("#jsGrid").jsGrid("render");
                            $modal.modal('toggle');
                        }
                        else{
                            $('#alertModalCont').text("La información no pudo ser actualizada.");
                            $('#alertModal').modal('show');
                        }
                    }).fail(function(data) {
                        console.log("ajax fail");
                        $('#alertModalCont').text("La información no pudo ser actualizada.");
                        $('#alertModal').modal('show');
                    });
                });

                $modal.modal('show');
                $modal.on('shown.bs.modal', function (e) {
                    //console.log(item);
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
                    $e = $(".jsgrid-header-row > .jsgrid-header-cell:eq(2)");
                    $e.attr({
                        "data-toggle": 'tooltip',
                        "data-container": 'body',
                        "title": 'Entregado/Sin entregar'
                    });

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
                        "title": 'Nota del profesor'
                    });

                    $e = $(".jsgrid-header-row > .jsgrid-header-cell:eq(6)");
                    $e.attr({
                        "data-toggle": 'tooltip',
                        "data-container": 'body',
                        "title": 'Nota de laboratorio'
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
                { name: "user_name", type: "text", align: "center", width: 170, title: "Nombre" },
                { name: "delivery_date", type: "text", align: "center", width: 40, title: "Fecha" },
                { name: "lab_state", type: "checkbox", align: "center", width: 50, title: "Entr" },
                { name: "lab_delivery_time", type: "text", align: "center", width: 50, title:"T" },
                { name: "lab_attempts", type: "text", align: "center", width: 30, title:"I" },
                { name: "lab_teacher_score", type: "text", align: "center", width: 30, title:"P" },
                { name: "lab_app_score", type: "text", align: "center", width: 30, title:"L" },
                { name: "lab_final_score", type: "text", align: "center", width: 30, title:"F" },
                { type: "control" }
            ]
        });
    }

    function setAvanceProm(data) {
        var n = data.length;
        var entre = 0;
        var avan = 0;
        var prom = 0;

        $avanInd = $('#avanInd');
        $promInd = $('#promInd');

        if(n == 0){
            $avanInd.text('-');
            $promInd.text('-');
            return;
        }

        for (var i = 0; i < n; i++) {
            var elem = data[i];

            if((elem.lab_state == 1 || elem.lab_state == "1") && (elem.lab_final_score != '')){
                entre++;
                prom+= parseFloat(elem.lab_final_score);
            }
        }

        if(entre == 0){
            $promInd.text('-');
        }
        else{
            prom = prom/entre;
            $promInd.text(prom.toFixed(1));
        }

        avan = entre * 100 / n;
        $avanInd.text(parseInt(avan) + " %");
    }

    function setDownLoadBtns(){
        $('#dlGeneralConsReport').off('click').on('click', function(event) {
            event.preventDefault();

            if(aData.length == 0){
                return;
            }
            var drp = $('#evalDatePicker').data('daterangepicker');
            var fIni = drp.startDate.format('YYYY/MM/DD');
            var fFin = drp.endDate.format('YYYY/MM/DD');


            var group = $("#groupsDropDown").children('button').text();
            var subject = $("#subjectsDropDown").children('button').text();

            var avanInd = $('#avanInd').text();
            var promInd = $('#promInd').text();

            var stuName = valSelected;

            var data = {
                group:group,
                subject:subject,
                avanInd:avanInd,
                promInd:promInd,
                fIni:fIni,
                fFin:fFin,
                stuName:stuName,
                rows:aData
            }
            
            const pdfConst = new PdfMakeConstructor(stuName.replace(" ", "_") + "_reporte.pdf");

            var selType = $('#nomSelect').attr('data-type');

            if(selType == 'lab')
                pdfConst.makeLabReport(data);
            else
                pdfConst.makeStuReport(data);
        });

        $('#dlExcelReport').off('click').on('click', function(event) {
            event.preventDefault();

            if(aData.length == 0){
                return;
            }

            var drp = $('#evalDatePicker').data('daterangepicker');
            var fIni = drp.startDate.format('YYYY/MM/DD');
            var fFin = drp.endDate.format('YYYY/MM/DD');


            var group = $("#groupsDropDown").children('button').text();
            var subject = $("#subjectsDropDown").children('button').text();

            var avanInd = $('#avanInd').text();
            var promInd = $('#promInd').text();

            var stuName = valSelected;

            var selType = $('#nomSelect').attr('data-type');
            var data = {
                type:selType,
                group:group,
                subject:subject,
                avanInd:avanInd,
                promInd:promInd,
                fIni:fIni,
                fFin:fFin,
                stuName:stuName,
                rows:aData
            }

            $.fileDownload(CON_URL+"reports/getTeacher?data=" + JSON.stringify(data));
        });
    }

})(jQuery);