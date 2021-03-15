function iniciar(){
	taxones_creados();
	
};

$(document).ready(function(){$("#file").change(function () {
// $("#file").on("change", function(){
	$("#vista-previa").html("");
	var archivos= document.getElementById("file").files;
	var navegador = window.URL || window.webkitURL;
	for(i=0; i<archivos.length; i++){
		var size= archivos[i].size;
		var type =  archivos[i].type;
		if(size > 1000*1000){
			$("#vista-previa").append("<p style='color: red'> El archivo introducido supera el maximo permitido 1 MB.</p>");
		}else if(type != "image/jpeg" && type != "image/png" && type != "image/jpg" && type != "image/gif"){
			$("#vista-previa").append("<p style='color: red'> El archivo introducido no es formato de imagen permitido.</p>");
		}else{
			var objeto_url = navegador.createObjectURL(archivos[i]);
			$("#vista-previa").append("<img src="+objeto_url+" width='250' heigth='250'>");
		}
	}
	});
});

function taxones_creados(){

	$.ajax({
      url: '../phpadmin/c-distribucion.php',
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

function insertardistribucion(){
	var formData = new FormData($("#imagenes")[0]);
	var taxoncreado = "'"+$("#taxonescreados option:selected").text()+"'";
	if(taxoncreado != "'Seleccione un taxón'"){
	    var taxon = taxoncreado.substring(0, taxoncreado.indexOf("-")) + "'";
	    taxoncreado = taxon;
	
		formData.append("taxon", taxoncreado);
		formData.append("tipo", "insertar_distribucion");
		
		$.ajax({
			url: "../phpadmin/c-distribucion.php",
			type: "POST",
			data: formData,
			contentType: false,
			processData: false,
			success: function(respuesta){
				if(respuesta.indexOf("se ha insertado") > -1){
					$("#file").replaceWith($("#file").val('').clone(true));
					$("#vista-previa").html("");
					
				}
	        	$("#respuesta").html(respuesta);
	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) { 
	                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	                }
		});
	}else{
		alert('Selecione un taxón para poder insertar la distribución');
	}
}

