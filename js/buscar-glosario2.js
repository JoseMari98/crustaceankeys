function iniciar(){
	buscador();
	terminos_a();
	terminos_b();
	terminos_c();
	terminos_d();
	terminos_e();
	terminos_f();
	terminos_g();
	terminos_h();
	terminos_i();
	terminos_j();
	terminos_k();
	terminos_l();
	terminos_m();
	terminos_n();
	terminos_ñ();
	terminos_o();
	terminos_p();
	terminos_q();
	terminos_r();
	terminos_s();
	terminos_t();
	terminos_u();
	terminos_v();
	terminos_w();
	terminos_x();
	terminos_y();
	terminos_z();
}

function buscador(){

		$.ajax({
	      url: 'php/glosario-crustacean-keys.php',
	      type: 'POST',
	      dataType: 'json',
	      data: {tipo: 'buscador'},
	      success: function(respuesta){

	      	var words = Array();
	      	for(var i = 0; i < respuesta.length; i++){
	      		words.push(respuesta[i]);
	      	}

			var input = document.getElementById("buscar");
			new Awesomplete(input, {
				list: words
			});

	        
	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) { 
	                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	                }
	  	});
	
}

function buscartermino(){
	var noencontrado = 0;
	$.ajax({
	      url: 'php/glosario-crustacean-keys.php',
	      type: 'POST',
	      dataType: 'json',
	      data: {tipo: 'buscador'},
	      success: function(respuesta){
	      	var buscador=$("#buscar").val();
	      	for (var i = 0; i < respuesta.length; i++) {
	      		if(respuesta[i][1]==buscador){
	      			location.href ="termino.html?termino="+buscador;
	      			noencontrado = 0;
	      			i = respuesta.length;
	      		}else{
	      			noencontrado = 1;
	      		}
	      	}
	      	if (noencontrado == 1) {
				alert("El término "+buscador+" no se existe");
			}
	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) { 
	                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	                }
	  	});
}

