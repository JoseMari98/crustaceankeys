function iniciar(){
	buscador();
	total_clases();
	total_ordenes();
	total_familias();
	total_especies();
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
	      			location.href ="taxon.html?taxon="+buscador;
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

function total_clases(){
	$.ajax({
      url: 'php/especies-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'total_clases'},
      success: function(respuesta){
          var  cadena = "";
        for (var i = 0; i < respuesta.length; i++){
        		cadena += "<b>"+respuesta[i]["total_clases"]+"</b> Clases</p>";
        };
        $("#total_clases").html(cadena);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function total_ordenes(){
	$.ajax({
      url: 'php/especies-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'total_ordenes'},
      success: function(respuesta){
          var  cadena = "";
        for (var i = 0; i < respuesta.length; i++){
        		cadena += "<b>"+respuesta[i]["total_ordenes"]+"</b> Órdenes</p>";
        };
        $("#total_ordenes").html(cadena);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function total_familias(){
	$.ajax({
      url: 'php/especies-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'total_familias'},
      success: function(respuesta){
          var  cadena = "";
        for (var i = 0; i < respuesta.length; i++){
        		cadena += "<b>"+respuesta[i]["total_familias"]+"</b> Familias</p>";
        };
        $("#total_familias").html(cadena);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function total_especies(){
	$.ajax({
      url: 'php/especies-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'total_especies'},
      success: function(respuesta){
          var  cadena = "";
        for (var i = 0; i < respuesta.length; i++){
        		cadena += "<b>"+respuesta[i]["total_especies"]+"</b> Especies</p>";
        };
        $("#total_especies").html(cadena);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}