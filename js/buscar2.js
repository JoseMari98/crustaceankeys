function iniciar(){
	buscador();
}

function buscador(){

		$.ajax({
	      url: 'php/crustacean-keys.php',
	      type: 'POST',
	      dataType: 'json',
	      data: {tipo: 'buscador'},
	      success: function(respuesta){

	      	var words = Array();
	      	for(var i = 0; i < respuesta.length; i++){
	      		words.push(respuesta[i]);
	      	}

			var input = document.getElementById("buscar");
			new Awesomplete(input, {
				list: words
			});

	        
	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) { 
	                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	                }
	  	});
	
}

function buscartaxon(){
	var noencontrado = 0;
	$.ajax({
	      url: 'php/crustacean-keys.php',
	      type: 'POST',
	      dataType: 'json',
	      data: {tipo: 'buscador'},
	      success: function(respuesta){
	      	var buscador=$("#buscar").val();
	      	for (var i = 0; i < respuesta.length; i++) {
	      		if(respuesta[i][1]==buscador){
	      			location.href ="taxon-clave.html?taxon="+buscador;
	      			noencontrado = 0;
	      			i = respuesta.length;
	      		}else{
	      			noencontrado = 1;
	      		}
	      	}
	      	if (noencontrado == 1) {
				alert("El taxón "+buscador+" no se existe");
			}
	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) { 
	                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	                }
	  	});
}
