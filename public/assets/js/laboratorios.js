
(function($) {

    $(document).ready(function() {
        $('.spanTitCont').text(locale.page_title_uc);
        $('.containerHeader').find('h1').text(locale.labs_title);

        $('#subjsLabel').text(locale.subjects);
        $('#uploadLabs').attr('title', locale.tooltip_10);
        $('#loadLabs').text(locale.labs_label_1);
        $('#loadLab').text(locale.labs_label_2);
        $('#btnUploadLabs').text(locale.upload);
        $('#closeModal').text(locale.close);

        $('[data-toggle="tooltip"]').tooltip();
    });

	function init() {
	    setGroupsDropDown();

        var session = $.cookie(SESSION_COOKIE);

        if(session.rol != SAD_ROL){
            $('#uploadLabsCont').hide();
            $('#jsGrid').addClass('writeHideTable');
        }

        $('#uploadLabs').off('click').on('click', function(event) {
            event.preventDefault();
            /* Act on the event */

            $modal = $('#modalUploadLabs');
            $modal.off('shown.bs.modal').on('shown.bs.modal', function (e) {
                //console.log(item);

                $('#btnUploadLabs').off('click').on('click', function(event) {
                    event.preventDefault();
                    var fd = new FormData(document.getElementById("uploadLabsForm"));
                    ajaxConfig = {
                        method: "POST",
                        url: CON_URL+"uploads/labs",
                        data:fd,
                        processData: false,  // tell jQuery not to process the data
                        contentType: false
                    };

                    $.ajax(ajaxConfig)
                    .done(function( data ) {
                            
                        var res = $.parseJSON(b64_to_utf8(data));
                        if(res.state == "true"){
                            if(res.res_code == "QUERY_OK"){
                                $('#alertModalCont').text(locale.success_msg_1);
                                $('#alertModal').modal('show');
                                $modal.modal('hide');
                                init();
                            }
                            else{
                                $('#alertModalCont').text(locale.error_format_4);
                                $('#alertModal').modal('show');
                            }
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
            });
            $modal.modal("show");
        });
	}

	init();

    function setGroupsDropDown() {
        $dropDown = $("#labsDropDown");
        $dropDownMenu = $dropDown.children('.dropdown-menu').first();
        $dropDownMenu.html("");

        var session = $.cookie(SESSION_COOKIE);

        var data = {
            userId:session.id
        };

        var jData = utf8_to_b64( JSON.stringify(data) );
        $.ajax({
            url: CON_URL+"subjects/getAll",
            data:{data:jData}
        }).done(function(data) {
            var res = $.parseJSON(b64_to_utf8(data));

            res.data.forEach(function(e,i) {
                $aNewRow = $('<a class="userGroupSelElem" data-id="' + e.id + '" href="#">' + e.name + '</a>');

                $aNewRow.off("click").on('click', function(event) {
                    event.preventDefault();
                    $this = $(this);
                    
                    $dropDown.attr('data-sel-id', $this.attr('data-id'));
                    $dropDown.children('button').html($this.text() + '<span class="caret"></span>');
                    setlaboratoriesTable($this.attr('data-id'));
                }); 

                $newRow = $('<li></li>').append($aNewRow);
                $dropDownMenu.append($newRow);
            });

            $aNewRow.click();             

        }).fail(function(data) {
            console.log("ajax fail");
        });
    }

	function setlaboratoriesTable(idSub) {
        var session = $.cookie(SESSION_COOKIE);
        var writePremission = false;

        if(session.rol == SAD_ROL)
            writePremission = true;

        console.log(writePremission);
		$("#jsGrid").jsGrid({
            width: "100%",
            inserting:writePremission,
            filtering: true,
            sorting: true,
            paging: true,
            editing:writePremission,
            confirmDeleting: false,
            autoload: true,
            pageSize: 10,
            pageButtonCount: 5,
            noDataContent: locale.none_data,
            loadMessage: locale.loading,
            controller: {
                loadData: function(filter) {
                    var d = $.Deferred();
                    var session = $.cookie(SESSION_COOKIE);

                    var data = {
                        subjectId:idSub
                    };
     
                    var jData = utf8_to_b64( JSON.stringify(data) );
                    $.ajax({
                        url: CON_URL+"laboratories/getBySubject",
                        data:{data:jData}
                    }).done(function(data) {
                        var res = $.parseJSON(b64_to_utf8(data));

                        var dt = res.data;
                        var dataFiltered = $.grep(dt, function(obj) {
                            return (!filter.name || obj.name.indexOf(filter.name) > -1)
                                && (filter.asignado === undefined || Boolean(obj.asignado) === filter.asignado);
                        });

                        d.resolve(dataFiltered);
                    }).fail(function(data) {
                        console.log("ajax fail");
                        d.resolve([]);
                    });

                    return d.promise();
                },
                deleteItem: function(item) {
                    var d = $.Deferred();
                    var session = $.cookie(SESSION_COOKIE);

                    d.fail(function() {
                        d.resolve(item);
                        $("#jsGrid").jsGrid("render");
                    });

                    var mns = locale.cofirm_7;

                    $confModal = $('#confirmModal');
                    $confModal.find('#confirmModalCont').text(mns);

                    $confModal.find('#doneConfirmModal').off('click').on('click', function(event) {
                        event.preventDefault();
                        $confModal.modal('hide');
                        
                        var data = {
                            labId:item.id
                        };
         
                        var jData = utf8_to_b64( JSON.stringify(data) );
                        $.ajax({
                            url: CON_URL+"laboratories/delete",
                            data:{data:jData}
                        }).done(function(data) {
                            var res = $.parseJSON(b64_to_utf8(data));
                            //console.log(res);
                            if(res.status == "true"){
                                d.resolve(item);
                                $("#jsGrid").jsGrid("deleteItem", item);
                            }
                            else{
                                $('#alertModalCont').text(locale.error_try_again);
                                $('#alertModal').modal('show');
                                d.reject();
                                //d.resolve(false);
                            }
                        }).fail(function(data) {
                            console.log("ajax fail");
                            $('#alertModalCont').text(locale.error_try_again);
                            $('#alertModal').modal('show');
                            d.reject();
                        });
                    });

                    $confModal.on('hidden.bs.modal', function (e) {
                        d.reject();
                    });

                    $confModal.modal('show');      
                    return d.promise();
                },
                updateItem: function(item) {
                    var d = $.Deferred();
                    var session = $.cookie(SESSION_COOKIE);

                    d.fail(function() {
                        return null;
                        $("#jsGrid").jsGrid("render");
                    }); 

                    if (item.name == "" || item.lesson_name == "" || item.lab_code == "") {
                        $('#alertModalCont').text(locale.all_fields);
                        $('#alertModal').modal('show');
                        d.reject();
                    } else {
                        var data = {
                            labId:item.id,
                            subjectId:idSub,
                            labName:item.name,
                            lessonName:item.lesson_name,
                            labCode:item.lab_code
                        };
         
                        var jData = utf8_to_b64( JSON.stringify(data) );
                        $.ajax({
                            url: CON_URL+"laboratories/edit",
                            data:{data:jData}
                        }).done(function(data) {
                            var res = $.parseJSON(b64_to_utf8(data));
                            //console.log(res);
                            if(res.status == "true"){
                                d.resolve(item);
                            }
                            else{
                                if(res.data.state == "REPEATED"){
                                    $('#alertModalCont').text(locale.error_user_6);
                                    $('#alertModal').modal('show');
                                }
                                else{
                                    $('#alertModalCont').text(locale.error_try_again);
                                    $('#alertModal').modal('show');
                                }
                                d.reject();
                                //d.resolve(false);
                            }
                        }).fail(function(data) {
                            console.log("ajax fail");
                            $('#alertModalCont').text(locale.error_try_again);
                            $('#alertModal').modal('show');
                            d.reject();
                        });
                    }               
                    return d.promise();
                },
                insertItem: function(item) {
                    var d = $.Deferred();
                    var session = $.cookie(SESSION_COOKIE);

                    d.fail(function() {
                        return null;
                        $("#jsGrid").jsGrid("render");
                    });

                    if (item.name == "" || item.lesson_name == "" || item.lab_code == "") {
                        $('#alertModalCont').text(locale.all_fields);
                        $('#alertModal').modal('show');
                        d.reject();
                    } else {
                        var data = {
                            subjectId:idSub,
                            labName:item.name,
                            lessonName:item.lesson_name,
                            labCode:item.lab_code
                        };
                        var jData = utf8_to_b64( JSON.stringify(data) );
                        $.ajax({
                            url: CON_URL+"laboratories/create",
                            data:{data:jData}
                        }).done(function(data) {
                            var res = $.parseJSON(b64_to_utf8(data));

                            if(res.status == "true")
                                d.resolve(item);
                            else{
                                if(res.data.state == "REPEATED"){
                                    $('#alertModalCont').text(locale.error_user_6);
                                    $('#alertModal').modal('show');
                                }
                                else{
                                    $('#alertModalCont').text(locale.error_try_again);
                                    $('#alertModal').modal('show');
                                }
                                d.reject();
                                //d.resolve(false);
                            }
                        }).fail(function(data) {
                            console.log("ajax fail");
                            $('#alertModalCont').text(locale.error_try_again);
                            $('#alertModal').modal('show');
                            d.reject();
                        });
                    }
                    return d.promise();
                }
            },

            pagerFormat: "Pag {first} {prev} {pages} {next} {last}    {pageIndex} / {pageCount}",
            pagePrevText: " < ",
		    pageNextText: " > ",
		    pageFirstText: " << ",
		    pageLastText: " >> ",

            fields: [ 
                { name: "name", type: "text", align: "center", title: locale.name, editing:writePremission },
                { name: "lesson_name", type: "text", align: "center", title: locale.table_less, editing:writePremission },
                { name: "lab_code", type: "text", align: "center", title: locale.table_code, editing:writePremission },
            	{ type: "control"}
            ]
        });
	}

})(jQuery);