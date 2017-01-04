
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

    $(document).ready(function() {
        $('.spanTitCont').text(locale.page_title_uc);
        $('.containerHeader').find('h1').text(locale.mgroups_title);

        $('#type_label').text(locale.type_label);
        $('#tipoDropdown').text(locale.groups);
        $('#tipoDropdown-grupos').text(locale.groups);
        $('#tipoDropdown-materias').text(locale.subjects);
        $('#groupLabel').text(locale.group);
    });

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
                $dropDown.children('button').text(locale.none2)
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
            noDataContent: locale.none_data,
            loadMessage: locale.loading,
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

                    d.fail(function() {
                        d.resolve([]);
                        $("#jsGrid").jsGrid("render");
                    });

                    var session = $.cookie(SESSION_COOKIE);
                    var mns = "";
                    if(item.asignado)
                        mns = locale.warning_3 + ' ' + item.name + '?';
                    else
                        mns = locale.warning_4 + ' ' + item.name + '. ' + locale.warning_5;

                    $confModal = $('#confirmModal');
                    $confModal.find('#confirmModalCont').text(mns);

                    $confModal.find('#doneConfirmModal').off('click').on('click', function(event) {
                        event.preventDefault();
                        $confModal.modal('hide');
                        
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
                    });

                    $confModal.on('hidden.bs.modal', function (e) {
                        d.reject();
                    });

                    $confModal.modal('show');
                    return d.promise();
                }
            },

            rowClick: function(obj) {
                var item = obj.item;
            },

            pagerFormat: "Pag {first} {prev} {pages} {next} {last}    {pageIndex} / {pageCount}",
            pagePrevText: " < ",
		    pageNextText: " > ",
		    pageFirstText: " << ",
		    pageLastText: " >> ",

            fields: [ 
                { name: "name", type: "text", align: "center", title: locale.table_name, editing:false },
                { name: "asignado", type: "checkbox", align: "center", title: locale.table_matr },
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
            noDataContent: locale.none_data,
            loadMessage: locale.loading,
            confirmDeleting: true,
            deleteConfirm: locale.warning_6,
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

                    d.fail(function() {
                        d.resolve([]);
                        $("#jsGrid").jsGrid("render");
                    });

                    if(item.asignado)
                        mns = locale.warning_7 + " " + item.name + ".";
                    else
                        mns = locale.warning_8 + " " + item.name + '. ' + locale.warning_5;

                    $confModal = $('#confirmModal');
                    $confModal.find('#confirmModalCont').text(mns);

                    $confModal.find('#doneConfirmModal').off('click').on('click', function(event) {
                        event.preventDefault();
                        $confModal.modal('hide');
                        
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
                    });

                    $confModal.on('hidden.bs.modal', function (e) {
                        d.reject();
                    });

                    $confModal.modal('show');     
                    return d.promise();
                }
            },


            pagerFormat: "Pag {first} {prev} {pages} {next} {last}    {pageIndex} / {pageCount}",
            pagePrevText: " < ",
            pageNextText: " > ",
            pageFirstText: " << ",
            pageLastText: " >> ",

            fields: [ 
                { name: "name", type: "text", align: "center", title: locale.table_name, editing:false },
                { name: "asignado", type: "checkbox", align: "center", title: locale.table_matr },
                { type: "control" }
            ]
        });
    }

})(jQuery);