function terminos_a(){
	$.ajax({
      url: 'php/glosario-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'terminos_a'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h4>A</h4>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){
        		cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div style='border: 1px solid black;border-radius: 25px; background: lightgray;'><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='termino.html?termino="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        };
        cadena += "</ul>";
		letra += "<a href='#a'>A<a/>";
        $("#terminos_a").html(cadena);
		$("#enlace_a").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function terminos_b(){
	$.ajax({
      url: 'php/glosario-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'terminos_b'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h4>B</h4>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){
        		cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div style='border: 1px solid black;border-radius: 25px; background: lightgray;'><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='termino.html?termino="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        };
        cadena += "</ul>";
		letra += "<a href='#b'>B<a/>";
        $("#terminos_b").html(cadena);
		$("#enlace_b").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function terminos_c(){
	$.ajax({
      url: 'php/glosario-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'terminos_c'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h4>C</h4>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){
        		cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div style='border: 1px solid black;border-radius: 25px; background: lightgray;'><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='termino.html?termino="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        };
        cadena += "</ul>";
		letra += "<a href='#c'>C<a/>";
        $("#terminos_c").html(cadena);
		$("#enlace_c").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function terminos_d(){
	$.ajax({
      url: 'php/glosario-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'terminos_d'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h4>D</h4>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){
        		cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div style='border: 1px solid black;border-radius: 25px; background: lightgray;'><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='termino.html?termino="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        };
        cadena += "</ul>";
		letra += "<a href='#d'>D<a/>";
        $("#terminos_d").html(cadena);
		$("#enlace_d").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function terminos_e(){
	$.ajax({
      url: 'php/glosario-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'terminos_e'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h4>E</h4>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){
        		cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div style='border: 1px solid black;border-radius: 25px; background: lightgray;'><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='termino.html?termino="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        };
        cadena += "</ul>";
		letra += "<a href='#e'>E<a/>";
        $("#terminos_e").html(cadena);
		$("#enlace_e").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function terminos_f(){
	$.ajax({
      url: 'php/glosario-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'terminos_f'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h4>F</h4>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){
        		cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div style='border: 1px solid black;border-radius: 25px; background: lightgray;'><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='termino.html?termino="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        };
        cadena += "</ul>";
		letra += "<a href='#f'>F<a/>";
        $("#terminos_f").html(cadena);
		$("#enlace_f").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function terminos_g(){
	$.ajax({
      url: 'php/glosario-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'terminos_g'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h4>G</h4>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){
        		cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div style='border: 1px solid black;border-radius: 25px; background: lightgray;'><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='termino.html?termino="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        };
        cadena += "</ul>";
		letra += "<a href='#g'>G<a/>";
        $("#terminos_g").html(cadena);
		$("#enlace_g").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function terminos_h(){
	$.ajax({
      url: 'php/glosario-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'terminos_h'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h4>H</h4>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){
        		cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div style='border: 1px solid black;border-radius: 25px; background: lightgray;'><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='termino.html?termino="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        };
        cadena += "</ul>";
		letra += "<a href='#h'>H<a/>";
        $("#terminos_h").html(cadena);
		$("#enlace_h").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function terminos_i(){
	$.ajax({
      url: 'php/glosario-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'terminos_i'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h4>I</h4>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){
        		cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div style='border: 1px solid black;border-radius: 25px; background: lightgray;'><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='termino.html?termino="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        };
        cadena += "</ul>";
		letra += "<a href='#i'>I<a/>";
        $("#terminos_i").html(cadena);
		$("#enlace_i").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function terminos_j(){
	$.ajax({
      url: 'php/glosario-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'terminos_j'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h4>J</h4>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){
        		cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div style='border: 1px solid black;border-radius: 25px; background: lightgray;'><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='termino.html?termino="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        };
        cadena += "</ul>";
		letra += "<a href='#j'>J<a/>";
        $("#terminos_j").html(cadena);
		$("#enlace_j").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function terminos_k(){
	$.ajax({
      url: 'php/glosario-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'terminos_k'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h4>K</h4>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){
        		cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div style='border: 1px solid black;border-radius: 25px; background: lightgray;'><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='termino.html?termino="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        };
        cadena += "</ul>";
		letra += "<a href='#k'>K<a/>";
        $("#terminos_k").html(cadena);
		$("#enlace_k").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function terminos_l(){
	$.ajax({
      url: 'php/glosario-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'terminos_l'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h4>L</h4>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){
        		cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div style='border: 1px solid black;border-radius: 25px; background: lightgray;'><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='termino.html?termino="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        };
        cadena += "</ul>";
		letra += "<a href='#l'>L<a/>";
        $("#terminos_l").html(cadena);
		$("#enlace_l").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function terminos_m(){
	$.ajax({
      url: 'php/glosario-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'terminos_m'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h4>M</h4>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){
        		cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div style='border: 1px solid black;border-radius: 25px; background: lightgray;'><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='termino.html?termino="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        };
        cadena += "</ul>";
		letra += "<a href='#m'>M<a/>";
        $("#terminos_m").html(cadena);
		$("#enlace_m").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function terminos_n(){
	$.ajax({
      url: 'php/glosario-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'terminos_n'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h4>N</h4>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){
        		cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div style='border: 1px solid black;border-radius: 25px; background: lightgray;'><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='termino.html?termino="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        };
        cadena += "</ul>";
		letra += "<a href='#n'>N<a/>";
        $("#terminos_n").html(cadena);
		$("#enlace_n").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function terminos_ñ(){
	$.ajax({
      url: 'php/glosario-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'terminos_ñ'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h4>Ñ</h4>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){
        		cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div style='border: 1px solid black;border-radius: 25px; background: lightgray;'><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='termino.html?termino="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        };
        cadena += "</ul>";
		letra += "<a href='#ñ'>Ñ<a/>";
        $("#terminos_ñ").html(cadena);
		$("#enlace_ñ").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function terminos_o(){
	$.ajax({
      url: 'php/glosario-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'terminos_o'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h4>O</h4>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){
        		cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div style='border: 1px solid black;border-radius: 25px; background: lightgray;'><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='termino.html?termino="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        };
        cadena += "</ul>";
		letra += "<a href='#o'>O<a/>";
        $("#terminos_o").html(cadena);
		$("#enlace_o").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function terminos_p(){
	$.ajax({
      url: 'php/glosario-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'terminos_p'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h4>P</h4>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){
        		cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div style='border: 1px solid black;border-radius: 25px; background: lightgray;'><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='termino.html?termino="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        };
        cadena += "</ul>";
		letra += "<a href='#p'>P<a/>";
        $("#terminos_p").html(cadena);
		$("#enlace_p").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function terminos_q(){
	$.ajax({
      url: 'php/glosario-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'terminos_q'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h4>Q</h4>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){
        		cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div style='border: 1px solid black;border-radius: 25px; background: lightgray;'><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='termino.html?termino="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        };
        cadena += "</ul>";
		letra += "<a href='#q'>Q<a/>";
        $("#terminos_q").html(cadena);
		$("#enlace_q").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function terminos_r(){
	$.ajax({
      url: 'php/glosario-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'terminos_r'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h4>R</h4>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){
        		cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div style='border: 1px solid black;border-radius: 25px; background: lightgray;'><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='termino.html?termino="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        };
        cadena += "</ul>";
		letra += "<a href='#r'>R<a/>";
        $("#terminos_r").html(cadena);
		$("#enlace_r").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function terminos_s(){
	$.ajax({
      url: 'php/glosario-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'terminos_s'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h4>S</h4>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){
        		cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div style='border: 1px solid black;border-radius: 25px; background: lightgray;'><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='termino.html?termino="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        };
        cadena += "</ul>";
		letra += "<a href='#s'>S<a/>";
        $("#terminos_s").html(cadena);
		$("#enlace_s").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function terminos_t(){
	$.ajax({
      url: 'php/glosario-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'terminos_t'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h4>T</h4>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){
        		cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div style='border: 1px solid black;border-radius: 25px; background: lightgray;'><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='termino.html?termino="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        };
        cadena += "</ul>";
		letra += "<a href='#t'>T<a/>";
        $("#terminos_t").html(cadena);
		$("#enlace_t").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function terminos_u(){
	$.ajax({
      url: 'php/glosario-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'terminos_u'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h4>U</h4>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){
        		cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div style='border: 1px solid black;border-radius: 25px; background: lightgray;'><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='termino.html?termino="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        };
        cadena += "</ul>";
		letra += "<a href='#u'>U<a/>";
        $("#terminos_u").html(cadena);
		$("#enlace_u").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function terminos_v(){
	$.ajax({
      url: 'php/glosario-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'terminos_v'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h4>V</h4>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){
        		cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div style='border: 1px solid black;border-radius: 25px; background: lightgray;'><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='termino.html?termino="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        };
        cadena += "</ul>";
		letra += "<a href='#v'>V<a/>";
        $("#terminos_v").html(cadena);
		$("#enlace_v").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function terminos_w(){
	$.ajax({
      url: 'php/glosario-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'terminos_w'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h4>W</h4>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){
        		cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div style='border: 1px solid black;border-radius: 25px; background: lightgray;'><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='termino.html?termino="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        };
        cadena += "</ul>";
		letra += "<a href='#w'>W<a/>";
        $("#terminos_w").html(cadena);
		$("#enlace_w").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function terminos_x(){
	$.ajax({
      url: 'php/glosario-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'terminos_x'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h4>X</h4>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){
        		cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div style='border: 1px solid black;border-radius: 25px; background: lightgray;'><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='termino.html?termino="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        };
        cadena += "</ul>";
		letra += "<a href='#x'>X<a/>";
        $("#terminos_x").html(cadena);
		$("#enlace_x").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function terminos_y(){
	$.ajax({
      url: 'php/glosario-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'terminos_y'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h4>Y</h4>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){
        		cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div style='border: 1px solid black;border-radius: 25px; background: lightgray;'><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='termino.html?termino="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        };
        cadena += "</ul>";
		letra += "<a href='#y'>Y<a/>";
        $("#terminos_y").html(cadena);
		$("#enlace_y").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}

function terminos_z(){
	$.ajax({
      url: 'php/glosario-crustacean-keys.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'terminos_z'},
      success: function(respuesta){
        var  cadena = "";
		var  letra  = "";
		cadena += "<h4>Z</h4>";
        cadena += "<ul id='arbol' style='list-style:none; padding-left: 20px'>";
        for (var i = 0; i < respuesta.length; i++){
        		cadena += "<li id='"+respuesta[i]["name"]+"' style='margin-top:5px;'><div style='border: 1px solid black;border-radius: 25px; background: lightgray;'><span class='icon' style='margin-left:20px;'></span><a target='_blank' href='termino.html?termino="+respuesta[i]["name"]+"'>"+ respuesta[i]["name"] +"</a>";
        };
        cadena += "</ul>";
		letra += "<a href='#z'>Z<a/>";
        $("#terminos_z").html(cadena);
		$("#enlace_z").html(letra);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }
  	});
	
}