function iniciar(){
    //Se inicializa los cuadros de textos enriquecidos del pluging EDITOR
    grupos_creados();
 };

 $(document).ready(function(){$("#file").change(function () {
    // $("#file").on("change", function(){
        $("#vista-previa").html("");
        var archivos= document.getElementById("file").files;
        var navegador = window.URL || window.webkitURL;
        for(i=0; i<archivos.length; i++){
            var size= archivos[i].size;
            var type =  archivos[i].type;
            var name = archivos[i].name;
            if(size > 1000*1000){
                $("#vista-previa").append("<p style='color: red'> El archivo "+name+" supera el maximo permitido 1 MB.</p>");
            }else if(type != "image/jpeg" && type != "image/png" && type != "image/jpg" && type != "image/gif"){
                $("#vista-previa").append("<p style='color: red'> El archivo "+name+" no es del tipo de imagen permitido.</p>");
            }else{
                var objeto_url = navegador.createObjectURL(archivos[i]);
                $("#vista-previa").append("<img src="+objeto_url+" width='250' heigth='250'>");
            }
        }
        });
    });

 function grupos_creados(){
	var tipogrupo = "'"+$('input[name="tipo"]:checked').val()+"'";
	if(tipogrupo == "'dicotomica'"){
		document.getElementById('divvalores').style.display = 'none';
	}
	else{
		document.getElementById('divvalores').style.display = 'block';
	}
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
		$("#valores").html("");
	}else{
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

function asociar_imagen(){
	var formData = new FormData($("#asociarimagenform")[0]);
	var caracteristicaseleccionada = $("#caracteristicascreadas option:selected").text();
	var gruposeleccionado = "'"+$("#grupobox option:selected").text()+"'";
	if(caracteristicaseleccionada != "Seleccione una característica"){
		if($('input[name="tipo"]:checked').val() == "matricial"){
			caracteristicaseleccionada = "'"+$("#caracteristicascreadas option:selected").text()+"'";
			formData.append("caracteristicaseleccionada", caracteristicaseleccionada);
			formData.append("tipo", "asociarimagencaracteristica");
			$.ajax({
				url: "../phpadmin/c-caracteristicas.php",
				type: "POST",
				data: formData,
				contentType: false,
				processData: false,
				success: function(respuesta){
					if(respuesta.indexOf("se ha insertado") > -1){
						$("#file").replaceWith($("#file").val('').clone(true));
						$("#vista-previa").html("");				
					}
					var respuestasincomillas = respuesta.substring(1, respuesta.length - 1);
					$("#respuesta").html(respuestasincomillas);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) { 
							alert("Status: " + textStatus); alert("Error: " + errorThrown); 
						}
			});
		} else{
			formData.append("caracteristicaseleccionada", caracteristicaseleccionada);
			formData.append("tipo", "asociarimagencaracteristica");
			formData.append("gruposeleccionado", gruposeleccionado);
			$.ajax({
				url: "../phpadmin/c-dicotomica.php",
				type: "POST",
				data: formData,
				contentType: false,
				processData: false,
				success: function(respuesta){
					if(respuesta.indexOf("se ha insertado") > -1){
						$("#file").replaceWith($("#file").val('').clone(true));
						$("#vista-previa").html("");				
					}
					var respuestasincomillas = respuesta.substring(1, respuesta.length - 1);
					$("#respuesta").html(respuestasincomillas);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) { 
							alert("Status: " + textStatus); alert("Error: " + errorThrown); 
						}
			});
		}
	}else{
		alert('Selecione una caracterítica para poder insertar la imagen');
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