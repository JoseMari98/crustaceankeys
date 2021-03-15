function iniciar(){
	taxonescondistribucion();
	
};

function taxonescondistribucion(){

	$.ajax({
      url: '../phpadmin/c-distribucion.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'taxonescondistribucion'},
      success: function(respuesta){
        var  cadena = "";
        cadena += "<option selected='selected'>Seleccione un tax&oacuten a editar</option>"
        for (var i = 0; i < respuesta.length; i++){      
            cadena += "<option>"+ respuesta[i][0].toString() +"</option>";
        };
        $("#taxonescondistribucion").html(cadena);

      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }

  	});
};

function mostrardistribucion(){
	var taxonseleccionado = "'"+$("#taxonescondistribucion option:selected").text()+"'";	
	if(taxonseleccionado != "'Seleccione el Esquema General que desea editar'"){
	    var taxon = taxonseleccionado
	    $.ajax({
	      url: '../phpadmin/c-distribucion.php',
	      type: 'POST',
	      dataType: 'json',
	      // header:{'Content-Type':'image/jpg','X-Requested-With':'XMLHttpRequest'},
	      data: {tipo: 'mostrardistribucion', taxonseleccionado: taxonseleccionado},
	      success: function(respuesta){
	        var cadena = "";
	        var datosimagenes = "";
	        if(respuesta != null){
		        for(var i = 0; i < respuesta.length; i++){
		        cadena+="<br><a style='margin: 10px' onClick='seleccionarimagen("+respuesta[i]['id']+")'><img id='"+respuesta[i]['id']+"' src='data:"+respuesta[i]['tipo']+";base64,"+respuesta[i]['imagen']+"' height='200'/>";
		    	datosimagenes += "<div class='imagenes "+respuesta[i]['id']+" d-none' id='"+respuesta[i]['id']+"'>";
		    	datosimagenes += "<a class='btn btn-primary btn-sm' href='javascript:;' onclick='borrardistribucion();' role='button'>Eliminar Distribuci&oacuten Geogr&aacutefica</a>";
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
	$("."+idimagen).removeClass("d-none");
	$("."+idimagen).addClass("d-block");
}

function borrardistribucion(){
	var id = $(".d-block").attr('id');
	$.ajax({
      url: '../phpadmin/c-distribucion.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'borrardistribucion', id: id},
      success: function(respuesta){
        alert(respuesta);
        mostrardistribucion();
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }

  	});
}