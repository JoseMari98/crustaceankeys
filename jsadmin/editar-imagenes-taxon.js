function iniciar(){
	taxones_creados();
	
};

function taxones_creados(){

	$.ajax({
      url: '../phpadmin/c-taxones.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'taxonescreados'},
      success: function(respuesta){
        var  cadena = "";
        cadena += "<option selected='selected'>Seleccione un taxón</option>"
        for (var i = 0; i < respuesta.length; i++){      
			cadena += "<option>"+ respuesta[i][0].toString() +"-"+ respuesta[i][1].toString() +"</option>";
        };
        $("#taxonescreados").html(cadena);

      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }

  	});
};

function mostrarimagenes(){
	var taxoncreado = "'"+$("#taxonescreados option:selected").text()+"'";	
	if(taxoncreado != "'Seleccione un taxón'"){
	    var taxon = taxoncreado.substring(0, taxoncreado.indexOf("-")) + "'";
	    taxoncreado = taxon;
	    $.ajax({
	      url: '../phpadmin/c-taxones.php',
	      type: 'POST',
	      dataType: 'json',
	      // header:{'Content-Type':'image/jpg','X-Requested-With':'XMLHttpRequest'},
	      data: {tipo: 'mostrarimagenes', taxoncreado: taxoncreado},
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
      url: '../phpadmin/c-taxones.php',
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
      url: '../phpadmin/c-taxones.php',
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