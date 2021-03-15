function iniciar(){
	padres_total();
}

function padres_total(){
	$.ajax({
      url: 'php/crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'sinpadre'},
      success: function(respuesta){
        var  cadena = "";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){         
        	if(respuesta[i]["numfather"] == 0){
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["classification"] +" "+ respuesta[i]["name"] +"</i></a></li>";
        			}else{
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["classification"] +" "+ respuesta[i]["name"] +"</i></a><span style='float:right;margin-right:10px;'>0</span></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["classification"] +" "+ respuesta[i]["name"] +"</a><span style='float:right;margin-right:10px;'>0</span></div></li>";
        		}
        	}else{
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onclick='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["classification"] +" "+ respuesta[i]["name"] +"</i></a></div></li>";
        			}else{
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onclick='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["classification"] +" "+ respuesta[i]["name"] +"</i></a><span style='float:right;margin-right:10px;'>"+respuesta[i]["numfather"]+"</span></div></li>";
        			}
        		}else{ //para la primera vez
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onclick='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["classification"] +" "+ respuesta[i]["name"] +"</a><span style='float:right;margin-right:10px;'>"+respuesta[i]["numfather"]+"</span></div></li>";
        		}
        	}
        };
        cadena += "</ul>";
        $("#taxonomictree").html(cadena);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function mostrarhijos(padreelegido){
	var padre= padreelegido.id;
	if($("#"+padre+" > div > .icon").hasClass("fa-plus")){
		$.ajax({
	      url: 'php/crustacean-keys.php',
	      type: 'POST',
	      dataType: 'json',
	      data: {tipo: 'mostrarhijos', padre: padre},
	      success: function(respuesta){
	        var  cadena = "";
	        cadena += "<ul class='rama"+padre+"' style='list-style:none; padding-left: 5px'>";
	        for (var i = 0; i < respuesta.length; i++){         
	        	if(respuesta[i]["numfather"] == 0){
	        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
	        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px; margin-left:10px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["classification"] +" "+ respuesta[i]["name"] +"</i></a></div></li>";
	        			}else{
	        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px; margin-left:10px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["classification"] +" "+ respuesta[i]["name"] +"</i></a><span style='float:right;margin-right:10px;'>0</span></div></li>";
	        			}
	        		}else{
	        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px; margin-left:10px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["classification"] +" "+ respuesta[i]["name"] +"</a><span style='float:right;margin-right:10px;'>0</span></div></li>";
	        		}
	        	}else{
	        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
	        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px; margin-left:10px;'><div><span onclick='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["classification"] +" "+ respuesta[i]["name"] +"</i></a></div></li>";
	        			}else{
	        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px; margin-left:10px;'><div><span onclick='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["classification"] +" "+ respuesta[i]["name"] +"</i></a><span style='float:right;margin-right:10px;'>"+respuesta[i]["numfather"]+"</span></div></li>";
	        			}
	        		}else{
	        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px; margin-left:10px;'><div><span onclick='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["classification"] +" "+ respuesta[i]["name"] +"</a><span style='float:right;margin-right:10px;'>"+respuesta[i]["numfather"]+"</span></div></li>";
	        		}
	        	}
        	};
	        cadena += "</ul>";
	        $("#"+padre).append(cadena);
	        $("#"+padre+" > div > .icon").removeClass("fa-plus");
	        $("#"+padre+" > div > .icon").addClass("fa-minus");
	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) { 
	                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	                }

	  	});
	}else{
		$(".rama"+padre).remove();
		$("#"+padre+" > div > .icon").removeClass("fa-minus");
	    $("#"+padre+" > div > .icon").addClass("fa-plus");
	}
}