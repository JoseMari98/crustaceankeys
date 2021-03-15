function iniciar(){
	var editorcontenido = $("#contenido").Editor({'togglescreen':false, 'source':false, 'insert_img':false});	
	paginas_creadas();
}
function paginas_creadas(){

	$.ajax({
      url: '../phpadmin/c-paginas.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'paginascreadas'},
      success: function(respuesta){
        var  cadena = "";
        cadena += "<option selected='selected'>Seleccione una página a editar</option>"
        for (var i = 0; i < respuesta.length; i++){      
            cadena += "<option>"+ respuesta[i][0].toString() +"</option>";
        };
        $("#paginascreadas").html(cadena);

      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }

  	});
};

function rellenar_informacion_pagina(){
	var paginaseleccionada = $("#paginascreadas option:selected").text();
	if(paginaseleccionada == "Seleccione una página a editar"){
        $('#contenido').Editor("setText", "");
	}else{
		$.ajax({
	      url: '../phpadmin/c-paginas.php',
	      type: 'POST',
	      dataType: 'json',
	      data: {tipo: 'rellenarinformacionpagina', paginaseleccionada: paginaseleccionada},
	      success: function(respuesta){
	        var  cadena = "";
	        $('#contenido').Editor("setText", respuesta[0][0]); 

	        // if (fatherobtenido == null){
	        // 	fatherobtenido = "NoTiene";
	        // }


	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) { 
	                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	                }

	  	});
	};
};


function editarcontenido(){
	var paginacreada = "'"+$("#paginascreadas option:selected").text()+"'";
	if(paginacreada != "'Seleccione una página a editar'"){
		    var pagina = paginacreada
		      		    
		    var contenido = "'"+$('#contenido').Editor("getText")+"'"; // Forma especial para obtener texto del cuadro de texto del pluging EDITOR


		    var data = {tipo: 'editarpagina', paginacreada: paginacreada, contenido: contenido}
		    $.ajax({
		      url: '../phpadmin/c-paginas.php',
		      type: 'POST',
		      dataType: 'json',
		      data: data,
		      success: function(respuesta){
		      	if(respuesta == "La página $paginacreada se ha editado correctamente."){
			        $('#contenido').Editor("setText", ""); 
			        paginas_creadas();
		        }
		        alert(respuesta);

		        
		      },
		      error: function(XMLHttpRequest, textStatus, errorThrown) { 
		                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
		                }

		    });
	}else{
	    alert("Seleccione la página que desea editar.");
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

