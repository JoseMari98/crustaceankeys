function iniciar(){
	esquemas_creados();
	
};

function esquemas_creados(){

	$.ajax({
      url: '../phpadmin/c-esquemas.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'esquemascreados'},
      success: function(respuesta){
        var  cadena = "";
        cadena += "<option selected='selected'>Seleccione el Esquema General que desea editar</option>"
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

function mostrarimagenesquema(){
	var esquemacreado = "'"+$("#esquemascreados option:selected").text()+"'";	
	if(esquemacreado != "'Seleccione el Esquema General que desea editar'"){
	    var esquema = esquemacreado
	    $.ajax({
	      url: '../phpadmin/c-esquemas.php',
	      type: 'POST',
	      dataType: 'json',
	      // header:{'Content-Type':'image/jpg','X-Requested-With':'XMLHttpRequest'},
	      data: {tipo: 'mostrarimagenesquema', esquemacreado: esquemacreado},
	      success: function(respuesta){
	        var cadena = "";
	        var datosimagenes = "";
	        if(respuesta != null){
		        for(var i = 0; i < respuesta.length; i++){
		        cadena+="<a style='margin: 10px' onClick='seleccionarimagen("+respuesta[i]['id']+")'><img id='"+respuesta[i]['id']+"' src='data:"+respuesta[i]['tipo']+";base64,"+respuesta[i]['imagen']+"' height='200' width='200'/>";
		    	datosimagenes += "<div class='imagenes "+respuesta[i]['id']+" d-none' id='"+respuesta[i]['id']+"'>";
		    	datosimagenes += "<div class='titulo-panel-control "+respuesta[i]['id']+"' style='text-align: center;''><h4>Nombre del Esquema General</h4></div>";
		    	datosimagenes += "<input class='form-control "+respuesta[i]['id']+"' type='text' id='nombre' value='"+respuesta[i]['nombre']+"' required></input>";
				datosimagenes += "<div class='titulo-panel-control "+respuesta[i]['id']+"' style='text-align: center;''><h4>Descripción</h4></div>";
				datosimagenes += "<input class='form-control "+respuesta[i]['id']+"' type='text' id='descripcion' value='"+respuesta[i]['descripcion']+"' required></input>";
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

function editaresquema(){
	var id = $(".d-block").attr('id');
	var nombre = $(".d-block").children("#nombre").val();
	var descripcion = $(".d-block").children("#descripcion").val();
	$.ajax({
      url: '../phpadmin/c-esquemas.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'editaresquema', id: id, nombre: nombre, descripcion: descripcion},
      success: function(respuesta){
        alert(respuesta);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }

  	});
}

function borraresquema(){
	var id = $(".d-block").attr('id');
	var nombre = $(".d-block").children("#nombre").val();
	$.ajax({
      url: '../phpadmin/c-esquemas.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'borraresquema', id: id, nombre: nombre},
      success: function(respuesta){
        alert(respuesta);
        mostrarimagenesquema();
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }

  	});
}