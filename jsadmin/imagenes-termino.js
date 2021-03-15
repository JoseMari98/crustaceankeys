function iniciar(){
	terminos_creados();
	
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

function insertarimagen(){
	var formData = new FormData($("#imagenes")[0]);
	var terminocreado = "'"+$("#terminoscreados option:selected").text()+"'";
	if(terminocreado != "'Seleccione un término del Glosario'"){
	    var termino = terminocreado
	
		formData.append("nombre", $("#nombre").val());
		formData.append("termino", terminocreado);
		formData.append("tipo", "añadirimagen");
		
		$.ajax({
			url: "../phpadmin/c-terminos.php",
			type: "POST",
			data: formData,
			contentType: false,
			processData: false,
			success: function(respuesta){
				if(respuesta.indexOf("se ha insertado") > -1){
					$("#file").replaceWith($("#file").val('').clone(true));
					$("#vista-previa").html("");
					$("#nombre").val("");
					
				}
	        	$("#respuesta").html(respuesta);
	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) { 
	                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	                }
		});
	}else{
		alert('Selecione un término para poder insertar la imagen');
	}
}

