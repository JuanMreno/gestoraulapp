
(function($) {

    var globalUserId;

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
            $(this).children("ul").toggle().hide();           
        });

        $('#tipoDropdown').html('Profesores  ' + '<span class="caret"></span>');
        $("#tipoDropdown").attr('data-sel-id','3'); 

        $('#uploadUsers').off('click').on('click', function(event) {
            event.preventDefault();
            /* Act on the event */

            $modal = $('#modalUploadUsers');
            $modal.off('shown.bs.modal').on('shown.bs.modal', function (e) {
                //console.log(item);

                $('#btnUploadUsers').off('click').on('click', function(event) {
                    event.preventDefault();
                    var fd = new FormData(document.getElementById("uploadUsersForm"));
                    ajaxConfig = {
                        method: "POST",
                        url: CON_URL+"uploads/users",
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
                                $('#alertModalCont').text("El formato del archivo no corresponde con el esperado. Por favor revise el archivo\
                                                            e intente de nuevo.");
                                $('#alertModal').modal('show');
                            }
                        }
                        else{
                            $('#alertModalCont').text("El formato del archivo no corresponde con el esperado. Por favor revise el archivo\
                                                        e intente de nuevo.");
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

        setUsersTable();
        listAllGroups();
	}

	init();


	function setUsersTable() {
        var rolId = $("#tipoDropdown").attr('data-sel-id'); 

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
            confirmDeleting: false,
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
                        d.resolve([]);
                        $("#jsGrid").jsGrid("render");
                    });

                    if(item.name == "" || item.last_name == ""){
                        $('#alertModalCont').text("Todos los campos son necesarios.");
                        $('#alertModal').modal('show');
                        d.reject();
                    }
                    else{
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
                                    $('#alertModalCont').text("El usuario ya ha sido registrado.");
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
                    item.date = moment().format("DD/MM/YYYY");
                    var d = $.Deferred();
                    var session = $.cookie(SESSION_COOKIE);

                    d.fail(function() {
                        d.resolve([]);
                        $("#jsGrid").jsGrid("render");
                    });

                    if(item.name == "" || item.last_name == ""){
                        $('#alertModalCont').text("Todos los campos son necesarios.");
                        $('#alertModal').modal('show');
                        d.reject();
                    }
                    else{
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
                                    $('#alertModalCont').text("El usuario ya ha sido registrado.");
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
                deleteItem: function(item) {
                    var d = $.Deferred();
                    var session = $.cookie(SESSION_COOKIE);

                    d.fail(function() {
                        d.resolve(item);
                        $("#jsGrid").jsGrid("render");
                    }); 

                    mns = "ALERTA ¿Está seguro que desea eliminar el usuario? Si hace esto perderá toda la información relacionada.";
                    $confModal = $('#confirmModal');
                    $confModal.find('#confirmModalCont').text(mns);

                    $confModal.find('#doneConfirmModal').off('click').on('click', function(event) {
                        event.preventDefault();
                        $confModal.modal('hide');
                        
                        var data = {
                            userId:item.id
                        };
         
                        var jData = utf8_to_b64( JSON.stringify(data) );
                        $.ajax({
                            url: CON_URL+"users/delete",
                            data:{data:jData}
                        }).done(function(data) {
                            var res = $.parseJSON(b64_to_utf8(data));

                            if(res.status == "true"){
                                d.resolve(item);
                                //$("#jsGrid").jsGrid("deleteItem", item);
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
                }
            },
            rowClick:function(objUser) {
                globalUserId = objUser.item.id;
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
                                    $('#alertModalCont').text("Error al intentar realizar el registro.");
                                    $('#alertModal').modal('show');
                                }                                       
                            }).fail(function(data) {
                                console.log("ajax fail");
                            });
                        });

                        $("#listGroups").on("select2:unselect", function(e) { 

                            var mns = "¿Estás seguro de retirar este profesor del grupo? Perdera toda la información relacionada.";
                            $confModal = $('#confirmModal');
                            $confModal.find('#confirmModalCont').text(mns);

                            $confModal.find('#doneConfirmModal').off('click').on('click', function(event) {
                                event.preventDefault();
                                $confModal.modal('hide');
                                
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
                            });

                            $confModal.on('hidden.bs.modal', function (e) {
                                listAllGroupsSubjets(globalUserId);  
                                console.log("ent");
                            });

                            $confModal.modal('show');
                        });

                        $("#listGroups").val(jsonDataLoad).trigger("change");
                        
                        $('#updatepass').off('click').on('click', function(event) {
                            var pass1 = $("#password1").val();
                            var pass2 = $("#password2").val();
                            var username = $("#nameUser").val();

                            if (changepass) {
                                if (pass1 == "" || pass2 == "" || username == "") {
                                    $('#alertModalCont').text("Todos los campos son necesarios.");
                                    $('#alertModal').modal('show');
                                }else {
                                    console.log(pass1);
                                    console.log(pass2);
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

                                                $('#alertModalCont').text("Los datos han sido actualizados.");
                                                $('#alertModal').modal('show');
                                            }else{
                                                $('#alertModalCont').text("Ha ocurrido un error inesperado, inténtalo de nuevo.");
                                                $('#alertModal').modal('show');
                                            }
                                        }).fail(function(data) {
                                            console.log("ajax fail");
                                            $('#alertModalCont').text("Ha ocurrido un error inesperado, inténtalo de nuevo.");
                                            $('#alertModal').modal('show');
                                        });
                                    }else {
                                        $('#alertModalCont').text("Las contraseñas deben coincidir.");
                                        $('#alertModal').modal('show');
                                    }
                                }
                            }else{
                                if (username == "") {
                                    $('#alertModalCont').text("Todos los campos son necesarios.");
                                    $('#alertModal').modal('show');
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

                                            $('#alertModalCont').text("Los datos han sido actualizados.");
                                            $('#alertModal').modal('show');
                                        }else{
                                            $('#alertModalCont').text("Ha ocurrido un error inesperado, inténtalo de nuevo.");
                                            $('#alertModal').modal('show');
                                        }
                                    }).fail(function(data) {
                                        console.log("ajax fail");
                                        $('#alertModalCont').text("Ha ocurrido un error inesperado, inténtalo de nuevo.");
                                        $('#alertModal').modal('show');
                                    });
                                }
                            }                             
                        });                        
                    }).fail(function(data) {
                        console.log("ajax fail");
                    });

                    $('#nameUser').off('change').on('change', function(event) {
                        changepass = false;
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
                            if(dt.length > 0){
                                $("#allGroupSt").val(dt[0].group_id);
                            }   
                            else{
                                $("#allGroupSt").val(-1);
                            }                         
                        }  
                                                   
                    }).fail(function(data) {
                        console.log("ajax fail");
                    });

                    $('#allGroupSt').off('change').on('change', function(event) {
                        var mensaje;
                        var groupId = $(this).val();

                        if(objUser.item.class_group_id === null){
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
                                    $('#alertModalCont').text("Los datos han sido actualizados.");
                                    $('#alertModal').modal('show');
                                }
                                         
                            }).fail(function(data) {
                                console.log("ajax fail");
                            });
                        }
                        else{
                            mensaje = "ALERTA ¿Está seguro que desea cambiar el grupo? Si hace esto perderá toda la\
                                información relacionada.";

                            $confModal = $('#confirmModal');
                            $confModal.find('#confirmModalCont').text(mensaje);

                            $confModal.find('#doneConfirmModal').off('click').on('click', function(event) {
                                event.preventDefault();
                                $confModal.modal('hide');
                                
                                var xdata = {
                                    userId:objUser.item.id,
                                    groupId:groupId
                                };
                                var jxData = utf8_to_b64( JSON.stringify(xdata) );
                                $.ajax({
                                    url: CON_URL+"users/asignStudUser",
                                    data:{data:jxData}
                                }).done(function(data) {
                                    var res = $.parseJSON(b64_to_utf8(data));
                                    if (res.status == "true") {
                                        $('#alertModalCont').text("Los datos han sido actualizados.");
                                        $('#alertModal').modal('show');
                                    }
                                             
                                }).fail(function(data) {
                                    console.log("ajax fail");
                                });
                            });

                            $confModal.on('hidden.bs.modal', function (e) {
                                $confModal.modal('hide');
                            });

                            $confModal.modal('show'); 
                        }
                    }); 

                    $('#updatepasswst').off('click').on('click', function(event) {
                        var pass1 = $("#passwordst1").val();
                        var pass2 = $("#passwordst2").val();
                        var username = $("#nameUserst").val();

                        debugger;
                        if (changepassSt) {
                            if (pass1 == "" || pass2 == "" || username == "") {
                                $('#alertModalCont').text("Todos los campos son necesarios.");
                                $('#alertModal').modal('show');
                            }else {
                                console.log(pass1);
                                console.log(pass2);
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

                                            $('#alertModalCont').text("Los datos han sido actualizados.");
                                            $('#alertModal').modal('show');
                                        }else{
                                            $('#alertModalCont').text("Ha ocurrido un error inesperado, inténtalo de nuevo.");
                                            $('#alertModal').modal('show');
                                        }
                                    }).fail(function(data) {
                                        console.log("ajax fail");
                                        $('#alertModalCont').text("Ha ocurrido un error inesperado, inténtalo de nuevo.");
                                        $('#alertModal').modal('show');
                                    });
                                }else {
                                    $('#alertModalCont').text("Las contraseñas deben coincidir.");
                                    $('#alertModal').modal('show');
                                }
                            }
                        }else{
                            if (username == "") {
                                $('#alertModalCont').text("Todos los campos son necesarios.");
                                $('#alertModal').modal('show');
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

                                        $('#alertModalCont').text("Los datos han sido actualizados.");
                                        $('#alertModal').modal('show');
                                    }else{
                                        $('#alertModalCont').text("Ha ocurrido un error inesperado, inténtalo de nuevo.");
                                        $('#alertModal').modal('show');
                                    }
                                }).fail(function(data) {
                                    console.log("ajax fail");
                                    $('#alertModalCont').text("Ha ocurrido un error inesperado, inténtalo de nuevo.");
                                    $('#alertModal').modal('show');
                                });
                            }
                        }                             
                    });

                    $('#nameUserst').off('change').on('change', function(event) {
                        changepassSt = false;
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
                { name: "name", type: "text", align: "center", title: "Nombres", editing:true },
                { name: "last_name", type: "text", align: "center", title: "Apellidos", editing:true },
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

                html+="<option value='-1' disabled>Ninguno</option>";
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
                html+="<option value='' >Seleccionar grupo</option>";
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
                            $('#alertModalCont').text("Ha ocurrido un error inesperado, inténtalo de nuevo.");
                            $('#alertModal').modal('show');
                        }                                       
                    }).fail(function(data) {
                        console.log("ajax fail");
                    });
                });

                $("#listsubjectsGroup").on("select2:unselect", function (e) { 
                    e.preventDefault();
                    $('#listGroups').trigger('select2:close');
                    $("#listsubjectsGroup").trigger('select2:close');
                    $('.select2-selection__rendered').focusout();

                    var mensaje = "ALERTA ¿Está seguro que desea retirar el profesor del grupo? Si hace esto\
                                            perderá toda la información relacionada.";

                    $confModal = $('#confirmModal');
                    $confModal.find('#confirmModalCont').text(mensaje);

                    $confModal.find('#doneConfirmModal').off('click').on('click', function(event) {
                        event.preventDefault();
                        $confModal.modal('hide');
                        
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
                    });

                    $confModal.on('hidden.bs.modal', function (e) {
                        //$("#listsubjectsGroup").val(jsonDataLoadx).trigger("change");
                        listAllGroupsSubjets(globalUserId);
                    });

                    $confModal.modal('show');  
                });

                $("#listsubjectsGroup").val(jsonDataLoadx).trigger("change"); 
            }
            
        }).fail(function(data) {
            console.log("ajax fail");
        });
    }

})(jQuery);