function iniciar(){
	esquemas_creados();
	buscador();
}

function esquemas_creados(){

	$.ajax({
      url: 'php/esquemas-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'esquemascreados'},
      success: function(respuesta){
        var  cadena = "";
        cadena += "<option selected='selected'>Seleccione el Esquema General que busca</option>"
        for (var i = 0; i < respuesta.length; i++){      
            cadena += "<option>"+ respuesta[i][0].toString() +"</option>";
        };
        $("#esquemascreados").html(cadena);

      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }

  	});
};

function buscador(){

		$.ajax({
	      url: 'php/esquemas-crustacean-keys.php',
	      type: 'POST',
	      dataType: 'json',
	      data: {tipo: 'buscador'},
	      success: function(respuesta){

	      	var words = Array();
	      	for(var i = 0; i < respuesta.length; i++){
	      		words.push(respuesta[i]);
	      	}

			var input = document.getElementById("esquemascreados");
			new Awesomplete(input, {
				list: words
			});

	        
	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) { 
	                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	                }
	  	});
	
}

function buscartermino(){
	
var noencontrado = 0;
	$.ajax({
	      url: 'php/esquemas-crustacean-keys.php',
	      type: 'POST',
	      dataType: 'json',
	      data: {tipo: 'buscador'},
	      success: function(respuesta){
	      	var buscador=$("#esquemascreados").val();
	      	for (var i = 0; i < respuesta.length; i++) {
	      		if(respuesta[i][1]==buscador){
	      			location.href ="esquema.html?esquema="+buscador;
	      			noencontrado = 0;
	      			i = respuesta.length;
	      		}else{
	      			noencontrado = 1;
	      		}
	      	}
	      	if (noencontrado == 1) {
				alert("Seleccione uno de los Esquemas Generales del listado");
			}
	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) { 
	                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	                }
	  	});
}
