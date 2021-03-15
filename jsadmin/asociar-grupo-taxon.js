function iniciar(){
    //Se inicializa los cuadros de textos enriquecidos del pluging EDITOR
    grupos_creados();
   taxones_creados();
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
		cadena += "<option selected='selected'>Seleccione un grupo de identificación</option>"
		if(respuesta[0] != null){
			for (var i = 0; i < respuesta.length; i++){      
				cadena += "<option>"+respuesta[i][0] +"</option>";
			};
			$("#grupobox").html(cadena);
		}else{
			$("#grupobox").html(cadena);
		}
        

      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }

  	});
};

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
            cadena += "<option>"+ respuesta[i][0].toString() + " (" + respuesta[i][1].toString() + ")" + "</option>";
        };
        $("#taxonescreados").html(cadena);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }

  	});
};

function asociar_taxon(){
    var tipogrupo = "'"+$('input[name="tipo"]:checked').val()+"'";
    if($("#taxonescreados option:selected").text() != "Seleccione un taxón"){
        if($("#grupobox option:selected").text() != "Seleccione un grupo de identificación"){
            var grupo = "'"+$("#grupobox option:selected").text()+"'";
            var taxon = "'"+$("#taxonescreados option:selected").text()+"'";
            var solotaxon = taxon.substring(taxon.indexOf(0), taxon.indexOf("(") - 1) + "'";
            taxon = solotaxon;
            
            var data = {tipo: 'asociargrupo', grupo: grupo, taxon: taxon, tipogrupo: tipogrupo}
            $.ajax({
            url: '../phpadmin/c-taxones.php',
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function(respuesta){
                alert(respuesta);
                taxones_creados();
                
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                            alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                        }
            });
        }else{
            alert("Debe especificar el grupo para poder asociarlo.");
    }
    }else{
        alert("Debe especificar el taxón para poder asociarlo.");
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