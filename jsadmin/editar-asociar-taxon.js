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
                    cadena += "<option>"+ respuesta[i][0].toString() +"</option>";
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

function rellenar_caracteristicas(){
	var taxonseleccionado = "'"+$("#taxonescreados option:selected").text()+"'";
	if(taxonseleccionado == "'Seleccione un taxón'"){
        $("#valuebox").html("");
        $("#caracteristicasbox").html("");
	}else{
		$.ajax({
	      url: '../phpadmin/c-caracteristicas.php',
	      type: 'POST',
	      dataType: 'json',
	      data: {tipo: 'rellenarcaracteristicas', taxonseleccionado: taxonseleccionado},
	      success: function(respuesta){
            var cadena = "";
            cadena = "<option selected='selected'>Seleccione una característica</option>";
            if(respuesta != "No hay características asociadas."){
                for (var i = 0; i < respuesta.length; i++){
                    cadena += "<option>" + respuesta[i][0].toString() + "</option>";
                }
                $("#caracteristicasbox").html(cadena);
            } else{
                $("#caracteristicasbox").html(cadena);
            }
			
	        
	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) { 
	                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	                }

	  	});
	};

};

function rellenar_valores(){
    var taxonseleccionado = "'"+$("#taxonescreados option:selected").text()+"'";
    var caracteristicaseleccionada = "'"+$("#caracteristicasbox option:selected").text()+"'";
	if(caracteristicaseleccionada == "'Seleccione una característica'" || taxonseleccionado == "'Seleccione un taxón'"){
		$("#valuebox").html("");
	}else{
		$.ajax({
	      url: '../phpadmin/c-caracteristicas.php',
	      type: 'POST',
	      dataType: 'json',
	      data: {tipo: 'rellenarvalor', caracteristicaseleccionada: caracteristicaseleccionada, taxonseleccionado: taxonseleccionado},
	      success: function(respuesta){
			var  cadena = "";
            var valorobtenido = respuesta;
            $.ajax({
                url: '../phpadmin/c-caracteristicas.php',
                type: 'POST',
                dataType: 'json',
                data: {tipo: 'rellenardatoscaracteristica', caracteristicaseleccionada: caracteristicaseleccionada},
                success: function(respuestavalores){
                  var valoresobtenidos = respuestavalores[0][2];
                  var valores = valoresobtenidos.split("; ");
                  for (var i = 0; i < valores.length; i++){
		        	if(valores[i] != valorobtenido){
		        		cadena += "<option>"+ valores[i] +"</option>";      
		        	}else{
		        		cadena += "<option selected='selected'>"+ valorobtenido +"</option>";
		        	}
		        };

		        $("#valuebox").html(cadena);
                  
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) { 
                              alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                          }
      
                });
	        
	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) { 
	                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                    }

	  	});
	};

};

