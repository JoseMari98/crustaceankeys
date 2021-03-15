function iniciar(){
	var editordefinicion = $("#definicion").Editor({'togglescreen':false, 'source':false, 'insert_img':false});	
	terminos_creados();
}
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

function rellenar_datos_termino(){
	var terminoseleccionado = $("#terminoscreados option:selected").text();
	if(terminoseleccionado == "Seleccione un término del Glosario"){
		$("#name").val("");
        $('#definicion').Editor("setText", "");
	}else{
		$.ajax({
	      url: '../phpadmin/c-terminos.php',
	      type: 'POST',
	      dataType: 'json',
	      data: {tipo: 'rellenardatostermino', terminoseleccionado: terminoseleccionado},
	      success: function(respuesta){
	        var  cadena = "";
	        $("#name").val(respuesta[0][0]);
	        $('#definicion').Editor("setText", respuesta[0][1]); 

	        // if (fatherobtenido == null){
	        // 	fatherobtenido = "NoTiene";
	        // }


	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) { 
	                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	                }

	  	});
	};
};

function cambiarclass(){
  $("#fatherclassbox").html("");
  	var tipotaxon = $("#taxonesbox option:selected").text();
  	var taxon = $("#taxonescreados option:selected").text();
	var taxoncreado = taxon.substring(0,taxon.indexOf(" "));
  	$.ajax({
      url: '../phpadmin/c-taxones.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'cambiarclass', taxon: tipotaxon, taxoncreado: taxoncreado},
      success: function(respuesta){
        var  cadena = "";
        cadena += "<option>Seleccione un taxón padre</option>";
        for (var i = 0; i < respuesta.length; i++){
          
            cadena += "<option>"+ respuesta[i][1].toString() +" "+ respuesta[i][0].toString() +"</option>";

        };
        $("#fatherclassbox").html(cadena);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
};

$(document).ready(function(){$('#taxonesbox').change(function () {
    $('#cambiarclassModal').modal('show');
	});
});

function editartermino(){
	var terminocreado = "'"+$("#terminoscreados option:selected").text()+"'";
	if(terminocreado != "'Seleccione un término del Glosario'"){
		if(espaciosinifin($("#name").val())!= ""){
		    var termino = terminocreado
		      
		    
			var name = "'"+espaciosinifin($("#name").val())+"'";
		    
		    var definicion = "'"+$('#definicion').Editor("getText")+"'"; // Forma especial para obtener texto del cuadro de texto del pluging EDITOR


		    var data = {tipo: 'editartermino', terminocreado: terminocreado, name: name, definicion: definicion}
		    $.ajax({
		      url: '../phpadmin/c-terminos.php',
		      type: 'POST',
		      dataType: 'json',
		      data: data,
		      success: function(respuesta){
		      	if(respuesta == "El término $terminocreado se ha editado correctamente."){
			        $("#name").val("");
			        $('#definicion').Editor("setText", ""); 
			        terminos_creados();
		        }
		        alert(respuesta);

		        
		      },
		      error: function(XMLHttpRequest, textStatus, errorThrown) { 
		                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
		                }

		    });
		}else{
		    alert("Debe especificar el nombre del termino para poder insertarlo.");
		};
	}else{
	    alert("Seleccione el término que quiera editar.");
	}
}

function eliminartermino(){
	var terminocreado = "'"+$("#terminoscreados option:selected").text()+"'";
	if(terminocreado != "'Seleccione un término del Glosario'"){
	    var termino = terminocreado;
	    $.ajax({
		      url: '../phpadmin/c-terminos.php',
		      type: 'POST',
		      dataType: 'json',
		      data: {tipo: 'eliminartermino', terminocreado: terminocreado},
		      success: function(respuesta){
		      	if(respuesta == "El término se ha eliminado correctamente del Glosario."){
			        $("#name").val("");
			        $('#definicion').Editor("setText", "");
			        terminos_creados();
		        }
		        alert(respuesta);
		      },
		      error: function(XMLHttpRequest, textStatus, errorThrown) { 
		                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
		                }
		    });
	}else{
	    alert("Seleccione el término que quiera editar.");
	}
}


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

