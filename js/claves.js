function iniciar(){
	mostrarimagenes();
	
};


function mostrarimagenes(){
	var tipogrupo = "'"+$('input[name="tipo"]:checked').val()+"'";
	    $.ajax({
	      url: 'php/claves-crustacean-keys.php',
	      type: 'POST',
	      dataType: 'json',
	      // header:{'Content-Type':'image/jpg','X-Requested-With':'XMLHttpRequest'},
	      data: {tipo: 'mostrarimagenes', tipogrupo: tipogrupo},
	      success: function(respuesta){
	        var cadena = "";
	        var datosimagenes = "";
	        if(respuesta != null){
		        for(var i = 0; i < respuesta.length; i++){
					if(respuesta[i]['tipogrupo'] == "matricial")
						cadena += "<li><a target='_blank' href='identificar.html?grupo="+respuesta[i]['grupo']+"'><img style='border:3px solid #00577a' id='"+respuesta[i]['id']+"' src='data:"+respuesta[i]['tipo']+";base64,"+respuesta[i]['imagen']+"' height='200' width='200'><div class='box_data'><span><a target='_blank' href='identificar.html?grupo="+respuesta[i]['grupo']+"'>"+ respuesta[i]["descripcion"] +"</a></span><div></li>";
					else
						cadena += "<li><a target='_blank' href='dicotomica.html?grupo="+respuesta[i]['grupo']+"'><img style='border:3px solid #00577a' id='"+respuesta[i]['id']+"' src='data:"+respuesta[i]['tipo']+";base64,"+respuesta[i]['imagen']+"' height='200' width='200'><div class='box_data'><span><a target='_blank' href='dicotomica.html?grupo="+respuesta[i]['grupo']+"'>"+ respuesta[i]["descripcion"] +"</a></span><div></li>";
				}
	    	}
	    	// height='"+respuesta[i]['altura']+"' width='"+respuesta[i]['anchura']
	        $("#galeria").html(cadena);

	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) { 
	                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	                }

	  	});
};

function seleccionarimagen(idimagen){
	// var id =$("#"+idimagen).val();
	$(".imagenes").removeClass("d-block");
	$(".imagenes").addClass("d-none");
	$("."+idimagen).removeClass("d-none");
	$("."+idimagen).addClass("d-block");
}

function editarclave(){
	var id = $(".d-block").attr('id');
	var descripcion = $(".d-block").children("#descripcion").val();
	$.ajax({
      url: '../phpadmin/c-claves.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'editarclave', id: id, descripcion: descripcion},
      success: function(respuesta){
        alert(respuesta);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }

  	});
}

function borrarclave(){
	var id = $(".d-block").attr('id');
	$.ajax({
      url: '../phpadmin/c-claves.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'borrarclave', id: id},
      success: function(respuesta){
        alert(respuesta);
        mostrarimagenes();
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }

  	});
}