function desasociar_caracteristica_hijos_recursiva(taxon/*decapoda*/, categoria/*orden*/, caracteristicaseleccionada){
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
                        desasociar_caracteristica_hijos_recursiva(hijos[i]["name"], hijos[i]["classification"], caracteristicaseleccionada);
                    }
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                          alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                      }
      
        });
    } else{ //categoria es especie
        var taxonseleccionado = taxon;
        var data = {tipo: 'eliminarasociacion', caracteristicaseleccionada: caracteristicaseleccionada, taxonseleccionado: taxonseleccionado}
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

function editar_asociar_caracteristica_hijos_recursiva(taxon/*decapoda*/, categoria/*orden*/, caracteristicaseleccionada, valorseleccionado){
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
                        editar_asociar_caracteristica_hijos_recursiva(hijos[i]["name"], hijos[i]["classification"], caracteristicaseleccionada, valorseleccionado);
                    }
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                          alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                      }
      
        });
    } else{ //categoria es especie
        var taxonseleccionado = taxon;
        var data = {tipo: 'editarasociacion', caracteristicaseleccionada: caracteristicaseleccionada, taxonseleccionado: taxonseleccionado, valorseleccionado: valorseleccionado}
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

function eliminar_asociacion(){ 
    var taxonseleccionado = "'"+$("#taxonescreados option:selected").text()+"'";
    var caracteristicaseleccionada = "'"+$("#caracteristicasbox option:selected").text()+"'";
	if(caracteristicaseleccionada != "'Seleccione una característica'"){
        if(taxonseleccionado != "'Seleccione un taxón'"){
            var categoria = "";
            $.ajax({
                url: '../phpadmin/c-taxones.php',
                type: 'POST',
                dataType: 'json',
                data: {tipo: 'categoriataxon', taxonseleccionado: taxonseleccionado},
                success: function(respuesta){
                    categoria = "'" + respuesta[0]["classification"] + "'";
                    taxon = taxonseleccionado;
                    desasociar_caracteristica_hijos_recursiva(taxon/*decapoda*/, categoria/*orden*/, caracteristicaseleccionada);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) { 
                              alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                          }
              });

            $.ajax({
		      url: '../phpadmin/c-caracteristicas.php',
		      type: 'POST',
		      dataType: 'json',
		      data: {tipo: 'eliminarasociacion', caracteristicaseleccionada: caracteristicaseleccionada, taxonseleccionado: taxonseleccionado},
		      success: function(respuesta){
		      	if(respuesta == "La asociación se ha eliminado correctamente."){
                    $("#taxonescreados").html("");
                    $("#caracteristicasbox").html("");			    
                    $("#valuebox").html("");
                    rellenar_taxones();
		        }
		        alert(respuesta);
		      },
		      error: function(XMLHttpRequest, textStatus, errorThrown) { 
		                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
		                }
            });
        }else{
            alert("Selecciona el taxon que quieras editar.");
        }
	}else{
	    alert("Selecciona la característica que quieras editar.");
	}
};

function editar_asociacion(){
    var taxonseleccionado = "'"+$("#taxonescreados option:selected").text()+"'";
    var caracteristicaseleccionada = "'"+$("#caracteristicasbox option:selected").text()+"'";
    var valorseleccionado = "'"+$("#valuebox option:selected").text()+"'";
    if(caracteristicaseleccionada != "'Seleccione una característica'"){
        if(taxonseleccionado != "'Seleccione un taxón'"){
            if(valorseleccionado != "'Seleccione un valor'"){
                var categoria = "";
                $.ajax({
                    url: '../phpadmin/c-taxones.php',
                    type: 'POST',
                    dataType: 'json',
                    data: {tipo: 'categoriataxon', taxonseleccionado: taxonseleccionado},
                    success: function(respuesta){
                        categoria = "'" + respuesta[0]["classification"] + "'";
                        taxon = taxonseleccionado;
                        editar_asociar_caracteristica_hijos_recursiva(taxon/*decapoda*/, categoria/*orden*/, caracteristicaseleccionada, valorseleccionado);
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) { 
                                  alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                              }
                  });

                var data = {tipo: 'editarasociacion', caracteristicaseleccionada: caracteristicaseleccionada, taxonseleccionado: taxonseleccionado, valorseleccionado: valorseleccionado}
                $.ajax({
                url: '../phpadmin/c-caracteristicas.php',
                type: 'POST',
                dataType: 'json',
                data: data,
                success: function(respuesta){
                    if(respuesta == "La asociacion se ha editado correctamente."){
                        $("#taxonescreados").html("");
                        $("#caracteristicasbox").html("");			    
                        $("#valuebox").html("");
                        rellenar_taxones();
                    }
                    alert(respuesta);  
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) { 
                                alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                            }

                });
            }else{
                alert("Debe especificar el valor de la asociación para poder insertarla.");
            }
        }else{
            alert("Debe especificar el nombre de la característica para poder insertarla.");
        };
    }else{
        alert("Selecciona la característica que quieras editar.");
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

     