function iniciar(){
	literaturas_creadas();
	taxones_creados();
	taxones_con_vinculacion()
};

function insertar_literatura(){
  if(espaciosinifin($("#a-literatura").val())!= ""){
    var literatura = espaciosinifin($("#a-literatura").val());   
    $.ajax({
      url: '../phpadmin/c-taxones.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'agregarliteratura', literatura: literatura},
      success: function(respuesta){
        if(respuesta == "Se ha insertado la literatura."){
              $("#a-literatura").val("");
              literaturas_creadas();
        }
        alert(respuesta);
        
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }

    });
  }else{
    alert("Debe especificar los datos de la literatura para poder insertarlo.");
  };

};
function literaturas_creadas(){

	$.ajax({
      url: '../phpadmin/c-taxones.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'literaturascreadas'},
      success: function(respuesta){
        var  cadena = "";
        cadena += "<option selected='selected'>Seleccione una literatura</option>";
        for (var i = 0; i < respuesta.length; i++){      
            cadena += "<option>"+ respuesta[i][0].toString()+"</option>";
        };
        $("#literaturascreadas").html(cadena);

      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }

  	});
};

function rellenar_datos_literatura(){
	var literaturaseleccionada = $("#literaturascreadas option:selected").text();
	if(literaturaseleccionada != "Seleccione una literatura"){
		$.ajax({
	      url: '../phpadmin/c-taxones.php',
	      type: 'POST',
	      dataType: 'json',
	      data: {tipo: 'rellenardatosliteratura', literaturaseleccionada: literaturaseleccionada},
	      success: function(respuesta){
	        var  cadena = "";
	        $("#e-literatura").val(respuesta[0][0]);
	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) { 
	                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	                }
		});
	}else{
		$("#e-literatura").val("");
	}
};

function editar_literatura(){
	var literaturaseleccionada = $("#literaturascreadas option:selected").text();
	if(literaturaseleccionada != "Seleccione una literatura"){
		if(espaciosinifin($("#e-literatura").val())!= ""){
			var literatura = espaciosinifin($("#e-literatura").val());
		    
		    $.ajax({
		      url: '../phpadmin/c-taxones.php',
		      type: 'POST',
		      dataType: 'json',
		      data: {tipo: 'editarliteratura', literaturaseleccionada: literaturaseleccionada, literatura: literatura},
		      success: function(respuesta){
		      	if(respuesta == "La literatura se ha editado correctamente."){
			        $("#e-literatura").val("");
			        literaturas_creadas();
		        }
		        alert(respuesta);

		        
		      },
		      error: function(XMLHttpRequest, textStatus, errorThrown) { 
		                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
		                }

		    });
		}else{
		    alert("Debe especificar la literatura para poder insertarlo.");
		};
	}else{
	    alert("Selecciona la literatura que quieras editar.");
	}
};

function eliminar_literatura(){
	var literaturaseleccionada = $("#literaturascreadas option:selected").text();
	if(literaturaseleccionada != "'Seleccione una literatura'"){
	    $.ajax({
		      url: '../phpadmin/c-taxones.php',
		      type: 'POST',
		      dataType: 'json',
		      data: {tipo: 'eliminarliteratura', literaturaseleccionada: literaturaseleccionada},
		      success: function(respuesta){
		      	if(respuesta == "La literatura se ha eliminado correctamente."){
			        $("#e-literatura").val("");
			        literaturas_creadas();
		        }
		        alert(respuesta);
		      },
		      error: function(XMLHttpRequest, textStatus, errorThrown) { 
		                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
		                }
		    });
	}else{
	    alert("Selecciona la literatura que quieras editar.");
	}
};	

function taxones_creados(){

	$.ajax({
      url: '../phpadmin/c-taxones.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'taxonescreados'},
      success: function(respuesta){
        var  cadena = "";
        cadena += "<option selected='selected'>Seleccione un taxón</option>";
        if(respuesta != null){
	        for (var i = 0; i < respuesta.length; i++){      
	            cadena += "<option>"+ respuesta[i][0].toString() +"-"+ respuesta[i][1].toString() +"</option>";
	        };
    	}
        $("#taxonescreados").html(cadena);

      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }

  	});
};	

function rellenar_literatura_posible(){
	var taxoncreado =$("#taxonescreados option:selected").text();	
	if(taxoncreado != "Seleccione un taxón"){
		var taxon = taxoncreado.substring(0, taxoncreado.indexOf("-"));
		taxoncreado = taxon;
	    $.ajax({
	      url: '../phpadmin/c-taxones.php',
	      type: 'POST',
	      dataType: 'json',
	      data: {tipo: 'mostrarliteraturasposibles', taxoncreado: taxoncreado},
	      success: function(respuesta){
	        var cadena = "";
	        if(respuesta != null){
		        for(var i = 0; i < respuesta.length; i++){
		        	cadena += "<option>"+ respuesta[i]['datos'].toString() +"</option>";
		        }
	    	}
	        $("#literaturasnovinculada").html(cadena);

	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) { 
	                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	                }

	  	});
	}else{
		$("#literaturasnovinculada").html("");
	}
}

