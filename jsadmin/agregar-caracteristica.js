function iniciar(){
    //Se inicializa los cuadros de textos enriquecidos del pluging EDITOR
   rellenar_tipos();
   rellenar_categoria();
   rellenar_grupos();
 };
 
 function rellenar_tipos(){
   //Busca las posibles clasificaciones de los taxones y los coloca en una caja de selección
   $.ajax({
       url: '../phpadmin/c-caracteristicas.php',
       type: 'POST',
       dataType: 'json',
       data: {tipo: 'typesbox'},
       success: function(respuesta){
         var  cadena = "<option>Seleccione un tipo de característica</option>";
         for (var i = 0; i < respuesta.length; i++){      
             cadena += " <option>"+ respuesta[i][0].toString() +"</option>";
         };
         $("#typesbox").html(cadena);
       },
       error: function(XMLHttpRequest, textStatus, errorThrown) { 
                     alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                 }
 
   });
 
 };

 function rellenar_categoria(){
    //Busca las posibles clasificaciones de los taxones y los coloca en una caja de selección
    $.ajax({
        url: '../phpadmin/c-taxones.php',
        type: 'POST',
        dataType: 'json',
        data: {tipo: 'taxonesbox'},
        success: function(respuesta){
          var cadena = "<option>Seleccione una categoría taxonómica</option>";
          for (var i = 0; i < respuesta.length; i++){      
              cadena += " <option>"+ respuesta[i][0].toString() +"</option>";
          };
          $("#categoriabox").html(cadena);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
                      alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                  }
    
        });
  
  };

  function rellenar_grupos(){
    var tipogrupo = "'matricial'";
	$.ajax({
      url: '../phpadmin/c-caracteristicas.php',
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
 
 function insertar_caracteristica(){
   if(espaciosinifin($("#name").val())!= ""){
       if($("#typesbox option:selected").text() != "Seleccione un tipo de característica"){
           if(espaciosinifin($("#value").val()) != ""){
                if($("#gruposcreados option:selected").text() != "Seleccione un grupo de identificación"){
                    if($("#categoriabox option:selected").text() != "Seleccione una categoría taxonómica"){
                        var name = "'"+espaciosinifin($("#name").val())+"'";
                        var tipocaracteristica = "'"+$("#typesbox option:selected").text()+"'";
                        var valor = "'"+espaciosinifin($("#value").val())+"'";
                        var grupo = "'"+espaciosinifin($("#gruposcreados").val())+"'";
                        var categoria = "'"+$("#categoriabox option:selected").text()+"'";
                        var data = {tipo: 'agregarcaracteristica', name: name, tipocaracteristica: tipocaracteristica, valor: valor, grupo: grupo, categoria:categoria}
                        $.ajax({
                        url: '../phpadmin/c-caracteristicas.php',
                        type: 'POST',
                        dataType: 'json',
                        data: data,
                        success: function(respuesta){
                            if(respuesta == "Se ha insertado la caracteristica."){
                                $("#name").val("");
                                $("#value").val("");
                                $("#typesbox").html("");
                                $("#categoriabox").html("");
                                $("#gruposcreados").val("");
                                rellenar_tipos();
                                rellenar_categoria();
                                rellenar_grupos();
                            }
                            alert(respuesta);
                            
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) { 
                                        alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                                    }

                        });
                    }else{
                        alert("Debe especificar la categoría taxonómica.");
                    }
                }else{
                    alert("Debe especificar el grupo de identificación.");
                }
            }else{
                alert("Debe especificar el valor de la característica para poder insertarla.");
        }
        }else{
            alert("Debe especificar el tipo de la característica para poder insertarla.");
        }
    }else{
        alert("Debe especificar el nombre de la característica para poder insertarla.");
    };
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
 