function iniciar(){
    //Se inicializa los cuadros de textos enriquecidos del pluging EDITOR
    grupos_creados();
 };

 function grupos_creados(){
    var tipogrupo = "'matricial'";
	$.ajax({
      url: '../phpadmin/c-caracteristicas.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'gruposcreados', tipogrupo: tipogrupo},
      success: function(respuesta){
        var  cadena = "";
		cadena += "<option selected='selected'>Seleccione un grupo de identificación</option>"
		if(respuesta[0] != null){
			for (var i = 0; i < respuesta.length; i++){      
				cadena += "<option>"+respuesta[i][0] +"</option>";
			};
			$("#grupobox").html(cadena);
		}else{
			$("#grupobox").html(cadena);
		}
        

      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }

  	});
};

function rellenar_caracteristicas(){
    rellenar_taxones();
	var gruposeleccionado = "'"+$("#grupobox option:selected").text()+"'";
	if(gruposeleccionado == "'Seleccione un grupo de identificación'"){
		$("#caracteristicascreadas").html("");
		$("#valuebox").html("");
	}else{
		$.ajax({
		url: '../phpadmin/c-caracteristicas.php',
		type: 'POST',
		dataType: 'json',
		data: {tipo: 'caracteristicascreadasgrupo', gruposeleccionado: gruposeleccionado},
		success: function(respuesta){
			var cadena = "<option selected='selected'>Seleccione una característica</option>"
			if(respuesta != "No hay características para este grupo"){
				for (var i = 0; i < respuesta.length; i++){      
					cadena += "<option>"+respuesta[i][0].toString() +"</option>";
				};
				$("#caracteristicascreadas").html(cadena);
			}else{
				$("#caracteristicascreadas").html(cadena);
				alert(respuesta);
			}
			

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) { 
						alert("Status: " + textStatus); alert("Error: " + errorThrown); 
					}

		});
	}
};

function rellenar_taxones(){
    var grupo = "'"+$("#grupobox option:selected").text()+"'";
    var tipogrupo = "'matricial'";
	if(grupo == "'Seleccione un grupo de identificación'"){
        $("#taxonescreados").html("");
	}else{
		$.ajax({
	      url: '../phpadmin/c-taxones.php',
	      type: 'POST',
	      dataType: 'json',
	      data: {tipo: 'taxonesgrupo', grupo: grupo, tipogrupo: tipogrupo},
	      success: function(respuesta){
            var cadena = "<option selected='selected'>Seleccione un taxón</option>";
            if(respuesta != "No hay taxones asociados."){
                for (var i = 0; i < respuesta.length; i++){
                    cadena += "<option>"+ respuesta[i][1].toString() +" "+ respuesta[i][0].toString() +"</option>";
                }
                $("#taxonescreados").html(cadena);
            } else{
                $("#taxonescreados").html(cadena);
            }
	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) { 
	                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	                }

	  	});
	};

};

function rellenar_valores(){
	var caracteristicaseleccionada = "'"+$("#caracteristicascreadas option:selected").text()+"'";
	if(caracteristicaseleccionada == "'Seleccione una característica'"){
		$("#valuebox").html("");
	}else{
		$.ajax({
	      url: '../phpadmin/c-caracteristicas.php',
	      type: 'POST',
	      dataType: 'json',
	      data: {tipo: 'rellenardatoscaracteristica', caracteristicaseleccionada: caracteristicaseleccionada},
	      success: function(respuesta){
			var  cadena = "<option selected='selected'>Seleccione un valor</option>";
            var valoresobtenidos = respuesta[0][2];
            var valores = valoresobtenidos.split("; ");
			for (var i = 0; i < valores.length; i++){
				cadena += "<option>" + valores[i] + "</option>";
			}
            $("#valuebox").html(cadena);
            mostrarimagenes();
	        
	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) { 
	                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	                }

	  	});
	};

};

