function iniciar(){
    //Se inicializa los cuadros de textos enriquecidos del pluging EDITOR
   rellenar_grupos();
   document.getElementById('subgrupobox').style.display = 'none';
 };

 function rellenar_grupos(){
	$.ajax({
      url: '../phpadmin/c-dicotomica.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'gruposcreados'},
      success: function(respuesta){
        var  cadena = "";
		cadena += "<option selected='selected'>Seleccione un grupo de identificación</option>"
		if(respuesta[0] != null){
			for (var i = 0; i < respuesta.length; i++){      
				cadena += "<option>"+respuesta[i]['grupo'] +"</option>";
			};
			$("#gruposcreados").html(cadena);
		}else{
			$("#gruposcreados").html(cadena);
		}
        

      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }

      });
};
 
 function rellenar_padres(){
    //Busca las posibles clasificaciones de los taxones y los coloca en una caja de selección
    grupoSeleccionado = "'" + $("#gruposcreados option:selected").text() + "'";
    nivel = espaciosinifin($("#nivel").val());
    if(nivel != ""){
        $.ajax({
            url: '../phpadmin/c-dicotomica.php',
            type: 'POST',
            dataType: 'json',
            data: {tipo: 'rellenarpadres', grupoSeleccionado: grupoSeleccionado, nivel: nivel},
            success: function(respuesta){
              var  cadena = "<option>Ninguna</option>";
              if(respuesta[0] != null){
                 for (var i = 0; i < respuesta.length; i++){      
                     cadena += "<option>"+ respuesta[i]['nivel'].toString() + "-" + respuesta[i]['opcion'].toString() + "-" + respuesta[i]['caracteristica'].toString() +"</option>";
                 };
                 $("#fatherbox").html(cadena);
             } else{
                 $("#fatherbox").html(cadena);
     
             }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                          alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                      }
      
        });
    }
  
  };

 function rellenar_taxon(){
    /*if(espaciosinifin($("#nivel").val()) != "")
        rellenar_padres();*/

    var tipoHijo = $('input[name="tipo"]:checked').val();
    grupoSeleccionado = "'" + $("#gruposcreados option:selected").text() + "'";

    if(tipoHijo == "taxon"){
        document.getElementById('subgrupobox').style.display = 'none';
        document.getElementById('taxonbox').style.display = 'block';
        $("#tituloCambiante").html("<div id='tituloCambiante' class='titulo-panel-control' style='text-align: center;'><h4>Taxón hijo</h4></div>");

        if(grupoSeleccionado != "'Seleccione un grupo de identificación'"){
            //Busca las posibles clasificaciones de los taxones y los coloca en una caja de selección
            $.ajax({
                url: '../phpadmin/c-dicotomica.php',
                type: 'POST',
                dataType: 'json',
                data: {tipo: 'rellenartaxones', grupoSeleccionado: grupoSeleccionado},
                success: function(respuesta){
                    var  cadena = "<option selected='selected'>Ninguno</option>";
                    if(respuesta[0] != null){
                        for (var i = 0; i < respuesta.length; i++){      
                            cadena += " <option>"+ respuesta[i]['name'].toString() +"</option>";
                        };
                        $("#taxonbox").html(cadena);
                    } else{
                        $("#taxonbox").html(cadena);
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) { 
                            alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                        }
        
            });
        } else{
            $("#taxonbox").html("<option selected='selected'>Ninguno</option>");
        }      
    } else{
        document.getElementById('taxonbox').style.display = 'none';
        document.getElementById('subgrupobox').style.display = 'block';
        $("#tituloCambiante").html("<div id='tituloCambiante' class='titulo-panel-control' style='text-align: center;'><h4>Subgrupo</h4></div>");

        if(grupoSeleccionado != "'Seleccione un grupo de identificación'"){
            $.ajax({
                url: '../phpadmin/c-dicotomica.php',
                type: 'POST',
                dataType: 'json',
                data: {tipo: 'rellenarsubgrupos', grupoSeleccionado: grupoSeleccionado},
                success: function(respuesta){
                    var  cadena = "<option selected='selected'>Ninguno</option>";
                    if(respuesta[0] != null){
                        for (var i = 0; i < respuesta.length; i++){      
                            cadena += " <option>"+ respuesta[i]['grupo'].toString() +"</option>";
                        };
                        $("#subgrupobox").html(cadena);
                    } else{
                        $("#subgrupobox").html(cadena);
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) { 
                            alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                        }
        
            });
        } else{
            $("#subgrupobox").html("<option selected='selected'>Ninguno</option>");
        }
    }
    
  
  };
 
 function insertar_caracteristica(){
    var tipoHijo = $('input[name="tipo"]:checked').val();

   if(espaciosinifin($("#nivel").val())!= ""){
       if($("#fatherbox option:selected").text() != "Seleccione una caracteristica padre"){
           if(espaciosinifin($("#descripcion").val()) != ""){
                if($("#gruposcreados option:selected").text() != "Seleccione un grupo de identificación"){
                    if($("#taxonbox option:selected").text() != "Seleccione un taxón hijo"){
                        var nivel = "'"+espaciosinifin($("#nivel").val())+"'";
                        var padre = $("#fatherbox option:selected").text();
                        var descripcion = "'"+espaciosinifin($("#descripcion").val())+"'";
                        var grupo = "'"+$("#gruposcreados option:selected").text()+"'";
                        if(tipoHijo == "taxon"){
                            var taxon = "'"+$("#taxonbox option:selected").text()+"'";
                            var subgrupo = "'Ninguno'";
                        } else{
                            var subgrupo = "'"+$("#subgrupobox option:selected").text()+"'";
                            var taxon = "'Ninguno'";
                        }
                        var taxon = "'"+$("#taxonbox option:selected").text()+"'";
                        var opcion = "'"+$("#optionbox option:selected").text()+"'";
                        var data = {tipo: 'agregarcaracteristica', nivel: nivel, padre: padre, descripcion: descripcion, grupo: grupo, taxon:taxon, opcion: opcion, subgrupo: subgrupo}
                        $.ajax({
                        url: '../phpadmin/c-dicotomica.php',
                        type: 'POST',
                        dataType: 'json',
                        data: data,
                        success: function(respuesta){
                            if(respuesta == "Se ha insertado la caracteristica."){
                                $("#nivel").val("");
                                $("#descripcion").val("");
                                //$("#fatherbox").html("");
                                var cadena = "<option selected='selected'>A</option>" + "<option>B</option>" + "<option>C</option>" + "<option>D</option>" +"<option>E</option>";
                                $("#optionbox").html(cadena);
                                rellenar_taxon();
                            }
                            alert(respuesta);
                            
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) { 
                                        alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                                    }

                        });
                    }else{
                        alert("Debe especificar si quiere un taxon o ninguno");
                    }
                }else{
                    alert("Debe especificar el grupo de identificación.");
                }
            }else{
                alert("Debe describir la caracteristica para poder insertarla");
        }
        }else{
            alert("Debe especificar una caracteristica padre para poder insertarla");
        }
    }else{
        alert("Debe especificar el nivel para poder insertarla");
    };
};

    //Elimina los espacios en blanco de principio y final de la cadena de texto
    function espaciosinifin(texto){
    var string = texto;
    var caracter;
    caracter = string.substr(0,1);
    while(caracter == " "){
        string = string.substr(1,string.length);
        caracter = string.substr(0,1);
    }

    caracter = string.substr(string.length-1,1);
    while(caracter == " "){
        string = string.substr(0,string.length-1);
        caracter = string.substr(string.length-1,1);
    }

    return string;
 };
 