function iniciar(){
	rellenar_grupos();
}

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

function rellenar_caracteristicas(){
	var gruposeleccionado = "'"+$("#gruposcreados option:selected").text()+"'";
	if(gruposeleccionado == "'Seleccione un grupo de identificación'"){
		$("#caracteristicascreadas").html("");
		$("#nivel").val("");
		$("#descripcion").val("");
		$("#optionbox").html("");
		$("#taxonbox").html("");
	}else{
		$.ajax({
		url: '../phpadmin/c-dicotomica.php',
		type: 'POST',
		dataType: 'json',
		data: {tipo: 'caracteristicascreadasgrupo', gruposeleccionado: gruposeleccionado},
		success: function(respuesta){			
			var cadena = "<option selected='selected'>Seleccione una característica</option>"
			if(respuesta != "No hay características para este grupo"){
				for (var i = 0; i < respuesta.length; i++){      
					cadena += "<option>"+ respuesta[i]['nivel'].toString() + "-" + respuesta[i]['opcion'].toString() + "-" + respuesta[i]['caracteristica'].toString() +"</option>";
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

function rellenar_datos_caracteristicas(){
	var caracteristicaSeleccionada = $("#caracteristicascreadas option:selected").text();
	var grupoSeleccionado = "'"+$("#gruposcreados option:selected").text()+"'";
	if(caracteristicaSeleccionada == "'Seleccione una característica'"){
		$("#nivel").val("");
		$("#descripcion").val("");
		$("#optionbox").html("");
		$("#taxonbox").html("");
		$("#subgrupobox").html("");
	}else{
		$.ajax({
	      url: '../phpadmin/c-dicotomica.php',
	      type: 'POST',
	      dataType: 'json',
	      data: {tipo: 'rellenardatoscaracteristica', caracteristicaSeleccionada: caracteristicaSeleccionada, grupoSeleccionado: grupoSeleccionado},
		  success: function(respuesta){ //cambiar indices del vector cuando sepa cual tengo que poner
			var id = respuesta['id'];
	        $("#nivel").val(respuesta['nivel']);
            $("#descripcion").val(respuesta['caracteristica']);
			var opcion = respuesta['opcion'];
			var taxon = respuesta['taxon'];
			var id_subgrupo = respuesta['subgrupo'];

			var  cadena = "";
			if("A" != opcion){
				cadena += "<option>A</option>";      
			}else{
				cadena += "<option selected='selected'>"+ opcion +"</option>";
			}

			if("B" != opcion){
				cadena += "<option>B</option>";      
			}else{
				cadena += "<option selected='selected'>"+ opcion +"</option>";
			}

			if("C" != opcion){
				cadena += "<option>C</option>";      
			}else{
				cadena += "<option selected='selected'>"+ opcion +"</option>";
			}

			if("D" != opcion){
				cadena += "<option>D</option>";      
			}else{
				cadena += "<option selected='selected'>"+ opcion +"</option>";
			}

			if("E" != opcion){
				cadena += "<option>E</option>";      
			}else{
				cadena += "<option selected='selected'>"+ opcion +"</option>";
			}
			$("#optionbox").html(cadena);

			$.ajax({
				url: '../phpadmin/c-dicotomica.php',
				type: 'POST',
				dataType: 'json',
				data: {tipo: 'rellenartaxones', grupoSeleccionado: grupoSeleccionado},
				success: function(respuestataxones){
					if(respuestataxones[0] != null){
						var cadena = "";
						//if(taxon == null)
							cadena += "<option selected='selected'>Ninguno</option>";
						for (var i = 0; i < respuestataxones.length; i++){
							if(respuestataxones[i]['name'] != taxon){
								cadena += "<option>"+ respuestataxones[i]['name'] +"</option>";      
							}else{
								cadena += "<option selected='selected'>"+ taxon +"</option>";
							}
						};
						
					} else
						cadena = "<option selected='selected'>Ninguno</option>";

					$("#taxonbox").html(cadena);

				},
				error: function(XMLHttpRequest, textStatus, errorThrown) { 
								alert("Status: " + textStatus); alert("Error: " + errorThrown); 
							}
			
				});

				$.ajax({
					url: '../phpadmin/c-dicotomica.php',
					type: 'POST',
					dataType: 'json',
					data: {tipo: 'rellenarsubgrupos', grupoSeleccionado: grupoSeleccionado},
					success: function(respuestasubgrupo){
						if(respuestasubgrupo[0] != null){
							var cadena = "";
							//if(taxon == null)
								cadena += "<option selected='selected'>Ninguno</option>";
							for (var i = 0; i < respuestasubgrupo.length; i++){
								if(respuestasubgrupo[i]['id'] != id_subgrupo){
									cadena += "<option>"+ respuestasubgrupo[i]['grupo'] +"</option>";      
								}else{
									cadena += "<option selected='selected'>"+ respuestasubgrupo[i]['grupo'] +"</option>";
								}
							};
							
						} else
							cadena = "<option selected='selected'>Ninguno</option>";
	
						$("#subgrupobox").html(cadena);
	
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

function editarcaracteristica(){
	var caracteristicaseleccionada = $("#caracteristicascreadas option:selected").text();
	if(caracteristicaseleccionada != "Seleccione una característica"){
		if(espaciosinifin($("#nivel").val())!= ""){
			if($("#gruposcreados option:selected").text() != "Seleccione un grupo de identificación"){
				if(espaciosinifin($("#descripcion").val()) != ""){
					var nivel = espaciosinifin($("#nivel").val());
					var descripcion = "'"+espaciosinifin($("#descripcion").val())+"'";
					var grupo = "'"+$("#gruposcreados option:selected").text()+"'";
					var taxon = "'"+$("#taxonbox option:selected").text()+"'";
					var opcion = "'" + $("#optionbox option:selected").text()+"'";
					var subgrupo = "'" + $("#subgrupobox option:selected").text()+"'";
				
					var data = {tipo: 'editarcaracteristica', grupo: grupo, caracteristicaseleccionada: caracteristicaseleccionada, nivel: nivel, descripcion: descripcion, taxon: taxon, opcion: opcion, subgrupo: subgrupo}
					$.ajax({
					url: '../phpadmin/c-dicotomica.php',
					type: 'POST',
					dataType: 'json',
					data: data,
					success: function(respuesta){
						if(respuesta == "La característica se ha editado correctamente."){
							$("#nivel").val("");
							$("#descripcion").val("");
							$("#taxonbox").html("");
							$("#subgrupobox").html("");
							$("#caracteristicascreadas").html("");
							rellenar_caracteristicas();
						}
						alert(respuesta);
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) { 
									alert("Status: " + textStatus); alert("Error: " + errorThrown); 
								}

					});
				}else{
					alert("Debe especificar la descripcion de la característica.");
				}
			}else{
				alert("Debe especificar un grupo para poder insertarla.");
			}
		}else{
		    alert("Debe especificar el nivel de la caracteristica para poder insertarla");
		};
	}else{
	    alert("Selecciona la característica que quieras editar.");
	}
}

function eliminarcaracteristica(){
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
}

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

