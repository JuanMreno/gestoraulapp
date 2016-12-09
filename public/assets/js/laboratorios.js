
(function($) {

	function init() {
	    setGroupsDropDown();

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
                                $('#alertModalCont').text("Información cargada con éxito.");
                                $('#alertModal').modal('show');
                                $modal.modal('hide');
                                init();
                            }
                            else{
                                $('#alertModalCont').text("Formato o información incorrecta, valide la información e intente de nuevo.");
                                $('#alertModal').modal('show');
                            }
                        }
                        else{
                            $('#alertModalCont').text("Ha ocurrido un error inesperado, inténtalo de nuevo.");
                            $('#alertModal').modal('show');
                        }
                    })
                    .error(function(e) {
                        $('#alertModalCont').text("Error de conexión.");
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
		$("#jsGrid").jsGrid({
            width: "100%",
            inserting:true,
            filtering: true,
            sorting: true,
            paging: true,
            editing: true,
            deleted:true,
            confirmDeleting: false,
            autoload: true,
            pageSize: 10,
            pageButtonCount: 5,
            noDataContent: "Ningún dato encontrado.",
            loadMessage: "Cargando...",
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

                    var mns = "Se eliminarán todos los datos asociados a la práctica, ¿está seguro de realizar esta operación?";

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
                                $('#alertModalCont').text("Error al intentar eliminar el elemento.");
                                $('#alertModal').modal('show');
                                d.reject();
                                //d.resolve(false);
                            }
                        }).fail(function(data) {
                            console.log("ajax fail");
                            $('#alertModalCont').text("Error al intentar eliminar el elemento.");
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
                        $('#alertModalCont').text("Todos los campos son necesarios.");
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
                                    $('#alertModalCont').text("El laboratorio ya ha sido registrado.");
                                    $('#alertModal').modal('show');
                                }
                                else{
                                    $('#alertModalCont').text("Error al intentar realizar el registro.");
                                    $('#alertModal').modal('show');
                                }
                                d.reject();
                                //d.resolve(false);
                            }
                        }).fail(function(data) {
                            console.log("ajax fail");
                            $('#alertModalCont').text("Error al intentar realizar el registro.");
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
                        $('#alertModalCont').text("Todos los campos son necesarios.");
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
                                    $('#alertModalCont').text("El laboratorio ya ha sido registrado.");
                                    $('#alertModal').modal('show');
                                }
                                else{
                                    $('#alertModalCont').text("Error al intentar realizar el registro.");
                                    $('#alertModal').modal('show');
                                }
                                d.reject();
                                //d.resolve(false);
                            }
                        }).fail(function(data) {
                            console.log("ajax fail");
                            $('#alertModalCont').text("Error al intentar realizar el registro.");
                            $('#alertModal').modal('show');
                            d.reject();
                        });
                    }
                    return d.promise();
                }
            },

            pagerFormat: "Pag {first} {prev} {pages} {next} {last}    {pageIndex} de {pageCount}",
            pagePrevText: " < ",
		    pageNextText: " > ",
		    pageFirstText: " << ",
		    pageLastText: " >> ",

            fields: [ 
                { name: "name", type: "text", align: "center", title: "Nombre", editing:true },
                { name: "lesson_name", type: "text", align: "center", title: "Unidad", editing:true },
                { name: "lab_code", type: "text", align: "center", title: "Código", editing:true },
            	{ type: "control"}
            ]
        });
	}

})(jQuery);