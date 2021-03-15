
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


function insertarimagen(){
	var formData = new FormData($("#imagenes")[0]);
	
	if(espaciosinifin($("#name").val())!= ""){
	    var name = "'"+espaciosinifin($("#name").val())+"'";
	
		formData.append("nombre", name);
		formData.append("descripcion", $("#descripcion").val());
		formData.append("tipo", "añadiresquema");
		
		$.ajax({
			url: "../phpadmin/c-esquemas.php",
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
		alert('Introduzca un nombre para introducir el Esquema General');
	}
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