
(function($) {
    var popGenReport = 
        '<div id="dlEvalPopOver" class="row" style="padding:4px 10px 4px 10px">'+
            '<button id="dlGeneralEvalReport" type="button" class="btn btn-primary" data-toggle="popover" style="margin-right:5px">'+
                '<i class="fa fa-file-excel-o fa-2x" aria-hidden="true"></i>'+
            '</button>'+
            '<button id="dlGeneralEvalReport" type="button" class="btn btn-primary" data-toggle="popover" style="margin-right:5px">'+
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

        $('#nomSelect').select2();

        $('#evalDatePicker').daterangepicker({
            locale: {
              format: 'DD-MM-YYYY'
            },
            startDate: moment().format('DD/MM/YYYY'),
            endDate: moment().add(3, 'months').format('DD/MM/YYYY')
        });

        $('#evalDatePicker').on('apply.daterangepicker', function(ev, picker) {
            var subjectId = $("#subjectsDropDown").attr('data-sel-id');
            var groupId = $("#groupsDropDown").attr('data-sel-id');

            setTableEval( groupId, subjectId);

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
                $dropDown.children('button').html(res.data[0].name + $dropDown.children('button').html());
                $dropDown.attr('data-sel-id', res.data[0].group_id);
            }

            res.data.forEach(function(e,i) {
                $newRow = $('<li><a class="userGroupSelElem" data-id="' + e.group_id + '" href="#">' + e.name + '</a></li>')
                $dropDownMenu.append($newRow);
            });

            $dropDown.find('.userGroupSelElem').each(function(index, el) {
                $(el).off("click").on('click', function(event) {
                    event.preventDefault();
                    $this = $(this);
                    //setTableAnun($this.attr('data-id'));

                    $("#groupsDropDown").children('button').html($this.text() + '  <span class="caret"></span>');
                    $("#groupsDropDown").attr('data-sel-id', $this.attr('data-id'));

                    setSubjectsDropDown($this.attr('data-id'));
                });                
            });

            setSubjectsDropDown(res.data[0].group_id);
        }).fail(function(data) {
            console.log("ajax fail");
        });
    }

    function setSubjectsDropDown(groupId) {
        $dropDown = $("#subjectsDropDown");
        $dropDownMenu = $dropDown.children('.dropdown-menu').first();
        $dropDownMenu.html("");

        var session = $.cookie(SESSION_COOKIE);

        var data = {
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
                $('#nomSelect').select2({
                  data: res.data
                });  

                $('#nomSelect').off('select2:select').on('select2:select', function(event) {
                    event.preventDefault();
                    /* Act on the event */
                    
                    setTableEval( event.params.data.id, subjectId);
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
                //setTableEval( res.data[0].id, subjectId);
                $('#nomSelect').select2({
                  data: res.data
                });  

                $('#nomSelect').off('select2:select').on('select2:select', function(event) {
                    event.preventDefault();
                    /* Act on the event */
                    
                    //setTableEval( event.params.data.id, subjectId);
                    var groupId = $("#groupsDropDown").attr('data-sel-id');
                    setTableEst(groupId, event.params.data.id);
                });
            }
            
            $('#nomSelect').trigger('change');
            $('#nomSelect').trigger('change.select2');
        }).fail(function(data) {
            console.log("ajax fail");
        });
    }

    function setTableEval(user_id, subject_id) {
        var drp = $('#evalDatePicker').data('daterangepicker');
        var fIni = drp.startDate.format('YYYY/MM/DD');
        var fFin = drp.endDate.format('YYYY/MM/DD');
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
                            alert("La información no pudo ser actualizada.");
                        }
                    }).fail(function(data) {
                        console.log("ajax fail");
                        alert("La información no pudo ser actualizada.");
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
                { name: "lab_name", type: "text", align: "center", width: 180, title: "Nombre" },
                { name: "delivery_date", type: "text", align: "center", width: 70, title: "Fecha" },
                { name: "lab_state", type: "checkbox", align: "center", width: 50, title: "Estado" },
                { name: "lab_delivery_time", type: "text", align: "center", width: 30, title:"E" },
                { name: "lab_attempts", type: "text", align: "center", width: 30, title:"I" },
                { name: "lab_teacher_score", type: "text", align: "center", width: 30, title:"P" },
                { name: "lab_app_score", type: "text", align: "center", width: 30, title:"A" },
                { name: "lab_final_score", type: "text", align: "center", width: 30, title:"F" },
                { type: "control" }
            ]
        });
    }

    function setTableEst(groupId, labId) {
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
                        labId:labId
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
                            alert("La información no pudo ser actualizada.");
                        }
                    }).fail(function(data) {
                        console.log("ajax fail");
                        alert("La información no pudo ser actualizada.");
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
                { name: "user_name", type: "text", align: "center", width: 180, title: "Nombre" },
                { name: "delivery_date", type: "text", align: "center", width: 50, title: "Fecha" },
                { name: "lab_state", type: "checkbox", align: "center", width: 50, title: "Estado" },
                { name: "lab_delivery_time", type: "text", align: "center", width: 30, title:"E" },
                { name: "lab_attempts", type: "text", align: "center", width: 30, title:"I" },
                { name: "lab_teacher_score", type: "text", align: "center", width: 30, title:"P" },
                { name: "lab_app_score", type: "text", align: "center", width: 30, title:"A" },
                { name: "lab_final_score", type: "text", align: "center", width: 30, title:"F" },
                { type: "control" }
            ]
        });
    }

    function setAvanceProm(data) {
        console.log(data);
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

            if(elem.lab_state == "1"){
                entre++;
                prom+= elem.lab_final_score;
            }
        }

        if(entre == 0){
            $promInd.text('-');
        }
        else{
            prom = prom/entre;
            $avanInd.text(prom.toFixed(1) + " %");
        }

        avan = entre * 100 / n;
        $avanInd.text(parseInt(avan) + " %");
    }


})(jQuery);