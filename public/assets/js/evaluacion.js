
(function($) {
    var valSelected;
    var popGenReport = 
        '<div id="dlEvalPopOver" class="row" style="padding:4px 10px 4px 10px">'+
            '<button id="dlExcelReport" type="button" class="btn btn-primary" data-toggle="popover" style="margin-right:5px;">'+
                '<i class="fa fa-file-excel-o fa-2x" aria-hidden="true"></i>'+
            '</button>'+
            '<button id="dlPdfEvalReport" type="button" class="btn btn-primary" data-toggle="popover" style="margin-right:5px">'+
                '<i class="fa fa-file-pdf-o fa-2x" aria-hidden="true"></i>'+
            '</button>'+
        '</div>';

    $(document).ready(function() {
        $('.spanTitCont').text(locale.page_title_uc);
        $('.containerHeader').find('h1').text(locale.cons_title);

        $('#groupSpan').text(locale.group);
        $('#subjectLabel').text(locale.subject);
        $('#typeSpan').text(locale.b_type);

        $('#tipoDropdown').text(locale.student);
        $('#tipoDropdown-estudiante').text(locale.student);
        $('#tipoDropdown-practica').text(locale.prac_label);


        $('#datesLabel').text(" " + locale.dates);
        $('#nameLabel').text(" " + locale.name);
        $('#perfLabel').text(" " + locale.perf);
        $('#avgLabel').text(" " + locale.avg);

        $('#pracLabel').text(" " + locale.prac_label);
        $('#labelState').text(" " + locale.state);

        $('#unidadLabel').text(locale.lab_modal_1);
        $('#fEntrLabel').text(locale.lab_modal_2);
        $('#tEntregaLabel').text(locale.lab_modal_3);
        $('#nProfesorLabel').text(locale.lab_modal_4);
        $('#nAppLabel').text(locale.lab_modal_5);
        $('#nFinalLabel').text(locale.lab_modal_6);
        $('#nIntentLabel').text(locale.lab_modal_7);
        $('#obsrvLbl').text(locale.lab_modal_8);
        $('#inpFileLbl').text(locale.lab_modal_9);
        $('#btnUploadReport').text(locale.lab_modal_10);
        $('#btnDownL').text(locale.lab_modal_11);

        $('#nProfesorLabel').attr('title', locale.tooltip_4);
        $('#nAppLabel').attr('title', locale.tooltip_5);
        $('#nFinalLabel').attr('title', locale.tooltip_6);

        $('#mdlCloseBtn').text(locale.close);
        $('#btnRestInt').text(locale.btnRestInt);
        $('#btnSave').text(locale.save);
    });

	function mainInit() {
		$('#tipoDropdown-practica').on('click', function(event) {
            event.preventDefault();

            setTableConsPrac();
            $('#tipoDropdown').text(locale.prac_label);
        });;

        $('#tipoDropdown-estudiante').on('click', function(event) {
            event.preventDefault();

            setTableConsEst();
            $('#tipoDropdown').text(locale.student);
        });;

        /*
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
        });*/
        
        setDownLoadBtns();

        $('#nomSelect').select2();

        $('#evalDatePicker').daterangepicker({
            locale: {
              format: 'DD-MM-YYYY'
            },
            startDate: moment().format('DD/MM/YYYY'),
            endDate: moment().add(3, 'months').format('DD/MM/YYYY')
        });
        $('#evalDatePicker').attr('disabled',true);

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
                $dropDown.children('button').text(locale.none2)
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

                    $("#groupsDropDown").children('button').html($this.text() + '<span class="caret"></span>');
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
        $('#avanInd').text('-');
        $('#promInd').text('-');

        $dropDown = $("#subjectsDropDown");
        $dropDownMenu = $dropDown.children('.dropdown-menu').first();
        $dropDownMenu.html("");

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
                $dropDown.children('button').text(locale.none);
                $dropDown.attr('data-sel-id', -1);

                $('#nomSelect').html("");
                $('#nomSelect').select2({
                  data: [],
                  placeholder: locale.none_data
                });  

                $("#jsGrid").jsGrid("destroy");
                return;
            }
            else{
                //setTableAnun(res.data[0].user_group_id);
                $dropDown.children('button').html(res.data[0].name + '<span class="caret"></span>');
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
                    $dropDown.children('button').html($this.text() + '<span class="caret"></span>');
                    $dropDown.attr('data-sel-id', $this.attr('data-id'));

                    var groupId = $("#groupsDropDown").attr('data-sel-id'); 
                    setStudentsDropDown(groupId); 
                });

            });

            var groupId = $("#groupsDropDown").attr('data-sel-id'); 
            setStudentsDropDown(groupId);                
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
            
            if(res.data.length == 0){
                $('#nomSelect').select2({
                  data: res.data,
                  placeholder: locale.none_data
                });
                $("#jsGrid").jsGrid("destroy");
            }
            else{
                var subjectId = $("#subjectsDropDown").attr('data-sel-id');

                setTableEval( res.data[0].id, subjectId);
                $('#nomSelect').select2({
                  data: res.data
                });  
                valSelected = res.data[0].text;
                
                $('#nomSelect').off('select2:select').on('select2:select', function(event) {
                    event.preventDefault();
                    /* Act on the event */
                    
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

    var aData = [];
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
            noDataContent: locale.none_data,
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
                $('#btnRestInt').show();

                $modal.find('#cUnidad').val(item.less_name);
                $modal.find('#fEntrega').val(item.delivery_date);
                $modal.find('#nProfesor').val(item.lab_teacher_score);
                $modal.find('#nApp').val(item.lab_app_score);
                $modal.find('#nFinal').val(item.lab_final_score);
                $modal.find('#obsrv').val(item.lab_comments);
                $modal.find('#numInten').val(item.lab_attempts);

                $("#tEntrega").mask("99:99:99",{placeholder:"hh/mm/ss"});
                $modal.find('#tEntrega').val(item.lab_delivery_time);

                if(item.lab_state == "1"){
                    $labelState.removeClass('label-danger');
                    $labelState.addClass("label").addClass('label-success');
                    $labelState.text(locale.delivery);
                }
                else{
                    $labelState.removeClass('label-success');
                    $labelState.addClass("label").addClass('label-danger');
                    $labelState.text(locale.pending);
                }

                if(item.lab_users_id == null || item.lab_users_id == ""){
                    $('#aBtnDownL').hide();
                }
                else{
                    $('#aBtnDownL').attr('href', item.lab_report_url);
                }

                if( $modal.find('#nApp').val() == "" )
                    $modal.find('#nApp').removeClass('only-read');
                else
                    $modal.find('#nApp').addClass('only-read');

                if( $modal.find('#numInten').val() == "" )
                    $modal.find('#numInten').removeClass('only-read');
                else
                    $modal.find('#numInten').addClass('only-read');

                if( $modal.find('#tEntrega').val() == "" )
                    $modal.find('#tEntrega').removeClass('only-read');
                else
                    $modal.find('#tEntrega').addClass('only-read');


                var nAppValAct = item.lab_app_score == "" ? null : item.lab_app_score;
                var nIntValAct = item.lab_attempts == "" ? null : item.lab_attempts;
                var tEntValAct = item.lab_delivery_time == "" ? null : item.lab_delivery_time;

                $('#btnSave').off('click').on('click', function(event) {
                    event.preventDefault();

                    var obsVal = $modal.find('#obsrv').val();
                    var nProVal = $modal.find('#nProfesor').val();
                    var nAppVal = $modal.find('#nApp').val();
                    var nIntVal = $modal.find('#numInten').val();
                    var tEntVal = document.getElementById("tEntrega").value;
                    
                    /*
                    if( nProVal == "" ||
                        nAppVal == "" ||
                        nIntVal == ""
                    ){
                        $('#alertModalCont').text("Todos los campos son necesarios.");
                        $('#alertModal').modal('show');
                        return;
                    }*/

                    nAppVal = nAppVal == "" ? null : nAppVal;  
                    nIntVal = nIntVal == "" ? null : nIntVal;  
                    tEntVal = tEntVal == "" ? null : tEntVal;  
                    nProVal = nProVal == "" ? null : nProVal;  
                    obsVal = obsVal == "" ? null : obsVal;  

                    var data = {
                        id:item.lab_users_id,
                        teacher_score:nProVal,
                        app_score:nAppVal,
                        lab_attempts:nIntVal,
                        delivery_time:tEntVal,
                        comments:obsVal
                    }

                    var jData = utf8_to_b64( JSON.stringify(data) );

                    if(tEntVal != null)
                        if(!validateTimeFormat(tEntVal)){
                            $('#alertModalCont').text(locale.error_format_1);
                            $('#alertModal').modal('show');
                            return;
                        }

                    if(parseInt(nAppVal) != NaN)
                        if(parseInt(nAppVal) < 0 || parseInt(nAppVal) > 5){
                            $('#alertModalCont').text(locale.error_format_2);
                            $('#alertModal').modal('show');
                            return;
                        }

                    if(parseInt(nProVal) != NaN)
                        if(parseInt(nProVal) < 0 || parseInt(nProVal) > 5){
                            $('#alertModalCont').text(locale.error_format_2);
                            $('#alertModal').modal('show');
                            return;
                        }

                    if(nAppVal != nAppValAct || nIntVal != nIntValAct || tEntVal != tEntValAct ){
                        $confModal = $('#confirmModal');
                        $confModal.find('#confirmModalCont')
                                .text(locale.warning_1);

                        $confModal.find('#doneConfirmModal').off('click').on('click', function(event) {
                            event.preventDefault();
                            $confModal.modal('hide');
                            
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
                                    $('#alertModalCont').text(locale.error_update);
                                    $('#alertModal').modal('show');
                                }
                            }).fail(function(data) {
                                console.log("ajax fail");
                                $('#alertModalCont').text(locale.error_update);
                                $('#alertModal').modal('show');
                            });
                        });

                        $confModal.modal('show');
                    }
                    else{
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
                                $('#alertModalCont').text(locale.error_update);
                                $('#alertModal').modal('show');
                            }
                        }).fail(function(data) {
                            console.log("ajax fail");
                            $('#alertModalCont').text(locale.error_update);
                            $('#alertModal').modal('show');
                        });
                    }
                });

                if(item.lab_users_id != null && item.lab_users_id != "" && item.lab_state == "1"){
                    $('#btnRestInt').off('click').on('click', function(event) {
                        event.preventDefault();

                        $confModal = $('#confirmModal');
                        $confModal.find('#confirmModalCont').text(locale.warning_2);

                        $confModal.find('#doneConfirmModal').off('click').on('click', function(event) {
                            event.preventDefault();
                            $confModal.modal('hide');
                            
                            var data = {
                                labId:item.lab_users_id
                            }

                            var jData = utf8_to_b64( JSON.stringify(data) );
                            $.ajax({
                                url: CON_URL+"evaluation/resetLabAttempt",
                                data:{data:jData}
                            }).done(function(data) {
                                var res = $.parseJSON(b64_to_utf8(data));

                                if(res.status == "true"){
                                    $("#jsGrid").jsGrid("render");
                                    $modal.modal('toggle');
                                }
                                else{
                                    $('#alertModalCont').text(locale.error_update);
                                    $('#alertModal').modal('show');
                                }
                            }).fail(function(data) {
                                console.log("ajax fail");
                                $('#alertModalCont').text(locale.error_update);
                                $('#alertModal').modal('show');
                            });
                        });

                        $confModal.modal('show');
                    });
                }
                else{
                    $('#btnRestInt').hide();
                }

                $modal.modal('show');
                $modal.on('shown.bs.modal', function (e) {
                    //console.log(item);
                });
            },

            pagerFormat: "Pag {first} {prev} {pages} {next} {last}    {pageIndex} / {pageCount}",
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
                        "title": locale.tooltip_1
                    });

                    $e = $(".jsgrid-header-row > .jsgrid-header-cell:eq(3)");
                    $e.attr({
                        "data-toggle": 'tooltip',
                        "data-container": 'body',
                        "title": locale.tooltip_2
                    });

                    $e = $(".jsgrid-header-row > .jsgrid-header-cell:eq(4)");
                    $e.attr({
                        "data-toggle": 'tooltip',
                        "data-container": 'body',
                        "title": locale.tooltip_3
                    });

                    $e = $(".jsgrid-header-row > .jsgrid-header-cell:eq(5)");
                    $e.attr({
                        "data-toggle": 'tooltip',
                        "data-container": 'body',
                        "title": locale.tooltip_4
                    });

                    $e = $(".jsgrid-header-row > .jsgrid-header-cell:eq(6)");
                    $e.attr({
                        "data-toggle": 'tooltip',
                        "data-container": 'body',
                        "title": locale.tooltip_5
                    });

                    $e = $(".jsgrid-header-row > .jsgrid-header-cell:eq(7)");
                    $e.attr({
                        "data-toggle": 'tooltip',
                        "data-container": 'body',
                        "title": locale.tooltip_6
                    });

                    $('[data-toggle="tooltip"]').tooltip();
                }
            },

            fields: [
                { name: "lab_name", type: "text", align: "center", width: 170, title: locale.table_name },
                { name: "delivery_date", type: "text", align: "center", width: 60, title: locale.table_date },
                { name: "lab_state", type: "checkbox", align: "center", width: 50, title: locale.table_state },
                { name: "lab_delivery_time", type: "text", align: "center", width: 50, title:locale.table_t },
                { name: "lab_attempts", type: "text", align: "center", width: 30, title:locale.table_i },
                { name: "lab_teacher_score", type: "text", align: "center", width: 30, title:locale.table_p },
                { name: "lab_app_score", type: "text", align: "center", width: 30, title:locale.table_l },
                { name: "lab_final_score", type: "text", align: "center", width: 30, title:locale.table_f },
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

        console.log(data);
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

    function setDownLoadBtns() {
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
            
            //const pdfConst = new PdfMakeConstructor(stuName.replace(" ", "_") + "_report.pdf");
            //pdfConst.makeStuReport(data);

            var jData = JSON.stringify(data);
            $.ajax({
                method: "GET",
                url: CON_URL+"reports/makeStudentReport",
                data:{data:jData}
            })
            .done(function( data ) {
                var res = $.parseJSON(data);
                if(res.state == "true"){
                    //$.fileDownload(res.url);
                    $('#btnDownLPdf').prop('href', res.url);
                    document.getElementById('btnDownLPdf').click();
                }
                else{
                    $('#alertModalCont').text(locale.error_try_again);
                    $('#alertModal').modal('show');
                }
            })
            .error(function(e) {
                $('#alertModalCont').text(locale.error_try_again);
                $('#alertModal').modal('show');
                console.log("Error ajax.");
            });
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

            var selType = 'est';
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

            $('#btnDownLXL').prop('href', CON_URL+"reports/getTeacher?data=" + JSON.stringify(data));
            document.getElementById('btnDownLXL').click();
            //$.fileDownload(CON_URL+"reports/getTeacher?data=" + JSON.stringify(data));
        });
    }

    function validateTimeFormat(timeStr) {
        return (timeStr.search(/^\d{2}:\d{2}:\d{2}$/) != -1) &&
            //(timeStr.substr(0,2) >= 0 && timeStr.substr(0,2) <= 99) &&
            (timeStr.substr(3,2) >= 0 && timeStr.substr(3,2) <= 59) &&
            (timeStr.substr(6,2) >= 0 && timeStr.substr(6,2) <= 59);    
    }

})(jQuery);