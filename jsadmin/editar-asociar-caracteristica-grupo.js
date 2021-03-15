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
	var gruposeleccionado = "'"+$("#grupobox option:selected").text()+"'";
	if(gruposeleccionado == "'Seleccione un grupo de identificación'"){
		$("#caracteristicascreadas").html("");
		$("#value").val("");
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

function rellenar_grupos(){
	var caracteristicaseleccionada = "'"+$("#caracteristicascreadas option:selected").text()+"'";
	if(caracteristicaseleccionada == "'Seleccione una característica'"){
        $("#valuebox").html("");
        $("#gruposcreados").html("");
	}else{
		$.ajax({
	      url: '../phpadmin/c-caracteristicas.php',
	      type: 'POST',
	      dataType: 'json',
	      data: {tipo: 'rellenargrupos', caracteristicaseleccionada: caracteristicaseleccionada},
	      success: function(respuesta){
            var cadena = "<option selected='selected'>Seleccione un grupo</option>";
            if(respuesta != "No hay grupos asociados."){
                for (var i = 0; i < respuesta.length; i++){
                    cadena += "<option>" + respuesta[i] + "</option>";
                }
                $("#gruposcreados").html(cadena);
            } else{
                alert(respuesta);
                $("#gruposcreados").html(cadena);
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
    var gruposeleccionado = "'"+$("#gruposcreados option:selected").text()+"'";
	if(caracteristicaseleccionada == "'Seleccione una característica'" || gruposeleccionado == "'Seleccione un grupo'"){
        $("#valuebox").html("");
        $("#newvalue").html("");
	}else{
		$.ajax({
	      url: '../phpadmin/c-caracteristicas.php',
	      type: 'POST',
	      dataType: 'json',
	      data: {tipo: 'rellenarvalorgrupo', caracteristicaseleccionada: caracteristicaseleccionada, gruposeleccionado: gruposeleccionado},
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
                $("#newvalue").html(cadena);
                  
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

function eliminar_asociacion(){ 
    var caracteristicaseleccionada = "'"+$("#caracteristicascreadas option:selected").text()+"'";
    var gruposeleccionado = "'"+$("#gruposcreados option:selected").text()+"'";
    var valorseleccionado = "'"+$("#valuebox option:selected").text()+"'";
	if(caracteristicaseleccionada != "'Seleccione una característica'"){
        if(gruposeleccionado != "'Seleccione un grupo'"){
            $.ajax({
		      url: '../phpadmin/c-caracteristicas.php',
		      type: 'POST',
		      dataType: 'json',
		      data: {tipo: 'eliminarasociaciongrupo', caracteristicaseleccionada: caracteristicaseleccionada, gruposeleccionado: gruposeleccionado, valorseleccionado: valorseleccionado},
		      success: function(respuesta){
		      	if(respuesta == "La asociación se ha eliminado correctamente."){
                        rellenar_grupos();
                        $("#valuebox").html("");
                        $("#newvalue").html("");
                    //grupos_creados();
		        }
		        alert(respuesta);
		      },
		      error: function(XMLHttpRequest, textStatus, errorThrown) { 
		                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
		                }
            });
        }else{
            alert("Selecciona el grupo que quieras editar.");
        }
	}else{
	    alert("Selecciona la característica que quieras editar.");
	}
};

function editar_asociacion(){
    var caracteristicaseleccionada = "'"+$("#caracteristicascreadas option:selected").text()+"'";
    var gruposeleccionado = "'"+$("#gruposcreados option:selected").text()+"'";
    var valorseleccionado = "'"+$("#valuebox option:selected").text()+"'";
    var valornuevo = "'"+$("#newvalue option:selected").text()+"'";
    if(caracteristicaseleccionada != "'Seleccione una característica'"){
        if(gruposeleccionado != "'Seleccione un grupo'"){
            if(valorseleccionado != "'Seleccione un valor'"){
                if(valornuevo != "'Seleccione un valor'"){
                    var data = {tipo: 'editarasociaciongrupo', caracteristicaseleccionada: caracteristicaseleccionada, gruposeleccionado: gruposeleccionado, valorseleccionado: valorseleccionado, valornuevo: valornuevo}
                    $.ajax({
                    url: '../phpadmin/c-caracteristicas.php',
                    type: 'POST',
                    dataType: 'json',
                    data: data,
                    success: function(respuesta){
                        if(respuesta == "La asociacion se ha editado correctamente."){
                            rellenar_grupos();
                            $("#valuebox").html("");
                            $("#newvalue").html("");   
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
                alert("Debe especificar el valor de la asociación para poder insertarla.");
            }
        }else{
            alert("Debe especificar el grupo para poder editarlo.");
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

     