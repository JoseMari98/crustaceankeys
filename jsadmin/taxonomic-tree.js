function iniciar(){
	padres_total();
}

function padres_total(){
	$.ajax({
      url: 'php/crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'sinpadre'},
      success: function(respuesta){
        var  cadena = "";
        cadena += "<ul id='arbol'>";
        for (var i = 0; i < respuesta.length; i++){         
            cadena += "<li id='"+respuesta[i]["name"]+"'><span class='icon fa fa-plus'></span>"+ respuesta[i]["classification"] +" "+ respuesta[i]["name"] +"</li>";
        };
        cadena += "</ul>";
        $("#taxonomictree").html(cadena);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }

  });
}