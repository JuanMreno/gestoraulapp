
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

                    // userName:"juan1106"
                    // hasPass:"true/false"
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
                        if(res.status == "true"){
                            d.resolve(item);
                            $("#jsGrid").jsGrid("render");
                        }
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

                        if(res.status == "true"){
                            d.resolve(item);
                            $("#jsGrid").jsGrid("render");
                        }
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
                    listAllGroupsSubjets(objUser.item.id);

                    var data = {
                        userId:objUser.item.id
                    };
                    var hasPass = objUser.item.hasPass;
                    var changepass = false;
                    $("#nameUser").val(objUser.item.userName);
                    $("#updatepass").prop("disabled",true);
                    if (hasPass == "true") {
                        $(".passpf").val("xxxxxxxxxx");
                    } else {
                        $(".passpf").val("");
                    }
     
                    var jData = utf8_to_b64( JSON.stringify(data) );
                    $.ajax({
                        url: CON_URL+"groups/getAllByUser",
                        data:{data:jData}
                    }).done(function(data) {
                        var res = $.parseJSON(b64_to_utf8(data));
                        var dt = res.data;
                        $("#listGroups").html("");
                        var jsonData = new Array();
                        var jsonDataLoad = new Array();
                        for (var i = 0; i < dt.length; i++) {
                            jsonData.push({ id: dt[i].id, text: dt[i].name }) ; 

                            if (dt[i].asignado == 1) {
                                jsonDataLoad.push(dt[i].id);
                            }                       
                        }
                        $("#listGroups").select2({
                          data: jsonData,
                          tags:true
                        });

                        $("#listGroups").on("select2:select", function (e) { 
                            console.log(e.params.data.id); 
                            var cdata = {
                                userId:objUser.item.id,
                                groupId:e.params.data.id,
                                asignado:true
                            };
                            var jxData = utf8_to_b64( JSON.stringify(cdata) );
                            $.ajax({
                                url: CON_URL+"groups/asignUser",
                                data:{data:jxData}
                            }).done(function(data) {
                                var res = $.parseJSON(b64_to_utf8(data));
                                if (res.status == "true") {
                                    jsonDataLoad.push(e.params.data.id) ;
                                    listAllGroupsSubjets(objUser.item.id);                                   
                                } else{
                                    alert("Se presento un error, al registrar el grupo");
                                }                                       
                            }).fail(function(data) {
                                console.log("ajax fail");
                            });
                        });
                        $("#listGroups").on("select2:unselect", function (e) { 
                            var mensaje = confirm("¿Estas seguro de retirar este profesor del grupo, si hace esto perdera toda la información relacionada?");
                            //Detectamos si el usuario acepto el mensaje
                            if (mensaje) {
                                var xdata = {
                                    userId:objUser.item.id,
                                    groupId:e.params.data.id,
                                    asignado:false
                                };
                                var jxData = utf8_to_b64( JSON.stringify(xdata) );
                                $.ajax({
                                    url: CON_URL+"groups/asignUser",
                                    data:{data:jxData}
                                }).done(function(data) {
                                    var res = $.parseJSON(b64_to_utf8(data));
                                    if (res.status == "true") {
                                        var i = jsonDataLoad.indexOf(e.params.data.id);
                                        if(i != -1) {
                                            jsonDataLoad.splice(i, 1);
                                        }  
                                        listAllGroupsSubjets(objUser.item.id);                                     
                                    }
                                             
                                }).fail(function(data) {
                                    console.log("ajax fail");
                                });
                            }else{
                                $("#listGroups").val(jsonDataLoad).trigger("change");
                            }  
                        });

                        $("#listGroups").val(jsonDataLoad).trigger("change");
                        
                        $('#updatepass').off('click').on('click', function(event) {
                            var pass1 = $("#password1").val();
                            var pass2 = $("#password2").val();
                            var username = $("#nameUser").val();

                            if (changepass) {
                                if (pass1 == "" || pass2 == "" || username == "") {
                                    alert("Campos Vacios");
                                }else {
                                    if (pass1 == pass2) {
                                        var data = {
                                            id:objUser.item.id,
                                            pass: calcMD5(pass1),
                                            userName:username
                                        };
                         
                                        var mData = utf8_to_b64( JSON.stringify(data));
                                        $.ajax({
                                            url: CON_URL+"users/resetPass",
                                            data:{data:mData}
                                        }).done(function(data) {
                                            var res = $.parseJSON(b64_to_utf8(data));
                                            if(res.status == "true"){
                                                $("#password1").val('xxxxxxxxxx');
                                                $("#password2").val('xxxxxxxxxx');
                                                $("#jsGrid").jsGrid("render");
                                                alert("Datos Actualizados");
                                            }else{
                                                alert("Error al intentar realizar el cambio de datos.");
                                            }
                                        }).fail(function(data) {
                                            console.log("ajax fail");
                                            alert("Error al intentar realizar el cambio de datos.");
                                        });
                                    }else {
                                        alert("Las contraseña no coinciden!");
                                    }
                                }
                            }else{
                                if (username == "") {
                                    alert("Campos Vacios");
                                }else {
                                    var data = {
                                        id:objUser.item.id,
                                        pass: '',
                                        userName:username
                                    };

                                    var mData = utf8_to_b64( JSON.stringify(data) );
                                    $.ajax({
                                        url: CON_URL+"users/resetPass",
                                        data:{data:mData}
                                    }).done(function(data) {
                                        var res = $.parseJSON(b64_to_utf8(data));
                                        if(res.status == "true"){
                                            $("#password1").val('xxxxxxxxxx');
                                            $("#password2").val('xxxxxxxxxx');
                                            $("#jsGrid").jsGrid("render");
                                            alert("Datos Actualizados");
                                        }else{
                                            alert("Error al intentar realizar el cambio de datos.");
                                        }
                                    }).fail(function(data) {
                                        console.log("ajax fail");
                                        alert("Error al intentar realizar el cambio de datos.");
                                    });
                                }
                            }                             
                        });                        
                    }).fail(function(data) {
                        console.log("ajax fail");
                    });

                    $('#nameUser').off('change').on('change', function(event) {
                        $("#updatepass").prop("disabled",false);
                    });  

                    $('.passpf').off('change').on('change', function(event) {
                        changepass = true;
                        $("#updatepass").prop("disabled",false);
                    });

                    $("#editInfoUser").modal("show");
                }else {
                    var data = {
                        userId:objUser.item.id
                    };

                    var hasPassSt = objUser.item.hasPass;
                    var changepassSt = false;
                    $("#nameUserst").val(objUser.item.userName);
                    $("#updatepasswst").prop("disabled",true);
                    if (hasPassSt == "true") {
                        $(".passst").val("xxxxxxxxxx");
                    } else {
                        $(".passst").val("");
                    }

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
                        var username = $("#nameUserst").val();

                        if (changepass) {
                            if (pass1 == "" || pass2 == "" || username == "") {
                                alert("Campos Vacios");
                            }else {
                                if (pass1 == pass2) {
                                    var data = {
                                        id:objUser.item.id,
                                        pass: calcMD5(pass1),
                                        userName:username
                                    };
                     
                                    var mData = utf8_to_b64( JSON.stringify(data));
                                    $.ajax({
                                        url: CON_URL+"users/resetPass",
                                        data:{data:mData}
                                    }).done(function(data) {
                                        var res = $.parseJSON(b64_to_utf8(data));
                                        if(res.status == "true"){
                                            $("#passwordst1").val('xxxxxxxxxx');
                                            $("#passwordst2").val('xxxxxxxxxx');
                                            $("#jsGrid").jsGrid("render");
                                            alert("Datos Actualizados");
                                        }else{
                                            alert("Error al intentar realizar el cambio de datos.");
                                        }
                                    }).fail(function(data) {
                                        console.log("ajax fail");
                                        alert("Error al intentar realizar el cambio de datos.");
                                    });
                                }else {
                                    alert("Las contraseña no coinciden!");
                                }
                            }
                        }else{
                            if (username == "") {
                                alert("Campos Vacios");
                            }else {
                                var data = {
                                    id:objUser.item.id,
                                    pass: '',
                                    userName:username
                                };

                                var mData = utf8_to_b64( JSON.stringify(data) );
                                $.ajax({
                                    url: CON_URL+"users/resetPass",
                                    data:{data:mData}
                                }).done(function(data) {
                                    var res = $.parseJSON(b64_to_utf8(data));
                                    if(res.status == "true"){
                                        $("#passwordst1").val('xxxxxxxxxx');
                                        $("#passwordst2").val('xxxxxxxxxx');
                                        $("#jsGrid").jsGrid("render");
                                        alert("Datos Actualizados");
                                    }else{
                                        alert("Error al intentar realizar el cambio de datos.");
                                    }
                                }).fail(function(data) {
                                    console.log("ajax fail");
                                    alert("Error al intentar realizar el cambio de datos.");
                                });
                            }
                        }                             
                    });

                    $('#nameUserst').off('change').on('change', function(event) {
                        $("#updatepasswst").prop("disabled",false);
                    });  

                    $('.passst').off('change').on('change', function(event) {
                        changepassSt = true;
                        $("#updatepasswst").prop("disabled",false);
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

    function listAllGroupsSubjets(id) {
        var data = {
            userId:id
        };
        var jxData = utf8_to_b64( JSON.stringify(data) );
        $.ajax({
            url: CON_URL+"groups/getGroupsByUser",
            data:{data:jxData}
        }).done(function(data) {
            var res = $.parseJSON(b64_to_utf8(data));
            var dt = res.data;
            if(res.status == "true"){
                var html = "";
                html+="<option value='' >Seleccionar Grupo</option>";
                for (var i = 0; i < dt.length; i++) {
                    html+="<option value='"+dt[i].group_id+"' data-id='"+dt[i].user_group_id+"'>"+dt[i].name+"</option>";
                }
                $("#listGroupsSubjets").html(html);

                $('#listGroupsSubjets').off('change').on('change', function(event) {
                    var userGroupId = $('option:selected', this).attr('data-id');
                    var groupId = $(this).val();
                    subjectsgetByUserGroup(groupId,userGroupId);
                });  

            }

            $("#listsubjectsGroup").html("");
            
        }).fail(function(data) {
            console.log("ajax fail");
        });
    }

    function subjectsgetByUserGroup(groupId,userGroupId) {
        var data = {
            groupId:groupId,
            userGroupId:userGroupId
        };
        var jxData = utf8_to_b64( JSON.stringify(data) );
        $.ajax({
            url: CON_URL+"subjects/getByUserGroup",
            data:{data:jxData}
        }).done(function(data) {
            var res = $.parseJSON(b64_to_utf8(data));
            if(res.status == "true"){
                var dt = res.data;
                $("#listsubjectsGroup").html("");
                var jsonDatax = new Array();
                var jsonDataLoadx = new Array();
                for (var i = 0; i < dt.length; i++) {
                    jsonDatax.push({ id: dt[i].sc_id, text: dt[i].name }) ; 
                    if (dt[i].asignado == 1) {
                        jsonDataLoadx.push(dt[i].sc_id);
                    }                       
                }

                //$("#listsubjectsGroup").select2("destroy");
                $("#listsubjectsGroup").select2({
                    data: jsonDatax,
                    tags:true
                }).off('select2:select').off('select2:unselect'); 

                $("#listsubjectsGroup").on("select2:select", function (e) { 
                    e.preventDefault();
                    console.log(e.params.data.id); 
                    var cdata = {
                        userGroupId:userGroupId,
                        scId:e.params.data.id,
                        asignado:true
                    };
                    var jxData = utf8_to_b64( JSON.stringify(cdata) );
                    $.ajax({
                        url: CON_URL+"subjects/assignUserSubject",
                        data:{data:jxData}
                    }).done(function(data) {
                        var res = $.parseJSON(b64_to_utf8(data));
                        if (res.status == "true") {
                            jsonDataLoadx.push(e.params.data.id);                                   
                        } else{
                            alert("Se presento un error, al registrar el grupo");
                        }                                       
                    }).fail(function(data) {
                        console.log("ajax fail");
                    });
                });
                $("#listsubjectsGroup").on("select2:unselect", function (e) { 
                    e.preventDefault();
                    var mensaje = confirm("¿Estas seguro de retirar este profesor de la materia?. Perdera toda la información relacionada");
                    //Detectamos si el usuario acepto el mensaje
                    if (mensaje) {
                        var xdata = {
                            userGroupId:userGroupId,
                            scId:e.params.data.id,
                            asignado:false
                        };
                        var jxData = utf8_to_b64( JSON.stringify(xdata) );
                        $.ajax({
                            url: CON_URL+"subjects/assignUserSubject",
                            data:{data:jxData}
                        }).done(function(data) {
                            var res = $.parseJSON(b64_to_utf8(data));
                            if (res.status == "true") {
                                var i = jsonDataLoadx.indexOf(e.params.data.id);
                                if(i != -1) {
                                    jsonDataLoadx.splice(i, 1);
                                }                               
                            }                                     
                        }).fail(function(data) {
                            console.log("ajax fail");
                        });
                    }else{
                        $("#listsubjectsGroup").val(jsonDataLoadx).trigger("change");
                    }  
                });
                $("#listsubjectsGroup").val(jsonDataLoadx).trigger("change"); 
            }
            
        }).fail(function(data) {
            console.log("ajax fail");
        });
    }

})(jQuery);