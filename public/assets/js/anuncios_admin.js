
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
            url: CON_URL+"groups/getGroupsByUser",
            data:{data:jData}
        }).done(function(data) {
            var res = $.parseJSON(b64_to_utf8(data));

            if(res.data.length == 0){
                setTableAnun('-1');
                $dropDown.children('button').text('Ninguno')
                return;
            }
            else{
                setTableAnun(res.data[0].user_group_id);
                $dropDown.children('button').html(res.data[0].name + $dropDown.children('button').html());
            }

            res.data.forEach(function(e,i) {
                $newRow = $('<li><a class="userGroupSelElem" data-id="' + e.user_group_id + '" href="#">' + e.name + '</a></li>')
                $dropDownMenu.append($newRow);
            });

            $dropDown.find('.userGroupSelElem').each(function(index, el) {
                $(el).off("click").on('click', function(event) {
                    event.preventDefault();
                    $this = $(this);
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
            confirmDeleting: false,
            pageSize: 10,
            pageButtonCount: 5,
            noDataContent: "Ningún dato encontrado.",
            loadMessage: "Cargando...",
            controller: {
                loadData: function(filter) {
                    var d = $.Deferred();
                    var session = $.cookie(SESSION_COOKIE);

                    var data = {
                        userGroupId:user_group_id
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
                    var d = $.Deferred();
                    var session = $.cookie(SESSION_COOKIE);

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
                            d.resolve([]);
                    }).fail(function(data) {
                        console.log("ajax fail");
                        d.resolve([]);
                    });

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
                }
            },

            pagerFormat: "Pag {first} {prev} {pages} {next} {last}    {pageIndex} de {pageCount}",
            pagePrevText: " < ",
		    pageNextText: " > ",
		    pageFirstText: " << ",
		    pageLastText: " >> ",

            fields: [
             	{ name: "title", type: "text", align: "center", width: 250, filtering: true, inserting:true, editing: true, title:"Título" },
	            { name: "content", type: "text", align: "center", width: 400, filtering: true, inserting:true, editing: true, title:"Contenido" },
	            { name: "date", type: "text", align: "center", width: 100, filtering: true, inserting:false, editing: false, title:"Fecha" },
            	{ type: "control" }
            ]
        });
	}

})(jQuery);