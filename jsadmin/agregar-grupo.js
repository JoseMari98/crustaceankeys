function iniciar(){
    grupos_creados();
 };

 function grupos_creados(){
    var tipogrupo = "'"+$('input[name="tipo"]:checked').val()+"'";
	$.ajax({
      url: '../phpadmin/c-caracteristicas.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'gruposcreados', tipogrupo: tipogrupo},
      success: function(respuesta){
        var  cadena = "";
        cadena += "<option selected='selected'>Seleccione un grupo padre</option>";
        cadena += "<option>Ninguno</option>";
		if(respuesta[0] != null){
			for (var i = 0; i < respuesta.length; i++){      
				cadena += "<option>"+respuesta[i][0] +"</option>";
			};
			$("#grupospadres").html(cadena);
		}else{
			$("#grupospadres").html(cadena);
		}
        

      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }

  	});
};
 
 function insertar_grupo(){
    var grupopadre = "'"+$("#grupospadres option:selected").text()+"'";
    var tipogrupo = "'"+$('input[name="tipo"]:checked').val()+"'";
    if(grupopadre != "'Seleccione un grupo padre'"){
        if(espaciosinifin($("#name").val())!= ""){
            var fecha = "'"+espaciosinifin($("#fecha").val())+"'";
            var name = "'"+espaciosinifin($("#name").val())+"'";
            var data = {tipo: 'agregargrupo', name: name, grupopadre: grupopadre, tipogrupo: tipogrupo, fecha: fecha}
            $.ajax({
            url: '../phpadmin/c-caracteristicas.php',
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function(respuesta){
                if(respuesta == "Se ha insertado el grupo."){
                    $("#name").val("");
                    $("#fecha").val("");
                    grupos_creados();
                }
                alert(respuesta);
                
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                            alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                        }

            });
        }else{
            alert("Debe especificar el nombre del grupo para poder insertarlo.");
        };
    } else{
        alert("Debe especificar un grupo padre, si no tiene, elija: Ninguno");
    }  
};

    //Elimina los espacios en blanco de principio y final de la cadena de texto
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
 