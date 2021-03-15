function iniciar(){
	grupos_creados();
	
};

$(document).ready(function(){$("#file").change(function () {
// $("#file").on("change", function(){
	$("#vista-previa").html("");
	var archivos= document.getElementById("file").files;
	var navegador = window.URL || window.webkitURL;
	for(i=0; i<archivos.length; i++){
		var size= archivos[i].size;
		var type =  archivos[i].type;
		var name = archivos[i].name;
		if(size > 1000*1000){
			$("#vista-previa").append("<p style='color: red'> El archivo "+name+" supera el maximo permitido 1 MB.</p>");
		}else if(type != "image/jpeg" && type != "image/png" && type != "image/jpg" && type != "image/gif"){
			$("#vista-previa").append("<p style='color: red'> El archivo "+name+" no es del tipo de imagen permitido.</p>");
		}else{
			var objeto_url = navegador.createObjectURL(archivos[i]);
			$("#vista-previa").append("<img src="+objeto_url+" width='250' heigth='250'>");
		}
	}
	});
});

function grupos_creados(){
	var tipogrupo = "'"+$('input[name="tipo"]:checked').val()+"'";
	$.ajax({
      url: '../php/identificar.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'gruposcreados', tipogrupo: tipogrupo},
      success: function(respuesta){
        var  cadena = "";
		cadena += "<option selected='selected'>Seleccione un grupo de identificación</option>"
		if(respuesta[0] != null){
			for (var i = 0; i < respuesta.length; i++){      
				cadena += "<option>"+respuesta[i][0] +"</option>";
			};
			$("#gruposcreados").html(cadena);
		}else{
			$("#gruposcreados").html(cadena);
		}
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }

  	});
};

/*function grupos_creados(){

	$.ajax({
      url: '../phpadmin/c-claves.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'taxonescreados'},
      success: function(respuesta){
        var  cadena = "";
        cadena += "<option selected='selected'>Seleccione un taxón</option>"
        for (var i = 0; i < respuesta.length; i++){      
            cadena += "<option>"+ respuesta[i][1].toString() +" "+ respuesta[i][0].toString() +"</option>";
        };
        $("#taxonescreados").html(cadena);

      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }

  	});
};*/

function insertarclave(){
	var tipogrupo = "'"+$('input[name="tipo"]:checked').val()+"'";
	var formData = new FormData($("#imagenes")[0]);
	var grupo = "'"+$("#gruposcreados option:selected").text()+"'";
	if(grupo != "'Seleccione un grupo de identificación'"){
	
		formData.append("descripcion", $("#descripcion").val());
		formData.append("grupo", grupo);
		formData.append("tipogrupo", tipogrupo);
		formData.append("tipo", "añadirclave");
		
		$.ajax({
			url: "../phpadmin/c-claves.php",
			type: "POST",
			data: formData,
			contentType: false,
			processData: false,
			success: function(respuesta){
				if(respuesta.indexOf("Se ha insertado la clave.") > -1){
					$("#file").replaceWith($("#file").val('').clone(true));
					$("#vista-previa").html("");
					$("#descripcion").val("");
					grupos_creados();
				}
	        	alert(respuesta);
	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) { 
	                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	                }
		});
	}else{
		alert('Selecione un grupo para poder asociar la clave');
	}
}

