
(function($) {

	function init() {
	    $('#tipoDropdown-profesores').off('click').on('click', function(event) {
            event.preventDefault();

            $('#tipoDropdown').html('Profesores  ' + '<span class="caret"></span>');
            $("#tipoDropdown").attr('data-sel-id','3'); 
            setUsersTable();
        });

        $('#tipoDropdown-estudiantes').off('click').on('click', function(event) {
            event.preventDefault();

            $('#tipoDropdown').html('Estudiantes  ' + '<span class="caret"></span>');
            $("#tipoDropdown").attr('data-sel-id','4'); 
            setUsersTable();  
        });

        $("#open-menu-grupos").click(function () {
            //alert("Error")
            $(this).children("ul").toggle().hide();           
        });

        $('#tipoDropdown').html('Profesores  ' + '<span class="caret"></span>');
        $("#tipoDropdown").attr('data-sel-id','3'); 
        setUsersTable();
        listAllGroups();
	}

	init();


	function setUsersTable() {
        var rolId = $("#tipoDropdown").attr('data-sel-id'); 
        console.log(rolId);
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
                        rolId:rolId
                    };
     
                    var jData = utf8_to_b64( JSON.stringify(data) );
                    $.ajax({
                        url: CON_URL+"users/getAll",
                        data:{data:jData}
                    }).done(function(data) {
                        var res = $.parseJSON(b64_to_utf8(data));

                        var dt = res.data;
                        console.log(dt);
                        var dataFiltered = $.grep(dt, function(obj) {
                            return (!filter.name || obj.name.indexOf(filter.name) > -1)
                                && (!filter.last_name || obj.last_name.indexOf(filter.last_name) > -1);
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
                        return null;
                        $("#jsGrid").jsGrid("render");
                    });

                    var data = {
                        id:item.id,
                        name:item.name,
                        last_name:item.last_name
                    };
     
                    var jData = utf8_to_b64( JSON.stringify(data) );
                    $.ajax({
                        url: CON_URL+"users/edit",
                        data:{data:jData}
                    }).done(function(data) {
                        var res = $.parseJSON(b64_to_utf8(data));
                        //console.log(res);
                        if(res.status == "true")
                            d.resolve(item);
                        else{
                            if(res.data.state == "REPEATED"){
                                alert("El usuario ya ha sido registrado.");
                            }
                            else{
                                alert("Error al intentar realizar el registro.");
                            }
                            d.reject();
                            //d.resolve(false);
                        }
                    }).fail(function(data) {
                        console.log("ajax fail");
                        alert("Error al intentar realizar el registro.");
                        d.reject();
                    });
     
                    return d.promise();
                },
                insertItem: function(item) {
                    item.date = moment().format("DD/MM/YYYY");
                    var d = $.Deferred();
                    var session = $.cookie(SESSION_COOKIE);

                    d.fail(function() {
                        return null;
                        $("#jsGrid").jsGrid("render");
                    });

                    var data = {
                        name:item.name,
                        last_name:item.last_name,
                        rolId:rolId
                    };
                    var jData = utf8_to_b64( JSON.stringify(data) );
                    $.ajax({
                        url: CON_URL+"users/insert",
                        data:{data:jData}
                    }).done(function(data) {
                        var res = $.parseJSON(b64_to_utf8(data));

                        if(res.status == "true")
                            d.resolve(item);
                        else{
                            if(res.data.state == "REPEATED"){
                                alert("El usuario ya ha sido registrado.");
                            }
                            else{
                                alert("Error al intentar realizar el registro.");
                            }
                            d.reject();
                            //d.resolve(false);
                        }
                    }).fail(function(data) {
                        console.log("ajax fail");
                        alert("Error al intentar realizar el registro.");
                        d.reject();
                    });

                    return d.promise();
                }
            },
            rowClick:function(objUser) {
                if (rolId == 3) {
                    var data = {
                        userId:objUser.item.id
                    };
     
                    var jData = utf8_to_b64( JSON.stringify(data) );
                    $.ajax({
                        url: CON_URL+"groups/getAllByUser",
                        data:{data:jData}
                    }).done(function(data) {
                        var res = $.parseJSON(b64_to_utf8(data));
                        var dt = res.data;
                        $("#listGroups").html("");
                        var html = "";
                        for (var i = 0; i < dt.length; i++) {
                            html+=" <button type='button' class='list-group-item changeGroup' data-asg='"+dt[i].asignado+"' data-id='"+dt[i].id+"'>"+dt[i].name; 
                            if (dt[i].asignado == 1) {
                                html+="<i class='fa fa-check pull-right' aria-hidden='true'></i></button>";
                            } else {
                                html+="<i class='fa fa-times pull-right' aria-hidden='true'></i></button>";
                            }                            
                        }
                        $("#listGroups").html(html); 

                        $('.changeGroup').off('click').on('click', function(event) {
                            var idGroup=parseInt($(this).attr('data-id')); 
                            var asignado=$(this).attr('data-asg');
                            var element = $(this);

                            if (asignado == 1) {
                                var mensaje = confirm("¿Estas seguro de retirar este profesor del grupo, si hace esto perdera toda la información relacionada?");
                                //Detectamos si el usuario acepto el mensaje
                                if (mensaje) {
                                    var xdata = {
                                        userId:objUser.item.id,
                                        groupId:idGroup,
                                        asignado:false
                                    };
                                    var jxData = utf8_to_b64( JSON.stringify(xdata) );
                                    $.ajax({
                                        url: CON_URL+"groups/asignUser",
                                        data:{data:jxData}
                                    }).done(function(data) {
                                        var res = $.parseJSON(b64_to_utf8(data));
                                        if (res.status == "true") {
                                            element.find("i").removeClass("fa-check").addClass("fa-times");
                                            element.attr('data-asg','0');
                                        }
                                                 
                                    }).fail(function(data) {
                                        console.log("ajax fail");
                                    });
                                }                                
                            } else {
                                var cdata = {
                                        userId:objUser.item.id,
                                        groupId:idGroup,
                                        asignado:true
                                    };
                                    var jxData = utf8_to_b64( JSON.stringify(cdata) );
                                    $.ajax({
                                        url: CON_URL+"groups/asignUser",
                                        data:{data:jxData}
                                    }).done(function(data) {
                                        var res = $.parseJSON(b64_to_utf8(data));
                                        if (res.status == "true") {
                                            element.find("i").removeClass("fa-times").addClass("fa-check");
                                            element.attr('data-asg','1');
                                        }
                                                 
                                    }).fail(function(data) {
                                        console.log("ajax fail");
                                    });
                            }
                        }); 

                        $('#updatepass').off('click').on('click', function(event) {
                            var pass1 = $("#password1").val();
                            var pass2 = $("#password2").val();

                            if (pass1 == "" || pass2 == "") {
                                alert("Campos Vacios");
                            } else {
                                if (pass1 == pass2) {
                                    var data = {
                                        id:objUser.item.id,
                                        pass: calcMD5(pass1)
                                    };
                     
                                    var mData = utf8_to_b64( JSON.stringify(data) );
                                    $.ajax({
                                        url: CON_URL+"users/resetPass",
                                        data:{data:mData}
                                    }).done(function(data) {
                                        var res = $.parseJSON(b64_to_utf8(data));

                                        if(res.status == "true"){
                                            $("#password1").val('');
                                            $("#password2").val('');
                                            alert("Contraseña Actualizada");
                                        }
                                        else{
                                            alert("Error al intentar realizar el cambio de contraseña.");
                                        }
                                    }).fail(function(data) {
                                        console.log("ajax fail");
                                        alert("Error al intentar realizar el cambio de contraseña.");
                                    });
                                } else {
                                    alert("Las contraseña no coinciden!");
                                } 
                            }
                            
                        });              
                    }).fail(function(data) {
                        console.log("ajax fail");
                    });


                    $("#editInfoUser").modal("show");
                } else {
                    var data = {
                        userId:objUser.item.id
                    };

                    var jxData = utf8_to_b64( JSON.stringify(data) );
                    $.ajax({
                        url: CON_URL+"groups/getGroupsByUser",
                        data:{data:jxData}
                    }).done(function(data) {
                        var res = $.parseJSON(b64_to_utf8(data));
                        var dt = res.data;
                        if(res.status == "true"){                            
                            $("#allGroupSt").val(dt[0].group_id);
                        }  
                                                   
                    }).fail(function(data) {
                        console.log("ajax fail");
                    });

                    $('#allGroupSt').off('change').on('change', function(event) {
                        var mensaje = confirm("¿Estas seguro de cambiar de grupo, si hace esto perdera toda la información relacionada?");
                        //Detectamos si el usuario acepto el mensaje
                        if (mensaje) {
                            var xdata = {
                                userId:objUser.item.id,
                                groupId:$(this).val()
                            };
                            var jxData = utf8_to_b64( JSON.stringify(xdata) );
                            $.ajax({
                                url: CON_URL+"users/asignStudUser",
                                data:{data:jxData}
                            }).done(function(data) {
                                var res = $.parseJSON(b64_to_utf8(data));
                                if (res.status == "true") {
                                    alert("Grupo Actualizado");
                                }
                                         
                            }).fail(function(data) {
                                console.log("ajax fail");
                            });
                        } 
                    }); 

                    $('#updatepasswst').off('click').on('click', function(event) {
                        var pass1 = $("#passwordst1").val();
                        var pass2 = $("#passwordst2").val();

                        if (pass1 == "" || pass2 == "") {
                            alert("Campos Vacios");
                        } else {
                            if (pass1 == pass2) {
                                var data = {
                                    id:objUser.item.id,
                                    pass: calcMD5(pass1)
                                };
                 
                                var mData = utf8_to_b64( JSON.stringify(data) );
                                $.ajax({
                                    url: CON_URL+"users/resetPass",
                                    data:{data:mData}
                                }).done(function(data) {
                                    var res = $.parseJSON(b64_to_utf8(data));

                                    if(res.status == "true"){
                                        $("#passwordst1").val('');
                                        $("#passwordst2").val('');
                                        alert("Contraseña Actualizada");
                                    }
                                    else{
                                        alert("Error al intentar realizar el cambio de contraseña.");
                                    }
                                }).fail(function(data) {
                                    console.log("ajax fail");
                                    alert("Error al intentar realizar el cambio de contraseña.");
                                });
                            } else {
                                alert("Las contraseña no coinciden!");
                            } 
                        }
                        
                    }); 
                    $("#editInfoStudent").modal("show");
                }
                
            },

            pagerFormat: "Pag {first} {prev} {pages} {next} {last}    {pageIndex} de {pageCount}",
            pagePrevText: " < ",
		    pageNextText: " > ",
		    pageFirstText: " << ",
		    pageLastText: " >> ",

            fields: [ 
                { name: "name", type: "text", align: "center", title: "Nombre", editing:true },
                { name: "last_name", type: "text", align: "center", title: "Apellido", editing:true },
            	{ type: "control" }
            ]
        });
	}

    function listAllGroups() {
        var data = {
            id:5
        };

        var jxData = utf8_to_b64( JSON.stringify(data) );
        $.ajax({
            url: CON_URL+"groups/getAll",
            data:{data:jxData}
        }).done(function(data) {
            var res = $.parseJSON(b64_to_utf8(data));
            var dt = res.data;
            if(res.status == "true"){
                var html = "";
                for (var i = 0; i < dt.length; i++) {
                    html+="<option value='"+dt[i].id+"'>"+dt[i].name+"</option>";
                }
                $("#allGroupSt").html(html);
            }
            
        }).fail(function(data) {
            console.log("ajax fail");
        });
    }

})(jQuery);