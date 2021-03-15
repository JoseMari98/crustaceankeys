function iniciar(){
	claves_creadas();
};

var id = null;

function claves_creadas(){
	var tipogrupo = "'"+$('input[name="tipo"]:checked').val()+"'";
	$.ajax({
      url: '../phpadmin/c-claves.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'clavescreadas', tipogrupo: tipogrupo},
      success: function(respuesta){
        var  cadena = "";
		cadena += "<option selected='selected'>Seleccione un grupo de identificación</option>"
		if(respuesta[0] != null){
			for (var i = 0; i < respuesta.length; i++){      
				cadena += "<option>"+respuesta[i][0] +"</option>";
			};
			$("#clavescreadas").html(cadena);
		}else{
			$("#clavescreadas").html(cadena);
		}

      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }

  	});
};

function mostrarimagenes(){
	var tipogrupo = "'"+$('input[name="tipo"]:checked').val()+"'";
	var clavecreada = "'"+$("#clavescreadas option:selected").text()+"'";	
	if(clavecreada != "'Seleccione un grupo de identificación'"){
	    $.ajax({
	      url: '../phpadmin/c-claves.php',
		  type: 'POST',
		  async: false,
	      dataType: 'json',
	      // header:{'Content-Type':'image/jpg','X-Requested-With':'XMLHttpRequest'},
	      data: {tipo: 'mostrarimagenes', clavecreada: clavecreada, tipogrupo: tipogrupo},
	      success: function(respuesta){
	        var cadena = "";
	        var datosimagenes = "";
	        if(respuesta != null){
		        for(var i = 0; i < respuesta.length; i++){
		        cadena+="<a style='margin: 10px' onClick='seleccionarimagen("+respuesta[i]['id']+")'><img id='"+respuesta[i]['id']+"' src='data:"+respuesta[i]['tipo']+";base64,"+respuesta[i]['imagen']+"' height='200' width='200'/>";
		    	datosimagenes += "<div class='imagenes "+respuesta[i]['id']+" d-none' id='"+respuesta[i]['id']+"'>";
		    	datosimagenes += "<div class='titulo-panel-control "+respuesta[i]['id']+"' style='text-align: center;''><h4>Descripción de la clave</h4></div>";
		    	datosimagenes += "<input class='form-control "+respuesta[i]['id']+"' type='text' id='descripcion' value='"+respuesta[i]['descripcion']+"' required></input>";
		    	datosimagenes += "<br>";
				datosimagenes += "</div>";
				$("#descripcion").val(respuesta[i]['descripcion']);
				id = respuesta[i]['id'];
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

function editarclave(){
	var descripcion = "'"+espaciosinifin($("#descripcion").val())+"'";
	$.ajax({
      url: '../phpadmin/c-claves.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'editarclave', id: id, descripcion: descripcion},
      success: function(respuesta){
		claves_creadas();
		$("#descripcion").val("");
        alert(respuesta);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }

  	});
}

function borrarclave(){
	$.ajax({
      url: '../phpadmin/c-claves.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'borrarclave', id: id},
      success: function(respuesta){
        alert(respuesta);
		mostrarimagenes();
		$("#descripcion").val("");
		claves_creadas();
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }

  	});
}

function espaciosinifin(texto){
	var string = texto;
	var caracter;
	caracter = string.substr(0,1);
	while(caracter == " "){
	  string = string.substr(1,string.length);
	  caracter = string.substr(0,1);
	}
  
	caracter = string.substr(string.length-1,1);
	while(caracter == " "){
	  string = string.substr(0,string.length-1);
	  caracter = string.substr(string.length-1,1);
	}
  
	return string;
  };