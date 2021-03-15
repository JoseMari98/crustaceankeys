function iniciar(){
	terminos_creados();
	
};

function terminos_creados(){

	$.ajax({
      url: '../phpadmin/c-terminos.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'terminoscreados'},
      success: function(respuesta){
        var  cadena = "";
        cadena += "<option selected='selected'>Seleccione un término del Glosario</option>"
        for (var i = 0; i < respuesta.length; i++){      
            cadena += "<option>"+ respuesta[i][0].toString() +"</option>";
        };
        $("#terminoscreados").html(cadena);

      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }

  	});
};

function mostrarimagenes(){
	var terminocreado = "'"+$("#terminoscreados option:selected").text()+"'";	
	if(terminocreado != "'Seleccione un término del Glosario'"){
	    var termino = terminocreado
	    $.ajax({
	      url: '../phpadmin/c-terminos.php',
	      type: 'POST',
	      dataType: 'json',
	      // header:{'Content-Type':'image/jpg','X-Requested-With':'XMLHttpRequest'},
	      data: {tipo: 'mostrarimagenes', terminocreado: terminocreado},
	      success: function(respuesta){
	        var cadena = "";
	        var datosimagenes = "";
	        if(respuesta != null){
		        for(var i = 0; i < respuesta.length; i++){
		        cadena+="<a style='margin: 10px' onClick='seleccionarimagen("+respuesta[i]['id']+")'><img id='"+respuesta[i]['id']+"' src='data:"+respuesta[i]['tipo']+";base64,"+respuesta[i]['imagen']+"' height='200' width='200'/>";
		    	datosimagenes += "<div class='imagenes "+respuesta[i]['id']+" d-none' id='"+respuesta[i]['id']+"'>";
		    	datosimagenes += "<div class='titulo-panel-control "+respuesta[i]['id']+"' style='text-align: center;''><h4>Nombre de la imagen</h4></div>";
		    	datosimagenes += "<input class='form-control "+respuesta[i]['id']+"' type='text' id='nombre' value='"+respuesta[i]['nombre']+"' required></input>";
		    	datosimagenes += "<br>";
		    	datosimagenes += "</div>"
		    	}
	    	}
	    	// height='"+respuesta[i]['altura']+"' width='"+respuesta[i]['anchura']
	        $("#divimagenes").html(cadena);
	        $("#datos-imagen").html(datosimagenes);

	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) { 
	                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	                }

	  	});
	}else{
		$("#divimagenes").html("");
		$("#datos-imagen").html("");

	}
};

function seleccionarimagen(idimagen){
	// var id =$("#"+idimagen).val();
	$(".imagenes").removeClass("d-block");
	$(".imagenes").addClass("d-none");
	$("."+idimagen).removeClass("d-none");
	$("."+idimagen).addClass("d-block");
}

function editarimagen(){
	var id = $(".d-block").attr('id');
	var nombre = $(".d-block").children("#nombre").val();
	$.ajax({
      url: '../phpadmin/c-terminos.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'editarimagen', id: id, nombre: nombre},
      success: function(respuesta){
        alert(respuesta);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }

  	});
}

function borrarimagen(){
	var id = $(".d-block").attr('id');
	$.ajax({
      url: '../phpadmin/c-terminos.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'borrarimagen', id: id},
      success: function(respuesta){
        alert(respuesta);
        mostrarimagenes();
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }

  	});
}