function iniciar(){
	grupos_creados();
}

function grupos_creados(){
	var tipogrupo = "'"+$('input[name="tipo"]:checked').val()+"'";
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

function rellenar_grupo(){
	var gruposeleccionado = "'"+$("#gruposcreados option:selected").text()+"'";
	if(gruposeleccionado == "'Seleccione un grupo de identificación'"){
		$("#name").val("");
	}else{
		$.ajax({
			url: '../phpadmin/c-dicotomica.php',
			type: 'POST',
			dataType: 'json',
			data: {tipo: 'rellenarfecha', gruposeleccionado: gruposeleccionado},
			success: function(respuesta){
				$("#fecha").val(respuesta);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) { 
						  alert("Status: " + textStatus); alert("Error: " + errorThrown); 
					  }
	  
			});
		$("#name").val($("#gruposcreados option:selected").text());
		grupos_padres();
	};
};

function grupos_padres(){
	var tipogrupo = "'"+$('input[name="tipo"]:checked').val()+"'";
	var gruposeleccionado = "'"+$("#gruposcreados option:selected").text()+"'";
	$.ajax({
		url: '../phpadmin/c-caracteristicas.php',
		type: 'POST',
		dataType: 'json',
		data: {tipo: 'grupopadre', gruposeleccionado: gruposeleccionado, tipogrupo: tipogrupo},
		success: function(respuesta){ //cambiar indices del vector cuando sepa cual tengo que poner
			var grupoobtenido = respuesta;
	
			$.ajax({
				url: '../phpadmin/c-caracteristicas.php',
				type: 'POST',
				dataType: 'json',
				data: {tipo: 'gruposcreados', tipogrupo: tipogrupo},
				success: function(respuestagrupo){
				var cadena = "";
				if(grupoobtenido == "Ninguno"){
					cadena += "<option selected='selected'>Ninguno</option>";
					for (var i = 0; i < respuestagrupo.length; i++){
						if(respuestagrupo[i]["grupo"] != null)
							cadena += "<option>"+ respuestagrupo[i]["grupo"] +"</option>";      
					};
					$("#grupospadres").html(cadena);
				} else{
					cadena += "<option>Ninguno</option>";
					for (var i = 0; i < respuestagrupo.length; i++){
						if(respuestagrupo[i]["grupo"] != null && respuestagrupo[i]["grupo"] != $("#gruposcreados option:selected").text()){
							if(respuestagrupo[i]["grupo"] != grupoobtenido){
								cadena += "<option>"+ respuestagrupo[i]["grupo"] +"</option>";      
							}else{
								cadena += "<option selected='selected'>"+ grupoobtenido +"</option>";
							}
						}
						
					};
					$("#grupospadres").html(cadena);
				}
				
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

function editar_grupo(){
	var gruposeleccionado = "'"+$("#gruposcreados option:selected").text()+"'";
	var grupopadre = "'"+$("#grupospadres option:selected").text()+"'";
	var tipogrupo = "'"+$('input[name="tipo"]:checked').val()+"'";
	if(gruposeleccionado != "'Seleccione un grupo de identificación'"){
		if(espaciosinifin($("#name").val())!= ""){
			var name = "'"+espaciosinifin($("#name").val())+"'";
			var fecha = "'"+espaciosinifin($("#fecha").val())+"'";
			var data = {tipo: 'editargrupo', gruposeleccionado: gruposeleccionado, name: name, grupopadre: grupopadre, fecha: fecha, tipogrupo: tipogrupo}
			$.ajax({
			url: '../phpadmin/c-caracteristicas.php',
			type: 'POST',
			dataType: 'json',
			data: data,
			success: function(respuesta){
				if(respuesta == "El grupo se ha editado correctamente."){
					$("#name").val("");
					$("#gruposcreados").html("");
					$("#grupospadres").html("");
					$("#fecha").val("");
					grupos_creados();
				}
				alert(respuesta);     
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) { 
							alert("Status: " + textStatus); alert("Error: " + errorThrown); 
						}

			});
		}else{
		    alert("Debe especificar el nombre del grupo para poder insertarlo.");
		}
	}else{
	    alert("Selecciona el grupo que deseas editar.");
	}
}

function eliminar_grupo(){
	var gruposeleccionado = "'"+$("#gruposcreados option:selected").text()+"'";
	var tipogrupo = "'"+$('input[name="tipo"]:checked').val()+"'";
	if(gruposeleccionado != "'Seleccione un grupo de identificación'"){
		if(tipogrupo != "'dicotomica'"){
			$.ajax({
				url: '../phpadmin/c-caracteristicas.php',
				type: 'POST',
				dataType: 'json',
				data: {tipo: 'eliminargrupo', gruposeleccionado: gruposeleccionado},
				success: function(respuesta){
					if(respuesta == "El grupo se ha eliminado correctamente."){
						$("#name").val("");
						$("#gruposcreados").html("");
						$("#fecha").val("");
						grupos_creados();
					}
					alert(respuesta);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) { 
								alert("Status: " + textStatus); alert("Error: " + errorThrown); 
							}
				});
		} else{
			var caracteristicas;
			$.ajax({
				url: '../phpadmin/c-dicotomica.php',
				type: 'POST',
				dataType: 'json',
				async: false,
				data: {tipo: 'caracteristicaspadre', gruposeleccionado: gruposeleccionado},
				success: function(respuesta){
					caracteristicas = respuesta;
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) { 
								alert("Status: " + textStatus); alert("Error: " + errorThrown); 
							}
				});
			for(var i = 0 ; i < caracteristicas.length ; i++){
				eliminar_recursiva(caracteristicas[i]['nivel'].toString() + "-" + caracteristicas[i]['opcion'].toString() + "-" + caracteristicas[i]['caracteristica'].toString(), gruposeleccionado);
			}
		
			$.ajax({
				url: '../phpadmin/c-dicotomica.php',
				type: 'POST',
				dataType: 'json',
				async: false,
				data: {tipo: 'eliminargrupo', gruposeleccionado: gruposeleccionado},
				success: function(respuesta){
					if(respuesta == "El grupo se ha eliminado correctamente."){
						$("#name").val("");
						$("#gruposcreados").html("");
						$("#fecha").val("");
						grupos_creados();
					}
					alert(respuesta);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) { 
								alert("Status: " + textStatus); alert("Error: " + errorThrown); 
							}
				});
		}
	}else{
	    alert("Selecciona el grupo que quieras editar.");
	}
}

/*function eliminarcaracteristica(){
	var caracteristicaseleccionada = $("#caracteristicascreadas option:selected").text();
	var grupo = "'"+$("#gruposcreados option:selected").text()+"'";
	if(caracteristicaseleccionada != "'Seleccione una característica'"){
		eliminar_recursiva(caracteristicaseleccionada, grupo);
		$("#nivel").val("");
		$("#descripcion").val("");
		$("#subgrupobox").html("");
		$("#gruposcreados").html("");
		$("#caracteristicascreadas").html("");
		$("#taxonbox").html("");
		rellenar_grupos();
	}else{
	    alert("Selecciona la característica que quieras editar.");
	}
}*/

function eliminar_recursiva(caracteristicaActual, grupo){
	$.ajax({
		async:false,
		url: '../phpadmin/c-dicotomica.php',
		type: 'POST',
		dataType: 'json',
		data: {tipo: 'buscarhijos', caracteristicaActual: caracteristicaActual, grupo: grupo},
		success: function(respuesta){
			if(respuesta != "No hay características para este grupo"){
				for (var i = 0; i < respuesta.length; i++){
					eliminar_recursiva(respuesta[i]['nivel'].toString() + "-" + respuesta[i]['opcion'].toString() + "-" + respuesta[i]['caracteristica'].toString(), grupo);
				};
			}
			  
			$.ajax({
				async:false,
				url: '../phpadmin/c-dicotomica.php',
				type: 'POST',
				dataType: 'json',
				data: {tipo: 'eliminarcaracteristica', caracteristicaActual: caracteristicaActual, grupo: grupo},
				success: function(respuestadentro){
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
}


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

