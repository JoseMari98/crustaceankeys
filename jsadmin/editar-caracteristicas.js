function iniciar(){
	grupos_creados();
	rellenar_categoria();
}

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

function rellenar_categoria(){
    //Busca las posibles clasificaciones de los taxones y los coloca en una caja de selección
    $.ajax({
        url: '../phpadmin/c-caracteristicas.php',
        type: 'POST',
        dataType: 'json',
        data: {tipo: 'categoriasasignadas'},
        success: function(respuesta){
		  var cadena = "<option>Seleccione una categoría taxonómica</option>";
		  var categorias = [];
          for (var i = 0; i < respuesta.length; i++){
			  posicion = categorias.indexOf(respuesta[i][0]);
			  if(posicion == -1){
				cadena += "<option>"+ respuesta[i][0].toString() +"</option>";
				categorias.push(respuesta[i][0]);
			  }
          };
          $("#categoriabox").html(cadena);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
                      alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                  }
    
        });
  
  };

function rellenar_caracteristicas(){
	var gruposeleccionado = "'"+$("#grupobox option:selected").text()+"'";
	var categoriaseleccionada = "'"+$("#categoriabox option:selected").text()+"'";
	if(gruposeleccionado == "'Seleccione un grupo de identificación'" || categoriaseleccionada == "'Seleccione una categoría taxonómica'"){
		$("#caracteristicascreadas").html("");
		$("#name").val("");
		$("#value").val("");
        $("#typesbox").html("");
	}else{
		$.ajax({
		url: '../phpadmin/c-caracteristicas.php',
		type: 'POST',
		dataType: 'json',
		data: {tipo: 'caracteristicascreadasgrupocategoria', categoriaseleccionada: categoriaseleccionada, gruposeleccionado: gruposeleccionado},
		success: function(respuesta){
			var cadena = "<option selected='selected'>Seleccione una característica</option>"
			if(respuesta != "No hay características para este grupo y categoría"){
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

function rellenar_datos_caracteristicas(){
	var caracteristicaseleccionada = "'"+$("#caracteristicascreadas option:selected").text()+"'";
	if(caracteristicaseleccionada == "'Seleccione una característica'"){
		$("#name").val("");
		$("#value").val("");
		$("#typesbox").html("");
		$("#gruposcreados").html("");
		$("#categoriascreadas").html("");
	}else{
		$.ajax({
	      url: '../phpadmin/c-caracteristicas.php',
	      type: 'POST',
	      dataType: 'json',
	      data: {tipo: 'rellenardatoscaracteristica', caracteristicaseleccionada: caracteristicaseleccionada},
	      success: function(respuesta){ //cambiar indices del vector cuando sepa cual tengo que poner
	        $("#name").val(respuesta[0][0]);
            $("#value").val(respuesta[0][2]);
			var tipoobtenido = respuesta[0][1];
			var grupoobtenido = respuesta[0][3];
			var categoriaobtenida = respuesta[0][4];
	        $.ajax({
		      url: '../phpadmin/c-caracteristicas.php',
		      type: 'POST',
		      dataType: 'json',
		      data: {tipo: 'typesbox'},
		      success: function(respuestacaracteristica){
				var  cadena = "";
		        for (var i = 0; i < respuestacaracteristica.length; i++){
		        	if(respuestacaracteristica[i]["tipo"] != tipoobtenido){
		        		cadena += "<option>"+ respuestacaracteristica[i]["tipo"] +"</option>";      
		        	}else{
		        		cadena += "<option selected='selected'>"+ tipoobtenido +"</option>";
		        	}
		        };
		        $("#typesbox").html(cadena);
		      },
		      error: function(XMLHttpRequest, textStatus, errorThrown) { 
		                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
				}
			  });
			  
			  var tipogrupo = "'matricial'";
			  $.ajax({
				url: '../phpadmin/c-caracteristicas.php',
				type: 'POST',
				dataType: 'json',
				data: {tipo: 'gruposcreados', tipogrupo: tipogrupo},
				success: function(respuestagrupo){
				  var cadena = "";
					for (var i = 0; i < respuestagrupo.length; i++){
						if(respuestagrupo[i]["grupo"] != grupoobtenido){
							cadena += "<option>"+ respuestagrupo[i]["grupo"] +"</option>";      
						}else{
							cadena += "<option selected='selected'>"+ grupoobtenido +"</option>";
						}
					};
					  $("#gruposcreados").html(cadena);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) { 
							  alert("Status: " + textStatus); alert("Error: " + errorThrown); 
						  }
		  
				});

				$.ajax({
					url: '../phpadmin/c-taxones.php',
					type: 'POST',
					dataType: 'json',
					data: {tipo: 'taxonesbox'},
					success: function(respuestacategoria){
					  var cadena = "";
					  for (var i = 0; i < respuestacategoria.length; i++){
						if(respuestacategoria[i]["class"] != categoriaobtenida){
							cadena += "<option>"+ respuestacategoria[i]["class"] +"</option>";      
						}else{
							cadena += "<option selected='selected'>"+ categoriaobtenida +"</option>";
						}
					};
					  $("#categoriascreadas").html(cadena);
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

function vaciarvalor(){
    $("#value").val(""); 
};

$(document).ready(function(){
	$('#typesbox').change(
		function () {
    		$('#cambiartipoModal').modal('show');
		});
});

function editarcaracteristica(){
	var caracteristicaseleccionada = "'"+$("#caracteristicascreadas option:selected").text()+"'";
	if(caracteristicaseleccionada != "'Seleccione una característica'"){
		if(espaciosinifin($("#name").val())!= ""){
			if($("#typesbox option:selected").text() != "Seleccione un tipo de característica"){
				if(espaciosinifin($("#value").val()) != ""){
					var name = "'"+espaciosinifin($("#name").val())+"'";
					var valor = "'"+espaciosinifin($("#value").val())+"'";
					var tipocaracteristica = "'"+$("#typesbox option:selected").text()+"'";
					var gruposeleccionado = "'"+$("#gruposcreados option:selected").text()+"'";
					var categoriaseleccionada = "'"+$("#categoriascreadas option:selected").text()+"'";
				
					var data = {tipo: 'editarcaracteristica', caracteristicaseleccionada: caracteristicaseleccionada, tipocaracteristica: tipocaracteristica,
					 name: name, valor: valor, gruposeleccionado: gruposeleccionado, categoriaseleccionada: categoriaseleccionada}
					$.ajax({
					url: '../phpadmin/c-caracteristicas.php',
					type: 'POST',
					dataType: 'json',
					data: data,
					success: function(respuesta){
						if(respuesta == "La característica se ha editado correctamente."){
							$("#name").val("");
							$("#value").val("");			    
							$("#typesbox").html("");
							$("#categoriascreadas").html("");
							$("#gruposcreados").html("");
							//rellenar_categoria();
							//grupos_creados();
							rellenar_caracteristicas();
						}
						alert(respuesta);

						
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) { 
									alert("Status: " + textStatus); alert("Error: " + errorThrown); 
								}

					});
				}else{
					alert("Debe especificar el valor de la característica para poder insertarla.");
				}
			}else{
				alert("Debe especificar el tipo de la característica para poder insertarla.");
			}
		}else{
		    alert("Debe especificar el nombre de la característica para poder insertarla.");
		};
	}else{
	    alert("Selecciona la característica que quieras editar.");
	}
}

function eliminarcaracteristica(){
	var caracteristicaseleccionada = "'"+$("#caracteristicascreadas option:selected").text()+"'";
	if(caracteristicaseleccionada != "'Seleccione una característica'"){
	    $.ajax({
		      url: '../phpadmin/c-caracteristicas.php',
		      type: 'POST',
		      dataType: 'json',
		      data: {tipo: 'eliminarcaracteristica', caracteristicaseleccionada: caracteristicaseleccionada},
		      success: function(respuesta){
		      	if(respuesta == "La característica se ha eliminado correctamente."){
                    $("#name").val("");
                    $("#value").val("");
					$("#typesbox").html("");
					$("#caracteristicascreadas").html("");
					rellenar_categoria();
				}
		        alert(respuesta);
		      },
		      error: function(XMLHttpRequest, textStatus, errorThrown) { 
		                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
		                }
		    });
	}else{
	    alert("Selecciona la característica que quieras editar.");
	}
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

