
(function($) {

    $(document).ready(function() {
        $('.spanTitCont').text(locale.page_title_uc);
        $('#headerH1').text(locale.rank_title);

        $('#studPos').text(locale.stud_pos);
        $('#groupSpan').text(locale.group);
    });

	function init() {
        var session = $.cookie(SESSION_COOKIE);

        $('#rankingLink').attr('href', RANKING_WEB);

        if(session.rol != EST_ROL){
            setTeachGroupsDropDown();
            $('#mRankBar').hide();
        }
        else{
            setStudGroupsDropDown();
        }
	}

	init();

    function setTeachGroupsDropDown() {
        $dropDown = $("#groupsDropDown");
        $dropDownMenu = $dropDown.children('.dropdown-menu').first();
        $dropDownMenu.html("");

        var session = $.cookie(SESSION_COOKIE);

        var service = "groups/getAll";
        var data = {
        };

        var jData = utf8_to_b64( JSON.stringify(data) );
        $.ajax({
            url: CON_URL+"groups/getAll",
            data:{data:jData}
        }).done(function(data) {
            var res = $.parseJSON(b64_to_utf8(data));

            if(res.data.length == 0){
                //setTableAnun('-1');
                $dropDown.children('button').text(locale.none2)
                return;
            }
            else{
                $dropDown.attr('data-sel-id',-1);
                $dropDown.children('button').html( locale.school +'  <span class="caret"></span>');
                setRankTable();
            }
            
            res.data.unshift({id:-1,name:locale.school});
            res.data.forEach(function(e,i) {
                $aNewRow = $('<a class="userGroupSelElem" data-id="' + e.id + '" href="#">' + e.name + '</a>');
                $aNewRow.off("click").on('click', function(event) {
                    event.preventDefault();
                    $this = $(this);

                    $dropDown.attr('data-sel-id', e.id);
                    $dropDown.children('button').html($this.text() + '<span class="caret"></span>');
                    setRankTable();
                });  

                $newRow = $('<li></li>').append($aNewRow);
                $dropDownMenu.append($newRow);
            });

        }).fail(function(data) {
            console.log("ajax fail");
        });
    }

    function setStudGroupsDropDown() {
        $dropDown = $("#groupsDropDown");
        $dropDownMenu = $dropDown.children('.dropdown-menu').first();
        $dropDownMenu.html("");

        var session = $.cookie(SESSION_COOKIE);

        var service = "groups/getGroupsByUser";
        var data = {
            userId:session.id
        };

        var jData = utf8_to_b64( JSON.stringify(data) );
        $.ajax({
            url: CON_URL+service,
            data:{data:jData}
        }).done(function(data) {
            var res = $.parseJSON(b64_to_utf8(data));

            if(res.data.length == 0){
                //setTableAnun('-1');
                $dropDown.children('button').text(locale.none2)
                return;
            }
            else{
                $dropDown.attr('data-sel-id',-1);
                $dropDown.children('button').html(locale.school + '  <span class="caret"></span>');
                setRankTable();
            }
            
            res.data.unshift({group_id:-1,name:locale.school});
            res.data.forEach(function(e,i) {
                $aNewRow = $('<a class="userGroupSelElem" data-id="' + e.group_id + '" href="#">' + e.name + '</a>');
                $aNewRow.off("click").on('click', function(event) {
                    event.preventDefault();
                    $this = $(this);

                    $dropDown.attr('data-sel-id', e.group_id);
                    $dropDown.children('button').html($this.text() + '<span class="caret"></span>');
                    setRankTable();
                });  

                $newRow = $('<li></li>').append($aNewRow);
                $dropDownMenu.append($newRow);
            });

        }).fail(function(data) {
            console.log("ajax fail");
        });
    }

	function setRankTable() {
        var groupId = $("#groupsDropDown").attr('data-sel-id');

		$("#jsGrid").jsGrid({
            width: "100%",
            filtering: true,
            sorting: true,
            paging: true,
            editting: true,
            autoload: true,
            pageSize: 10,
            pageButtonCount: 5,
            noDataContent: locale.none_data,
            loadMessage: locale.loading,
            controller: {
                loadData: function(filter) {
                    var d = $.Deferred();
                    var session = $.cookie(SESSION_COOKIE);

                    if(groupId == -1){
                        var service = "ranking/getRankSchool";
                        var data = {
                        };
                    }
                    else{
                        var service = "ranking/getByGrp";
                        var data = {
                            groupId:groupId
                        };
                    }
                    
     
                    var jData = utf8_to_b64( JSON.stringify(data) );
                    $.ajax({
                        url: CON_URL+service,
                        data:{data:jData}
                    }).done(function(data) {
                        var res = $.parseJSON(b64_to_utf8(data));

                        var dt = res.data;
                        var dataFiltered = $.grep(dt, function(obj) {
                            return (!filter.rank || obj.rank.indexOf(filter.rank) > -1)
                                && (!filter.name || obj.name.indexOf(filter.name) > -1);
                        });

                        d.resolve(dataFiltered);

                        console.log(res.data);
                        res.data.forEach(function(e,i,a) {
                            if(e.user_id == session.id){
                                $('#userRank').text(e.rank + 'º');
                            }
                        });
                    }).fail(function(data) {
                        console.log("ajax fail");
                        d.resolve([]);
                    });

                    return d.promise();
                }
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
                        "title": locale.tooltip_7
                    });

                    $e = $(".jsgrid-header-row > .jsgrid-header-cell:eq(3)");
                    $e.attr({
                        "data-toggle": 'tooltip',
                        "data-container": 'body',
                        "title": locale.tooltip_8
                    });

                    $('[data-toggle="tooltip"]').tooltip();
                }
            },

            fields: [
             	{ name: "rank", type: "text", align: "center", width: 30, title: locale.table_pos },
             	{ name: "name", type: "text", align: "center", width: 250, title: locale.table_name },
	            { name: "lDeliv", type: "text", align: "center", filtering: false, width: 30, title:locale.table_l },
                { name: "rnkScore", type: "text", align: "center", filtering: false, width: 30, title:locale.table_pts },
            	{ type: "control" }
            ]
        });
	}

})(jQuery);