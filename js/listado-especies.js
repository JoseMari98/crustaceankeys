function iniciar(){
	total_especies();
	especies_a();
	especies_b();
	especies_c();
	especies_d();
	especies_e();
	especies_f();
	especies_g();
	especies_h();
	especies_i();
	especies_j();
	especies_k();
	especies_l();
	especies_m();
	especies_n();
	especies_ñ();
	especies_o();
	especies_p();
	especies_q();
	especies_r();
	especies_s();
	especies_t();
	especies_u();
	especies_v();
	especies_w();
	especies_x();
	especies_y();
	especies_z();
}

function total_especies(){
	$.ajax({
      url: 'php/especies-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'total_especies'},
      success: function(respuesta){
          var  cadena = "";
        for (var i = 0; i < respuesta.length; i++){
        		cadena += "<br><p>El número de especies introducidas actualmente en el sistema es de <b>"+respuesta[i]["total_especies"]+"</b></p>";
        };
        $("#total_especies").html(cadena);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function especies_a(){
	$.ajax({
      url: 'php/especies-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'especies_a'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h3>A</h3>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){         
        	if(respuesta[i]["numfather"] == 0){
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></li>";
        			}else{
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i> "+ respuesta[i]["autor"] +"</a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        		}
        	}else{
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}else{
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a></div></li>";
        		}
        	}
        };
        cadena += "</ul>";
		letra += "<a href='#a'>A<a/>";
        $("#especies_a").html(cadena);
		$("#enlace_a").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function especies_b(){
	$.ajax({
      url: 'php/especies-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'especies_b'},
      success: function(respuesta){
        var  cadena = "";
		var  letra ="";
		cadena += "<h3>B</h3>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){         
        	if(respuesta[i]["numfather"] == 0){
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></li>";
        			}else{
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i> "+ respuesta[i]["autor"] +"</a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        		}
        	}else{
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}else{
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a></div></li>";
        		}
        	}
        };
        cadena += "</ul>";
		letra += "<a href='#b'>B<a/>";
        $("#especies_b").html(cadena);
		$("#enlace_b").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function especies_c(){
	$.ajax({
      url: 'php/especies-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'especies_c'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h3>C</h3>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){         
        	if(respuesta[i]["numfather"] == 0){
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></li>";
        			}else{
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i> "+ respuesta[i]["autor"] +"</a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        		}
        	}else{
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}else{
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a></div></li>";
        		}
        	}
        };
        cadena += "</ul>";
		letra += "<a href='#c'>C<a/>";
        $("#especies_c").html(cadena);
		$("#enlace_c").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function especies_d(){
	$.ajax({
      url: 'php/especies-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'especies_d'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h3>D</h3>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){         
        	if(respuesta[i]["numfather"] == 0){
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></li>";
        			}else{
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i> "+ respuesta[i]["autor"] +"</a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        		}
        	}else{
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}else{
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a></div></li>";
        		}
        	}
        };
        cadena += "</ul>";
		letra += "<a href='#d'>D<a/>";
        $("#especies_d").html(cadena);
		$("#enlace_d").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function especies_e(){
	$.ajax({
      url: 'php/especies-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'especies_e'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h3>E</h3>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){         
        	if(respuesta[i]["numfather"] == 0){
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></li>";
        			}else{
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i> "+ respuesta[i]["autor"] +"</a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        		}
        	}else{
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}else{
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a></div></li>";
        		}
        	}
        };
        cadena += "</ul>";
		letra += "<a href='#e'>E<a/>";
        $("#especies_e").html(cadena);
		$("#enlace_e").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function especies_f(){
	$.ajax({
      url: 'php/especies-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'especies_f'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h3>F</h3>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){         
        	if(respuesta[i]["numfather"] == 0){
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></li>";
        			}else{
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i> "+ respuesta[i]["autor"] +"</a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        		}
        	}else{
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}else{
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a></div></li>";
        		}
        	}
        };
        cadena += "</ul>";
		letra += "<a href='#f'>F<a/>";
        $("#especies_f").html(cadena);
		$("#enlace_f").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function especies_g(){
	$.ajax({
      url: 'php/especies-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'especies_g'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h3>G</h3>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){         
        	if(respuesta[i]["numfather"] == 0){
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></li>";
        			}else{
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i> "+ respuesta[i]["autor"] +"</a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        		}
        	}else{
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}else{
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a></div></li>";
        		}
        	}
        };
        cadena += "</ul>";
		letra += "<a href='#g'>G<a/>";
        $("#especies_g").html(cadena);
		$("#enlace_g").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function especies_h(){
	$.ajax({
      url: 'php/especies-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'especies_h'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h3>H</h3>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){         
        	if(respuesta[i]["numfather"] == 0){
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></li>";
        			}else{
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i> "+ respuesta[i]["autor"] +"</a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        		}
        	}else{
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}else{
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a></div></li>";
        		}
        	}
        };
        cadena += "</ul>";
		letra += "<a href='#h'>H<a/>";
        $("#especies_h").html(cadena);
		$("#enlace_h").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function especies_i(){
	$.ajax({
      url: 'php/especies-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'especies_i'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h3>I</h3>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){         
        	if(respuesta[i]["numfather"] == 0){
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></li>";
        			}else{
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i> "+ respuesta[i]["autor"] +"</a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        		}
        	}else{
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}else{
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a></div></li>";
        		}
        	}
        };
        cadena += "</ul>";
		letra += "<a href='#i'>I<a/>";
        $("#especies_i").html(cadena);
		$("#enlace_i").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function especies_j(){
	$.ajax({
      url: 'php/especies-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'especies_j'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h3>J</h3>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){         
        	if(respuesta[i]["numfather"] == 0){
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></li>";
        			}else{
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i> "+ respuesta[i]["autor"] +"</a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        		}
        	}else{
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}else{
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a></div></li>";
        		}
        	}
        };
        cadena += "</ul>";
		letra += "<a href='#j'>J<a/>";
        $("#especies_j").html(cadena);
		$("#enlace_j").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function especies_k(){
	$.ajax({
      url: 'php/especies-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'especies_k'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h3>K</h3>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){         
        	if(respuesta[i]["numfather"] == 0){
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></li>";
        			}else{
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i> "+ respuesta[i]["autor"] +"</a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        		}
        	}else{
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}else{
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a></div></li>";
        		}
        	}
        };
        cadena += "</ul>";
		letra += "<a href='#k'>K<a/>";
        $("#especies_k").html(cadena);
		$("#enlace_k").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function especies_l(){
	$.ajax({
      url: 'php/especies-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'especies_l'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h3>L</h3>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){         
        	if(respuesta[i]["numfather"] == 0){
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></li>";
        			}else{
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i> "+ respuesta[i]["autor"] +"</a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        		}
        	}else{
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}else{
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a></div></li>";
        		}
        	}
        };
        cadena += "</ul>";
		letra += "<a href='#l'>L<a/>";
        $("#especies_l").html(cadena);
		$("#enlace_l").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function especies_m(){
	$.ajax({
      url: 'php/especies-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'especies_m'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h3>M</h3>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){         
        	if(respuesta[i]["numfather"] == 0){
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></li>";
        			}else{
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i> "+ respuesta[i]["autor"] +"</a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        		}
        	}else{
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}else{
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a></div></li>";
        		}
        	}
        };
        cadena += "</ul>";
		letra += "<a href='#m'>M<a/>";
        $("#especies_m").html(cadena);
		$("#enlace_m").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function especies_n(){
	$.ajax({
      url: 'php/especies-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'especies_n'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h3>N</h3>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){         
        	if(respuesta[i]["numfather"] == 0){
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></li>";
        			}else{
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i> "+ respuesta[i]["autor"] +"</a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        		}
        	}else{
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}else{
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a></div></li>";
        		}
        	}
        };
        cadena += "</ul>";
		letra += "<a href='#n'>N<a/>";
        $("#especies_n").html(cadena);
		$("#enlace_n").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function especies_ñ(){
	$.ajax({
      url: 'php/especies-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'especies_ñ'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h3>Ñ</h3>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){         
        	if(respuesta[i]["numfather"] == 0){
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></li>";
        			}else{
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i> "+ respuesta[i]["autor"] +"</a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        		}
        	}else{
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}else{
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a></div></li>";
        		}
        	}
        };
        cadena += "</ul>";
		letra += "<a href='#ñ'>Ñ<a/>";
        $("#especies_ñ").html(cadena);
		$("#enlace_ñ").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function especies_o(){
	$.ajax({
      url: 'php/especies-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'especies_o'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h3>O</h3>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){         
        	if(respuesta[i]["numfather"] == 0){
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></li>";
        			}else{
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i> "+ respuesta[i]["autor"] +"</a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        		}
        	}else{
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}else{
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a></div></li>";
        		}
        	}
        };
        cadena += "</ul>";
		letra += "<a href='#o'>O<a/>";
        $("#especies_o").html(cadena);
		$("#enlace_o").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function especies_p(){
	$.ajax({
      url: 'php/especies-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'especies_p'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h3>P</h3>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){         
        	if(respuesta[i]["numfather"] == 0){
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></li>";
        			}else{
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i> "+ respuesta[i]["autor"] +"</a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        		}
        	}else{
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}else{
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a></div></li>";
        		}
        	}
        };
        cadena += "</ul>";
		letra += "<a href='#p'>P<a/>";
        $("#especies_p").html(cadena);
		$("#enlace_p").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function especies_q(){
	$.ajax({
      url: 'php/especies-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'especies_q'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h3>Q</h3>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){         
        	if(respuesta[i]["numfather"] == 0){
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></li>";
        			}else{
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i> "+ respuesta[i]["autor"] +"</a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        		}
        	}else{
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}else{
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a></div></li>";
        		}
        	}
        };
        cadena += "</ul>";
		letra += "<a href='#q'>Q<a/>";
        $("#especies_q").html(cadena);
		$("#enlace_q").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function especies_r(){
	$.ajax({
      url: 'php/especies-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'especies_r'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h3>R</h3>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){         
        	if(respuesta[i]["numfather"] == 0){
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></li>";
        			}else{
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i> "+ respuesta[i]["autor"] +"</a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        		}
        	}else{
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}else{
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a></div></li>";
        		}
        	}
        };
        cadena += "</ul>";
		letra += "<a href='#r'>R<a/>";
        $("#especies_r").html(cadena);
		$("#enlace_r").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function especies_s(){
	$.ajax({
      url: 'php/especies-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'especies_s'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h3>S</h3>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){         
        	if(respuesta[i]["numfather"] == 0){
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></li>";
        			}else{
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i> "+ respuesta[i]["autor"] +"</a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        		}
        	}else{
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}else{
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a></div></li>";
        		}
        	}
        };
        cadena += "</ul>";
		letra += "<a href='#s'>S<a/>";
        $("#especies_s").html(cadena);
		$("#enlace_s").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function especies_t(){
	$.ajax({
      url: 'php/especies-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'especies_t'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h3>T</h3>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){         
        	if(respuesta[i]["numfather"] == 0){
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></li>";
        			}else{
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i> "+ respuesta[i]["autor"] +"</a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        		}
        	}else{
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}else{
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a></div></li>";
        		}
        	}
        };
        cadena += "</ul>";
		letra += "<a href='#t'>T<a/>";
        $("#especies_t").html(cadena);
		$("#enlace_t").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function especies_u(){
	$.ajax({
      url: 'php/especies-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'especies_u'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h3>U</h3>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){         
        	if(respuesta[i]["numfather"] == 0){
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></li>";
        			}else{
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i> "+ respuesta[i]["autor"] +"</a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        		}
        	}else{
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}else{
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a></div></li>";
        		}
        	}
        };
        cadena += "</ul>";
		letra += "<a href='#u'>U<a/>";
        $("#especies_u").html(cadena);
		$("#enlace_u").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function especies_v(){
	$.ajax({
      url: 'php/especies-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'especies_v'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h3>V</h3>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){         
        	if(respuesta[i]["numfather"] == 0){
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></li>";
        			}else{
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i> "+ respuesta[i]["autor"] +"</a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        		}
        	}else{
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}else{
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a></div></li>";
        		}
        	}
        };
        cadena += "</ul>";
		letra += "<a href='#v'>V<a/>";
        $("#especies_v").html(cadena);
		$("#enlace_v").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function especies_w(){
	$.ajax({
      url: 'php/especies-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'especies_w'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h3>W</h3>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){         
        	if(respuesta[i]["numfather"] == 0){
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></li>";
        			}else{
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i> "+ respuesta[i]["autor"] +"</a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        		}
        	}else{
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}else{
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a></div></li>";
        		}
        	}
        };
        cadena += "</ul>";
		letra += "<a href='#w'>W<a/>";
        $("#especies_w").html(cadena);
		$("#enlace_w").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function especies_x(){
	$.ajax({
      url: 'php/especies-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'especies_x'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h3>X</h3>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){         
        	if(respuesta[i]["numfather"] == 0){
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></li>";
        			}else{
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i> "+ respuesta[i]["autor"] +"</a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        		}
        	}else{
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}else{
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a></div></li>";
        		}
        	}
        };
        cadena += "</ul>";
		letra += "<a href='#x'>X<a/>";
        $("#especies_x").html(cadena);
		$("#enlace_x").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function especies_y(){
	$.ajax({
      url: 'php/especies-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'especies_y'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h3>Y</h3>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){         
        	if(respuesta[i]["numfather"] == 0){
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></li>";
        			}else{
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i> "+ respuesta[i]["autor"] +"</a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        		}
        	}else{
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}else{
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a></div></li>";
        		}
        	}
        };
        cadena += "</ul>";
		letra += "<a href='#y'>Y<a/>";
        $("#especies_y").html(cadena);
		$("#enlace_y").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function especies_z(){
	$.ajax({
      url: 'php/especies-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'especies_z'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h3>Z</h3>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){         
        	if(respuesta[i]["numfather"] == 0){
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></li>";
        			}else{
              			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i> "+ respuesta[i]["autor"] +"</a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        		}
        	}else{
        		if(respuesta[i]["classification"] == "Género" || respuesta[i]["classification"] == "Especie" || respuesta[i]["classification"] == "Subespecie"){
        			if(respuesta[i]["classification"] == "Subespecie"){
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}else{
        				cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'><i>"+ respuesta[i]["name"] +"</i></a></div></li>";
        			}
        		}else{
        			cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div><span onload='mostrarhijos("+respuesta[i]["name"]+");' class='icon fa fa-plus' style='margin-left:5px;'></span><a target='_blank' href='taxon.html?taxon="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a></div></li>";
        		}
        	}
        };
        cadena += "</ul>";
		letra += "<a href='#z'>Z<a/>";
        $("#especies_z").html(cadena);
		$("#enlace_z").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}