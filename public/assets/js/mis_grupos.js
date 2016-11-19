
(function($) {

	function init() {
        $('#tipoDropdown-grupos').on('click', function(event) {
            event.preventDefault();

            setGroupsTable();
            $('#tipoDropdown').html('Grupos  ' + '<span class="caret"></span>');
            $('#gDropDownCont').hide();
        });;

        $('#tipoDropdown-materias').on('click', function(event) {
            event.preventDefault();

            $('#tipoDropdown').html('Materias  ' + '<span class="caret"></span>');
            setGroupsDropDown();
        });;

	    setGroupsTable();
        $('#gDropDownCont').hide();
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
            url: CON_URL+"groups/getGroupsByUser",
            data:{data:jData}
        }).done(function(data) {
            var res = $.parseJSON(b64_to_utf8(data));
            $('#gDropDownCont').show();
            $dropDown.children('button').html();

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
                setSubjectsTable();
            }

            res.data.forEach(function(e,i) {
                $aRow = 
                    $('<a class="userGroupSelElem" data-id="' + e.group_id 
                        + '" data-ug-id="' + e.user_group_id + '" href="#">' + e.name + '</a>');

                $aRow.off("click").on('click', function(event) {
                    event.preventDefault();
                    $this = $(this);
                    $dropDown.children('button').html(e.name + '  <span class="caret"></span>');
                    $dropDown.attr('data-sel-id', e.group_id);
                    $dropDown.attr('data-sel-ug-id', e.user_group_id);

                    setSubjectsTable();
                    //setTableAnun($this.attr('data-id'));
                }); 

                $newRow = $('<li></li>').append($aRow);
                $dropDownMenu.append($newRow);
            });

            //setSubjectsDropDown(res.data[0].group_id);
        }).fail(function(data) {
            console.log("ajax fail");
        });
    }

	function setGroupsTable() {
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
            controller: {
                loadData: function(filter) {
                    var d = $.Deferred();
                    var session = $.cookie(SESSION_COOKIE);

                    var data = {
                        userId:session.id
                    };
     
                    var jData = utf8_to_b64( JSON.stringify(data) );
                    $.ajax({
                        url: CON_URL+"groups/getAllByUser",
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

                    if(item.asignado)
                        mns = 'Seguro desea asinarse el grupo ' + item.name + '.';
                    else
                        mns = 'Se perderá toda la información relacionada con el grupo ' + item.name + '. ¿Desea continuar?';

                    var res = confirm(mns);
                            
                    if (res) {
                        var data = {
                            userId:session.id,
                            groupId:item.id,
                            asignado:item.asignado
                        };     
                        var jData = utf8_to_b64( JSON.stringify(data) );
                        $.ajax({
                            url: CON_URL+"groups/asignUser",
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
                    }
                    else{
                        item.asignado = !item.asignado;
                        d.resolve(item);
                    }
                    return d.promise();
                }
            },

            rowClick: function(obj) {
                var item = obj.item;
            },

            pagerFormat: "Pag {first} {prev} {pages} {next} {last}    {pageIndex} de {pageCount}",
            pagePrevText: " < ",
		    pageNextText: " > ",
		    pageFirstText: " << ",
		    pageLastText: " >> ",

            fields: [ 
                { name: "name", type: "text", align: "center", title: "Nombre", editing:false },
                { name: "asignado", type: "checkbox", align: "center", title: "Matriculado" },
            	{ type: "control" }
            ]
        });
	}

    function setSubjectsTable() {
        var groupId = $dropDown.attr('data-sel-id');
        var userGroupId = $dropDown.attr('data-sel-ug-id');

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
                        groupId:groupId,
                        userGroupId:userGroupId,
                    };
     
                    var jData = utf8_to_b64( JSON.stringify(data) );
                    $.ajax({
                        url: CON_URL+"subjects/getByUserGroup",
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
                    console.log("sdasd");
                    var mns = '';
                    var d = $.Deferred();
                    var session = $.cookie(SESSION_COOKIE);

                    if(item.asignado)
                        mns = 'Seguro desea asinarse la materia ' + item.name + '.';
                    else
                        mns = 'Se perderá toda la información relacionada con la materia ' + item.name + '. ¿Desea continuar?';

                    var res = confirm(mns);
                            
                    if (res) {
                        var data = {
                            userGroupId:userGroupId,
                            scId:item.sc_id,
                            asignado:item.asignado
                        };
         
                        var jData = utf8_to_b64( JSON.stringify(data) );
                        $.ajax({
                            url: CON_URL+"subjects/assignUserSubject",
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
                    }
                    else{
                        item.asignado = !item.asignado;
                        d.resolve(item);
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
                { name: "name", type: "text", align: "center", title: "Nombre", editing:false },
                { name: "asignado", type: "checkbox", align: "center", title: "Matriculado" },
                { type: "control" }
            ]
        });
    }

})(jQuery);