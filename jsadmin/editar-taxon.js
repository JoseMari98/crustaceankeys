function iniciar(){
	var editordescription = $("#description").Editor({'togglescreen':false, 'source':false, 'insert_img':false});
	var editorsynonyms = $("#synonyms").Editor({'togglescreen':false, 'source':false, 'insert_img':false});
    var editorbiology = $("#biology").Editor({'togglescreen':false, 'source':false, 'insert_img':false});
	taxones_creados();
}
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
            cadena += "<option>"+ respuesta[i][0].toString() + "-"+ respuesta[i][1].toString() +"</option>";
        };
        $("#taxonescreados").html(cadena);

      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }

  	});
};

function rellenar_datos_taxon(){
	var taxonseleccionado = $("#taxonescreados option:selected").text();
	if(taxonseleccionado == "Seleccione un taxón"){
		$("#name").val("");
		$("#autor").val("");
        $('#description').Editor("setText", ""); 
        $('#synonyms').Editor("setText", "");
        $('#biology').Editor("setText", "");
        $("#taxonesbox").html("");
        $("#fatherclassbox").html("");
	}else{
	    /*var clasen = taxonseleccionado.substring(taxonseleccionado.indexOf(" ")+1,taxonseleccionado.length);
		taxonseleccionado = clasen;*/
		var clasen = taxonseleccionado.slice(0, taxonseleccionado.indexOf("-"));
		taxonseleccionado = clasen;
		console.log(taxonseleccionado);
		console.log(clasen);
		$.ajax({
	      url: '../phpadmin/c-taxones.php',
	      type: 'POST',
	      dataType: 'json',
	      data: {tipo: 'rellenardatostaxon', taxonseleccionado: taxonseleccionado},
	      success: function(respuesta){
			var  cadena = "";
			console.log(respuesta);
	        $("#name").val(respuesta[0][0]);
			$("#autor").val(respuesta[0][6]);
	        $('#description').Editor("setText", respuesta[0][2]); 
	        $('#synonyms').Editor("setText", respuesta[0][4]);
	        $('#biology').Editor("setText", respuesta[0][5]);
	        var clasificacionobtenida = respuesta[0][1];
	        var fatherobtenido = respuesta[0][3];

	        // if (fatherobtenido == null){
	        // 	fatherobtenido = "NoTiene";
	        // }

	        $.ajax({
		      url: '../phpadmin/c-taxones.php',
		      type: 'POST',
		      dataType: 'json',
		      data: {tipo: 'taxonesbox'},
		      success: function(respuestaxon){
		        for (var i = 0; i < respuestaxon.length; i++){
		        	if(respuestaxon[i]["class"]!=clasificacionobtenida){

		        		cadena += "<option>"+ respuestaxon[i]["class"] +"</option>";      
		        	}else{
		        		cadena += "<option selected='selected'>"+ clasificacionobtenida +"</option>";
		        	}
		        };

		        $("#taxonesbox").html(cadena);
		        	
		      },
		      error: function(XMLHttpRequest, textStatus, errorThrown) { 
		                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
		                }

		  	});

		  	$.ajax({
		      url: '../phpadmin/c-taxones.php',
		      type: 'POST',
		      dataType: 'json',
		      data: {tipo: 'fatherclassbox', taxon : clasificacionobtenida},
		      success: function(respuestafather){
		      	var cadena = "";
		      	cadena += "<option>Seleccione un taxón padre</option>";
		      	if(respuestafather[0]!= null){
		        	for (var i = 0; i < respuestafather.length; i++){
		          		if(respuestafather[i][0]!=fatherobtenido){
		            		cadena += "<option>"+ respuestafather[i][0].toString() +"-"+ respuestafather[i][1].toString() +"</option>";
		            	}else{
		    				cadena += "<option selected='selected'>"+ respuestafather[i][0].toString() +"-"+ respuestafather[i][1].toString() +"</option>";
		    			}
		        	};
		    	};
		        $("#fatherclassbox").html(cadena);
		      },
		      error: function(XMLHttpRequest, textStatus, errorThrown) { 
		                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
		                }
		    });

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
	var taxoncreado = taxon.substring(taxon.indexOf("-") + 1,taxon.length);
  	$.ajax({
      url: '../phpadmin/c-taxones.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'cambiarclass', taxon: tipotaxon, taxoncreado: taxoncreado},
      success: function(respuesta){
        var  cadena = "";
        cadena += "<option>Seleccione un taxón padre</option>";
        for (var i = 0; i < respuesta.length; i++){
          
            cadena += "<option>"+ respuesta[i][0].toString() +"-"+ respuesta[i][1].toString() +"</option>";

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

function editartaxon(){
	var taxoncreado = "'"+$("#taxonescreados option:selected").text()+"'";
	if(taxoncreado != "'Seleccione un taxón'"){
		if(espaciosinifin($("#name").val())!= ""){
		    var taxon = taxoncreado.substring(0 ,taxoncreado.indexOf("-")) + "'";
			 taxoncreado = taxon;		      
		    
			var name = "'"+espaciosinifin($("#name").val())+"'";
			var autor = "'"+espaciosinifin($("#autor").val())+"'";
		    var tipotaxon = "'"+$("#taxonesbox option:selected").text()+"'";
		    
		    var description = "'"+$('#description').Editor("getText")+"'"; // Forma especial para obtener texto del cuadro de texto del pluging EDITOR
		    var fatherclassbox = "'"+$("#fatherclassbox option:selected").text()+"'";
		    if(fatherclassbox == "'Seleccione un taxón padre'"){
		      fatherclassbox = "null";
		    }else{
		      var clasen = fatherclassbox.substring(0, fatherclassbox.indexOf("-")) + "'";
			  fatherclassbox = clasen;
		    }
		    var synonyms = "'"+$("#synonyms").Editor("getText")+"'";
		    var biology = "'"+$("#biology").Editor("getText")+"'";


		    var data = {tipo: 'editartaxon', taxoncreado: taxoncreado, tipotaxon: tipotaxon, name: name, autor: autor, description: description, fatherclassbox: fatherclassbox, synonyms:synonyms, biology:biology}
		    $.ajax({
		      url: '../phpadmin/c-taxones.php',
		      type: 'POST',
		      dataType: 'json',
		      data: data,
		      success: function(respuesta){
		      	if(respuesta == "El taxón se ha editado correctamente."){
			        $("#name").val("");
					$("#autor").val("");
			        $('#description').Editor("setText", ""); 
			        $('#synonyms').Editor("setText", "");
			        $('#biology').Editor("setText", "");
			        $("#taxonesbox").html("");
			        $("#fatherclassbox").html("");
			        taxones_creados();
		        }
		        alert(respuesta);

		        
		      },
		      error: function(XMLHttpRequest, textStatus, errorThrown) { 
		                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
		                }

		    });
		}else{
		    alert("Debe especificar el nombre del taxon para poder insertarlo.");
		};
	}else{
	    alert("Selecciona el taxón que quieras editar.");
	}
}

function eliminartaxon(){
	var taxoncreado = "'"+$("#taxonescreados option:selected").text()+"'";
	if(taxoncreado != "'Seleccione un taxón'"){
	    var taxon = taxoncreado.substring(0, taxoncreado.indexOf("-")) + "'";
	    taxoncreado = taxon;
	    $.ajax({
		      url: '../phpadmin/c-taxones.php',
		      type: 'POST',
		      dataType: 'json',
		      data: {tipo: 'eliminartaxon', taxoncreado: taxoncreado},
		      success: function(respuesta){
		      	if(respuesta == "El taxón se ha eliminado correctamente."){
			        $("#name").val("");
			        $('#description').Editor("setText", ""); 
			        $('#synonyms').Editor("setText", "");
			        $("#taxonesbox").html("");
			        $("#fatherclassbox").html("");
			        taxones_creados();
		        }
		        alert(respuesta);
		      },
		      error: function(XMLHttpRequest, textStatus, errorThrown) { 
		                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
		                }
		    });
	}else{
	    alert("Selecciona el taxón que quieras editar.");
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

