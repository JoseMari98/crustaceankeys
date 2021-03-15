function iniciar(){
	cargarcontenido();
}

function cargarcontenido(){
	$.ajax({
      url: 'php/contenidos-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'contenidoinicio'},
      success: function(respuesta){
          var  cadena = "";
        for (var i = 0; i < respuesta.length; i++){
        		cadena += respuesta[i]["contenido"];
        };
        $("#contenidoinicio").html(cadena);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}
