
(function($) {

	function init() {
	    setGroupsDropDown();
	}

	init();

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
            url: CON_URL+"groups/getAll",
            data:{data:jData}
        }).done(function(data) {
            var res = $.parseJSON(b64_to_utf8(data));

            $dropDown.children('button').html('Todos  ' + '<span class="caret"></span>');
            $dropDown.attr('data-sel-id', '-1');
            setGroupsTable();

            $newRow = $('<li><a class="userGroupSelElem" data-id="-1" href="#">Todos</a></li>');
            $newRow.off("click").on('click', function(event) {
                event.preventDefault();
                $this = $(this);
                
                $dropDown.attr('data-sel-id', $this.attr('data-id'));
                $dropDown.children('button').html($this.text() + '<span class="caret"></span>');
                setGroupsTable();
            }); 

            $dropDownMenu.append($newRow);
            res.data.forEach(function(e,i) {
                $aNewRow = $('<a class="userGroupSelElem" data-id="' + e.id + '" href="#">' + e.name + '</a>');

                $aNewRow.off("click").on('click', function(event) {
                    event.preventDefault();
                    $this = $(this);
                    
                    $dropDown.attr('data-sel-id', $this.attr('data-id'));
                    $dropDown.children('button').html($this.text() + '<span class="caret"></span>');
                    setSubjectsTable($this.attr('data-id'));
                }); 

                $newRow = $('<li></li>').append($aNewRow);
                $dropDownMenu.append($newRow);
            });            

        }).fail(function(data) {
            console.log("ajax fail");
        });
    }

	function setGroupsTable() {
		$("#jsGrid").jsGrid({
            width: "100%",
            inserting:true,
            filtering: true,
            sorting: true,
            paging: true,
            editing: true,
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
                    };
     
                    var jData = utf8_to_b64( JSON.stringify(data) );
                    $.ajax({
                        url: CON_URL+"groups/getAll",
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
                updateItem: function(item) {
                    var d = $.Deferred();
                    var session = $.cookie(SESSION_COOKIE);

                    d.fail(function() {
                        d.resolve([]);
                        $("#jsGrid").jsGrid("render");
                    });

                    if(item.name == ""){
                        $('#alertModalCont').text("Todos los campos son necesarios.");
                        $('#alertModal').modal('show');
                        d.reject();
                    }
                    else{
                        var data = {
                            groupId:item.id,
                            name:item.name
                        };
         
                        var jData = utf8_to_b64( JSON.stringify(data) );
                        $.ajax({
                            url: CON_URL+"groups/edit",
                            data:{data:jData}
                        }).done(function(data) {
                            var res = $.parseJSON(b64_to_utf8(data));
                            //console.log(res);
                            if(res.status == "true")
                                d.resolve(item);
                            else{
                                if(res.data.state == "REPEATED"){
                                    $('#alertModalCont').text("El grupo ya ha sido registrado.");
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
                            item.asignado = (item.asignado == 0) ? 1 : 0;
                            $('#alertModalCont').text("Error al intentar realizar el registro.");
                            $('#alertModal').modal('show');
                            d.reject();
                        });
                    }
     
                    return d.promise();
                },
                insertItem: function(item) {
                    item.date = moment().format("DD/MM/YYYY");
                    var d = $.Deferred();
                    var session = $.cookie(SESSION_COOKIE);

                    d.fail(function() {
                        d.resolve([]);
                        $("#jsGrid").jsGrid("render");
                    });

                    if(item.name == ""){
                        $('#alertModalCont').text("Todos los campos son necesarios.");
                        $('#alertModal').modal('show');
                        d.reject();
                    }
                    else{
                        var data = {
                            name:item.name
                        };
                        var jData = utf8_to_b64( JSON.stringify(data) );
                        $.ajax({
                            url: CON_URL+"groups/insert",
                            data:{data:jData}
                        }).done(function(data) {
                            var res = $.parseJSON(b64_to_utf8(data));

                            if(res.status == "true")
                                d.resolve(item);
                            else{
                                if(res.data.state == "REPEATED"){
                                    $('#alertModalCont').text("El grupo ya ha sido registrado.");
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
            	{ type: "control" }
            ]
        });
	}

    function setSubjectsTable() {
        var groupId = $("#groupsDropDown").attr('data-sel-id');

        $("#jsGrid").jsGrid({
            width: "100%",
            filtering: true,
            sorting: true,
            paging: true,
            editing: true,
            autoload: true,
            pageSize: 10,
            pageButtonCount: 5,
            noDataContent: "Ningún dato encontrado.",
            loadMessage: "Cargando...",
            confirmDeleting: true,
            deleteConfirm: "¿Seguro desea quitar la asignación?",
            controller: {
                loadData: function(filter) {
                    var d = $.Deferred();
                    var session = $.cookie(SESSION_COOKIE);

                    var data = {
                        groupId:groupId
                    };
     
                    var jData = utf8_to_b64( JSON.stringify(data) );
                    $.ajax({
                        url: CON_URL+"subjects/getByGroupId",
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
                updateItem: function(item) {

                    var d = $.Deferred();
                    var session = $.cookie(SESSION_COOKIE);

                    var data = {
                        groupId:groupId,
                        subjectId:item.id,
                        asignado:item.asignado
                    };
     
                    var jData = utf8_to_b64( JSON.stringify(data) );
                    $.ajax({
                        url: CON_URL+"subjects/assignGroupSubject",
                        data:{data:jData}
                    }).done(function(data) {
                        //var res = $.parseJSON(b64_to_utf8(data));
                        //console.log(res);
                        d.resolve(item);
                    }).fail(function(data) {
                        console.log("ajax fail");
                        item.asignado = (item.asignado == 0) ? 1 : 0;
                        d.resolve(item);
                    });
     
                    return d.promise();
                }
            },


            pagerFormat: "Pag {first} {prev} {pages} {next} {last}    {pageIndex} de {pageCount}",
            pagePrevText: " < ",
            pageNextText: " > ",
            pageFirstText: " << ",
            pageLastText: " >> ",

            fields: [ 
                { name: "name", type: "text", align: "center", title: "Nombre", editing:false },
                { name: "asignado", type: "checkbox", align: "center", title: "Asignado" },
                { type: "control" }
            ]
        });
    }

})(jQuery);