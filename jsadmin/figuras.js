function iniciar(){
	cargar();
}

function cargar(){
	$.ajax({
      url: '../phpadmin/c-taxones.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'piefoto'},
      success: function(respuesta){
        console.log(respuesta);

        if(respuesta != null){
            console.log(respuesta);
            var  cadena = "";
            cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
            for (var i = 0; i < respuesta.length; i++){
                    cadena += "<li align='left' id='"+respuesta[i]["taxon"]+"' style='margin-top:5px;'> " + "- " + respuesta[i]['nombre'] + " - " + respuesta[i]['taxon'] +"</li>";
            }
            cadena += "</ul>";
            $("#contenido").html(cadena);
        }
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}