function vincular(){
	var taxoncreado =$("#taxonescreados option:selected").text();	
	if(taxoncreado != "Seleccione un taxón"){
		var taxon = taxoncreado.substring(0, taxoncreado.indexOf("-"));
	    taxoncreado = taxon;
		var literaturasnovinculada =$("#literaturasnovinculada option:selected").text();
		if(literaturasnovinculada != ""){
			$.ajax({
		      url: '../phpadmin/c-taxones.php',
		      type: 'POST',
		      dataType: 'json',
		      data: {tipo: 'vincular', literatura: literaturasnovinculada, taxon: taxoncreado},
		      success: function(respuesta){
		        if(respuesta == "La vinculación se ha completado con éxito."){
		              rellenar_literatura_posible();
		              taxones_con_vinculacion();
		              $("#literaturavinculada").html("");
		        }
		        alert(respuesta);
		        
		      },
		      error: function(XMLHttpRequest, textStatus, errorThrown) { 
		                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
		                }

		    });
		}else{
			alert("Todas las literaturas estan vinculadas a este taxón.");
		}
	}else{
		alert("Seleccione un taxón antes de vincular.");
	}	
}

function taxones_con_vinculacion(){
	$.ajax({
      url: '../phpadmin/c-taxones.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'taxonvinculado'},
      success: function(respuesta){
        var  cadena = "";
        cadena += "<option selected='selected'>Seleccione un taxón</option>";
        if(respuesta != null){
        	for (var i = 0; i < respuesta.length; i++){      
            	cadena += "<option>"+ respuesta[i]['name'].toString() +"-"+ respuesta[i]['classification'].toString() +"</option>";
        	};
        };
        $("#taxonvinculado").html(cadena);

      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }

  	});
}

function rellenar_literatura_vinculada(){
	var taxonvinculado =$("#taxonvinculado option:selected").text();	
	if(taxonvinculado != "Seleccione un taxón"){
		var taxon = taxonvinculado.substring(0, taxonvinculado.indexOf("-"));
	    taxonvinculado = taxon;
	    $.ajax({
	      url: '../phpadmin/c-taxones.php',
	      type: 'POST',
	      dataType: 'json',
	      data: {tipo: 'mostrarliteraturasvinculadas', taxonvinculado: taxonvinculado},
	      success: function(respuesta){
	        var cadena = "";
	        if(respuesta != null){
		        for(var i = 0; i < respuesta.length; i++){
		        	cadena += "<div>";
		        	cadena += "		<a href='javascript:;' data-toggle='modal' data-target='#"+respuesta[i]['id']+"' role='button'>"+respuesta[i]['datos']+"</a>";
		        	cadena += "</div>";
		        	cadena += "<div id='"+respuesta[i]['id']+"' class='modal fade' role='dialog'>";
	  				cadena += "		<div class='modal-dialog'>";
	  				cadena += "			<div class='modal-content'>";
	      			cadena += "				<div class=modal-header>";
	        		cadena += "					<button type='button' class='close' data-dismiss='modal'>&times;</button>";
	        		cadena += "					<h4 class='modal-title'></h4></div>";
	      			cadena += "				<div class='modal-body'>";
	        		cadena += "					<p>¿Estas seguro que desea desvincular esta literatura?</p></div>";
	      			cadena += "				<div class='modal-footer'>"
	      			cadena += "					<a class='btn btn-primary' href='javascript:;' onclick='desvincular(\""+respuesta[i]['id']+"\");' role='button' data-dismiss='modal'>Si</a>";
	      			cadena += "					<a  class='btn btn-primary' href='javascript:;' role='button' data-dismiss='modal'>No</a></div>";
	    			cadena += "			</div>";
	  				cadena += "		</div>";
					cadena += "</div>";
		        }
	    	}
	        $("#literaturavinculada").html(cadena);

	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) { 
	                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	                }
	  	});
	}
}

function desvincular(id){
	var taxonvinculado =$("#taxonvinculado option:selected").text();
	var taxon = taxonvinculado.substring(0, taxonvinculado.indexOf("-"));
	taxonvinculado = taxon;
	$.ajax({
      url: '../phpadmin/c-taxones.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'desvincular', id: id, taxonvinculado: taxonvinculado},
      success: function(respuesta){
      	if(respuesta == "La literatura ha sido desvinculada con exito."){
      		$('.modal').modal({
		        keyboard: true,
		        show: false
		    });
		    $('.modal-backdrop').remove();
		    // $('.modal').modal('dispose');

      		taxones_con_vinculacion();
	        $("#literaturavinculada").html("");
        }
        alert(respuesta);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
    });
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
