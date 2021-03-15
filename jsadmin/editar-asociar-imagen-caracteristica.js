function iniciar(){
    //Se inicializa los cuadros de textos enriquecidos del pluging EDITOR
    grupos_creados();
 };

 function grupos_creados(){
	var tipogrupo = "'"+$('input[name="tipo"]:checked').val()+"'";
	if(tipogrupo == "'dicotomica'")
		document.getElementById('divvalores').style.display = 'none';
	else
		document.getElementById('divvalores').style.display = 'block';
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
		$("#valores").html("");
		$("#divimagen").html("");
        

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
		$("#valores").html("");
	}else{
		/*$.ajax({
		url: '../phpadmin/c-caracteristicas.php',
		type: 'POST',
		dataType: 'json',
		data: {tipo: 'caracteristicascreadasgrupo', gruposeleccionado: gruposeleccionado},
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

		});*/
		if($('input[name="tipo"]:checked').val() == "matricial"){
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
		} else{
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
	}
};

function rellenar_valores(){
	mostrarimagenes();
	if($('input[name="tipo"]:checked').val() == "matricial"){
		var caracteristicaseleccionada = "'"+$("#caracteristicascreadas option:selected").text()+"'";
		if(caracteristicaseleccionada == "'Seleccione una característica'"){
			$("#valores").html("");
		}else{
			$.ajax({
			url: '../phpadmin/c-caracteristicas.php',
			type: 'POST',
			dataType: 'json',
			data: {tipo: 'rellenardatoscaracteristica', caracteristicaseleccionada: caracteristicaseleccionada},
			success: function(respuesta){
				var cadena = "";
				var valoresobtenidos = respuesta[0][2];
				var valores = valoresobtenidos.split("; ");
				for (var i = 0; i < valores.length; i++){
					cadena += valores[i] + "<br>";
				}
				$("#valores").html(cadena);				
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) { 
							alert("Status: " + textStatus); alert("Error: " + errorThrown); 
						}

			});
		};
	}
};

function mostrarimagenes(){
	var gruposeleccionado = "'"+$("#grupobox option:selected").text()+"'";
	var caracteristicaseleccionada = $("#caracteristicascreadas option:selected").text();	
	if(caracteristicaseleccionada != "Seleccione una característica"){
		if($('input[name="tipo"]:checked').val() == "matricial"){
			caracteristicaseleccionada = "'"+$("#caracteristicascreadas option:selected").text()+"'";	
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
		} else{
			$.ajax({
				url: '../phpadmin/c-dicotomica.php',
				type: 'POST',
				dataType: 'json',
				data: {tipo: 'mostrarimagenes', caracteristicaseleccionada: caracteristicaseleccionada, gruposeleccionado: gruposeleccionado},
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
		}
	}else{
		$("#divimagen").html("");
	}
};

function borrarimagen(){
	var gruposeleccionado = "'"+$("#grupobox option:selected").text()+"'";
    var caracteristicaseleccionada = $("#caracteristicascreadas option:selected").text();	
	if(caracteristicaseleccionada != "Seleccione una característica"){
		if($('input[name="tipo"]:checked').val() == "matricial"){
			caracteristicaseleccionada = "'"+$("#caracteristicascreadas option:selected").text()+"'";	
			$.ajax({
			url: '../phpadmin/c-caracteristicas.php',
			type: 'POST',
			dataType: 'json',
			data: {tipo: 'borrarimagen', caracteristicaseleccionada: caracteristicaseleccionada},
			success: function(respuesta){
				alert(respuesta);
				mostrarimagenes();
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) { 
							alert("Status: " + textStatus); alert("Error: " + errorThrown); 
						}

			});
		} else{
			$.ajax({
				url: '../phpadmin/c-dicotomica.php',
				type: 'POST',
				dataType: 'json',
				data: {tipo: 'borrarimagen', caracteristicaseleccionada: caracteristicaseleccionada, gruposeleccionado: gruposeleccionado},
				success: function(respuesta){
					alert(respuesta);
					mostrarimagenes();
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) { 
								alert("Status: " + textStatus); alert("Error: " + errorThrown); 
							}
	
				});
		}
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