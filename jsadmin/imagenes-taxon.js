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

function insertarimagen(){
	var formData = new FormData($("#imagenes")[0]);
	var taxoncreado = "'"+$("#taxonescreados option:selected").text()+"'";
	if(taxoncreado != "'Seleccione un taxón'"){
	    var taxon = taxoncreado.substring(0, taxoncreado.indexOf("-")) + "'";
	    taxoncreado = taxon;
	
		formData.append("nombre", $("#nombre").val());
		formData.append("taxon", taxoncreado);
		formData.append("tipo", "añadirimagen");
		
		$.ajax({
			url: "../phpadmin/c-taxones.php",
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
		alert('Selecione un taxón para poder insertar la imagen');
	}
}

