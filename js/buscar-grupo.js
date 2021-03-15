function iniciar(){
	grupos_creados();
}

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

function buscargrupo(){
	var tipogrupo = "'"+$('input[name="tipo"]:checked').val()+"'";
	if($("#gruposcreados").val() != "Seleccione un grupo de identificación"){
		if(tipogrupo == "'matricial'")
			location.href = "identificar.html?grupo=" + $("#gruposcreados").val();
		else
			location.href = "dicotomica.html?grupo=" + $("#gruposcreados").val();
	} else
		alert("Elija una opción válida");
}