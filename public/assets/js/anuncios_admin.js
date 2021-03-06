
(function($) {

	function init() {
        setGroupsDropDown();
	}

    $(document).ready(function() {
        $('.spanTitCont').text(locale.page_title_uc);
        $('.containerHeader').find('h1').text(locale.anunc_title);

        $('#groupSpan').text(locale.group);
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

            if(res.data.length == 0){
                setTableAnun('-1');
                $dropDown.children('button').text(locale.none2)
                return;
            }
            else{
                //setTableAnun(res.data[0].user_group_id);
                //$dropDown.children('button').html(res.data[0].name + $dropDown.children('button').html());
            }

            setTableAnunAll();
            $dropDown.children('button').html(locale.all + '  <span class="caret"></span>');

            $newRow = $('<li><a class="userGroupSelElem" data-id="-1" href="#">' + locale.all + '</a></li>')
            $dropDownMenu.append($newRow);
            res.data.forEach(function(e,i) {
                $newRow = $('<li><a class="userGroupSelElem" data-id="' + e.user_group_id + '" href="#">' + e.name + '</a></li>')
                $dropDownMenu.append($newRow);
            });

            $dropDown.find('.userGroupSelElem').each(function(index, el) {
                $(el).off("click").on('click', function(event) {
                    event.preventDefault();
                    $this = $(this);

                    if($this.attr('data-id') == '-1')
                        setTableAnunAll();
                    else
                        setTableAnun($this.attr('data-id'));

                    $dropDown.children('button').html($this.text() + '<span class="caret"></span>');
                });                
            });

            

        }).fail(function(data) {
            console.log("ajax fail");
        });
    }

	function setTableAnun(user_group_id) {
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
            noDataContent: locale.none_data,
            loadMessage: locale.loading,
            confirmDeleting: true,
            deleteConfirm: locale.cofirm_1,
            controller: {
                loadData: function(filter) {
                    var d = $.Deferred();
                    var session = $.cookie(SESSION_COOKIE);

                    var data = {
                        userGroupId:user_group_id,
                        userId:session.id
                    };
     
                    var jData = utf8_to_b64( JSON.stringify(data) );
                    $.ajax({
                        url: CON_URL+"messages/getByUserGroup",
                        data:{data:jData}
                    }).done(function(data) {
                        var res = $.parseJSON(b64_to_utf8(data));

                        var dt = res.data;
                        var dataFiltered = $.grep(dt, function(obj) {
                            return (!filter.title || obj.title.indexOf(filter.title) > -1)
                                && (!filter.content || obj.content.indexOf(filter.content) > -1)
                                && (!filter.date || obj.date.indexOf(filter.date) > -1);
                        });

                        d.resolve(dataFiltered);
                    }).fail(function(data) {
                        console.log("ajax fail");
                        d.resolve([]);
                    });

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

                    if(item.title == "" || item.content == ""){
                        $('#alertModalCont').text(locale.all_fields);
                        $('#alertModal').modal('show');
                        d.reject();
                    }
                    else{
                        var data = {
                            title:item.title,
                            content:item.content,
                            user_class_groups_id:user_group_id,
                        };
                        var jData = utf8_to_b64( JSON.stringify(data) );
                        $.ajax({
                            url: CON_URL+"messages/create",
                            data:{data:jData}
                        }).done(function(data) {
                            var res = $.parseJSON(b64_to_utf8(data));

                            if(res.status == "true")
                                d.resolve(item);
                            else
                                d.reject();
                        }).fail(function(data) {
                            console.log("ajax fail");
                            d.reject();
                        });
                    }

                    return d.promise();
                },
                deleteItem: function(item) {
                    var d = $.Deferred();
                    var session = $.cookie(SESSION_COOKIE);

                    var data = {
                        id:item.id
                    };
     
                    var jData = utf8_to_b64( JSON.stringify(data) );
                    $.ajax({
                        url: CON_URL+"messages/delete",
                        data:{data:jData}
                    }).done(function(data) {
                        var res = $.parseJSON(b64_to_utf8(data));
                        
                        if(res.status != "true")
                            $("#jsGrid").refresh();

                        d.resolve();
                    }).fail(function(data) {
                        console.log("ajax fail");
                        $("#jsGrid").refresh();
                        d.resolve();
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

                    if(item.title == "" || item.content == ""){
                        $('#alertModalCont').text(locale.all_fields);
                        $('#alertModal').modal('show');
                        d.reject();
                    }
                    else{
                        var data = {
                            title:item.title,
                            content:item.content,
                            id:item.id,
                        };
                        var jData = utf8_to_b64( JSON.stringify(data) );
                        $.ajax({
                            url: CON_URL+"messages/edit",
                            data:{data:jData}
                        }).done(function(data) {
                            var res = $.parseJSON(b64_to_utf8(data));

                            if(res.status == "true")
                                d.resolve(item);
                            else
                                d.reject();
                        }).fail(function(data) {
                            console.log("ajax fail");
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
             	{ name: "title", type: "text", align: "center", width: 250, filtering: true, inserting:true, editing: true, title:locale.table_title },
	            { name: "content", type: "text", align: "center", width: 400, filtering: true, inserting:true, editing: true, title:locale.table_content },
	            { name: "date", type: "text", align: "center", width: 100, filtering: true, inserting:false, editing: false, title:locale.table_date },
            	{ type: "control" }
            ]
        });
	}

    function setTableAnunAll() {
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
            noDataContent: locale.none_data,
            loadMessage: locale.loading,
            confirmDeleting: true,
            deleteConfirm: locale.cofirm_1,
            controller: {
                loadData: function(filter) {
                    var d = $.Deferred();
                    var session = $.cookie(SESSION_COOKIE);

                    var data = {
                        userId:session.id
                    };
     
                    var jData = utf8_to_b64( JSON.stringify(data) );
                    $.ajax({
                        url: CON_URL+"messages/getByUser",
                        data:{data:jData}
                    }).done(function(data) {
                        var res = $.parseJSON(b64_to_utf8(data));

                        var dt = res.data;
                        var dataFiltered = $.grep(dt, function(obj) {
                            return (!filter.title || obj.title.indexOf(filter.title) > -1)
                                && (!filter.content || obj.content.indexOf(filter.content) > -1)
                                && (!filter.date || obj.date.indexOf(filter.date) > -1);
                        });

                        d.resolve(dataFiltered);
                    }).fail(function(data) {
                        console.log("ajax fail");
                        d.resolve([]);
                    });

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

                    if(item.title == "" || item.content == ""){
                        $('#alertModalCont').text(locale.all_fields);
                        $('#alertModal').modal('show');
                        d.reject();
                    }
                    else{
                        var data = {
                            title:item.title,
                            content:item.content,
                            user_id:session.id,
                        };
                        var jData = utf8_to_b64( JSON.stringify(data) );
                        $.ajax({
                            url: CON_URL+"messages/createAll",
                            data:{data:jData}
                        }).done(function(data) {
                            var res = $.parseJSON(b64_to_utf8(data));

                            if(res.status == "true")
                                d.resolve(item);
                            else
                                d.reject();
                        }).fail(function(data) {
                            console.log("ajax fail");
                            d.reject();
                        });
                    }
                    

                    return d.promise();
                },
                deleteItem: function(item) {
                    var d = $.Deferred();
                    var session = $.cookie(SESSION_COOKIE);

                    var data = {
                        id:item.id
                    };
     
                    var jData = utf8_to_b64( JSON.stringify(data) );
                    $.ajax({
                        url: CON_URL+"messages/deleteAll",
                        data:{data:jData}
                    }).done(function(data) {
                        var res = $.parseJSON(b64_to_utf8(data));
                        
                        if(res.status != "true")
                            $("#jsGrid").refresh();

                        d.resolve();
                    }).fail(function(data) {
                        console.log("ajax fail");
                        $("#jsGrid").refresh();
                        d.resolve();
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

                    if(item.title == "" || item.content == ""){
                        $('#alertModalCont').text(locale.all_fields);
                        $('#alertModal').modal('show');
                        d.reject();
                    }
                    else{
                        var data = {
                            title:item.title,
                            content:item.content,
                            id:item.id,
                        };
                        var jData = utf8_to_b64( JSON.stringify(data) );
                        $.ajax({
                            url: CON_URL+"messages/editAll",
                            data:{data:jData}
                        }).done(function(data) {
                            var res = $.parseJSON(b64_to_utf8(data));

                            if(res.status == "true")
                                d.resolve(item);
                            else
                                d.reject();
                        }).fail(function(data) {
                            console.log("ajax fail");
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
               { name: "title", type: "text", align: "center", width: 250, filtering: true, inserting:true, editing: true, title:locale.table_title },
                { name: "content", type: "text", align: "center", width: 400, filtering: true, inserting:true, editing: true, title:locale.table_content },
                { name: "date", type: "text", align: "center", width: 100, filtering: true, inserting:false, editing: false, title:locale.table_date },
                { type: "control" }
            ]
        });
    }

})(jQuery);