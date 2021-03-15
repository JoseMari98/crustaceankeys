var slideIndex = 1;
function iniciar(){
	mostrarDescription();
	mostrartaxon();
}
//recoger datos por url
function getGET()
{
    // capturamos la url
    var loc = document.location.href;
    // si existe el interrogante
    if(loc.indexOf('?')>0)
    {
        // cogemos la parte de la url que hay despues del interrogante
        var getString = loc.split('?')[1];
        // obtenemos un array con cada clave=valor
        var GET = getString.split('&');
        var get = {};
        // recorremos todo el array de valores
        for(var i = 0, l = GET.length; i < l; i++){
            var tmp = GET[i].split('=');
            get[tmp[0]] = unescape(decodeURI(tmp[1]));
        }
        return get;
    }
}
function mostrartaxon(){
    // Cogemos los valores pasados por get
    var valores=getGET();
    if(valores)
    {
        //recogemos los valores que nos envia la URL en variables para trabajar con ellas
        var taxon = valores['taxon'];

        $.ajax({
	      url: 'php/crustacean-keys.php',
	      type: 'POST',
	      dataType: 'json',
	      data: {tipo: 'mostrartaxon', taxon: taxon},
	      success: function(respuesta){
	        var  galeria = "";
	        var  minigaleria = "";
	        var contador=1;
	        if(respuesta != null){
		        for(var i = 0; i < respuesta.length; i++){
		        	
		        	galeria += "<div class='mySlides'>";
		        	galeria += "<div class='numbertext'>"+(i+1)+" / "+respuesta.length+"</div>";
		        	galeria += "<img id='"+(i+1)+"' onclick='ponergrande("+(i+1)+")' src='data:"+respuesta[i]['tipo']+";base64,"+respuesta[i]['imagen']+"' style='width:100%;'>";
					galeria += "</div>";
					if(contador % 6 === 0 && contador != 0){
						minigaleria += "<div class='column'>";
		        		minigaleria += "<img class='demo cursor' src='data:"+respuesta[i]['tipo']+";base64,"+respuesta[i]['imagen']+"' style='width:100%;' onclick='currentSlide("+(i+1)+")' alt='"+respuesta[i]['nombre']+"'>";
		        		minigaleria += "</div>";
		        		minigaleria += "<div style='clear: both;'></div>"
					}else{
						minigaleria += "<div class='column'>";
		        		minigaleria += "<img class='demo cursor' src='data:"+respuesta[i]['tipo']+";base64,"+respuesta[i]['imagen']+"' style='width:100%;' onclick='currentSlide("+(i+1)+")' alt='"+respuesta[i]['nombre']+"'>";
		        		minigaleria += "</div>";
					}
		        	
		        	contador++;
	    		}
	    		galeria+= "<center><a class='prev' onclick='plusSlides(-1)'>&#10094;</a>";
				galeria+= "<a class='next' onclick='plusSlides(1)''>&#10095;</a></center>";
				$("#galeria").html(galeria);
				$("#minigaleria").html(minigaleria);	
				showSlides(1);	
	    	}else{
	    		var captionText = document.getElementById("caption");
	    		captionText.innerHTML = "No hay imágenes disponibles en este taxón.";
	    	}
	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) { 
	                    // alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	                }
	  	});     
    }else{
        // no se ha recibido ningun parametro por GET
           location.href ="index.html";

    }
}

function mostrarDescription(){
		mostrartaxon();
	$("#classification").removeClass("active");
	$("#synonyms").removeClass("active");
	$("#literature").removeClass("active");
	$("#biology").removeClass("active");
	$("#diagnosis").removeClass("active");
	$("#distribucion").removeClass("active");
	$("#description").addClass("active");
	var valores=getGET();
    if(valores){
    	var taxon = valores['taxon'];
    	$.ajax({
	      url: 'php/crustacean-keys.php',
	      type: 'POST',
	      dataType: 'json',
	      data: {tipo: 'mostrarDescription', taxon: taxon},
	      success: function(respuesta){
	        var  contenido = "";
	        if(respuesta[0]['classification']=="Especie"){
				$("#nombretaxon").html("<i><h2 style='margin: 20px 0px; color:#00577a; text-decoration: none;'>"+respuesta[0]['name']+"</i> "+respuesta[0]['autor']+"</h2>");
			}
			else if(respuesta[0]['classification']=="Género"){
	     	   	$("#nombretaxon").html("<h2 style='margin: 20px 0px; color:#00577a; text-decoration: none;'>"+respuesta[0]['classification']+" <i>"+respuesta[0]['name']+"</i></h2>");
	    	}else{
	    		$("#nombretaxon").html("<h2 style='margin: 20px 0px; color:#00577a; text-decoration: none;'>"+respuesta[0]['classification']+" "+respuesta[0]['name']+"</h2>");
	    	}
	        if(respuesta[0]['description'] != ""){
				contenido+= "<table width='100%'>";
				contenido+= "<tr>";
				contenido+= "<td width='50%' valign='top'>";
		        for(var i = 0; i < respuesta.length; i++){
		        	contenido+= respuesta[i]['description'];
	    		}
					contenido+= "</td>";
					contenido+= "<td align='right' width='50%' valign='top'>";
					contenido+= "<div class='col-sm-12'>";
					contenido+= "<div id='galeria'>";
					contenido+= "</div>";
					contenido+= "<div class='caption-container'>";
					contenido+= "<p id='caption' align='justify'></p>";
					contenido+= "</div>";			
					contenido+= "<div id='minigaleria'>";
					contenido+= "</div>";
					contenido+= "</div>";
					contenido+= "</td>";
					contenido+= "</tr>";
					contenido+= "</table>";
				$("#contenido").html(contenido);
	    	}else{
					contenido+= "<table width='100%'>";
					contenido+= "<tr>";
					contenido+= "<td width='50%' valign='top'>";
					contenido+= "<p>No hay ninguna descripción disponible.</p>";
					contenido+= "</td>";
					contenido+= "<td align='right' width='50%' valign='top'>";
					contenido+= "<div class='col-sm-12'>";
					contenido+= "<div id='galeria'>";
					contenido+= "</div>";
					contenido+= "<div class='caption-container'>";
					contenido+= "<p id='caption'></p>";
					contenido+= "</div>";			
					contenido+= "<div id='minigaleria'>";
					contenido+= "</div>";
					contenido+= "</div>";
					contenido+= "</td>";
					contenido+= "</tr>";
					contenido+= "</table>";
	    		$("#contenido").html(contenido);
	    	}
	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) { 
	                    // alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	                }
	  	});
    }else{
        // no se ha recibido ningun parametro por GET
           location.href ="index.html";

    }
}

function mostrarClassification(){
	mostrartaxon();
	$("#description").removeClass("active");
	$("#synonyms").removeClass("active");
	$("#literature").removeClass("active");
	$("#biology").removeClass("active");
	$("#diagnosis").removeClass("active");
	$("#distribucion").removeClass("active");
	$("#classification").addClass("active");
	var valores=getGET();
    if(valores){
    	var taxon = valores['taxon'];
    	$.ajax({
	      url: 'php/crustacean-keys.php',
	      type: 'POST',
		  dataType: 'json',
		  async: false,
	      data: {tipo: 'mostrarClassification', taxon: taxon},
	      success: function(respuesta){
	        var  contenido = "";
	        if(respuesta != null){
				contenido+= "<table width='100%'>";
				contenido+= "<tr>";
				contenido+= "<td width='50%' valign='top'>";
		        for(var i = respuesta.length-1; i > -1; i--){
		        	var taxonseleccionado = respuesta[i].substring(respuesta[i].indexOf(" ")+1,respuesta[i].length);
		        	contenido+= "<div><a href='taxon.html?taxon="+taxonseleccionado+"'>"+respuesta[i]+"</a></div>";
		        	
				}
				contenido += "<br>";
				var contenido2 = "";
				$.ajax({
					url: 'php/crustacean-keys.php',
					type: 'POST',
					async: false,
					dataType: 'json',
					data: {tipo: 'mostrarHijos', taxon: taxon},
					success: function(respuesta){
					  if(respuesta != null){
						  for(var i = respuesta.length-1; i > -1; i--){
							  var taxonseleccionado = respuesta[i].substring(respuesta[i].indexOf(" ")+1,respuesta[i].length);
							  contenido2+= "<div><a style='color:#FF0000;' href='taxon.html?taxon="+taxonseleccionado+"'>"+respuesta[i]+"</a></div>"; 
						  }	  
					  }
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) { 
								  // alert("Status: " + textStatus); alert("Error: " + errorThrown); 
							  }
					});
					contenido += contenido2;
					contenido+= "</td>";
					contenido+= "<td align='right' width='50%' valign='top'>";
					contenido+= "<div class='col-sm-12'>";
					contenido+= "<div id='galeria'>";
					contenido+= "</div>";
					contenido+= "<div class='caption-container'>";
					contenido+= "<p id='caption'></p>";
					contenido+= "</div>";			
					contenido+= "<div id='minigaleria'>";
					contenido+= "</div>";
					contenido+= "</div>";
					contenido+= "</td>";
					contenido+= "</tr>";
					contenido+= "</table>";
				$("#contenido").html(contenido);
	    	}else{
					contenido+= "<table width='100%'>";
					contenido+= "<tr>";
					contenido+= "<td width='50%' valign='top'>";
					contenido+= "<p>No hay clasificación disponible.</p>";
					contenido+= "</td>";
					contenido+= "<td align='right' width='50%' valign='top'>";
					contenido+= "<div class='col-sm-12'>";
					contenido+= "<div id='galeria'>";
					contenido+= "</div>";
					contenido+= "<div class='caption-container'>";
					contenido+= "<p id='caption'></p>";
					contenido+= "</div>";			
					contenido+= "<div id='minigaleria'>";
					contenido+= "</div>";
					contenido+= "</div>";
					contenido+= "</td>";
					contenido+= "</tr>";
					contenido+= "</table>";
	    		$("#contenido").html(contenido);
	    	}
	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) { 
	                    // alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	                }
	  	});
    }else{
        // no se ha recibido ningun parametro por GET
           location.href ="index.html";

    }
}

function mostrarSynonyms(){
		mostrartaxon();
	$("#classification").removeClass("active");
	$("#description").removeClass("active");
	$("#literature").removeClass("active");
	$("#biology").removeClass("active");
	$("#diagnosis").removeClass("active");
	$("#distribucion").removeClass("active");
	$("#synonyms").addClass("active");
	var valores=getGET();
    if(valores){
    	var taxon = valores['taxon'];
    	$.ajax({
	      url: 'php/crustacean-keys.php',
	      type: 'POST',
	      dataType: 'json',
	      data: {tipo: 'mostrarSynonyms', taxon: taxon},
	      success: function(respuesta){
	        var  contenido = "";

	        if(respuesta[0]['synonyms'] != ""){
				contenido+= "<table width='100%'>";
				contenido+= "<tr>";
				contenido+= "<td width='50%' valign='top'>";
		        for(var i = 0; i < respuesta.length; i++){
		        	contenido+= respuesta[i]['synonyms'];
	    		}
				contenido+= "</td>";
				contenido+= "<td align='right' width='50%' valign='top'>";
				contenido+= "<div class='col-sm-12'>";
				contenido+= "<div id='galeria'>";
				contenido+= "</div>";
				contenido+= "<div class='caption-container'>";
				contenido+= "<p id='caption'></p>";
				contenido+= "</div>";			
				contenido+= "<div id='minigaleria'>";
				contenido+= "</div>";
				contenido+= "</div>";
				contenido+= "</td>";
				contenido+= "</tr>";
				contenido+= "</table>";
				$("#contenido").html(contenido);
	    	}else{
					contenido+= "<table width='100%'>";
					contenido+= "<tr>";
					contenido+= "<td width='50%' valign='top'>";
					contenido+= "<p>No hay sinonimias disponibles.</p>";
					contenido+= "</td>";
					contenido+= "<td align='right' width='50%' valign='top'>";
					contenido+= "<div class='col-sm-12'>";
					contenido+= "<div id='galeria'>";
					contenido+= "</div>";
					contenido+= "<div class='caption-container'>";
					contenido+= "<p id='caption'></p>";
					contenido+= "</div>";			
					contenido+= "<div id='minigaleria'>";
					contenido+= "</div>";
					contenido+= "</div>";
					contenido+= "</td>";
					contenido+= "</tr>";
					contenido+= "</table>";
	    		$("#contenido").html(contenido);
	    	}
	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) { 
	                    // alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	                }
	  	});
    }else{
        // no se ha recibido ningun parametro por GET
           location.href ="index.html";

    }
}

function mostrarLiterature(){
		mostrartaxon();
	$("#classification").removeClass("active");
	$("#synonyms").removeClass("active");
	$("#description").removeClass("active");
	$("#biology").removeClass("active");
	$("#diagnosis").removeClass("active");
	$("#distribucion").removeClass("active");
	$("#literature").addClass("active");
	var valores=getGET();
    if(valores){
    	var taxon = valores['taxon'];
    	$.ajax({
	      url: 'php/crustacean-keys.php',
	      type: 'POST',
	      dataType: 'json',
	      data: {tipo: 'mostrarLiterature', taxon: taxon},
	      success: function(respuesta){
	        var  contenido = "";

	        if(respuesta[0]['literature'] != ""){
				contenido+= "<table width='100%'>";
				contenido+= "<tr>";
				contenido+= "<td width='50%' valign='top'>";
		        for(var i = 0; i < respuesta.length; i++){
		        	contenido+= "<p style='text-align: justify; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-stretch: normal; line-height: normal; font-size: large; font-family: Times; color: rgb(79, 79, 79);'>"+respuesta[i]['literature']+"</p><br>";
	    		}
					contenido+= "</td>";
					contenido+= "<td align='right' width='50%' valign='top'>";
					contenido+= "<div class='col-sm-12'>";
					contenido+= "<div id='galeria'>";
					contenido+= "</div>";
					contenido+= "<div class='caption-container'>";
					contenido+= "<p id='caption'></p>";
					contenido+= "</div>";			
					contenido+= "<div id='minigaleria'>";
					contenido+= "</div>";
					contenido+= "</div>";
					contenido+= "</td>";
					contenido+= "</tr>";
					contenido+= "</table>";
				$("#contenido").html(contenido);
	    	}else{
					contenido+= "<table width='100%'>";
					contenido+= "<tr>";
					contenido+= "<td width='50%' valign='top'>";
					contenido+= "<p>No hay literatura disponible.</p>";
					contenido+= "</td>";
					contenido+= "<td align='right' width='50%' valign='top'>";
					contenido+= "<div class='col-sm-12'>";
					contenido+= "<div id='galeria'>";
					contenido+= "</div>";
					contenido+= "<div class='caption-container'>";
					contenido+= "<p id='caption'></p>";
					contenido+= "</div>";			
					contenido+= "<div id='minigaleria'>";
					contenido+= "</div>";
					contenido+= "</div>";
					contenido+= "</td>";
					contenido+= "</tr>";
					contenido+= "</table>";
	    		$("#contenido").html(contenido);
	    	}
	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) { 
	                    // alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	                }
	  	});
    }else{
        // no se ha recibido ningun parametro por GET
           location.href ="index.html";

    }
}

function mostrarBiology(){
		mostrartaxon();
	$("#classification").removeClass("active");
	$("#description").removeClass("active");
	$("#literature").removeClass("active");
	$("#synonyms").removeClass("active");
	$("#diagnosis").removeClass("active");
	$("#distribucion").removeClass("active");
	$("#biology").addClass("active");
	var valores=getGET();
    if(valores){
    	var taxon = valores['taxon'];
    	$.ajax({
	      url: 'php/crustacean-keys.php',
	      type: 'POST',
	      dataType: 'json',
	      data: {tipo: 'mostrarBiology', taxon: taxon},
	      success: function(respuesta){
	        var  contenido = "";

	        if(respuesta[0]['biology'] != 'null' && respuesta[0]['biology'] != ""){
				contenido+= "<table width='100%'>";
				contenido+= "<tr>";
				contenido+= "<td width='50%' valign='top'>";
		        for(var i = 0; i < respuesta.length; i++){
		        	contenido+= respuesta[i]['biology'];
	    		}
					contenido+= "</td>";
					contenido+= "<td align='right' width='50%' valign='top'>";
					contenido+= "<div class='col-sm-12'>";
					contenido+= "<div id='galeria'>";
					contenido+= "</div>";
					contenido+= "<div class='caption-container'>";
					contenido+= "<p id='caption'></p>";
					contenido+= "</div>";			
					contenido+= "<div id='minigaleria'>";
					contenido+= "</div>";
					contenido+= "</div>";
					contenido+= "</td>";
					contenido+= "</tr>";
					contenido+= "</table>";
				$("#contenido").html(contenido);
	    	}else{
					contenido+= "<table width='100%'>";
					contenido+= "<tr>";
					contenido+= "<td width='50%' valign='top'>";
					contenido+= "<p>No hay ninguna biología disponible.</p>";
					contenido+= "</td>";
					contenido+= "<td align='right' width='50%' valign='top'>";
					contenido+= "<div class='col-sm-12'>";
					contenido+= "<div id='galeria'>";
					contenido+= "</div>";
					contenido+= "<div class='caption-container'>";
					contenido+= "<p id='caption'></p>";
					contenido+= "</div>";			
					contenido+= "<div id='minigaleria'>";
					contenido+= "</div>";
					contenido+= "</div>";
					contenido+= "</td>";
					contenido+= "</tr>";
					contenido+= "</table>";
	    		$("#contenido").html(contenido);
	    	}
	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) { 
	                    // alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	                }
	  	});
    }else{
        // no se ha recibido ningun parametro por GET
           location.href ="index.html";

    }
}

function mostrarDiagnosis(){
	mostrartaxon();
$("#classification").removeClass("active");
$("#description").removeClass("active");
$("#literature").removeClass("active");
$("#synonyms").removeClass("active");
$("#distribucion").removeClass("active");
$("#biology").removeClass("active");
$("#diagnosis").addClass("active");
var valores=getGET();
if(valores){
	var taxon = "'" + valores['taxon'] + "'";
	$.ajax({
	  url: 'php/crustacean-keys.php',
	  type: 'POST',
	  dataType: 'json',
	  data: {tipo: 'mostrarDiagnosis', taxon: taxon},
	  success: function(respuesta){
		var  contenido = "";

		/*if(respuesta != null){
			contenido+= "<table width='100%'>";
			contenido+= "<tr>";
			contenido+= "<td width='50%' valign='top'>";
			contenido += "<table style='border-collapse:collapse;border-spacing:0' class='tg'><thead><tr><th style='text-align: center;border-color:#000000;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;font-weight:bold;overflow:hidden;padding:10px 5px;text-align:left;vertical-align:top;word-break:normal'>Caracteristica</th><th style='text-align: center;border-color:#000000;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;font-weight:bold;overflow:hidden;padding:10px 5px;text-align:left;vertical-align:top;word-break:normal'>Valor</th></tr></thead>";
			contenido += "<tbody>"
			for(var i = 0; i < respuesta.length; i++){
				contenido+= "<tr><td style='text-align: center;border-color:#000000;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;text-align:left;vertical-align:top;word-break:normal'>" + respuesta[i]['caracteristica'] + "</td><td style='text-align: center;border-color:#000000;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;text-align:left;vertical-align:top;word-break:normal'>" + respuesta[i]['valor'] + "</td></tr>";
			}
			contenido += "</tbody></table>";
		}else{
			contenido+= "<table width='100%'>";
			contenido+= "<tr>";
			contenido+= "<td width='50%' valign='top'>";
			contenido+= "<p>No hay ninguna diagnosis disponible.</p>";
		}
		contenido+= "</td>";
		contenido+= "<td align='right' width='50%' valign='top'>";
		contenido+= "<div class='col-sm-12'>";
		contenido+= "<div id='galeria'>";
		contenido+= "</div>";
		contenido+= "<div class='caption-container'>";
		contenido+= "<p id='caption'></p>";
		contenido+= "</div>";			
		contenido+= "<div id='minigaleria'>";
		contenido+= "</div>";
		contenido+= "</div>";
		contenido+= "</td>";
		contenido+= "</tr>";
		contenido+= "</table>";
		$("#contenido").html(contenido);*/

		if(respuesta != null){
			
			contenido += "<table style='border-collapse:collapse;border-spacing:0' class='tg'><thead><tr><th style='text-align: center;border-color:#000000;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;font-weight:bold;overflow:hidden;padding:10px 5px;text-align:left;vertical-align:top;word-break:normal'>Caracteristica</th><th style='text-align: center;border-color:#000000;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;font-weight:bold;overflow:hidden;padding:10px 5px;text-align:left;vertical-align:top;word-break:normal'>Valor</th></tr></thead>";
			contenido += "<tbody>"
			for(var i = 0; i < respuesta.length; i++){
				contenido+= "<tr><td style='text-align: center;border-color:#000000;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;text-align:left;vertical-align:top;word-break:normal'>" + respuesta[i]['caracteristica'] + "</td><td style='text-align: center;border-color:#000000;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;text-align:left;vertical-align:top;word-break:normal'>" + respuesta[i]['valor'] + "</td></tr>";
			}
			contenido += "</tbody></table>";
		}else{
			contenido+= "<p>No hay ninguna diagnosis disponible.</p>";
		}
		
		$("#contenido").html(contenido);
	  },
	  error: function(XMLHttpRequest, textStatus, errorThrown) { 
					// alert("Status: " + textStatus); alert("Error: " + errorThrown); 
				}
	  });
}else{
	// no se ha recibido ningun parametro por GET
	   location.href ="index.html";

}
}

/*function mostrarClaves(){
		mostrartaxon();
	$("#classification").removeClass("active");
	$("#description").removeClass("active");
	$("#literature").removeClass("active");
	$("#synonyms").removeClass("active");
	$("#biology").removeClass("active");
	$("#distribucion").removeClass("active");
	$("#claves").addClass("active");
	var valores=getGET();
    if(valores){
    	var taxon = valores['taxon'];
    	$.ajax({
	      url: 'php/crustacean-keys.php',
	      type: 'POST',
	      dataType: 'json',
	      data: {tipo: 'mostrarClaves', taxon: taxon},
	      success: function(respuesta){
	        var  contenido = "";

	        if(respuesta[0]['claves'] != 'null' && respuesta[0]['claves'] != ""){
				contenido+= "<table width='100%'>";
				contenido+= "<tr>";
				contenido+= "<td width='50%' valign='top'>";
		        for(var i = 0; i < respuesta.length; i++){
		        	contenido+= respuesta[i]['claves'];
	    		}
					contenido+= "</td>";
					contenido+= "<td align='right' width='50%' valign='top'>";
					contenido+= "<div class='col-sm-12'>";
					contenido+= "<div id='galeria'>";
					contenido+= "</div>";
					contenido+= "<div class='caption-container'>";
					contenido+= "<p id='caption'></p>";
					contenido+= "</div>";			
					contenido+= "<div id='minigaleria'>";
					contenido+= "</div>";
					contenido+= "</div>";
					contenido+= "</td>";
					contenido+= "</tr>";
					contenido+= "</table>";
				$("#contenido").html(contenido);
	    	}else{
					contenido+= "<table width='100%'>";
					contenido+= "<tr>";
					contenido+= "<td width='50%' valign='top'>";
					contenido+= "<p>No hay claves disponibles.</p>";
					contenido+= "</td>";
					contenido+= "<td align='right' width='50%' valign='top'>";
					contenido+= "<div class='col-sm-12'>";
					contenido+= "<div id='galeria'>";
					contenido+= "</div>";
					contenido+= "<div class='caption-container'>";
					contenido+= "<p id='caption'></p>";
					contenido+= "</div>";			
					contenido+= "<div id='minigaleria'>";
					contenido+= "</div>";
					contenido+= "</div>";
					contenido+= "</td>";
					contenido+= "</tr>";
					contenido+= "</table>";
	    		$("#contenido").html(contenido);
	    	}
	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) { 
	                    // alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	                }
	  	});
    }else{
        // no se ha recibido ningun parametro por GET
           location.href ="index.html";

    }
}*/

function mostrarDistribucion(){
		rescatardistribucion();
	$("#classification").removeClass("active");
	$("#description").removeClass("active");
	$("#literature").removeClass("active");
	$("#synonyms").removeClass("active");
	$("#biology").removeClass("active");
	$("#diagnosis").removeClass("active");
	$("#distribucion").addClass("active");
	var valores=getGET();
    /*if(valores){
    	var taxon = valores['taxon'];
    	$.ajax({
	      url: 'php/crustacean-keys.php',
	      type: 'POST',
	      dataType: 'json',
	      data: {tipo: 'rescatardistribucion', taxon: taxon},
	      success: function(respuesta){
	        var  contenido = "";

	        //if(respuesta[0]['claves'] != 'null' && respuesta[0]['claves'] != ""){
	        if(respuesta != null){
				contenido+= "<div class='col-sm-12'>";
				contenido+= "<div id='galeria'>";
				contenido+= "</div>";
				contenido+= "<div class='caption-container'>";
				contenido+= "<p id='caption'></p>";
				contenido+= "</div>";			
				contenido+= "<div>";
				contenido+= "<center>Distribución geográfica de "+taxon+".</center";
				contenido+= "</div>";
				contenido+= "</div>";
				$("#contenido").html(contenido);
	    	}else{
	    		$("#contenido").html("<center>No hay ninguna distribución geográfica disponible.</center>");
	    	}
	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) { 
	                    // alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	                }
	  	});
    }else{
        // no se ha recibido ningun parametro por GET
           location.href ="index.html";

    }*/
}


// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  if(slides[slideIndex-1] != null)
  	slides[slideIndex-1].style.display = "block";
  //console.log(dots[slideIndex-1].className);
  if(dots[slideIndex-1] != null){
  	dots[slideIndex-1].className += "active";
  	captionText.innerHTML = dots[slideIndex-1].alt;
  }
}

function ponergrande(id){
	var modal = document.getElementById('myModal');

	// Get the image and insert it inside the modal - use its "alt" text as a caption
	var img = document.getElementById(id);
	var modalImg = document.getElementById("img01");
	var captionText = document.getElementById("imagetext");
    modal.style.display = "block";
    modalImg.src = img.src;
    // captionText.html($("#contenido").html());
}




// When the user clicks on <span> (x), close the modal
function cerrarmodal(){
	var span = document.getElementsByClassName("close")[0];
	var modal = document.getElementById('myModal');
  	modal.style.display = "none";
}

function rescatardistribucion(){
    // Cogemos los valores pasados por get
    var valores=getGET();
    if(valores)
    {
        //recogemos los valores que nos envia la URL en variables para trabajar con ellas
        var taxon = valores['taxon'];

        $.ajax({
	      url: 'php/crustacean-keys.php',
		  type: 'POST',
		  async: false,
	      dataType: 'json',
	      data: {tipo: 'rescatardistribucion', taxon: taxon},
	      success: function(respuesta){
	        var  galeria = "";
			var  contenido = "";
	        var  minigaleria = "";
			var contador=1;
			console.log(respuesta);
	        if(respuesta != null){
				contenido += "<img id='1' src='data:"+respuesta[0]['tipo']+";base64,"+respuesta[0]['imagen']+"' style='width:100%;' >";
		        /*for(var i = 0; i < respuesta.length; i++){
		        	contenido += "<img id='"+(i+1)+"' onclick='ponergrande("+(i+1)+")' src='data:"+respuesta[i]['tipo']+";base64,"+respuesta[i]['imagen']+"' style='width:100%;' >";
		        	galeria += "<div class='mySlides'>";
		        	galeria += "";
		        	galeria += "<img id='"+(i+1)+"' onclick='ponergrande("+(i+1)+")' src='data:"+respuesta[i]['tipo']+";base64,"+respuesta[i]['imagen']+"' style='width:100%;' >";
					galeria += "</div>";
					if(contador % 6 === 0 && contador != 0){
						minigaleria += "<div class='column'>";
		        		minigaleria += "<img class='demo cursor' src='data:"+respuesta[i]['tipo']+";base64,"+respuesta[i]['imagen']+"' style='width:100%;' onclick='currentSlide("+(i+1)+")' alt='"+respuesta[i]['descripcion']+"'>";
		        		minigaleria += "</div>";
		        		minigaleria += "<div style='clear: both;'></div>"
					}else{
						minigaleria += "<div class='column'>";
		        		minigaleria += "<img class='demo cursor' src='data:"+respuesta[i]['tipo']+";base64,"+respuesta[i]['imagen']+"' style='width:100%;' onclick='currentSlide("+(i+1)+")' alt='"+respuesta[i]['descripcion']+"'>";
		        		minigaleria += "</div>";
					}
		        	
		        	contador++;
	    		}*/
	    		galeria+= "";
				galeria+= "";
				//$("#galeria").html(galeria);
				//$("#minigaleria").html(minigaleria);
				$("#contenido").html(contenido);
				//showSlides(1);	
	    	}else{
	    		$("#contenido").html("<center>No hay ninguna distribución geográfica disponible.</center>");
	    	}
	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) { 
	                    // alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	                }
	  	});     
    }else{
        // no se ha recibido ningun parametro por GET
           location.href ="index.html";

    }
}