function mostrarimagenes(){
	var caracteristicaseleccionada = "'"+$("#caracteristicascreadas option:selected").text()+"'";	
	if(caracteristicaseleccionada != "'Seleccione una característica'"){
	    $.ajax({
	      url: '../phpadmin/c-caracteristicas.php',
	      type: 'POST',
	      dataType: 'json',
	      data: {tipo: 'mostrarimagenes', caracteristicaseleccionada: caracteristicaseleccionada},
	      success: function(respuesta){
	        var cadena = "";
	        if(respuesta != null){
		        for(var i = 0; i < respuesta.length; i++){
		        cadena+="<img id='"+respuesta[i]['id']+"' src='data:"+respuesta[i]['tipo']+";base64,"+respuesta[i]['imagen']+"' height='200' width='200'/>";
		    	}
	    	}
	        $("#divimagen").html(cadena);

	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) { 
	                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	                }

	  	});
	}else{
		$("#divimagen").html("");
	}
};

function asociar_caracteristica(){
    if($("#caracteristicascreadas option:selected").text() != "Seleccione una característica"){
        if($("#taxonescreados option:selected").text() != "Seleccione un taxón"){
            if($("#valuebox option:selected").text() != "Seleccione un valor"){
                var caracteristica = "'"+$("#caracteristicascreadas option:selected").text()+"'";
                var taxon = "'"+$("#taxonescreados option:selected").text()+"'";
                var valor = "'"+$("#valuebox option:selected").text()+"'";
                var categoria = taxon.substring(0,taxon.indexOf(" "))+"'";
                var solotaxon = "'"+taxon.substring(taxon.indexOf(" ")+1,taxon.length);
                taxon = solotaxon;
                if(categoria != "'Especie'")
                    asociar_caracteristica_hijos_recursiva(taxon/*decapoda*/, categoria/*orden*/);
                
                var data = {tipo: 'asociarcaracteristica', caracteristica: caracteristica, taxon: taxon, valor: valor}
                $.ajax({
                url: '../phpadmin/c-caracteristicas.php',
                type: 'POST',
                dataType: 'json',
                data: data,
                success: function(respuesta){
                    if(respuesta == "La característica se ha asociado correctamente."){
                        rellenar_taxones();
                    }
                    alert(respuesta);
                    
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) { 
                                alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                            }

                });
            }else{
                alert("Debe especificar el valor de la característica para poder asociarla.");
        }
        }else{
            alert("Debe especificar el taxón para poder asociarlo.");
        }
    }else{
        alert("Debe especificar la característica para poder asociarla.");
    };
};

function asociar_caracteristica_hijos_recursiva(taxon/*decapoda*/, categoria/*orden*/){
    if(categoria != "'Especie'"){ 
        $.ajax({
            url: '../phpadmin/c-caracteristicas.php',
            type: 'POST',
            dataType: 'json',
            data: {tipo: 'buscarhijos', taxon: taxon},
            success: function(hijos){
                if(hijos != "No hay taxones hijos"){
                    for(var i = 0 ; i < hijos.length ; i++){
                        hijos[i]["name"] = "'" + hijos[i]["name"] + "'";
                        hijos[i]["classification"] = "'" + hijos[i]["classification"] + "'";
                        asociar_caracteristica_hijos_recursiva(hijos[i]["name"], hijos[i]["classification"]);
                    }
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                          alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                      }
      
        });
    } else{ //categoria es especie
        var caracteristica = "'"+$("#caracteristicascreadas option:selected").text()+"'";
        var valor = "'"+$("#valuebox option:selected").text()+"'";
        var data = {tipo: 'asociarcaracteristica', caracteristica: caracteristica, taxon: taxon, valor: valor}
        $.ajax({
        url: '../phpadmin/c-caracteristicas.php',
        type: 'POST',
        dataType: 'json',
        data: data,
        success: function(respuesta){
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
                        alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                    }

        });
    }
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